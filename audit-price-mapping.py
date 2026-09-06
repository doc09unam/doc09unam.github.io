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
INDEX_FILE = "card-prices.json"
REGISTRY_FILE = "set-registry.json"
OUTPUT_FILE = "PRICE-MAPPING-NOTES.md"
# A rendered sibling, so the notes are readable when served from GitHub Pages
# regardless of whether Jekyll is enabled for the repo.
OUTPUT_HTML_FILE = "price-mapping-notes.html"

API_ENDPOINT = "https://api.pokemontcg.io/v2/cards"
# The API rejects urllib's default user-agent with a 403.
REQUEST_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
}
FETCH_ATTEMPTS = 8
GUESS_LISTING_THRESHOLD_EUR = 1.00
MAX_GUESS_ROWS_PER_SET = 25
API_CACHE_DIR = ".api-cache"
API_CACHE_LIFETIME_S = 60 * 60 * 24 * 7

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

    name = name.strip().lower()
    name = re.sub(r"\s+lv\.\d+$", "", name)
    name = re.sub(r"\s+δ\s+delta species$", " δ", name)
    name = name.replace("-", " ")
    name = re.sub(r"\s+", " ", name).strip()
    name = re.sub(r"^m\s+(?=\w)", "m", name)
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
    with open(os.path.join(HERE, set_block["file"]), encoding="utf-8") as handle:
        price_rows = json.load(handle)["cards"]

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
        "expansionId": set_block.get("expansionId"),
        "release": (set_block.get("releaseDate") or "")[:4],
        "cards": len(api_cards),
        "products": len(price_rows),
        "exact": exact,
        "guessed": len(best_guesses),
        "unpriced": len(unpriced),
    }
    return summary, best_guesses, unpriced


def render_markdown(snapshot_date, results, registry_blocks, unpriced_sets):
    lines = []
    add = lines.append

    add("# Price mapping notes")
    add("")
    add(f"Generated {datetime.now(timezone.utc).isoformat(timespec='seconds')} "
        f"from the Cardmarket snapshot dated {snapshot_date}.")
    add("")
    add("Regenerate with `python3 build-price-index.py && python3 audit-price-mapping.py`.")
    add("")

    priced_cards = sum(s["cards"] for s, _, _ in results)
    unpriced_cards = sum(u.get("setTotal", 0) for u in unpriced_sets)
    exact = sum(s["exact"] for s, _, _ in results)
    guessed = sum(s["guessed"] for s, _, _ in results)
    unmatched = sum(s["unpriced"] for s, _, _ in results)

    add("## Summary")
    add("")
    add("| | Sets | Cards |")
    add("|---|---:|---:|")
    add(f"| Priced | {len(results)} | {priced_cards:,} |")
    add(f"| Deliberately unpriced | {len(unpriced_sets)} | {unpriced_cards:,} |")
    add(f"| **Total tracked** | **{len(results)+len(unpriced_sets)}** | **{priced_cards+unpriced_cards:,}** |")
    add("")
    add(f"Within the priced sets: **{exact:,} exact**, **{guessed:,} best guess**, "
        f"**{unmatched:,} unmatched**.")
    add("")

    add("## Sets deliberately left unpriced")
    add("")
    if not unpriced_sets:
        add("None - every tracked set has a confidently identified Cardmarket expansion.")
        add("")
    else:
        add("These sets appear in the app so their cards can still be collected and counted, but they")
        add("carry **no prices**. Their Cardmarket expansion could not be identified with enough")
        add("confidence, and a wrong price is worse than none - it would flow into the portfolio")
        add("total invisibly. Cards in these sets contribute 0 to portfolio value.")
        add("")
        add("| Set | Released | Cards | Why it is unpriced |")
        add("|---|---|---:|---|")
        for u in sorted(unpriced_sets, key=lambda x: x.get("releaseDate", "")):
            add(f"| {u['label']} | {(u.get('releaseDate') or '')[:4]} | {u.get('setTotal',0)} | "
                f"{u.get('unpricedReason','-')} |")
        add("")

    add("## Priced sets")
    add("")
    add("| Set | Released | Expansion | Cards | Exact | Best guess | Unmatched |")
    add("|---|---|---:|---:|---:|---:|---:|")
    for summary, _, _ in sorted(results, key=lambda r: r[0].get("release","")):
        add(f"| {summary['label']} | {summary.get('release','')} | `{summary['expansionId']}` | "
            f"{summary['cards']} | {summary['exact']} | {summary['guessed']} | {summary['unpriced']} |")
    add("")

    add("## Best-guess prices")
    add("")
    add("Cardmarket carries more products than the card API has cards for these names - error or")
    add("variant printings the API does not model - so the lowest `idProduct` was taken. Only guesses")
    add(f"where a rejected alternative differs by more than EUR {GUESS_LISTING_THRESHOLD_EUR:.2f} are")
    add("listed individually; the remainder are bulk cards a few cents apart.")
    add("")
    listed = False
    for summary, guesses, _ in sorted(results, key=lambda r: r[0].get("release","")):
        notable = [g for g in guesses if guess_gap(g) >= GUESS_LISTING_THRESHOLD_EUR]
        if not notable:
            continue
        listed = True
        notable.sort(key=guess_gap, reverse=True)
        shown = notable[:MAX_GUESS_ROWS_PER_SET]
        add(f"### {summary['label']}")
        add("")
        add(f"{len(guesses)} best-guess cards in this set, {len(notable)} of them material.")
        add("")
        add("| # | Card | Rarity | Price used | Product | Rejected | Gap |")
        add("|---|---|---|---:|---|---|---:|")
        for g in shown:
            alts = ", ".join(f"`{x['idProduct']}` (EUR {x.get('avg')})" for x in g["rejected"]) or "-"
            add(f"| {g['number']} | {g['name']} | {g['rarity']} | EUR {g['chosen'].get('avg')} | "
                f"`{g['chosen']['idProduct']}` | {alts} | EUR {guess_gap(g):.2f} |")
        if len(notable) > len(shown):
            add(f"| ... | *{len(notable)-len(shown)} more in this set* | | | | | |")
        add("")
    if not listed:
        add("None above the threshold.")
        add("")

    add("## Unmatched cards in priced sets")
    add("")
    if not any(u for _, _, u in results):
        add("None - every card in every priced set received a price.")
        add("")
    else:
        add("| Set | # | Card | Rarity | Reason |")
        add("|---|---|---|---|---|")
        for summary, _, unmatched_cards in sorted(results, key=lambda r: r[0].get("release","")):
            for u in unmatched_cards:
                add(f"| {summary['label']} | {u['number']} | {u['name']} | {u['rarity']} | {u['reason']} |")
        add("")

    add("## Printing caveats")
    add("")
    caveats = [(s, b) for (s, _, _), b in zip(results, registry_blocks)
               if b.get("pricingNote") or b.get("pricingCaveat")]
    if not caveats:
        add("None recorded.")
    else:
        for summary, block in caveats:
            add(f"- **{summary['label']}** - {block.get('pricingNote') or block.get('pricingCaveat')}")
    add("")

    return "\n".join(lines) + "\n"


