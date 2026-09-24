# Úkol pro Claude Code — sekce „Jednoduše. Bez tlaku.“ (Klesající trasa)

**Projekt:** patrikgajdadzis.cz
**Stack:** Astro + TypeScript + čisté CSS
**Rozsah:** pouze jedna sekce — bezprostředně pod sekcí „Co řešíte?“

---

## 1. Nejdřív si přečti dokumentaci

Před jakýmkoli zápisem do kódu přečti a považuj za závazné zadání:

1. `docs/brand-experience-brief.md`
2. `docs/content-homepage.md` — §6 Jak spolupráce probíhá
3. `docs/design-direction.md`
4. `docs/art-direction-financial-architecture.md`
5. `design-exploration/financial-architecture/approved-hero/hero-implementation-spec.md` — tokeny, breakpointy, typografie a přístupnost platí i zde
6. `design-exploration/financial-architecture/section-connections/claude-code-task-s2.md` — pravidlo kotev (jedna kotva řídí tečku i text)
7. `design-exploration/financial-architecture/section-router/claude-code-task-router.md` — předchozí sekce; odtud přebíráš odsazení nadpisu od linky a výstupní osu trasy

**Zdrojem pravdy pro tuto sekci je tento dokument.** Vizuální náhled existuje jen v návrhovém prostředí a v projektu k dispozici není — veškerá geometrie je proto úplně vypsaná v §4 (desktop), §5 (tablet) a §6 (mobil). Nedopočítávej nic, co je tam uvedené. Pokud by hodnota chyběla nebo si dvě místa odporovala, **zastav se a zeptej**.

---

## 2. Co implementovat

Jednu světlou sekci obsahující pouze:

1. nadpis `Jednoduše. Bez tlaku.` (`<h2>`),
2. tři kroky spolupráce na třech kotvách trasy,
3. primární CTA `Nezávazná konzultace`,
4. pokračování kontinuální linky z předchozí sekce.

Nic dalšího. Žádný úvodní text, žádný eyebrow, žádná čísla kroků.

### Texty — kopírovat přesně, nepřepisovat, nic nepřidávat

| Prvek | Text |
|---|---|
| Nadpis | `Jednoduše. Bez tlaku.` |
| Krok 1 — název | `Poznám vaši situaci` |
| Krok 1 — popis | `Probereme cíle, současné nastavení a to, co potřebujete vyřešit.` |
| Krok 2 — název | `Navrhnu další postup` |
| Krok 2 — popis | `Ukážu vám možnosti, souvislosti a své doporučení.` |
| Krok 3 — název | `Postarám se o realizaci` |
| Krok 3 — popis | `Pomohu s vyřízením a zůstávám vám k dispozici i dál.` |
| CTA | `Nezávazná konzultace` |

---

## 3. Kompoziční princip

Sekce je **světlá** — navazuje na tmavý rozcestník, takže rytmus stránky zůstává střídavý. Nikdy ji nedělej tmavou.

Kontinuální linka přichází z předchozí sekce, přejede horní hranou doleva a **klesá třemi zaoblenými lomy** k pravému okraji, kde sestupuje do další sekce. Tři kroky sedí na jejích kotvách — dvě na vodorovných úsecích, jedna na svislém.

**Kroky nejsou číslované.** Posloupnost nese samotné klesání trasy a smaragdová první tečka. Nepřidávej ordinály, kruhy, šipky ani spojnice mezi kroky — jinde na webu se čísla nepoužívají a sekce nesmí být čtena jako časová osa.

Všechny tři kroky mají **stejnou váhu** (content dokument: nejvýraznější jsou názvy kroků). Žádná dominanta.

Nadpis je odsazený od svislého úseku linky o **56 px** (mobil 32 px) — stejné pravidlo jako v předchozí sekci. CTA stojí v prázdném prostoru vlevo dole, na stejné ose jako nadpis.

---

## 4. Desktop 1440 px

Rám: `viewBox="0 0 1440 1060"`, výška 1060 px, pozadí `--bg` `#F8FAFC`. Obsahová linka vpravo je **1320 px** — žádný prvek ji nesmí přesáhnout.

**Linka** (`stroke-width: 1`, `stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`, `#1B4A8A`, `opacity: .18`):

```
M 1300 -20 V 88 A 28 28 0 0 1 1272 116 H 148 A 28 28 0 0 0 120 144 V 380 A 28 28 0 0 0 148 408 H 600 A 28 28 0 0 1 628 436 V 662 A 28 28 0 0 0 656 690 H 1272 A 28 28 0 0 1 1300 718 V 1060
```
Radius všech lomů 28 px. Výstup na `x = 1300` je stejný jako u předchozí i následující sekce — neměň ho.

**Kotvy a bloky kroků:**

| # | Krok | Kotva | Úsek | Blok (left / top) | Šířka | Tečka |
|---|---|---|---|---|---|---|
| 1 | `Poznám vaši situaci` | `240, 408` | h (`y=408`, x 148→600) | 264 / 432 | 340 px | r 3.5, `#1E7A5C` |
| 2 | `Navrhnu další postup` | `628, 538` | v (`x=628`, y 436→662) | 652 / 562 | 400 px | r 2.6, `#1B4A8A` @ .5 |
| 3 | `Postarám se o realizaci` | `800, 690` | h (`y=690`, x 656→1272) | 824 / 714 | 400 px | r 2.6, `#1B4A8A` @ .5 |

