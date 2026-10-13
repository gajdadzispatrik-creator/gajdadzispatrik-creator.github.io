# CLAUDE.md — patrikgajdadzis.cz

Kořenový orientační dokument pro každé sezení Claude Code i Claude Design.
Přečti si ho jako první. Popisuje, kde je zdroj pravdy, jak projekt spustit,
jaká platí pravidla a kde najít podrobnosti (rozcestník dole).

---

## Co to je

Osobní web Patrika Gajdadzise — finančního poradce z Ostravy. Cíl webu:
silná osobní značka + konverze na nezávaznou konzultaci. Web se staví
postupně přes Claude Code (implementace) a Claude Design (návrh).

Stavěno jako **statický web v Astru** (bez frameworku, minimum JS).

## Jak spustit

```bash
npm install
npm run dev          # vývojový server (astro dev)
npm run build        # astro check + astro build → dist/
npm run preview      # náhled buildu
npm run check:layout # pozicování u linky (docs/konvence/kontroly.md) (vyžaduje běžící npm run dev)
npm run check:typo   # kontrola zalamování řádků v textu (vyžaduje běžící npm run dev)
npm run check:dots   # velikost teček, délka zářezů a mezera k textu (vyžaduje běžící npm run dev)
npm run check:spacing # mezery nadpis → text a konce sekcí na všech stránkách (vyžaduje běžící npm run dev)
# Po úpravě jedné stránky stačí: ONLY=/o-mne npm run check:dots (totéž check:spacing)
```

Všechny `check:*` vyžadují běžící `npm run dev`. Co přesně měří, kdy je
spustit a jak přidat novou stránku do `PAGES` v `scripts/audit-layout.mjs`:
**`docs/konvence/kontroly.md`**. Spouštět jen na vyžádání / po větších
úpravách (viz paměť uživatele), teprve s 0 nálezy je hotovo.

- Node projekt, `type: module`. Astro `^5`.
- `npm run build` spouští `astro check` (typová kontrola) — build spadne při chybě typů.
- Výstup: statické HTML do `dist/` (`output: 'static'`, `site: 'https://patrikgajdadzis.cz'`).

## Struktura

```
docs/                         # zadání a pravidla (viz hierarchie níže)
  content-subpages.md         # obsahový zdroj pravdy pro podstránky
design-exploration/           # schválené průzkumy a implementační specifikace
  financial-architecture/approved-hero/
    hero-implementation-spec.md   # detailní spec hero sekce (odkazovaná z kódu)
    claude-code-task.md
review/approved-hero/         # schválené referenční screenshoty (390/834/1366/1440)
public/fonts/manrope/         # self-hostovaný font Manrope (woff2, latin + latin-ext)
src/
  layouts/BaseLayout.astro    # <head>, meta, preload fontu, skip-link
  pages/index.astro           # homepage (jediná stránka zatím)
  components/                  # Header, Hero, HeroLine, HeroPhotoPlaceholder, StatsBand, NextSectionIntro
  styles/
    tokens.css                # KANONICKÉ hodnoty (barvy, radiusy, stíny, pohyb, layout)
    fonts.css                 # @font-face Manrope
    global.css                # reset, skip-link, container, reduced-motion
```

## Hierarchie zdrojů pravdy

Při rozporu platí toto pořadí:

1. **`docs/brand-experience-brief.md`** — nejvyšší autorita pro strategii, cílovou
   skupinu, pozici značky, fakta, texty, hlavní CTA, právní/regulatorní pravidla,
   styl komunikace a zakázané fráze.
2. **`docs/art-direction-financial-architecture.md`** — má přednost při **vizuálních**
   rozporech (kreativní směr: kontinuální linie, hero kompozice, fotografie).
3. **`docs/design-direction.md`** — závazné vizuální zadání (barvy, typografie,
   layout, komponenty). Ustupuje briefu i art-direction.
4. **`docs/content-homepage.md`** — konkrétní texty a pravidla jednotlivých sekcí homepage.
5. **`design-exploration/.../hero-implementation-spec.md`** — implementační detaily
   hero sekce (souřadnice linie, tokeny). Komentáře v kódu na něj odkazují.

