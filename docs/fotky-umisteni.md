# Usazení fotek — závazný stav (desktop, 28. 9. 2026)

**Desktop schválen Patrikem 28. 9. 2026** — homepage, O mně a Přístup
prohlédnuté a odsouhlasené na 1280, 1366, 1440, 1920 a 2560 px.

**Finální fotky od 6. 10. 2026** (focení Vladislav Mach, originály 38 Mpx
v `fotky-nove/` — mimo git). Výřezy mají STEJNÉ rámování jako dřívější
testovací fotky (stejné snímky, poloha nalezená shodou bodů SIFT), jen ve
vyšším rozlišení (hlava ~300 px zdroje), WebP kvalita 92. Poměr stran se
nezměnil, takže CSS i hodnoty níže platí beze změny; ověřeno měřením na
1300/1440 px (odchylka do ~2 px). Stránky posílají fotku ve více rozměrech
(`getImage`/`Picture` + `srcset`), telefon stahuje menší verzi.

**Postup z originálu** (`scripts/fotky/`, Python 3.12 + rembg + pymatting +
opencv; originály a mezivýstupy v `fotky-nove/`):

1. `1-vyriznout.py <id…>` — maska BiRefNet-portrait (celá postava + zvlášť
   hlava a ramena), zpřesnění hran alpha mattingem, dekontaminace barev na
   okraji (bez šedého lemu studiového pozadí), úklid drobných teček.
   **Retuš trička:** úplet má rozteč ~3,5 px originálu a při zmenšení by
   vytvořil moaré „pruhy“ — v plném rozlišení se proto vyhladí JEN tričko
   (maska podle barvy), obličej, vlasy a ruce zůstávají nedotčené.
   Výstup `bez-pozadi-v2/` (3600 px, pro web) a `bez-pozadi-plne/`
   (plné rozlišení, archiv).
1b. `1b-zjemnit-zahyby.py <id> 0.5` — záhyby na tričku a kalhotách zjemněné
   o 50 % (frekvenční separace jasu; struktura látky, tvar těla a ostré
   hrany — límec, knoflíky, logo, lemy — zůstávají).
1c. `1c-brisko.py <id> 50 0.5 3` — břicho: stínování v oblasti pupku
   zploštěné o 50 %, pas stažený o 3 % (u `…_312` jen stín, obrys 0 —
   sepnuté ruce leží před břichem a posunuly by se). Schválená sada
   (Patrik, 6. 10. 2026: „nechám si poradit“) → `fotky-nove/finalni/`.
2. `2-najit-vyrez.py vyrezy.json` — kde ve fotce leží schválený výřez.
3. `3-export-web.py vyrezy.json <složka>` — WebP výřezy z `finalni/` do
   `src/assets/photos/`.
4. `4-archiv.py 330:3 252:3 259:3 325:3 312:0` — stejná retuš v plném
   rozlišení originálu → `fotky-nove/finalni-plne/` (pro sítě, tisk).

Usazení níže schválil Patrik. **Každá další výměna fotky musí na webu
vypadat PŘESNĚ takhle** — stejně velká hlava, stejné místo temene, hlavy
a prstů v rámu, stejné rozpouštění. Rám (velikost a poloha bloku fotky)
se NEMĚNÍ.

| Místo | Snímek (originál) |
|---|---|
| Homepage — hero | `…_330` |
| Homepage — „Za každým doporučením…" | `…_252` |
| O mně — hero; Přístup — Péče, avatary | `…_312` |
| O mně — Důvěra | `…_259` |
| Přístup — hero | `…_325` |

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
| O mně — hero | `patrik-omne-hero-top.png` | 1300 | 500 × 768 | 117 | 22 | 191 | 716 | od prstů do spodku rámu (~52 px, jako Přístup); rám bez ořezu (prsty volné ruky smí vyčnívat vlevo, na tabletu ~25 px) |
| | | 1440 | 510 × 828 | 123 | 23 | 194 | 752 | od prstů do spodku rámu (~76 px, jako Přístup) |
| O mně — Důvěra | `patrik-omne-hero.webp` | 1300 | 503 × 762 | 104 | 16 | 247 | 687 | od prstů do spodku výřezu (93,6 % → 99,5 % výšky fotky); výřez od 1. 10. 2026 končí u stehen, spodních ~29 px rámu zůstává prázdných |
| | | 1440 | 586 × 887 | 121 | 19 | 288 | 800 | 〃 (~34 px prázdných) |
| Přístup — hero | `patrik-pristup.png` | 1300 | 470 × 798 | 117 | 18 | 191 | 744 | od prstů do spodku rámu (~54 px) |
| | | 1440 | 490 × 862 | 123 | 19 | 198 | 783 | od prstů do spodku rámu (~79 px) |
| Přístup — Péče (kulatý portrét) | `patrik-pristup-pece.png` | 1300 | 220 × 220 | 82 | 30 | 108 | — | žádné, kruh s pozadím `--about-photo-1` |
| | | 1440 | 240 × 240 | 90 | 33 | 118 | — | 〃 |

Nad 1440 px se hodnoty nemění (rám má stejnou velikost, jen se posouvá
s pravou stranou obsahu).

## Pravidla, která platí pro všechny fotky

- Hero fotky mají stejně velkou postavu (hlava 116–123 px; od 1. 10. 2026
  i O mně, dřív 132/137 px — Patrik: „větší než v ostatních hero“), druhé fotky
  (homepage „Za každým…", O mně Důvěra) stejnou menší (104/121 px).
- Ruce vždy celé vidět; rozpouštění až pod nimi, nikdy tvrdá hrana ve vzduchu.
- Hero fotka začíná 60 px pod hlavičkou; od nadpisu první kapitoly pod ní
  aspoň ~60 px (O mně 70/77, Přístup 62/66).
- Postava stojí před dekorativní linkou (z-index nad trasou).
- Na širokém monitoru jde fotka s pravou stranou obsahu.
- Mobil a tablet zatím ladí zvlášť (viz další úprava).
