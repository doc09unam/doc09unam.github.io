# Price mapping notes

Generated 2026-09-06T19:04:54+00:00 from the Cardmarket snapshot dated 2026-09-05T02:47:21+0200.

Regenerate with `python3 build-price-index.py && python3 audit-price-mapping.py`.

## Summary

| | Sets | Cards |
|---|---:|---:|
| Priced | 108 | 16,049 |
| Deliberately unpriced | 33 | 2,834 |
| **Total tracked** | **141** | **18,883** |

Within the priced sets: **14,634 exact**, **1,329 best guess**, **86 unmatched**.

## Sets deliberately left unpriced

These sets appear in the app so their cards can still be collected and counted, but they
carry **no prices**. Their Cardmarket expansion could not be identified with enough
confidence, and a wrong price is worse than none - it would flow into the portfolio
total invisibly. Cards in these sets contribute 0 to portfolio value.

| Set | Released | Cards | Why it is unpriced |
|---|---|---:|---|
| Southern Islands | 2001 | 18 | The Cardmarket expansion could not be identified confidently (name coverage 100%, margin over the runner-up 0.000). Cards are tracked for collection purposes but carry no price. |
| Neo Destiny | 2002 | 113 | The Cardmarket expansion could not be identified confidently (name coverage 99%, margin over the runner-up 0.000). Cards are tracked for collection purposes but carry no price. |
| Expedition Base Set | 2002 | 165 | The Cardmarket expansion could not be identified confidently (name coverage 100%, margin over the runner-up 0.025). Cards are tracked for collection purposes but carry no price. |
| Unseen Forces | 2005 | 145 | Pokemon-star cards (Entei star, Raikou star, Suicune star) and the Unown letter cards are named differently by Cardmarket. |
| Legend Maker | 2006 | 93 | The Cardmarket expansion could not be identified confidently (name coverage 97%, margin over the runner-up 0.087). Cards are tracked for collection purposes but carry no price. |
| Power Keepers | 2007 | 108 | The Cardmarket expansion could not be identified confidently (name coverage 97%, margin over the runner-up 0.009). Cards are tracked for collection purposes but carry no price. |
| Diamond & Pearl | 2007 | 130 | The Cardmarket expansion could not be identified confidently (name coverage 94%, margin over the runner-up 0.042). Cards are tracked for collection purposes but carry no price. |
| Mysterious Treasures | 2007 | 124 | The Cardmarket expansion could not be identified confidently (name coverage 99%, margin over the runner-up 0.067). Cards are tracked for collection purposes but carry no price. |
| Platinum | 2009 | 133 | The Cardmarket expansion could not be identified confidently (name coverage 90%, margin over the runner-up 0.251). Cards are tracked for collection purposes but carry no price. |
| Rising Rivals | 2009 | 120 | Cardmarket does not carry this set's SP Pokemon (Absol G, Blaziken FB, Rayquaza C and similar) under those names, so most of the set cannot be matched. |
| Supreme Victors | 2009 | 153 | Cardmarket does not carry this set's SP Pokemon (Absol G, Blaziken FB, Rayquaza C and similar) under those names, so most of the set cannot be matched. |
| Pokémon Rumble | 2009 | 16 | The Cardmarket expansion could not be identified confidently (name coverage 100%, margin over the runner-up 0.047). Cards are tracked for collection purposes but carry no price. |
| Dragon Vault | 2012 | 21 | The Cardmarket expansion could not be identified confidently (name coverage 95%, margin over the runner-up 0.077). Cards are tracked for collection purposes but carry no price. |
| Flashfire | 2014 | 110 | The Cardmarket expansion could not be identified confidently (name coverage 100%, margin over the runner-up 0.069). Cards are tracked for collection purposes but carry no price. |
| Furious Fists | 2014 | 114 | The Cardmarket expansion could not be identified confidently (name coverage 92%, margin over the runner-up 0.016). Cards are tracked for collection purposes but carry no price. |
| Phantom Forces | 2014 | 124 | The Cardmarket expansion could not be identified confidently (name coverage 100%, margin over the runner-up 0.056). Cards are tracked for collection purposes but carry no price. |
| Double Crisis | 2015 | 34 | The Cardmarket expansion could not be identified confidently (name coverage 100%, margin over the runner-up 0.000). Cards are tracked for collection purposes but carry no price. |
| Roaring Skies | 2015 | 112 | The Cardmarket expansion could not be identified confidently (name coverage 100%, margin over the runner-up 0.084). Cards are tracked for collection purposes but carry no price. |
| BREAKpoint | 2016 | 126 | The Cardmarket expansion could not be identified confidently (name coverage 100%, margin over the runner-up 0.035). Cards are tracked for collection purposes but carry no price. |
| Evolutions | 2016 | 113 | The Cardmarket expansion could not be identified confidently (name coverage 99%, margin over the runner-up 0.042). Cards are tracked for collection purposes but carry no price. |
| Shining Legends | 2017 | 81 | The Cardmarket expansion could not be identified confidently (name coverage 98%, margin over the runner-up 0.030). Cards are tracked for collection purposes but carry no price. |
| Celebrations | 2021 | 25 | The Cardmarket expansion could not be identified confidently (name coverage 92%, margin over the runner-up 0.290). Cards are tracked for collection purposes but carry no price. |
| Celebrations: Classic Collection | 2021 | 25 | The Cardmarket expansion could not be identified confidently (name coverage 88%, margin over the runner-up 0.409). Cards are tracked for collection purposes but carry no price. |
| Brilliant Stars Trainer Gallery | 2022 | 30 | Cardmarket files Trainer Gallery cards inside the parent set's expansion rather than as their own, so this subset cannot be matched on its own. |
| Astral Radiance Trainer Gallery | 2022 | 30 | The Cardmarket expansion could not be identified confidently (name coverage 100%, margin over the runner-up 0.049). Cards are tracked for collection purposes but carry no price. |
| Pokémon GO | 2022 | 88 | The Cardmarket expansion could not be identified confidently (name coverage 98%, margin over the runner-up 0.100). Cards are tracked for collection purposes but carry no price. |
| Lost Origin Trainer Gallery | 2022 | 30 | Cardmarket files Trainer Gallery cards inside the parent set's expansion rather than as their own, so this subset cannot be matched on its own. |
| Silver Tempest Trainer Gallery | 2022 | 30 | The Cardmarket expansion could not be identified confidently (name coverage 100%, margin over the runner-up 0.025). Cards are tracked for collection purposes but carry no price. |
| Crown Zenith Galarian Gallery | 2023 | 70 | The Cardmarket expansion could not be identified confidently (name coverage 100%, margin over the runner-up 0.024). Cards are tracked for collection purposes but carry no price. |
| Scarlet & Violet Energies | 2023 | 8 | Basic energy cards share names with every other set's energy, so no expansion can be identified from names alone. |
| Shrouded Fable | 2024 | 99 | The Cardmarket expansion could not be identified confidently (name coverage 100%, margin over the runner-up 0.021). Cards are tracked for collection purposes but carry no price. |
| Perfect Order | 2026 | 124 | The Cardmarket expansion could not be identified confidently (name coverage 100%, margin over the runner-up 0.073). Cards are tracked for collection purposes but carry no price. |
| Chaos Rising | 2026 | 122 | The Cardmarket expansion could not be identified confidently (name coverage 100%, margin over the runner-up 0.033). Cards are tracked for collection purposes but carry no price. |

## Priced sets

| Set | Released | Expansion | Cards | Exact | Best guess | Unmatched |
|---|---|---:|---:|---:|---:|---:|
| Base | 1999 | `4169` | 102 | 102 | 0 | 0 |
| Jungle | 1999 | `1525` | 64 | 61 | 3 | 0 |
| Fossil | 1999 | `1526` | 62 | 60 | 2 | 0 |
| Base Set 2 | 2000 | `1527` | 130 | 130 | 0 | 0 |
| Team Rocket | 2000 | `1528` | 83 | 81 | 2 | 0 |
| Gym Heroes | 2000 | `1529` | 132 | 131 | 1 | 0 |
| Gym Challenge | 2000 | `1530` | 132 | 132 | 0 | 0 |
| Neo Genesis | 2000 | `1531` | 111 | 105 | 6 | 0 |
| Neo Discovery | 2001 | `1532` | 75 | 75 | 0 | 0 |
| Neo Revelation | 2001 | `1533` | 66 | 66 | 0 | 0 |
| Legendary Collection | 2002 | `1535` | 110 | 106 | 4 | 0 |
| Aquapolis | 2003 | `1537` | 182 | 170 | 12 | 0 |
| Skyridge | 2003 | `1538` | 182 | 167 | 8 | 7 |
| Ruby & Sapphire | 2003 | `1539` | 109 | 100 | 9 | 0 |
| Sandstorm | 2003 | `1540` | 100 | 98 | 2 | 0 |
| Dragon | 2003 | `1541` | 100 | 92 | 8 | 0 |
| Team Magma vs Team Aqua | 2004 | `1542` | 97 | 96 | 1 | 0 |
| Hidden Legends | 2004 | `1543` | 102 | 95 | 7 | 0 |
| FireRed & LeafGreen | 2004 | `1544` | 116 | 113 | 1 | 2 |
| Team Rocket Returns | 2004 | `1545` | 111 | 106 | 2 | 3 |
| Deoxys | 2005 | `1546` | 108 | 99 | 6 | 3 |
| Emerald | 2005 | `1547` | 107 | 102 | 5 | 0 |
| Delta Species | 2005 | `1549` | 114 | 110 | 1 | 3 |
| Holon Phantoms | 2006 | `1551` | 111 | 106 | 1 | 4 |
| Crystal Guardians | 2006 | `1552` | 100 | 91 | 7 | 2 |
| Dragon Frontiers | 2006 | `1553` | 101 | 97 | 1 | 3 |
| Secret Wonders | 2007 | `1557` | 132 | 128 | 4 | 0 |
| Great Encounters | 2008 | `1558` | 106 | 101 | 5 | 0 |
| Majestic Dawn | 2008 | `1559` | 100 | 87 | 13 | 0 |
| Legends Awakened | 2008 | `1560` | 146 | 138 | 8 | 0 |
| Stormfront | 2008 | `1561` | 106 | 105 | 1 | 0 |
| Arceus | 2009 | `1565` | 111 | 105 | 3 | 3 |
| HeartGold & SoulSilver | 2010 | `1566` | 124 | 99 | 25 | 0 |
| HS—Unleashed | 2010 | `1567` | 96 | 75 | 21 | 0 |
| HS—Undaunted | 2010 | `1568` | 91 | 86 | 5 | 0 |
| HS—Triumphant | 2010 | `1569` | 103 | 95 | 8 | 0 |
| Call of Legends | 2011 | `1570` | 106 | 95 | 11 | 0 |
| Black & White | 2011 | `1571` | 115 | 93 | 22 | 0 |
| Emerging Powers | 2011 | `1572` | 98 | 95 | 3 | 0 |
| Noble Victories | 2011 | `1573` | 102 | 90 | 12 | 0 |
| Next Destinies | 2012 | `1574` | 103 | 101 | 2 | 0 |
| Dark Explorers | 2012 | `1575` | 111 | 99 | 12 | 0 |
| Dragons Exalted | 2012 | `1576` | 128 | 126 | 0 | 2 |
| Boundaries Crossed | 2012 | `1577` | 153 | 148 | 5 | 0 |
| Plasma Storm | 2013 | `1578` | 138 | 134 | 4 | 0 |
| Plasma Freeze | 2013 | `1579` | 122 | 114 | 8 | 0 |
| Plasma Blast | 2013 | `1580` | 105 | 103 | 2 | 0 |
| Legendary Treasures | 2013 | `1581` | 140 | 137 | 3 | 0 |
| Kalos Starter Set | 2013 | `1637` | 39 | 36 | 3 | 0 |
| XY | 2014 | `1582` | 146 | 136 | 10 | 0 |
| Primal Clash | 2015 | `1585` | 164 | 152 | 12 | 0 |
| Ancient Origins | 2015 | `4024` | 101 | 96 | 1 | 4 |
| BREAKthrough | 2015 | `1678` | 165 | 137 | 28 | 0 |
| Generations | 2016 | `1693` | 117 | 102 | 15 | 0 |
| Fates Collide | 2016 | `1706` | 129 | 112 | 17 | 0 |
| Steam Siege | 2016 | `1716` | 116 | 98 | 18 | 0 |
| Sun & Moon | 2017 | `1745` | 173 | 132 | 39 | 2 |
| Guardians Rising | 2017 | `1800` | 180 | 140 | 40 | 0 |
| Burning Shadows | 2017 | `1824` | 177 | 141 | 36 | 0 |
| Crimson Invasion | 2017 | `1843` | 126 | 102 | 24 | 0 |
| Ultra Prism | 2018 | `2065` | 178 | 147 | 27 | 4 |
| Forbidden Light | 2018 | `2075` | 150 | 128 | 20 | 2 |
| Celestial Storm | 2018 | `2320` | 187 | 160 | 27 | 0 |
| Dragon Majesty | 2018 | `2351` | 80 | 73 | 7 | 0 |
| Lost Thunder | 2018 | `2370` | 240 | 206 | 30 | 4 |
| Team Up | 2019 | `2407` | 198 | 179 | 17 | 2 |
| Detective Pikachu | 2019 | `2438` | 18 | 18 | 0 | 0 |
| Unbroken Bonds | 2019 | `2437` | 238 | 212 | 25 | 1 |
| Unified Minds | 2019 | `2487` | 261 | 225 | 36 | 0 |
| Hidden Fates | 2019 | `2514` | 69 | 61 | 8 | 0 |
| Hidden Fates Shiny Vault | 2019 | `2514` | 94 | 87 | 7 | 0 |
| Cosmic Eclipse | 2019 | `2644` | 272 | 267 | 5 | 0 |
| Sword & Shield | 2020 | `2921` | 216 | 185 | 28 | 3 |
| Rebel Clash | 2020 | `3143` | 209 | 194 | 12 | 3 |
| Darkness Ablaze | 2020 | `3199` | 201 | 179 | 19 | 3 |
| Pokémon Futsal Collection | 2020 | `3510` | 5 | 5 | 0 | 0 |
| Champion's Path | 2020 | `3419` | 80 | 79 | 0 | 1 |
| Vivid Voltage | 2020 | `3484` | 203 | 192 | 11 | 0 |
| Shining Fates | 2021 | `3630` | 73 | 46 | 25 | 2 |
| Shining Fates Shiny Vault | 2021 | `3630` | 122 | 98 | 24 | 0 |
| Battle Styles | 2021 | `3675` | 183 | 167 | 16 | 0 |
| Chilling Reign | 2021 | `4174` | 233 | 215 | 18 | 0 |
| Evolving Skies | 2021 | `4328` | 237 | 219 | 18 | 0 |
| Fusion Strike | 2021 | `4382` | 284 | 276 | 8 | 0 |
| Brilliant Stars | 2022 | `4434` | 186 | 159 | 25 | 2 |
| Astral Radiance | 2022 | `4979` | 216 | 185 | 31 | 0 |
| Lost Origin | 2022 | `5093` | 217 | 197 | 20 | 0 |
| Silver Tempest | 2022 | `5142` | 215 | 192 | 23 | 0 |
| Crown Zenith | 2023 | `5201` | 160 | 134 | 25 | 1 |
| Scarlet & Violet | 2023 | `5223` | 258 | 209 | 45 | 4 |
| Paldea Evolved | 2023 | `5318` | 279 | 220 | 56 | 3 |
| Obsidian Flames | 2023 | `5385` | 230 | 197 | 33 | 0 |
| 151 | 2023 | `5328` | 207 | 202 | 5 | 0 |
| Paradox Rift | 2023 | `5444` | 266 | 219 | 47 | 0 |
| Paldean Fates | 2024 | `5546` | 245 | 227 | 16 | 2 |
| Temporal Forces | 2024 | `5589` | 218 | 188 | 30 | 0 |
| Twilight Masquerade | 2024 | `5691` | 226 | 192 | 34 | 0 |
| Stellar Crown | 2024 | `5802` | 175 | 153 | 22 | 0 |
| Surging Sparks | 2024 | `5879` | 252 | 232 | 20 | 0 |
| Prismatic Evolutions | 2025 | `5944` | 180 | 176 | 0 | 4 |
| Journey Together | 2025 | `6006` | 190 | 189 | 0 | 1 |
| Destined Rivals | 2025 | `6096` | 244 | 242 | 0 | 2 |
| Black Bolt | 2025 | `6134` | 172 | 171 | 0 | 1 |
| White Flare | 2025 | `6135` | 173 | 173 | 0 | 0 |
| Mega Evolution | 2025 | `6209` | 188 | 187 | 0 | 1 |
| Phantasmal Flames | 2025 | `6299` | 130 | 130 | 0 | 0 |
| Ascended Heroes | 2026 | `6395` | 295 | 293 | 0 | 2 |
| Pitch Black | 2026 | `6569` | 120 | 120 | 0 | 0 |

## Best-guess prices

Cardmarket carries more products than the card API has cards for these names - error or
variant printings the API does not model - so the lowest `idProduct` was taken. Only guesses
where a rejected alternative differs by more than EUR 1.00 are
listed individually; the remainder are bulk cards a few cents apart.

### Jungle

3 best-guess cards in this set, 3 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 17 | Clefable | Rare | EUR 8.45 | `273814` | `275572` (EUR 800) | EUR 791.55 |
| 1 | Clefable | Rare Holo | EUR 31.14 | `273798` | `275572` (EUR 800) | EUR 768.86 |
| 56 | Meowth | Common | EUR 0.92 | `273853` | `275571` (EUR 81.67) | EUR 80.75 |

### Fossil

2 best-guess cards in this set, 2 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 16 | Aerodactyl | Rare | EUR 11.76 | `273877` | `275573` (EUR 34.03) | EUR 22.27 |
| 1 | Aerodactyl | Rare Holo | EUR 35.61 | `273862` | `275573` (EUR 34.03) | EUR 1.58 |

### Team Rocket

2 best-guess cards in this set, 2 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 8 | Dark Gyarados | Rare Holo | EUR 148.12 | `274061` | `275574` (EUR 41.31) | EUR 106.81 |
| 25 | Dark Gyarados | Rare | EUR 23.55 | `274078` | `275574` (EUR 41.31) | EUR 17.76 |

### Gym Heroes

1 best-guess cards in this set, 1 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 9 | Misty's Seadra | Rare Holo | EUR 23 | `274145` | `275575` (EUR 19.43) | EUR 3.57 |

### Neo Genesis

6 best-guess cards in this set, 6 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 54 | Chikorita | Common | EUR 1.13 | `274454` | `547251` (EUR 3.75) | EUR 2.62 |
| 53 | Chikorita | Common | EUR 1.35 | `274453` | `547251` (EUR 3.75) | EUR 2.40 |
| 81 | Totodile | Common | EUR 1.02 | `274481` | `547261` (EUR 3.08) | EUR 2.06 |
| 57 | Cyndaquil | Common | EUR 0.94 | `274457` | `547256` (EUR 2.69) | EUR 1.75 |
| 56 | Cyndaquil | Common | EUR 1.1 | `274456` | `547256` (EUR 2.69) | EUR 1.59 |
| 80 | Totodile | Common | EUR 1.64 | `274480` | `547261` (EUR 3.08) | EUR 1.44 |

### Legendary Collection

4 best-guess cards in this set, 4 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 3 | Charizard | Rare Holo | EUR None | `274768` | `362871` (EUR 569.5), `855023` (EUR 82.5) | EUR 569.50 |
| 4 | Dark Blastoise | Rare Holo | EUR 47.42 | `274769` | `362872` (EUR 263.33), `901315` (EUR 45) | EUR 215.91 |
| 7 | Dark Raichu | Rare Holo | EUR 75 | `274772` | `362873` (EUR 173.99), `901316` (EUR 34.99) | EUR 98.99 |
| 29 | Mewtwo | Rare | EUR 52 | `274794` | `362874` (EUR None) | EUR 52.00 |

### Aquapolis

12 best-guess cards in this set, 9 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| H9 | Espeon | Rare Holo | EUR 625 | `275064` | `362902` (EUR 65) | EUR 560.00 |
| H25 | Suicune | Rare Holo | EUR 296.25 | `275057` | `362904` (EUR 28) | EUR 268.25 |
| H8 | Entei | Rare Holo | EUR 146.25 | `275065` | `362901` (EUR 65) | EUR 81.25 |
| H21 | Scizor | Rare Holo | EUR 83.25 | `275045` | `362903` (EUR 22) | EUR 61.25 |
| 10 | Entei | Rare | EUR 12.1 | `275082` | `362901` (EUR 65) | EUR 52.90 |
| 11 | Espeon | Rare | EUR 29.81 | `275083` | `362902` (EUR 65) | EUR 35.19 |
| 37 | Suicune | Rare | EUR 10.86 | `275109` | `362904` (EUR 28) | EUR 17.14 |
| 32 | Scizor | Rare | EUR 13.92 | `275104` | `362903` (EUR 22) | EUR 8.08 |
| 50 | Golduck | Uncommon | EUR 4.95 | `275122` | `275123` (EUR 3.11) | EUR 1.84 |

### Skyridge

8 best-guess cards in this set, 8 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 149 | Ho-oh | Rare Secret | EUR 1288.33 | `275407` | `362907` (EUR 262.5) | EUR 1025.83 |
| 150 | Kabutops | Rare Secret | EUR 846.67 | `275408` | `362908` (EUR 75) | EUR 771.67 |
| 146 | Charizard | Rare Secret | EUR None | `275404` | `362905` (EUR 399.99) | EUR 399.99 |
| 147 | Crobat | Rare Secret | EUR 300 | `275405` | `362906` (EUR 67.5) | EUR 232.50 |
| H13 | Kabutops | Rare Holo | EUR 261.49 | `275240` | `362908` (EUR 75) | EUR 186.49 |
| 14 | Kabutops | Rare | EUR 14.54 | `275272` | `362908` (EUR 75) | EUR 60.46 |
| 6 | Crobat | Rare | EUR 13.96 | `275264` | `362906` (EUR 67.5) | EUR 53.54 |
| H5 | Crobat | Rare Holo | EUR 106.86 | `275245` | `362906` (EUR 67.5) | EUR 39.36 |

### Ruby & Sapphire

