# Typografie a copy: číslování, velikost textu, nezlomitelné mezery

Přesunuto z `CLAUDE.md` 13. 10. 2026 beze změny obsahu (úspora tokenů –
CLAUDE.md se načítá s každou zprávou). Odkazy v kódu a dokumentech ve tvaru
„CLAUDE.md „Konvence: …““ vedou na stejnojmenný oddíl tady; „výše/níže“
může mířit do jiného souboru v `docs/konvence/` (rozcestník je v CLAUDE.md).

## Globální pravidlo: žádné viditelné číslování kroků/bodů

Doplněno 1. 9. 2026. Platí **globálně a automaticky** — pro homepage,
`/sluzby`, `/sluzby/hypoteky`, `/sluzby/financni-plan`, všechny současné i
budoucí podstránky, bez ohledu na to, jestli to zadání znovu zmíní. Platí
pro Claude Code i Claude Design.

Na veřejném webu se v copy ani v designu **nepoužívá viditelné pořadové
číslování** kroků nebo obsahových bodů ve stylu `01`, `02`, `03`, `1.`,
`2.`, `3.` — pokud uživatel výslovně neschválí konkrétní výjimku pro
konkrétní místo.

Číslování smí existovat POUZE interně:

- v dokumentaci (`docs/`),
- v názvu sekcí v markdownu (např. `#### 5. Jak probíhá...` slouží jen k
  organizaci dokumentu),
- v technickém komentáři v kódu,
- v implementační logice (pořadí polí v datovém poli, `data-index` apod.).

Nesmí se promítnout do veřejného copy ani viditelného designu. Pořadí kroků
nese svislá odbočka trasy s kotvami (viz „Konvence: kontinuální linka,
tečky a text" níže) a pořadí v toku textu/seznamu, ne viditelná číslice —
přesně jako `sluzby/hypoteky.astro`'s kapitola „Jak probíhá vyřízení
hypotéky" (§13 jejího zadání).

**Historie:** `docs/content-subpages.md` dřív obsahoval viditelné prefixy
`01 —`/`02 —`/… u kroků na `/sluzby/hypoteky` a `/pristup` (zdroj pravdy
pro copy) — číselné prefixy byly z copy odstraněny 1. 9. 2026, samotný text
nadpisů zůstal beze změny.


## Konvence: běžný text nikdy pod 16px

`docs/design-direction.md` má tvrdý zákaz (ne jen orientační hodnotu):
„Běžný text ani text formulářových polí nesmí být na mobilu menší než 16 px."
Auditem obsahu 1. 9. 2026 se zjistilo, že `font-size: 15.5px` byl zavedený
(ale pravidlu odporující) vzor napříč **10 soubory** celého webu
(`BenefitsSection.astro`, `CasesSection.astro`, `CookieConsent.astro`,
`Header.astro`, `ProcessSection.astro`, `SiteFooter.astro`,
`legal/LegalBlock.astro`, `LegalLayout.astro`, `sluzby.astro`,
`sluzby/hypoteky.astro`) — sjednoceno na `16px` všude. Při psaní jakéhokoli
nového běžného textu (odstavce, popisky, textové odkazy — ne drobné
uppercase labely typu `.hyp-chapter__list-label`, tam menší velikost je
záměrná typografická kategorie, ne běžný text) nepoužívat nic pod 16px,
i kdyby to jinde v kódu vypadalo jako zavedený vzor — `15.5px` byl přesně
tenhle případ.


## Konvence: nezlomitelná mezera za krátkými předložkami/spojkami

Platí **globálně a automaticky** pro veškerý český text na webu (nadpisy,
odstavce, popisky, položky seznamů) — homepage i všechny podstránky,
současné i budoucí, bez ohledu na to, jestli to zadání znovu zmíní.

Krátké předložky a spojky nesmí zůstat osamocené na konci řádku. Mezera za
nimi musí být nezlomitelná, aby prohlížeč zalomil řádek AŽ ZA ně, ne mezi
ně a následující slovo. Příklad: „Bydlení, ochranu, investice a penzi..." —
bez zásahu by se „a" mohlo octnout samo na konci řádku.

**Rozsah (rozšířeno 1. 9. 2026 na výslovné přání uživatele):**
- Jednopísmenné (**a, i, k, o, s, u, v, z** — velká i malá písmena)
- Dvoupísmenné/krátké (**do, ke, na, od, po, pro, se, ve, za, ze** — velká
  i malá písmena)

**Implementace:**
- V literálním textu přímo v `.astro` šabloně (mezi tagy, ne v `{}` výrazu):
  HTML entita `&nbsp;` — např. `Bydlení, ochranu, investice a&nbsp;penzi`.
- V textu uvnitř JS/TS řetězců (pole dat vykreslovaná přes `{promenna}`,
  které Astro escapuje, entity se tam NEVYHODNOTÍ jako mezera): skutečný
  znak nezlomitelné mezery U+00A0, ne text `&nbsp;` — jinak se na stránce
  zobrazí doslovný text „&nbsp;" místo mezery. V editoru/kódu je vizuálně
  nerozeznatelný od běžné mezery, počítej s tím při hledání/kontrole.

**Další místa, kde se nesmí zalomit (doplněno 24. 9. 2026 po celowebové
kontrole):**
- číslo + to, k čemu patří: `30&nbsp;minut`, `12&nbsp;měsíců`, `10&nbsp;let`,
  `Google Analytics&nbsp;4`,
- telefon `+420&nbsp;775&nbsp;217&nbsp;721`, PSČ + město `708&nbsp;00&nbsp;Ostrava`,
  datum `1.&nbsp;9.&nbsp;2026`, `17.&nbsp;listopadu`,
- právní odkazy: `č.&nbsp;257/2016&nbsp;Sb.`, `§&nbsp;3`, `odst.&nbsp;1`,
  `čl.&nbsp;6`, `písm.&nbsp;f)`, `Osvědčení č.&nbsp;…`,
- pomlčka nesmí začínat řádek: `slovo&nbsp;— další`, stejně oddělovač
  `slovo&nbsp;· další`,
- spojovník v místním názvu (`Ostrava-Poruba`, `Ostravě-Porubě`): za
  spojovník vložit **word joiner** U+2060 (`&#8288;` v šabloně, znak
  U+2060 v JS řetězci), nebo celý úsek obalit `white-space: nowrap`
  (adresa v patičce a kontaktu). **Ne** U+2011 (nezlomitelný spojovník) —
  Manrope ho nemá a prohlížeč by ho vykreslil jiným písmem.

Všechna pravidla výše hlídá automaticky `npm run check:typo` (viz „Jak
spustit").

**Pozor na falešné nálezy:** kontroluj jen SAMOSTATNÁ slova (celá předložka/
spojka mezi mezerami/interpunkcí), ne stejnou písmennou sekvenci jako
součást delšího slova (např. „ze" ve slově „zeleň" se netýká) — a nezaměňuj
předložku „na" s částí slova jako „navíc"/"nastavení".
