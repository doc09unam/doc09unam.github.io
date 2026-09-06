#!/usr/bin/env python3
"""
Distils the two full Cardmarket catalogue dumps down to the tracked sets.

The dumps are ~28 MB combined and cover every Cardmarket expansion. Writing one
price file for all of them would be ~3 MB, which every visitor would download to
look at a single set, so the output is split:

    card-prices.json      small index: every set, whether it is priced, its file
    prices/<setkey>.json  one file per priced set, loaded on demand by the browser

Re-run this whenever you drop in fresh snapshot files:

    python3 build-price-index.py
    python3 audit-price-mapping.py     # refreshes the notes

Which sets are tracked, and which of them are priced, lives in set-registry.json.
Sets marked "priced": false are still listed so their cards can be collected, but
deliberately carry no prices — their Cardmarket expansion could not be identified
confidently and a guess would be worse than a blank. audit-price-mapping.py
records each one and why.

Expansions are resolved by fingerprinting the registry's anchor card names. The
registry also caches the expansion id found last time; that is used as a hint and
re-verified on every build, so a renumbered snapshot is detected rather than
silently mis-priced.
"""

import json
import os
import re
import sys
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))

PRODUCTS_FILE = "products_singles_6.json"
PRICE_GUIDE_FILE = "price_guide_6.json"
REGISTRY_FILE = "set-registry.json"
INDEX_FILE = "card-prices.json"
PRICES_DIR = "prices"

MINIMUM_ANCHOR_COVERAGE = 0.6

ENERGY_TYPE_ABBREVIATIONS = {
    "G": "Grass", "R": "Fire", "W": "Water", "L": "Lightning", "P": "Psychic",
    "F": "Fighting", "D": "Darkness", "M": "Metal", "Y": "Fairy",
    "N": "Dragon", "C": "Colorless",
}

# Cardmarket spells this one differently from the card API.
NAME_ALIASES = {"imposter professor oak": "impostor professor oak"}


def normalize_card_name(raw_name):
    """Reduces both naming conventions to one comparable key.

    Must stay in lockstep with normalizeCardName() in tcg-app.js and
    normalize_card_name() in audit-price-mapping.py. Each clause exists because a
    real era of cards needs it:
      - "[Attack | Attack]"  Cardmarket's print disambiguator (2+ chars, so the
                             single-letter markers below survive)
      - "[D]" / "[M]"        energy type on energy cards, gender symbol elsewhere
      - " Lv.68"             Cardmarket appends card level on DP/HGSS-era cards
      - " δ Delta Species"   Cardmarket spells out what the API writes as " δ"
      - hyphens              "Decidueye-GX" vs "Decidueye GX"
      - leading "M "         "M Venusaur-EX" vs "MVenusaur EX"
    """
    name = re.sub(r"\s*\[[^\]]{2,}\]\s*$", "", str(raw_name))
    if "energy" in name.lower():
        name = re.sub(r"\[([A-Z])\]",
                      lambda m: ENERGY_TYPE_ABBREVIATIONS.get(m.group(1), m.group(0)), name)
    else:
        name = name.replace("[M]", "♂").replace("[F]", "♀")
    name = name.strip().lower()
    name = re.sub(r"\s+lv\.\d+$", "", name)
    name = re.sub(r"\s+δ\s+delta species$", " δ", name)
    name = name.replace("-", " ")
    name = re.sub(r"\s+", " ", name).strip()
    name = re.sub(r"^m\s+(?=\w)", "m", name)
    return NAME_ALIASES.get(name, name)


def strip_variant_suffix(product_name):
    """The display name: only the trailing attack suffix is dropped."""
    return re.sub(r"\s*\[[^\]]{2,}\]\s*$", "", str(product_name)).strip()


def is_card_product(product):
    """Cardmarket files code cards inside set expansions; they are not cards."""
    return "code card" not in product["name"].lower()


def load_json(filename):
    path = os.path.join(HERE, filename)
    if not os.path.exists(path):
        sys.exit(f"error: {filename} not found in {HERE}")
    with open(path, encoding="utf-8") as handle:
        return json.load(handle)


def resolve_expansion(set_definition, products_by_expansion):
    """Fingerprint the expansion from anchor names, using the cached id as a hint."""
    anchors = {normalize_card_name(name) for name in set_definition.get("anchorNames", [])}
    if not anchors:
        return None, 0.0

    def coverage(expansion_id):
        products = products_by_expansion.get(expansion_id)
        if not products:
            return 0.0
        present = {normalize_card_name(p["name"]) for p in products}
        return len(anchors & present) / len(anchors)

    cached_id = set_definition.get("expansionId")
    cached_coverage = coverage(cached_id) if cached_id is not None else 0.0
    if cached_coverage == 1.0:
        return cached_id, cached_coverage

    expected = set_definition.get("expectedProducts", 0)
    candidates = []
    for expansion_id, products in products_by_expansion.items():
        if expansion_id is None:
            continue
        cov = coverage(expansion_id)
        if cov >= MINIMUM_ANCHOR_COVERAGE:
            candidates.append((abs(len(products) - expected), -cov, expansion_id, cov))

    if not candidates:
        return (cached_id, cached_coverage) if cached_coverage > 0 else (None, 0.0)

    candidates.sort()
    _, _, best_id, best_coverage = candidates[0]
    if cached_id is not None and best_id != cached_id:
        print(f"   note: {set_definition['label']} moved expansion {cached_id} -> {best_id}")
    return best_id, best_coverage