9 best-guess cards in this set, 7 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 94 | Metal Energy | Rare | EUR 0.53 | `275742` | `280580` (EUR 35), `362909` (EUR None), `901915` (EUR None) | EUR 34.47 |
| 93 | Darkness Energy | Rare | EUR 0.52 | `275741` | `280579` (EUR 25) | EUR 24.48 |
| 85 | Oran Berry | Uncommon | EUR 0.58 | `275733` | `280582` (EUR 19.96) | EUR 19.38 |
| 60 | Mudkip | Common | EUR 0.55 | `275708` | `547276` (EUR 3.22) | EUR 2.67 |
| 59 | Mudkip | Common | EUR 1.26 | `275707` | `547276` (EUR 3.22) | EUR 1.96 |
| 73 | Torchic | Common | EUR 0.47 | `275721` | `547271` (EUR 2.02) | EUR 1.55 |
| 75 | Treecko | Common | EUR 0.51 | `275723` | `547266` (EUR 1.56) | EUR 1.05 |

### Sandstorm

2 best-guess cards in this set, 2 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 93 | Multi Energy | Rare | EUR 0.9 | `275870` | `280581` (EUR 24), `362910` (EUR 18) | EUR 23.10 |
| 1 | Armaldo | Rare Holo | EUR 9.54 | `275778` | `881759` (EUR None) | EUR 9.54 |

### Dragon

8 best-guess cards in this set, 8 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 100 | Charizard | Rare Secret | EUR 388.75 | `275977` | `449323` (EUR 1232.98) | EUR 844.23 |
| 98 | Charmander | Rare Secret | EUR 71.25 | `275975` | `449328` (EUR 298.33) | EUR 227.08 |
| 99 | Charmeleon | Rare Secret | EUR 66.59 | `275976` | `449333` (EUR 189.97) | EUR 123.38 |
| 15 | Flygon | Rare | EUR 0.81 | `275892` | `280583` (EUR 78.65) | EUR 77.84 |
| 10 | Salamence | Rare Holo | EUR 22.99 | `275887` | `280584` (EUR 3.71) | EUR 19.28 |
| 4 | Flygon | Rare Holo | EUR 71.25 | `275881` | `280583` (EUR 78.65) | EUR 7.40 |
| 32 | Gyarados | Uncommon | EUR 4.7 | `275909` | `881760` (EUR None) | EUR 4.70 |
| 19 | Salamence | Rare | EUR 1.92 | `275896` | `280584` (EUR 3.71) | EUR 1.79 |

### Team Magma vs Team Aqua

1 best-guess cards in this set, 1 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 24 | Team Aqua's Cacnea | Uncommon | EUR 2.15 | `276001` | `881780` (EUR 60) | EUR 57.85 |

### Hidden Legends

7 best-guess cards in this set, 7 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 9 | Machamp | Rare Holo | EUR 15.05 | `276083` | `449903` (EUR 179.99) | EUR 164.94 |
| 54 | Beldum | Common | EUR 0.22 | `276128` | `280585` (EUR 100) | EUR 99.78 |
| 28 | Beldum | Uncommon | EUR 1.08 | `276102` | `280585` (EUR 100) | EUR 98.92 |
| 29 | Beldum | Uncommon | EUR 2.51 | `276103` | `280585` (EUR 100) | EUR 97.49 |
| 41 | Machoke | Uncommon | EUR 0.84 | `276115` | `449908` (EUR 27.99) | EUR 27.15 |
| 64 | Machop | Common | EUR 0.35 | `276138` | `449913` (EUR 22.49) | EUR 22.14 |
| 50 | Swalot | Uncommon | EUR 2.29 | `276124` | `881785` (EUR 13) | EUR 10.71 |

### FireRed & LeafGreen

1 best-guess cards in this set, 1 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 50 | Wartortle | Uncommon | EUR 2.83 | `276226` | `881786` (EUR 79) | EUR 76.17 |

### Team Rocket Returns

2 best-guess cards in this set, 2 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 37 | Dark Houndoom | Uncommon | EUR 9.25 | `276329` | `881787` (EUR 135) | EUR 125.75 |
| 5 | Dark Houndoom | Rare Holo | EUR 51.56 | `276297` | `881787` (EUR 135) | EUR 83.44 |

### Deoxys

6 best-guess cards in this set, 6 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 17 | Deoxys | Rare | EUR 6.61 | `276420` | `449433` (EUR 185), `901210` (EUR 24.66) | EUR 178.39 |
| 18 | Deoxys | Rare | EUR 8.34 | `276421` | `449433` (EUR 185), `901210` (EUR 24.66) | EUR 176.66 |
| 16 | Deoxys | Rare | EUR 15.5 | `276419` | `449433` (EUR 185), `901210` (EUR 24.66) | EUR 169.50 |
| 22 | Rayquaza | Rare | EUR 22.73 | `276425` | `901214` (EUR 100) | EUR 77.27 |
| 91 | Space Center | Uncommon | EUR 1.49 | `276494` | `901173` (EUR 75) | EUR 73.51 |
| 38 | Manectric | Uncommon | EUR 0.7 | `276441` | `882854` (EUR 50) | EUR 49.30 |

### Emerald

5 best-guess cards in this set, 4 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 35 | Loudred | Uncommon | EUR 1.47 | `276546` | `449698` (EUR 15), `449703` (EUR 20) | EUR 18.53 |
| 30 | Grumpig | Uncommon | EUR 1.04 | `276541` | `882855` (EUR 16) | EUR 14.96 |
| 29 | Grumpig | Uncommon | EUR 1.65 | `276540` | `882855` (EUR 16) | EUR 14.35 |
| 73 | Whismur | Common | EUR 0.41 | `276584` | `450533` (EUR 8.5) | EUR 8.09 |

### Delta Species

1 best-guess cards in this set, 1 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 49 | Metang δ | Uncommon | EUR 1.88 | `276812` | `882857` (EUR 38.48) | EUR 36.60 |

### Holon Phantoms

1 best-guess cards in this set, 1 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 41 | Exeggutor δ | Uncommon | EUR 2.7 | `277011` | `882863` (EUR 40) | EUR 37.30 |

### Crystal Guardians

7 best-guess cards in this set, 7 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 28 | Venusaur | Rare | EUR 15.16 | `277109` | `450458` (EUR 500) | EUR 484.84 |
| 34 | Ivysaur | Uncommon | EUR 2.63 | `277115` | `882878` (EUR 39.99) | EUR 37.36 |
| 35 | Ivysaur | Uncommon | EUR 4.74 | `277116` | `882878` (EUR 39.99) | EUR 35.25 |
| 63 | Squirtle | Common | EUR 0.88 | `277144` | `450418` (EUR 21.47) | EUR 20.59 |
| 64 | Squirtle | Common | EUR 5.53 | `277145` | `450418` (EUR 21.47) | EUR 15.94 |
| 43 | Wartortle | Uncommon | EUR 1.44 | `277124` | `450513` (EUR 14.99) | EUR 13.55 |
| 42 | Wartortle | Uncommon | EUR 3.32 | `277123` | `450513` (EUR 14.99) | EUR 11.67 |

### Dragon Frontiers

1 best-guess cards in this set, 1 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 28 | Dragonair δ | Uncommon | EUR 4.13 | `277233` | `882888` (EUR None) | EUR 4.13 |

### Secret Wonders

4 best-guess cards in this set, 4 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 53 | Kirlia | Uncommon | EUR 0.48 | `277806` | `882904` (EUR 55) | EUR 54.52 |
| 40 | Weavile | Rare | EUR 0.69 | `277793` | `882216` (EUR 6.67) | EUR 5.98 |
| 125 | Roseanne's Research | Uncommon | EUR 0.36 | `277878` | `371549` (EUR 4.56) | EUR 4.20 |
| 78 | Burmy Plant Cloak | Common | EUR 0.2 | `277831` | `882217` (EUR 1.61) | EUR 1.41 |

### Great Encounters

5 best-guess cards in this set, 4 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 49 | Porygon2 | Uncommon | EUR 0.34 | `277951` | `882905` (EUR 24.98) | EUR 24.64 |
| 61 | Buizel | Common | EUR 0.11 | `277963` | `882219` (EUR 7.04) | EUR 6.93 |
| 37 | Floatzel | Uncommon | EUR 0.19 | `277939` | `882218` (EUR 3.8) | EUR 3.61 |
| 15 | Claydol | Rare | EUR 1.56 | `277917` | `371558` (EUR 2.99) | EUR 1.43 |

### Majestic Dawn

13 best-guess cards in this set, 12 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 92 | Call Energy | Uncommon | EUR 2.8 | `278141` | `449313` (EUR 19.99) | EUR 17.19 |
| 20 | Glaceon | Rare | EUR 2.52 | `278069` | `882220` (EUR 17) | EUR 14.48 |
| 71 | Piplup | Common | EUR 0.39 | `278120` | `882224` (EUR 13.42) | EUR 13.03 |
| 68 | Munchlax | Common | EUR 1.44 | `278117` | `882223` (EUR 14.16) | EUR 12.72 |
| 72 | Piplup | Common | EUR 0.93 | `278121` | `882224` (EUR 13.42) | EUR 12.49 |
| 77 | Turtwig | Common | EUR 0.13 | `278126` | `882225` (EUR 11.52) | EUR 11.39 |
| 78 | Turtwig | Common | EUR 0.51 | `278127` | `882225` (EUR 11.52) | EUR 11.01 |
| 42 | Mothim | Uncommon | EUR 0.35 | `278091` | `882906` (EUR 10) | EUR 9.65 |
| 56 | Chimchar | Common | EUR 0.41 | `278105` | `882221` (EUR 5.36) | EUR 4.95 |
| 57 | Chimchar | Common | EUR 0.61 | `278106` | `882221` (EUR 5.36) | EUR 4.75 |
| 59 | Combee | Common | EUR 0.28 | `278108` | `882222` (EUR 2.99) | EUR 2.71 |
| 5 | Glaceon | Rare Holo | EUR 19.45 | `278054` | `882220` (EUR 17) | EUR 2.45 |

### Legends Awakened

8 best-guess cards in this set, 8 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 52 | Dragonair | Uncommon | EUR 3.11 | `278201` | `449443` (EUR 250) | EUR 246.89 |
| 2 | Dragonite | Rare Holo | EUR 32.78 | `278151` | `449448` (EUR 124) | EUR 91.22 |
| 91 | Dratini | Common | EUR 1.07 | `278240` | `449453` (EUR 47.2) | EUR 46.13 |
| 130 | Buck's Training | Uncommon | EUR 0.19 | `278279` | `882907` (EUR 25.98) | EUR 25.79 |
| 30 | Heatran | Rare | EUR 0.88 | `278179` | `449628` (EUR 9) | EUR 8.12 |
| 6 | Heatran | Rare Holo | EUR 2.76 | `278155` | `449628` (EUR 9) | EUR 6.24 |
| 43 | Uxie | Rare | EUR 5.62 | `278192` | `371544` (EUR 9.47) | EUR 3.85 |
| 19 | Azelf | Rare | EUR 3.33 | `278168` | `371564` (EUR 5.23) | EUR 1.90 |

### Stormfront

1 best-guess cards in this set, 1 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 46 | Piloswine | Uncommon | EUR 0.29 | `278344` | `882908` (EUR 49.99) | EUR 49.70 |

### Arceus

3 best-guess cards in this set, 2 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 27 | Raichu | Rare | EUR 3.39 | `278899` | `882911` (EUR 80.5) | EUR 77.11 |
| 32 | Spiritomb | Rare | EUR 3.02 | `278904` | `371560` (EUR 4.87) | EUR 1.85 |

### HeartGold & SoulSilver

25 best-guess cards in this set, 22 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 28 | Pichu | Rare | EUR 9.94 | `279000` | `882912` (EUR 262.5) | EUR 252.56 |
| 97 | Pokémon Collector | Uncommon | EUR 2.58 | `279069` | `450098` (EUR 49.83) | EUR 47.25 |
| 78 | Pikachu | Common | EUR 5.41 | `279050` | `573477` (EUR 36.21), `902385` (EUR 25) | EUR 30.80 |
| 72 | Magikarp | Common | EUR 4.17 | `279044` | `902380` (EUR 27.99) | EUR 23.82 |
| 61 | Cyndaquil | Common | EUR 0.78 | `279033` | `902376` (EUR 20) | EUR 19.22 |
| 104 | Rainbow Energy | Uncommon | EUR 0.75 | `279076` | `450228` (EUR 17) | EUR 16.25 |
| 39 | Delibird | Uncommon | EUR 2.09 | `279011` | `371563` (EUR 9.77), `902372` (EUR 17.5) | EUR 15.41 |
| 74 | Marill | Common | EUR 1.14 | `279046` | `902382` (EUR 14.99) | EUR 13.85 |
| 47 | Miltank | Uncommon | EUR 1.26 | `279019` | `902373` (EUR 14.98) | EUR 13.72 |
| 107 | Donphan | Rare Prime | EUR 14 | `279079` | `371559` (EUR 2) | EUR 12.00 |
| 75 | Meowth | Common | EUR 0.67 | `279047` | `902383` (EUR 12.33) | EUR 11.66 |
| 59 | Chikorita | Common | EUR 0.97 | `279031` | `902374` (EUR 9.95) | EUR 8.98 |
| 76 | Paras | Common | EUR 1.09 | `279048` | `902384` (EUR 9.99) | EUR 8.90 |
| 73 | Mareep | Common | EUR 0.57 | `279045` | `902381` (EUR 7) | EUR 6.43 |
| 103 | Double Colorless Energy | Uncommon | EUR 1.48 | `279075` | `371574` (EUR 4.47) | EUR 2.99 |
| 66 | Hoothoot | Common | EUR 0.66 | `279038` | `902378` (EUR 3) | EUR 2.34 |
| 90 | Copycat | Uncommon | EUR 0.46 | `279062` | `371572` (EUR 2.62) | EUR 2.16 |
| 37 | Corsola | Uncommon | EUR 1.06 | `279009` | `902371` (EUR 3) | EUR 1.94 |
| 40 | Donphan | Uncommon | EUR 0.58 | `279012` | `371559` (EUR 2) | EUR 1.42 |
| 60 | Clefairy | Common | EUR 1.39 | `279032` | `902375` (EUR None) | EUR 1.39 |
| 65 | Growlithe | Common | EUR 1.26 | `279037` | `902377` (EUR None) | EUR 1.26 |
| 84 | Staryu | Common | EUR 1.19 | `279056` | `902386` (EUR None) | EUR 1.19 |

### HS—Unleashed

21 best-guess cards in this set, 16 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 21 | Poliwrath | Rare | EUR 1.52 | `279177` | `450138` (EUR 320) | EUR 318.48 |
| 37 | Poliwhirl | Uncommon | EUR 1 | `279193` | `450133` (EUR 104.47) | EUR 103.47 |
| 13 | Blastoise | Rare | EUR 4.56 | `279169` | `882913` (EUR 97.5) | EUR 92.94 |
| 84 | Crobat | Rare Prime | EUR 62.02 | `279240` | `371561` (EUR 4.62) | EUR 57.40 |
| 78 | Judge | Uncommon | EUR 0.78 | `279234` | `449093` (EUR 35) | EUR 34.22 |
| 7 | Politoed | Rare Holo | EUR 4.16 | `279163` | `450113` (EUR 21) | EUR 16.84 |
| 87 | Steelix | Rare Prime | EUR 14.16 | `279243` | `371565` (EUR 3) | EUR 11.16 |
| 83 | Super Scoop Up | Uncommon | EUR 0.4 | `279239` | `450423` (EUR 5.5) | EUR 5.10 |
| 14 | Crobat | Rare | EUR 1.34 | `279170` | `371561` (EUR 4.62) | EUR 3.28 |
| 82 | Rare Candy | Uncommon | EUR 1.26 | `279238` | `450263` (EUR 4) | EUR 2.74 |
| 24 | Steelix | Rare | EUR 1.62 | `279180` | `371565` (EUR 3) | EUR 1.38 |
| 48 | Chinchou | Common | EUR 1.19 | `279204` | `902389` (EUR None) | EUR 1.19 |
| 56 | Onix | Common | EUR 1.17 | `279212` | `902393` (EUR None) | EUR 1.17 |
| 51 | Larvitar | Common | EUR 1.16 | `279207` | `902391` (EUR None) | EUR 1.16 |
| 55 | Natu | Common | EUR 1.08 | `279211` | `902392` (EUR None) | EUR 1.08 |
| 43 | Aipom | Common | EUR 1 | `279199` | `902388` (EUR None) | EUR 1.00 |

### HS—Undaunted

5 best-guess cards in this set, 3 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 82 | Houndoom | Rare Prime | EUR 50.14 | `279335` | `371567` (EUR 6.7) | EUR 43.44 |
| 17 | Leafeon | Rare | EUR 3.2 | `279270` | `882914` (EUR None) | EUR 3.20 |
| 5 | Houndoom | Rare Holo | EUR 5.19 | `279258` | `371567` (EUR 6.7) | EUR 1.51 |

### HS—Triumphant

8 best-guess cards in this set, 7 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 88 | Seeker | Uncommon | EUR 2.17 | `279618` | `450348` (EUR 87.5) | EUR 85.33 |
| 20 | Electivire | Rare | EUR 2.54 | `279550` | `882915` (EUR 32.5) | EUR 29.96 |
| 100 | Darkrai & Cresselia LEGEND | LEGEND | EUR 71.05 | `279630` | `363455` (EUR 52.43) | EUR 18.62 |
| 85 | Black Belt | Uncommon | EUR 0.15 | `279615` | `449293` (EUR 15) | EUR 14.85 |
| 101 | Palkia & Dialga LEGEND | LEGEND | EUR 51.83 | `279631` | `363456` (EUR 39.02) | EUR 12.81 |
| 87 | Junk Arm | Uncommon | EUR 0.64 | `279617` | `449648` (EUR 9.95) | EUR 9.31 |
| 99 | Darkrai & Cresselia LEGEND | LEGEND | EUR 57.58 | `279629` | `363455` (EUR 52.43) | EUR 5.15 |

### Call of Legends

11 best-guess cards in this set, 8 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 33 | Snorlax | Rare | EUR 19 | `279676` | `882916` (EUR 1169.5) | EUR 1150.50 |
| 92 | Psychic Energy | Common | EUR None | `279735` | `450173` (EUR 499.99) | EUR 499.99 |
| 86 | Darkness Energy | Uncommon | EUR 0.82 | `279729` | `449378` (EUR 249.5) | EUR 248.68 |
| 94 | Darkness Energy | Common | EUR 44.99 | `279737` | `449378` (EUR 249.5) | EUR 204.51 |
| 90 | Water Energy | Common | EUR None | `279733` | `450523` (EUR 79.95) | EUR 79.95 |
| 91 | Lightning Energy | Common | EUR 25 | `279734` | `449683` (EUR 89.95) | EUR 64.95 |
| 89 | Fire Energy | Common | EUR None | `279732` | `449538` (EUR 60) | EUR 60.00 |
| 95 | Metal Energy | Common | EUR 27.97 | `279738` | `450028` (EUR None) | EUR 27.97 |

### Black & White

22 best-guess cards in this set, 17 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 109 | Psychic Energy | Common | EUR 3.1 | `279847` | `371578` (EUR 24.99), `450178` (EUR 4.33) | EUR 21.89 |
| 111 | Darkness Energy | Common | EUR 1.24 | `279849` | `371583` (EUR 15), `449383` (EUR 5.65) | EUR 13.76 |
| 25 | Darmanitan | Rare | EUR 0.6 | `279763` | `576682` (EUR 9.95) | EUR 9.35 |
| 108 | Lightning Energy | Common | EUR 1.13 | `279846` | `371579` (EUR 9.5), `449688` (EUR 3.71) | EUR 8.37 |
| 112 | Metal Energy | Common | EUR 0.76 | `279850` | `371581` (EUR 8.89), `450033` (EUR 3.87) | EUR 8.13 |
| 105 | Grass Energy | Common | EUR 2.65 | `279843` | `371576` (EUR 9.49), `449593` (EUR 3.76) | EUR 6.84 |
| 106 | Fire Energy | Common | EUR 1.75 | `279844` | `371577` (EUR 7.99), `449543` (EUR 2.88) | EUR 6.24 |
| 107 | Water Energy | Common | EUR 1.29 | `279845` | `371582` (EUR 7.49), `450528` (EUR 3.19) | EUR 6.20 |
| 110 | Fighting Energy | Common | EUR 0.56 | `279848` | `371580` (EUR 3.98), `449528` (EUR 2.17) | EUR 3.42 |
| 1 | Snivy | Common | EUR 0.15 | `279739` | `371569` (EUR 2.36) | EUR 2.21 |
| 2 | Snivy | Common | EUR 0.16 | `279740` | `371569` (EUR 2.36) | EUR 2.20 |
| 28 | Oshawott | Common | EUR 0.18 | `279766` | `371573` (EUR 2.17) | EUR 1.99 |
| 27 | Oshawott | Common | EUR 0.23 | `279765` | `371573` (EUR 2.17) | EUR 1.94 |
| 15 | Tepig | Common | EUR 0.17 | `279753` | `371571` (EUR 1.65) | EUR 1.48 |
| 16 | Tepig | Common | EUR 0.21 | `279754` | `371571` (EUR 1.65) | EUR 1.44 |
| 81 | Lillipup | Common | EUR 0.17 | `279819` | `371575` (EUR 1.19) | EUR 1.02 |
| 80 | Lillipup | Common | EUR 0.19 | `279818` | `371575` (EUR 1.19) | EUR 1.00 |

### Emerging Powers

3 best-guess cards in this set, 2 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 95 | Pokémon Catcher | Uncommon | EUR 0.38 | `280060` | `450093` (EUR 70) | EUR 69.62 |
| 40 | Scolipede | Rare | EUR 0.67 | `280005` | `750082` (EUR 2.29) | EUR 1.62 |

### Noble Victories

12 best-guess cards in this set, 10 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 98 | Victini | Rare Ultra | EUR 129 | `280221` | `363652` (EUR 7) | EUR 122.00 |
| 43 | Victini | Rare | EUR 15.31 | `280166` | `363652` (EUR 7) | EUR 8.31 |
| 80 | Escavalier | Rare | EUR 1.39 | `280203` | `449488` (EUR 7.99) | EUR 6.60 |
| 15 | Victini | Rare Holo | EUR 2.2 | `280138` | `363652` (EUR 7) | EUR 4.80 |
| 14 | Victini | Rare Holo | EUR 2.98 | `280137` | `363652` (EUR 7) | EUR 4.02 |
| 12 | Accelgor | Rare | EUR 0.67 | `280135` | `449238` (EUR 4.42) | EUR 3.75 |
| 11 | Shelmet | Common | EUR 0.13 | `280134` | `450378` (EUR 3.33) | EUR 3.20 |
| 8 | Karrablast | Common | EUR 0.11 | `280131` | `449653` (EUR 2.5) | EUR 2.39 |
| 91 | Eviolite | Uncommon | EUR 0.25 | `280214` | `449498` (EUR 1.38) | EUR 1.13 |
| 32 | Cryogonal | Uncommon | EUR 0.24 | `280155` | `371588` (EUR 1.26) | EUR 1.02 |

