# Úkol pro Claude Code — sekce „Co řešíte?“ (Vodorovná osa, tmavá)

**Projekt:** patrikgajdadzis.cz
**Stack:** Astro + TypeScript + čisté CSS
**Rozsah:** pouze jedna sekce — bezprostředně pod sekcí „Neřeším produkty. Řeším souvislosti.“

---

## 1. Nejdřív si přečti dokumentaci

Před jakýmkoli zápisem do kódu přečti a považuj za závazné zadání:

1. `docs/brand-experience-brief.md`
2. `docs/content-homepage.md` — §5 Rozcestník podle situace klienta
3. `docs/design-direction.md`
4. `docs/art-direction-financial-architecture.md`
5. `design-exploration/financial-architecture/approved-hero/hero-implementation-spec.md` — tokeny, breakpointy, typografie a přístupnost platí i zde
6. `design-exploration/financial-architecture/section-connections/claude-code-task-s2.md` — odtud přebíráš způsob práce s linkou a pravidlo kotev (jedna kotva řídí tečku i text)

**Zdrojem pravdy pro tuto sekci je tento dokument.** Vizuální náhled varianty „Vodorovná osa“ existuje jen v návrhovém prostředí a v projektu k dispozici není — veškerá geometrie, kterou potřebuješ, je proto úplně vypsaná v §4 (desktop), §5 (tablet) a §6 (mobil). Nedopočítávej nic, co je tam uvedené, a nic si nedomýšlej; pokud by některá hodnota chyběla nebo si dvě místa odporovala, **zastav se a zeptej**, neřeš to vlastním rozhodnutím.

Sekce vychází z tmavé varianty „Vodorovná osa“. Světlé varianty rozcestníku byly zamítnuty — pokud na ně někde narazíš, neimplementuj je.

---

## 2. Co implementovat

Jednu tmavou sekci obsahující pouze:

1. nadpis `Co řešíte?` (`<h2>`),
2. pět klikacích oblastí rozmístěných podél jedné vodorovné osy,
3. pokračování kontinuální linky z předchozí sekce.

Nic dalšího. Žádný úvodní text, žádný eyebrow, žádné doplňující věty.

### Texty — kopírovat přesně, nepřepisovat, nic nepřidávat

| Prvek | Text |
|---|---|
| Nadpis | `Co řešíte?` |
| 1 | `Bydlení` — `Hypotéka, výstavba, rekonstrukce nebo refinancování.` |
| 2 | `Finanční plán` — `Přehled, rezervy a dlouhodobé cíle.` |
| 3 | `Investice` — `Tvorba majetku podle cíle a času.` |
| 4 | `Pojištění` — `Ochrana příjmu, rodiny a majetku.` |
| 5 | `Důchod` — `Plán budoucího příjmu a finanční rezervy.` |
| CTA u každé oblasti | `Více` |

`Více` je u **všech pěti** oblastí a na **všech** šířkách. Pozor: pátá oblast se jmenuje `Důchod`, ne „Penze“ — stejně jako v předchozí sekci.

---

## 3. Kompoziční princip

Kontinuální linka sem přichází z předchozí sekce, sjede levým okrajem a **narovná se do jedné dlouhé vodorovné osy** přes celou šířku. Pět oblastí na této ose visí **střídavě nad a pod ní** — proto v sekci nikde nevzniká mřížka ani sloupce. Střídání nutí oko projít osu zleva doprava, tedy v pořadí, v jakém se situace řeší. Za poslední kotvou se osa zalomí a pokračuje dolů do další sekce.

Nadpis je odsazený od svislého úseku linky o **56 px** (mobil 32 px) — nesedí na lince, ale respektuje ji jako levý břeh. Toto odsazení platí na všech šířkách.

Dominance: `Bydlení` je nad osou, má největší tečku a dvojnásobné písmo. Ostatní čtyři mají shodnou váhu.

---

## 4. Desktop 1440 px

Rám sekce: `viewBox="0 0 1440 1000"`, výška 1000 px. Obsahová linka vpravo je **1320 px** — žádný prvek ji nesmí přesáhnout.

**Pozadí (dvě vrstvy):**
- `linear-gradient(196deg, #16324F 0%, #0F2747 52%, #0B1D36 100%)` přes celou plochu
- nad ní světelný akcent: `left/right 0, top 280px, height 520px`, `radial-gradient(38% 60% at 22% 50%, rgba(46,152,115,0.13) 0%, rgba(46,152,115,0) 74%)`

