#!/usr/bin/env python3
"""
Audits how card-prices.json pairs onto the Pokemon TCG API card lists, and writes
PRICE-MAPPING-NOTES.md recording every card whose price is a best guess rather
than an exact match.

Run it after build-price-index.py whenever you refresh the snapshots:

    python3 build-price-index.py && python3 audit-price-mapping.py

Why guesses exist at all: Cardmarket and pokemontcg.io are joined on card name.
Where several cards in a set share a name (a base print plus a full art, or a
holo plus a non-holo), they are paired ordinally — the nth Cardmarket product by
idProduct is matched to the nth card by collector number. That is exact whenever
both sides list the same number of entries. On the vintage sets Cardmarket
sometimes carries an extra product for a name (an error or variant printing the
card API does not model), and nothing in the data says which product is the
standard print. Those groups fall back to "lowest idProduct wins" and every card
in them is listed below.

This script replicates the join in tcg-app.js exactly. If you change the matching
rules in one, change them in the other.
"""

import json
import os
import re
import sys
import time
import urllib.request
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
PRICES_FILE = "card-prices.json"
REGISTRY_FILE = "set-registry.json"
OUTPUT_FILE = "PRICE-MAPPING-NOTES.md"

API_ENDPOINT = "https://api.pokemontcg.io/v2/cards"
# The API rejects urllib's default user-agent with a 403.
REQUEST_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
}
FETCH_ATTEMPTS = 10
API_CACHE_DIR = ".api-cache"
API_CACHE_LIFETIME_S = 60 * 60 * 24

ENERGY_TYPE_ABBREVIATIONS = {
    "G": "Grass", "R": "Fire", "W": "Water", "L": "Lightning", "P": "Psychic",
    "F": "Fighting", "D": "Darkness", "M": "Metal", "Y": "Fairy",
    "N": "Dragon", "C": "Colorless",
}

# Cardmarket spells this one differently from the card API.
NAME_ALIASES = {"imposter professor oak": "impostor professor oak"}


def normalize_card_name(raw_name):
    """Must stay in lockstep with normalizeCardName() in tcg-app.js."""
    # Drop the trailing "[Attack | Attack]" suffix first, but only when it holds
    # two or more characters — otherwise this would swallow the "[M]" of
    # "Nidoran [M]", which is a gender symbol rather than an attack list.
    name = re.sub(r"\s*\[[^\]]{2,}\]\s*$", "", str(raw_name))

    # With the attack suffix gone, a remaining single-letter bracket is an energy
    # type on an energy card ("Basic [M] Energy") and a gender symbol anywhere
    # else ("Nidoran [M]").
    if "energy" in name.lower():
        name = re.sub(r"\[([A-Z])\]",
                      lambda m: ENERGY_TYPE_ABBREVIATIONS.get(m.group(1), m.group(0)),
                      name)
    else:
        name = name.replace("[M]", "♂").replace("[F]", "♀")

    name = re.sub(r"\s+", " ", name).strip().lower()
    return NAME_ALIASES.get(name, name)


def collector_number(card):
    digits = re.sub(r"\D", "", str(card.get("number", "")))
    return int(digits) if digits else 10 ** 9


def fetch_set_cards(api_set_id):
    """Card list for a set, from a local cache when possible.

    api.pokemontcg.io returns intermittent 500/502 responses for otherwise
    identical requests, so responses are cached on disk and a stale cache is
    preferred over failing the whole run.
    """
    cache_dir = os.path.join(HERE, API_CACHE_DIR)
    cache_path = os.path.join(cache_dir, f"{api_set_id}.json")

    if os.path.exists(cache_path):
        age = time.time() - os.path.getmtime(cache_path)
        if age < API_CACHE_LIFETIME_S:
            with open(cache_path, encoding="utf-8") as handle:
                return json.load(handle)

    url = f"{API_ENDPOINT}?q=set.id:{api_set_id}&pageSize=250"
    last_error = None
    for attempt in range(1, FETCH_ATTEMPTS + 1):
        try:
            request = urllib.request.Request(url, headers=REQUEST_HEADERS)
            with urllib.request.urlopen(request, timeout=40) as response:
                payload = json.load(response)
            cards = payload.get("data") or []
            if not cards:
                raise ValueError("API returned an empty card list")
            os.makedirs(cache_dir, exist_ok=True)
            with open(cache_path, "w", encoding="utf-8") as handle:
                json.dump(cards, handle)
            return cards
        except Exception as exc:                                  # noqa: BLE001
            last_error = exc
            if attempt < FETCH_ATTEMPTS:
                time.sleep(min(1.5 * attempt, 8))

    # Every attempt failed: an expired cache still beats aborting the audit.
    if os.path.exists(cache_path):
        print(f"   warning: {api_set_id} unreachable ({last_error}); using the cached copy")
        with open(cache_path, encoding="utf-8") as handle:
            return json.load(handle)

    raise RuntimeError(f"could not fetch {api_set_id}: {last_error}")


