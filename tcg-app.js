/* ===========================================================================
   Pokemon TCG portfolio tracker.

   Two data sources are stitched together:
     1. api.pokemontcg.io  — the authoritative set lists (names, collector
        numbers, rarities, card art). Fetched per set, on demand, with retry
        and a 24h local cache.
     2. card-prices.json — the Cardmarket price snapshot, distilled from the two
        full catalogue dumps by build-price-index.py. UPDATE PRICES can rebuild
        it in the browser from the raw dumps.

   Which sets are tracked lives in set-registry.json; nothing here is hardcoded
   to a particular set. Holdings are recorded per finish, per card, and valued
   against the matching Cardmarket column.

   PRICE-MAPPING-NOTES.md lists the handful of cards whose price is a best guess
   rather than an exact match. Regenerate it with audit-price-mapping.py.
   =========================================================================== */

const TCG_CONFIG = {
  API_ENDPOINT: 'https://api.pokemontcg.io/v2/cards',
  PRICE_INDEX_URL: 'card-prices.json',
  SET_REGISTRY_URL: 'set-registry.json',
  // Per-set price files are fetched on demand; the index above only lists them.
  PRICE_OVERRIDE_PREFIX: 'app_tcgtracker_prices_',
  // Card ids are globally unique across sets ("me5-1", "base1-4"), so one
  // inventory covers every set. The key is unchanged from the single-set build
  // so existing collections survive the upgrade untouched.
  INVENTORY_KEY: 'app_tcgtracker_me5_inventory_v2',
  LEGACY_MANIFEST_KEY: 'app_tcgtracker_me5_owned_manifest',
  PRICE_BASIS_KEY: 'app_tcgtracker_me5_price_basis',
  PRICE_OVERRIDE_KEY: 'app_tcgtracker_me5_price_override',
  SELECTED_SETS_KEY: 'app_tcgtracker_selected_sets',
  CATALOGUE_CACHE_PREFIX: 'app_tcgtracker_catalogue_',
  CACHE_LIFETIME_MS: 1000 * 60 * 60 * 24,
  FETCH_ATTEMPT_LIMIT: 5,
  FETCH_BACKOFF_BASE_MS: 600,
  DEFAULT_SET_KEY: 'me5'
};

// Cardmarket's snapshot carries exactly two price columns per product: the base
// column and the holo column. The holo column is populated only where a card was
// printed in a reverse-holo finish — true for most modern commons, and for none
// of the vintage sets, which predate reverse holos entirely.
const VARIANT_DEFINITIONS = [
  { key: 'normal', label: 'Normal', finish: 'base' },
  { key: 'reverse', label: 'Reverse', finish: 'holo' }
];

const PRICE_BASES = [
  { key: 'low', label: 'Low', baseField: 'low', holoField: 'lowHolo', description: 'lowest current listing' },
  { key: 'avg', label: 'Avg', baseField: 'avg', holoField: 'avgHolo', description: 'average sale price' },
  { key: 'trend', label: 'Trend', baseField: 'trend', holoField: 'trendHolo', description: 'Cardmarket price trend' },
  { key: 'avg30', label: '30-day', baseField: 'avg30', holoField: 'avg30Holo', description: '30-day rolling average' }
];

const DEFAULT_PRICE_BASIS = 'avg';

const DUMP_CONFIG = {
  PRODUCTS_URL: 'products_singles_6.json',
  PRICE_GUIDE_URL: 'price_guide_6.json',
  MINIMUM_ANCHOR_COVERAGE: 0.6
};

const RARITY_SLUG_MAP = {
  'Common': 'common',
  'Uncommon': 'uncommon',
  'Rare': 'rare',
  'Rare Holo': 'rare-holo',
  'Double Rare': 'double-rare',
  'Illustration Rare': 'illustration-rare',
  'Ultra Rare': 'ultra-rare',
  'Special Illustration Rare': 'special-illustration-rare',
  'Mega Hyper Rare': 'mega-hyper-rare'
};

// Cardmarket abbreviates energy types inside the card name ("Shadowy [D] Energy")
// where the card API spells them out ("Shadowy Darkness Energy").
const ENERGY_TYPE_ABBREVIATIONS = {
  G: 'Grass', R: 'Fire', W: 'Water', L: 'Lightning', P: 'Psychic',
  F: 'Fighting', D: 'Darkness', M: 'Metal', Y: 'Fairy', N: 'Dragon', C: 'Colorless'
};

// Cardmarket spells this one differently from the card API.
const NAME_ALIASES = { 'imposter professor oak': 'impostor professor oak' };

/* --- state ---------------------------------------------------------------- */

let setRegistry = [];                       // [{key,label,apiSetId,setTotal,priceRows}]
let catalogueBySetKey = new Map();           // setKey -> cards[]
let catalogueStateBySetKey = new Map();      // setKey -> 'loading'|'ready'|'error'|'stale'
let selectedSetKeys = [];

let currentActiveTab = 'all';
let currentSearchFilterString = '';

let priceByCardId = new Map();
let priceSnapshotDate = null;
let priceSnapshotOrigin = '';
let priceRowsBySetKey = new Map();           // setKey -> price rows, fetched on demand
let priceStateBySetKey = new Map();          // setKey -> 'loading'|'ready'|'error'
let priceIndexLoaded = false;

let inventoryByCardId = loadPersistedInventory();
let currentPriceBasisKey = loadPersistedPriceBasis();

/* ---------------------------------------------------------------------------
   Utilities
   --------------------------------------------------------------------------- */

function escapeMarkupText(unsafeTextValue) {
  return String(unsafeTextValue)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatEuroAmount(numericValue) {
  return `€${Number(numericValue).toFixed(2)}`;
}

function parseCollectorNumber(cardNumber) {
  const digitsOnly = String(cardNumber).replace(/\D/g, '');
  return digitsOnly ? parseInt(digitsOnly, 10) : Number.MAX_SAFE_INTEGER;
}

// Reduces both naming conventions to one comparable key. Must stay in lockstep
// with normalize_card_name() in audit-price-mapping.py.
function normalizeCardName(rawCardName) {
  // Drop the trailing "[Attack | Attack]" suffix first, but only when it holds
  // two or more characters — otherwise this would swallow the "[M]" of
  // "Nidoran [M]", which is a gender symbol rather than an attack list.
  let workingName = String(rawCardName).replace(/\s*\[[^\]]{2,}\]\s*$/, '');

  // With the attack suffix gone, a remaining single-letter bracket is an energy
  // type on an energy card ("Basic [M] Energy") and a gender symbol anywhere
  // else ("Nidoran [M]").
  if (/energy/i.test(workingName)) {
    workingName = workingName.replace(/\[([A-Z])\]/g, (wholeMatch, typeLetter) =>
      ENERGY_TYPE_ABBREVIATIONS[typeLetter] || wholeMatch);
  } else {
    workingName = workingName.replace(/\[M\]/g, '♂').replace(/\[F\]/g, '♀');
  }

  let normalizedName = workingName.trim().toLowerCase();

  // Each of these is one era's naming difference between the two sources:
  //   " Lv.68"             Cardmarket appends the card level (DP through HGSS).
  //                        "lv.x" is a different card and must survive.
  //   " δ Delta Species"   Cardmarket spells out what the API writes as " δ".
  //   hyphens              "Decidueye-GX" vs "Decidueye GX" (XY, Sun & Moon).
  //   leading "M "         "M Venusaur-EX" vs "MVenusaur EX".
  normalizedName = normalizedName.replace(/\s+lv\.\d+$/, '');
  normalizedName = normalizedName.replace(/\s+δ\s+delta species$/, ' δ');
  normalizedName = normalizedName.replace(/-/g, ' ');
  normalizedName = normalizedName.replace(/\s+/g, ' ').trim();
  normalizedName = normalizedName.replace(/^m\s+(?=\w)/, 'm');

  return NAME_ALIASES[normalizedName] || normalizedName;
}

function pauseForMilliseconds(delayMs) {
  return new Promise(resolveDelay => setTimeout(resolveDelay, delayMs));
}

function findSetDefinition(setKey) {
  return setRegistry.find(setDefinition => setDefinition.key === setKey) || null;
}

function isSetSelected(setKey) {
  return selectedSetKeys.indexOf(setKey) > -1;
}

// Cards from every selected set that has finished loading, in registry order.
function selectedCards() {
  const combinedCards = [];
  setRegistry.forEach(setDefinition => {
    if (!isSetSelected(setDefinition.key)) return;
    const cards = catalogueBySetKey.get(setDefinition.key);
    if (cards) combinedCards.push(...cards);
  });
  return combinedCards;
}

function anySelectedCatalogueLoaded() {
  return selectedSetKeys.some(setKey => catalogueBySetKey.has(setKey));
}

/* ---------------------------------------------------------------------------
   Inventory persistence

   Shape: { "me5-1": { normal: 2, reverse: 1 }, "base1-4": { normal: 1 } }
   Entries are never pruned against the catalogue, so a failed API response —
   or simply having a set deselected — can never delete the user's records.
   --------------------------------------------------------------------------- */

function sanitizeVariantCount(candidateValue) {
  const numericValue = Number(candidateValue);
  if (!Number.isFinite(numericValue) || numericValue <= 0) return 0;
  return Math.min(Math.floor(numericValue), 9999);
}