### Next Destinies

2 best-guess cards in this set, 2 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 98 | Mewtwo-EX | Rare Ultra | EUR 30 | `280323` | `363653` (EUR None) | EUR 30.00 |
| 54 | Mewtwo-EX | Rare Holo EX | EUR 10.49 | `280279` | `363653` (EUR None) | EUR 10.49 |

### Dark Explorers

12 best-guess cards in this set, 12 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 61 | Umbreon | Uncommon | EUR 8.05 | `280389` | `450448` (EUR 237.5) | EUR 229.45 |
| 60 | Umbreon | Uncommon | EUR 15.08 | `280388` | `450448` (EUR 237.5) | EUR 222.42 |
| 4 | Scyther | Uncommon | EUR 3.02 | `280332` | `450328` (EUR 150), `450333` (EUR 47.5), `450338` (EUR 35), `450343` (EUR 45) | EUR 146.98 |
| 12 | Flareon | Uncommon | EUR 4.28 | `280340` | `449548` (EUR 81.67) | EUR 77.39 |
| 48 | Espeon | Rare | EUR 5.78 | `280376` | `449493` (EUR 59.47) | EUR 53.69 |
| 37 | Jolteon | Uncommon | EUR 6.49 | `280365` | `449643` (EUR 60) | EUR 53.51 |
| 98 | Professor Juniper | Uncommon | EUR 0.42 | `280426` | `450653` (EUR 50) | EUR 49.58 |
| 25 | Vaporeon | Uncommon | EUR 5.63 | `280353` | `449318` (EUR 40) | EUR 34.37 |
| 84 | Eevee | Common | EUR 1.64 | `280412` | `449458` (EUR 25) | EUR 23.36 |
| 83 | Eevee | Common | EUR 3.45 | `280411` | `449458` (EUR 25) | EUR 21.55 |
| 94 | Enhanced Hammer | Uncommon | EUR 0.31 | `280422` | `371594` (EUR 3.43) | EUR 3.12 |
| 1 | Bulbasaur | Common | EUR 2.09 | `280329` | `886900` (EUR None) | EUR 2.09 |

### Boundaries Crossed

5 best-guess cards in this set, 3 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 142 | Keldeo-EX | Rare Ultra | EUR 54.99 | `280729` | `363654` (EUR 4) | EUR 50.99 |
| 38 | Delibird | Uncommon | EUR 0.19 | `280625` | `449413` (EUR 40), `449418` (EUR 49.99), `449423` (EUR 40), `449428` (EUR 25) | EUR 49.80 |
| 149 | Skyla | Rare Ultra | EUR 18.5 | `280736` | `371591` (EUR 1.19) | EUR 17.31 |

### Plasma Storm

4 best-guess cards in this set, 4 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 135 | Colress | Rare Ultra | EUR 11 | `280875` | `449338` (EUR 6) | EUR 5.00 |
| 118 | Colress | Uncommon | EUR 1.87 | `280858` | `449338` (EUR 6) | EUR 4.13 |
| 120 | Escape Rope | Uncommon | EUR 0.2 | `280860` | `371595` (EUR 2.75) | EUR 2.55 |
| 123 | Hypnotoxic Laser | Uncommon | EUR 2.21 | `280863` | `449638` (EUR None) | EUR 2.21 |

### Plasma Freeze

8 best-guess cards in this set, 8 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 11 | Leafeon | Rare | EUR 12.62 | `280889` | `449153` (EUR 1800) | EUR 1787.38 |
| 111 | Deoxys-EX | Rare Ultra | EUR 57.5 | `280989` | `363656` (EUR 4) | EUR 53.50 |
| 115 | Ghetsis | Rare Ultra | EUR 46 | `280993` | `567076` (EUR 2.29) | EUR 43.71 |
| 23 | Glaceon | Rare | EUR 5.23 | `280901` | `449148` (EUR 46.99) | EUR 41.76 |
| 53 | Deoxys-EX | Rare Holo EX | EUR 15.62 | `280931` | `363656` (EUR 4) | EUR 11.62 |
| 106 | Plasma Energy | Uncommon | EUR 0.25 | `280984` | `450083` (EUR 1.7) | EUR 1.45 |
| 100 | Frozen City | Uncommon | EUR 0.63 | `280978` | `449553` (EUR 1.99) | EUR 1.36 |
| 101 | Ghetsis | Rare Holo | EUR 3.52 | `280979` | `567076` (EUR 2.29) | EUR 1.23 |

### Plasma Blast

2 best-guess cards in this set, 2 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 5 | Tropius | Uncommon | EUR 0.47 | `281026` | `449213` (EUR 5) | EUR 4.53 |
| 14 | Squirtle | Common | EUR 1.19 | `281035` | `886897` (EUR None) | EUR 1.19 |

### Legendary Treasures

3 best-guess cards in this set, 3 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 97 | Deino | Common | EUR 0.25 | `281248` | `449393` (EUR 30), `449398` (EUR 9.99), `449403` (EUR 9.99), `449408` (EUR None) | EUR 29.75 |
| 17 | Charmander | Common | EUR 2.69 | `281168` | `886890` (EUR None) | EUR 2.69 |
| 109 | Bianca | Uncommon | EUR 0.18 | `281260` | `371593` (EUR 1.5) | EUR 1.32 |

### Kalos Starter Set

3 best-guess cards in this set, 3 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 34 | Crushing Hammer | — | EUR 0.52 | `281300` | `371596` (EUR 12.2) | EUR 11.68 |
| 36 | Pokémon Catcher | — | EUR 0.26 | `281302` | `371597` (EUR 5.49) | EUR 5.23 |
| 39 | Tierno | — | EUR 0.13 | `281305` | `371598` (EUR 2.05) | EUR 1.92 |

### XY

10 best-guess cards in this set, 10 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 17 | Vivillon | Rare Holo | EUR 5.55 | `281354` | `700737` (EUR 7.63), `700739` (EUR 69.5), `700740` (EUR 42), `700742` (EUR 135), `700744` (EUR 80000) | EUR 79994.45 |
| 85 | Aegislash | Rare | EUR 0.63 | `281422` | `449258` (EUR 20.81) | EUR 20.18 |
| 64 | Solrock | Uncommon | EUR 0.27 | `281401` | `450393` (EUR 14.98), `450398` (EUR 7.95), `450403` (EUR 3.49), `450408` (EUR 3.98) | EUR 14.71 |
| 84 | Doublade | Uncommon | EUR 0.21 | `281421` | `449438` (EUR 11.5) | EUR 11.29 |
| 86 | Aegislash | Rare Holo | EUR 10.55 | `281423` | `449258` (EUR 20.81) | EUR 10.26 |
| 56 | Pumpkaboo | Common | EUR 0.14 | `281393` | `450183` (EUR 8.25), `450188` (EUR 5.5), `450193` (EUR 7), `450198` (EUR 6.55) | EUR 8.11 |
| 83 | Honedge | Common | EUR 0.08 | `281420` | `449633` (EUR 7.54) | EUR 7.46 |
| 121 | Muscle Band | Uncommon | EUR 3.36 | `281458` | `371600` (EUR 10.57) | EUR 7.21 |
| 41 | Greninja | Rare Holo | EUR 6.09 | `281378` | `295274` (EUR 10) | EUR 3.91 |
| 123 | Professor's Letter | Uncommon | EUR 0.25 | `281460` | `371599` (EUR 2.82) | EUR 2.57 |

### Primal Clash

12 best-guess cards in this set, 9 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 151 | Primal Groudon-EX | Rare Ultra | EUR 349.17 | `273682` | `363664` (EUR 9) | EUR 340.17 |
| 149 | Primal Kyogre-EX | Rare Ultra | EUR 282.5 | `273680` | `363665` (EUR 35) | EUR 247.50 |
| 20 | Vulpix | Common | EUR 0.26 | `273551` | `886899` (EUR 69.99) | EUR 69.73 |
| 160 | Teammates | Rare Ultra | EUR 36.85 | `273691` | `312239` (EUR 3.99) | EUR 32.86 |
| 86 | Primal Groudon-EX | Rare Holo EX | EUR 41.64 | `273617` | `363664` (EUR 9) | EUR 32.64 |
| 161 | Dive Ball | Rare Secret | EUR 16.67 | `273692` | `295286` (EUR 1.85) | EUR 14.82 |
| 55 | Primal Kyogre-EX | Rare Holo EX | EUR 39.1 | `273586` | `363665` (EUR 35) | EUR 4.10 |
| 125 | Dive Ball | Uncommon | EUR 4.35 | `273656` | `295286` (EUR 1.85) | EUR 2.50 |
| 144 | Wonder Energy | Uncommon | EUR 0.68 | `273675` | `312211` (EUR 2.5) | EUR 1.82 |

### BREAKthrough

28 best-guess cards in this set, 21 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 164 | Mewtwo-EX | Rare Secret | EUR 134 | `286410` | `363929` (EUR None) | EUR 134.00 |
| 163 | Mewtwo-EX | Rare Secret | EUR 113.45 | `286409` | `363929` (EUR None) | EUR 113.45 |
| 160 | M Mewtwo-EX | Rare Ultra | EUR 115.98 | `286406` | `363682` (EUR 11.95), `363683` (EUR 13.99) | EUR 104.03 |
| 159 | M Mewtwo-EX | Rare Ultra | EUR 81.47 | `286405` | `363682` (EUR 11.95), `363683` (EUR 13.99) | EUR 69.52 |
| 157 | Mewtwo-EX | Rare Ultra | EUR 67.43 | `286403` | `363929` (EUR None) | EUR 67.43 |
| 78 | Marowak | Rare | EUR 0.48 | `286324` | `449998` (EUR 60), `450003` (EUR 7.5), `450008` (EUR 7.5), `450013` (EUR 9.99) | EUR 59.52 |
| 158 | Mewtwo-EX | Rare Ultra | EUR 57.67 | `286404` | `363929` (EUR None) | EUR 57.67 |
| 63 | M Mewtwo-EX | Rare Holo EX | EUR 65.3 | `286309` | `363682` (EUR 11.95), `363683` (EUR 13.99) | EUR 53.35 |
| 161 | Brigette | Rare Ultra | EUR 31.21 | `286407` | `312217` (EUR 2.94), `312238` (EUR 3.99), `312265` (EUR None), `312289` (EUR 2.29), `368699` (EUR 0.75), `368734` (EUR 0.5) | EUR 31.21 |
| 162 | Giovanni's Scheme | Rare Ultra | EUR 27.12 | `286408` | `449573` (EUR None) | EUR 27.12 |
| 64 | M Mewtwo-EX | Rare Holo EX | EUR 29.57 | `286310` | `363682` (EUR 11.95), `363683` (EUR 13.99) | EUR 17.62 |
| 145 | Parallel City | Uncommon | EUR 3.1 | `286391` | `295244` (EUR 1.99), `295267` (EUR 0.5), `368690` (EUR 0.5), `368747` (EUR None), `450078` (EUR 19.35) | EUR 16.25 |
| 61 | Mewtwo-EX | Rare Holo EX | EUR 11.32 | `286307` | `363929` (EUR None) | EUR 11.32 |
| 62 | Mewtwo-EX | Rare Holo EX | EUR 9.81 | `286308` | `363929` (EUR None) | EUR 9.81 |
| 137 | Float Stone | Uncommon | EUR 7.32 | `286383` | `295241` (EUR 4.99), `295266` (EUR None), `312245` (EUR 5.99), `312272` (EUR 5.98), `312296` (EUR 0.5), `368665` (EUR 4.95), `368693` (EUR 1.3), `368752` (EUR 3), `368758` (EUR None) | EUR 7.32 |
| 60 | Gengar | Rare Holo | EUR 13.97 | `286306` | `895113` (EUR 8.5) | EUR 5.47 |
| 134 | Brigette | Uncommon | EUR 1.7 | `286380` | `312217` (EUR 2.94), `312238` (EUR 3.99), `312265` (EUR None), `312289` (EUR 2.29), `368699` (EUR 0.75), `368734` (EUR 0.5) | EUR 2.29 |
| 84 | Gallade | Rare Holo | EUR 1.9 | `286330` | `312209` (EUR 3.99) | EUR 2.09 |
| 140 | Heavy Ball | Uncommon | EUR 1.45 | `286386` | `312249` (EUR 3.34) | EUR 1.89 |
| 149 | Super Rod | Uncommon | EUR 0.68 | `286395` | `295243` (EUR 0.5), `295270` (EUR None), `295289` (EUR None), `312220` (EUR 1.95), `368671` (EUR 1.95), `368771` (EUR 0.1) | EUR 1.27 |
| 101 | Flabébé | Common | EUR 0.16 | `286347` | `371607` (EUR 1.2) | EUR 1.04 |

### Generations

15 best-guess cards in this set, 11 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| RC29 | Pikachu | Rare Ultra | EUR 322.78 | `288538` | `722695` (EUR 83.6), `752372` (EUR 102) | EUR 239.18 |
| 22 | Magikarp | Common | EUR 0.44 | `288462` | `722694` (EUR 40), `873078` (EUR 109.99) | EUR 109.55 |
| 26 | Pikachu | Common | EUR 3.54 | `288464` | `722695` (EUR 83.6), `752372` (EUR 102) | EUR 98.46 |
| 53 | Meowth | Common | EUR 0.24 | `288491` | `722699` (EUR 30.01), `873079` (EUR 58.95) | EUR 58.71 |
| 14 | Ponyta | Common | EUR 0.19 | `288454` | `722693` (EUR 29.79), `873080` (EUR 42.5) | EUR 42.31 |
| 50 | Clefairy | Common | EUR 1.07 | `288488` | `722698` (EUR 34.99), `873076` (EUR 33.3) | EUR 33.92 |
| 32 | Slowpoke | Common | EUR 0.19 | `288470` | `722696` (EUR 29.57), `873081` (EUR 0.02) | EUR 29.38 |
| 43 | Geodude | Common | EUR 0.1 | `288481` | `722697` (EUR 14.31), `873077` (EUR None) | EUR 14.21 |
| RC11 | Wobbuffet | Common | EUR 2.3 | `288520` | `368708` (EUR 15.97) | EUR 13.67 |
| 8 | Tangela | Common | EUR 0.1 | `288450` | `722692` (EUR 10.18), `873082` (EUR 0.2) | EUR 10.08 |
| 68 | Pokémon Center Lady | Uncommon | EUR 0.17 | `288504` | `295261` (EUR 1.25), `312263` (EUR 1.99) | EUR 1.82 |

### Fates Collide

17 best-guess cards in this set, 11 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 105a | N | Rare Ultra | EUR 0.5 | `295213` | `295232` (EUR None), `295256` (EUR None), `295282` (EUR None), `300302` (EUR 260), `312214` (EUR 3.5), `312237` (EUR 2.66), `312261` (EUR 2), `312286` (EUR 1.5), `368683` (EUR None), `368696` (EUR 0.25), `368743` (EUR 3.17) | EUR 259.50 |
| 105 | N | Uncommon | EUR 3.36 | `289925` | `295232` (EUR None), `295256` (EUR None), `295282` (EUR None), `300302` (EUR 260), `312214` (EUR 3.5), `312237` (EUR 2.66), `312261` (EUR 2), `312286` (EUR 1.5), `368683` (EUR None), `368696` (EUR 0.25), `368743` (EUR 3.17) | EUR 256.64 |
| 47 | Lucario | Rare | EUR 0.46 | `289869` | `449708` (EUR 150), `449713` (EUR 72.95), `449718` (EUR 50), `449723` (EUR 13.3) | EUR 149.54 |
| 63 | Lucario | Rare Holo | EUR 1.95 | `289884` | `449708` (EUR 150), `449713` (EUR 72.95), `449718` (EUR 50), `449723` (EUR 13.3) | EUR 148.05 |
| 122 | Kingdra-EX | Rare Ultra | EUR 135.92 | `289942` | `363913` (EUR 5.25) | EUR 130.67 |
| 54a | Zygarde-EX | Rare Ultra | EUR 51 | `297893` | `363896` (EUR 4.83) | EUR 46.17 |
| 94 | Chaos Tower | Uncommon | EUR 0.33 | `289914` | `449133` (EUR 14.36) | EUR 14.03 |
| 114 | Double Colorless Energy | Uncommon | EUR 0.64 | `289934` | `295208` (EUR 5.5), `295254` (EUR 4.99) | EUR 4.86 |
| 84 | Audino-EX | Rare Holo EX | EUR 4.16 | `289905` | `295247` (EUR 7.69) | EUR 3.53 |
| 73 | Kingdra-EX | Rare Holo EX | EUR 3.01 | `289894` | `363913` (EUR 5.25) | EUR 2.24 |
| 54 | Zygarde-EX | Rare Holo EX | EUR 3.4 | `289875` | `363896` (EUR 4.83) | EUR 1.43 |

### Steam Siege

18 best-guess cards in this set, 12 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 115 | Volcanion-EX | Rare Secret | EUR 71.68 | `291562` | `363930` (EUR 14.9) | EUR 56.78 |
| 15 | Volcarona | Rare | EUR 1.14 | `291522` | `450468` (EUR 29.99), `450473` (EUR None), `450478` (EUR None), `450483` (EUR 8.99) | EUR 28.85 |
| 26 | Volcanion-EX | Rare Holo EX | EUR 2.78 | `290990` | `363930` (EUR 14.9) | EUR 12.12 |
| 110 | Magearna-EX | Rare Ultra | EUR 11.86 | `291557` | `295250` (EUR None) | EUR 11.86 |
| 114 | Professor Sycamore | Rare Ultra | EUR 9.3 | `291561` | `295209` (EUR None), `295231` (EUR None), `295255` (EUR None), `295284` (EUR 8.99) | EUR 9.30 |
| 113 | Pokémon Ranger | Rare Ultra | EUR 6.78 | `291560` | `295234` (EUR 0.25), `295283` (EUR None), `451708` (EUR 4) | EUR 6.78 |
| 65 | Yveltal | Rare Holo | EUR 0.59 | `291634` | `295222` (EUR 4.48), `450543` (EUR 2.07) | EUR 3.89 |
| 104 | Pokémon Ranger | Uncommon | EUR 0.17 | `291551` | `295234` (EUR 0.25), `295283` (EUR None), `451708` (EUR 4) | EUR 3.83 |
| 107 | Volcanion-EX | Rare Ultra | EUR 12.65 | `291554` | `363930` (EUR 14.9) | EUR 2.25 |
| 75 | Magearna-EX | Rare Holo EX | EUR 2.19 | `291545` | `295250` (EUR None) | EUR 2.19 |
| 103 | Ninja Boy | Uncommon | EUR 0.09 | `291481` | `449193` (EUR 2.12) | EUR 2.03 |
| 81 | Xerneas | Rare Holo | EUR 0.72 | `291643` | `450538` (EUR 2.35) | EUR 1.63 |

### Sun & Moon

39 best-guess cards in this set, 24 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 147 | Lillie | Rare Ultra | EUR 59.52 | `295460` | `407154` (EUR None) | EUR 59.52 |
| 28 | Psyduck | Common | EUR 0.79 | `295338` | `886904` (EUR 45) | EUR 44.21 |
| 90 | Snubbull | Common | EUR 0.1 | `295401` | `886905` (EUR 40) | EUR 39.90 |
| 64 | Cosmog | Common | EUR 0.06 | `295375` | `888622` (EUR 27.99) | EUR 27.93 |
| 161 | Ultra Ball | Rare Secret | EUR 20.78 | `295474` | `312223` (EUR 0.1), `312242` (EUR 0.55), `312269` (EUR 2), `312291` (EUR None), `448193` (EUR 0.15) | EUR 20.78 |
| 162 | Psychic Energy | Rare Secret | EUR 15.32 | `295475` | `407019` (EUR None), `407134` (EUR None) | EUR 15.32 |
| 20 | Tsareena | Rare Holo | EUR 0.67 | `295328` | `450428` (EUR 15), `450433` (EUR 4.25), `450438` (EUR 3), `450443` (EUR None) | EUR 14.33 |
| 123 | Nest Ball | Uncommon | EUR 0.09 | `295436` | `449188` (EUR 13.44) | EUR 13.35 |
| 89 | Solgaleo-GX | Rare Holo GX | EUR 3.6 | `295400` | `363909` (EUR 14.99) | EUR 11.39 |
| 143 | Solgaleo-GX | Rare Ultra | EUR 7.24 | `295456` | `363909` (EUR 14.99) | EUR 7.75 |
| 153 | Lunala-GX | Rare Rainbow | EUR 11.6 | `295466` | `363908` (EUR 4.78) | EUR 6.82 |
| 148 | Professor Kukui | Rare Ultra | EUR 5.68 | `295461` | `312266` (EUR 0.49), `449198` (EUR None) | EUR 5.68 |
| 24 | Litten | Common | EUR 0.1 | `294121` | `295332` (EUR 4.69), `549371` (EUR 4.63) | EUR 4.59 |
| 113 | Oranguru | Rare Holo | EUR 0.52 | `295425` | `295426` (EUR 4.99), `368765` (EUR None) | EUR 4.47 |
| 158 | Nest Ball | Rare Secret | EUR 9.86 | `295471` | `449188` (EUR 13.44) | EUR 3.58 |
| 137 | Rainbow Energy | Uncommon | EUR 0.21 | `295450` | `312233` (EUR 2.64) | EUR 2.43 |
| 136 | Double Colorless Energy | Uncommon | EUR 0.64 | `295449` | `312212` (EUR 2.99), `312234` (EUR 2), `312259` (EUR 1.89), `312284` (EUR 2) | EUR 2.35 |
| 9 | Rowlet | Common | EUR 0.09 | `294120` | `295315` (EUR 2.15), `312278` (EUR None) | EUR 2.06 |
| 129 | Rare Candy | Uncommon | EUR 0.1 | `295442` | `312222` (EUR 1.99) | EUR 1.89 |
| 135 | Ultra Ball | Uncommon | EUR 0.15 | `295448` | `312223` (EUR 0.1), `312242` (EUR 0.55), `312269` (EUR 2), `312291` (EUR None), `448193` (EUR 0.15) | EUR 1.85 |
| 12 | Decidueye-GX | Rare Holo GX | EUR 2.6 | `295319` | `312276` (EUR 4.32) | EUR 1.72 |
| 39 | Popplio | Common | EUR 0.12 | `294122` | `295349` (EUR 1.5) | EUR 1.38 |
| 141 | Lunala-GX | Rare Ultra | EUR 6.16 | `295454` | `363908` (EUR 4.78) | EUR 1.38 |
| 99 | Kangaskhan | Rare Holo | EUR 0.78 | `295410` | `295411` (EUR 1.89) | EUR 1.11 |

