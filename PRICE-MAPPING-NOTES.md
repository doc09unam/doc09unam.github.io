# Price mapping notes

Generated 2026-09-06T16:18:15+00:00 from the Cardmarket snapshot dated 2026-09-05T02:47:21+0200.

Regenerate with `python3 build-price-index.py && python3 audit-price-mapping.py`.

Prices are joined to cards by name. Where a set contains several cards sharing
one name, they are paired in order: the *n*th Cardmarket product by `idProduct`
is matched to the *n*th card by collector number. That is exact when both sides
hold the same number of entries.

**Every card listed under "Best-guess prices" below is not exact.** Cardmarket
carries an extra product for that name — an error or variant printing the card
API does not model — and nothing in the data identifies which product is the
standard print, so the lowest `idProduct` was taken. Treat these prices as
indicative and check them on Cardmarket before relying on them.

## Summary

| Set | Cards | Products | Exact | Best guess | Unpriced |
|---|---:|---:|---:|---:|---:|
| Pitch Black | 120 | 120 | 120 | 0 | 0 |
| Base Set | 102 | 102 | 102 | 0 | 0 |
| Jungle | 64 | 66 | 61 | 3 | 0 |
| Fossil | 62 | 63 | 60 | 2 | 0 |
| Team Rocket | 83 | 84 | 81 | 2 | 0 |
| Gym Heroes | 132 | 133 | 131 | 1 | 0 |
| Gym Challenge | 132 | 132 | 132 | 0 | 0 |
| **Total** | **695** | **700** | **687** | **8** | **0** |

## Best-guess prices

### Jungle

| # | Card | Rarity | Price used | Cardmarket product | Also available | Why |
|---|---|---|---:|---|---|---|
| 1 | Clefable | Rare Holo | €31.14 | `273798` | `275572` (€800) | 3 products share this name |
| 17 | Clefable | Rare | €8.45 | `273814` | `275572` (€800) | 3 products share this name |
| 56 | Meowth | Common | €0.92 | `273853` | `275571` (€81.67) | 2 products share this name |

### Fossil

| # | Card | Rarity | Price used | Cardmarket product | Also available | Why |
|---|---|---|---:|---|---|---|
| 1 | Aerodactyl | Rare Holo | €35.61 | `273862` | `275573` (€34.03) | 3 products share this name |
| 16 | Aerodactyl | Rare | €11.76 | `273877` | `275573` (€34.03) | 3 products share this name |

### Team Rocket

| # | Card | Rarity | Price used | Cardmarket product | Also available | Why |
|---|---|---|---:|---|---|---|
| 8 | Dark Gyarados | Rare Holo | €148.12 | `274061` | `275574` (€41.31) | 3 products share this name |
| 25 | Dark Gyarados | Rare | €23.55 | `274078` | `275574` (€41.31) | 3 products share this name |

### Gym Heroes

| # | Card | Rarity | Price used | Cardmarket product | Also available | Why |
|---|---|---|---:|---|---|---|
| 9 | Misty's Seadra | Rare Holo | €23 | `274145` | `275575` (€19.43) | 2 products share this name |

## Printing caveats

Cardmarket prices a *product*, and for the vintage sets a product does not always
correspond to one printing. Where that is true the set is listed below, with its
most valuable cards so the numbers can be spot-checked on cardmarket.com before
being relied on. Nothing in the dump names its expansions, so the exact printing
behind these figures cannot be determined from the data alone.

### Base Set

Cardmarket expansion `4169` · 102 products

Cardmarket lists Base Set under two expansions. This tracker uses 4169, which carries exactly one product per card. The other, 1523, splits 1st Edition / Shadowless / Unlimited across 211 products and cannot be paired against a card API that models one printing per card. So these are 4169's prices, not 1st Edition.

Spot-check these against Cardmarket:

