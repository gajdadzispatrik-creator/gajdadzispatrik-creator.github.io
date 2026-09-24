# Úkol pro Claude Code — implementace schválené horní části homepage

**Projekt:** patrikgajdadzis.cz
**Stack:** Astro + TypeScript + čisté CSS
**Rozsah:** pouze header, navigace, hero sekce, statistický pás a viditelný začátek sekce „Neřeším produkty. Řeším souvislosti.“

---

## 1. Nejdřív si přečti celou dokumentaci

Před jakýmkoli zápisem do kódu přečti tyto dokumenty v tomto pořadí a považuj je za závazné zadání:

1. `docs/brand-experience-brief.md`
2. `docs/content-homepage.md`
3. `docs/design-direction.md`
4. `docs/art-direction-financial-architecture.md`
5. `design-exploration/financial-architecture/approved-hero/hero-implementation-spec.md`

Vizuální zdroj pravdy je schválený návrh:
`design-exploration/financial-architecture/FA-02 Final.dc.html`
(šířky 1440, 1366, 834 a 390 px). Pokud si dokumenty a návrh odporují, platí návrh a rozpor nahlas — neřeš ho vlastním rozhodnutím.

---

## 2. Co implementovat

Přesně a pouze rozsah z `hero-implementation-spec.md`, §1:

- header a navigace (desktop i notebook),
- tabletové a mobilní menu,
- hero sekce,
- H1,
- podnadpis,
- primární CTA `Nezávazná konzultace`,
- telefonní akce `+420 775 217 721` s odkazem `tel:+420775217721`,
- prostor pro fotografii Patrika (dočasný placeholder podle §4 specifikace),
- kontinuální linka,
- statistický pás se současnými hodnotami `150+`, `5,0`, `Od 2020`,
- pouze viditelný začátek sekce „Neřeším produkty. Řeším souvislosti.“ (nadpis + doprovodný odstavec).

Všechny rozměry, breakpointy, tokeny, stavy, interakce a přístupnostní pravidla ber z `hero-implementation-spec.md`. Nedopočítávej si vlastní hodnoty tam, kde je specifikace uvádí.

---

## 3. Zákazy

- **Nepřepisuj texty.** Žádná úprava H1, podnadpisu, CTA, položek navigace, statistik ani nadpisu další sekce — ani „gramatické zlepšení“, ani jiné zalomení.
- **Neměň hodnoty statistik.** Zůstávají `150+ / osobních klientů`, `5,0 / Google recenze`, `Od 2020 / Ve financích`.
- **Nepřidávej vlastní designové prvky.** Žádné ikony, odznaky, badge, karty, gradienty, stíny, dekorace, „vylepšení“ ani nové barvy.
- **Nevytvářej další sekce homepage.** Nic pod sekcí „Neřeším produkty. Řeším souvislosti.“ — ani footer, ani formulář.
- **Nepoužívej Tailwind** ani jiný velký UI/CSS framework, žádnou komponentovou knihovnu. Pouze čisté CSS (custom properties, `@media`, `clamp()`).
- **Nedělej deploy** a **nepushuj na GitHub**. Žádný `git push`, žádné vytváření PR, žádná konfigurace hostingu.
- **Nezasahuj do existujících dokumentů.** Složky `docs/` a `design-exploration/` zůstanou beze změny — nic v nich nepřepisuj, nemaž ani nepřesouvej.
- Nevymýšlej podobu Patrika. Placeholder fotografie nesmí zobrazovat tvář ani konkrétní osobu, nesmí to být fotobankový portrét ani generovaný obrázek.
- Žádný parallax, loader, carousel, animovaný kurzor, animace po písmenech ani tmavý režim.

---

## 4. Technické požadavky

- Astro projekt, TypeScript (`strict`), čisté CSS.
- Struktura: komponenty pro header, navigaci, hero, statistický pás a začátek další sekce; jedna stránka, která je skládá.
- Design tokeny jako CSS custom properties v jednom globálním souboru, přesně podle §2 specifikace.
- Manrope self-hosted `woff2`, řezy 400/500/600/700, znaková sada latin + latin-ext (české diakritiky), `font-display: swap`, preload pouze řezu 700.
- Kontinuální linka jako inline SVG s `aria-hidden="true"`, `focusable="false"`, `stroke-width: 1`, zaoblené lomy a zakončení.
- Placeholder fotografie odděl tak, aby se dal nahradit `<picture>` bez zásahu do layoutu; ořez nastavitelný zvlášť pro desktop, tablet a mobil.
- Respektuj `prefers-reduced-motion: reduce`.
- Bez JavaScriptu musí být veškerý obsah viditelný a odkazy funkční; mobilní menu smí být bez JS řešené `<details>`/`:target`.
- Žádné analytické, cookie ani tracking skripty.

---

## 5. Kontrola před dokončením

1. Spusť `npm run build` a odstraň všechny chyby i varování.
2. Zkontroluj konzoli v dev serveru — musí být bez chyb.
3. Projdi **acceptance checklist** v `hero-implementation-spec.md`, §7, bod po bodu a ověř každý.
4. Zkontroluj šířky 1440, 1366, 834 a 390 px proti návrhu a ověř i mezilehlé šířky 1024, 1280 a 1536 px (nic se nepřekrývá, žádné horizontální posouvání).
5. Ověř, že se v `docs/` a `design-exploration/` nezměnil ani jeden soubor.

---

## 6. Co vypsat na konci

Na konci uveď **pouze** tyto tři věci:

1. **Vytvořené dokumenty** — seznam souborů, které jsi vytvořil nebo upravil.
2. **Potvrzení, že design nebyl změněn** — že rozměry, barvy, typografie, texty ani hodnoty statistik neodpovídají žádné vlastní úpravě.
3. **Potvrzení, že nebyl vytvořen zdrojový kód nad rámec zadání** — tedy že vznikl pouze schválený rozsah a žádná další sekce, deploy ani push.

Nic dalšího nekomentuj.