def group_by_name(items, name_of, sort_key):
    grouped = {}
    for item in sorted(items, key=sort_key):
        grouped.setdefault(normalize_card_name(name_of(item)), []).append(item)
    return grouped


def audit_set(set_key, set_block):
    """Returns (summary, best_guesses, unpriced)."""
    api_cards = fetch_set_cards(set_block["apiSetId"])
    price_rows = set_block["cards"]

    cards_by_name = group_by_name(api_cards, lambda c: c["name"], collector_number)
    products_by_name = group_by_name(price_rows, lambda r: r["name"], lambda r: r["idProduct"])

    exact = 0
    best_guesses = []
    unpriced = []

    for name_key, cards in cards_by_name.items():
        products = products_by_name.get(name_key, [])

        if len(products) == len(cards):
            exact += len(cards)
            continue

        if len(products) > len(cards):
            # Surplus Cardmarket products: keep the lowest idProduct entries.
            chosen = products[: len(cards)]
            rejected = products[len(cards):]
            for card, product in zip(cards, chosen):
                best_guesses.append({
                    "number": card["number"],
                    "name": card["name"],
                    "rarity": card.get("rarity", "—"),
                    "chosen": product,
                    "rejected": rejected,
                    "group": len(products),
                })
            continue

        # Fewer products than cards: price what we can, list the remainder.
        for index, card in enumerate(cards):
            if index < len(products):
                best_guesses.append({
                    "number": card["number"],
                    "name": card["name"],
                    "rarity": card.get("rarity", "—"),
                    "chosen": products[index],
                    "rejected": [],
                    "group": len(products),
                })
            else:
                unpriced.append({
                    "number": card["number"],
                    "name": card["name"],
                    "rarity": card.get("rarity", "—"),
                    "reason": "no Cardmarket product with this name",
                })

    summary = {
        "label": set_block["label"],
        "apiSetId": set_block["apiSetId"],
        "expansionId": set_block["expansionId"],
        "cards": len(api_cards),
        "products": len(price_rows),
        "exact": exact,
        "guessed": len(best_guesses),
        "unpriced": len(unpriced),
    }
    return summary, best_guesses, unpriced