| Card | Avg | Low | Trend | Product |
|---|---:|---:|---:|---|
| Charizard | €662.66 | €169 | €709.09 | `557671` |
| Venusaur | €139.44 | €19.99 | €170.47 | `557654` |
| Blastoise | €124.6 | €29.99 | €144.08 | `557683` |
| Nidoking | €122.2 | €6.49 | €94.56 | `557661` |
| Alakazam | €97.53 | €9 | €73.19 | `557700` |

### Jungle

Cardmarket expansion `1525` · 66 products

Cardmarket does not split 1st Edition from Unlimited in this expansion, so every price here is for a single unidentified printing.

Spot-check these against Cardmarket:

| Card | Avg | Low | Trend | Product |
|---|---:|---:|---:|---|
| Clefable | €800 | €575 | €471.57 | `275572` |
| Meowth | €81.67 | €39.9 | €88.65 | `275571` |
| Snorlax | €72.91 | €9.9 | €70.63 | `273808` |
| Jolteon | €51.32 | €4 | €63.1 | `273801` |
| Flareon | €46.57 | €11.94 | €54.45 | `273800` |

### Fossil

Cardmarket expansion `1526` · 63 products

Cardmarket does not split 1st Edition from Unlimited in this expansion, so every price here is for a single unidentified printing.

Spot-check these against Cardmarket:

| Card | Avg | Low | Trend | Product |
|---|---:|---:|---:|---|
| Gengar | €154.45 | €24 | €159.34 | `273866` |
| Dragonite | €140.89 | €20 | €163.07 | `273865` |
| Moltres | €65.6 | €10 | €76.57 | `273873` |
| Raichu | €54.55 | €4 | €44.36 | `273875` |
| Haunter | €47.23 | €6.41 | €36.32 | `273867` |

### Team Rocket

Cardmarket expansion `1528` · 84 products

Cardmarket does not split 1st Edition from Unlimited in this expansion, so every price here is for a single unidentified printing.

Spot-check these against Cardmarket:

| Card | Avg | Low | Trend | Product |
|---|---:|---:|---:|---|
| Dark Charizard | €279.48 | €49.99 | €240.85 | `274057` |
| Dark Blastoise | €172.17 | €23.9 | €188.31 | `274056` |
| Dark Dragonite | €168.31 | €29 | €127.77 | `274058` |
| Dark Gyarados | €148.12 | €9 | €284.22 | `274061` |
| Dark Raichu | €106.13 | €22.99 | €100.62 | `274136` |

### Gym Heroes

Cardmarket expansion `1529` · 133 products

Cardmarket does not split 1st Edition from Unlimited in this expansion, so every price here is for a single unidentified printing.

Spot-check these against Cardmarket:

| Card | Avg | Low | Trend | Product |
|---|---:|---:|---:|---|
| Sabrina's Gengar | €414.94 | €215 | €422.29 | `274150` |
| Blaine's Moltres | €117.91 | €19.89 | €174.68 | `274137` |
| Erika's Dragonair | €105.42 | €15 | €137.21 | `274140` |
| Rocket's Moltres | €90.29 | €18 | €80.74 | `274148` |
| Rocket's Scyther | €66.46 | €15 | €141.93 | `274149` |

### Gym Challenge

Cardmarket expansion `1530` · 132 products

Cardmarket does not split 1st Edition from Unlimited in this expansion, so every price here is for a single unidentified printing.

Spot-check these against Cardmarket:

| Card | Avg | Low | Trend | Product |
|---|---:|---:|---:|---|
| Sabrina's Gengar | €511.52 | €60 | €354.37 | `274297` |
| Blaine's Charizard | €434.84 | €109.89 | €567.96 | `274270` |
| Rocket's Zapdos | €413.71 | €17.32 | €169.59 | `274283` |
| Rocket's Mewtwo | €249.24 | €74.88 | €232.76 | `274282` |
| Erika's Venusaur | €141.06 | €42.9 | €109.28 | `274272` |

## Unpriced cards

None — every card received a price.