**Linka** (`stroke-width: 1`, `stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`, barva `#9CB6D4`, `opacity: .3`):

```
M 1300 -20 V 68 A 28 28 0 0 1 1272 96 H 148 A 28 28 0 0 0 120 124 V 532 A 28 28 0 0 0 148 560 H 1272 A 28 28 0 0 1 1300 588 V 1000
```
Radius všech lomů 28 px. Na tmavém podkladu je linka světlá — **nepoužívej** modrou `#1B4A8A` z předchozích sekcí; jde o stejnou linku v jiném prostředí, přesně jako v mobilním hero.

**Kotvy** — všech pět leží na vodorovném úseku `y = 560`, `x` 148→1272, rozteč je rovnoměrná:

| # | Oblast | Kotva | Pozice bloku | Šířka | Tečka |
|---|---|---|---|---|---|
| 1 | `Bydlení` | `260, 560` | nad osou, `top 352` | 220 px | r 4, `#1E7A5C` |
| 2 | `Finanční plán` | `480, 560` | pod osou, `top 600` | 200 px | r 2.6, `#9CB6D4` @ .65 |
| 3 | `Investice` | `700, 560` | nad osou, `top 404` | 200 px | r 2.6, `#9CB6D4` @ .65 |
| 4 | `Pojištění` | `920, 560` | pod osou, `top 600` | 200 px | r 2.6, `#9CB6D4` @ .65 |
| 5 | `Důchod` | `1120, 560` | nad osou, `top 404` | 200 px | r 2.6, `#9CB6D4` @ .65 |

Levá hrana bloku = `x` kotvy. Rozteč 220 px byla zvolena tak, aby pravá hrana posledního bloku dosedla přesně na 1320 — **při jakékoli změně rozteče nebo šířky bloku to ověř znovu**.

**Typografie:**
| Prvek | Hodnoty |
|---|---|
| Nadpis | `left 176`, `top 180`, 72 px / 1 / 700 / −0.05em / `#FFFFFF` |
| `Bydlení` | 46 px / 1 / 700 / −0.045em / `#FFFFFF` |
| ostatní názvy | 30 px / 1 / 700 / −0.04em / `#FFFFFF` |
| popisek u `Bydlení` | 16 px / 1.55 / `rgba(255,255,255,.72)`, `text-wrap: pretty` |
| ostatní popisky | 15 px / 1.5 / `rgba(255,255,255,.56)` |
| `Více` u `Bydlení` | 15 px / 600 / `#FFFFFF` + vlasová linka `#1E7A5C` pod ním |
| `Více` u ostatních | 14 px / 600 / `#8FD3B9` |

Vnitřní mezery bloku: dominanta `gap 10px`, ostatní `gap 7px`, `Více` s `margin-top: 2px`.

---

## 5. Tablet 834 px

Střídání nad/pod osou **zmizí** — na úzké šířce by rozbilo pořadí. Osa se **otočí do svislice** u levého okraje se zářezy ke kotvám, tedy stejná konstrukce jako v mobilní finanční mapě.

Rám `viewBox="0 0 834 1100"`, výška 1100 px, okraje 40 px.

**Pozadí:** stejný gradient (`196deg`); akcent `top 240px, height 480px`, `radial-gradient(50% 50% at 26% 46%, rgba(46,152,115,0.12) 0%, transparent 74%)`.

**Linka:** `M 794 -20 V 56 A 22 22 0 0 1 772 78 H 62 A 22 22 0 0 0 40 100 V 1100`, radius 22 px.
**Zářezy:** `M 40 {y} H 90` pro `y` = 336, 560, 700, 840, 980.
**Tečky** na `90, {y}`: první r 3.4 `#1E7A5C`, ostatní r 2.4 `#9CB6D4` @ .65.

**Obsah:** nadpis `left 96`, `top 150`, 56 px. Bloky `left 110`, `right 40`; `Bydlení` `top 300` (40 px / popisek 16.5 px, max-width 420) a čtyři ostatní na `top` 534 / 674 / 814 / 954 (28 px / popisek 15 px / `Více` 14 px). Rozteč 140 px.

---

## 6. Mobil 390 px

Stejný princip jako tablet, jen sevřenější. **Není to zmenšený desktop.**

Rám `viewBox="0 0 390 1020"`, výška 1020 px, odsazení vlevo 24 px, vpravo 24 px.

**Pozadí:** gradient `196deg`; akcent `top 200px, height 420px`, `radial-gradient(74% 44% at 30% 40%, rgba(46,152,115,0.13) 0%, transparent 74%)`.