function sanitizeInventoryObject(candidateInventory) {
  const cleanInventory = {};
  if (!candidateInventory || typeof candidateInventory !== 'object') return cleanInventory;

  Object.keys(candidateInventory).forEach(cardId => {
    if (typeof cardId !== 'string' || cardId.length === 0 || cardId.length > 64) return;

    const rawEntry = candidateInventory[cardId];
    if (!rawEntry || typeof rawEntry !== 'object') return;

    const cleanEntry = {};
    VARIANT_DEFINITIONS.forEach(variant => {
      const count = sanitizeVariantCount(rawEntry[variant.key]);
      if (count > 0) cleanEntry[variant.key] = count;
    });

    if (Object.keys(cleanEntry).length > 0) cleanInventory[cardId] = cleanEntry;
  });

  return cleanInventory;
}

// The original build stored a flat array of owned card ids. Those records are
// carried over as a single normal-finish copy each.
function migrateLegacyOwnedManifest() {
  try {
    const legacyManifest = JSON.parse(localStorage.getItem(TCG_CONFIG.LEGACY_MANIFEST_KEY));
    if (!Array.isArray(legacyManifest) || legacyManifest.length === 0) return null;

    const migratedInventory = {};
    legacyManifest.forEach(cardId => {
      if (typeof cardId === 'string' && cardId.length > 0 && cardId.length <= 64) {
        migratedInventory[cardId] = { normal: 1 };
      }
    });

    console.info(`Migrated ${Object.keys(migratedInventory).length} owned cards from the previous format.`);
    return migratedInventory;
  } catch (migrationException) {
    console.warn('Could not migrate legacy manifest:', migrationException);
    return null;
  }
}

function loadPersistedInventory() {
  try {
    const storedInventory = JSON.parse(localStorage.getItem(TCG_CONFIG.INVENTORY_KEY));
    if (storedInventory && typeof storedInventory === 'object') {
      return sanitizeInventoryObject(storedInventory);
    }
  } catch (storageParseException) {
    console.warn('Discarding unreadable inventory:', storageParseException);
  }

  const migratedInventory = migrateLegacyOwnedManifest();
  if (migratedInventory) {
    const cleanInventory = sanitizeInventoryObject(migratedInventory);
    persistInventory(cleanInventory);
    return cleanInventory;
  }

  return {};
}

function persistInventory(inventoryToWrite) {
  try {
    localStorage.setItem(TCG_CONFIG.INVENTORY_KEY, JSON.stringify(inventoryToWrite || inventoryByCardId));
  } catch (storageWriteException) {
    console.warn('Could not persist inventory:', storageWriteException);
    updateSetStatusLine('Changes could not be saved — browser storage is unavailable or full.', 'warn');
  }
}

function readVariantCount(cardId, variantKey) {
  const entry = inventoryByCardId[cardId];
  return (entry && entry[variantKey]) || 0;
}

function totalCopiesForCard(cardId) {
  const entry = inventoryByCardId[cardId];
  if (!entry) return 0;
  return VARIANT_DEFINITIONS.reduce((runningTotal, variant) => runningTotal + (entry[variant.key] || 0), 0);
}

/* ---------------------------------------------------------------------------
   Set selection
   --------------------------------------------------------------------------- */

function loadPersistedSelectedSets() {
  try {
    const storedSelection = JSON.parse(localStorage.getItem(TCG_CONFIG.SELECTED_SETS_KEY));
    if (Array.isArray(storedSelection) && storedSelection.length > 0) {
      const valid = storedSelection.filter(setKey => findSetDefinition(setKey));
      if (valid.length > 0) return valid;
    }
  } catch (selectionParseException) {
    console.warn('Discarding unreadable set selection:', selectionParseException);
  }
  return findSetDefinition(TCG_CONFIG.DEFAULT_SET_KEY)
    ? [TCG_CONFIG.DEFAULT_SET_KEY]
    : setRegistry.slice(0, 1).map(setDefinition => setDefinition.key);
}

function persistSelectedSets() {
  try {
    localStorage.setItem(TCG_CONFIG.SELECTED_SETS_KEY, JSON.stringify(selectedSetKeys));
  } catch (selectionWriteException) {
    console.warn('Could not persist set selection:', selectionWriteException);
  }
}

function setSelectionSummary() {
  if (selectedSetKeys.length === 0) return 'No sets';
  if (selectedSetKeys.length === 1) {
    const setDefinition = findSetDefinition(selectedSetKeys[0]);
    return setDefinition ? setDefinition.label : '1 set';
  }
  if (selectedSetKeys.length === setRegistry.length) return `All ${setRegistry.length} sets`;
  return `${selectedSetKeys.length} sets`;
}

let setPickerFilterString = '';

function renderSetPicker() {
  const DOMOptionList = document.getElementById('setPickerOptions');
  if (!DOMOptionList) return;

  const filter = setPickerFilterString.toLowerCase().trim();
  const matching = setRegistry.filter(setDefinition =>
    !filter
    || setDefinition.label.toLowerCase().includes(filter)
    || setDefinition.series.toLowerCase().includes(filter)
    || setDefinition.key.toLowerCase().includes(filter));

  // Grouped by series, newest series first — 141 flat checkboxes is unusable.
  const bySeries = new Map();
  matching.forEach(setDefinition => {
    if (!bySeries.has(setDefinition.series)) bySeries.set(setDefinition.series, []);
    bySeries.get(setDefinition.series).push(setDefinition);
  });

  const groups = [...bySeries.entries()].sort((left, right) => {
    const leftDate = left[1][0].releaseDate || '';
    const rightDate = right[1][0].releaseDate || '';
    return String(rightDate).localeCompare(String(leftDate));
  });

  if (groups.length === 0) {
    DOMOptionList.innerHTML = '<p class="set-picker-empty">No sets match that search.</p>';
  } else {
    DOMOptionList.innerHTML = groups.map(([series, sets]) => `
      <div class="set-group">
        <div class="set-group-head">${escapeMarkupText(series)}</div>
        ${sets.map(setDefinition => {
          const isChecked = isSetSelected(setDefinition.key);
          const cards = catalogueBySetKey.get(setDefinition.key);
          const state = catalogueStateBySetKey.get(setDefinition.key);
          let note = `${setDefinition.setTotal}`;
          if (isChecked && state === 'loading') note = '…';
          else if (isChecked && state === 'error') note = '!';
          else if (cards) note = `${cards.length}`;
          return `
            <label class="set-option${setDefinition.priced ? '' : ' set-option--unpriced'}"
                   title="${setDefinition.priced
                     ? escapeMarkupText(setDefinition.label)
                     : escapeMarkupText(setDefinition.unpricedReason)}">
              <input type="checkbox" data-set-key="${escapeMarkupText(setDefinition.key)}" ${isChecked ? 'checked' : ''}>
              <span class="set-option-label">${escapeMarkupText(setDefinition.label)}</span>
              ${setDefinition.priced ? '' : '<span class="set-option-flag">no prices</span>'}
              <span class="set-option-note">${escapeMarkupText(note)}</span>
            </label>`;
        }).join('')}
      </div>`).join('');
  }

  const DOMSummary = document.getElementById('setPickerSummary');
  if (DOMSummary) DOMSummary.textContent = setSelectionSummary();

  const DOMCount = document.getElementById('setPickerCount');
  if (DOMCount) {
    const priced = setRegistry.filter(setDefinition => setDefinition.priced).length;
    DOMCount.textContent = `${setRegistry.length} sets · ${priced} priced`;
  }
}

function handleSetPickerFilter(inputValue) {
  setPickerFilterString = inputValue;
  renderSetPicker();
}

function toggleSetSelection(setKey, shouldBeSelected) {
  if (shouldBeSelected && !isSetSelected(setKey)) {
    selectedSetKeys = setRegistry
      .map(setDefinition => setDefinition.key)
      .filter(key => key === setKey || isSetSelected(key));
  } else if (!shouldBeSelected) {
    selectedSetKeys = selectedSetKeys.filter(key => key !== setKey);
  }

  persistSelectedSets();
  renderSetPicker();
  renderCardGrid({ animateEntry: true });
  ensureSelectedCataloguesLoaded();
}

function selectAllSets(shouldSelectAll) {
  selectedSetKeys = shouldSelectAll ? setRegistry.map(setDefinition => setDefinition.key) : [];
  persistSelectedSets();
  renderSetPicker();
  renderCardGrid({ animateEntry: true });
  ensureSelectedCataloguesLoaded();
}

function toggleSetPickerPanel(shouldOpen) {
  const DOMPanel = document.getElementById('setPickerPanel');
  const DOMButton = document.getElementById('setPickerButton');
  if (!DOMPanel || !DOMButton) return;

  const willOpen = shouldOpen === undefined ? DOMPanel.classList.contains('hidden') : shouldOpen;
  DOMPanel.classList.toggle('hidden', !willOpen);
  DOMButton.setAttribute('aria-expanded', String(willOpen));
}

/* ---------------------------------------------------------------------------
   Catalogue retrieval

   api.pokemontcg.io returns intermittent 500/502 responses for otherwise
   identical requests, so every fetch is retried with backoff and a per-set cache
   is kept as a fallback for when the API is down entirely. Sets are fetched only
   once selected, so the default view costs a single request.
   --------------------------------------------------------------------------- */

function condenseCardRecord(rawCardPayload, setKey) {
  return {
    id: rawCardPayload.id,
    setKey,
    name: rawCardPayload.name,
    number: rawCardPayload.number,
    rarity: rawCardPayload.rarity || 'Unlisted',
    imageUrl: (rawCardPayload.images && rawCardPayload.images.small) || ''
  };
}

function orderCardsBySetNumber(cardCollection) {
  return cardCollection
    .slice()
    .sort((leftCard, rightCard) => parseCollectorNumber(leftCard.number) - parseCollectorNumber(rightCard.number));
}

