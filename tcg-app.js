/* ===========================================================================
   Pitch Black (ME05) portfolio tracker.

   Two data sources are stitched together:
     1. api.pokemontcg.io  — the authoritative set list (names, collector
        numbers, rarities, card art). Fetched with retry + a 24h local cache.
     2. pitch-black-prices.json — the Cardmarket price snapshot, distilled from
        the two full catalogue dumps by build-price-index.py. Re-run that script
        after dropping in fresh dumps.

   Holdings are tracked per finish, per card, and valued against the matching
   Cardmarket column.
   =========================================================================== */

const TCG_CONFIG = {
  SET_ID: 'me5',
  SET_NAME: 'Pitch Black',
  SET_TOTAL: 120,
  API_ENDPOINT: 'https://api.pokemontcg.io/v2/cards',
  PRICE_INDEX_URL: 'pitch-black-prices.json',
  PRICE_OVERRIDE_KEY: 'app_tcgtracker_me5_price_override',
  INVENTORY_KEY: 'app_tcgtracker_me5_inventory_v2',
  PRICE_BASIS_KEY: 'app_tcgtracker_me5_price_basis',
  LEGACY_MANIFEST_KEY: 'app_tcgtracker_me5_owned_manifest',
  CATALOGUE_CACHE_KEY: 'app_tcgtracker_me5_catalogue_cache',
  CACHE_LIFETIME_MS: 1000 * 60 * 60 * 24,
  FETCH_ATTEMPT_LIMIT: 5,
  FETCH_BACKOFF_BASE_MS: 600
};

// Cardmarket's snapshot carries exactly two price columns per product: the base
// column and the holo column. For this set the holo column is populated for the
// 74 cards that have a reverse-holo print, and null for every ex and secret rare
// (which are printed in a single finish). Those two columns are the only finishes
// that can be valued, so those are the only two the tracker records.
const VARIANT_DEFINITIONS = [
  { key: 'normal', label: 'Normal', finish: 'base' },
  { key: 'reverse', label: 'Reverse', finish: 'holo' }
];

// Which Cardmarket metric the grid and the portfolio total are valued against.
// All four are present for every card in the snapshot; the holo counterparts are
// present for exactly the 74 reverse-holo cards.
const PRICE_BASES = [
  { key: 'low', label: 'Low', baseField: 'low', holoField: 'lowHolo', description: 'lowest current listing' },
  { key: 'avg', label: 'Avg', baseField: 'avg', holoField: 'avgHolo', description: 'average sale price' },
  { key: 'trend', label: 'Trend', baseField: 'trend', holoField: 'trendHolo', description: 'Cardmarket price trend' },
  { key: 'avg30', label: '30-day', baseField: 'avg30', holoField: 'avg30Holo', description: '30-day rolling average' }
];

const DEFAULT_PRICE_BASIS = 'avg';

// Re-distilling the raw Cardmarket dumps in the browser (the UPDATE PRICES button).
// This mirrors build-price-index.py exactly; either route produces the same file.
const DUMP_CONFIG = {
  PRODUCTS_URL: 'products_singles_6.json',
  PRICE_GUIDE_URL: 'price_guide_6.json',
  // Pokemon that debut as "Mega ___ ex" in Pitch Black, so they cannot appear under
  // any other Cardmarket expansion. Used to fingerprint this set's idExpansion rather
  // than hardcoding a number that would go stale.
  ANCHOR_CARD_NAMES: [
    'Mega Darkrai ex', 'Mega Zeraora ex', 'Mega Chandelure ex',
    'Mega Excadrill ex', 'Mega Delphox ex', 'Mega Slowbro ex'
  ]
};

const RARITY_SLUG_MAP = {
  'Common': 'common',
  'Uncommon': 'uncommon',
  'Rare': 'rare',
  'Double Rare': 'double-rare',
  'Illustration Rare': 'illustration-rare',
  'Ultra Rare': 'ultra-rare',
  'Special Illustration Rare': 'special-illustration-rare',
  'Mega Hyper Rare': 'mega-hyper-rare'
};

// Cardmarket abbreviates energy types inside the card name ("Shadowy [D] Energy")
// where the Pokemon TCG API spells them out ("Shadowy Darkness Energy").
const ENERGY_TYPE_ABBREVIATIONS = {
  G: 'Grass', R: 'Fire', W: 'Water', L: 'Lightning', P: 'Psychic',
  F: 'Fighting', D: 'Darkness', M: 'Metal', Y: 'Fairy', N: 'Dragon', C: 'Colorless'
};