### Guardians Rising

40 best-guess cards in this set, 36 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 150 | Alolan Ninetales-GX | Rare Rainbow | EUR 54.88 | `297598` | `312251` (EUR 7) | EUR 47.88 |
| 121 | Choice Band | Uncommon | EUR 0.14 | `297573` | `312244` (EUR 0.99), `312271` (EUR 0.3), `312294` (EUR 0.59), `368675` (EUR 0.25), `368697` (EUR None), `368733` (EUR 0.5), `368761` (EUR 0.25), `449138` (EUR 40.2) | EUR 40.06 |
| 121a | Choice Band | Uncommon | EUR 0.5 | `312225` | `312244` (EUR 0.99), `312271` (EUR 0.3), `312294` (EUR 0.59), `368675` (EUR 0.25), `368697` (EUR None), `368733` (EUR 0.5), `368761` (EUR 0.25), `449138` (EUR 40.2) | EUR 39.70 |
| 137 | Tapu Lele-GX | Rare Ultra | EUR 24.5 | `297603` | `312232` (EUR 4.99), `312254` (EUR 8), `312279` (EUR 6), `366835` (EUR 6.13), `366840` (EUR 1.97), `368703` (EUR 2.75), `368735` (EUR 5), `368754` (EUR 5.29) | EUR 22.53 |
| 21a | Alolan Vulpix | Common | EUR None | `312206` | `312250` (EUR None), `319255` (EUR 18.89), `468924` (EUR 6.44), `886902` (EUR None) | EUR 18.89 |
| 21 | Alolan Vulpix | Common | EUR 0.18 | `297485` | `312250` (EUR None), `319255` (EUR 18.89), `468924` (EUR 6.44), `886902` (EUR None) | EUR 18.71 |
| 125a | Field Blower | Uncommon | EUR 13.63 | `297611` | `312246` (EUR 0.79), `312273` (EUR 0.46), `312295` (EUR 9.09), `368668` (EUR None), `368701` (EUR 0.5), `368731` (EUR 0.25), `368759` (EUR None), `371639` (EUR 0.91) | EUR 13.63 |
| 160 | Drampa-GX | Rare Rainbow | EUR 11.98 | `297608` | `368694` (EUR 0.9) | EUR 11.08 |
| 156 | Lycanroc-GX | Rare Rainbow | EUR 10 | `297604` | `368680` (EUR None) | EUR 10.00 |
| 55 | Oricorio | Rare | EUR 0.13 | `297517` | `371618` (EUR 0.49), `371619` (EUR 0.36), `371620` (EUR 0.65), `450058` (EUR 10), `450063` (EUR 4), `450068` (EUR 4.33), `450073` (EUR 2.5) | EUR 9.87 |
| 56 | Oricorio | Rare | EUR 0.15 | `297518` | `371618` (EUR 0.49), `371619` (EUR 0.36), `371620` (EUR 0.65), `450058` (EUR 10), `450063` (EUR 4), `450068` (EUR 4.33), `450073` (EUR 2.5) | EUR 9.85 |
| 46 | Oricorio | Rare | EUR 0.18 | `297508` | `371618` (EUR 0.49), `371619` (EUR 0.36), `371620` (EUR 0.65), `450058` (EUR 10), `450063` (EUR 4), `450068` (EUR 4.33), `450073` (EUR 2.5) | EUR 9.82 |
| 14 | Oricorio | Rare | EUR 0.22 | `297478` | `371618` (EUR 0.49), `371619` (EUR 0.36), `371620` (EUR 0.65), `450058` (EUR 10), `450063` (EUR 4), `450068` (EUR 4.33), `450073` (EUR 2.5) | EUR 9.78 |
| 163 | Field Blower | Rare Secret | EUR None | `312221` | `312246` (EUR 0.79), `312273` (EUR 0.46), `312295` (EUR 9.09), `368668` (EUR None), `368701` (EUR 0.5), `368731` (EUR 0.25), `368759` (EUR None), `371639` (EUR 0.91) | EUR 9.09 |
| 125 | Field Blower | Uncommon | EUR 0.54 | `297577` | `312246` (EUR 0.79), `312273` (EUR 0.46), `312295` (EUR 9.09), `368668` (EUR None), `368701` (EUR 0.5), `368731` (EUR 0.25), `368759` (EUR None), `371639` (EUR 0.91) | EUR 8.55 |
| 124a | Enhanced Hammer | Uncommon | EUR 8.45 | `297610` | `371640` (EUR 1.07) | EUR 7.38 |
| 132 | Alolan Ninetales-GX | Rare Ultra | EUR 13.05 | `297584` | `312251` (EUR 7) | EUR 6.05 |
| 153 | Tapu Koko-GX | Rare Rainbow | EUR 9.99 | `297601` | `363927` (EUR 4) | EUR 5.99 |
| 161 | Aqua Patch | Rare Secret | EUR 5.97 | `297609` | `312270` (EUR 0.75), `371652` (EUR 1.95) | EUR 5.22 |
| 155 | Tapu Lele-GX | Rare Rainbow | EUR 7 | `312205` | `312232` (EUR 4.99), `312254` (EUR 8), `312279` (EUR 6), `366835` (EUR 6.13), `366840` (EUR 1.97), `368703` (EUR 2.75), `368735` (EUR 5), `368754` (EUR 5.29) | EUR 5.03 |
| 51 | Garbodor | Rare | EUR 0.29 | `297513` | `321171` (EUR 0.82), `368706` (EUR 5), `368739` (EUR 4.49) | EUR 4.71 |
| 138 | Lycanroc-GX | Rare Ultra | EUR 4.08 | `297590` | `368680` (EUR None) | EUR 4.08 |
| 51a | Garbodor | Rare | EUR 1.24 | `312229` | `321171` (EUR 0.82), `368706` (EUR 5), `368739` (EUR 4.49) | EUR 3.76 |
| 60 | Tapu Lele-GX | Rare Holo GX | EUR 4.41 | `296843` | `312232` (EUR 4.99), `312254` (EUR 8), `312279` (EUR 6), `366835` (EUR 6.13), `366840` (EUR 1.97), `368703` (EUR 2.75), `368735` (EUR 5), `368754` (EUR 5.29) | EUR 3.59 |
| 60a | Tapu Lele-GX | Rare Holo GX | EUR 5.19 | `297589` | `312232` (EUR 4.99), `312254` (EUR 8), `312279` (EUR 6), `366835` (EUR 6.13), `366840` (EUR 1.97), `368703` (EUR 2.75), `368735` (EUR 5), `368754` (EUR 5.29) | EUR 3.22 |
| ... | *11 more in this set* | | | | | |

### Burning Shadows

36 best-guess cards in this set, 29 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 41 | Raichu | Rare Holo | EUR 1.46 | `299445` | `450203` (EUR 65), `450208` (EUR 18.75), `450213` (EUR 9.23), `450218` (EUR 9.25) | EUR 63.54 |
| 39 | Tapu Fini-GX | Rare Holo GX | EUR 2.72 | `298780` | `604983` (EUR 49.95) | EUR 47.23 |
| 39a | Tapu Fini-GX | Rare Holo GX | EUR 4.34 | `299533` | `604983` (EUR 49.95) | EUR 45.61 |
| 152 | Tapu Fini-GX | Rare Rainbow | EUR 5.7 | `366836` | `604983` (EUR 49.95) | EUR 44.25 |
| 133 | Tapu Fini-GX | Rare Ultra | EUR 8.08 | `299550` | `604983` (EUR 49.95) | EUR 41.87 |
| 159 | Gardevoir-GX | Rare Rainbow | EUR 45.96 | `299557` | `312201` (EUR 9.33) | EUR 36.63 |
| 112a | Acerola | Uncommon | EUR 25.03 | `299540` | `312241` (EUR 0.99), `312288` (EUR 0.99), `371642` (EUR 18), `449243` (EUR 21.22), `449248` (EUR 11), `449253` (EUR 9.67) | EUR 24.04 |
| 88a | Darkrai-GX | Rare Holo GX | EUR 32.79 | `299556` | `657889` (EUR 10.12) | EUR 22.67 |
| 115 | Guzma | Uncommon | EUR 2.06 | `298778` | `312240` (EUR 2.59), `312262` (EUR 2.9), `312287` (EUR 3), `368673` (EUR None), `368702` (EUR 0.5), `368751` (EUR 1), `368755` (EUR None), `449618` (EUR 15), `449623` (EUR 24) | EUR 21.94 |
| 112 | Acerola | Uncommon | EUR 0.13 | `299513` | `312241` (EUR 0.99), `312288` (EUR 0.99), `371642` (EUR 18), `449243` (EUR 21.22), `449248` (EUR 11), `449253` (EUR 9.67) | EUR 21.09 |
| 143 | Guzma | Rare Ultra | EUR 3.99 | `312218` | `312240` (EUR 2.59), `312262` (EUR 2.9), `312287` (EUR 3), `368673` (EUR None), `368702` (EUR 0.5), `368751` (EUR 1), `368755` (EUR None), `449618` (EUR 15), `449623` (EUR 24) | EUR 20.01 |
| 142 | Acerola | Rare Ultra | EUR 1.75 | `312216` | `312241` (EUR 0.99), `312288` (EUR 0.99), `371642` (EUR 18), `449243` (EUR 21.22), `449248` (EUR 11), `449253` (EUR 9.67) | EUR 19.47 |
| 115a | Guzma | Uncommon | EUR 16.38 | `299541` | `312240` (EUR 2.59), `312262` (EUR 2.9), `312287` (EUR 3), `368673` (EUR None), `368702` (EUR 0.5), `368751` (EUR 1), `368755` (EUR None), `449618` (EUR 15), `449623` (EUR 24) | EUR 16.38 |
| 163 | Escape Rope | Rare Secret | EUR 14.83 | `299561` | `368760` (EUR 0.25) | EUR 14.58 |
| 110 | Stufful | Common | EUR 0.14 | `299511` | `359285` (EUR 12.87) | EUR 12.73 |
| 148 | Golisopod-GX | Rare Rainbow | EUR 13.75 | `299546` | `312226` (EUR 1.86), `312274` (EUR 3.5) | EUR 11.89 |
| 137 | Marshadow-GX | Rare Ultra | EUR 10.39 | `299554` | `363942` (EUR 1.72) | EUR 8.67 |
| 161 | Bodybuilding Dumbbells | Rare Secret | EUR 8.34 | `299559` | `371654` (EUR 0.85) | EUR 7.49 |
| 158 | Darkrai-GX | Rare Rainbow | EUR 2.9 | `363945` | `657889` (EUR 10.12) | EUR 7.22 |
| 88 | Darkrai-GX | Rare Holo GX | EUR 4.16 | `299490` | `657889` (EUR 10.12) | EUR 5.96 |
| 140 | Gardevoir-GX | Rare Ultra | EUR 14.95 | `299538` | `312201` (EUR 9.33) | EUR 5.62 |
| 93 | Gardevoir-GX | Rare Holo GX | EUR 4.13 | `298802` | `312201` (EUR 9.33) | EUR 5.20 |
| 139 | Darkrai-GX | Rare Ultra | EUR 15.25 | `299571` | `657889` (EUR 10.12) | EUR 5.13 |
| 156 | Marshadow-GX | Rare Rainbow | EUR 5.17 | `299570` | `363942` (EUR 1.72) | EUR 3.45 |
| 92 | Kirlia | Uncommon | EUR 0.16 | `299494` | `665136` (EUR 2.57) | EUR 2.41 |
| ... | *4 more in this set* | | | | | |

### Crimson Invasion

24 best-guess cards in this set, 18 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 84 | Regigigas | Rare Holo | EUR 0.62 | `311931` | `450288` (EUR 12.81), `450293` (EUR 77.25), `450298` (EUR 5.23), `450303` (EUR 5) | EUR 76.63 |
| 84a | Regigigas | Rare Holo | EUR 1.04 | `321170` | `450288` (EUR 12.81), `450293` (EUR 77.25), `450298` (EUR 5.23), `450303` (EUR 5) | EUR 76.21 |
| 115 | Buzzwole-GX | Rare Rainbow | EUR 13.59 | `311962` | `368666` (EUR 0.2) | EUR 13.39 |
| 109 | Gladion | Rare Ultra | EUR 15.46 | `311956` | `448203` (EUR 4.25) | EUR 11.21 |
| 105 | Guzzlord-GX | Rare Ultra | EUR 13.5 | `311963` | `363944` (EUR 3) | EUR 10.50 |
| 117 | Kartana-GX | Rare Rainbow | EUR 9.85 | `311964` | `368740` (EUR None) | EUR 9.85 |
| 120 | Counter Catcher | Rare Secret | EUR 9.65 | `311967` | `371657` (EUR None), `886342` (EUR 8.21) | EUR 9.65 |
| 91 | Counter Catcher | Uncommon | EUR 0.48 | `311938` | `371657` (EUR None), `886342` (EUR 8.21) | EUR 7.73 |
| 106 | Kartana-GX | Rare Ultra | EUR 4.85 | `311953` | `368740` (EUR None) | EUR 4.85 |
| 104 | Buzzwole-GX | Rare Ultra | EUR 5.01 | `311951` | `368666` (EUR 0.2) | EUR 4.81 |
| 119 | Silvally-GX | Rare Rainbow | EUR 9.99 | `311966` | `363941` (EUR 5.33) | EUR 4.66 |
| 75 | Jangmo-o | Common | EUR 0.1 | `311922` | `708073` (EUR 4.3) | EUR 4.20 |
| 95 | Gladion | Uncommon | EUR 0.19 | `311942` | `448203` (EUR 4.25) | EUR 4.06 |
| 57 | Buzzwole-GX | Rare Holo GX | EUR 4.14 | `301171` | `368666` (EUR 0.2) | EUR 3.94 |
| 70 | Kartana-GX | Rare Holo GX | EUR 3.41 | `311918` | `368740` (EUR None) | EUR 3.41 |
| 116 | Guzzlord-GX | Rare Rainbow | EUR 6.16 | `316307` | `363944` (EUR 3) | EUR 3.16 |
| 63a | Guzzlord-GX | Rare Holo GX | EUR 5.85 | `311952` | `363944` (EUR 3) | EUR 2.85 |
| 90 | Silvally-GX | Rare Holo GX | EUR 3.26 | `311937` | `363941` (EUR 5.33) | EUR 2.07 |

### Ultra Prism

27 best-guess cards in this set, 24 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 148 | Cynthia | Rare Ultra | EUR 0.02 | `368674` | `368700` (EUR 1), `368738` (EUR 0.5), `407139` (EUR None), `407349` (EUR None), `448218` (EUR 11), `449098` (EUR 213.33) | EUR 213.31 |
| 119 | Cynthia | Uncommon | EUR 0.15 | `316045` | `368700` (EUR 1), `368738` (EUR 0.5), `407139` (EUR None), `407349` (EUR None), `448218` (EUR 11), `449098` (EUR 213.33) | EUR 213.18 |
| 119a | Cynthia | Uncommon | EUR 100 | `316072` | `368700` (EUR 1), `368738` (EUR 0.5), `407139` (EUR None), `407349` (EUR None), `448218` (EUR 11), `449098` (EUR 213.33) | EUR 113.33 |
| 125a | Lillie | Uncommon | EUR 108.25 | `316075` | `449158` (EUR 31) | EUR 77.25 |
| 31 | Piplup | Common | EUR 0.11 | `315962` | `886903` (EUR 69.99), `888623` (EUR 29.95) | EUR 69.88 |
| 32 | Piplup | Common | EUR 0.35 | `315963` | `886903` (EUR 69.99), `888623` (EUR 29.95) | EUR 69.64 |
| 153 | Lusamine | Rare Ultra | EUR 70.22 | `316077` | `449878` (EUR 4.97), `449883` (EUR 3), `449888` (EUR 6.25) | EUR 67.22 |
| 125 | Lillie | Uncommon | EUR 0.11 | `316050` | `449158` (EUR 31) | EUR 30.89 |
| 151 | Lillie | Rare Ultra | EUR 1.4 | `368774` | `449158` (EUR 31) | EUR 29.60 |
| 135 | Volkner | Uncommon | EUR 0.5 | `316060` | `450488` (EUR 17.99), `450493` (EUR None), `450498` (EUR 4.69), `450503` (EUR None) | EUR 17.49 |
| 156 | Volkner | Rare Ultra | EUR 0.5 | `407344` | `450488` (EUR 17.99), `450493` (EUR None), `450498` (EUR 4.69), `450503` (EUR None) | EUR 17.49 |
| 83 | Magnezone | Rare Holo | EUR 0.63 | `316010` | `449938` (EUR 15), `449943` (EUR 3.98), `449948` (EUR 4.99), `449953` (EUR 1.5) | EUR 14.37 |
| 63 | Dawn Wings Necrozma-GX | Rare Holo GX | EUR 3.39 | `315828` | `363949` (EUR 17.5) | EUR 14.11 |
| 90 | Dusk Mane Necrozma-GX | Rare Holo GX | EUR 3.74 | `315829` | `363948` (EUR 17.5) | EUR 13.76 |
| 135a | Volkner | Uncommon | EUR 10.4 | `316080` | `450488` (EUR 17.99), `450493` (EUR None), `450498` (EUR 4.69), `450503` (EUR None) | EUR 10.40 |
| 145 | Dusk Mane Necrozma-GX | Rare Ultra | EUR 7.28 | `316069` | `363948` (EUR 17.5) | EUR 10.22 |
| 143 | Dawn Wings Necrozma-GX | Rare Ultra | EUR 8.19 | `316067` | `363949` (EUR 17.5) | EUR 9.31 |
| 153a | Lusamine | Rare Ultra | EUR 12 | `448153` | `449878` (EUR 4.97), `449883` (EUR 3), `449888` (EUR 6.25) | EUR 9.00 |
| 161 | Dawn Wings Necrozma-GX | Rare Rainbow | EUR 10.14 | `316085` | `363949` (EUR 17.5) | EUR 7.36 |
| 122a | Escape Board | Uncommon | EUR 6.45 | `316091` | `448138` (EUR 0.58), `449483` (EUR 2.99) | EUR 5.87 |
| 122 | Escape Board | Uncommon | EUR 0.11 | `316047` | `448138` (EUR 0.58), `449483` (EUR 2.99) | EUR 2.88 |
| 167 | Escape Board | Rare Secret | EUR 0.36 | `407274` | `448138` (EUR 0.58), `449483` (EUR 2.99) | EUR 2.63 |
| 163 | Dusk Mane Necrozma-GX | Rare Rainbow | EUR 19.75 | `316087` | `363948` (EUR 17.5) | EUR 2.25 |
| 132 | Pal Pad | Uncommon | EUR 0.15 | `316057` | `407284` (EUR 1.5) | EUR 1.35 |

### Forbidden Light

20 best-guess cards in this set, 15 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 130 | Diantha | Rare Ultra | EUR 34.38 | `355641` | `451703` (EUR 7) | EUR 27.38 |
| 113a | Mysterious Treasure | Uncommon | EUR 17.08 | `355656` | `368750` (EUR 2), `368767` (EUR 1), `407064` (EUR None), `407174` (EUR None), `448163` (EUR 1.14), `449183` (EUR 4.26) | EUR 17.08 |
| 15 | Fennekin | Common | EUR 0.12 | `355535` | `888624` (EUR 15) | EUR 14.88 |
| 14 | Fennekin | Common | EUR 0.15 | `355534` | `888624` (EUR 15) | EUR 14.85 |
| 51 | Malamar | Rare | EUR 0.49 | `355570` | `449978` (EUR 3.87), `449983` (EUR 4), `449988` (EUR 10), `449993` (EUR 7.45) | EUR 9.51 |
| 102a | Beast Ring | Rare | EUR 9.39 | `355652` | `371632` (EUR 0.41), `407179` (EUR None), `449288` (EUR 1.57) | EUR 9.39 |
| 74 | Diancie ◇ | Rare Prism Star | EUR 3.74 | `327208` | `368660` (EUR 12) | EUR 8.26 |
| 105 | Diantha | Rare Holo | EUR 1.12 | `355618` | `451703` (EUR 7) | EUR 5.88 |
| 145 | Mysterious Treasure | Rare Secret | EUR 0.5 | `368695` | `368750` (EUR 2), `368767` (EUR 1), `407064` (EUR None), `407174` (EUR None), `448163` (EUR 1.14), `449183` (EUR 4.26) | EUR 3.76 |
| 113 | Mysterious Treasure | Uncommon | EUR 0.67 | `355626` | `368750` (EUR 2), `368767` (EUR 1), `407064` (EUR None), `407174` (EUR None), `448163` (EUR 1.14), `449183` (EUR 4.26) | EUR 3.59 |
| 55 | Poipole | Uncommon | EUR 0.45 | `355574` | `407099` (EUR 2.5) | EUR 2.05 |
| 77 | Buzzwole | Rare | EUR 1.99 | `355592` | `368681` (EUR None), `368684` (EUR 0.5), `371630` (EUR 1.45) | EUR 1.99 |
| 141 | Beast Ring | Rare Secret | EUR None | `368676` | `371632` (EUR 0.41), `407179` (EUR None), `449288` (EUR 1.57) | EUR 1.57 |
| 80 | Guzzlord | Rare Holo | EUR 2.99 | `320584` | `371631` (EUR 1.58) | EUR 1.41 |
| 102 | Beast Ring | Rare | EUR 0.47 | `355615` | `371632` (EUR 0.41), `407179` (EUR None), `449288` (EUR 1.57) | EUR 1.10 |

### Celestial Storm