def render_markdown(snapshot_date, results, registry_blocks):
    lines = []
    add = lines.append

    add("# Price mapping notes")
    add("")
    add(f"Generated {datetime.now(timezone.utc).isoformat(timespec='seconds')} "
        f"from the Cardmarket snapshot dated {snapshot_date}.")
    add("")
    add("Regenerate with `python3 build-price-index.py && python3 audit-price-mapping.py`.")
    add("")
    add("Prices are joined to cards by name. Where a set contains several cards sharing")
    add("one name, they are paired in order: the *n*th Cardmarket product by `idProduct`")
    add("is matched to the *n*th card by collector number. That is exact when both sides")
    add("hold the same number of entries.")
    add("")
    add("**Every card listed under \"Best-guess prices\" below is not exact.** Cardmarket")
    add("carries an extra product for that name — an error or variant printing the card")
    add("API does not model — and nothing in the data identifies which product is the")
    add("standard print, so the lowest `idProduct` was taken. Treat these prices as")
    add("indicative and check them on Cardmarket before relying on them.")
    add("")

    add("## Summary")
    add("")
    add("| Set | Cards | Products | Exact | Best guess | Unpriced |")
    add("|---|---:|---:|---:|---:|---:|")
    totals = [0, 0, 0, 0, 0]
    for summary, _, _ in results:
        add(f"| {summary['label']} | {summary['cards']} | {summary['products']} | "
            f"{summary['exact']} | {summary['guessed']} | {summary['unpriced']} |")
        totals[0] += summary["cards"]
        totals[1] += summary["products"]
        totals[2] += summary["exact"]
        totals[3] += summary["guessed"]
        totals[4] += summary["unpriced"]
    add(f"| **Total** | **{totals[0]}** | **{totals[1]}** | **{totals[2]}** | "
        f"**{totals[3]}** | **{totals[4]}** |")
    add("")

    guessed_any = any(guesses for _, guesses, _ in results)
    unpriced_any = any(unpriced for _, _, unpriced in results)

    add("## Best-guess prices")
    add("")
    if not guessed_any:
        add("None — every card paired exactly.")
        add("")
    else:
        for summary, guesses, _ in results:
            if not guesses:
                continue
            add(f"### {summary['label']}")
            add("")
            add("| # | Card | Rarity | Price used | Cardmarket product | Also available | Why |")
            add("|---|---|---|---:|---|---|---|")
            for g in guesses:
                chosen = g["chosen"]
                alternatives = ", ".join(
                    f"`{r['idProduct']}` (€{r['avg']})" for r in g["rejected"]
                ) or "—"
                add(f"| {g['number']} | {g['name']} | {g['rarity']} | "
                    f"€{chosen['avg']} | `{chosen['idProduct']}` | {alternatives} | "
                    f"{g['group']} products share this name |")
            add("")

    add("## Printing caveats")
    add("")
    caveat_sets = [(s, block) for s, _, _, block in
                   ((summary, g, u, block) for (summary, g, u), block in
                    zip(results, registry_blocks))
                   if block.get("pricingCaveat")]

    if not caveat_sets:
        add("None — every tracked set maps to exactly one Cardmarket printing.")
        add("")
    else:
        add("Cardmarket prices a *product*, and for the vintage sets a product does not always")
        add("correspond to one printing. Where that is true the set is listed below, with its")
        add("most valuable cards so the numbers can be spot-checked on cardmarket.com before")
        add("being relied on. Nothing in the dump names its expansions, so the exact printing")
        add("behind these figures cannot be determined from the data alone.")
        add("")
        for summary, block in caveat_sets:
            add(f"### {summary['label']}")
            add("")
            add(f"Cardmarket expansion `{summary['expansionId']}` · {summary['products']} products")
            add("")
            add(f"{block['pricingCaveat']}")
            add("")
            top_cards = sorted(
                (c for c in block["cards"] if c.get("avg") is not None),
                key=lambda c: c["avg"], reverse=True,
            )[:5]
            if top_cards:
                add("Spot-check these against Cardmarket:")
                add("")
                add("| Card | Avg | Low | Trend | Product |")
                add("|---|---:|---:|---:|---|")
                for card in top_cards:
                    add(f"| {card['name']} | €{card['avg']} | €{card['low']} | "
                        f"€{card['trend']} | `{card['idProduct']}` |")
                add("")

    add("## Unpriced cards")
    add("")
    if not unpriced_any:
        add("None — every card received a price.")
    else:
        for summary, _, unpriced in results:
            if not unpriced:
                continue
            add(f"### {summary['label']}")
            add("")
            add("| # | Card | Rarity | Reason |")
            add("|---|---|---|---|")
            for u in unpriced:
                add(f"| {u['number']} | {u['name']} | {u['rarity']} | {u['reason']} |")
            add("")

    return "\n".join(lines) + "\n"


def main():
    prices_path = os.path.join(HERE, PRICES_FILE)
    if not os.path.exists(prices_path):
        sys.exit(f"error: {PRICES_FILE} not found — run build-price-index.py first.")

    with open(prices_path, encoding="utf-8") as handle:
        prices = json.load(handle)

    registry = load_registry()
    registry_by_key = {entry["key"]: entry for entry in registry}
    results = []
    registry_blocks = []
    for entry in registry:
        set_key = entry["key"]
        set_block = prices["sets"].get(set_key)
        if not set_block:
            print(f"   skipping {set_key}: not in {PRICES_FILE}")
            continue
        print(f"   auditing {set_block['label']}…")
        results.append(audit_set(set_key, set_block))
        # Price rows plus the registry's pricingCaveat, for the caveat section.
        registry_blocks.append({**set_block, **registry_by_key.get(set_key, {})})

    markdown = render_markdown(prices.get("snapshotDate"), results, registry_blocks)
    out_path = os.path.join(HERE, OUTPUT_FILE)
    with open(out_path, "w", encoding="utf-8") as handle:
        handle.write(markdown)

    guessed = sum(s["guessed"] for s, _, _ in results)
    unpriced = sum(s["unpriced"] for s, _, _ in results)
    exact = sum(s["exact"] for s, _, _ in results)
    print(f"wrote {OUTPUT_FILE}: {exact} exact, {guessed} best-guess, {unpriced} unpriced")


def load_registry():
    with open(os.path.join(HERE, REGISTRY_FILE), encoding="utf-8") as handle:
        return json.load(handle)["sets"]


if __name__ == "__main__":
    main()