**Linka:** `M 366 -20 V 52 A 18 18 0 0 1 348 70 H 42 A 18 18 0 0 0 24 88 V 1020`, radius 18 px.
**Zářezy:** `M 24 {y} H 46` pro `y` = 268, 480, 604, 728, 852.
**Tečky** na `46, {y}`: první r 3.2 `#1E7A5C`, ostatní r 2.4 `#9CB6D4` @ .65.

**Obsah:** nadpis `left 56`, `top 122`, 42 px. Bloky `left 60`, `right 24`; `Bydlení` `top 238` (36 px / popisek 16 px), ostatní na `top` 456 / 580 / 704 / 828 (24 px / 1.1 / popisek 15 px / `Více` 14 px). Rozteč 124 px.

Horizontální posouvání je zakázané — nic nesmí přetéct mimo `overflow-x: hidden` obal sekce.

---

## 7. Interakce

- **Klikací je celý blok oblasti**, `Více` je jen vizuální afordance — ne samostatný odkaz uvnitř dalšího odkazu.
- Hover: název přejde do `#8FD3B9`, popisek zvýší krytí o jeden stupeň, tečka na ose se zvětší o 1 px. Žádné posuny, žádné stíny, žádné pozadí.
- Dominanta má `Více` s trvalou smaragdovou vlasovou linkou; v hoveru linka ztmavne.
- Pohyb: **osa se vykresluje zleva doprava podle scrollu** (`stroke-dashoffset`) a jak míjí tečku, oblast se vysune směrem od osy — nahoru, nebo dolů (`translateY ±14px` → 0, 350–450 ms, `ease-out`). Nadpis nabíhá jako první. Na tabletu a mobilu se osa vykresluje shora dolů.
- `prefers-reduced-motion: reduce` → animace vypnuté, osa plně vykreslená, obsah okamžitě ve finálním stavu.

Zakázané: parallax, loader, carousel, animace po písmenech, animace nutná k přečtení obsahu.

---

## 8. Přístupnost

**Pořadí v DOM** (jedno pro všechny šířky, odpovídá pořadí čtení na mobilu):

1. `<section aria-labelledby="co-resite">`
2. `<h2 id="co-resite">Co řešíte?</h2>`
3. `<ol>` s pěti `<li>`, v každém `<a>` obalující název, popisek a `Více` — pořadí je významové, proto číslovaný seznam (vizuálně bez čísel a odrážek)
4. dekorativní SVG osa — `aria-hidden="true"`, `focusable="false"`, v DOM až za seznamem

**Pravidla:**
- `<h2>`, nikdy `<h1>`
- každá oblast je jeden `<a>`; `Více` je uvnitř tohoto odkazu jako `<span>`, ne vnořený odkaz
- `Více` samo o sobě nesmí být přístupný název odkazu — přístupný název odkazu je název oblasti (např. `aria-label="Bydlení"` nebo pořadí obsahu, kde název je první)
- minimální dotyková plocha **48×48 px**; na mobilu a tabletu má blok oblasti výšku ≥ 80 px
- `:focus-visible`: `outline: 2px solid #8FD3B9; outline-offset: 4px`
- kontrast na `#0F2747`: bílé názvy ≈ 14:1 ✓; popisky `rgba(255,255,255,.56)` na 15 px — **ověř měřením**, musí být ≥ 4.5:1, jinak zvyš krytí (ne velikost); `#8FD3B9` ≈ 8:1 ✓
- osa je dekorace: informaci nese pouze text a pořadí v `<ol>`
- **bez JavaScriptu** je celá sekce viditelná, osa plně vykreslená a všechny odkazy funkční

---

## 9. Technické požadavky

- Astro komponenta (např. `src/components/RouterSection.astro`), TypeScript (`strict`), čisté CSS.
- **Nezaváděj nové barvy.** Použij tokeny z hero: `--navy` `#0F2747`, `--emerald` `#1E7A5C`, `--emerald-light` `#8FD3B9`, `--line-on-dark` `#9CB6D4`, `#FFFFFF`. Odstíny gradientu (`#16324F`, `#0B1D36`, `#15304C`) přidej jako tokeny, pokud v projektu ještě nejsou.
- Kotvy řeš přes CSS custom properties (`--x`, `--y`, `--side` = `above`/`below`) na jednotlivých `<li>` — ne inline styly v šabloně, ne magická čísla rozesetá po CSS. Stejný princip jako v revizi 2 předchozí sekce.
- Osa jako inline SVG, ne obrázek, ne `background-image`. Tři varianty osy (desktop / tablet / mobil) přepínané `@media`, aby se nedeformoval `viewBox`.
- Sekce navazuje na předchozí bez mezery; linka musí opticky pokračovat ze stejné osy (`x = 120` desktop, `40` tablet, `24` mobil).
- Manrope, řezy 500/600/700, self-hosted, latin + latin-ext.