27 best-guess cards in this set, 16 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 177 | Rayquaza-GX | Rare Rainbow | EUR 217.33 | `362170` | `450883` (EUR 198.02), `465979` (EUR 14.16) | EUR 203.17 |
| 109 | Rayquaza-GX | Rare Holo GX | EUR 16.65 | `361348` | `450883` (EUR 198.02), `465979` (EUR 14.16) | EUR 181.37 |
| 177a | Rayquaza-GX | Rare Ultra | EUR 19.87 | `368772` | `450883` (EUR 198.02), `465979` (EUR 14.16) | EUR 178.15 |
| 160 | Rayquaza-GX | Rare Ultra | EUR 60 | `361397` | `450883` (EUR 198.02), `465979` (EUR 14.16) | EUR 138.02 |
| 142 | Rare Candy | Uncommon | EUR 0.73 | `361380` | `450253` (EUR 50) | EUR 49.27 |
| 165 | Steven's Resolve | Rare Ultra | EUR 28.81 | `361402` | `371635` (EUR 0.82) | EUR 27.99 |
| 123a | Acro Bike | Uncommon | EUR 21.25 | `362171` | `407044` (EUR None), `407254` (EUR None), `441433` (EUR 0.83) | EUR 21.25 |
| 183 | Rainbow Energy | Rare Secret | EUR 21.65 | `362176` | `368686` (EUR 1) | EUR 20.65 |
| 127 | Copycat | Uncommon | EUR 0.15 | `361365` | `449353` (EUR 14.99) | EUR 14.84 |
| 163 | Copycat | Rare Ultra | EUR 27.95 | `361400` | `449353` (EUR 14.99) | EUR 12.96 |
| 174 | Banette-GX | Rare Rainbow | EUR None | `362167` | `368685` (EUR 5.99) | EUR 5.99 |
| 24 | Magcargo | Rare | EUR 0.43 | `361271` | `449918` (EUR 5.5), `449923` (EUR 2.99), `449928` (EUR 2.98), `449933` (EUR 3.5) | EUR 5.07 |
| 100 | Celesteela | Rare Holo | EUR 5.63 | `361342` | `371633` (EUR 2.25) | EUR 3.38 |
| 157 | Banette-GX | Rare Ultra | EUR 8.88 | `361394` | `368685` (EUR 5.99) | EUR 2.89 |
| 66 | Banette-GX | Rare Holo GX | EUR 3.41 | `361311` | `368685` (EUR 5.99) | EUR 2.58 |
| 145 | Steven's Resolve | Rare Holo | EUR 1.84 | `360407` | `371635` (EUR 0.82) | EUR 1.02 |

### Dragon Majesty

7 best-guess cards in this set, 2 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 60a | Fiery Flint | Uncommon | EUR 22.22 | `363547` | `448143` (EUR 0.89) | EUR 21.33 |
| 7 | Victini ◇ | Rare Prism Star | EUR 5.26 | `363479` | `407229` (EUR None) | EUR 5.26 |

### Lost Thunder

30 best-guess cards in this set, 25 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 188a | Professor Elm's Lecture | Uncommon | EUR 105.61 | `365846` | `451213` (EUR 9.8), `451218` (EUR 3), `451223` (EUR None), `451233` (EUR 32.5) | EUR 105.61 |
| 226 | Mimikyu-GX | Rare Rainbow | EUR 85 | `365859` | `765785` (EUR 5.78) | EUR 79.22 |
| 206 | Mimikyu-GX | Rare Ultra | EUR 56.7 | `365839` | `765785` (EUR 5.78) | EUR 50.92 |
| 221 | Zeraora-GX | Rare Rainbow | EUR 51.75 | `365854` | `407304` (EUR 7.5) | EUR 44.25 |
| 213 | Professor Elm's Lecture | Rare Ultra | EUR 32.63 | `426051` | `451213` (EUR 9.8), `451218` (EUR 3), `451223` (EUR None), `451233` (EUR 32.5) | EUR 32.63 |
| 188 | Professor Elm's Lecture | Uncommon | EUR 0.7 | `365822` | `451213` (EUR 9.8), `451218` (EUR 3), `451223` (EUR None), `451233` (EUR 32.5) | EUR 31.80 |
| 233 | Lost Blender | Rare Secret | EUR 20 | `365867` | `371637` (EUR 0.64) | EUR 19.36 |
| 219 | Blacephalon-GX | Rare Rainbow | EUR 19.85 | `365852` | `407084` (EUR 4.65) | EUR 15.20 |
| 149 | Mimikyu-GX | Rare Holo GX | EUR 20.9 | `365786` | `765785` (EUR 5.78) | EUR 15.12 |
| 172a | Electropower | Uncommon | EUR 11.74 | `365865` | `407379` (EUR None), `449478` (EUR 1.51) | EUR 11.74 |
| 199 | Blacephalon-GX | Rare Ultra | EUR 14.16 | `365832` | `407084` (EUR 4.65) | EUR 9.51 |
| 201 | Zeraora-GX | Rare Ultra | EUR 15 | `365834` | `407304` (EUR 7.5) | EUR 7.50 |
| 231 | Custom Catcher | Rare Secret | EUR 7 | `365864` | `407054` (EUR 5), `407169` (EUR 0.15), `407369` (EUR None) | EUR 7.00 |
| 218 | Magcargo-GX | Rare Rainbow | EUR 10.5 | `365851` | `406989` (EUR 4) | EUR 6.50 |
| 82 | Zebstrika | Rare | EUR 0.93 | `365720` | `398104` (EUR 4.99), `450548` (EUR 6.94), `450553` (EUR 4.33), `450558` (EUR 3.64) | EUR 6.01 |
| 171 | Custom Catcher | Uncommon | EUR 0.37 | `365807` | `407054` (EUR 5), `407169` (EUR 0.15), `407369` (EUR None) | EUR 4.63 |
| 108 | Naganadel | Rare Holo | EUR 4.38 | `365745` | `371638` (EUR 2.69), `407094` (EUR None) | EUR 4.38 |
| 52 | Blacephalon-GX | Rare Holo GX | EUR 8.81 | `364939` | `407084` (EUR 4.65) | EUR 4.16 |
| 76 | Mareep | Common | EUR 0.14 | `365714` | `730050` (EUR 3.99) | EUR 3.85 |
| 75 | Mareep | Common | EUR 0.87 | `365713` | `730050` (EUR 3.99) | EUR 3.12 |
| 198 | Magcargo-GX | Rare Ultra | EUR 6.57 | `365831` | `406989` (EUR 4) | EUR 2.57 |
| 191 | Thunder Mountain ◇ | Rare Prism Star | EUR 1.77 | `364336` | `407364` (EUR None) | EUR 1.77 |
| 178 | Heat Factory ◇ | Rare Prism Star | EUR 1.29 | `365216` | `407164` (EUR None), `407249` (EUR None) | EUR 1.29 |
| 14 | Jumpluff | Rare Holo | EUR 1.65 | `365607` | `371636` (EUR 0.62) | EUR 1.03 |
| 232 | Electropower | Rare Secret | EUR 1 | `371659` | `407379` (EUR None), `449478` (EUR 1.51) | EUR 1.00 |

### Team Up

17 best-guess cards in this set, 14 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 162 | Pikachu & Zekrom-GX | Rare Ultra | EUR 327.5 | `369087` | `407289` (EUR 40) | EUR 287.50 |
| 184 | Pikachu & Zekrom-GX | Rare Rainbow | EUR 85.95 | `369109` | `407289` (EUR 40) | EUR 45.95 |
| 33 | Pikachu & Zekrom-GX | Rare Holo GX | EUR 78.56 | `366888` | `407289` (EUR 40) | EUR 38.56 |
| 189 | Cobalion-GX | Rare Rainbow | EUR 17.95 | `369114` | `406969` (EUR None) | EUR 17.95 |
| 152b | Pokémon Communication | Uncommon | EUR None | `407264` | `451568` (EUR 16.99), `475139` (EUR 0.64) | EUR 16.99 |
| 196 | Pokémon Communication | Rare Secret | EUR None | `407389` | `451568` (EUR 16.99), `475139` (EUR 0.64) | EUR 16.99 |
| 152 | Pokémon Communication | Uncommon | EUR 0.19 | `368295` | `451568` (EUR 16.99), `475139` (EUR 0.64) | EUR 16.80 |
| 152a | Pokémon Communication | Uncommon | EUR 14.48 | `369121` | `451568` (EUR 16.99), `475139` (EUR 0.64) | EUR 13.84 |
| 14 | Charizard | Rare | EUR 11.92 | `368294` | `895477` (EUR 0.05) | EUR 11.87 |
| 168 | Cobalion-GX | Rare Ultra | EUR 8.21 | `369093` | `406969` (EUR None) | EUR 8.21 |
| 106 | Cobalion-GX | Rare Holo GX | EUR 3.5 | `369035` | `406969` (EUR None) | EUR 3.50 |
| 51 | Tapu Koko ◇ | Rare Prism Star | EUR 1.9 | `368982` | `407329` (EUR 3.75) | EUR 1.85 |
| 16 | Ninetales | Rare | EUR 1.49 | `368948` | `407209` (EUR None) | EUR 1.49 |
| 99 | Jirachi | Rare Holo | EUR 1.43 | `369028` | `407199` (EUR None), `722925` (EUR 1.26) | EUR 1.43 |

### Unbroken Bonds

25 best-guess cards in this set, 21 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 205 | Gardevoir & Sylveon-GX | Rare Ultra | EUR 1233 | `372487` | `564409` (EUR 40) | EUR 1193.00 |
| 225 | Gardevoir & Sylveon-GX | Rare Rainbow | EUR 211 | `372725` | `564409` (EUR 40) | EUR 171.00 |
| 217 | Reshiram & Charizard-GX | Rare Rainbow | EUR 170 | `372718` | `407004` (EUR None), `407194` (EUR 10) | EUR 170.00 |
| 194 | Reshiram & Charizard-GX | Rare Ultra | EUR 127.7 | `372476` | `407004` (EUR None), `407194` (EUR 10) | EUR 127.70 |
| 20 | Reshiram & Charizard-GX | Rare Holo GX | EUR 59.98 | `370729` | `407004` (EUR None), `407194` (EUR 10) | EUR 59.98 |
| 182a | Pokégear 3.0 | Uncommon | EUR 31.98 | `372733` | `475144` (EUR 3.24) | EUR 28.74 |
| 204 | Gardevoir & Sylveon-GX | Rare Ultra | EUR 68.5 | `372486` | `564409` (EUR 40) | EUR 28.50 |
| 189a | Welder | Uncommon | EUR 28.43 | `372495` | `407144` (EUR None), `407239` (EUR 1), `448178` (EUR 18.16) | EUR 28.43 |
| 195a | Dedenne-GX | Rare Ultra | EUR 27.81 | `372720` | `407114` (EUR None), `407204` (EUR None), `407299` (EUR 4.99), `475149` (EUR 16.52) | EUR 27.81 |
| 233 | Pokégear 3.0 | Rare Secret | EUR 21.95 | `448188` | `475144` (EUR 3.24) | EUR 18.71 |
| 214 | Welder | Rare Ultra | EUR None | `407024` | `407144` (EUR None), `407239` (EUR 1), `448178` (EUR 18.16) | EUR 18.16 |
| 189 | Welder | Uncommon | EUR 0.52 | `372260` | `407144` (EUR None), `407239` (EUR 1), `448178` (EUR 18.16) | EUR 17.64 |
| 219 | Dedenne-GX | Rare Rainbow | EUR None | `406964` | `407114` (EUR None), `407204` (EUR None), `407299` (EUR 4.99), `475149` (EUR 16.52) | EUR 16.52 |
| 195 | Dedenne-GX | Rare Ultra | EUR 14.72 | `372477` | `407114` (EUR None), `407204` (EUR None), `407299` (EUR 4.99), `475149` (EUR 16.52) | EUR 14.72 |
| 76 | Mew | Rare Holo | EUR 9.23 | `372364` | `407119` (EUR None), `407319` (EUR 1.49) | EUR 9.23 |
| 57 | Dedenne-GX | Rare Holo GX | EUR 8.03 | `372212` | `407114` (EUR None), `407204` (EUR None), `407299` (EUR 4.99), `475149` (EUR 16.52) | EUR 8.49 |
| 231 | Fire Crystal | Rare Secret | EUR 7.87 | `372731` | `407079` (EUR 0.02) | EUR 7.85 |
| 230 | Electromagnetic Radar | Rare Secret | EUR 4.98 | `372730` | `407074` (EUR None), `407374` (EUR None) | EUR 4.98 |
| 182b | Pokégear 3.0 | Uncommon | EUR 0.09 | `407059` | `475144` (EUR 3.24) | EUR 3.15 |
| 130 | Gardevoir & Sylveon-GX | Rare Holo GX | EUR 43.13 | `370790` | `564409` (EUR 40) | EUR 3.13 |
| 182 | Pokégear 3.0 | Uncommon | EUR 1.09 | `372466` | `475144` (EUR 3.24) | EUR 2.15 |

### Unified Minds

36 best-guess cards in this set, 29 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 218 | Slowpoke & Psyduck-GX | Rare Ultra | EUR 332.66 | `388877` | `849811` (EUR 69.99) | EUR 262.67 |
| 242 | Mewtwo & Mew-GX | Rare Rainbow | EUR 267.99 | `389002` | `406959` (EUR 24.95) | EUR 243.04 |
| 221 | Raichu & Alolan Raichu-GX | Rare Ultra | EUR 112.26 | `388892` | `407294` (EUR 2) | EUR 110.26 |
| 222 | Mewtwo & Mew-GX | Rare Ultra | EUR 119.47 | `388897` | `406959` (EUR 24.95) | EUR 94.52 |
| 217 | Slowpoke & Psyduck-GX | Rare Ultra | EUR 137.78 | `388872` | `849811` (EUR 69.99) | EUR 67.79 |
| 71 | Mewtwo & Mew-GX | Rare Holo GX | EUR 83.58 | `377499` | `406959` (EUR 24.95) | EUR 58.63 |
| 241 | Raichu & Alolan Raichu-GX | Rare Rainbow | EUR 59 | `388997` | `407294` (EUR 2) | EUR 57.00 |
| 72 | Espeon & Deoxys-GX | Rare Holo GX | EUR 34.76 | `377508` | `406974` (EUR None) | EUR 34.76 |
| 239 | Slowpoke & Psyduck-GX | Rare Rainbow | EUR 102.99 | `388987` | `849811` (EUR 69.99) | EUR 33.00 |
| 220 | Raichu & Alolan Raichu-GX | Rare Ultra | EUR 30.72 | `388887` | `407294` (EUR 2) | EUR 28.72 |
| 54 | Raichu & Alolan Raichu-GX | Rare Holo GX | EUR 30.18 | `377517` | `407294` (EUR 2) | EUR 28.18 |
| 79a | Jirachi-GX | Rare Ultra | EUR None | `406979` | `523095` (EUR 20.22) | EUR 20.22 |
| 249 | Naganadel-GX | Rare Rainbow | EUR 17 | `389037` | `406999` (EUR 0.3), `407089` (EUR 3.75) | EUR 16.70 |
| 79 | Jirachi-GX | Rare Holo GX | EUR 5.39 | `378870` | `523095` (EUR 20.22) | EUR 14.83 |
| 238 | Heatran-GX | Rare Rainbow | EUR 12.11 | `388982` | `407109` (EUR 2.5), `407219` (EUR None) | EUR 12.11 |
| 206a | Reset Stamp | Uncommon | EUR 9.74 | `389057` | `407399` (EUR None), `475134` (EUR 0.46) | EUR 9.74 |
| 223 | Latios-GX | Rare Ultra | EUR 10.14 | `388902` | `406984` (EUR 0.65) | EUR 9.49 |
| 191a | Cherish Ball | Uncommon | EUR 9.39 | `389042` | `407184` (EUR None), `407259` (EUR None), `407394` (EUR None), `426056` (EUR 1.77) | EUR 9.39 |
| 78 | Latios-GX | Rare Holo GX | EUR 8.18 | `388202` | `406984` (EUR 0.65) | EUR 7.53 |
| 254 | Tag Switch | Rare Secret | EUR 6.02 | `389062` | `407414` (EUR None) | EUR 6.02 |
| 35 | Slowpoke & Psyduck-GX | Rare Holo GX | EUR 64.79 | `377505` | `849811` (EUR 69.99) | EUR 5.20 |
| 230 | Naganadel-GX | Rare Ultra | EUR 5.37 | `388937` | `406999` (EUR 0.3), `407089` (EUR 3.75) | EUR 5.07 |
| 216 | Heatran-GX | Rare Ultra | EUR 5.03 | `388867` | `407109` (EUR 2.5), `407219` (EUR None) | EUR 5.03 |
| 160 | Naganadel-GX | Rare Holo GX | EUR 3.49 | `378873` | `406999` (EUR 0.3), `407089` (EUR 3.75) | EUR 3.19 |
| 25 | Heatran-GX | Rare Holo GX | EUR 2.17 | `387957` | `407109` (EUR 2.5), `407219` (EUR None) | EUR 2.17 |
| ... | *4 more in this set* | | | | | |

### Hidden Fates

8 best-guess cards in this set, 8 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 9 | Charizard-GX | Rare Holo GX | EUR 858.93 | `381243` | `394737` (EUR 16.1) | EUR 842.83 |
| 31 | Mewtwo-GX | Rare Holo GX | EUR 10.58 | `381234` | `396937` (EUR 215.17) | EUR 204.59 |
| 8 | Charmeleon | Uncommon | EUR 0.1 | `394802` | `396722` (EUR 44.98) | EUR 44.88 |
| 48 | Eevee | Rare Holo | EUR 0.17 | `394587` | `396862` (EUR 38.23) | EUR 38.06 |
| 49 | Eevee | Common | EUR 2.81 | `396647` | `396862` (EUR 38.23) | EUR 35.42 |
| 7 | Charmander | Common | EUR 0.12 | `394692` | `396717` (EUR 34.37) | EUR 34.25 |
| 5 | Scyther | Uncommon | EUR 0.07 | `394672` | `396692` (EUR 31.45) | EUR 31.38 |
| 21 | Voltorb | Common | EUR 0.04 | `394642` | `394832` (EUR 3.52) | EUR 3.48 |

### Hidden Fates Shiny Vault

7 best-guess cards in this set, 7 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| SV49 | Charizard-GX | Rare Shiny GX | EUR 858.93 | `381243` | `394737` (EUR 16.1) | EUR 842.83 |
| SV59 | Mewtwo-GX | Rare Shiny GX | EUR 10.58 | `381234` | `396937` (EUR 215.17) | EUR 204.59 |
| SV7 | Charmeleon | Rare Shiny | EUR 0.1 | `394802` | `396722` (EUR 44.98) | EUR 44.88 |
| SV41 | Eevee | Rare Shiny | EUR 0.17 | `394587` | `396647` (EUR 2.81), `396862` (EUR 38.23) | EUR 38.06 |
| SV6 | Charmander | Rare Shiny | EUR 0.12 | `394692` | `396717` (EUR 34.37) | EUR 34.25 |
| SV1 | Scyther | Rare Shiny | EUR 0.07 | `394672` | `396692` (EUR 31.45) | EUR 31.38 |
| SV13 | Voltorb | Rare Shiny | EUR 0.04 | `394642` | `394832` (EUR 3.52) | EUR 3.48 |

### Cosmic Eclipse

5 best-guess cards in this set, 2 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 102 | Lunala | Rare Holo | EUR 2.08 | `408154` | `449868` (EUR 11) | EUR 8.92 |
| 142 | Solgaleo | Rare Holo | EUR 2.11 | `408359` | `450388` (EUR 6.99) | EUR 4.88 |

### Sword & Shield

28 best-guess cards in this set, 17 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 200 | Marnie | Rare Ultra | EUR 32.25 | `437094` | `701503` (EUR 0.31) | EUR 31.94 |
| 65 | Pikachu | Common | EUR 1.41 | `436459` | `742023` (EUR 29.31), `742024` (EUR None) | EUR 27.90 |
| 142 | Snorlax VMAX | Rare Holo VMAX | EUR 43.91 | `427236` | `687429` (EUR 69.95) | EUR 26.04 |
| 211 | Zacian V | Rare Secret | EUR 27.06 | `437144` | `576520` (EUR 3.25) | EUR 23.81 |
| 208 | Marnie | Rare Rainbow | EUR 16.97 | `437129` | `701503` (EUR 0.31) | EUR 16.66 |
| 206 | Snorlax VMAX | Rare Rainbow | EUR 56.3 | `437119` | `687429` (EUR 69.95) | EUR 13.65 |
| 179 | Quick Ball | Uncommon | EUR 0.22 | `436989` | `450668` (EUR 11.88) | EUR 11.66 |
| 212 | Zamazenta V | Rare Secret | EUR 16.94 | `437149` | `576521` (EUR 5.66) | EUR 11.28 |
| 85 | Gengar | Rare Holo | EUR 10.33 | `436549` | `895476` (EUR None) | EUR 10.33 |
| 64 | Frosmoth | Rare Holo | EUR 0.59 | `436454` | `450593` (EUR 10), `450598` (EUR 5.8), `450603` (EUR 4.88), `450608` (EUR 1.45) | EUR 9.41 |
| 61 | Drednaw | Rare | EUR 0.3 | `436439` | `864547` (EUR 6.75) | EUR 6.45 |
| 195 | Zacian V | Rare Ultra | EUR 9.3 | `437069` | `576520` (EUR 3.25) | EUR 6.05 |
| 139 | Zamazenta V | Rare Holo V | EUR 1.75 | `427171` | `576521` (EUR 5.66) | EUR 3.91 |
| 14 | Rillaboom | Rare Holo | EUR 0.45 | `427196` | `450318` (EUR 0.22), `701500` (EUR 2.95) | EUR 2.50 |
| 119 | Galarian Obstagoon | Rare Holo | EUR 0.72 | `436704` | `701502` (EUR 2.95) | EUR 2.23 |
| 138 | Zacian V | Rare Holo V | EUR 1.59 | `427176` | `576520` (EUR 3.25) | EUR 1.66 |
| 15 | Rillaboom | Rare | EUR 1.41 | `436244` | `450318` (EUR 0.22), `701500` (EUR 2.95) | EUR 1.54 |

### Rebel Clash

12 best-guess cards in this set, 7 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 22 | Flapple | Rare Holo | EUR 0.22 | `456413` | `550346` (EUR 5.75), `569896` (EUR 33.29) | EUR 33.07 |
| 209 | Twin Energy | Rare Secret | EUR 4.69 | `457288` | `701484` (EUR None) | EUR 4.69 |
| 70 | Toxtricity V | Rare Holo V | EUR 1.25 | `456468` | `819399` (EUR 4) | EUR 2.75 |
| 141 | Snorlax | Rare | EUR 2.16 | `458093` | `905504` (EUR 4) | EUR 1.84 |
| 125 | Grimmsnarl | Rare Holo | EUR 0.29 | `458023` | `701499` (EUR 2.02) | EUR 1.73 |
| 182 | Toxtricity V | Rare Ultra | EUR 5.36 | `458283` | `819399` (EUR 4) | EUR 1.36 |
| 62 | Luxray | Rare Holo | EUR 0.18 | `457743` | `701498` (EUR 1.33) | EUR 1.15 |

