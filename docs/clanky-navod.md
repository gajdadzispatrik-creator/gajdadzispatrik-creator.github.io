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

## Kontrola před zveřejněním

1. Čísla a pravidla (státní příspěvky, limity ČNB, daně) ověřit k datu vydání.
2. `npm run check:typo` — koncept bez odkazu přidat: `EXTRA=/clanky/<soubor> npm run check:typo`.
3. `ONLY=/clanky/<soubor> npm run check:dots`.
4. Po zveřejnění prvního článku: `/clanky` zapnout (odstranit `noindex`
   v `clanky.astro`, `/clanky` ze `SITEMAP_EXCLUDE` v `astro.config.mjs`,
   odkaz „Články“ zpět do menu a patičky, CTA „Všechny články“ v `ArticlesSection.astro`).

## Ještě k doplnění

- obrázek pro sdílení s nadpisem článku (zatím společný `og-image.png`),
- grafy v barvách webu (komponenta), až budou data k prvním článkům.
