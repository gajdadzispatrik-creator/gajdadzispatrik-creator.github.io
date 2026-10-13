# Dekorativní linka: tečky, zářezy, text u teček, nájezdový gradient

Přesunuto z `CLAUDE.md` 13. 10. 2026 beze změny obsahu (úspora tokenů –
CLAUDE.md se načítá s každou zprávou). Odkazy v kódu a dokumentech ve tvaru
„CLAUDE.md „Konvence: …““ vedou na stejnojmenný oddíl tady; „výše/níže“
může mířit do jiného souboru v `docs/konvence/` (rozcestník je v CLAUDE.md).

## Konvence: kontinuální linka, tečky a text

Platí pro všechny sekce s dekorativní SVG trasou (ConnectionsSection,
RouterSection, ProcessSection, ReviewsSection, BenefitsSection, CasesSection,
AboutSection, ArticlesSection, FaqSection, ContactSection, SiteFooter — trasa
v SiteFooter.astro jako jediná KONČÍ, viz jeho hlavičkový komentář).
Při vytváření další takové sekce toto dodržet automaticky, bez čekání na
opravu:

1. **Text u tečky na vodorovném úseku trasy** (text „pod tečkou"): zarovnat
   **vlevo, bez vycentrování** — levá hrana textu = x-souřadnice tečky
   (`--ox: 0`, žádný `translateX(-50%)`, `text-align: left`). Ne vystředit na
   tečku, ne odsadit vpravo.
2. **Text u tečky na svislém úseku trasy** (text „vedle tečky"): odsadit
   **vpravo** (14 px mobil, 20 px výš — viz „Konvence: velikost teček a délka
   zářezů") a tečka leží **v ose PRVNÍHO řádku** textu vedle ní (název
   položky, popisek kapitoly) — **platí od 4. 10. 2026 pro celý web**
   a nahrazuje starší znění níže (centrování na celý blok / na celý nadpis),
   které je ponechané jen pro dohledatelnost historie. Tečka se v JS počítá
   jedinou společnou funkcí `firstLineCenterY()` (`src/scripts/first-line.ts`),
   u pevně pozicovaných položek přes `--oy` = −(výška řádku názvu / 2).
   Původní znění: svisle vycentrovat na
   tečku (`transform: translateY(-50%)` nebo ekvivalentní `--ty: -50%`).
   Skládá-li se text z **nadpisu + popisku dohromady** (ne jeden řádek),
   vycentrovat na **celý blok** (nadpis i popisek), ne jen na nadpis —
   zjištěno 24. 8. 2026 v BenefitsSection.astro (`syncMarkers` měřilo jen
   `.benefits__name`, tečka pak procházela středem nadpisu a popisek pod ní
   opticky „visel"; oprava měří `.benefits__item` jako celek). **Výjimka:**
   pokud mají položky výrazně různou výšku (např. CasesSection.astro, kde
   jedna studie nese celou trojici situace/řešení/výsledek a další jsou jen
   krátké řádky), je vycentrování na nadpis samotný legitimní — u „celého
   bloku" by tam tečka skákala nepředvídatelně podle obsahu, ne podle pozice
   nadpisu.
3. **Tečka musí ležet přímo na vykreslené křivce**, ne v „uříznutém rohu"
   před zaoblením oblouku — u zakřivených úseků počítat souřadnici tečky až
   za koncem příslušného oblouku (poloměr + odstup), ne v bodě, kde by se
   čáry teoreticky protly bez zaoblení.
4. **Odsazení textu od osy/tečky musí být procentuální, ne pevný px**, kdykoli
   sekce používá `preserveAspectRatio="none"` (trasa se neuniformně roztahuje
   s šířkou okna): `calc(<x> * 100% / <viewBoxWidth> + <px>)`, ne
   `calc(<x> * 1px + <px>)`. Pevný px se mimo kalibrační šířku (390/834/
   1366/1440) od reálné pozice trasy vzdaluje — tahle chyba se v tomto
   projektu opakovala víckrát (ReviewsSection, BenefitsSection, AboutSection),
   než se stala konvencí.
5. Pokud výška sekce plyne z obsahu (ne pevný `height`), musí se poloha tečky
   dopočítávat v JS ze skutečné vykreslené pozice obsahu (`getBoundingClientRect`
   po vykreslení + `ResizeObserver`), ne z pevné souřadnice ve viewBoxu —
   viz `syncDotPosition`/`syncRoute` v ReviewsSection.astro, BenefitsSection.astro,
   AboutSection.astro. Přepočet po vykreslení musí proběhnout ještě jednou po
   `document.fonts.ready` — `font-display: swap` (fonts.css) vykreslí text
   nejdřív náhradním fontem, takže první přepočet se může trefit do jiných
   metrik, než jaké má finální Manrope (zjištěno 24. 8. 2026 v
   BenefitsSection.astro — jedna položka ze čtyř měla tečku o 10 px mimo,
   ostatní tři náhodou stihly přepočet až po dohrání fontu).
6. **Odstup tečky/zářezu od textu ≥ 20 px** na tabletu/notebooku/desktopu,
   kde na to je místo (toto číslo se opakovaně objevovalo jako požadavek
   v jednotlivých zadáních — CasesSection, ContactSection, SiteFooter —, ale
   do teď nebylo v této obecné konvenci zapsané). Na mobilu je zavedená
   praxe menší odstup, typicky ~14 px (BenefitsSection i CasesSection),
   protože tam na 20 px často není prostor bez zúžení sloupce textu.
   Odstup musí být i **konzistentní napříč stupni** — nemá dávat smysl, že
   notebook/desktop mají menší mezeru než tablet pod nimi jen proto, že
   zářez převzal stejný pevný offset (typicky 44 v místních SVG jednotkách)
   bez ohledu na to, že text na daném stupni sedí blíž k ose.

   **Odstup musí zůstat konstantní i MIMO kalibrační šířku, ne jen na ní**
   (stejná třída chyby jako bod 4, ale na druhé straně) — zjištěno
   25. 8. 2026 v BenefitsSection.astro a CasesSection.astro: zářez/tečka je
   uvnitř neuniformně roztahovaného SVG (`preserveAspectRatio="none"`), takže
   jeho odsazení od osy v LOKÁLNÍCH SVG jednotkách (např. `x2="976"` při
   ose `x1="940"`, tedy lokální offset 36) roste úměrně s roztažením SVG —
   na 1920 px reálně naroste ze 36 px na ~48 px. Text má ale odsazení pevné
   v reálných px (`calc(... + 56px)`), takže se tečka mimo kalibrační šířku
   textu přibližuje (mezera se zmenšuje, ne zůstává stejná). Na 1920 px to
   v obou nalezených případech scvrklo mezeru z cílových 20/24 px na
   8–10 px. **Řešení:** JS přepočet (stejná funkce, která už dopočítává
   svislou pozici, `syncMarkers`/`syncRoute`) musí dopočítávat i vodorovnou
   pozici zářezu/tečky ze SKUTEČNÉ (reálné, ne lokální) pozice osy + pevný
   px offset, ne ponechat offset natvrdo v markupu:
   ```js
   const axisRealX = svgRect.left + axisLocal * scaleX;
   const targetLocalX = (axisRealX + offsetPx - svgRect.left) / scaleX;
   notch.setAttribute('x2', String(targetLocalX));
   dot.setAttribute('cx', String(targetLocalX));
   ```
   Testovat vždy i na netriviální šířce v rámci stupně (např. 1920 px pro
   desktop), ne jen na kalibrační — na kalibrační šířce (`scaleX === 1`) se
   tahle chyba vůbec neprojeví.

Referenční implementace: `ProcessSection.astro` (`--ox`/`--oy` na kotvě),
`RouterSection.astro` (`left: calc(var(--x) * 100% / var(--vb))` bez offsetu
pro dominantní/vodorovné položky), `ConnectionsSection.astro`.

## Konvence: velikost teček a délka zářezů

Doplněno 1. 10. 2026 na výslovné přání uživatele („musí to všude sedět podle
pravidel"). Tečky byly v každé sekci jinak velké (na mobilu 3,4–9,6 px,
mimo kalibrační šířku elipsy) a zářezy jinak dlouhé (18–72 px) — každá
sekce si roztažení SVG korigovala po svém (`--dot-fix`), jen do kulata,
ne na skutečnou velikost. Platí **globálně a automaticky** pro homepage
i všechny podstránky, mobil, tablet i desktop:

| | mobil (<768) | tablet (768–1199) | notebook + desktop (1200+) |
|---|---|---|---|
| hlavní (zelená) tečka — `r` | 3,2 → průměr 6,4 px | 3,2 → 6,4 px | 3,5 → 7 px |
| ostatní tečky — `r` | 2,4 → 4,8 px | 2,4 → 4,8 px | 2,6 → 5,2 px |
| zářez (osa → tečka) | 22 px | 44 px | 36 px |
| mezera tečka → text vedle ní | 14 px | 20 px | 20 px |

- **Tečka má na obrazovce vždy poloměr přesně `r` px a je kulatá** — v každé
  sekci, na každé šířce. Zajišťuje to JEDNO globální pravidlo:
  `global.css` (`svg[preserveAspectRatio='none'] circle { scale: var(--dot-sx)
  var(--dot-sy) }`) + skript v `BaseLayout.astro`, který na každé takové SVG
  zapisuje zpětné měřítko roztažení. Sekce tečky nijak nedoškálovávají
  (žádný `--dot-fix`, žádný `scaleX` na tečce) — u nové sekce stačí
  `<circle r="3.2|2.4|3.5|2.6">` ve SVG s `preserveAspectRatio="none"`.
- **Zářez má pevnou délku v px, ne v lokálních jednotkách SVG.** Sekce, které
  polohu tečky počítají v JS, to dělají přes `data-notch-offset`
  (BenefitsSection, CasesSection, podstránky — `dotOffset`). Statický zářez
  stačí označit: `data-notch-axis="<x osy>" data-notch-px="44"` na SVG
  a `data-notch` na zářezu (`path` s `M x y H x2`) i jeho tečkách — konec
  dopočítá skript v `BaseLayout.astro` (RouterSection/ProcessSection tablet).
- Text u tečky na konci zářezu začíná na `osa + zářez + mezera`
  (mobil `+ 36px`, tablet `+ 64px`, desktop `+ 56px`).
- **Svislá poloha (od 4. 10. 2026):** tečka s textem vedle sebe leží v ose
  PRVNÍHO řádku tohoto textu — ne na středu celého bloku (název + popis),
  ne na středu víceřádkového nadpisu. Společná funkce `firstLineCenterY()`
  v `src/scripts/first-line.ts` (všechny sekce i podstránky).
- **Tečka na vodorovném úseku** (text nad ní nebo pod ní): levá hrana textu
  přesně na tečce (bod 1 konvence výše).
- **Mezera nadpis sekce → první položka na lince** (Rozcestník, Proces,
  Výhody na mobilu): 74 px.
- Tečky ležící přímo na lince (bez zářezu — Connections, Router, Process na
  mobilu/desktopu) mají stejné velikosti, jen bez zářezu.
- Výjimka: konec linky v patičce — od 4. 10. 2026 končí u loga PG (zelená tečka loga je konec linky, vlastní tečka trasy skrytá; logo, není
  součást trasy).

**Kontrola:** `npm run check:dots` (`scripts/check-dots.mjs`) — projde všechny
stránky (odkazy od homepage) na 17 šířkách a změří každou tečku, zářez,
mezeru k textu, svislou polohu tečky vůči prvnímu řádku textu vedle ní
a levou hranu textu pod tečkou. **Spusť ho po každé úpravě trasy nebo nové sekci/stránce
s tečkami** — teprve s 0 nálezy je hotovo.


## Konvence: nájezdový gradient jen na SKUTEČNÉM začátku linky

Zjištěno a ustáleno 28. 8. 2026 poté, co se krátký smaragdovo-modrý
„nájezdový" gradient (`LineGradientDefs.astro`, sdílené barvy
`#1E7A5C → #1B4A8A`) omylem objevil na dvou místech homepage
(Hero **i** ConnectionsSection) a uživatel to nahlásil jako vizuální chybu —
„jako by se linka uprostřed stránky restartovala".

- **Efekt patří jen tam, kde SKUTEČNĚ začíná nová linka** — typicky hero
  sekce dané stránky (homepage Hero, budoucí `/pristup`, `/recenze`, `/o-mne`,
  `/clanky` — kdykoli taková stránka dostane vlastní kontinuální linku se
  vstupem z hlavičky). Tady ano: `HeroLine.astro` (homepage), hero-tier
  trasa v `sluzby.astro`.
- **Efekt NEPATŘÍ na mezisekční napojení**, i když je to samostatný SVG
  `<path>` element, který v DOM/kódu „začíná" znovu — pokud sekce jen
  POKRAČUJE v už jednou začaté lince (typicky po vizuálním zmizení za
  full-width pásem/bannerem, jako ConnectionsSection.astro po StatsBand),
  jde o pokračování, ne o nový začátek. Taková návazná cesta zůstává
  jednobarevná `var(--line)` @ `.18` (stejná konvence jako ProcessSection/
  RouterSection/…/SiteFooter).
- Sdílené gradient stopy (`LineGradientDefs.astro`) jsou úmyslně jemné
  (pozvolný náběh, nižší vrchol opacity ~0.4 než dřívějších ~0.6–0.65) —
  neredukovat zpět na ostrý skok bez výslovného zadání.
- Trasa se vstupem z hlavičky nesmí začínat slepená na její hranici
  (`y=0`/`y=-20`) — musí mít viditelný odstup (na `/sluzby` `y=40`, viz
  `HERO_ENTRY_START_Y` v `sluzby.astro`), stejně jako homepage Hero linka
  vizuálně nezačíná hned na okraji sekce.
- **Nájezdová cesta a navazující plnobarevná cesta se NIKDY nesmí
  překrývat** — buď hlavní cesta začíná přesně tam, kde nájezd končí (`M`
  na koncovém bodu gradientu, ne na jeho začátku — viz `HeroLine.astro`
  všechny 4 tiery, `heroArcPath` v `sluzby.astro`), nebo nese nájezd JEDNU
  cestu s gradientem po celé délce, nikdy ne dvě cesty nad sebou na
  stejném úseku. Dva poloprůhledné tahy stejné barvy nad sebou se opticky
  SEČTOU na vyšší výsledné krytí než samotná cílová opacita — i když
  nájezdův poslední gradient stop barevně/opacitně přesně odpovídá hlavní
  cestě, na hranici překryvu vznikne viditelný skok krytí/tloušťky
  („zub"). Zjištěno a opraveno 1. 9. 2026 na obou místech (Hero i
  `/sluzby`) současně — obě dřív měly tuhle stejnou chybu, protože obě
  vycházely ze stejného (chybného) vzoru.
