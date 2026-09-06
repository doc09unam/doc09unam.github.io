#!/usr/bin/env python3
"""
Distils the two full Cardmarket catalogue dumps down to just the tracked sets.

The dumps are ~28 MB combined and cover every Cardmarket expansion and product
type. The browser only ever needs the few hundred rows belonging to the sets in
set-registry.json, so that slice is extracted once, here, and written to
card-prices.json (~120 KB). tcg-app.js loads only that file.

Re-run this whenever you drop in fresh snapshot files:

    python3 build-price-index.py

Sets are located by fingerprinting, not by hardcoded expansion ids: each set's
anchor card names are matched against every expansion in the dump, and
expectedProducts breaks ties. That tie-break matters — Base Set appears twice in
Cardmarket's data, once as 102 single products (what we want) and once as 211
products splitting 1st Edition / Shadowless / Unlimited, which cannot be paired
against a card API that models only one printing per card.

Row order within a set is preserved as idProduct ascending, which is the order
tcg-app.js relies on to pair duplicate card names against collector numbers.
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
OUTPUT_FILE = "card-prices.json"

MINIMUM_ANCHOR_COVERAGE = 0.6

# Requires two or more characters inside the brackets so that single-letter
# markers survive: "Nidoran [M]" is a gender symbol and "Basic [M] Energy" an
# energy type, neither of which is an attack suffix to be discarded.
TRAILING_VARIANT_SUFFIX = re.compile(r"\s*\[[^\]]{2,}\]\s*$")


def strip_variant_suffix(product_name):
    """Cardmarket appends "[Attack | Attack]" to disambiguate prints; drop it."""
    return TRAILING_VARIANT_SUFFIX.sub("", str(product_name)).strip()


def load_json(filename):
    path = os.path.join(HERE, filename)
    if not os.path.exists(path):
        sys.exit(f"error: {filename} not found in {HERE}")
    with open(path, encoding="utf-8") as handle:
        return json.load(handle)


def group_products_by_expansion(all_products):
    grouped = {}
    for product in all_products:
        grouped.setdefault(product.get("idExpansion"), []).append(product)
    return grouped


def detect_expansion_id(set_definition, products_by_expansion):
    """Best expansion by anchor-name coverage, tie-broken by product count."""
    anchor_names = {name.lower() for name in set_definition["anchorNames"]}
    expected_products = set_definition["expectedProducts"]

    candidates = []
    for expansion_id, products in products_by_expansion.items():
        if expansion_id is None:
            continue
        present = {
            strip_variant_suffix(p["name"]).lower()
            for p in products
        } & anchor_names
        coverage = len(present) / len(anchor_names)
        if coverage >= MINIMUM_ANCHOR_COVERAGE:
            candidates.append((abs(len(products) - expected_products), -coverage,
                               expansion_id, len(products), coverage))

    if not candidates:
        sys.exit(
            f"error: could not fingerprint {set_definition['label']} in the products dump.\n"
            f"       Is this snapshot older than the set?"
        )

    candidates.sort()
    size_delta, _, expansion_id, product_count, coverage = candidates[0]

    if size_delta > 0:
        print(
            f"   note: {set_definition['label']} matched expansion {expansion_id} with "
            f"{product_count} products, expected {expected_products}"
        )
    if len(candidates) > 1 and candidates[1][0] == size_delta:
        print(
            f"   warning: {set_definition['label']} was ambiguous between expansions "
            f"{expansion_id} and {candidates[1][2]}"
        )

    return expansion_id, product_count, coverage


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

    all_products = products_payload.get("products") or []
    all_price_rows = price_guide_payload.get("priceGuides") or []
    print(f"read {len(all_products):,} products and {len(all_price_rows):,} price rows")

    products_by_expansion = group_products_by_expansion(all_products)
    price_row_by_product_id = {row["idProduct"]: row for row in all_price_rows}

    output_sets = {}
    grand_total = 0

    for set_definition in registry:
        expansion_id, product_count, coverage = detect_expansion_id(
            set_definition, products_by_expansion
        )

        set_products = sorted(
            products_by_expansion[expansion_id], key=lambda p: p["idProduct"]
        )

        cards = []
        missing = 0
        for product in set_products:
            price_row = price_row_by_product_id.get(product["idProduct"])
            if price_row is None:
                missing += 1
                continue
            cards.append(condense_price_row(product, price_row))

        with_holo = sum(1 for card in cards if card["avgHolo"] is not None)
        grand_total += len(cards)

        output_sets[set_definition["key"]] = {
            "label": set_definition["label"],
            "apiSetId": set_definition["apiSetId"],
            "setTotal": set_definition["setTotal"],
            "expansionId": expansion_id,
            "cards": cards,
        }

        flag = "" if missing == 0 else f"  ({missing} without a price row)"
        print(
            f"   {set_definition['label']:<16} expansion {expansion_id:<6} "
            f"{len(cards):>4} cards  {with_holo:>3} with reverse  "
            f"anchors {coverage*100:>5.1f}%{flag}"
        )

    output = {
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "snapshotDate": price_guide_payload.get("createdAt"),
        "sourceFiles": [PRODUCTS_FILE, PRICE_GUIDE_FILE],
        "sets": output_sets,
    }

    out_path = os.path.join(HERE, OUTPUT_FILE)
    with open(out_path, "w", encoding="utf-8") as handle:
        json.dump(output, handle, ensure_ascii=False, indent=1)

    size_kb = os.path.getsize(out_path) / 1024
    print(f"wrote {OUTPUT_FILE}: {len(output_sets)} sets, {grand_total} cards, {size_kb:.1f} KB")


if __name__ == "__main__":
    main()
