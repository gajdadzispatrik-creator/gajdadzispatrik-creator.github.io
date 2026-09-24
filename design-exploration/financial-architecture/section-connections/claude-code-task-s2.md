# Úkol pro Claude Code — sekce „Neřeším produkty. Řeším souvislosti.“ (S2 — Financial Architecture)

**Projekt:** patrikgajdadzis.cz
**Stack:** Astro + TypeScript + čisté CSS
**Rozsah:** pouze jedna sekce — bezprostředně pod hero a statistickým pásem

---

## 1. Nejdřív si přečti dokumentaci

Před jakýmkoli zápisem do kódu přečti a považuj za závazné zadání:

1. `docs/brand-experience-brief.md`
2. `docs/content-homepage.md`
3. `docs/design-direction.md`
4. `docs/art-direction-financial-architecture.md`
5. `design-exploration/financial-architecture/approved-hero/hero-implementation-spec.md` — tokeny, breakpointy, typografie a pravidla přístupnosti platí i pro tuto sekci

Vizuální zdroj pravdy pro tuto sekci je varianta **5b (S2 — Financial Architecture)** v souboru:
`design-exploration/financial-architecture/section-connections/Section Connections.dc.html`

Ostatní varianty v tomto souboru (5a, 5c) **neimplementuj**. Pokud si dokumenty a návrh odporují, platí návrh a rozpor nahlas — neřeš ho vlastním rozhodnutím.

---

## 2. Co implementovat

Jednu sekci, která navazuje na schválený statistický pás. Obsahuje pouze:

1. nadpis `Neřeším produkty.` / `Řeším souvislosti.` (dva pevné řádky, `<h2>`),
2. doprovodný odstavec,
3. pět finančních oblastí rozmístěných podél jedné kontinuální trasy,
4. pokračování kontinuální linky z hero sekce,
5. tichý popisek `Jeden plán` na konci trasy (desktop a mobil).

Nic dalšího. Žádné CTA, žádné odkazy, žádné další sekce homepage.

### Texty — kopírovat přesně, nepřepisovat

| Prvek | Text |
|---|---|
| Nadpis | `Neřeším produkty.` / `Řeším souvislosti.` |
| Doprovodný text | `Bydlení, rezerva, ochrana, investice a penze se navzájem ovlivňují. Proto se na vaše finance dívám jako na jeden celek.` |
| Oblasti (v tomto pořadí) | `Bydlení`, `Rezerva`, `Ochrana`, `Investice`, `Penze` |
| Popisek konce trasy | `Jeden plán` |

Texty nezkracuj, neprodlužuj, nepřidávej k oblastem popisky ani vysvětlivky.

---

## 3. Kompoziční princip (nutné pochopit před kódováním)

Kontinuální linka pokračuje přesně tam, kde skončila v hero — vystupuje z **horní hrany sekce** ve stejné ose, v jaké sestupovala pod statistickým pásem. Stává se **trasou finančního plánu**: klesá zleva doprava třemi jemnými zaoblenými lomy a jednotlivé oblasti sedí podél ní v pořadí, v jakém se řeší.

Nadpis leží v prostoru, který trasa obtéká — je součástí kompozice, ne popiskem nad grafikou.

**Není to** síť uzlů, blockchain, technologický diagram ani graf. Je to jedna cesta rozhodnutí.

---

## 4. Rozměry — desktop 1440 px

Souřadnicový systém sekce: `viewBox="0 0 1440 940"`, výška sekce 940 px, pozadí `--bg` (`#F8FAFC`). Prvních 56 px sekce překrývá spodní hrana statistického pásu (v návrhu je naznačena) — trasa proto začíná na `y = 56`.

**Trasa (inline SVG, `stroke-width: 1`, `stroke-linecap: round`, `stroke-linejoin: round`, `fill: none`):**

```
M 120 56 V 210 A 28 28 0 0 0 148 238 H 520 A 28 28 0 0 1 548 266 V 430 A 28 28 0 0 0 576 458 H 940 A 28 28 0 0 1 968 486 V 640 A 28 28 0 0 0 996 668 H 1300
```
- barva `#1B4A8A`, `opacity: .2`
- radius všech lomů **28 px**
- nájezdový úsek `M 120 56 V 150` navíc smaragdovou `#1E7A5C`, `opacity: .55` (napojení na hero)

