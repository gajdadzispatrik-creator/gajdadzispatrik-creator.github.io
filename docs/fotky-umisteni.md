# Usazení fotek — závazný stav (desktop, 28. 9. 2026)

**Desktop schválen Patrikem 28. 9. 2026** — homepage, O mně a Přístup
prohlédnuté a odsouhlasené na 1280, 1366, 1440, 1920 a 2560 px.

Fotky na webu jsou zatím testovací (nízké rozlišení, vodoznak). Usazení níže
schválil Patrik. **Až přijdou finální fotky (vyšší rozlišení, bez vodoznaku,
případně jinak oříznuté), musí na webu vypadat PŘESNĚ takhle** — stejně velká
hlava, stejné místo temene, hlavy a prstů v rámu, stejné rozpouštění.
Rám (velikost a poloha bloku fotky) se NEMĚNÍ.

## Postup při výměně fotky

1. Uložit novou fotku přes starou (`src/assets/photos/…`, tabulka níže). Musí
   mít průhledné pozadí (PNG/WebP).
2. Změřit ji: `node scripts/photo-metrics.mjs src/assets/photos/<soubor>`
   → `top`, `hw`, `hc`, `fingers` v pixelech zdrojové fotky.
3. Spočítat nastavení tak, aby se trefily cílové hodnoty z tabulky:
   - měřítko `s = cílová hlava / hw`,
   - vykreslená výška fotky `H × s` → výška `<img>` v rámu
     (`height: calc(100% * (H × s) / výška rámu)`, `object-fit: contain`),
   - posun `object-position: <x>px <y>px` tak, aby
     `y + top × s = temeno od horní hrany` a `x + hc × s = střed hlavy od levé hrany`,
   - maska (rozpouštění) začíná těsně pod prsty (`fingers × s`) a končí na
     spodku rámu — kosinová křivka (viz existující `mask-image` v kódu).
4. Ověřit v prohlížeči na 1300 a 1440 px stejnou metodou (hlava, temeno,
   střed hlavy, prsty vs. hodnoty níže, odchylka do ~3 px).
5. `npm run build`, `npm run check:layout`, `npm run check:typo`.

Hodnoty jsou v CSS pixelech na webu, měřené od levého horního rohu rámu.

## Cílové hodnoty

| Místo | Soubor | Šířka | Rám (š × v) | Hlava | Temeno od horní hrany | Střed hlavy od levé hrany | Prsty od horní hrany | Rozpouštění |
|---|---|---|---|---|---|---|---|---|
| Homepage — hero | `patrik-hero.png` | 1300 | 466 × 751 | 116 | 11 | 200 | 700 | žádné — spodek uřízne statistický pás ~50 px pod prsty |
| | | 1440 | 500 × 780 | 120 | 12 | 224 | 726 | 〃 |
| Homepage — „Za každým doporučením…" | `patrik-duvera.webp` | 1300 | 500 × 750 | 104 | 11 | 293 | 673 | 84 % → 99 % výšky rámu |
| | | 1440 | 580 × 870 | 121 | 13 | 340 | 781 | 〃 |
| O mně — hero | `patrik-omne-hero-top.png` | 1300 | 500 × 850 | 132 | 22 | 191 | 775 | od prstů do spodku rámu (~75 px) |
| | | 1440 | 510 × 901 | 137 | 23 | 194 | 805 | od prstů do spodku rámu (~96 px) |
| O mně — Důvěra | `patrik-omne-hero.webp` | 1300 | 503 × 762 | 104 | 16 | 247 | 606 | 78 % → 99 % + šikmo přes nohu vpravo dole |
| | | 1440 | 586 × 887 | 121 | 19 | 288 | 705 | 〃 |
| Přístup — hero | `patrik-pristup.png` | 1300 | 470 × 798 | 117 | 18 | 191 | 744 | od prstů do spodku rámu (~54 px) |
| | | 1440 | 490 × 862 | 123 | 19 | 198 | 783 | od prstů do spodku rámu (~79 px) |
| Přístup — Péče (kulatý portrét) | `patrik-pristup-pece.png` | 1300 | 220 × 220 | 82 | 30 | 108 | — | žádné, kruh s pozadím `--about-photo-1` |
| | | 1440 | 240 × 240 | 90 | 33 | 118 | — | 〃 |

Nad 1440 px se hodnoty nemění (rám má stejnou velikost, jen se posouvá
s pravou stranou obsahu).

## Pravidla, která platí pro všechny fotky

- Hero fotky mají stejně velkou postavu (hlava 116–137 px), druhé fotky
  (homepage „Za každým…", O mně Důvěra) stejnou menší (104/121 px).
- Ruce vždy celé vidět; rozpouštění až pod nimi, nikdy tvrdá hrana ve vzduchu.
- Hero fotka začíná 60 px pod hlavičkou; od nadpisu první kapitoly pod ní
  aspoň ~60 px (O mně 70/77, Přístup 62/66).
- Postava stojí před dekorativní linkou (z-index nad trasou).
- Na širokém monitoru jde fotka s pravou stranou obsahu.
- Mobil a tablet zatím ladí zvlášť (viz další úprava).