def escape_html(text):
    return (str(text).replace("&", "&amp;").replace("<", "&lt;")
            .replace(">", "&gt;").replace('"', "&quot;"))


def render_inline(text):
    """**bold**, *italic* and `code` — the only inline markup this script emits.
    Bold is converted first so its asterisks cannot be seen as italics."""
    out = escape_html(text)
    out = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", out)
    out = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", out)
    out = re.sub(r"`([^`]+)`", r"<code>\1</code>", out)
    return out


def markdown_to_html(markdown_text):
    """Converts the exact Markdown subset render_markdown() produces: ATX
    headings, paragraphs, and pipe tables with an alignment row. Deliberately
    not a general Markdown parser."""
    html_parts = []
    paragraph = []
    table = []

    def flush_paragraph():
        if paragraph:
            html_parts.append("<p>" + render_inline(" ".join(paragraph)) + "</p>")
            paragraph.clear()

    def flush_table():
        if not table:
            return
        header, *body = table
        # Drop the |---|---| alignment row.
        body = [row for row in body if not re.match(r"^\|[\s:|-]+\|$", row)]

        def cells(row):
            return [c.strip() for c in row.strip().strip("|").split("|")]

        head_html = "".join(f"<th>{render_inline(c)}</th>" for c in cells(header))
        rows_html = "".join(
            "<tr>" + "".join(f"<td>{render_inline(c)}</td>" for c in cells(r)) + "</tr>"
            for r in body
        )
        html_parts.append(
            f"<div class='table-wrap'><table><thead><tr>{head_html}</tr></thead>"
            f"<tbody>{rows_html}</tbody></table></div>"
        )
        table.clear()

    for line in markdown_text.split("\n"):
        stripped = line.rstrip()
        if stripped.startswith("|"):
            flush_paragraph()
            table.append(stripped)
            continue
        flush_table()

        if not stripped:
            flush_paragraph()
        elif stripped.startswith("### "):
            flush_paragraph()
            html_parts.append(f"<h3>{render_inline(stripped[4:])}</h3>")
        elif stripped.startswith("## "):
            flush_paragraph()
            html_parts.append(f"<h2>{render_inline(stripped[3:])}</h2>")
        elif stripped.startswith("# "):
            flush_paragraph()
            html_parts.append(f"<h1>{render_inline(stripped[2:])}</h1>")
        else:
            paragraph.append(stripped)

    flush_paragraph()
    flush_table()

    body = "\n".join(html_parts)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Price mapping notes</title>
