# Články — jak přidat nový článek

Zavedeno 5. 10. 2026. Jeden článek = jeden soubor `.mdx` ve složce
`src/content/clanky/`. **Název souboru = adresa článku**
(`zivotni-pojisteni-za-co-platite-zbytecne.mdx` → `/clanky/zivotni-pojisteni-za-co-platite-zbytecne`).
Bez diakritiky, slova oddělená pomlčkou.

## Co se udělá samo

- stránka článku v designu webu (linka s tečkou u každého mezititulku,
  obsah článku, doba čtení, autor, sdílení, související články, tmavý závěr),
- odkaz „Související služba“ pod článkem podle tématu (`SERVICE_BY_TOPIC`
  v `src/data/articles.ts` — Pojištění → /sluzby/pojisteni atd.),
- nezlomitelné mezery za předložkami, u čísel a před pomlčkou,
- článek na `/clanky`, na homepage (3 nejnovější), v sitemap, v RSS (`/rss.xml`),
- údaje pro Google: `BlogPosting` (autor, datum, téma), drobečková navigace,
  `FAQPage` z častých otázek.

## Hlavička souboru (frontmatter)

```yaml
---
title: 'Nadpis článku'              # v uvozovkách, když obsahuje dvojtečku
homeTitle: Kratší nadpis            # nepovinné: jen pro kartu na homepage, když se plný nevejde na 2 řádky
shareTitle: Krátký hook na obrázek  # VŽDY u nového článku (max. 60 znaků, ideálně do ~45): na obrázek pro sdílení
description: Perex pod nadpisem, zároveň popis pro Google (do ~160 znaků).
category: Pojištění                  # Hypotéky a bydlení | Finanční plánování | Investice | Pojištění | Penze
publishedAt: 2026-10-05
updatedAt: 2026-11-20                # volitelné — „Aktualizováno…“ na konci článku
draft: true                          # koncept: vidět jen lokálně a na náhledu (GitHub), na webu (Wedos) se nevytvoří
summary:                             # „V kostce“ — 2 až 4 body
  - První hlavní myšlenka.
  - Druhá.
  - Třetí.
faq:                                 # volitelné — časté otázky na konci
  - q: Otázka?
    a: Odpověď.
related: []                          # volitelné — názvy souborů souvisejících článků (bez .mdx)
---
```

Zveřejnění = smazat `draft: true` (nebo `draft: false`).

## Text

Běžný Markdown: `## Mezititulek` (dostane tečku na lince a položku v obsahu),
`### Podnadpis`, odstavce, `- odrážky`, `**tučně**`, `[odkaz](/adresa)`,
tabulky (`| a | b |`). Mezititulky psát jako otázky, které lidé hledají.
**Žádné číslované seznamy** (pravidlo webu — odrážky se vykreslí bez čísel).

## Prvky v textu (bez importu, rovnou v textu)

```mdx
<Praxe>
Zkušenost z praxe — anonymně, bez jmen a částek, podle kterých by šel klient poznat.
</Praxe>

<Upozorneni title="Na co si dát pozor">
Text upozornění.
</Upozorneni>

<CheckupOdkaz />
<CheckupOdkaz text="Nevíte, kolik máte mít v rezervě?" />

<Checklist
  title="Co si zkontrolovat"
  items={[
    'První bod.',
    'Druhý bod.',
  ]}
/>

<Priklad
  title="Rodina s hypotékou"
  rows={[
    ['Položka', '1 000 000 Kč'],
    ['Další položka', '− 200 000 Kč'],
  ]}
  result={['Výsledek', '800 000 Kč']}
  note="Orientační příklad."
/>
```

### Grafy (v barvách webu, žádné fotky z fotobanky ani AI ilustrace)

```mdx
<GrafVypadek
  title="Kolik vám při nemoci chybí každý měsíc"
  rows={[
    { label: 'Hrubá mzda 50 000 Kč', total: 39300, covered: 26600 },
  ]}
  totalLabel="Čistá mzda"
  coveredLabel="Nemocenská"
  note="Zdroj / předpoklady."
/>

<GrafPorovnani
  title="Rok čekání proti úspoře na splátce"
  rows={[
    { label: 'Co stojí rok čekání', segments: [
      { label: 'Nájem', value: 204000 },
      { label: 'Zdražení bytu', value: 225000 },
    ] },
    { label: 'Co ušetříte', accent: true, segments: [{ label: 'Nižší splátka', value: 22700 }] },
  ]}
/>

<GrafVyber
  title="Z čeho kdo vybírá"
  rows={[
    { label: 'Bankéř', text: 'Produkty jedné banky.', picked: 1 },
    { label: 'Poradce', text: '…', picked: 12, accent: true },
  ]}
/>
```