### Darkness Ablaze

19 best-guess cards in this set, 13 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 98 | Galarian Sirfetch'd | Rare | EUR 0.42 | `483369` | `547936` (EUR 6.85) | EUR 6.43 |
| 78 | Dedenne | Uncommon | EUR 0.16 | `483269` | `845419` (EUR 4.45) | EUR 4.29 |
| 200 | Turbo Patch | Rare Secret | EUR 3.92 | `483889` | `715463` (EUR None) | EUR 3.92 |
| 150 | Bunnelby | Common | EUR 0.08 | `483629` | `845425` (EUR 3.75) | EUR 3.67 |
| 105 | Darkrai | Rare Holo | EUR 1.14 | `483404` | `547916` (EUR 3.79) | EUR 2.65 |
| 116 | Eternatus V | Rare Holo V | EUR 1.31 | `483459` | `547946` (EUR 3.9) | EUR 2.59 |
| 44 | Galarian Darmanitan | Rare | EUR 0.26 | `483099` | `547931` (EUR 2.8) | EUR 2.54 |
| 28 | Galarian Darmanitan | Rare | EUR 0.46 | `483014` | `547931` (EUR 2.8) | EUR 2.34 |
| 61 | Tapu Koko | Rare Holo | EUR 0.46 | `483179` | `547906` (EUR 2.68) | EUR 2.22 |
| 36 | Galarian Mr. Rime | Rare | EUR 0.52 | `483054` | `845413` (EUR 2.25) | EUR 1.73 |
| 156 | Corviknight | Rare Holo | EUR 0.34 | `483659` | `547951` (EUR 1.81) | EUR 1.47 |
| 83 | Polteageist | Uncommon | EUR 0.1 | `483294` | `845422` (EUR 1.4) | EUR 1.30 |
| 133 | Kangaskhan | Rare Holo | EUR 0.76 | `483544` | `547926` (EUR 1.91) | EUR 1.15 |

### Vivid Voltage

11 best-guess cards in this set, 9 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 170 | Pikachu V | Rare Ultra | EUR 35.23 | `512560` | `670262` (EUR 9) | EUR 26.23 |
| 25 | Charizard | Rare | EUR 3.66 | `511545` | `547881` (EUR 17.34) | EUR 13.68 |
| 131 | Snorlax | Rare Holo | EUR 2.11 | `512365` | `547891` (EUR 12.49) | EUR 10.38 |
| 182 | Leon | Rare Ultra | EUR 9.66 | `512620` | `547876` (EUR 0.24) | EUR 9.42 |
| 195 | Leon | Rare Rainbow | EUR 7.97 | `512685` | `547876` (EUR 0.24) | EUR 7.73 |
| 43 | Pikachu V | Rare Holo V | EUR 2.59 | `511635` | `670262` (EUR 9) | EUR 6.41 |
| 15 | Shaymin | Rare Holo | EUR 0.45 | `511495` | `895474` (EUR 5.85) | EUR 5.40 |
| 48 | Zapdos | Rare Holo | EUR 0.53 | `511660` | `874539` (EUR 4.79) | EUR 4.26 |
| 39 | Drednaw | Rare | EUR 0.21 | `511615` | `547886` (EUR 2.19) | EUR 1.98 |

### Shining Fates

25 best-guess cards in this set, 24 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 35 | Morpeko | Common | EUR 0.05 | `539198` | `539608` (EUR 7.1) | EUR 7.05 |
| 36 | Morpeko | Common | EUR 0.06 | `539203` | `539608` (EUR 7.1) | EUR 7.04 |
| 51 | Ditto VMAX | Rare Holo VMAX | EUR 2.97 | `539278` | `539983` (EUR 9.89) | EUR 6.92 |
| 41 | Koffing | Common | EUR 0.04 | `539228` | `539768` (EUR 5.49) | EUR 5.45 |
| 8 | Decidueye | Rare Holo | EUR 0.22 | `539063` | `539403` (EUR 5.54) | EUR 5.32 |
| 50 | Ditto V | Rare Holo V | EUR 1.38 | `539273` | `539978` (EUR 6.38) | EUR 5.00 |
| 42 | Galarian Weezing | Rare Holo | EUR 0.23 | `539233` | `539773` (EUR 4.68) | EUR 4.45 |
| 7 | Dartrix | Uncommon | EUR 0.04 | `539058` | `539398` (EUR 3.85) | EUR 3.81 |
| 49 | Cufant | Common | EUR 0.03 | `539268` | `539838` (EUR 3.63) | EUR 3.60 |
| 30 | Frosmoth | Rare Holo | EUR 0.16 | `539173` | `539558` (EUR 3.71) | EUR 3.55 |
| 12 | Thwackey | Uncommon | EUR 0.04 | `539083` | `539413` (EUR 3.39) | EUR 3.35 |
| 34 | Rotom | Uncommon | EUR 0.05 | `539193` | `539578` (EUR 3.28) | EUR 3.23 |
| 13 | Rillaboom | Rare Holo | EUR 0.23 | `539088` | `539418` (EUR 3.38) | EUR 3.15 |
| 47 | Nickit | Common | EUR 0.03 | `539258` | `539793` (EUR 2.96) | EUR 2.93 |
| 27 | Drednaw | Rare | EUR 0.06 | `539158` | `539533` (EUR 2.97) | EUR 2.91 |
| 14 | Gossifleur | Common | EUR 0.03 | `539093` | `539438` (EUR 2.9) | EUR 2.87 |
| 26 | Chewtle | Common | EUR 0.05 | `539153` | `539528` (EUR 2.88) | EUR 2.83 |
| 6 | Rowlet | Common | EUR 0.04 | `539053` | `539393` (EUR 2.82) | EUR 2.78 |
| 29 | Snom | Common | EUR 0.05 | `539168` | `539553` (EUR 2.61) | EUR 2.56 |
| 15 | Eldegoss | Uncommon | EUR 0.04 | `539098` | `539443` (EUR 2.35) | EUR 2.31 |
| 56 | Indeedee | Rare Holo | EUR 0.1 | `539303` | `539683` (EUR 2.3) | EUR 2.20 |
| 11 | Grookey | Common | EUR 0.06 | `539078` | `539408` (EUR 1.96) | EUR 1.90 |
| 48 | Thievul | Rare Holo | EUR 0.83 | `539263` | `539798` (EUR 2.54) | EUR 1.71 |
| 28 | Cramorant | Uncommon | EUR 0.06 | `539163` | `539538` (EUR 1.6) | EUR 1.54 |

### Shining Fates Shiny Vault

24 best-guess cards in this set, 23 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| SV044 | Morpeko | Rare Shiny | EUR 0.05 | `539198` | `539203` (EUR 0.06), `539608` (EUR 7.1) | EUR 7.05 |
| SV119 | Ditto VMAX | Rare Holo VMAX | EUR 2.97 | `539278` | `539983` (EUR 9.89) | EUR 6.92 |
| SV076 | Koffing | Rare Shiny | EUR 0.04 | `539228` | `539768` (EUR 5.49) | EUR 5.45 |
| SV003 | Decidueye | Rare Shiny | EUR 0.22 | `539063` | `539403` (EUR 5.54) | EUR 5.32 |
| SV118 | Ditto V | Rare Holo V | EUR 1.38 | `539273` | `539978` (EUR 6.38) | EUR 5.00 |
| SV077 | Galarian Weezing | Rare Shiny | EUR 0.23 | `539233` | `539773` (EUR 4.68) | EUR 4.45 |
| SV002 | Dartrix | Rare Shiny | EUR 0.04 | `539058` | `539398` (EUR 3.85) | EUR 3.81 |
| SV090 | Cufant | Rare Shiny | EUR 0.03 | `539268` | `539838` (EUR 3.63) | EUR 3.60 |
| SV034 | Frosmoth | Rare Shiny | EUR 0.16 | `539173` | `539558` (EUR 3.71) | EUR 3.55 |
| SV005 | Thwackey | Rare Shiny | EUR 0.04 | `539083` | `539413` (EUR 3.39) | EUR 3.35 |
| SV038 | Rotom | Rare Shiny | EUR 0.05 | `539193` | `539578` (EUR 3.28) | EUR 3.23 |
| SV006 | Rillaboom | Rare Shiny | EUR 0.23 | `539088` | `539418` (EUR 3.38) | EUR 3.15 |
| SV081 | Nickit | Rare Shiny | EUR 0.03 | `539258` | `539793` (EUR 2.96) | EUR 2.93 |
| SV029 | Drednaw | Rare Shiny | EUR 0.06 | `539158` | `539533` (EUR 2.97) | EUR 2.91 |
| SV010 | Gossifleur | Rare Shiny | EUR 0.03 | `539093` | `539438` (EUR 2.9) | EUR 2.87 |
| SV028 | Chewtle | Rare Shiny | EUR 0.05 | `539153` | `539528` (EUR 2.88) | EUR 2.83 |
| SV001 | Rowlet | Rare Shiny | EUR 0.04 | `539053` | `539393` (EUR 2.82) | EUR 2.78 |
| SV033 | Snom | Rare Shiny | EUR 0.05 | `539168` | `539553` (EUR 2.61) | EUR 2.56 |
| SV011 | Eldegoss | Rare Shiny | EUR 0.04 | `539098` | `539443` (EUR 2.35) | EUR 2.31 |
| SV059 | Indeedee | Rare Shiny | EUR 0.1 | `539303` | `539683` (EUR 2.3) | EUR 2.20 |
| SV004 | Grookey | Rare Shiny | EUR 0.06 | `539078` | `539408` (EUR 1.96) | EUR 1.90 |
| SV082 | Thievul | Rare Shiny | EUR 0.83 | `539263` | `539798` (EUR 2.54) | EUR 1.71 |
| SV030 | Cramorant | Rare Shiny | EUR 0.06 | `539163` | `539538` (EUR 1.6) | EUR 1.54 |

### Battle Styles

16 best-guess cards in this set, 10 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 170 | Rapid Strike Urshifu VMAX | Rare Rainbow | EUR 80.81 | `546641` | `708071` (EUR 3.66) | EUR 77.15 |
| 82 | Sandaconda | Rare Holo | EUR 0.17 | `545521` | `569897` (EUR 5.15), `569898` (EUR 38), `883789` (EUR 0.16) | EUR 37.83 |
| 168 | Single Strike Urshifu VMAX | Rare Rainbow | EUR 25.46 | `546631` | `708072` (EUR 3.74) | EUR 21.72 |
| 179 | Houndoom | Rare Secret | EUR 18.29 | `546686` | `562451` (EUR 0.54) | EUR 17.75 |
| 169 | Rapid Strike Urshifu VMAX | Rare Rainbow | EUR 15.52 | `546636` | `708071` (EUR 3.66) | EUR 11.86 |
| 178 | Octillery | Rare Secret | EUR 7.84 | `546681` | `562452` (EUR 1.58) | EUR 6.26 |
| 167 | Single Strike Urshifu VMAX | Rare Rainbow | EUR 9.76 | `546626` | `708072` (EUR 3.74) | EUR 6.02 |
| 88 | Rapid Strike Urshifu VMAX | Rare Holo VMAX | EUR 1.33 | `527665` | `708071` (EUR 3.66) | EUR 2.33 |
| 86 | Single Strike Urshifu VMAX | Rare Holo VMAX | EUR 1.58 | `527655` | `708072` (EUR 3.74) | EUR 2.16 |
| 37 | Octillery | Rare Holo | EUR 0.2 | `527640` | `562452` (EUR 1.58) | EUR 1.38 |

### Chilling Reign

18 best-guess cards in this set, 9 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 179 | Galarian Slowking V | Rare Ultra | EUR 118.05 | `567287` | `677269` (EUR 1.5) | EUR 116.55 |
| 203 | Ice Rider Calyrex VMAX | Rare Rainbow | EUR 80.98 | `567311` | `672378` (EUR 1.46) | EUR 79.52 |
| 164 | Ice Rider Calyrex V | Rare Ultra | EUR 25.66 | `567272` | `672377` (EUR 0.82) | EUR 24.84 |
| 194 | Klara | Rare Ultra | EUR 14.53 | `567302` | `716228` (EUR 0.6) | EUR 13.93 |
| 217 | Klara | Rare Rainbow | EUR 6.65 | `567325` | `716228` (EUR 0.6) | EUR 6.05 |
| 202 | Ice Rider Calyrex VMAX | Rare Rainbow | EUR 7.45 | `567310` | `672378` (EUR 1.46) | EUR 5.99 |
| 163 | Ice Rider Calyrex V | Rare Ultra | EUR 5.15 | `567271` | `672377` (EUR 0.82) | EUR 4.33 |
| 98 | Galarian Slowking | Rare Holo | EUR 0.48 | `567206` | `752310` (EUR 4.04) | EUR 3.56 |
| 178 | Galarian Slowking V | Rare Ultra | EUR 5.04 | `567286` | `677269` (EUR 1.5) | EUR 3.54 |

### Evolving Skies

18 best-guess cards in this set, 13 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 218 | Rayquaza VMAX | Rare Rainbow | EUR 1305 | `574276` | `680134` (EUR None) | EUR 1305.00 |
| 209 | Glaceon VMAX | Rare Rainbow | EUR 229.12 | `574267` | `740475` (EUR 2.46) | EUR 226.66 |
| 175 | Glaceon V | Rare Ultra | EUR 143.26 | `574233` | `740474` (EUR 1.71) | EUR 141.55 |
| 217 | Rayquaza VMAX | Rare Rainbow | EUR 75.8 | `574275` | `680134` (EUR None) | EUR 75.80 |
| 208 | Glaceon VMAX | Rare Rainbow | EUR 26.14 | `574266` | `740475` (EUR 2.46) | EUR 23.68 |
| 174 | Glaceon V | Rare Ultra | EUR 20.28 | `574232` | `740474` (EUR 1.71) | EUR 18.57 |
| 220 | Duraludon VMAX | Rare Rainbow | EUR 20.14 | `574278` | `680135` (EUR 2.75) | EUR 17.39 |
| 111 | Rayquaza VMAX | Rare Holo VMAX | EUR 14.18 | `574159` | `680134` (EUR None) | EUR 14.18 |
| 49 | Pikachu | Common | EUR 0.15 | `574073` | `751840` (EUR 6) | EUR 5.85 |
| 219 | Duraludon VMAX | Rare Rainbow | EUR 7.08 | `574277` | `680135` (EUR 2.75) | EUR 4.33 |
| 80 | Marshadow | Rare Holo | EUR 0.26 | `574128` | `901055` (EUR 2.3) | EUR 2.04 |
| 41 | Glaceon VMAX | Rare Holo VMAX | EUR 4.27 | `574065` | `740475` (EUR 2.46) | EUR 1.81 |
| 123 | Duraludon VMAX | Rare Holo VMAX | EUR 1.36 | `574171` | `680135` (EUR 2.75) | EUR 1.39 |

### Fusion Strike

8 best-guess cards in this set, 2 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 161 | Galarian Obstagoon | Rare Holo | EUR 0.22 | `582789` | `883765` (EUR 5.97) | EUR 5.75 |
| 130 | Dragapult | Rare Holo | EUR 0.17 | `582671` | `701490` (EUR 0.44), `883763` (EUR 4.25) | EUR 4.08 |

### Brilliant Stars

25 best-guess cards in this set, 19 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 68 | Mimikyu V | Rare Holo V | EUR 1.23 | `608518` | `608748` (EUR 55.37) | EUR 54.14 |
| 56 | Mewtwo | Rare | EUR 0.39 | `608506` | `610906` (EUR None), `895743` (EUR 48.33) | EUR 47.94 |
| 174 | Charizard VSTAR | Rare Rainbow | EUR 49.91 | `608720` | `610907` (EUR 10.16) | EUR 39.75 |
| 69 | Mimikyu VMAX | Rare Holo VMAX | EUR 3.49 | `608519` | `608749` (EUR 41.77) | EUR 38.28 |
| 166 | Arceus V | Rare Ultra | EUR 59.96 | `608712` | `683035` (EUR 29.9) | EUR 30.06 |
| 122 | Arceus V | Rare Holo V | EUR 1.64 | `608668` | `683035` (EUR 29.9) | EUR 28.26 |
| 123 | Arceus VSTAR | Rare Holo VSTAR | EUR 2.94 | `608669` | `671808` (EUR 8.24), `683036` (EUR 28.79) | EUR 25.85 |
| 165 | Arceus V | Rare Ultra | EUR 7.11 | `608711` | `683035` (EUR 29.9) | EUR 22.79 |
| 176 | Arceus VSTAR | Rare Rainbow | EUR 9.4 | `608722` | `671808` (EUR 8.24), `683036` (EUR 28.79) | EUR 19.39 |
| 184 | Arceus VSTAR | Rare Secret | EUR 16.53 | `608730` | `671808` (EUR 8.24), `683036` (EUR 28.79) | EUR 12.26 |
| 129 | Acerola's Premonition | Uncommon | EUR 0.07 | `608675` | `608756` (EUR 6.17) | EUR 6.10 |
| 67 | Dedenne | Common | EUR 0.04 | `608517` | `608739` (EUR 4.6) | EUR 4.56 |
| 21 | Moltres | Rare Holo | EUR 0.24 | `608471` | `700330` (EUR 0.48), `778297` (EUR 4.68) | EUR 4.44 |
| 141 | Gloria | Uncommon | EUR 0.05 | `608687` | `608758` (EUR 4.41) | EUR 4.36 |
| 18 | Charizard VSTAR | Rare Holo VSTAR | EUR 7.09 | `608462` | `610907` (EUR 10.16) | EUR 3.07 |
| 14 | Shaymin VSTAR | Rare Holo VSTAR | EUR 1.42 | `608448` | `675937` (EUR 4) | EUR 2.58 |
| 71 | Alcremie | Rare | EUR 0.13 | `608521` | `608740` (EUR 2.44) | EUR 2.31 |
| 62 | Dusknoir | Rare Holo | EUR 0.16 | `608512` | `608738` (EUR 2.45) | EUR 2.29 |
| 133 | Café Master | Uncommon | EUR 0.04 | `608679` | `608757` (EUR 2.07) | EUR 2.03 |

### Astral Radiance

31 best-guess cards in this set, 21 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 30 | Starmie V | Rare Holo V | EUR 1.18 | `658536` | `658890` (EUR 108.58) | EUR 107.40 |
| 166 | Starmie V | Rare Ultra | EUR 3.71 | `658827` | `658890` (EUR 108.58) | EUR 104.87 |
| 117 | Garchomp V | Rare Holo V | EUR 1.13 | `658778` | `658900` (EUR 81.97) | EUR 80.84 |
| 178 | Garchomp V | Rare Ultra | EUR 5.73 | `658839` | `658900` (EUR 81.97) | EUR 76.24 |
| 204 | Irida | Rare Rainbow | EUR 10.46 | `658865` | `700342` (EUR 0.33) | EUR 10.13 |
| 186 | Irida | Rare Ultra | EUR 7.17 | `658847` | `700342` (EUR 0.33) | EUR 6.84 |
| 206 | Roxanne | Rare Rainbow | EUR 6.23 | `658867` | `670548` (EUR None) | EUR 6.23 |
| 120 | Hoothoot | Common | EUR 0.03 | `658781` | `658889` (EUR 5.73) | EUR 5.70 |
| 199 | Adaman | Rare Rainbow | EUR 5.31 | `658860` | `700341` (EUR 0.25) | EUR 5.06 |
| 188 | Roxanne | Rare Ultra | EUR 4.96 | `658849` | `670548` (EUR None) | EUR 4.96 |
| 70 | Hisuian Growlithe | Common | EUR 0.05 | `658659` | `673488` (EUR 4.51) | EUR 4.46 |
| 195 | Hisuian Decidueye VSTAR | Rare Rainbow | EUR 7.13 | `658856` | `664803` (EUR 3.25) | EUR 3.88 |
| 181 | Adaman | Rare Ultra | EUR 3.97 | `658842` | `700341` (EUR 0.25) | EUR 3.72 |
| 96 | Mightyena | Rare | EUR 0.13 | `658740` | `658886` (EUR 3.37) | EUR 3.24 |
| 85 | Kleavor | Rare | EUR 0.13 | `658702` | `658885` (EUR 3.16) | EUR 3.03 |
| 112 | Bronzong | Uncommon | EUR 0.08 | `658773` | `658888` (EUR 2.93) | EUR 2.85 |
| 86 | Kleavor | Rare Holo | EUR 0.32 | `658703` | `658885` (EUR 3.16) | EUR 2.84 |
| 52 | Hisuian Typhlosion | Rare Holo | EUR 0.44 | `658603` | `660427` (EUR 2.74) | EUR 2.30 |
| 69 | Wyrdeer | Rare Holo | EUR 0.4 | `658651` | `658883` (EUR 2.66), `700337` (EUR 0.16) | EUR 2.26 |
| 84 | Hisuian Decidueye VSTAR | Rare Holo VSTAR | EUR 1.26 | `658696` | `664803` (EUR 3.25) | EUR 1.99 |
| 99 | Darkrai VSTAR | Rare Holo VSTAR | EUR 3.02 | `658751` | `675936` (EUR 4.1) | EUR 1.08 |

### Lost Origin