**Body na trase** (kruhy, bez obrysu):
| Pozice | r | Výplň |
|---|---|---|
| `148, 238` | 3.5 | `#1E7A5C` |
| `548, 348` | 2.6 | `#1B4A8A` @ `.5` |
| `700, 458` | 2.6 | `#1B4A8A` @ `.5` |
| `968, 566` | 2.6 | `#1B4A8A` @ `.5` |
| `1140, 668` | 2.6 | `#1B4A8A` @ `.5` |

Žádné další body. Body nespojuj mezi sebou — spojuje je pouze jedna trasa.

**Oblasti** (absolutní pozice, levý okraj / horní hrana):
| Oblast | Pozice | Velikost / řez / letter-spacing / barva |
|---|---|---|
| `Bydlení` | 168 / 196 | 24 px / 700 / −0.02em / `#0F2747` |
| `Rezerva` | 572 / 336 | 22 px / 600 / −0.02em / `#1C3555` |
| `Ochrana` | 676 / 414 | 22 px / 600 / −0.02em / `#1C3555` |
| `Investice` | 992 / 554 | 22 px / 600 / −0.02em / `#1C3555` |
| `Penze` | 1116 / 624 | 22 px / 600 / −0.02em / `#1C3555` |

`Bydlení` je záměrně dominantnější (24 px / 700) — je první rozhodnutí. Ostatní čtyři mají shodnou váhu.

**Text:**
| Prvek | Pozice | Rozměry |
|---|---|---|
| Nadpis | 120 / 508 | blok 600 px, 60 px / 1.05 / 700 / −0.045em / `#0F2747`, dva pevné řádky |
| Doprovodný text | 120 / 716 | blok 420 px, 18 px / 1.65 / 500 / `#31445B`, `text-wrap: pretty` |
| `Jeden plán` | 1224 / 696 | 12 px / 600 / 0.14em / uppercase / `#9AA9BC` |

---

## 5. Rozměry — tablet 834 px

`viewBox="0 0 834 900"`, výška 900 px, horní překryv pásu 48 px, okraje 40 px. Trasa má **o jeden lom méně** a kratší úseky.

**Trasa:** `M 40 48 V 170 A 22 22 0 0 0 62 192 H 410 A 22 22 0 0 1 432 214 V 452 A 22 22 0 0 0 454 474 H 794`
- radius lomů **22 px**, ostatní vlastnosti jako desktop
- nájezd `M 40 48 V 120` smaragdovou `#1E7A5C` @ `.55`

**Body:** `62,192` r 3.2 smaragdová · `432,286` · `432,392` · `560,474` · `712,474` — všechny r 2.4, `#1B4A8A` @ `.5`

**Oblasti:** `Bydlení` 80 / 152 (22 px / 700) · `Rezerva` 452 / 274 · `Ochrana` 452 / 380 · `Investice` 538 / 432 · `Penze` 692 / 432 — poslední čtyři 19 px / 600 / `#1C3555`

**Text:** nadpis 40 / 556, blok 520 px, 44 px / 1.06 · doprovodný text 40 / 712, blok 440 px, 17 px / 1.65. Popisek `Jeden plán` se na tabletu nezobrazuje.

---

## 6. Rozměry — mobil 390 px

Mobil **není zmenšený desktop.** `viewBox="0 0 390 900"`, výška 900 px, horní překryv pásu 40 px.

Trasa se zjednodušuje na **jedinou svislici** u levého okraje (`x = 40`) s krátkými vodorovnými zářezy k jednotlivým oblastem. Žádné lomy, žádná klesající kompozice.

**Trasa:**
- svislice `M 40 40 V 828`, `#1B4A8A` @ `.2`
- nájezd `M 40 40 V 96`, `#1E7A5C` @ `.55`
- zářezy `M 40 {y} H 62` pro `y` = 400, 484, 568, 652, 736 — `#1B4A8A` @ `.2`
- bod `40, 400` r 3.2, `#1E7A5C`