def condense_price_row(product, price_row):
    return {
        "idProduct": product["idProduct"],
        "name": strip_variant_suffix(product["name"]),
        "avg": price_row.get("avg"),
        "low": price_row.get("low"),
        "trend": price_row.get("trend"),
        "avg30": price_row.get("avg30"),
        "avgHolo": price_row.get("avg-holo"),
        "lowHolo": price_row.get("low-holo"),
        "trendHolo": price_row.get("trend-holo"),
        "avg30Holo": price_row.get("avg30-holo"),
    }


def main():
    registry = load_json(REGISTRY_FILE)["sets"]
    products_payload = load_json(PRODUCTS_FILE)
    price_guide_payload = load_json(PRICE_GUIDE_FILE)

    all_products = [p for p in (products_payload.get("products") or []) if is_card_product(p)]
    all_price_rows = price_guide_payload.get("priceGuides") or []
    snapshot_date = price_guide_payload.get("createdAt")
    print(f"read {len(all_products):,} card products and {len(all_price_rows):,} price rows")

    products_by_expansion = {}
    for product in all_products:
        products_by_expansion.setdefault(product.get("idExpansion"), []).append(product)
    price_row_by_product_id = {row["idProduct"]: row for row in all_price_rows}

    prices_dir = os.path.join(HERE, PRICES_DIR)
    os.makedirs(prices_dir, exist_ok=True)

    index_sets = {}
    priced_count = unpriced_count = failed_count = 0
    total_cards = total_bytes = 0

    for set_definition in registry:
        key = set_definition["key"]
        entry = {
            "label": set_definition["label"],
            "apiSetId": set_definition["apiSetId"],
            "setTotal": set_definition["setTotal"],
            "releaseDate": set_definition.get("releaseDate", ""),
            "series": set_definition.get("series", ""),
            "priced": False,
        }

        if not set_definition.get("priced"):
            entry["unpricedReason"] = set_definition.get("unpricedReason", "Not priced.")
            index_sets[key] = entry
            unpriced_count += 1
            continue

        expansion_id, anchor_coverage = resolve_expansion(set_definition, products_by_expansion)
        if expansion_id is None:
            entry["unpricedReason"] = ("The Cardmarket expansion could not be found in this "
                                       "snapshot — is it older than the set?")
            index_sets[key] = entry
            failed_count += 1
            print(f"   WARNING {set_definition['label']}: expansion not found, left unpriced")
            continue

        cards = []
        for product in sorted(products_by_expansion[expansion_id], key=lambda p: p["idProduct"]):
            price_row = price_row_by_product_id.get(product["idProduct"])
            if price_row is not None:
                cards.append(condense_price_row(product, price_row))

        if not cards:
            entry["unpricedReason"] = "No priced products found in the matched expansion."
            index_sets[key] = entry
            failed_count += 1
            continue

        out_name = f"{key}.json"
        out_path = os.path.join(prices_dir, out_name)
        with open(out_path, "w", encoding="utf-8") as handle:
            json.dump({
                "key": key,
                "label": set_definition["label"],
                "expansionId": expansion_id,
                "snapshotDate": snapshot_date,
                "cards": cards,
            }, handle, ensure_ascii=False, separators=(",", ":"))

        entry.update({
            "priced": True,
            "expansionId": expansion_id,
            "file": f"{PRICES_DIR}/{out_name}",
            "cardCount": len(cards),
        })
        if set_definition.get("pricingNote"):
            entry["pricingNote"] = set_definition["pricingNote"]
        index_sets[key] = entry

        priced_count += 1
        total_cards += len(cards)
        total_bytes += os.path.getsize(out_path)
        if anchor_coverage < 1.0:
            print(f"   note: {set_definition['label']} anchors only {anchor_coverage*100:.0f}% present")

    index = {
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "snapshotDate": snapshot_date,
        "sourceFiles": [PRODUCTS_FILE, PRICE_GUIDE_FILE],
        "pricesDir": PRICES_DIR,
        "sets": index_sets,
    }
    index_path = os.path.join(HERE, INDEX_FILE)
    with open(index_path, "w", encoding="utf-8") as handle:
        json.dump(index, handle, ensure_ascii=False, indent=1)

    print(f"\nwrote {INDEX_FILE} ({os.path.getsize(index_path)/1024:.0f} KB) "
          f"and {priced_count} files in {PRICES_DIR}/")
    print(f"   priced sets    {priced_count:>4}  ({total_cards:,} cards, "
          f"{total_bytes/1024/1024:.1f} MB total, {total_bytes/1024/max(priced_count,1):.0f} KB average)")
    print(f"   unpriced sets  {unpriced_count:>4}  (listed for collecting, no prices by design)")
    if failed_count:
        print(f"   FAILED         {failed_count:>4}  (expected to be priced but could not be)")


if __name__ == "__main__":
    main()