Offset bloku od kotvy je vždy **+24 / +24** (dolů a vpravo). Šířky 400 px u kroků 2 a 3 nejsou dekorativní — při nižší šířce se jejich názvy zlomí na dva řádky, blok naroste na 160 px a **překryje následující krok**. Pokud šířku měníš, přeměř výšky.

**Typografie a CTA:**

| Prvek | Hodnoty |
|---|---|
| Nadpis | `left 176`, `top 196`, měřítko 820 px, 72 px / 1.02 / 700 / −0.05em / `--navy`; jeden řádek, bez pevné výšky |
| Název kroku | 34 px / 1.05 / 700 / −0.04em / `--navy` |
| Popis kroku | 16.5 px / 1.6 / `--text-muted` `#52657D`, `text-wrap: pretty` |
| Mezera v bloku | `gap: 10px` |
| CTA | `left 176`, `top 880`, výška 58 px, `padding: 0 30px`, radius 14 px, `--emerald`, text 16 px / 600 / bílý |

---

## 5. Tablet 834 px

Klesající trasa se **otočí do svislice** u levého okraje se zářezy ke kotvám — stejná konstrukce jako v mobilní finanční mapě. Kroky jdou pod sebe.

Rám `viewBox="0 0 834 1080"`, výška 1080 px, okraje 40 px.

**Linka:** `M 794 -20 V 56 A 22 22 0 0 1 772 78 H 62 A 22 22 0 0 0 40 100 V 1080`, radius 22 px.
**Zářezy:** `M 40 {y} H 90` pro `y` = 340, 552, 764.
**Tečky** na `90, {y}`: první r 3.2 `#1E7A5C`, další dvě r 2.4 `#1B4A8A` @ .5.

**Obsah:**
- nadpis `left 96` (= 40 + 56), `top 150`, měřítko 520 px, 54 px / 1.02
- bloky kroků `left 110`, `right 40`, `top` 314 / 526 / 738 — rozteč 212 px
- název 30 px / 1.05, popis 16 px / 1.6, `max-width: 440px`, `gap: 8px`
- CTA `left 110`, `top 930`, výška 56 px, `padding: 0 28px`

---

## 6. Mobil 390 px

Stejný princip jako tablet, sevřenější. **Není to zmenšený desktop.**

Rám `viewBox="0 0 390 1020"`, výška 1020 px, odsazení vlevo 24 px, vpravo 24 px.

**Linka:** `M 366 -20 V 52 A 18 18 0 0 1 348 70 H 42 A 18 18 0 0 0 24 88 V 1020`, radius 18 px.
**Zářezy:** `M 24 {y} H 46` pro `y` = 300, 502, 704.
**Tečky** na `46, {y}`: první r 3.2 `#1E7A5C`, další dvě r 2.4 `#1B4A8A` @ .5.

**Obsah:**
- nadpis `left 56` (= 24 + 32), `right 24`, `top 120`, 40 px / 1.02
- bloky kroků `left 60`, `right 24`, `top` 276 / 478 / 680 — rozteč 202 px
- název 26 px / 1.1, popis 15.5 px / 1.55, `gap: 7px`
- CTA `left 60`, `right 24`, `top 882`, výška 56 px, **přes celou šířku**, text vycentrovaný

Horizontální posouvání je zakázané.

---

## 7. Interakce

- CTA je odkaz na kontaktní sekci. Hover: `background: --emerald-hover` `#155F47`, 180 ms. `:focus-visible`: `outline: 2px solid --emerald; outline-offset: 3px`. Active: `translateY(1px)`.
- Kroky **nejsou klikací** — nejde o rozcestník, jen o vysvětlení postupu. Žádný hover stav.
- Pohyb: trasa se vykresluje podle scrollu (`stroke-dashoffset`); jak míjí kotvu, krok se objeví (`opacity 0→1` + `translateY(12px→0)`, 350–450 ms, `ease-out`). Nadpis nabíhá první, CTA naposledy — až trasa dosáhne spodní hrany.
- `prefers-reduced-motion: reduce` → animace vypnuté, trasa plně vykreslená, obsah okamžitě ve finálním stavu.

Zakázané: parallax, loader, carousel, animace po písmenech, animace nutná k přečtení obsahu.

---

## 8. Přístupnost

**Pořadí v DOM** (jedno pro všechny šířky, odpovídá pořadí čtení na mobilu):

1. `<section aria-labelledby="jak-probiha">`
2. `<h2 id="jak-probiha">Jednoduše. Bez tlaku.</h2>`
3. `<ol>` se třemi `<li>`, v každém název (`<h3>`) a popis (`<p>`) — pořadí je významové, proto číslovaný seznam, vizuálně bez čísel a odrážek
4. CTA `<a>`
5. dekorativní SVG trasa — `aria-hidden="true"`, `focusable="false"`, v DOM až za obsahem