**Pořadí obsahu** (shora dolů — nadpis je okamžitě čitelný):
| Prvek | Pozice | Rozměry |
|---|---|---|
| Nadpis | left 70 / right 24 / top 86 | 34 px / 1.06 / 700 / −0.04em, dva pevné řádky |
| Doprovodný text | left 70 / right 24 / top 222 | 16.5 px / 1.6 / 500 |
| `Bydlení` | 74 / 386 | 24 px / 700 / −0.025em / `#0F2747` |
| `Rezerva` | 74 / 472 | 22 px / 600 / −0.025em / `#1C3555` |
| `Ochrana` | 74 / 556 | 22 px / 600 / −0.025em / `#1C3555` |
| `Investice` | 74 / 640 | 22 px / 600 / −0.025em / `#1C3555` |
| `Penze` | 74 / 724 | 22 px / 600 / −0.025em / `#1C3555` |
| `Jeden plán` | 70 / 824 | 11.5 px / 600 / 0.12em / uppercase / `#9AA9BC` |

Rozteč oblastí je pevných **84 px** — každá má díky tomu vlastní zářez a jednoznačné pořadí.

**Zakázané na mobilu:** horizontální posouvání (`overflow-x` nesmí nikdy vzniknout), zmenšená desktopová trasa, přeplněná sekce.

---

## 7. Breakpointy a implementační přístup

Použij breakpointy podle `hero-implementation-spec.md`, §3:
- base → mobil (kalibrováno na 390 px)
- `min-width: 768px` → tabletová kompozice (kalibrováno na 834 px)
- `min-width: 1200px` → notebook a desktop (kalibrováno na 1440 px)

Pro notebook 1366 px použij desktopovou kompozici s proporčně zmenšenými hodnotami (okraje 96 px místo 120 px, trasa zkrácená o rozdíl šířky, nadpis 56 px, oblasti 23/21 px) — struktura, pořadí ani radiusy se nemění.

**Doporučený přístup:** tři samostatné SVG trasy (mobil / tablet / desktop) přepínané `@media`, aby nebylo nutné deformovat `viewBox`. Trasy jsou dekorativní: `aria-hidden="true"`, `focusable="false"`, `preserveAspectRatio` nastav tak, aby trasa nezkreslila poměr lomů.

Absolutní pozice oblastí řeš přes CSS custom properties (`--x`, `--y`) na jednotlivých `<li>` — ne inline styly v šabloně, ne magická čísla rozesetá po CSS.

---

## 8. Pohyb

Pouze toto:

1. **Trasa se vykresluje jedním tahem podle scrollu** — `stroke-dashoffset` z plné délky na 0, navázané na pozici sekce ve viewportu.
2. **Názvy oblastí** se objevují, jak je tah míjí — `opacity 0→1` + `translateY(12px→0)`, 350–450 ms, `ease-out`.
3. **Nadpis** nabíhá po řádcích, když trasa dosáhne jeho úrovně — odstup řádků 90 ms.
4. **`prefers-reduced-motion: reduce`** — všechny animace vypnuté, trasa plně vykreslená, obsah okamžitě ve finálním stavu.

Zakázané: parallax, loader, carousel, nekonečné animace, animace po písmenech, animace nutná k přečtení obsahu.

---

## 9. Přístupnost

**Pořadí v DOM** (stejné pro všechny šířky, odpovídá pořadí čtení na mobilu):

1. `<section aria-labelledby="souvislosti-nadpis">`
2. `<h2 id="souvislosti-nadpis">` — dva řádky přes `<br>`
3. `<p>` doprovodný text
4. `<ol>` s pěti `<li>` — pořadí oblastí je významové, proto **číslovaný** seznam (vizuálně bez čísel a odrážek)
5. dekorativní SVG trasa — `aria-hidden="true"`, v DOM až za textem
6. `Jeden plán` jako `<p>` nebo `<span>`, ne nadpis

**Pravidla:**
- `<h2>`, nikdy `<h1>` — H1 patří hero sekci
- oblasti nejsou odkazy ani tlačítka; pokud se v budoucnu stanou odkazy, dotyková plocha min. **48×48 px**
- žádný interaktivní prvek v této sekci → žádné focus stavy k řešení, ale `<ol>` musí být čitelný čtečkou v pořadí 1–5
- kontrast: `#0F2747` a `#1C3555` na `#F8FAFC` ≥ 7:1; `#9AA9BC` na `#F8FAFC` ≈ 2.6:1 — proto `Jeden plán` **nesmí nést informaci, která není jinde** (je doplňkový popisek); pokud audit vyžaduje vyšší kontrast, ztmav na `--text-quiet` (`#7A8AA0`)
- trasa je dekorace: informaci nese pouze text a pořadí v `<ol>`
- **bez JavaScriptu** je celá sekce plně viditelná a čitelná, trasa plně vykreslená