**Kanonické hodnoty (barvy, spacing, radiusy, stíny, časování) žijí v
`src/styles/tokens.css`.** Dokumenty popisují *záměr*; závazná *čísla* jsou v tokenech.
Nová hodnota se přidává do `tokens.css`, ne natvrdo do komponenty.

## Klíčová pravidla (z briefu, §25)

**Claude Code** implementuje schválený návrh. Bez výslovného zadání **nesmí**:
měnit design, přepisovat texty, přidávat nové barvy, přidávat knihovny/frameworky,
měnit produkční nastavení, pushovat do hlavní větve ani deployovat.

**Claude Design** může navrhovat kompozici, práci s fotografií, rytmus sekcí,
podobu finanční mapy a vizuální detaily v rámci systému. Nesmí svévolně měnit
barvy, font, cílovku, styl komunikace, hlavní CTA, fakta, právní informace,
základní strukturu ani pravidla responzivity.

Zakázané vizuální prvky (§24): glassmorphism, velké/neonové gradienty, 3D koule,
náhodné AI ilustrace, výrazný parallax, fotobanka, množství stejných karet,
druhý font, dark mode, plovoucí WhatsApp tlačítko, rámečky kolem hero fotky.

Fakta a čísla (§7) prezentovat přesně: *Od roku 2020 · 150+ klientů ·
42 recenzí s hodnocením 5★ · odborná způsobilost pro úvěry, pojištění a investice.*

## Pravidla, která platí vždy (stručně — podrobnosti v rozcestníku)

- **Nová stránka / netriviální úprava:** než napíšeš „ověřeno“, porovnej
  živě čísla (`getBoundingClientRect`/`getComputedStyle`) s referenční
  stránkou (`sluzby/hypoteky.astro`) na stejné šířce, přidej stránku do
  `PAGES` a `check:layout` musí mít 0 selhání. Postup: `kontroly.md`.
- **Žádné viditelné číslování** kroků/bodů (`01`, `1.` …) v copy ani designu.
- **Běžný text nikdy pod 16 px.**
- **Nezlomitelná mezera** za a, i, k, o, s, u, v, z, do, ke, na, od, po, pro,
  se, ve, za, ze, mezi číslem a jednotkou atd. (`&nbsp;` v šabloně, U+00A0
  v JS řetězci); hlídá `check:typo`.
- **Barvy jen z tokenů** (`tokens.css`), žádný natvrdo zapsaný hex.
- **Sekce na sebe navazují bez marginu**, padding nahoře = dole; mezi bloky
  jeden zdroj mezery (`gap`), ne `gap` + `margin`.
- **Hlavní obsah v centrovaném stage** (`--stage-max`), pozadí sekce zůstává
  full-width.
- **Tečky a text u linky:** text u tečky na svislém úseku vpravo, tečka v ose
  prvního řádku; odsazení procentuálně při `preserveAspectRatio="none"`.

## Rozcestník — při práci na X přečti Y (`docs/konvence/`)

| Při práci na… | Přečti |
|---|---|
| kontrolních skriptech, nové stránce, „ověřeno/hotovo“, porovnání s referenční stránkou | `kontroly.md` (Globální pravidlo: povinná kontrola nové stránky) |
| dekorativní lince, tečkách, zářezech, textu u teček, nájezdovém gradientu | `linka-a-tecky.md` (Konvence: kontinuální linka…, velikost teček…, nájezdový gradient…) |
| mezerách (nadpis → text, mezi sekcemi, mezi bloky, šířky 375/768) | `mezery.md` |
| pruhu + obsahu vedle sebe, šířce sloupců, wide desktop, `--stage-max`, švu `/sluzby` → patička | `sloupce-a-platno.md` |
| textech a copy (číslování, 16 px, nezlomitelné mezery, spojovník v místních názvech) | `typografie.md` |
| co je hotové, TODO, známé nesrovnalosti, články, formulář, cookies, SEO | `stav-projektu.md` (aktuální úkoly: `docs/audits/prelaunch-p0-status.md` § 20) |
| fotkách | `docs/fotky-umisteni.md` |
| článcích | `docs/clanky-navod.md` |
| nasazení na Wedos | `docs/deploy-wedos.md` |

Odkazy v komentářích kódu ve tvaru „CLAUDE.md „Konvence: …““ hledej podle
názvu oddílu v souborech výše — názvy oddílů zůstaly beze změny.