**Pravidla:**
- `<h2>` pro nadpis sekce, `<h3>` pro názvy kroků; nikdy `<h1>`
- vizuální odstranění číslování řeš `list-style: none`, ale **zachovej `<ol>`** — čtečka musí přečíst kroky jako 1–3
- CTA je `<a>`, nikdy `<div>` s `onclick`; dotyková plocha ≥ 48×48 px (má 56–58 px)
- kontrast na `#F8FAFC`: `--navy` ≈ 14:1 ✓; popisky `#52657D` ≈ 6:1 ✓; bílá na `--emerald` ≈ 4.6:1 ✓
- trasa je dekorace: informaci nese pouze text a pořadí v `<ol>`
- **bez JavaScriptu** je celá sekce viditelná, trasa plně vykreslená a CTA funkční

---

## 9. Technické požadavky

- Astro komponenta (např. `src/components/ProcessSection.astro`), TypeScript (`strict`), čisté CSS.
- **Nezaváděj nové barvy.** Použij existující tokeny: `--navy` `#0F2747`, `--bg` `#F8FAFC`, `--emerald` `#1E7A5C`, `--emerald-hover` `#155F47`, `--line` `#1B4A8A`, `--text-muted` `#52657D`.
- Kotvy řeš přes CSS custom properties (`--x`, `--y`) na jednotlivých `<li>` — ne inline styly v šabloně, ne magická čísla rozesetá po CSS. Stejný princip jako v předchozích sekcích.
- Trasa jako inline SVG, ne obrázek, ne `background-image`. Tři varianty trasy (desktop / tablet / mobil) přepínané `@media`, aby se nedeformoval `viewBox`.
- Sekce navazuje na předchozí bez mezery; trasa musí opticky pokračovat ze stejné osy (`x = 1300` desktop, `794` tablet, `366` mobil).
- Manrope, řezy 500/600/700, self-hosted, latin + latin-ext.

---

## 10. Zákazy

- **Nepřepisuj a nepřidávej texty** — žádný úvodní odstavec, žádný eyebrow, žádné popisky nad rámec §2.
- **Nepřidávej čísla kroků** ani ordinály, kruhy, odznaky, šipky nebo spojnice mezi kroky.
- **Nedělej sekci tmavou** — je světlá, navazuje na tmavý rozcestník.
- **Nepřidávej vlastní designové prvky** — žádné ikony, karty, boxy, stíny ani nové barvy.
- **Neměň hero, statistický pás, finanční mapu ani rozcestník.**
- **Nevytvářej další sekce homepage** — nic pod touto sekcí, ani footer, ani formulář.
- **Nepoužívej Tailwind** ani jiný velký UI/CSS framework a žádnou komponentovou knihovnu. Pouze čisté CSS.
- **Nedělej deploy** a **nepushuj na GitHub.**
- **Nezasahuj do existujících dokumentů.** `docs/` a `design-exploration/` zůstanou beze změny.
- Žádný druhý font, žádné glassmorphism, žádné analytické ani cookie skripty.

---

## 11. Kontrola před dokončením

1. `npm run build` bez chyb a varování; konzole v dev serveru čistá.
2. **Žádný prvek nepřesahuje obsahovou linku** — desktop 1320 px, tablet 794 px, mobil 366 px.
3. **Bloky kroků se nikde nepřekrývají** — změř všechny tři páry na každé šířce. Na desktopu musí být výška bloku menší než rozteč kotev (130 px u kroků 1→2, 152 px u 2→3).
4. **Trasa nikde nekříží písmena** — minimální odstup 20 px od každého textu; ověř zvlášť u třetího kroku a výstupní svislice `x = 1300`.
5. Tři tečky leží přesně na trase, jen první je smaragdová; celkem právě 3 tečky.
6. Nikde nejsou čísla kroků.
7. Nadpis je odsazený od svislého úseku linky o 56 px (mobil 32 px) na všech šířkách.
8. Poslední krok končí nad CTA a CTA nad spodní hranou rámu.
9. Ověř 1440, 1366, 834 a 390 px proti §4–§6 (tolerance ±2 px) a projdi i 1024, 1180, 1280 a 1536 px.
10. Na mobilu nevzniká horizontální posouvání.
11. Vypnutý JavaScript: sekce viditelná, trasa vykreslená, CTA funkční.
12. `prefers-reduced-motion: reduce`: nic se neanimuje.
13. Čtečka přečte kroky jako seznam 1–3, přesto nejsou vizuálně číslované.
14. `docs/` a `design-exploration/` beze změny.

---

## 12. Co vypsat na konci

Pouze:

1. **Vytvořené a upravené soubory.**
2. **Potvrzení, že design nebyl změněn** — rozměry, kotvy, barvy, typografie ani texty neodpovídají žádné vlastní úpravě.
3. **Potvrzení, že nebyl vytvořen zdrojový kód nad rámec zadání** — vznikla pouze tato jedna sekce, žádná další část homepage, žádný deploy, žádný push.

Nic dalšího nekomentuj.