function catalogueCacheKey(setKey) {
  return TCG_CONFIG.CATALOGUE_CACHE_PREFIX + setKey;
}

function readCachedCatalogue(setKey) {
  try {
    const cacheEnvelope = JSON.parse(localStorage.getItem(catalogueCacheKey(setKey)));
    if (!cacheEnvelope || !Array.isArray(cacheEnvelope.cards) || cacheEnvelope.cards.length === 0) return null;
    return cacheEnvelope;
  } catch (cacheParseException) {
    console.warn('Discarding unreadable catalogue cache:', cacheParseException);
    return null;
  }
}

function writeCachedCatalogue(setKey, cardCollection) {
  try {
    localStorage.setItem(catalogueCacheKey(setKey), JSON.stringify({
      savedAt: Date.now(),
      cards: cardCollection
    }));
  } catch (cacheWriteException) {
    console.warn('Could not cache catalogue:', cacheWriteException);
  }
}

async function fetchSetCatalogueWithRetry(setDefinition) {
  const requestUrl = `${TCG_CONFIG.API_ENDPOINT}?q=${encodeURIComponent('set.id:' + setDefinition.apiSetId)}&pageSize=250`;
  let lastEncounteredError = null;

  for (let attemptNumber = 1; attemptNumber <= TCG_CONFIG.FETCH_ATTEMPT_LIMIT; attemptNumber++) {
    try {
      const endpointResponse = await fetch(requestUrl);
      if (!endpointResponse.ok) throw new Error(`API responded ${endpointResponse.status}`);

      const catalogPayload = await endpointResponse.json();
      if (!catalogPayload || !Array.isArray(catalogPayload.data) || catalogPayload.data.length === 0) {
        throw new Error('API returned an empty card list.');
      }

      return orderCardsBySetNumber(
        catalogPayload.data.map(rawCard => condenseCardRecord(rawCard, setDefinition.key))
      );
    } catch (attemptException) {
      lastEncounteredError = attemptException;
      console.warn(`Catalogue fetch for ${setDefinition.key} attempt ${attemptNumber} failed:`, attemptException.message);

      if (attemptNumber < TCG_CONFIG.FETCH_ATTEMPT_LIMIT) {
        await pauseForMilliseconds(TCG_CONFIG.FETCH_BACKOFF_BASE_MS * attemptNumber);
      }
    }
  }

  throw lastEncounteredError || new Error('Catalogue unavailable.');
}

// Cheap identity check so a background refresh that returns what is already on
// screen does not trigger a repaint.
function catalogueSignature(cardCollection) {
  return (cardCollection || []).map(card =>
    `${card.id}|${card.name}|${card.number}|${card.rarity}|${card.imageUrl}`).join('\n');
}

async function loadSetCatalogue(setDefinition) {
  if (catalogueStateBySetKey.get(setDefinition.key) === 'loading') return;

  const cacheEnvelope = readCachedCatalogue(setDefinition.key);
  const cacheIsFresh = cacheEnvelope && (Date.now() - cacheEnvelope.savedAt) < TCG_CONFIG.CACHE_LIFETIME_MS;
  let paintedFromCache = false;

  // Paint from a fresh cache immediately, then refresh from the network behind it.
  if (cacheIsFresh) {
    catalogueBySetKey.set(setDefinition.key, cacheEnvelope.cards);
    catalogueStateBySetKey.set(setDefinition.key, 'ready');
    rebuildPriceIndex();
    renderCardGrid({ animateEntry: true });
    paintedFromCache = true;
  }

  catalogueStateBySetKey.set(setDefinition.key, 'loading');
  renderSetPicker();
  updateLoadingIndicator();

  const previousSignature = catalogueSignature(catalogueBySetKey.get(setDefinition.key));
  let contentChanged = true;

  try {
    const retrievedCards = await fetchSetCatalogueWithRetry(setDefinition);
    writeCachedCatalogue(setDefinition.key, retrievedCards);

    contentChanged = catalogueSignature(retrievedCards) !== previousSignature;
    catalogueBySetKey.set(setDefinition.key, retrievedCards);
    catalogueStateBySetKey.set(setDefinition.key, 'ready');
  } catch (exceptionContext) {
    console.error(`Catalogue load failed for ${setDefinition.key}:`, exceptionContext);

    if (cacheEnvelope) {
      catalogueBySetKey.set(setDefinition.key, cacheEnvelope.cards);
      catalogueStateBySetKey.set(setDefinition.key, 'stale');
      contentChanged = !paintedFromCache;
      updateSetStatusLine(`${setDefinition.label}: API unreachable — showing your last saved copy.`, 'warn');
    } else {
      catalogueStateBySetKey.set(setDefinition.key, 'error');
      updateSetStatusLine(`${setDefinition.label}: could not reach the Pokémon TCG API.`, 'unavailable');
    }
  }

  renderSetPicker();
  updateLoadingIndicator();

  // The overwhelmingly common warm-load case: the network returned exactly what
  // the cache already put on screen. Repainting it would destroy and recreate
  // every card image for no visible gain, which is what the load flicker was.
  if (!contentChanged) {
    rebuildPriceIndex();
    updateDashboardMetrics();
    return;
  }

  rebuildPriceIndex();
  renderCardGrid({ animateEntry: !paintedFromCache });
}

function ensureSelectedCataloguesLoaded() {
  ensureSelectedPricesLoaded();
  const pending = selectedSetKeys
    .map(findSetDefinition)
    .filter(setDefinition => setDefinition
      && !catalogueBySetKey.has(setDefinition.key)
      && catalogueStateBySetKey.get(setDefinition.key) !== 'loading');

  updateLoadingIndicator();
  pending.forEach(setDefinition => { loadSetCatalogue(setDefinition); });
}

function updateLoadingIndicator() {
  const stillLoading = selectedSetKeys.filter(setKey => catalogueStateBySetKey.get(setKey) === 'loading');
  const failed = selectedSetKeys.filter(setKey => catalogueStateBySetKey.get(setKey) === 'error');
  const DOMLoadingWorkspace = document.getElementById('loadingWorkspace');
  if (!DOMLoadingWorkspace) return;

  // Nothing on screen and nothing still in flight means every selected set
  // failed with no cache to fall back on. Offer a way out rather than leaving
  // the page blank until the user thinks to reload.
  if (failed.length > 0 && stillLoading.length === 0 && !anySelectedCatalogueLoaded()) {
    renderCatalogueFailure(failed);
    return;
  }

  // Clear any failure panel left from an earlier attempt before deciding what to
  // show, so stale error markup can never resurface on a later loading state.
  restoreLoadingSkeleton();

  const shouldShowSkeleton = stillLoading.length > 0 && !anySelectedCatalogueLoaded();
  DOMLoadingWorkspace.classList.toggle('hidden', !shouldShowSkeleton);

  const DOMNote = document.getElementById('loadingNote');
  if (DOMNote && stillLoading.length > 0) {
    const labels = stillLoading.map(setKey => (findSetDefinition(setKey) || {}).label || setKey);
    DOMNote.textContent = `LOADING ${labels.join(', ').toUpperCase()}…`;
  }
}

const LOADING_SKELETON_MARKUP = `
  <div class="load-note" id="loadingNote"><span class="pulse-dot"></span>LOADING SET LIST…</div>
  <div class="skeleton"></div>
  <div class="skeleton" style="animation-delay:0.1s"></div>
  <div class="skeleton" style="animation-delay:0.2s"></div>
  <div class="skeleton" style="animation-delay:0.3s"></div>
  <div class="skeleton" style="animation-delay:0.4s"></div>
`;

// The workspace holds either the skeleton or a failure panel. Its own state is
// recorded on the container rather than inferred by probing for a child id,
// which is both cheaper and unambiguous.
function restoreLoadingSkeleton() {
  const DOMLoadingWorkspace = document.getElementById('loadingWorkspace');
  if (!DOMLoadingWorkspace || DOMLoadingWorkspace.dataset.state === 'skeleton') return;
  DOMLoadingWorkspace.innerHTML = LOADING_SKELETON_MARKUP;
  DOMLoadingWorkspace.dataset.state = 'skeleton';
}

function renderCatalogueFailure(failedSetKeys) {
  const DOMLoadingWorkspace = document.getElementById('loadingWorkspace');
  const labels = failedSetKeys.map(setKey => (findSetDefinition(setKey) || {}).label || setKey);

  DOMLoadingWorkspace.classList.remove('hidden');
  DOMLoadingWorkspace.dataset.state = 'fault';
  DOMLoadingWorkspace.innerHTML = `
    <div class="load-fault">
      <p>Could not reach the Pok&eacute;mon TCG API for ${escapeMarkupText(labels.join(', '))}.</p>
      <p class="load-fault-note">The API returns intermittent errors; retrying usually works.</p>
      <button type="button" id="retryCatalogueButton" class="btn-primary">RETRY</button>
    </div>
  `;
  document.getElementById('retryCatalogueButton')
    .addEventListener('click', () => retryFailedCatalogues());
}

function retryFailedCatalogues() {
  selectedSetKeys.forEach(setKey => {
    if (catalogueStateBySetKey.get(setKey) === 'error') catalogueStateBySetKey.delete(setKey);
  });
  updateSetStatusLine('');
  restoreLoadingSkeleton();
  document.getElementById('loadingWorkspace').classList.remove('hidden');
  ensureSelectedCataloguesLoaded();
}