Komponentu vždy na samostatný řádek s prázdným řádkem před i za
(jinak MDX ohlásí chybu „Could not parse expression“).

## Vydávání podle data (od 4. 11. 2026)

Patrik: „ať se články vytvářejí a publikují samy, ať to nemusím řešit“.

- **Kdy vychází:** 2. a 4. úterý v měsíci (v měsíci se 3 články i 1. nebo 3. úterý),
  témata a měsíce podle `docs/clanky-plan-2026-11-az-2027-10.md`.
- **Příprava (sama):** naplánovaná úloha „Články – příprava na další měsíc“
  (Claude, 15. den v měsíci v 9:00) napíše koncepty na další měsíc
  (`draft: true`, `publishedAt` = den vydání), ověří čísla, spustí kontroly,
  vyrobí obrázek pro sdílení a do `_spolecne/ceka-na-patrika.md` zapíše,
  co má Patrik přečíst a doplnit. Úloha běží, když je otevřená aplikace Claude.
- **Schválení (Patrik, jednou měsíčně):** Patrik přečte, doplní praxi a řekne „ok“.
  Chat Web pak u článku nastaví `draft: false` (datum nechá budoucí), doplní praxi
  a nasadí štítkem `ostry-*`. **Bez Patrikova „ok“ se nic nezveřejní.**
- **Zveřejnění (samo):** schválený článek s budoucím datem se na webu neukáže
  (`src/data/articles.ts`). V den vydání ráno ho nahraje plán v
  `.github/workflows/deploy-wedos.yml` (z posledního štítku `ostry-*`, jen když
  ten den něco vychází). `/llms.txt`, RSS, sitemap, `/clanky` a homepage se
  doplní samy. Kontrola, co je naplánované: `node scripts/clanky-k-vydani.mjs`.
- Do starších (už vydaných) článků odkaz na nový článek přidávat až po jeho vydání.

## Obrázek pro sdílení

Každý článek má vlastní obrázek s nadpisem (`public/og/<soubor>.png`).
Po přidání článku nebo změně nadpisu: běžící `npm run dev` + `npm run og`
(jen jeden: `ONLY=<soubor> npm run og`). Předloha: `src/pages/og/[slug].astro`
(jen při vývoji). Bez obrázku se použije výchozí `og-image.png`
(`npm run og:web`, předloha `src/pages/og-web/[variant].astro`).

**Krátký nadpis pro sdílení (`shareTitle`) — povinný krok u každého nového
článku** (Patrik, 6. 10. 2026): sítě vypíšou plný nadpis pod obrázek samy,
na obrázek patří krátká, úderná verze na 2–3 řádky velkým písmem (např.
„Nejdřív hypotéka, potom nemovitost“). Navrhnout ji spolu s článkem.

Od 6. 10. 2026 je na obrázcích vpravo Patrikova fotka. **Pravidlo
(`scripts/lib/og-fit.mjs`):** text musí být aspoň 96 px od skutečného obrysu
postavy (měří se z průhlednosti fotky v každém řádku textu) a nadpis aspoň
32 px nad patičkou. Když to nesedí, skript nadpis zmenšuje po 2 px; když
nesedí ani při 36 px, generování skončí chybou — pak nadpis zkrátit.

## Kontrola před zveřejněním

1. Čísla a pravidla (státní příspěvky, limity ČNB, daně) ověřit k datu vydání.
2. `npm run check:typo` — koncept bez odkazu přidat: `EXTRA=/clanky/<soubor> npm run check:typo`.
3. `ONLY=/clanky/<soubor> npm run check:dots`.
4. `/llms.txt` se skládá sám (`src/pages/llms.txt.ts`); u článku stačí pole `llms:` s krátkým shrnutím.
5. Psát Patrikovým hlasem jako odborník, propojovat souvislosti a odkazovat
   na související články přímo v textu.

`/clanky` je zveřejněné od 5. 10. 2026 (menu, patička, sitemap, homepage).

## Ještě k doplnění

- fotky z praxe do článků (po focení).