20 best-guess cards in this set, 18 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 76 | Hisuian Zoroark | Rare Holo | EUR 0.28 | `670814` | `674366` (EUR 2.85), `742040` (EUR 8.62), `884418` (EUR 89.88) | EUR 89.60 |
| 52 | Pikachu | Common | EUR 0.23 | `674062` | `674225` (EUR 40.46) | EUR 40.23 |
| 66 | Gengar | Rare Holo | EUR 2.15 | `674075` | `674226` (EUR 38.47), `700344` (EUR 1.73) | EUR 36.32 |
| 201 | Giratina VSTAR | Rare Rainbow | EUR 18.9 | `674207` | `674367` (EUR 3.73) | EUR 15.17 |
| 212 | Giratina VSTAR | Rare Secret | EUR 16.65 | `674218` | `674367` (EUR 3.73) | EUR 12.92 |
| 143 | Snorlax | Rare Holo | EUR 12.88 | `670829` | `674153` (EUR 0.69) | EUR 12.19 |
| 82 | Enamorus V | Rare Holo V | EUR 0.73 | `674095` | `674236` (EUR 9.34) | EUR 8.61 |
| 181 | Gallade V | Rare Ultra | EUR 10.27 | `670831` | `674186` (EUR 2.3) | EUR 7.97 |
| 178 | Enamorus V | Rare Ultra | EUR 2.22 | `674187` | `674236` (EUR 9.34) | EUR 7.12 |
| 84 | Hisuian Arcanine | Rare Holo | EUR 0.21 | `674097` | `674228` (EUR 4.27), `700345` (EUR 0.18) | EUR 4.06 |
| 5 | Parasect | Rare | EUR 0.09 | `670810` | `670826` (EUR 3.34) | EUR 3.25 |
| 15 | Roserade | Uncommon | EUR 0.05 | `674026` | `674224` (EUR 2.72) | EUR 2.67 |
| 73 | Banette | Rare | EUR 0.1 | `674084` | `674227` (EUR 2.4) | EUR 2.30 |
| 26 | Chandelure | Rare Holo | EUR 2.49 | `670828` | `674037` (EUR 0.21) | EUR 2.28 |
| 117 | Spiritomb | Rare | EUR 0.12 | `674130` | `674229` (EUR 2.19) | EUR 2.07 |
| 174 | Kyurem V | Rare Ultra | EUR 3.77 | `674180` | `675829` (EUR 1.85) | EUR 1.92 |
| 131 | Giratina VSTAR | Rare Holo VSTAR | EUR 1.93 | `674143` | `674367` (EUR 3.73) | EUR 1.80 |
| 48 | Kyurem V | Rare Holo V | EUR 0.76 | `674058` | `675829` (EUR 1.85) | EUR 1.09 |

### Silver Tempest

23 best-guess cards in this set, 18 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 131 | Dragonite | Rare Holo | EUR 0.47 | `682178` | `696138` (EUR 9.97), `742041` (EUR 32.9), `884419` (EUR 80) | EUR 79.53 |
| 202 | Lugia VSTAR | Rare Rainbow | EUR 42.22 | `682250` | `686420` (EUR 5.55) | EUR 36.67 |
| 7 | Serperior V | Rare Holo V | EUR 0.97 | `682046` | `682277` (EUR 23.42) | EUR 22.45 |
| 170 | Serperior V | Rare Ultra | EUR 2.91 | `682217` | `682277` (EUR 23.42) | EUR 20.51 |
| 211 | Lugia VSTAR | Rare Secret | EUR 23.52 | `682260` | `686420` (EUR 5.55) | EUR 17.97 |
| 70 | Mawile V | Rare Holo V | EUR 0.71 | `682117` | `682281` (EUR 11.88) | EUR 11.17 |
| 40 | Milotic | Rare | EUR 0.14 | `682082` | `682266` (EUR 9.9) | EUR 9.76 |
| 178 | Mawile V | Rare Ultra | EUR 3.15 | `682225` | `682281` (EUR 11.88) | EUR 8.73 |
| 69 | Gardevoir | Rare | EUR 0.15 | `682116` | `682269` (EUR 8.21) | EUR 8.06 |
| 36 | Articuno | Rare Holo | EUR 0.36 | `682078` | `874538` (EUR 7.37) | EUR 7.01 |
| 173 | Alolan Vulpix V | Rare Ultra | EUR 7.66 | `682220` | `740473` (EUR 1.26) | EUR 6.40 |
| 143 | Altaria | Uncommon | EUR 0.06 | `682190` | `682275` (EUR 6.14) | EUR 6.08 |
| 26 | Braixen | Uncommon | EUR 0.05 | `682067` | `682265` (EUR 4.35) | EUR 4.30 |
| 62 | Jynx | Uncommon | EUR 0.07 | `682109` | `682268` (EUR 4.06) | EUR 3.99 |
| 49 | Pikachu | Common | EUR 0.13 | `682096` | `740467` (EUR 4.04) | EUR 3.91 |
| 137 | Smeargle | Common | EUR 0.05 | `682184` | `682274` (EUR 3.18) | EUR 3.13 |
| 156 | Forest Seal Stone | Rare Holo | EUR 0.29 | `682203` | `749041` (EUR 3.09) | EUR 2.80 |
| 191 | Gym Trainer | Rare Ultra | EUR 2.18 | `682239` | `682254` (EUR None) | EUR 2.18 |

### Crown Zenith

25 best-guess cards in this set, 25 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 14 | Leafeon VSTAR | Rare Holo VSTAR | EUR 3.56 | `691731` | `691915` (EUR 83.9) | EUR 80.34 |
| 54 | Zeraora VMAX | Rare Holo VMAX | EUR 2.85 | `691771` | `691922` (EUR 37.33) | EUR 34.48 |
| 55 | Zeraora VSTAR | Rare Holo VSTAR | EUR 2.23 | `691772` | `691923` (EUR 33.01) | EUR 30.78 |
| 114 | Regigigas VSTAR | Rare Holo VSTAR | EUR 1.64 | `691833` | `691935` (EUR 32.06) | EUR 30.42 |
| 95 | Zacian V | Rare Holo V | EUR 0.95 | `691814` | `691928` (EUR 30.67), `864135` (EUR None) | EUR 29.72 |
| 98 | Zamazenta V | Rare Holo V | EUR 0.92 | `691817` | `691934` (EUR 29.38) | EUR 28.46 |
| 23 | Simisear VSTAR | Rare Holo VSTAR | EUR 1.36 | `691740` | `691917` (EUR 25.42) | EUR 24.06 |
| 107 | Ditto | Rare Holo | EUR 0.97 | `691826` | `691901` (EUR 12.52) | EUR 11.55 |
| 71 | Riolu | Common | EUR 0.04 | `691789` | `691905` (EUR 11.08) | EUR 11.04 |
| 76 | Absol | Rare Holo | EUR 0.37 | `691794` | `691895` (EUR 9.34) | EUR 8.97 |
| 62 | Lunatone | Uncommon | EUR 0.04 | `691779` | `691890` (EUR 8.85) | EUR 8.81 |
| 111 | Bidoof | Common | EUR 0.06 | `691830` | `691908` (EUR 7.2) | EUR 7.14 |
| 69 | Solrock | Uncommon | EUR 0.04 | `691787` | `691894` (EUR 7.06) | EUR 7.02 |
| 66 | Hatterene VMAX | Rare Holo VMAX | EUR 1.63 | `691783` | `691927` (EUR 7.9) | EUR 6.27 |
| 140 | Raihan | Rare Holo | EUR 0.34 | `691859` | `691945` (EUR 5.69) | EUR 5.35 |
| 158 | Darkness Energy | Rare Ultra | EUR 3.35 | `691877` | `695868` (EUR None) | EUR 3.35 |
| 160 | Pikachu | Rare Secret | EUR 60.49 | `691879` | `691909` (EUR 63.82) | EUR 3.33 |
| 152 | Grass Energy | Rare Ultra | EUR 3.29 | `691871` | `695862` (EUR None) | EUR 3.29 |
| 153 | Fire Energy | Rare Ultra | EUR 2.99 | `691872` | `695863` (EUR None) | EUR 2.99 |
| 156 | Psychic Energy | Rare Ultra | EUR 2.89 | `691875` | `695866` (EUR None) | EUR 2.89 |
| 154 | Water Energy | Rare Ultra | EUR 2.86 | `691873` | `695864` (EUR None) | EUR 2.86 |
| 159 | Metal Energy | Rare Ultra | EUR 2.63 | `691878` | `695869` (EUR None) | EUR 2.63 |
| 157 | Fighting Energy | Rare Ultra | EUR 2.54 | `691876` | `695867` (EUR None) | EUR 2.54 |
| 155 | Lightning Energy | Rare Ultra | EUR 2.47 | `691874` | `695865` (EUR None) | EUR 2.47 |
| 100 | Rayquaza V | Rare Holo V | EUR 2.9 | `691819` | `786538` (EUR 4.99) | EUR 2.09 |

### Scarlet & Violet

45 best-guess cards in this set, 33 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 154 | Lechonk | Common | EUR 23.38 | `692087` | `702452` (EUR 0.04), `703199` (EUR None), `703414` (EUR 1.09), `711750` (EUR None), `721846` (EUR 1.31), `742042` (EUR None) | EUR 23.38 |
| 254 | Koraidon ex | Hyper Rare | EUR 21.89 | `702543` | `702550` (EUR 5.67), `703594` (EUR 3.99) | EUR 17.90 |
| 253 | Miraidon ex | Hyper Rare | EUR 23.24 | `702540` | `702549` (EUR 6.62), `901056` (EUR 5.99) | EUR 17.25 |
| 61 | Dondozo | Rare | EUR 0.07 | `702356` | `702503` (EUR 15.44), `785697` (EUR 0.13) | EUR 15.37 |
| 207 | Dondozo | Illustration Rare | EUR 0.15 | `702358` | `702503` (EUR 15.44), `785697` (EUR 0.13) | EUR 15.29 |
| 214 | Greavard | Illustration Rare | EUR 0.04 | `702401` | `702510` (EUR 11.93) | EUR 11.89 |
| 105 | Greavard | Common | EUR 0.05 | `702400` | `702510` (EUR 11.93) | EUR 11.88 |
| 104 | Greavard | Common | EUR 0.22 | `701132` | `702510` (EUR 11.93) | EUR 11.71 |
| 41 | Armarouge | Rare | EUR 0.08 | `702336` | `782676` (EUR 7.86) | EUR 7.78 |
| 15 | Meowscarada | Rare | EUR 0.09 | `702311` | `749042` (EUR 6.8), `800836` (EUR 1.23) | EUR 6.71 |
| 76 | Pawmot | Rare | EUR 0.08 | `702372` | `702505` (EUR 6.68), `785698` (EUR 0.77) | EUR 6.60 |
| 209 | Pawmot | Illustration Rare | EUR 0.14 | `702373` | `702505` (EUR 6.68), `785698` (EUR 0.77) | EUR 6.54 |
| 54 | Quaquaval | Rare | EUR 0.06 | `702348` | `702349` (EUR 0.27), `749044` (EUR 6.06), `800838` (EUR 1.01) | EUR 6.00 |
| 81 | Miraidon ex | Double Rare | EUR 0.62 | `689766` | `702549` (EUR 6.62), `901056` (EUR 5.99) | EUR 6.00 |
| 122 | Klawf | Rare | EUR 0.07 | `702418` | `754784` (EUR 5.61) | EUR 5.54 |
| 125 | Koraidon ex | Double Rare | EUR 0.66 | `689767` | `702550` (EUR 5.67), `703594` (EUR 3.99) | EUR 5.01 |
| 227 | Miraidon ex | Ultra Rare | EUR 1.89 | `690998` | `702549` (EUR 6.62), `901056` (EUR 5.99) | EUR 4.73 |
| 244 | Miraidon ex | Special Illustration Rare | EUR 2.24 | `702523` | `702549` (EUR 6.62), `901056` (EUR 5.99) | EUR 4.38 |
| 129 | Spiritomb | Uncommon | EUR 0.04 | `702424` | `858713` (EUR 4.12) | EUR 4.08 |
| 231 | Koraidon ex | Ultra Rare | EUR 2.01 | `690999` | `702550` (EUR 5.67), `703594` (EUR 3.99) | EUR 3.66 |
| 247 | Koraidon ex | Special Illustration Rare | EUR 2.07 | `702527` | `702550` (EUR 5.67), `703594` (EUR 3.99) | EUR 3.60 |
| 38 | Skeledirge | Rare | EUR 0.08 | `702333` | `749043` (EUR 2.89), `779834` (EUR 0.98), `800837` (EUR 1.13) | EUR 2.81 |
| 23 | Arboliva | Rare | EUR 0.08 | `702319` | `730800` (EUR 0.63), `749045` (EUR 2.6) | EUR 2.52 |
| 203 | Armarouge | Illustration Rare | EUR 10.31 | `702499` | `782676` (EUR 7.86) | EUR 2.45 |
| 114 | Lucario | Uncommon | EUR 0.07 | `702410` | `845426` (EUR 2.28) | EUR 2.21 |
| ... | *8 more in this set* | | | | | |

### Paldea Evolved

56 best-guess cards in this set, 37 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 62 | Pikachu | Common | EUR 0.09 | `715537` | `793388` (EUR 155.99) | EUR 155.90 |
| 222 | Tyranitar | Illustration Rare | EUR 49.11 | `715697` | `845427` (EUR 2.9), `858716` (EUR 6.99) | EUR 46.21 |
| 12 | Sprigatito | Common | EUR 0.05 | `715484` | `715671` (EUR 24.41), `794945` (EUR 43) | EUR 42.95 |
| 13 | Sprigatito | Common | EUR 0.06 | `715485` | `715671` (EUR 24.41), `794945` (EUR 43) | EUR 42.94 |
| 196 | Sprigatito | Illustration Rare | EUR 0.59 | `715486` | `715671` (EUR 24.41), `794945` (EUR 43) | EUR 42.41 |
| 43 | Gyarados | Rare | EUR 0.15 | `715517` | `754782` (EUR 30.97) | EUR 30.82 |
| 269 | Iono | Special Illustration Rare | EUR 28.31 | `715744` | `751835` (EUR 0.26) | EUR 28.05 |
| 201 | Fuecoco | Illustration Rare | EUR 0.05 | `715509` | `715676` (EUR 22.63) | EUR 22.58 |
| 34 | Fuecoco | Common | EUR 0.06 | `715507` | `715676` (EUR 22.63) | EUR 22.57 |
| 35 | Fuecoco | Common | EUR 0.51 | `715508` | `715676` (EUR 22.63) | EUR 22.12 |
| 261 | Chien-Pao ex | Special Illustration Rare | EUR 19.33 | `715736` | `746573` (EUR 6.98), `785462` (EUR 0.84) | EUR 18.49 |
| 210 | Baxcalibur | Illustration Rare | EUR 18.63 | `715685` | `719852` (EUR 0.25), `785699` (EUR 0.16) | EUR 18.47 |
| 105 | Tinkaton | Rare | EUR 0.09 | `715580` | `719853` (EUR 0.43), `719854` (EUR 12.15), `749046` (EUR 2.41), `785700` (EUR 2.54) | EUR 12.06 |
| 208 | Frigibax | Illustration Rare | EUR 11.19 | `715683` | `785461` (EUR 0.53) | EUR 10.66 |
| 151 | Orthworm | Rare | EUR 0.09 | `715626` | `754781` (EUR 9.95), `766960` (EUR 1.11) | EUR 9.86 |
| 49 | Quaxly | Common | EUR 0.05 | `715523` | `715681` (EUR 9.84) | EUR 9.79 |
| 50 | Quaxly | Common | EUR 0.06 | `715524` | `715681` (EUR 9.84) | EUR 9.78 |
| 206 | Quaxly | Illustration Rare | EUR 0.54 | `715525` | `715681` (EUR 9.84) | EUR 9.30 |
| 136 | Sableye | Rare | EUR 0.09 | `715611` | `858717` (EUR 7.84) | EUR 7.75 |
| 135 | Tyranitar | Rare | EUR 0.1 | `715610` | `845427` (EUR 2.9), `858716` (EUR 6.99) | EUR 6.89 |
| 111 | Pupitar | Uncommon | EUR 0.04 | `715586` | `858715` (EUR 6.81) | EUR 6.77 |
| 61 | Chien-Pao ex | Double Rare | EUR 0.79 | `715536` | `746573` (EUR 6.98), `785462` (EUR 0.84) | EUR 6.19 |
| 110 | Larvitar | Common | EUR 0.04 | `715585` | `858714` (EUR 6.09) | EUR 6.05 |
| 71 | Luxray | Rare | EUR 0.1 | `715546` | `754783` (EUR 6.14) | EUR 6.04 |
| 224 | Orthworm | Illustration Rare | EUR 4.93 | `715699` | `754781` (EUR 9.95), `766960` (EUR 1.11) | EUR 5.02 |
| ... | *12 more in this set* | | | | | |

### Obsidian Flames

33 best-guess cards in this set, 18 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 130 | Umbreon | Uncommon | EUR 0.16 | `725210` | `727070` (EUR 48.75), `727071` (EUR 143.5), `742043` (EUR 6.68) | EUR 143.34 |
| 223 | Charizard ex | Special Illustration Rare | EUR 102.85 | `725303` | `749033` (EUR 6.77) | EUR 96.08 |
| 86 | Espeon | Uncommon | EUR 0.14 | `725166` | `727069` (EUR 49.99), `804328` (EUR None) | EUR 49.85 |
| 228 | Charizard ex | Hyper Rare | EUR 29.82 | `725308` | `749033` (EUR 6.77) | EUR 23.05 |
| 25 | Scovillain | Rare | EUR 0.05 | `725105` | `897338` (EUR 19.95) | EUR 19.90 |
| 16 | Bounsweet | Common | EUR 0.04 | `725096` | `786047` (EUR 18.28) | EUR 18.24 |
| 215 | Charizard ex | Ultra Rare | EUR 18.89 | `725294` | `749033` (EUR 6.77) | EUR 12.12 |
| 205 | Scizor | Illustration Rare | EUR 10.42 | `725285` | `858722` (EUR 0.15) | EUR 10.27 |
| 13 | Rowlet | Common | EUR 0.05 | `725093` | `789503` (EUR 7.47) | EUR 7.42 |
| 17 | Steenee | Common | EUR 0.05 | `725097` | `786048` (EUR 6.6) | EUR 6.55 |
| 136 | Darkrai | Rare | EUR 0.07 | `725216` | `858721` (EUR 6.46) | EUR 6.39 |
| 105 | Larvitar | Common | EUR 0.03 | `725185` | `786049` (EUR 4.88) | EUR 4.85 |
| 222 | Eiscue ex | Special Illustration Rare | EUR 4.32 | `725302` | `785464` (EUR 1.08) | EUR 3.24 |
| 200 | Palafin | Illustration Rare | EUR 3.23 | `725280` | `727118` (EUR 0.16), `785704` (EUR 0.42) | EUR 3.07 |
| 106 | Pupitar | Uncommon | EUR 0.04 | `725186` | `786050` (EUR 3.05) | EUR 3.01 |
| 125 | Charizard ex | Double Rare | EUR 3.88 | `725205` | `749033` (EUR 6.77) | EUR 2.89 |
| 203 | Larvitar | Illustration Rare | EUR 3.45 | `725283` | `786049` (EUR 4.88) | EUR 1.43 |
| 14 | Dartrix | Uncommon | EUR 0.04 | `725094` | `789504` (EUR 1.26) | EUR 1.22 |

### 151

5 best-guess cards in this set, 5 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 205 | Mew ex | Hyper Rare | EUR 215.25 | `719658` | `719661` (EUR 43.93) | EUR 171.32 |
| 151 | Mew ex | Double Rare | EUR 0.95 | `719604` | `719661` (EUR 43.93) | EUR 42.98 |
| 150 | Mewtwo | Rare | EUR 0.53 | `719603` | `719636` (EUR 31.22) | EUR 30.69 |
| 193 | Mew ex | Ultra Rare | EUR 19.01 | `719648` | `719661` (EUR 43.93) | EUR 24.92 |
| 143 | Snorlax | Uncommon | EUR 0.11 | `719596` | `719634` (EUR 15.7) | EUR 15.59 |

### Paradox Rift

47 best-guess cards in this set, 27 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 125 | Steelix | Rare | EUR 0.1 | `740662` | `786603` (EUR 36.47) | EUR 36.37 |
| 245 | Garchomp ex | Special Illustration Rare | EUR 39.36 | `740788` | `761002` (EUR 4.99) | EUR 34.37 |
| 206 | Morpeko | Illustration Rare | EUR 20.18 | `740749` | `766961` (EUR 0.89) | EUR 19.29 |
| 207 | Brute Bonnet | Illustration Rare | EUR 10.72 | `740750` | `748125` (EUR 0.36) | EUR 10.36 |
| 208 | Steelix | Illustration Rare | EUR 27.2 | `740751` | `786603` (EUR 36.47) | EUR 9.27 |
| 197 | Espathra | Illustration Rare | EUR 7.74 | `740740` | `743887` (EUR 0.17), `783485` (EUR 0.17) | EUR 7.57 |
| 122 | Lokix | Rare | EUR 0.04 | `740657` | `766962` (EUR 0.56), `786601` (EUR 7.61) | EUR 7.57 |
| 188 | Snorunt | Illustration Rare | EUR 7.79 | `740731` | `785465` (EUR 0.72) | EUR 7.07 |
| 210 | Aegislash | Illustration Rare | EUR 7 | `740753` | `743888` (EUR 0.2) | EUR 6.80 |
| 214 | Porygon-Z | Illustration Rare | EUR 7.14 | `740757` | `786605` (EUR 0.89) | EUR 6.25 |
| 260 | Garchomp ex | Hyper Rare | EUR 10.19 | `740803` | `761002` (EUR 4.99) | EUR 5.20 |
| 190 | Vanillish | Illustration Rare | EUR 7.76 | `740733` | `845406` (EUR 2.79) | EUR 4.97 |
| 187 | Iron Moth | Illustration Rare | EUR 4.78 | `740730` | `743159` (EUR None), `743883` (EUR 0.15), `748124` (EUR 0.31), `749909` (EUR None), `782654` (EUR None) | EUR 4.78 |
| 216 | Iron Jugulis | Illustration Rare | EUR 5.48 | `740759` | `750081` (EUR 1) | EUR 4.48 |
| 38 | Garchomp ex | Double Rare | EUR 0.95 | `740514` | `761002` (EUR 4.99) | EUR 4.04 |
| 203 | Slither Wing | Illustration Rare | EUR 3.84 | `740746` | `743160` (EUR None) | EUR 3.84 |
| 132 | Doublade | Common | EUR 0.03 | `740670` | `784940` (EUR 3.08) | EUR 3.05 |
| 133 | Doublade | Common | EUR 0.04 | `740671` | `784940` (EUR 3.08) | EUR 3.04 |
| 135 | Aegislash ex | Double Rare | EUR 0.6 | `740673` | `789468` (EUR 3.45) | EUR 2.85 |
| 44 | Vanillish | Common | EUR 0.04 | `740521` | `845406` (EUR 2.79) | EUR 2.75 |
| 130 | Honedge | Common | EUR 0.03 | `740668` | `784939` (EUR 2.22) | EUR 2.19 |
| 131 | Honedge | Common | EUR 0.03 | `740669` | `784939` (EUR 2.22) | EUR 2.19 |
| 66 | Zekrom | Rare | EUR 0.13 | `740557` | `841258` (EUR 1.95), `853001` (EUR 0.46) | EUR 1.82 |
| 230 | Aegislash ex | Ultra Rare | EUR 2 | `740773` | `789468` (EUR 3.45) | EUR 1.45 |
| 32 | Kingdra | Rare | EUR 0.1 | `740508` | `786600` (EUR 1.3) | EUR 1.20 |
| ... | *2 more in this set* | | | | | |

