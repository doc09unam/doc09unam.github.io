#!/usr/bin/env python3
"""
Distils the two full Cardmarket catalogue dumps down to just the Pitch Black slice.

The dumps are ~28 MB combined and cover every Cardmarket expansion and product type.
The browser only ever needs the 120 rows belonging to this one set, so that slice is
extracted once, here, and written to pitch-black-prices.json (~15 KB). tcg-app.js loads
only that file.

Re-run this whenever you drop in fresh snapshot files:

    python3 build-price-index.py

The set is located by fingerprinting, not by a hardcoded expansion id: the six Pokémon
that make their TCG debut as "Mega ___ ex" in Pitch Black cannot appear under any other
Cardmarket expansion, so whichever idExpansion collects the most of those names is this
set. Row order is preserved as idProduct ascending, which is the order tcg-app.js relies
on to pair duplicate card names (base print vs full art vs secret rare) against the
Pokemon TCG API's card numbers.
"""

import json
import os
import re
import sys
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))

PRODUCTS_FILE = "products_singles_6.json"
PRICE_GUIDE_FILE = "price_guide_6.json"
OUTPUT_FILE = "pitch-black-prices.json"

# Debut-in-this-set names, used only to identify the expansion. See module docstring.
ANCHOR_CARD_NAMES = [
    "Mega Darkrai ex",
    "Mega Zeraora ex",
    "Mega Chandelure ex",
    "Mega Excadrill ex",
    "Mega Delphox ex",
    "Mega Slowbro ex",
]

EXPECTED_CARD_COUNT = 120

TRAILING_VARIANT_SUFFIX = re.compile(r"\s*\[[^\]]*\]\s*$")


def strip_variant_suffix(product_name):
    """Cardmarket appends "[Attack | Attack]" to disambiguate prints; drop it."""
    return TRAILING_VARIANT_SUFFIX.sub("", str(product_name)).strip()


def load_json(filename):
    path = os.path.join(HERE, filename)
    if not os.path.exists(path):
        sys.exit(
            f"error: {filename} not found next to this script.\n"
            f"       Both {PRODUCTS_FILE} and {PRICE_GUIDE_FILE} must sit in {HERE}."
        )
    with open(path, encoding="utf-8") as handle:
        return json.load(handle)


def detect_expansion_id(all_products):
    anchor_names = {name.lower() for name in ANCHOR_CARD_NAMES}
    votes = {}

    for product in all_products:
        if strip_variant_suffix(product.get("name", "")).lower() in anchor_names:
            expansion_id = product.get("idExpansion")
            votes[expansion_id] = votes.get(expansion_id, 0) + 1

    if not votes:
        sys.exit(
            "error: none of the anchor card names were found in the products dump.\n"
            "       Either the snapshot predates Pitch Black or the naming changed."
        )

    best_id, best_votes = max(votes.items(), key=lambda pair: pair[1])
    runner_up = sorted(votes.values(), reverse=True)[1] if len(votes) > 1 else 0
    if best_votes <= runner_up:
        sys.exit(f"error: expansion fingerprint was ambiguous (votes: {votes}).")

    return best_id, best_votes


def main():
    products_payload = load_json(PRODUCTS_FILE)
    price_guide_payload = load_json(PRICE_GUIDE_FILE)

    all_products = products_payload.get("products") or []
    all_price_rows = price_guide_payload.get("priceGuides") or []
    print(f"read {len(all_products):,} products and {len(all_price_rows):,} price rows")

    expansion_id, anchor_votes = detect_expansion_id(all_products)
    print(f"fingerprinted Pitch Black as idExpansion {expansion_id} ({anchor_votes} anchor hits)")

    price_row_by_product_id = {row["idProduct"]: row for row in all_price_rows}

    set_products = sorted(
        (p for p in all_products if p.get("idExpansion") == expansion_id),
        key=lambda p: p["idProduct"],
    )

    cards = []
    missing_prices = []
    for product in set_products:
        price_row = price_row_by_product_id.get(product["idProduct"])
        if price_row is None:
            missing_prices.append(product["name"])
            continue
        cards.append(
            {
                "idProduct": product["idProduct"],
                "name": strip_variant_suffix(product["name"]),
                "avg": price_row.get("avg"),
                "low": price_row.get("low"),
                "trend": price_row.get("trend"),
                "avgHolo": price_row.get("avg-holo"),
                "lowHolo": price_row.get("low-holo"),
                "trendHolo": price_row.get("trend-holo"),
            }
        )

    if missing_prices:
        print(f"warning: {len(missing_prices)} products had no price row: {missing_prices[:5]}")
    if len(cards) != EXPECTED_CARD_COUNT:
        print(f"warning: expected {EXPECTED_CARD_COUNT} cards, got {len(cards)}")

    with_holo = sum(1 for card in cards if card["avgHolo"] is not None)

    output = {
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "snapshotDate": price_guide_payload.get("createdAt"),
        "expansionId": expansion_id,
        "sourceFiles": [PRODUCTS_FILE, PRICE_GUIDE_FILE],
        "cards": cards,
    }

    out_path = os.path.join(HERE, OUTPUT_FILE)
    with open(out_path, "w", encoding="utf-8") as handle:
        json.dump(output, handle, ensure_ascii=False, indent=1)

    size_kb = os.path.getsize(out_path) / 1024
    print(
        f"wrote {OUTPUT_FILE}: {len(cards)} cards "
        f"({with_holo} with a reverse/holo price), {size_kb:.1f} KB"
    )


if __name__ == "__main__":
    main()