let globalCachedCards = [];
let catalogueHasLoaded = false;
let currentActiveTab = 'all';
let currentSearchFilterString = '';

// cardId -> { avg, low, trend, avgHolo, ... }
let priceByCardId = new Map();
let priceSnapshotDate = null;

// cardId -> { normal: n, reverse: n }
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

// Reduces both naming conventions to one comparable key.
function normalizeCardName(rawCardName) {
  return String(rawCardName)
    .replace(/\[([A-Z])\]/g, (wholeMatch, typeLetter) =>
      ENERGY_TYPE_ABBREVIATIONS[typeLetter] || wholeMatch)
    .replace(/\s*\[[^\]]*\]\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function pauseForMilliseconds(delayMs) {
  return new Promise(resolveDelay => setTimeout(resolveDelay, delayMs));
}

/* ---------------------------------------------------------------------------
   Inventory persistence

   Shape: { "me5-1": { normal: 2, reverse: 1 }, ... }
   Entries are never pruned against the catalogue, so a failed API response can
   never delete the user's records.
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

// The previous build stored a flat array of owned card ids. Those records are
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
   Catalogue retrieval

   api.pokemontcg.io returns intermittent 500/502 responses for otherwise
   identical requests, so every fetch is retried with backoff and a local cache
   is kept as a fallback for when the API is down entirely.
   --------------------------------------------------------------------------- */

function condenseCardRecord(rawCardPayload) {
  return {
    id: rawCardPayload.id,
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

function readCachedCatalogue() {
  try {
    const cacheEnvelope = JSON.parse(localStorage.getItem(TCG_CONFIG.CATALOGUE_CACHE_KEY));
    if (!cacheEnvelope || !Array.isArray(cacheEnvelope.cards) || cacheEnvelope.cards.length === 0) return null;
    return cacheEnvelope;
  } catch (cacheParseException) {
    console.warn('Discarding unreadable catalogue cache:', cacheParseException);
    return null;
  }
}

function writeCachedCatalogue(cardCollection) {
  try {
    localStorage.setItem(TCG_CONFIG.CATALOGUE_CACHE_KEY, JSON.stringify({
      savedAt: Date.now(),
      cards: cardCollection
    }));
  } catch (cacheWriteException) {
    console.warn('Could not cache catalogue:', cacheWriteException);
  }
}

async function fetchSetCatalogueWithRetry() {
  const requestUrl = `${TCG_CONFIG.API_ENDPOINT}?q=${encodeURIComponent('set.id:' + TCG_CONFIG.SET_ID)}&pageSize=250`;
  let lastEncounteredError = null;

  for (let attemptNumber = 1; attemptNumber <= TCG_CONFIG.FETCH_ATTEMPT_LIMIT; attemptNumber++) {
    try {
      const endpointResponse = await fetch(requestUrl);
      if (!endpointResponse.ok) throw new Error(`API responded ${endpointResponse.status}`);

      const catalogPayload = await endpointResponse.json();
      if (!catalogPayload || !Array.isArray(catalogPayload.data) || catalogPayload.data.length === 0) {
        throw new Error('API returned an empty card list.');
      }

      return orderCardsBySetNumber(catalogPayload.data.map(condenseCardRecord));
    } catch (attemptException) {
      lastEncounteredError = attemptException;
      console.warn(`Catalogue fetch attempt ${attemptNumber} failed:`, attemptException.message);

      if (attemptNumber < TCG_CONFIG.FETCH_ATTEMPT_LIMIT) {
        await pauseForMilliseconds(TCG_CONFIG.FETCH_BACKOFF_BASE_MS * attemptNumber);
      }
    }
  }

  throw lastEncounteredError || new Error('Catalogue unavailable.');
}

function adoptCatalogue(cardCollection) {
  globalCachedCards = cardCollection;
  catalogueHasLoaded = true;
  rebuildPriceIndex();
  revealCardWorkspace();
}

async function initializeTCGTrackerApplication() {
  const cacheEnvelope = readCachedCatalogue();
  const cacheIsFresh = cacheEnvelope && (Date.now() - cacheEnvelope.savedAt) < TCG_CONFIG.CACHE_LIFETIME_MS;

  // Paint from a fresh cache immediately, then refresh from the network behind it.
  if (cacheIsFresh) {
    adoptCatalogue(cacheEnvelope.cards);
    renderCardGrid({ animateEntry: true });
  }

  try {
    const retrievedCards = await fetchSetCatalogueWithRetry();
    writeCachedCatalogue(retrievedCards);

    adoptCatalogue(retrievedCards);
    renderCardGrid({ animateEntry: !cacheIsFresh });
    updateSetStatusLine('');
  } catch (exceptionContext) {
    console.error('TCG Initialization Fault:', exceptionContext);

    if (cacheEnvelope && !cacheIsFresh) {
      adoptCatalogue(cacheEnvelope.cards);
      renderCardGrid({ animateEntry: true });
    }

    if (catalogueHasLoaded) {
      updateSetStatusLine('API unreachable — showing your last saved copy of the set list.', 'warn');
    } else {
      showCatalogueFailure();
    }
  }
}

function showCatalogueFailure() {
  const DOMLoadingWorkspace = document.getElementById('loadingWorkspace');
  DOMLoadingWorkspace.classList.remove('hidden');
  DOMLoadingWorkspace.innerHTML = `
    <div class="load-fault">
      <p>Could not reach the Pok&eacute;mon TCG API.</p>
      <button type="button" id="retryCatalogueButton" class="btn-primary">RETRY</button>
    </div>
  `;
  document.getElementById('retryCatalogueButton')
    .addEventListener('click', retryCatalogueLoad);
  updateDashboardMetrics();
}

function retryCatalogueLoad() {
  const DOMLoadingWorkspace = document.getElementById('loadingWorkspace');
  DOMLoadingWorkspace.innerHTML = `
    <div class="load-note"><span class="pulse-dot"></span>RECONNECTING TO TCG DATABASE…</div>
  `;
  initializeTCGTrackerApplication();
}

function revealCardWorkspace() {
  document.getElementById('loadingWorkspace').classList.add('hidden');
}

/* ---------------------------------------------------------------------------
   Price index

   The compact snapshot lists Cardmarket products for this expansion in
   idProduct order, which follows collector-number order. Several cards share a
   name (base print, full art, secret rare, gold), so matching on name alone
   cannot tell them apart — the previous build collapsed 120 products into 88
   names and showed, for example, the secret rare's €273.33 on the €1.05 base
   card.

   Instead, both sides are grouped by name and paired ordinally: the nth
   Cardmarket product of a given name is the nth card of that name by collector
   number. That resolves every print to its own price.
   --------------------------------------------------------------------------- */

let loadedPriceRows = null;
let priceSnapshotOrigin = '';

function isUsableSnapshot(candidateSnapshot) {
  return !!candidateSnapshot
    && Array.isArray(candidateSnapshot.cards)
    && candidateSnapshot.cards.length > 0;
}

function snapshotTimestamp(snapshot) {
  const parsedDate = new Date((snapshot && snapshot.snapshotDate) || 0);
  return Number.isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime();
}

// A snapshot re-distilled in this browser is kept locally so the page keeps using
// it across reloads. The served file still wins once it carries newer data, so
// re-deploying pitch-black-prices.json supersedes a local override automatically.
function readPriceOverride() {
  try {
    const storedOverride = JSON.parse(localStorage.getItem(TCG_CONFIG.PRICE_OVERRIDE_KEY));
    return isUsableSnapshot(storedOverride) ? storedOverride : null;
  } catch (overrideParseException) {
    console.warn('Discarding unreadable price override:', overrideParseException);
    return null;
  }
}

function writePriceOverride(snapshot) {
  try {
    localStorage.setItem(TCG_CONFIG.PRICE_OVERRIDE_KEY, JSON.stringify(snapshot));
    return true;
  } catch (overrideWriteException) {
    console.warn('Could not store the refreshed prices:', overrideWriteException);
    return false;
  }
}

function applyPriceSnapshot(snapshot, originLabel) {
  loadedPriceRows = snapshot.cards;
  priceSnapshotDate = snapshot.snapshotDate || null;
  priceSnapshotOrigin = originLabel;
  rebuildPriceIndex();
}

async function loadPriceSnapshot() {
  updatePriceStatusLine('Loading Cardmarket price snapshot…', 'loading');

  const localOverride = readPriceOverride();
  let servedSnapshot = null;
  let loadFailureMessage = '';

  try {
    const assetResponse = await fetch(TCG_CONFIG.PRICE_INDEX_URL);
    if (!assetResponse.ok) throw new Error(`HTTP ${assetResponse.status}`);

    const snapshotPayload = await assetResponse.json();
    if (!isUsableSnapshot(snapshotPayload)) throw new Error('Price snapshot contained no cards.');
    servedSnapshot = snapshotPayload;
  } catch (exceptionContext) {
    console.warn('Served price file unavailable:', exceptionContext);
    loadFailureMessage = exceptionContext.message;
  }

  // Prefer whichever snapshot carries the newer Cardmarket date.
  if (servedSnapshot && (!localOverride || snapshotTimestamp(servedSnapshot) >= snapshotTimestamp(localOverride))) {
    applyPriceSnapshot(servedSnapshot, 'served file');
    if (localOverride) clearPriceOverride();
  } else if (localOverride) {
    applyPriceSnapshot(localOverride, 'locally refreshed');
  } else {
    loadedPriceRows = null;
    priceByCardId = new Map();
    updatePriceStatusLine(
      `Prices unavailable (${loadFailureMessage}) — press UPDATE PRICES, or run "python3 build-price-index.py".`,
      'unavailable'
    );
  }

  // Whichever of the catalogue / price load finishes second repaints the grid.
  if (catalogueHasLoaded) renderCardGrid();
  updateDashboardMetrics();
}

function clearPriceOverride() {
  try {
    localStorage.removeItem(TCG_CONFIG.PRICE_OVERRIDE_KEY);
  } catch (removeException) {
    console.warn('Could not clear the local price override:', removeException);
  }
}

/* ---------------------------------------------------------------------------
   Re-distilling the raw Cardmarket dumps in the browser.

   Port of build-price-index.py: fingerprint the expansion from the anchor names,
   keep that expansion's products in idProduct order, and join each to its price
   row. Producing the same shape means the ordinal name-pairing above works
   identically whichever route produced the snapshot.
   --------------------------------------------------------------------------- */

function stripVariantSuffix(productName) {
  return String(productName).replace(/\s*\[[^\]]*\]\s*$/, '').trim();
}

function detectExpansionIdFromProducts(allProducts) {
  const anchorNameSet = new Set(DUMP_CONFIG.ANCHOR_CARD_NAMES.map(name => name.toLowerCase()));
  const expansionVoteCounts = new Map();

  allProducts.forEach(product => {
    if (!anchorNameSet.has(stripVariantSuffix(product.name).toLowerCase())) return;
    const expansionId = product.idExpansion;
    expansionVoteCounts.set(expansionId, (expansionVoteCounts.get(expansionId) || 0) + 1);
  });

  let bestExpansionId = null;
  let bestVoteCount = 0;
  expansionVoteCounts.forEach((voteCount, expansionId) => {
    if (voteCount > bestVoteCount) {
      bestVoteCount = voteCount;
      bestExpansionId = expansionId;
    }
  });

  return bestExpansionId;
}

function distillSnapshotFromDumps(productsPayload, priceGuidePayload) {
  const allProducts = (productsPayload && productsPayload.products) || [];
  const allPriceRows = (priceGuidePayload && priceGuidePayload.priceGuides) || [];

  if (allProducts.length === 0) throw new Error('the products file has no "products" array');
  if (allPriceRows.length === 0) throw new Error('the price guide has no "priceGuides" array');

  const expansionId = detectExpansionIdFromProducts(allProducts);
  if (expansionId === null) {
    throw new Error(`could not find ${TCG_CONFIG.SET_NAME} in the products file — is this snapshot older than the set?`);
  }

  const priceRowByProductId = new Map(allPriceRows.map(row => [row.idProduct, row]));

  const cards = allProducts
    .filter(product => product.idExpansion === expansionId)
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

  if (cards.length === 0) throw new Error('no priced products found for this expansion');

  return {
    generatedAt: new Date().toISOString(),
    snapshotDate: (priceGuidePayload && priceGuidePayload.createdAt) || null,
    expansionId,
    sourceFiles: [DUMP_CONFIG.PRODUCTS_URL, DUMP_CONFIG.PRICE_GUIDE_URL],
    cards
  };
}

async function fetchDumpFile(assetUrl) {
  const assetResponse = await fetch(assetUrl);
  if (!assetResponse.ok) throw new Error(`${assetUrl} — HTTP ${assetResponse.status}`);
  return assetResponse.json();
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
    const { productsPayload, priceGuidePayload } = await payloadSource();
    updatePriceStatusLine('Rebuilding the price index…', 'loading');

    const refreshedSnapshot = distillSnapshotFromDumps(productsPayload, priceGuidePayload);
    const wasStored = writePriceOverride(refreshedSnapshot);

    applyPriceSnapshot(refreshedSnapshot, 'locally refreshed');
    if (catalogueHasLoaded) renderCardGrid();
    updateDashboardMetrics();

    offerRegeneratedIndexDownload(refreshedSnapshot, wasStored);
  } catch (exceptionContext) {
    console.warn('Price refresh failed:', exceptionContext);
    updatePriceStatusLine(`Could not update prices: ${exceptionContext.message}`, 'unavailable');

    // The dumps are 28 MB, so they may deliberately not be deployed alongside the
    // site. Offer the local-file route rather than dead-ending.
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

// Refreshed prices live in this browser only. For visitors to see them, the served
// pitch-black-prices.json has to be replaced — so hand back the regenerated file.
function offerRegeneratedIndexDownload(refreshedSnapshot, wasStored) {
  const DOMPriceStatusLine = document.getElementById('priceStatusLine');
  if (!DOMPriceStatusLine) return;

  const snapshotLabel = refreshedSnapshot.snapshotDate
    ? formatSnapshotDate(refreshedSnapshot.snapshotDate)
    : 'unknown date';

  DOMPriceStatusLine.className = 'status-line status-line--ready';
  DOMPriceStatusLine.classList.remove('hidden');
  DOMPriceStatusLine.textContent =
    `Prices updated from the raw dumps — ${refreshedSnapshot.cards.length} cards, snapshot ${snapshotLabel}. ` +
    (wasStored
      ? 'Saved in this browser. Visitors keep seeing the old prices until you replace the served file: '
      : 'Could not save locally (storage full), so this lasts until you reload. Replace the served file: ');

  const DOMDownloadButton = document.createElement('button');
  DOMDownloadButton.type = 'button';
  DOMDownloadButton.className = 'inline-link-btn';
  DOMDownloadButton.textContent = `download ${TCG_CONFIG.PRICE_INDEX_URL}`;
  DOMDownloadButton.addEventListener('click', () => downloadRegeneratedIndex(refreshedSnapshot));
  DOMPriceStatusLine.appendChild(DOMDownloadButton);
}

function downloadRegeneratedIndex(refreshedSnapshot) {
  const objectUrl = URL.createObjectURL(
    new Blob([JSON.stringify(refreshedSnapshot, null, 1)], { type: 'application/json' })
  );
  const DOMAnchorDownloadElement = document.createElement('a');
  DOMAnchorDownloadElement.href = objectUrl;
  DOMAnchorDownloadElement.download = TCG_CONFIG.PRICE_INDEX_URL;
  document.body.appendChild(DOMAnchorDownloadElement);
  DOMAnchorDownloadElement.click();
  DOMAnchorDownloadElement.remove();
  URL.revokeObjectURL(objectUrl);
}

function rebuildPriceIndex() {
  if (!loadedPriceRows || !catalogueHasLoaded) return;

  const productsByName = new Map();
  loadedPriceRows.forEach(priceRow => {
    const nameKey = normalizeCardName(priceRow.name);
    if (!productsByName.has(nameKey)) productsByName.set(nameKey, []);
    productsByName.get(nameKey).push(priceRow);
  });

  const cardsByName = new Map();
  orderCardsBySetNumber(globalCachedCards).forEach(card => {
    const nameKey = normalizeCardName(card.name);
    if (!cardsByName.has(nameKey)) cardsByName.set(nameKey, []);
    cardsByName.get(nameKey).push(card);
  });

  const nextPriceIndex = new Map();
  const unmatchedNames = [];

  cardsByName.forEach((cardsWithName, nameKey) => {
    const productsWithName = productsByName.get(nameKey);

    if (!productsWithName) {
      unmatchedNames.push(nameKey);
      return;
    }
    if (productsWithName.length !== cardsWithName.length) {
      console.warn(
        `Price pairing skipped for "${nameKey}": ${cardsWithName.length} cards vs ${productsWithName.length} products.`
      );
      unmatchedNames.push(nameKey);
      return;
    }

    cardsWithName.forEach((card, ordinalIndex) => {
      nextPriceIndex.set(card.id, productsWithName[ordinalIndex]);
    });
  });

  priceByCardId = nextPriceIndex;

  const matchedCount = nextPriceIndex.size;
  const snapshotLabel = priceSnapshotDate ? ` · snapshot ${formatSnapshotDate(priceSnapshotDate)}` : '';
  const originLabel = priceSnapshotOrigin === 'locally refreshed' ? ' · refreshed in this browser' : '';

  if (unmatchedNames.length > 0) {
    console.warn('Unpriced card names:', unmatchedNames);
    updatePriceStatusLine(
      `Prices matched for ${matchedCount} of ${globalCachedCards.length} cards${snapshotLabel}. ` +
      `Unmatched: ${unmatchedNames.slice(0, 4).join(', ')}.`,
      'warn'
    );
  } else {
    updatePriceStatusLine(`All ${matchedCount} cards priced${snapshotLabel}${originLabel}.`, 'ready');
  }
}

function formatSnapshotDate(isoLikeDateString) {
  const parsedDate = new Date(isoLikeDateString);
  if (Number.isNaN(parsedDate.getTime())) return isoLikeDateString;
  return parsedDate.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

/* ---------------------------------------------------------------------------
   Price basis — which Cardmarket metric everything is valued against.
   --------------------------------------------------------------------------- */

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
  renderCardGrid();
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

// Whether a card actually exists in a reverse-holo finish. This is decided by the
// average-sale column alone, never by the selected basis: the snapshot stores a
// literal 0 in trend-holo for the 46 single-finish cards, so keying off the trend
// column would invent a €0.00 reverse row for every ex and secret rare.
function cardHasReverseFinish(priceRow) {
  return !!priceRow && priceRow.avgHolo !== null && priceRow.avgHolo !== undefined;
}

// A variant row is offered when the card is printed in that finish. It is also
// kept whenever the user already recorded copies of it, so holdings never become
// invisible just because the price file is missing.
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

function composeCardMarkup(card) {
  const variantRows = variantRowsForCard(card);
  const heldValue = heldValueForCard(card);
  const totalCopies = totalCopiesForCard(card.id);
  const raritySlug = RARITY_SLUG_MAP[card.rarity] || 'unlisted';
  const safeCardName = escapeMarkupText(card.name);
  const paddedNumber = String(parseCollectorNumber(card.number)).padStart(3, '0');

  return `
    <div class="card-head">
      <span class="card-num">#${escapeMarkupText(paddedNumber)}/${TCG_CONFIG.SET_TOTAL}</span>
      <span class="rarity rarity--${raritySlug}" title="${escapeMarkupText(card.rarity)}">${escapeMarkupText(card.rarity)}</span>
    </div>

    <div class="art">
      ${card.imageUrl
        ? `<img class="art-img" src="${escapeMarkupText(card.imageUrl)}" alt="${safeCardName}" loading="lazy">`
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

function paintCardElement(cardNodeElement, card, shouldAnimateEntry) {
  const isHeld = totalCopiesForCard(card.id) > 0;
  cardNodeElement.className = `card${isHeld ? ' card--active' : ''}${shouldAnimateEntry ? ' animate-card-in' : ''}`;
  cardNodeElement.innerHTML = composeCardMarkup(card);
}

function selectVisibleCards() {
  const uniformQueryString = currentSearchFilterString.toLowerCase().trim();
  const numericQuery = uniformQueryString.replace(/^#/, '');

  return globalCachedCards.filter(card => {
    const isHeld = totalCopiesForCard(card.id) > 0;

    if (currentActiveTab === 'owned' && !isHeld) return false;
    if (currentActiveTab === 'missing' && isHeld) return false;

    if (uniformQueryString) {
      const matchesName = card.name.toLowerCase().includes(uniformQueryString);
      const matchesRarity = card.rarity.toLowerCase().includes(uniformQueryString);
      const matchesNumber = String(card.number).toLowerCase() === numericQuery
        || String(parseCollectorNumber(card.number)) === numericQuery;

      if (!matchesName && !matchesRarity && !matchesNumber) return false;
    }

    return true;
  });
}

// shouldAnimateEntry: only true for renders the user reads as a new screen (first
// load, tab switch, import). Search keystrokes and stepper clicks must not replay
// the entry animation.
function renderCardGrid({ animateEntry: shouldAnimateEntry = false } = {}) {
  const DOMGridContainer = document.getElementById('cardGridContainer');
  const DOMFallbackView = document.getElementById('emptyFallbackView');

  // Guard against painting before the set list exists: the local price snapshot
  // resolves long before the network catalogue does, and rendering an empty grid
  // here used to flash "NO MATCHES FOUND" underneath the loading skeleton.
  if (!catalogueHasLoaded) return;

  const visibleCards = selectVisibleCards();

  DOMGridContainer.innerHTML = '';
  DOMFallbackView.classList.toggle('hidden', visibleCards.length > 0);
  DOMGridContainer.classList.toggle('hidden', visibleCards.length === 0);

  const renderFragment = document.createDocumentFragment();
  visibleCards.forEach((card, renderIndex) => {
    const cardNodeElement = document.createElement('article');
    cardNodeElement.dataset.cardId = card.id;

    paintCardElement(cardNodeElement, card, shouldAnimateEntry);

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
  const cardEntity = globalCachedCards.find(entity => entity.id === cardId);

  if (!cardNodeElement || !cardEntity) {
    renderCardGrid();
    return;
  }

  paintCardElement(cardNodeElement, cardEntity, false);
  updateDashboardMetrics();
}

function updateDashboardMetrics() {
  const catalogueIdSet = new Set(globalCachedCards.map(card => card.id));
  const setTotalCount = globalCachedCards.length || TCG_CONFIG.SET_TOTAL;

  let totalCopies = 0;
  let uniqueHeld = 0;
  let portfolioValue = 0;

  globalCachedCards.forEach(card => {
    const copies = totalCopiesForCard(card.id);
    if (copies > 0) {
      totalCopies += copies;
      uniqueHeld += 1;
      portfolioValue += heldValueForCard(card);
    }
  });

  // Copies recorded against ids that are not in this set still count as owned
  // stock, but never toward set completion.
  Object.keys(inventoryByCardId).forEach(cardId => {
    if (!catalogueIdSet.has(cardId)) {
      totalCopies += totalCopiesForCard(cardId);
    }
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
    version: 2,
    setId: TCG_CONFIG.SET_ID,
    exportedAt: new Date().toISOString(),
    inventory: inventoryByCardId
  };

  const objectUrl = URL.createObjectURL(
    new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' })
  );

  const DOMAnchorDownloadElement = document.createElement('a');
  DOMAnchorDownloadElement.href = objectUrl;
  DOMAnchorDownloadElement.download = `${TCG_CONFIG.SET_ID}_collection_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(DOMAnchorDownloadElement);
  DOMAnchorDownloadElement.click();
  DOMAnchorDownloadElement.remove();
  URL.revokeObjectURL(objectUrl);
}

// Accepts both the current export shape and the flat id array written by the
// previous build.
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
        alert('Validation failed: expected a collection export, or an array of card id strings such as ["me5-1", "me5-2"].');
      } else {
        inventoryByCardId = sanitizeInventoryObject(interpretedInventory);
        persistInventory();
        renderCardGrid({ animateEntry: true });

        const catalogueIdSet = new Set(globalCachedCards.map(card => card.id));
        const importedCardCount = Object.keys(inventoryByCardId).length;
        const matchedInThisSet = Object.keys(inventoryByCardId)
          .filter(cardId => catalogueIdSet.has(cardId)).length;

        alert(`Imported ${importedCardCount} cards (${matchedInThisSet} belong to ${TCG_CONFIG.SET_NAME}).`);
      }
    } catch (jsonSyntaxException) {
      alert('Error parsing file schema.');
    }
    resetImportInputControl();
  };

  fileSystemReaderInstance.readAsText(browserFileHandle);
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
    if (!stepButton) return;

    const cardNodeElement = stepButton.closest('[data-card-id]');
    if (!cardNodeElement) return;

    adjustVariantCount(
      cardNodeElement.dataset.cardId,
      stepButton.dataset.variant,
      Number(stepButton.dataset.step)
    );
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

  document.getElementById('exportButton').addEventListener('click', exportCollectionJSON);
  document.getElementById('importInput').addEventListener('change', importCollectionJSON);
  document.getElementById('updatePricesButton').addEventListener('click', refreshPricesFromFolder);
  document.getElementById('dumpsInput').addEventListener('change', refreshPricesFromChosenFiles);
}

attachEventHandlers();
syncPriceBasisControls();
updateDashboardMetrics();
loadPriceSnapshot();
initializeTCGTrackerApplication();