---

## 10. Zákazy

- **Nepřepisuj a nepřidávej texty.** Žádný úvodní odstavec, žádný eyebrow, žádné popisky nad rámec tabulky v §2. Pátá oblast je `Důchod`.
- **Nepřidávej vlastní designové prvky** — žádné ikony, karty, boxy, badge, šipky u `Více`, stíny ani nové barvy.
- **Nedělej z osy diagram** — žádné spojnice mezi oblastmi, žádná síť uzlů, žádné další tečky, žádná čísla kroků. Sekce nesmí být čtena jako časová osa nebo proces.
- **Neměň hero, statistický pás ani sekci „Neřeším produkty. Řeším souvislosti.“**
- **Nevytvářej další sekce homepage** — nic pod touto sekcí, ani footer, ani formulář.
- **Nepoužívej Tailwind** ani jiný velký UI/CSS framework a žádnou komponentovou knihovnu. Pouze čisté CSS.
- **Nedělej deploy** a **nepushuj na GitHub.**
- **Nezasahuj do existujících dokumentů.** `docs/` a `design-exploration/` zůstanou beze změny.
- Žádný druhý font, žádné glassmorphism, žádné analytické ani cookie skripty.

---

## 11. Kontrola před dokončením

1. `npm run build` bez chyb a varování; konzole v dev serveru čistá.
2. **Žádný prvek nepřesahuje obsahovou linku** — desktop 1320 px, tablet 794 px, mobil 366 px. Změř pravé hrany všech pěti bloků.
3. Všech pět teček leží přesně na ose; celkem právě 5 teček, jen první je smaragdová.
4. Střídání nad/pod osou funguje na desktopu, na tabletu a mobilu je osa svislá se zářezy.
5. `Více` je u všech pěti oblastí na všech třech šířkách.
6. Nadpis je odsazený od svislého úseku linky o 56 px (mobil 32 px) na všech šířkách.
7. Osa nikde nekříží písmena; minimální odstup textu od osy 20 px.
8. Ověř 1440, 1366, 834 a 390 px proti hodnotám v §4–§6 (tolerance ±2 px) a projdi i 1024, 1180, 1280 a 1536 px — nic se nepřekrývá.
9. Na mobilu nevzniká horizontální posouvání.
10. Vypnutý JavaScript: sekce viditelná, osa vykreslená, odkazy funkční.
11. `prefers-reduced-motion: reduce`: nic se neanimuje.
12. Kontrast popisků změřen a splňuje 4.5:1.
13. `docs/` a `design-exploration/` beze změny.

---

## 12. Co vypsat na konci

Pouze:

1. **Vytvořené a upravené soubory.**
2. **Potvrzení, že design nebyl změněn** — rozměry, kotvy, barvy, typografie ani texty neodpovídají žádné vlastní úpravě.
3. **Potvrzení, že nebyl vytvořen zdrojový kód nad rámec zadání** — vznikla pouze tato jedna sekce, žádná další část homepage, žádný deploy, žádný push.

Nic dalšího nekomentuj.

---

## Dodatek — notebook mezistupeň 1200–1399 px

Při implementaci se ukázalo, že na 1200–1399 px se linka rozjížděla od navazující sekce nad touto (`ConnectionsSection.astro`), protože ta má vlastní notebook mezistupeň kalibrovaný na 1366 px (přechod na plný desktop až při 1400 px), zatímco toto zadání mělo jen tři stupně (tablet do 1199, desktop od 1200). Po odsouhlasení bylo doplněno: **desktop tier ze zadání (§4) nyní platí od 1400 px**, a 1200–1399 px má vlastní geometrii proporčně odvozenou z §4 stejnou afinní transformací (x' = 0,977966·x − 21,356), jakou používá notebook varianta trasy v `ConnectionsSection.astro` — y-hodnoty, poloměry i šířky bloků zůstávají stejné jako v §4, mění se jen x. Sjednocuje to hranici mezistupně s předchozí sekcí, takže linka navazuje bez mezery na libovolné šířce.