<style>
  :root {{ color-scheme: dark; }}
  body {{ background:#0f172a; color:#f8fafc; font-family:system-ui,-apple-system,"Segoe UI",sans-serif;
         margin:0; padding:32px 20px; line-height:1.6; }}
  main {{ max-width:960px; margin:0 auto; }}
  h1 {{ font-size:24px; color:#a78bfa; margin:0 0 6px; }}
  h2 {{ font-size:17px; color:#f8fafc; margin:34px 0 10px; padding-bottom:7px;
        border-bottom:1px solid #1e293b; }}
  h3 {{ font-size:14px; color:#818cf8; margin:24px 0 8px; }}
  p {{ color:#94a3b8; font-size:13px; margin:0 0 12px; }}
  strong {{ color:#f8fafc; }}
  code {{ background:#020617; border:1px solid #1e293b; border-radius:4px;
          padding:1px 5px; font-size:12px; color:#a5b4fc; }}
  .table-wrap {{ overflow-x:auto; margin:0 0 18px; }}
  table {{ border-collapse:collapse; width:100%; font-size:12.5px; }}
  th, td {{ border:1px solid #1e293b; padding:7px 10px; text-align:left; white-space:nowrap; }}
  th {{ background:#020617; color:#94a3b8; font-size:11px; text-transform:uppercase;
        letter-spacing:0.05em; }}
  td {{ color:#cbd5e1; }}
  tbody tr:nth-child(even) {{ background:#0b1220; }}
  .back {{ display:inline-block; margin-bottom:22px; color:#818cf8; font-size:12px;
           text-decoration:none; }}
  .back:hover {{ color:#a78bfa; text-decoration:underline; }}
</style>
</head>
<body>
<main>
<a class="back" href="index.html">&larr; Back to the tracker</a>
{body}
</main>
</body>
</html>
"""


def guess_gap(guess):
    """Largest price difference between the chosen product and those rejected."""
    chosen = guess["chosen"].get("avg") or 0
    gaps = [abs((r.get("avg") or 0) - chosen) for r in guess["rejected"]]
    return max(gaps) if gaps else 0.0


def main():
    index_path = os.path.join(HERE, INDEX_FILE)
    if not os.path.exists(index_path):
        sys.exit(f"error: {INDEX_FILE} not found - run build-price-index.py first.")
    with open(index_path, encoding="utf-8") as handle:
        index = json.load(handle)

    results, registry_blocks, unpriced_sets = [], [], []
    for set_key, entry in index["sets"].items():
        if not entry.get("priced"):
            unpriced_sets.append(dict(entry, key=set_key))
            continue
        print(f"   auditing {entry['label']}...")
        results.append(audit_set(set_key, entry))
        registry_blocks.append(dict(entry, key=set_key))

    markdown = render_markdown(index.get("snapshotDate"), results, registry_blocks, unpriced_sets)
    with open(os.path.join(HERE, OUTPUT_FILE), "w", encoding="utf-8") as handle:
        handle.write(markdown)
    with open(os.path.join(HERE, OUTPUT_HTML_FILE), "w", encoding="utf-8") as handle:
        handle.write(markdown_to_html(markdown))

    exact = sum(s0["exact"] for s0, _, _ in results)
    guess = sum(s0["guessed"] for s0, _, _ in results)
    none = sum(s0["unpriced"] for s0, _, _ in results)
    print(f"\nwrote {OUTPUT_FILE} and {OUTPUT_HTML_FILE}")
    print(f"   {len(results)} priced sets: {exact:,} exact, {guess:,} best-guess, {none:,} unmatched")
    print(f"   {len(unpriced_sets)} sets documented as deliberately unpriced")


def load_registry():
    with open(os.path.join(HERE, REGISTRY_FILE), encoding="utf-8") as handle:
        return json.load(handle)["sets"]


if __name__ == "__main__":
    main()