### Paldean Fates

16 best-guess cards in this set, 9 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 131 | Pikachu | Shiny Rare | EUR 63.01 | `751670` | `794904` (EUR None) | EUR 63.01 |
| 109 | Charmander | Shiny Rare | EUR 28.28 | `751648` | `833339` (EUR 0.65) | EUR 27.63 |
| 40 | Ceruledge | Rare | EUR 0.07 | `751577` | `756335` (EUR 16) | EUR 15.93 |
| 110 | Charmeleon | Shiny Rare | EUR 14.16 | `751649` | `833342` (EUR 0.48) | EUR 13.68 |
| 162 | Ceruledge | Shiny Rare | EUR 5.61 | `751701` | `756335` (EUR 16) | EUR 10.39 |
| 132 | Raichu | Shiny Rare | EUR 11.88 | `751671` | `779836` (EUR 5.98) | EUR 5.90 |
| 19 | Raichu | Rare | EUR 0.12 | `751546` | `779836` (EUR 5.98) | EUR 5.86 |
| 66 | Iron Treads ex | Double Rare | EUR 0.44 | `751604` | `866037` (EUR 3.65) | EUR 3.21 |
| 53 | Great Tusk ex | Double Rare | EUR 0.51 | `751590` | `866035` (EUR 3.08), `866036` (EUR 1.73) | EUR 2.57 |

### Temporal Forces

30 best-guess cards in this set, 21 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 208 | Raging Bolt ex | Special Illustration Rare | EUR 61.33 | `760838` | `764114` (EUR 3.2), `786646` (EUR 1.9) | EUR 59.43 |
| 206 | Iron Crown ex | Special Illustration Rare | EUR 48.47 | `760836` | `762530` (EUR 1.5), `855027` (EUR 2.98) | EUR 46.97 |
| 129 | Dudunsparce | Rare | EUR 0.53 | `760759` | `883689` (EUR 20.03) | EUR 19.50 |
| 119 | Koraidon | Rare | EUR 0.06 | `760749` | `761962` (EUR None), `761974` (EUR 0.16), `762531` (EUR 2.79), `762532` (EUR None), `804337` (EUR 17.96) | EUR 17.90 |
| 121 | Miraidon | Rare | EUR 0.07 | `760751` | `761963` (EUR 2.61), `761975` (EUR 0.24), `804338` (EUR 17.45) | EUR 17.38 |
| 218 | Raging Bolt ex | Hyper Rare | EUR 12.62 | `760848` | `764114` (EUR 3.2), `786646` (EUR 1.9) | EUR 10.72 |
| 34 | Incineroar ex | Double Rare | EUR 0.8 | `760664` | `864136` (EUR 10), `865201` (EUR 3.1), `865203` (EUR 8.5) | EUR 9.20 |
| 187 | Incineroar ex | Ultra Rare | EUR 2.15 | `760817` | `864136` (EUR 10), `865201` (EUR 3.1), `865203` (EUR 8.5) | EUR 7.85 |
| 216 | Iron Crown ex | Hyper Rare | EUR 8.41 | `760846` | `762530` (EUR 1.5), `855027` (EUR 2.98) | EUR 6.91 |
| 173 | Relicanth | Illustration Rare | EUR 6.39 | `760803` | `761973` (EUR 0.53) | EUR 5.86 |
| 12 | Torterra ex | Double Rare | EUR 0.81 | `760642` | `865202` (EUR 4.2) | EUR 3.39 |
| 51 | Pikachu | Common | EUR 0.11 | `760681` | `800144` (EUR 2.24), `870424` (EUR 3.28) | EUR 3.17 |
| 96 | Great Tusk | Uncommon | EUR 0.03 | `760726` | `866039` (EUR 2.46) | EUR 2.43 |
| 97 | Great Tusk | Uncommon | EUR 0.05 | `760727` | `866039` (EUR 2.46) | EUR 2.41 |
| 81 | Iron Crown ex | Double Rare | EUR 0.72 | `760711` | `762530` (EUR 1.5), `855027` (EUR 2.98) | EUR 2.26 |
| 123 | Raging Bolt ex | Double Rare | EUR 1.15 | `760753` | `764114` (EUR 3.2), `786646` (EUR 1.9) | EUR 2.05 |
| 62 | Iron Thorns | Rare | EUR 0.09 | `760692` | `761971` (EUR 0.16), `821592` (EUR 1.92) | EUR 1.83 |
| 109 | Roaring Moon | Rare | EUR 0.08 | `760739` | `858723` (EUR 1.48) | EUR 1.40 |
| 118 | Iron Treads | Uncommon | EUR 0.05 | `760748` | `866038` (EUR 1.44) | EUR 1.39 |
| 191 | Iron Crown ex | Ultra Rare | EUR 1.61 | `760821` | `762530` (EUR 1.5), `855027` (EUR 2.98) | EUR 1.37 |
| 185 | Torterra ex | Ultra Rare | EUR 2.87 | `760815` | `865202` (EUR 4.2) | EUR 1.33 |

### Twilight Masquerade

34 best-guess cards in this set, 19 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 214 | Greninja ex | Special Illustration Rare | EUR 236.9 | `769388` | `804205` (EUR 15.54) | EUR 221.36 |
| 24 | Teal Mask Ogerpon | Rare | EUR 0.06 | `769198` | `771356` (EUR None), `771357` (EUR 49.88), `786105` (EUR 30.23), `800148` (EUR 0.23) | EUR 49.82 |
| 100 | Hisuian Arcanine | Rare | EUR 0.09 | `769274` | `858725` (EUR 28.84), `883809` (EUR 0.03) | EUR 28.75 |
| 173 | Infernape | Illustration Rare | EUR 15.06 | `769347` | `776161` (EUR 0.42) | EUR 14.64 |
| 106 | Greninja ex | Double Rare | EUR 2.97 | `769280` | `804205` (EUR 15.54) | EUR 12.57 |
| 213 | Wellspring Mask Ogerpon ex | Special Illustration Rare | EUR 15.4 | `769387` | `830114` (EUR 3.36) | EUR 12.04 |
| 22 | Sinistcha | Rare | EUR 0.08 | `769196` | `771355` (EUR 11.57), `858724` (EUR 8.68) | EUR 11.49 |
| 200 | Dragapult ex | Ultra Rare | EUR 8.33 | `769374` | `853514` (EUR 0.03) | EUR 8.30 |
| 174 | Froslass | Illustration Rare | EUR 7.88 | `769348` | `776162` (EUR 0.55) | EUR 7.33 |
| 170 | Dipplin | Illustration Rare | EUR 7.31 | `769344` | `800147` (EUR 0.24) | EUR 7.07 |
| 212 | Hearthflame Mask Ogerpon ex | Special Illustration Rare | EUR 10.69 | `769386` | `830112` (EUR 6.47), `830113` (EUR 4.09) | EUR 6.60 |
| 198 | Greninja ex | Ultra Rare | EUR 9.38 | `769372` | `804205` (EUR 15.54) | EUR 6.16 |
| 40 | Hearthflame Mask Ogerpon ex | Double Rare | EUR 0.56 | `769214` | `830112` (EUR 6.47), `830113` (EUR 4.09) | EUR 5.91 |
| 192 | Hearthflame Mask Ogerpon ex | Ultra Rare | EUR 2.29 | `769366` | `830112` (EUR 6.47), `830113` (EUR 4.09) | EUR 4.18 |
| 64 | Wellspring Mask Ogerpon ex | Double Rare | EUR 0.91 | `769238` | `830114` (EUR 3.36) | EUR 2.45 |
| 82 | Alakazam | Rare | EUR 0.1 | `769256` | `812590` (EUR 2.41) | EUR 2.31 |
| 195 | Luxray ex | Ultra Rare | EUR 2.3 | `769369` | `901089` (EUR None) | EUR 2.30 |
| 201 | Blissey ex | Ultra Rare | EUR 2.8 | `769375` | `841259` (EUR 1.14) | EUR 1.66 |
| 130 | Dragapult ex | Double Rare | EUR 1.43 | `769304` | `853514` (EUR 0.03) | EUR 1.40 |

### Stellar Crown

22 best-guess cards in this set, 15 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 170 | Terapagos ex | Special Illustration Rare | EUR 36.07 | `786024` | `790524` (EUR 1.89) | EUR 34.18 |
| 111 | Raging Bolt | Rare | EUR 0.12 | `785965` | `786551` (EUR 25.74) | EUR 25.62 |
| 107 | Archaludon | Rare | EUR 0.06 | `785961` | `786544` (EUR 11.95), `786546` (EUR None), `789015` (EUR 1.91), `814544` (EUR 0.94), `883682` (EUR 0.07) | EUR 11.89 |
| 173 | Terapagos ex | Hyper Rare | EUR 13.69 | `786027` | `790524` (EUR 1.89) | EUR 11.80 |
| 155 | Archaludon | Illustration Rare | EUR 2.87 | `786009` | `786544` (EUR 11.95), `786546` (EUR None), `789015` (EUR 1.91), `814544` (EUR 0.94), `883682` (EUR 0.07) | EUR 9.08 |
| 96 | Grimmsnarl | Rare | EUR 0.07 | `785950` | `883667` (EUR 7.55) | EUR 7.48 |
| 104 | Melmetal | Rare | EUR 0.07 | `785958` | `819402` (EUR 7.19) | EUR 7.12 |
| 144 | Ledian | Illustration Rare | EUR 4.39 | `785998` | `789023` (EUR 0.15) | EUR 4.24 |
| 1 | Venusaur ex | Double Rare | EUR 1.51 | `785852` | `841261` (EUR 4.32), `841262` (EUR 3.49) | EUR 2.81 |
| 30 | Blastoise ex | Double Rare | EUR 3.07 | `785883` | `841264` (EUR 5.62) | EUR 2.55 |
| 42 | Crabominable | Uncommon | EUR 0.03 | `785896` | `845407` (EUR 1.67) | EUR 1.64 |
| 41 | Greninja ex | Double Rare | EUR 1.02 | `785895` | `841269` (EUR 2.38), `841270` (EUR 1.41) | EUR 1.36 |
| 103 | Meltan | Common | EUR 0.04 | `785957` | `841265` (EUR 1.37) | EUR 1.33 |
| 102 | Meltan | Common | EUR 0.05 | `785956` | `841265` (EUR 1.37) | EUR 1.32 |
| 105 | Melmetal ex | Double Rare | EUR 0.64 | `785959` | `841266` (EUR 1.88), `841267` (EUR 0.81) | EUR 1.24 |

### Surging Sparks

20 best-guess cards in this set, 13 of them material.

| # | Card | Rarity | Price used | Product | Rejected | Gap |
|---|---|---|---:|---|---|---:|
| 239 | Latias ex | Special Illustration Rare | EUR 180.62 | `794612` | `841273` (EUR 6.08), `841274` (EUR 1.94) | EUR 178.68 |
| 107 | Gastrodon | Rare | EUR 0.06 | `794433` | `858727` (EUR 19.97) | EUR 19.91 |
| 29 | Fuecoco | Common | EUR 0.03 | `794286` | `794946` (EUR 16.75) | EUR 16.72 |
| 14 | Rabsca | Rare | EUR 0.05 | `794269` | `799715` (EUR 0.1), `858726` (EUR 16.64) | EUR 16.59 |
| 241 | Archaludon ex | Special Illustration Rare | EUR 13.34 | `794614` | `841276` (EUR 5), `841277` (EUR 1.17) | EUR 12.17 |
| 161 | Terapagos | Rare | EUR 0.06 | `794534` | `794948` (EUR 5.7) | EUR 5.64 |
| 220 | Latias ex | Ultra Rare | EUR 6.41 | `794593` | `841273` (EUR 6.08), `841274` (EUR 1.94) | EUR 4.47 |
| 130 | Archaludon ex | Double Rare | EUR 0.58 | `794503` | `841276` (EUR 5), `841277` (EUR 1.17) | EUR 4.42 |
| 224 | Archaludon ex | Ultra Rare | EUR 1.33 | `794597` | `841276` (EUR 5), `841277` (EUR 1.17) | EUR 3.67 |
| 76 | Latias ex | Double Rare | EUR 4.97 | `794373` | `841273` (EUR 6.08), `841274` (EUR 1.94) | EUR 3.03 |
| 65 | Tapu Koko | Rare | EUR 0.06 | `794346` | `799718` (EUR 2.04) | EUR 1.98 |
| 129 | Duraludon | Common | EUR 0.03 | `794502` | `841275` (EUR 2.01) | EUR 1.98 |
| 218 | Black Kyurem ex | Ultra Rare | EUR 2.67 | `794591` | `841271` (EUR 1.47), `841272` (EUR 1.05) | EUR 1.62 |

## Unmatched cards in priced sets

| Set | # | Card | Rarity | Reason |
|---|---|---|---|---|
| Skyridge | 129 | Miracle Sphere α | Uncommon | no Cardmarket product with this name |
| Skyridge | 130 | Miracle Sphere β | Uncommon | no Cardmarket product with this name |
| Skyridge | 131 | Miracle Sphere γ | Uncommon | no Cardmarket product with this name |
| Skyridge | 133 | Mystery Plate α | Uncommon | no Cardmarket product with this name |
| Skyridge | 134 | Mystery Plate β | Uncommon | no Cardmarket product with this name |
| Skyridge | 135 | Mystery Plate γ | Uncommon | no Cardmarket product with this name |
| Skyridge | 136 | Mystery Plate δ | Uncommon | no Cardmarket product with this name |
| FireRed & LeafGreen | 91 | EXP.ALL | Uncommon | no Cardmarket product with this name |
| FireRed & LeafGreen | 98 | Prof. Oak's Research | Uncommon | no Cardmarket product with this name |
| Team Rocket Returns | 107 | Mudkip ★ | Rare Holo Star | no Cardmarket product with this name |
| Team Rocket Returns | 108 | Torchic ★ | Rare Holo Star | no Cardmarket product with this name |
| Team Rocket Returns | 109 | Treecko ★ | Rare Holo Star | no Cardmarket product with this name |
| Deoxys | 105 | Latias ★ | Rare Holo Star | no Cardmarket product with this name |
| Deoxys | 106 | Latios ★ | Rare Holo Star | no Cardmarket product with this name |
| Deoxys | 107 | Rayquaza ★ | Rare Holo Star | no Cardmarket product with this name |
| Delta Species | 111 | Groudon ★ | Rare Holo Star | no Cardmarket product with this name |
| Delta Species | 112 | Kyogre ★ | Rare Holo Star | no Cardmarket product with this name |
| Delta Species | 113 | Metagross ★ | Rare Holo Star | no Cardmarket product with this name |
| Holon Phantoms | 98 | δ Rainbow Energy | Uncommon | no Cardmarket product with this name |
| Holon Phantoms | 102 | Gyarados ★ δ | Rare Holo Star | no Cardmarket product with this name |
| Holon Phantoms | 103 | Mewtwo ★ | Rare Holo Star | no Cardmarket product with this name |
| Holon Phantoms | 104 | Pikachu ★ | Rare Holo Star | no Cardmarket product with this name |
| Crystal Guardians | 99 | Alakazam ★ | Rare Holo Star | no Cardmarket product with this name |
| Crystal Guardians | 100 | Celebi ★ | Rare Holo Star | no Cardmarket product with this name |
| Dragon Frontiers | 88 | δ Rainbow Energy | Uncommon | no Cardmarket product with this name |
| Dragon Frontiers | 100 | Charizard ★ δ | Rare Holo Star | no Cardmarket product with this name |
| Dragon Frontiers | 101 | Mew ★ δ | Rare Holo Star | no Cardmarket product with this name |
| Arceus | 12 | Zapdos G | Rare Holo | no Cardmarket product with this name |
| Arceus | 26 | Porygon-Z G | Rare | no Cardmarket product with this name |
| Arceus | 53 | Beedrill G | Common | no Cardmarket product with this name |
| Dragons Exalted | 117 | Blend Energy GrassFirePsychicDarkness | Uncommon | no Cardmarket product with this name |
| Dragons Exalted | 118 | Blend Energy WaterLightningFightingMetal | Uncommon | no Cardmarket product with this name |
| Ancient Origins | 72 | Energy Recycler | Uncommon | no Cardmarket product with this name |
| Ancient Origins | 75a | Hex Maniac | Rare Ultra | no Cardmarket product with this name |
| Ancient Origins | 78 | Lysandre | Uncommon | no Cardmarket product with this name |
| Ancient Origins | 95 | Steven | Rare Ultra | no Cardmarket product with this name |
| Sun & Moon | 171 | Metal Energy | Common | no Cardmarket product with this name |
| Sun & Moon | 170 | Darkness Energy | Common | no Cardmarket product with this name |
| Ultra Prism | 137 | Unit Energy GrassFireWater | Uncommon | no Cardmarket product with this name |
| Ultra Prism | 170 | Unit Energy GrassFireWater | Rare Secret | no Cardmarket product with this name |
| Ultra Prism | 138 | Unit Energy LightningPsychicMetal | Uncommon | no Cardmarket product with this name |
| Ultra Prism | 171 | Unit Energy LightningPsychicMetal | Rare Secret | no Cardmarket product with this name |
| Forbidden Light | 118 | Unit Energy FightingDarknessFairy | Uncommon | no Cardmarket product with this name |
| Forbidden Light | 146 | Unit Energy FightingDarknessFairy | Rare Secret | no Cardmarket product with this name |
| Lost Thunder | 174 | Fairy Charm Grass | Uncommon | no Cardmarket product with this name |
| Lost Thunder | 175 | Fairy Charm Psychic | Uncommon | no Cardmarket product with this name |
| Lost Thunder | 176 | Fairy Charm Fighting | Uncommon | no Cardmarket product with this name |
| Lost Thunder | 177 | Fairy Charm Dragon | Uncommon | no Cardmarket product with this name |
| Team Up | 54 | Nidoran ♀ | Common | no Cardmarket product with this name |
| Team Up | 57 | Nidoran ♂ | Common | no Cardmarket product with this name |
| Unbroken Bonds | 172 | Fairy Charm Lightning | Uncommon | no Cardmarket product with this name |
| Sword & Shield | 178 | Professor's Research (Professor Magnolia) | Rare Holo | no Cardmarket product with this name |
| Sword & Shield | 201 | Professor's Research (Professor Magnolia) | Rare Ultra | no Cardmarket product with this name |
| Sword & Shield | 209 | Professor's Research (Professor Magnolia) | Rare Rainbow | no Cardmarket product with this name |
| Rebel Clash | 154 | Boss's Orders | Rare Holo | no Cardmarket product with this name |
| Rebel Clash | 189 | Boss's Orders | Rare Ultra | no Cardmarket product with this name |
| Rebel Clash | 200 | Boss's Orders | Rare Rainbow | no Cardmarket product with this name |
| Darkness Ablaze | 166 | Pokémon Breeder's Nurturing | Uncommon | no Cardmarket product with this name |
| Darkness Ablaze | 188 | Pokémon Breeder's Nurturing | Rare Ultra | no Cardmarket product with this name |
| Darkness Ablaze | 195 | Pokémon Breeder's Nurturing | Rare Rainbow | no Cardmarket product with this name |
| Champion's Path | 62 | Professor's Research (Professor Magnolia) | Rare Holo | no Cardmarket product with this name |
| Shining Fates | 58 | Boss's Orders | Rare | no Cardmarket product with this name |
| Shining Fates | 60 | Professor's Research | Rare | no Cardmarket product with this name |
| Brilliant Stars | 132 | Boss's Orders | Rare Holo | no Cardmarket product with this name |
| Brilliant Stars | 147 | Professor's Research | Rare Holo | no Cardmarket product with this name |
| Crown Zenith | 150 | Professor's Research | Rare Ultra | no Cardmarket product with this name |
| Scarlet & Violet | 189 | Professor's Research (Professor Sada) | Rare | no Cardmarket product with this name |
| Scarlet & Violet | 240 | Professor's Research (Professor Sada) | Ultra Rare | no Cardmarket product with this name |
| Scarlet & Violet | 190 | Professor's Research (Professor Turo) | Rare | no Cardmarket product with this name |
| Scarlet & Violet | 241 | Professor's Research (Professor Turo) | Ultra Rare | no Cardmarket product with this name |
| Paldea Evolved | 172 | Boss's Orders (Ghetsis) | Rare | no Cardmarket product with this name |
| Paldea Evolved | 248 | Boss's Orders (Ghetsis) | Ultra Rare | no Cardmarket product with this name |
| Paldea Evolved | 265 | Boss's Orders (Ghetsis) | Special Illustration Rare | no Cardmarket product with this name |
| Paldean Fates | 87 | Professor's Research | Rare | no Cardmarket product with this name |
| Paldean Fates | 88 | Professor's Research | Rare | no Cardmarket product with this name |
| Prismatic Evolutions | 122 | Professor's Research | Common | no Cardmarket product with this name |
| Prismatic Evolutions | 123 | Professor's Research | Common | no Cardmarket product with this name |
| Prismatic Evolutions | 124 | Professor's Research | Common | no Cardmarket product with this name |
| Prismatic Evolutions | 125 | Professor's Research | Common | no Cardmarket product with this name |
| Journey Together | 155 | Professor's Research | Common | no Cardmarket product with this name |
| Destined Rivals | 114 | Team Rocket's Nidoran♀ | Common | no Cardmarket product with this name |
| Destined Rivals | 117 | Team Rocket's Nidoran♂ | Common | no Cardmarket product with this name |
| Black Bolt | 85 | Professor's Research | Uncommon | no Cardmarket product with this name |
| Mega Evolution | 114 | Boss's Orders | Uncommon | no Cardmarket product with this name |
| Ascended Heroes | 183 | Boss's Orders | Uncommon | no Cardmarket product with this name |
| Ascended Heroes | 256 | Boss's Orders | Ultra Rare | no Cardmarket product with this name |

## Printing caveats

- **Pitch Black** - Classified 'review' by the automatic mapping (a sibling expansion scores similarly) but verified correct by hand, so it is priced.