---

## 10. Zákazy

- **Nepřepisuj texty** — ani nadpis, ani doprovodný text, ani názvy oblastí, ani `Jeden plán`. Žádné „gramatické zlepšení“, žádné jiné zalomení.
- **Nepřidávej vlastní designové prvky** — žádné ikony, karty, boxy, badge, čísla u oblastí, stíny, gradienty ani nové barvy.
- **Nedělej z toho diagram** — žádné kruhy propojené čarami mezi sebou, žádná síť uzlů, žádný graf, žádné další body na trase.
- **Nepřidávej generické finanční ikony** — žádné domy, štíty, prasátka, mince, deštníky.
- **Neměň hero ani statistický pás.** Tato sekce na ně jen navazuje.
- **Nevytvářej další sekce homepage** — nic pod touto sekcí, ani footer, ani formulář.
- **Nepoužívej Tailwind** ani jiný velký UI/CSS framework, žádnou komponentovou knihovnu. Pouze čisté CSS (custom properties, `@media`, `clamp()`).
- **Nedělej deploy** a **nepushuj na GitHub.** Žádný `git push`, žádné PR, žádná konfigurace hostingu.
- **Nezasahuj do existujících dokumentů.** `docs/` a `design-exploration/` zůstanou beze změny.
- Žádný druhý font, žádný tmavý režim, žádné glassmorphism, žádné analytické ani cookie skripty.

---

## 11. Technické požadavky

- Astro komponenta (např. `src/components/ConnectionsSection.astro`), TypeScript (`strict`), čisté CSS.
- Design tokeny ber z globálního souboru vytvořeného pro hero — **nezaváděj nové barvy**. Barvy použité v této sekci: `--navy` (`#0F2747`), `--navy-ink` (`#1C3555`), `--bg` (`#F8FAFC`), `--line` (`#1B4A8A`), `--emerald` (`#1E7A5C`), `--text` (`#31445B`), `--text-quiet` (`#7A8AA0`) a `#9AA9BC` (přidej jako `--text-faint`, pokud v tokenech ještě není).
- Manrope, řezy 500/600/700, self-hosted, latin + latin-ext.
- Sekce navazuje na statistický pás bez mezery a bez viditelné hrany.
- Trasa jako inline SVG, ne obrázek, ne `background-image`.

---

## 12. Kontrola před dokončením

1. Spusť `npm run build` a odstraň všechny chyby i varování.
2. Zkontroluj konzoli v dev serveru — musí být bez chyb.
3. Ověř šířky 1440, 1366, 834 a 390 px proti variantě 5b v návrhu (tolerance ±2 px) a projdi i 1024, 1180, 1280 a 1536 px — nic se nepřekrývá, trasa nikde nekříží písmena.
4. Ověř, že na mobilu nevzniká horizontální posouvání.
5. Ověř, že trasa nikde nepřekrývá text nadpisu ani názvy oblastí (min. odstup 20 px).
6. Vypni JavaScript a zkontroluj, že je celá sekce viditelná a trasa vykreslená.
7. Zapni `prefers-reduced-motion: reduce` a zkontroluj, že se nic neanimuje.
8. Ověř, že se v `docs/` a `design-exploration/` nezměnil ani jeden soubor.

---

## 13. Co vypsat na konci

Na konci uveď **pouze** tyto tři věci:

1. **Vytvořené dokumenty** — seznam souborů, které jsi vytvořil nebo upravil.
2. **Potvrzení, že design nebyl změněn** — že rozměry, barvy, typografie ani texty neodpovídají žádné vlastní úpravě.
3. **Potvrzení, že nebyl vytvořen zdrojový kód nad rámec zadání** — tedy že vznikla pouze tato jedna sekce a žádná další část homepage, deploy ani push.

Nic dalšího nekomentuj.