/* ---------------------------------------------------------------------------
   Price index

   The compact snapshot lists Cardmarket products per set in idProduct order,
   which follows collector-number order. Several cards can share a name (a base
   print, a full art, a secret rare), so matching on name alone cannot tell them
   apart. Instead both sides are grouped by name and paired ordinally: the nth
   Cardmarket product of a given name is the nth card of that name by collector
   number.

   Where Cardmarket carries MORE products than the card API has cards — vintage
   error and variant printings the API does not model — the lowest idProduct
   entries win and the result is a best guess. Those cards are enumerated in
   PRICE-MAPPING-NOTES.md by audit-price-mapping.py.
   --------------------------------------------------------------------------- */

function isUsablePriceIndex(candidateIndex) {
  return !!candidateIndex
    && !!candidateIndex.sets
    && Object.keys(candidateIndex.sets).length > 0;
}

function snapshotTimestamp(snapshot) {
  const parsedDate = new Date((snapshot && snapshot.snapshotDate) || 0);
  return Number.isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime();
}

function priceOverrideKey(setKey) {
  return TCG_CONFIG.PRICE_OVERRIDE_PREFIX + setKey;
}

// A set re-distilled in this browser is kept locally so the page keeps using it
// across reloads. The served file wins again once it carries newer data, so
// re-deploying supersedes a local override automatically.
function readPriceOverride(setKey) {
  try {
    const stored = JSON.parse(localStorage.getItem(priceOverrideKey(setKey)));
    return (stored && Array.isArray(stored.cards) && stored.cards.length > 0) ? stored : null;
  } catch (overrideParseException) {
    console.warn('Discarding unreadable price override:', overrideParseException);
    return null;
  }
}

function writePriceOverride(setKey, snapshot) {
  try {
    localStorage.setItem(priceOverrideKey(setKey), JSON.stringify(snapshot));
    return true;
  } catch (overrideWriteException) {
    console.warn('Could not store refreshed prices:', overrideWriteException);
    return false;
  }
}

function applyPriceIndex(priceIndex) {
  priceSnapshotDate = priceIndex.snapshotDate || null;
  priceIndexLoaded = true;

  setRegistry = Object.keys(priceIndex.sets).map(setKey => {
    const block = priceIndex.sets[setKey];
    return {
      key: setKey,
      label: block.label || setKey,
      apiSetId: block.apiSetId || setKey,
      setTotal: block.setTotal || 0,
      releaseDate: block.releaseDate || '',
      series: block.series || 'Other',
      priced: !!block.priced,
      priceFile: block.file || null,
      unpricedReason: block.unpricedReason || ''
    };
  }).sort((left, right) => String(left.releaseDate).localeCompare(String(right.releaseDate)));
}

async function loadPriceSnapshot() {
  updatePriceStatusLine('Loading price index…', 'loading');

  try {
    const indexResponse = await fetch(TCG_CONFIG.PRICE_INDEX_URL);
    if (!indexResponse.ok) throw new Error(`HTTP ${indexResponse.status}`);

    const priceIndex = await indexResponse.json();
    if (!isUsablePriceIndex(priceIndex)) throw new Error('price index listed no sets');
    applyPriceIndex(priceIndex);
  } catch (exceptionContext) {
    console.warn('Price index unavailable:', exceptionContext);
    updatePriceStatusLine(
      `Price index unavailable (${exceptionContext.message}) — run "python3 build-price-index.py".`,
      'unavailable'
    );
    return;
  }

  selectedSetKeys = loadPersistedSelectedSets();
  renderSetPicker();
  syncPriceBasisControls();
  ensureSelectedCataloguesLoaded();

  if (!anySelectedCatalogueLoaded()) renderCardGrid();
  updateDashboardMetrics();
}

// Prices for one set, fetched the first time that set is shown.
async function ensureSetPricesLoaded(setKey) {
  const setDefinition = findSetDefinition(setKey);
  if (!setDefinition || !setDefinition.priced) return;
  if (priceRowsBySetKey.has(setKey)) return;
  if (priceStateBySetKey.get(setKey) === 'loading') return;

  priceStateBySetKey.set(setKey, 'loading');

  const localOverride = readPriceOverride(setKey);
  let servedRows = null;

  try {
    const priceResponse = await fetch(setDefinition.priceFile);
    if (!priceResponse.ok) throw new Error(`HTTP ${priceResponse.status}`);
    const payload = await priceResponse.json();
    if (!payload || !Array.isArray(payload.cards)) throw new Error('no cards array');
    servedRows = payload;
  } catch (exceptionContext) {
    console.warn(`Prices unavailable for ${setKey}:`, exceptionContext);
  }

  // Prefer whichever carries the newer Cardmarket date.
  let chosen = servedRows;
  if (localOverride && (!servedRows || snapshotTimestamp(localOverride) > snapshotTimestamp(servedRows))) {
    chosen = localOverride;
    priceSnapshotOrigin = 'locally refreshed';
  }

  if (chosen) {
    priceRowsBySetKey.set(setKey, chosen.cards);
    priceStateBySetKey.set(setKey, 'ready');
  } else {
    priceStateBySetKey.set(setKey, 'error');
  }

  rebuildPriceIndex();
  // Prices usually arrive before the catalogue they belong to; there is nothing
  // to repaint until cards exist, and once they do the values are patched in
  // place rather than rebuilt.
  if (anySelectedCatalogueLoaded() && !refreshRenderedCardValues()) renderCardGrid();
}

function ensureSelectedPricesLoaded() {
  selectedSetKeys.forEach(setKey => { ensureSetPricesLoaded(setKey); });
}

function rebuildPriceIndex() {
  const nextPriceIndex = new Map();
  let approximateCount = 0;

  setRegistry.forEach(setDefinition => {
    const cards = catalogueBySetKey.get(setDefinition.key);
    const priceRows = priceRowsBySetKey.get(setDefinition.key);
    if (!cards || !priceRows) return;

    const productsByName = new Map();
    priceRows.forEach(priceRow => {
      const nameKey = normalizeCardName(priceRow.name);
      if (!productsByName.has(nameKey)) productsByName.set(nameKey, []);
      productsByName.get(nameKey).push(priceRow);
    });

    const cardsByName = new Map();
    orderCardsBySetNumber(cards).forEach(card => {
      const nameKey = normalizeCardName(card.name);
      if (!cardsByName.has(nameKey)) cardsByName.set(nameKey, []);
      cardsByName.get(nameKey).push(card);
    });

    cardsByName.forEach((cardsWithName, nameKey) => {
      const productsWithName = productsByName.get(nameKey);
      if (!productsWithName || productsWithName.length === 0) return;

      const isApproximate = productsWithName.length !== cardsWithName.length;
      cardsWithName.forEach((card, ordinalIndex) => {
        const priceRow = productsWithName[ordinalIndex];
        if (!priceRow) return;
        nextPriceIndex.set(card.id, priceRow);
        if (isApproximate) approximateCount += 1;
      });
    });
  });

  priceByCardId = nextPriceIndex;
  updatePriceSummaryLine(approximateCount);
}

// Describes the priced/unpriced state of what is currently on screen.
function updatePriceSummaryLine(approximateCount) {
  const shown = selectedCards();
  if (shown.length === 0) {
    const label = priceSnapshotDate ? ` · snapshot ${formatSnapshotDate(priceSnapshotDate)}` : '';
    updatePriceStatusLine(`Price index ready${label}.`, 'ready');
    return;
  }

  const unpricedSets = selectedSetKeys
    .map(findSetDefinition)
    .filter(setDefinition => setDefinition && !setDefinition.priced);

  const priced = shown.filter(card => priceByCardId.has(card.id)).length;
  const snapshotLabel = priceSnapshotDate ? ` · snapshot ${formatSnapshotDate(priceSnapshotDate)}` : '';
  const originLabel = priceSnapshotOrigin === 'locally refreshed' ? ' · refreshed in this browser' : '';
  const approxNote = approximateCount > 0
    ? ` ${approximateCount} are best-guess matches.` : '';

  if (unpricedSets.length > 0) {
    const names = unpricedSets.map(setDefinition => setDefinition.label);
    const shownNames = names.slice(0, 3).join(', ') + (names.length > 3 ? ` +${names.length - 3} more` : '');
    updatePriceStatusLine(
      `${priced} of ${shown.length} shown cards priced${snapshotLabel}. ` +
      `No prices for ${shownNames} — the Cardmarket expansion could not be identified, ` +
      `so those cards are deliberately left unpriced rather than guessed.${approxNote}`,
      'warn'
    );
    return;
  }

  if (priced < shown.length) {
    updatePriceStatusLine(
      `${priced} of ${shown.length} shown cards priced${snapshotLabel}${originLabel}.${approxNote}`,
      'warn'
    );
    return;
  }

  updatePriceStatusLine(
    `All ${priced} shown cards priced${snapshotLabel}${originLabel}.${approxNote}`,
    approximateCount > 0 ? 'warn' : 'ready'
  );
}

function formatSnapshotDate(isoLikeDateString) {
  const parsedDate = new Date(isoLikeDateString);
  if (Number.isNaN(parsedDate.getTime())) return isoLikeDateString;
  return parsedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

/* --- price basis ---------------------------------------------------------- */

function loadPersistedPriceBasis() {
  try {
    const storedBasis = localStorage.getItem(TCG_CONFIG.PRICE_BASIS_KEY);
    if (PRICE_BASES.some(basis => basis.key === storedBasis)) return storedBasis;
  } catch (storageReadException) {
    console.warn('Could not read stored price basis:', storageReadException);
  }
  return DEFAULT_PRICE_BASIS;
}

function getActivePriceBasis() {
  return PRICE_BASES.find(basis => basis.key === currentPriceBasisKey) || PRICE_BASES[1];
}

function setPriceBasis(nextBasisKey) {
  if (!PRICE_BASES.some(basis => basis.key === nextBasisKey)) return;
  if (nextBasisKey === currentPriceBasisKey) return;

  currentPriceBasisKey = nextBasisKey;
  try {
    localStorage.setItem(TCG_CONFIG.PRICE_BASIS_KEY, nextBasisKey);
  } catch (storageWriteException) {
    console.warn('Could not persist price basis:', storageWriteException);
  }

  syncPriceBasisControls();

  // Only the valuation changed, so repoint the rendered cards rather than
  // rebuilding the grid and recreating every image.
  if (!refreshRenderedCardValues()) renderCardGrid();
}

function syncPriceBasisControls() {
  const activeBasis = getActivePriceBasis();

  PRICE_BASES.forEach(basis => {
    const DOMBasisButton = document.getElementById(`basis-${basis.key}`);
    if (!DOMBasisButton) return;
    const isActiveBasis = basis.key === activeBasis.key;
    DOMBasisButton.classList.toggle('basis-btn--active', isActiveBasis);
    DOMBasisButton.setAttribute('aria-pressed', String(isActiveBasis));
  });

  const DOMValueNote = document.getElementById('metricValueBasis');
  if (DOMValueNote) DOMValueNote.textContent = activeBasis.description;
}

// Whether a card exists in a reverse-holo finish. Decided by the average-sale
// column alone, never by the selected basis: the snapshot stores a literal 0 in
// trend-holo for single-finish cards, so keying off the trend column would
// invent a €0.00 reverse row for every ex, secret rare and vintage card.
function cardHasReverseFinish(priceRow) {
  return !!priceRow && priceRow.avgHolo !== null && priceRow.avgHolo !== undefined;
}

function variantRowsForCard(card) {
  const priceRow = priceByCardId.get(card.id) || null;
  const activeBasis = getActivePriceBasis();
  const hasReverse = cardHasReverseFinish(priceRow);

  return VARIANT_DEFINITIONS.map(variant => {
    const priceField = variant.finish === 'holo' ? activeBasis.holoField : activeBasis.baseField;
    const rawPrice = priceRow ? priceRow[priceField] : null;
    const isPriceable = variant.finish !== 'holo' || hasReverse;
    const unitPrice = (!isPriceable || rawPrice === null || rawPrice === undefined) ? null : Number(rawPrice);

    return {
      key: variant.key,
      label: variant.label,
      unitPrice,
      count: readVariantCount(card.id, variant.key)
    };
  }).filter(variantRow =>
    variantRow.key === 'normal' || (variantRow.key === 'reverse' && hasReverse) || variantRow.count > 0
  );
}

function heldValueForCard(card) {
  return variantRowsForCard(card).reduce(
    (runningTotal, variantRow) => runningTotal + (variantRow.unitPrice || 0) * variantRow.count,
    0
  );
}

/* ---------------------------------------------------------------------------
   Status lines
   --------------------------------------------------------------------------- */

function applyStatusLine(elementId, statusMessage, statusKind) {
  const DOMStatusLine = document.getElementById(elementId);
  if (!DOMStatusLine) return;

  DOMStatusLine.textContent = statusMessage;
  DOMStatusLine.className = `status-line status-line--${statusKind || 'loading'}`;
  DOMStatusLine.classList.toggle('hidden', !statusMessage);
}

function updateSetStatusLine(statusMessage, statusKind) {
  applyStatusLine('setStatusLine', statusMessage, statusKind);
}

function updatePriceStatusLine(statusMessage, statusKind) {
  applyStatusLine('priceStatusLine', statusMessage, statusKind);
}

/* ---------------------------------------------------------------------------
   Rendering
   --------------------------------------------------------------------------- */

function composeVariantRowMarkup(card, variantRow) {
  const priceLabel = variantRow.unitPrice === null ? '—' : formatEuroAmount(variantRow.unitPrice);

  return `
    <div class="variant-row">
      <span class="variant-name">${escapeMarkupText(variantRow.label)}</span>
      <span class="variant-price">${priceLabel}</span>
      <span class="stepper">
        <button type="button" class="step-btn" data-variant="${variantRow.key}" data-step="-1"
                aria-label="Remove one ${escapeMarkupText(variantRow.label)} ${escapeMarkupText(card.name)}"
                ${variantRow.count === 0 ? 'disabled' : ''}>&minus;</button>
        <span class="step-value ${variantRow.count > 0 ? 'step-value--held' : ''}">${variantRow.count}</span>
        <button type="button" class="step-btn" data-variant="${variantRow.key}" data-step="1"
                aria-label="Add one ${escapeMarkupText(variantRow.label)} ${escapeMarkupText(card.name)}">+</button>
      </span>
    </div>
  `;
}

function composeCardMarkup(card, showSetBadge) {
  const variantRows = variantRowsForCard(card);
  const heldValue = heldValueForCard(card);
  const totalCopies = totalCopiesForCard(card.id);
  const raritySlug = RARITY_SLUG_MAP[card.rarity] || 'unlisted';
  const safeCardName = escapeMarkupText(card.name);
  const setDefinition = findSetDefinition(card.setKey);
  const setTotal = setDefinition ? setDefinition.setTotal : '';
  const paddedNumber = String(parseCollectorNumber(card.number)).padStart(3, '0');

  return `
    <div class="card-head">
      <span class="card-num">#${escapeMarkupText(paddedNumber)}/${escapeMarkupText(setTotal)}</span>
      <span class="rarity rarity--${raritySlug}" title="${escapeMarkupText(card.rarity)}">${escapeMarkupText(card.rarity)}</span>
    </div>

    ${showSetBadge && setDefinition
      ? `<div class="set-badge">${escapeMarkupText(setDefinition.label)}</div>`
      : ''}

    <div class="art" title="Add a normal copy of ${safeCardName}">
      ${card.imageUrl
        ? `<img class="art-img" src="${escapeMarkupText(card.imageUrl)}" alt="${safeCardName}" loading="lazy" decoding="async">`
        : `<span class="art-fallback">🖤</span>`}
    </div>

    <h3 class="card-title" title="${safeCardName}">${safeCardName}</h3>

    <div class="held-row ${totalCopies > 0 ? 'held-row--active' : ''}">
      <span>${totalCopies > 0 ? `Held · ${totalCopies}` : 'Not held'}</span>
      <strong>${formatEuroAmount(heldValue)}</strong>
    </div>

    <div class="variants">
      ${variantRows.map(variantRow => composeVariantRowMarkup(card, variantRow)).join('')}
    </div>
  `;
}

function paintCardElement(cardNodeElement, card, shouldAnimateEntry, showSetBadge) {
  const isHeld = totalCopiesForCard(card.id) > 0;
  cardNodeElement.className = `card${isHeld ? ' card--active' : ''}${shouldAnimateEntry ? ' animate-card-in' : ''}`;
  cardNodeElement.innerHTML = composeCardMarkup(card, showSetBadge);
}

// Updates the values on an already-rendered card without touching its markup.
//
// Rewriting innerHTML would destroy and recreate the <img>, making the artwork
// blink every time a count or the price basis changes. Only the text, classes
// and disabled states that actually differ are written here, so the image
// element is left completely alone.
//
// Returns false when the card's structure has changed (a variant row appearing
// or disappearing), in which case the caller must do a full repaint.
function updateCardValuesInPlace(cardNodeElement, card) {
  if (typeof cardNodeElement.querySelectorAll !== 'function') return false;

  const variantRows = variantRowsForCard(card);
  const rowNodes = cardNodeElement.querySelectorAll('.variant-row');
  if (rowNodes.length !== variantRows.length) return false;

  const totalCopies = totalCopiesForCard(card.id);
  cardNodeElement.classList.toggle('card--active', totalCopies > 0);

  const DOMHeldRow = cardNodeElement.querySelector('.held-row');
  if (DOMHeldRow) {
    DOMHeldRow.classList.toggle('held-row--active', totalCopies > 0);
    const DOMHeldLabel = DOMHeldRow.querySelector('span');
    const DOMHeldValue = DOMHeldRow.querySelector('strong');
    if (DOMHeldLabel) DOMHeldLabel.textContent = totalCopies > 0 ? `Held · ${totalCopies}` : 'Not held';
    if (DOMHeldValue) DOMHeldValue.textContent = formatEuroAmount(heldValueForCard(card));
  }

  variantRows.forEach((variantRow, rowIndex) => {
    const rowNode = rowNodes[rowIndex];
    const DOMPrice = rowNode.querySelector('.variant-price');
    const DOMValue = rowNode.querySelector('.step-value');
    const DOMMinus = rowNode.querySelector('[data-step="-1"]');

    if (DOMPrice) {
      DOMPrice.textContent = variantRow.unitPrice === null ? '—' : formatEuroAmount(variantRow.unitPrice);
    }
    if (DOMValue) {
      DOMValue.textContent = String(variantRow.count);
      DOMValue.classList.toggle('step-value--held', variantRow.count > 0);
    }
    if (DOMMinus) DOMMinus.disabled = variantRow.count === 0;
  });

  return true;
}

// Repoints every rendered card at the current prices without rebuilding the grid.
// Used when only the valuation changed, not which cards are on screen.
function refreshRenderedCardValues() {
  const DOMGridContainer = document.getElementById('cardGridContainer');
  if (!DOMGridContainer || typeof DOMGridContainer.querySelectorAll !== 'function') return false;

  const cardNodes = DOMGridContainer.querySelectorAll('[data-card-id]');
  if (cardNodes.length === 0) return false;

  const cardsById = new Map(selectedCards().map(card => [card.id, card]));

  for (let nodeIndex = 0; nodeIndex < cardNodes.length; nodeIndex++) {
    const cardNodeElement = cardNodes[nodeIndex];
    const cardEntity = cardsById.get(cardNodeElement.dataset.cardId);
    if (!cardEntity || !updateCardValuesInPlace(cardNodeElement, cardEntity)) return false;
  }

  updateDashboardMetrics();
  return true;
}

// Cards arrive grouped by set (selectedCards walks the registry in order), so a
// heading is emitted whenever the set changes. It sticks to the top of the
// viewport while that set's cards scroll past, so the set being looked at is
// always named.
function buildSetHeadingElement(setDefinition, cardsInSet) {
  const heldCount = cardsInSet.filter(card => totalCopiesForCard(card.id) > 0).length;
  const heldValue = cardsInSet.reduce((total, card) => total + heldValueForCard(card), 0);

  const headingElement = document.createElement('div');
  headingElement.className = 'set-heading';
  headingElement.innerHTML = `
    <span class="set-heading-name">${escapeMarkupText(setDefinition.label)}</span>
    ${setDefinition.priced
      ? ''
      : '<span class="set-heading-flag" title="This set has no price data">no prices</span>'}
    <span class="set-heading-stats">
      ${heldCount} / ${cardsInSet.length} held${
        setDefinition.priced && heldValue > 0 ? ` · ${formatEuroAmount(heldValue)}` : ''}
    </span>
  `;
  return headingElement;
}

function selectVisibleCards() {
  const uniformQueryString = currentSearchFilterString.toLowerCase().trim();
  const numericQuery = uniformQueryString.replace(/^#/, '');

  return selectedCards().filter(card => {
    const isHeld = totalCopiesForCard(card.id) > 0;

    if (currentActiveTab === 'owned' && !isHeld) return false;
    if (currentActiveTab === 'missing' && isHeld) return false;

    if (uniformQueryString) {
      const setDefinition = findSetDefinition(card.setKey);
      const matchesName = card.name.toLowerCase().includes(uniformQueryString);
      const matchesRarity = card.rarity.toLowerCase().includes(uniformQueryString);
      const matchesSet = !!setDefinition && setDefinition.label.toLowerCase().includes(uniformQueryString);
      const matchesNumber = String(card.number).toLowerCase() === numericQuery
        || String(parseCollectorNumber(card.number)) === numericQuery;

      if (!matchesName && !matchesRarity && !matchesSet && !matchesNumber) return false;
    }

    return true;
  });
}

// shouldAnimateEntry: only true for renders the user reads as a new screen (first
// load, tab switch, set change, import). Search keystrokes and stepper clicks
// must not replay the entry animation.
function renderCardGrid({ animateEntry: shouldAnimateEntry = false } = {}) {
  const DOMGridContainer = document.getElementById('cardGridContainer');
  const DOMFallbackView = document.getElementById('emptyFallbackView');
  if (!DOMGridContainer || !DOMFallbackView) return;

  // Guard against painting before any set list exists: the local price snapshot
  // resolves long before the network catalogues do, and rendering an empty grid
  // here would flash "NO MATCHES FOUND" underneath the loading skeleton.
  if (!anySelectedCatalogueLoaded()) {
    DOMGridContainer.innerHTML = '';
    DOMFallbackView.classList.add('hidden');
    updateDashboardMetrics();
    return;
  }

  const visibleCards = selectVisibleCards();
  const showSetHeadings = selectedSetKeys.length > 1;
  // The heading names the set, so the per-card badge would just repeat it.
  const showSetBadge = false;

  DOMGridContainer.innerHTML = '';
  DOMFallbackView.classList.toggle('hidden', visibleCards.length > 0);
  DOMGridContainer.classList.toggle('hidden', visibleCards.length === 0);

  const renderFragment = document.createDocumentFragment();

  // Group the visible cards by set so each heading can report its own totals.
  const cardsBySetKey = new Map();
  visibleCards.forEach(card => {
    if (!cardsBySetKey.has(card.setKey)) cardsBySetKey.set(card.setKey, []);
    cardsBySetKey.get(card.setKey).push(card);
  });

  let headedSetKey = null;
  visibleCards.forEach((card, renderIndex) => {
    if (showSetHeadings && card.setKey !== headedSetKey) {
      headedSetKey = card.setKey;
      const setDefinition = findSetDefinition(card.setKey);
      if (setDefinition) {
        renderFragment.appendChild(
          buildSetHeadingElement(setDefinition, cardsBySetKey.get(card.setKey)));
      }
    }

    const cardNodeElement = document.createElement('article');
    cardNodeElement.dataset.cardId = card.id;

    paintCardElement(cardNodeElement, card, shouldAnimateEntry, showSetBadge);

    if (shouldAnimateEntry) {
      cardNodeElement.style.animationDelay = `${Math.min(renderIndex, 24) * 18}ms`;
    }

    renderFragment.appendChild(cardNodeElement);
  });
  DOMGridContainer.appendChild(renderFragment);

  updateDashboardMetrics();
}

function adjustVariantCount(cardId, variantKey, deltaValue) {
  const currentCount = readVariantCount(cardId, variantKey);
  const nextCount = Math.max(0, Math.min(currentCount + deltaValue, 9999));
  if (nextCount === currentCount) return;

  const entry = inventoryByCardId[cardId] || {};
  if (nextCount === 0) {
    delete entry[variantKey];
  } else {
    entry[variantKey] = nextCount;
  }

  if (Object.keys(entry).length === 0) {
    delete inventoryByCardId[cardId];
  } else {
    inventoryByCardId[cardId] = entry;
  }

  persistInventory();

  // Under OWNED / MISSING a card can cross the filter boundary, so the whole view
  // has to be rebuilt. Under ALL only this one tile changes.
  const crossedFilterBoundary = currentActiveTab !== 'all'
    && ((currentCount === 0) !== (nextCount === 0));

  if (crossedFilterBoundary) {
    renderCardGrid();
    return;
  }

  const cardNodeElement = document.querySelector(`#cardGridContainer [data-card-id="${CSS.escape(cardId)}"]`);
  const cardEntity = selectedCards().find(entity => entity.id === cardId);

  if (!cardNodeElement || !cardEntity) {
    renderCardGrid();
    return;
  }

  // Patch the values in place so the artwork never blinks; fall back to a full
  // repaint only if a variant row appeared or disappeared.
  if (!updateCardValuesInPlace(cardNodeElement, cardEntity)) {
    paintCardElement(cardNodeElement, cardEntity, false, selectedSetKeys.length > 1);
  }
  updateDashboardMetrics();
}

function updateDashboardMetrics() {
  const visibleSetCards = selectedCards();
  const catalogueIdSet = new Set(visibleSetCards.map(card => card.id));
  const setTotalCount = visibleSetCards.length;

  let totalCopies = 0;
  let uniqueHeld = 0;
  let portfolioValue = 0;

  visibleSetCards.forEach(card => {
    const copies = totalCopiesForCard(card.id);
    if (copies > 0) {
      totalCopies += copies;
      uniqueHeld += 1;
      portfolioValue += heldValueForCard(card);
    }
  });

  // Copies recorded against cards outside the current selection still count as
  // owned stock, but never toward completion of the sets on screen.
  Object.keys(inventoryByCardId).forEach(cardId => {
    if (!catalogueIdSet.has(cardId)) totalCopies += totalCopiesForCard(cardId);
  });

  const completionPercent = setTotalCount > 0 ? Math.round((uniqueHeld / setTotalCount) * 100) : 0;

  document.getElementById('metricCopies').textContent = String(totalCopies);
  document.getElementById('metricUnique').textContent = `${uniqueHeld} / ${setTotalCount}`;
  document.getElementById('metricValue').textContent = formatEuroAmount(portfolioValue);
  document.getElementById('metricCompletion').textContent = `${completionPercent}%`;
  document.getElementById('completionBar').style.width = `${completionPercent}%`;
}

/* ---------------------------------------------------------------------------
   Controls
   --------------------------------------------------------------------------- */

function handleSearchQuery(inputSearchString) {
  currentSearchFilterString = inputSearchString;
  renderCardGrid();
}

function switchViewTab(targetViewSelectionKey) {
  currentActiveTab = targetViewSelectionKey;

  ['all', 'owned', 'missing'].forEach(tabKey => {
    const DOMButtonElement = document.getElementById(`tab-${tabKey}`);
    const isActiveTab = tabKey === targetViewSelectionKey;
    DOMButtonElement.classList.toggle('tab-btn--active', isActiveTab);
    DOMButtonElement.setAttribute('aria-selected', String(isActiveTab));
  });

  renderCardGrid({ animateEntry: true });
}

function exportCollectionJSON() {
  const heldCardCount = Object.keys(inventoryByCardId).length;
  if (heldCardCount === 0) {
    alert('Nothing to export yet — add some cards to your collection first.');
    return;
  }

  const exportPayload = {
    version: 3,
    exportedAt: new Date().toISOString(),
    inventory: inventoryByCardId
  };

  const objectUrl = URL.createObjectURL(
    new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' })
  );

  const DOMAnchorDownloadElement = document.createElement('a');
  DOMAnchorDownloadElement.href = objectUrl;
  DOMAnchorDownloadElement.download = `pokemon_collection_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(DOMAnchorDownloadElement);
  DOMAnchorDownloadElement.click();
  DOMAnchorDownloadElement.remove();
  URL.revokeObjectURL(objectUrl);
}

// Accepts the current export shape and both earlier formats.
function interpretImportedPayload(parsedPayload) {
  if (Array.isArray(parsedPayload)) {
    if (!parsedPayload.every(item => typeof item === 'string')) return null;
    const convertedInventory = {};
    parsedPayload.forEach(cardId => { convertedInventory[cardId] = { normal: 1 }; });
    return convertedInventory;
  }

  if (parsedPayload && typeof parsedPayload === 'object' && parsedPayload.inventory) {
    return parsedPayload.inventory;
  }

  return null;
}

function importCollectionJSON(domEventScope) {
  const importInputElement = domEventScope.target;
  const browserFileHandle = importInputElement.files && importInputElement.files[0];
  if (!browserFileHandle) return;

  const resetImportInputControl = () => { importInputElement.value = ''; };
  const fileSystemReaderInstance = new FileReader();

  fileSystemReaderInstance.onerror = function () {
    alert('Error reading file from disk.');
    resetImportInputControl();
  };

  fileSystemReaderInstance.onload = function (readerEvent) {
    try {
      const interpretedInventory = interpretImportedPayload(JSON.parse(readerEvent.target.result));

      if (!interpretedInventory) {
        alert('Validation failed: expected a collection export, or an array of card id strings such as ["me5-1", "base1-4"].');
      } else {
        inventoryByCardId = sanitizeInventoryObject(interpretedInventory);
        persistInventory();
        renderCardGrid({ animateEntry: true });

        const shownIdSet = new Set(selectedCards().map(card => card.id));
        const importedCardCount = Object.keys(inventoryByCardId).length;
        const matchedOnScreen = Object.keys(inventoryByCardId)
          .filter(cardId => shownIdSet.has(cardId)).length;

        alert(`Imported ${importedCardCount} cards (${matchedOnScreen} belong to the sets currently shown).`);
      }
    } catch (jsonSyntaxException) {
      alert('Error parsing file schema.');
    }
    resetImportInputControl();
  };

  fileSystemReaderInstance.readAsText(browserFileHandle);
}

/* ---------------------------------------------------------------------------
   Re-distilling the raw Cardmarket dumps in the browser.

   Port of build-price-index.py: fingerprint each set's expansion from its anchor
   names, break ties on expected product count, keep that expansion's products in
   idProduct order, and join each to its price row.
   --------------------------------------------------------------------------- */

function stripVariantSuffix(productName) {
  return String(productName).replace(/\s*\[[^\]]{2,}\]\s*$/, '').trim();
}

// Mirrors resolve_expansion() in build-price-index.py: the registry caches the
// expansion found last time, which is trusted only when every anchor name is
// still present in it. Otherwise the expansion is re-fingerprinted, so a
// renumbered snapshot is detected rather than silently mis-priced.
function detectExpansionIdForSet(setDefinition, productsByExpansion) {
  // Unpriced sets carry no anchors by design — nothing to fingerprint.
  if (!Array.isArray(setDefinition.anchorNames) || setDefinition.anchorNames.length === 0) return null;

  const anchorNames = new Set(setDefinition.anchorNames.map(name => normalizeCardName(name)));

  const anchorCoverage = expansionId => {
    const products = productsByExpansion.get(expansionId);
    if (!products) return 0;
    const present = new Set(products.map(product => normalizeCardName(product.name)));
    let matched = 0;
    anchorNames.forEach(anchorName => { if (present.has(anchorName)) matched += 1; });
    return matched / anchorNames.size;
  };

  const cachedId = setDefinition.expansionId;
  const cachedCoverage = (cachedId === undefined || cachedId === null) ? 0 : anchorCoverage(cachedId);
  if (cachedCoverage === 1) return cachedId;

  const expectedProducts = setDefinition.expectedProducts || 0;
  const candidates = [];
  productsByExpansion.forEach((products, expansionId) => {
    if (expansionId === null || expansionId === undefined) return;
    const coverage = anchorCoverage(expansionId);
    if (coverage >= DUMP_CONFIG.MINIMUM_ANCHOR_COVERAGE) {
      candidates.push({
        expansionId,
        coverage,
        sizeDelta: Math.abs(products.length - expectedProducts)
      });
    }
  });

  if (candidates.length === 0) return cachedCoverage > 0 ? cachedId : null;
  candidates.sort((left, right) => left.sizeDelta - right.sizeDelta || right.coverage - left.coverage);
  return candidates[0].expansionId;
}

function distillSnapshotFromDumps(productsPayload, priceGuidePayload, registrySets) {
  // registrySets is already narrowed to the sets being refreshed.
  const allProducts = (productsPayload && productsPayload.products) || [];
  const allPriceRows = (priceGuidePayload && priceGuidePayload.priceGuides) || [];

  if (allProducts.length === 0) throw new Error('the products file has no "products" array');
  if (allPriceRows.length === 0) throw new Error('the price guide has no "priceGuides" array');

  const productsByExpansion = new Map();
  // Cardmarket files code cards inside set expansions; they are not cards.
  allProducts.filter(product => !/code card/i.test(product.name)).forEach(product => {
    if (!productsByExpansion.has(product.idExpansion)) productsByExpansion.set(product.idExpansion, []);
    productsByExpansion.get(product.idExpansion).push(product);
  });

  const priceRowByProductId = new Map(allPriceRows.map(row => [row.idProduct, row]));

  const sets = {};
  const missingSets = [];

  registrySets.forEach(setDefinition => {
    if (setDefinition.priced === false) return;
    const expansionId = detectExpansionIdForSet(setDefinition, productsByExpansion);
    if (expansionId === null) {
      missingSets.push(setDefinition.label);
      return;
    }

    const cards = (productsByExpansion.get(expansionId) || [])
      .slice()
      .sort((leftProduct, rightProduct) => leftProduct.idProduct - rightProduct.idProduct)
      .map(product => {
        const priceRow = priceRowByProductId.get(product.idProduct);
        if (!priceRow) return null;
        return {
          idProduct: product.idProduct,
          name: stripVariantSuffix(product.name),
          avg: priceRow.avg ?? null,
          low: priceRow.low ?? null,
          trend: priceRow.trend ?? null,
          avg30: priceRow.avg30 ?? null,
          avgHolo: priceRow['avg-holo'] ?? null,
          lowHolo: priceRow['low-holo'] ?? null,
          trendHolo: priceRow['trend-holo'] ?? null,
          avg30Holo: priceRow['avg30-holo'] ?? null
        };
      })
      .filter(Boolean);

    sets[setDefinition.key] = {
      label: setDefinition.label,
      apiSetId: setDefinition.apiSetId,
      setTotal: setDefinition.setTotal,
      expansionId,
      cards
    };
  });

  if (Object.keys(sets).length === 0) {
    throw new Error('none of the tracked sets were found — is this snapshot older than they are?');
  }
  if (missingSets.length > 0) {
    console.warn('Sets absent from this snapshot:', missingSets);
  }

  return {
    generatedAt: new Date().toISOString(),
    snapshotDate: (priceGuidePayload && priceGuidePayload.createdAt) || null,
    sourceFiles: [DUMP_CONFIG.PRODUCTS_URL, DUMP_CONFIG.PRICE_GUIDE_URL],
    sets
  };
}

async function fetchDumpFile(assetUrl) {
  const assetResponse = await fetch(assetUrl);
  if (!assetResponse.ok) throw new Error(`${assetUrl} — HTTP ${assetResponse.status}`);
  return assetResponse.json();
}

async function fetchSetRegistryDefinitions() {
  const registryResponse = await fetch(TCG_CONFIG.SET_REGISTRY_URL);
  if (!registryResponse.ok) {
    throw new Error(`${TCG_CONFIG.SET_REGISTRY_URL} — HTTP ${registryResponse.status}`);
  }
  const registryPayload = await registryResponse.json();
  if (!registryPayload || !Array.isArray(registryPayload.sets)) {
    throw new Error(`${TCG_CONFIG.SET_REGISTRY_URL} has no "sets" array`);
  }
  return registryPayload.sets;
}

function readFileAsJSON(fileHandle) {
  return new Promise((resolveJSON, rejectJSON) => {
    const readerInstance = new FileReader();
    readerInstance.onerror = () => rejectJSON(new Error(`could not read ${fileHandle.name}`));
    readerInstance.onload = readerEvent => {
      try {
        resolveJSON(JSON.parse(readerEvent.target.result));
      } catch (parseException) {
        rejectJSON(new Error(`${fileHandle.name} is not valid JSON`));
      }
    };
    readerInstance.readAsText(fileHandle);
  });
}

// The two dumps are told apart by their contents, so it does not matter which
// order they were picked in or what they were renamed to.
function sortDumpPayloads(payloadList) {
  const productsPayload = payloadList.find(payload => payload && Array.isArray(payload.products));
  const priceGuidePayload = payloadList.find(payload => payload && Array.isArray(payload.priceGuides));

  if (!productsPayload) throw new Error('no products file among the selected files');
  if (!priceGuidePayload) throw new Error('no price guide file among the selected files');
  return { productsPayload, priceGuidePayload };
}

function setUpdateButtonBusy(isBusy) {
  const DOMUpdateButton = document.getElementById('updatePricesButton');
  if (!DOMUpdateButton) return;
  DOMUpdateButton.disabled = isBusy;
  DOMUpdateButton.textContent = isBusy ? 'UPDATING…' : 'UPDATE PRICES';
}

async function refreshPricesFromDumps(payloadSource, { offerFilePicker = false } = {}) {
  setUpdateButtonBusy(true);

  try {
    // Only the sets on screen are rebuilt. Re-distilling all 141 would hold
    // megabytes in localStorage, well past what browsers allow; the Python
    // script remains the way to refresh everything at once.
    const targetSets = selectedSetKeys
      .map(findSetDefinition)
      .filter(setDefinition => setDefinition && setDefinition.priced);

    if (targetSets.length === 0) {
      updatePriceStatusLine('Select at least one priced set to refresh.', 'warn');
      return;
    }

    const registrySets = (await fetchSetRegistryDefinitions())
      .filter(entry => targetSets.some(setDefinition => setDefinition.key === entry.key));

    const { productsPayload, priceGuidePayload } = await payloadSource();
    updatePriceStatusLine(`Rebuilding prices for ${registrySets.length} set(s)…`, 'loading');

    const refreshed = distillSnapshotFromDumps(productsPayload, priceGuidePayload, registrySets);

    let storedCount = 0;
    let cardCount = 0;
    Object.keys(refreshed.sets).forEach(setKey => {
      const block = refreshed.sets[setKey];
      const perSet = {
        key: setKey,
        label: block.label,
        expansionId: block.expansionId,
        snapshotDate: refreshed.snapshotDate,
        cards: block.cards
      };
      priceRowsBySetKey.set(setKey, block.cards);
      priceStateBySetKey.set(setKey, 'ready');
      cardCount += block.cards.length;
      if (writePriceOverride(setKey, perSet)) storedCount += 1;
    });

    priceSnapshotDate = refreshed.snapshotDate || priceSnapshotDate;
    priceSnapshotOrigin = 'locally refreshed';
    rebuildPriceIndex();
    renderSetPicker();
    if (!refreshRenderedCardValues()) renderCardGrid();

    offerRegeneratedIndexDownload(refreshed, storedCount, cardCount);
  } catch (exceptionContext) {
    console.warn('Price refresh failed:', exceptionContext);
    updatePriceStatusLine(`Could not update prices: ${exceptionContext.message}`, 'unavailable');

    if (offerFilePicker) {
      const DOMPriceStatusLine = document.getElementById('priceStatusLine');
      const DOMPickButton = document.createElement('button');
      DOMPickButton.type = 'button';
      DOMPickButton.className = 'inline-link-btn';
      DOMPickButton.textContent = 'choose the two files from your computer';
      DOMPickButton.addEventListener('click', () => document.getElementById('dumpsInput').click());
      DOMPriceStatusLine.appendChild(document.createTextNode(' '));
      DOMPriceStatusLine.appendChild(DOMPickButton);
    }
  } finally {
    setUpdateButtonBusy(false);
  }
}

function refreshPricesFromFolder() {
  return refreshPricesFromDumps(async () => {
    updatePriceStatusLine(
      `Downloading ${DUMP_CONFIG.PRODUCTS_URL} and ${DUMP_CONFIG.PRICE_GUIDE_URL} — these are large files, this can take a moment…`,
      'loading'
    );
    const [productsPayload, priceGuidePayload] = await Promise.all([
      fetchDumpFile(DUMP_CONFIG.PRODUCTS_URL),
      fetchDumpFile(DUMP_CONFIG.PRICE_GUIDE_URL)
    ]);
    return { productsPayload, priceGuidePayload };
  }, { offerFilePicker: true });
}

function refreshPricesFromChosenFiles(domEventScope) {
  const dumpInputElement = domEventScope.target;
  const chosenFiles = Array.from(dumpInputElement.files || []);
  dumpInputElement.value = '';

  if (chosenFiles.length === 0) return;
  if (chosenFiles.length !== 2) {
    updatePriceStatusLine('Select both files at once: the products file and the price guide.', 'unavailable');
    return;
  }

  refreshPricesFromDumps(async () => {
    updatePriceStatusLine('Reading the selected files…', 'loading');
    const payloadList = await Promise.all(chosenFiles.map(readFileAsJSON));
    return sortDumpPayloads(payloadList);
  });
}

// Refreshed prices live in this browser only. For visitors to see them, the
// served card-prices.json has to be replaced — so hand back the regenerated file.
function offerRegeneratedIndexDownload(refreshed, storedCount, cardCount) {
  const DOMPriceStatusLine = document.getElementById('priceStatusLine');
  if (!DOMPriceStatusLine) return;

  const setKeys = Object.keys(refreshed.sets);
  const snapshotLabel = refreshed.snapshotDate ? formatSnapshotDate(refreshed.snapshotDate) : 'unknown date';

  DOMPriceStatusLine.className = 'status-line status-line--ready';
  DOMPriceStatusLine.classList.remove('hidden');
  DOMPriceStatusLine.textContent =
    `Refreshed ${setKeys.length} set(s), ${cardCount} cards, snapshot ${snapshotLabel}. ` +
    `Saved in this browser for ${storedCount} of them. Visitors keep the old prices until the served ` +
    `files are replaced — run "python3 build-price-index.py" for a full rebuild, or download just these: `;

  setKeys.forEach((setKey, index) => {
    if (index > 0) DOMPriceStatusLine.appendChild(document.createTextNode(', '));
    const DOMButton = document.createElement('button');
    DOMButton.type = 'button';
    DOMButton.className = 'inline-link-btn';
    DOMButton.textContent = `${setKey}.json`;
    DOMButton.addEventListener('click', () => downloadRegeneratedIndex({
      key: setKey,
      label: refreshed.sets[setKey].label,
      expansionId: refreshed.sets[setKey].expansionId,
      snapshotDate: refreshed.snapshotDate,
      cards: refreshed.sets[setKey].cards
    }, `${setKey}.json`));
    DOMPriceStatusLine.appendChild(DOMButton);
  });
}

function downloadRegeneratedIndex(refreshedSnapshot, fileName) {
  const objectUrl = URL.createObjectURL(
    new Blob([JSON.stringify(refreshedSnapshot, null, 1)], { type: 'application/json' })
  );
  const DOMAnchorDownloadElement = document.createElement('a');
  DOMAnchorDownloadElement.href = objectUrl;
  DOMAnchorDownloadElement.download = fileName || TCG_CONFIG.PRICE_INDEX_URL;
  document.body.appendChild(DOMAnchorDownloadElement);
  DOMAnchorDownloadElement.click();
  DOMAnchorDownloadElement.remove();
  URL.revokeObjectURL(objectUrl);
}

/* ---------------------------------------------------------------------------
   Wiring
   --------------------------------------------------------------------------- */

function attachEventHandlers() {
  const DOMGridContainer = document.getElementById('cardGridContainer');

  // Delegated so the grid keeps working across re-renders without rebinding, and
  // so no card data has to be interpolated into inline handler attributes.
  DOMGridContainer.addEventListener('click', clickEvent => {
    const stepButton = clickEvent.target.closest('.step-btn');
    if (stepButton) {
      const steppedCard = stepButton.closest('[data-card-id]');
      if (!steppedCard) return;
      adjustVariantCount(
        steppedCard.dataset.cardId,
        stepButton.dataset.variant,
        Number(stepButton.dataset.step)
      );
      return;
    }

    // Clicking the artwork is a shortcut for the normal-finish "+" button, which
    // is the overwhelmingly common action. Every card always offers a normal row,
    // so there is no card this cannot apply to.
    const artElement = clickEvent.target.closest('.art');
    if (!artElement) return;

    const cardNodeElement = artElement.closest('[data-card-id]');
    if (!cardNodeElement) return;

    adjustVariantCount(cardNodeElement.dataset.cardId, 'normal', 1);
  });

  // 'error' does not bubble, so this listens in the capture phase.
  DOMGridContainer.addEventListener('error', errorEvent => {
    const imageElement = errorEvent.target;
    if (!imageElement || imageElement.tagName !== 'IMG') return;
    imageElement.replaceWith(
      Object.assign(document.createElement('span'), { className: 'art-fallback', textContent: '🖤' })
    );
  }, true);

  document.getElementById('liveSearchInput')
    .addEventListener('input', inputEvent => handleSearchQuery(inputEvent.target.value));

  ['all', 'owned', 'missing'].forEach(tabKey => {
    document.getElementById(`tab-${tabKey}`)
      .addEventListener('click', () => switchViewTab(tabKey));
  });

  PRICE_BASES.forEach(basis => {
    const DOMBasisButton = document.getElementById(`basis-${basis.key}`);
    if (DOMBasisButton) DOMBasisButton.addEventListener('click', () => setPriceBasis(basis.key));
  });

  document.getElementById('setPickerButton')
    .addEventListener('click', () => toggleSetPickerPanel());
  document.getElementById('setPickerOptions')
    .addEventListener('change', changeEvent => {
      const checkboxElement = changeEvent.target;
      if (!checkboxElement || !checkboxElement.dataset.setKey) return;
      toggleSetSelection(checkboxElement.dataset.setKey, checkboxElement.checked);
    });
  document.getElementById('setPickerFilter')
    .addEventListener('input', inputEvent => handleSetPickerFilter(inputEvent.target.value));
  document.getElementById('setPickerAll').addEventListener('click', () => selectAllSets(true));
  document.getElementById('setPickerNone').addEventListener('click', () => selectAllSets(false));

  // Close the picker when clicking away from it.
  document.addEventListener('click', clickEvent => {
    const DOMPicker = document.getElementById('setPicker');
    if (DOMPicker && !DOMPicker.contains(clickEvent.target)) toggleSetPickerPanel(false);
  });

  document.getElementById('exportButton').addEventListener('click', exportCollectionJSON);
  document.getElementById('importInput').addEventListener('change', importCollectionJSON);
  document.getElementById('updatePricesButton').addEventListener('click', refreshPricesFromFolder);
  document.getElementById('dumpsInput').addEventListener('change', refreshPricesFromChosenFiles);
}

attachEventHandlers();
syncPriceBasisControls();
updateDashboardMetrics();
loadPriceSnapshot();
