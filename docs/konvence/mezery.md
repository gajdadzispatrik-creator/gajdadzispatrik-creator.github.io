# Mezery: šířky stupňů, nadpis → text, mezi sekcemi, mezi bloky

Přesunuto z `CLAUDE.md` 13. 10. 2026 beze změny obsahu (úspora tokenů –
CLAUDE.md se načítá s každou zprávou). Odkazy v kódu a dokumentech ve tvaru
„CLAUDE.md „Konvence: …““ vedou na stejnojmenný oddíl tady; „výše/níže“
může mířit do jiného souboru v `docs/konvence/` (rozcestník je v CLAUDE.md).

## Konvence: schválené šířky 375 a 768 jako vzor pro celý stupeň

Doplněno 4. 10. 2026 — uživatel schválil mobil na **375 × 812** a tablet na
**768 × 1024**. Ostatní šířky stupně (mobil 320–767, tablet 768–1199) mají
z nich vycházet: **mezery, rozestupy a pravidla (tečky, zářezy, nadpis →
text, konce sekcí) stejné jako na schválené šířce.**

- **Plynulé zvětšování je v pořádku a záměrné** — hero (nadpis, výška,
  fotka) a hlavička na tabletu rostou `clamp(…, calc(… + k * (100vw -
  834px)), …)` směrem k notebooku, aby přechod mezi zařízeními neskákal.
  Nezamrazovat na pevné px (zkusilo se 4. 10. 2026 a uživatel to vrátil:
  „chtěl jsem, ať se to zvětšuje normálně, jen mezery ať vychází
  z odsouhlasených“).
- Co se zvětšovat NEMÁ: mezery mezi položkami jen proto, že se text na
  širším okně zalomí na méně řádků. Položky na lince s pevnými pozicemi
  (Rozcestník, Proces na mobilu) se proto řadí v JS podle skutečné výšky
  textu s pevnou mezerou (`layoutMobileAreas`, `layoutMobileSteps`) —
  pevné `--y` platí jen jako výchozí stav bez JS.
- Kontrola: porovnat stránky na šířkách stupně se schválenou šířkou
  (mezery mezi bloky, přetečení, překryvy) + `check:spacing`.


## Konvence: mezera nadpis → úvodní text

Platí pro nadpis (`<h2>`) bezprostředně následovaný jedním krátkým úvodním
odstavcem (ne seznamem otázek, ne řádkem s CTA a víc prvky). Zjištěno
24. 8. 2026 při srovnání sekcí — nejnovější tři (CasesSection, ArticlesSection,
ContactSection) se nezávisle ustálily na stejné hodnotě, starší sekce
(Hero, ConnectionsSection) mají 3–6× větší mezeru z doby před touto konvencí.

- **Mezera: 14 px mobil, 14–18 px vyšší stupně** (přesná hodnota v rámci
  tohoto rozsahu je na úvaze — jde o řád velikosti, ne fixní číslo).
- **Mechanismus: `gap` na flex sloupci** obalujícím nadpis i text
  (`display: flex; flex-direction: column; gap: <hodnota>`), ne `margin-top`
  na textu a ne absolutní `top` na obou zvlášť. `gap` na flow layoutu se
  automaticky nerozjede, když se nadpis zalomí na jiný počet řádků (viz
  obecné pravidlo „flow layout místo pevného `top`" v hlavičkových
  komentářích ContactSection.astro/CasesSection.astro) — přesně třída
  chyby, kterou absolutní pozicování (viz ConnectionsSection.astro) svádí
  udělat znovu.
- Hero.astro **vědomě není** přizpůsobené této konvenci (schválený, hotový
  návrh z doby před jejím ustálením) — needituj ho kvůli tomuto pravidlu
  bez výslovného zadání. ConnectionsSection.astro byla dřív taky výjimka,
  ale na žádost uživatele (1. 9. 2026) sjednocena na 14px stejně jako
  CasesSection/ArticlesSection/ContactSection/podstránky — `top` hodnoty
  `.connections__text` na všech čtyřech stupních teď počítají s `+14px`
  místo `+18px`.

Referenční implementace: `CasesSection.astro` (`.cases__intro`),
`ContactSection.astro` (`.kontakt__intro`).

**Platí i pro OPAKOVANÉ položky, ne jen pro jeden hlavní nadpis sekce**
(doplněno 1. 9. 2026, `/sluzby` a `/sluzby/hypoteky`). Kdykoli je vzor
„krátký tučný nadpis/název → vysvětlující text" uvnitř seznamu/řádku
(karta, řádek tabulky, FAQ otázka+odpověď, krok procesu), platí STEJNÝCH
14px, ne menší hodnota jen proto, že se prvek opakuje víckrát na stránce.
Zjištěno na `.hyp-areas__row`, `.hyp-step`, `.hyp-faq__row` (6–8px),
`.sluzby-areas__col`, `.sluzby-router__row` (8–10px) — všechno stejná
rodina vztahu nadpis→text jako `.cases__intro`, jen s jinou (nižší,
nezdůvodněnou) hodnotou. Sjednoceno na 14px. Týká se jen svislého úseku —
pokud stejný pár na vyšším stupni přejde na řádkový grid vedle sebe (text
vpravo od nadpisu, ne pod ním), gap tam řeší jinou vlastnost (typicky
`column-gap`) a 14px se na něj nevztahuje.

**14px platí jen pro vztah nadpis→text, NE mezi dvěma větami/odstavci,
které pokračují jednu myšlenku** (zjištěno týž den, hned po zavedení
pravidla výše — `.hyp-phase`/`.hyp-step`/`.hyp-chapter__statement-col`
mají někdy dvě věty jako dva `<p>`, ne jeden odstavec). Když text obsahuje
víc takových vět, obal je do VLASTNÍHO wrapperu s menším gapem (~8px,
`display:flex;flex-direction:column;gap:8px`) a nech 14px z rodiče
uplatnit se jen JEDNOU — mezi nadpisem/zvýrazněnou větou a celým tímhle
blokem, ne mezi každou dvojicí sourozenců bez rozdílu. Referenční
implementace: `.hyp-phase__body`, `.hyp-step__body`,
`.hyp-chapter__statement-body` v `sluzby/hypoteky.astro`.

## Konvence: mezera mezi sekcemi (symetrický padding, ne margin)

Platí **globálně a automaticky** — pro homepage i pro každou budoucí
podstránku, bez ohledu na to, jestli to zadání znovu zmíní.

Sousední sekce (`<section>`, `<footer>`) na tomto webu na sebe navazují
BEZ marginu mezi nimi (kvůli kontinuální SVG trase, která musí procházet
švem beze skoku — viz „Konvence: kontinuální linka, tečky a text" výše).
Z toho plyne: **reálná mezera mezi obsahem dvou sousedních sekcí = součet
vlastního `padding-bottom` první sekce a `padding-top` druhé sekce.**
Žádný jiný mechanismus tu mezeru netvoří.

**Pravidlo:** `padding-top` a `padding-bottom` každé sekce musí být na
každém stupni STEJNÉ (symetrické), pokud pro asymetrii není explicitní,
zdokumentovaný důvod (např. sekce, která má být od sousední záměrně blíž
kvůli tematickému seskupení — a i pak to musí být okomentované, ne tiché).
Bez toho vznikne nekonzistentní rytmus: sekce s `padding-bottom: 0` (nebo
jakoukoli hodnotou menší než její vlastní `padding-top`) dá další sekci
POLOVIČNÍ (nebo jinak menší) mezeru než mají ostatní přechody na stránce —
vizuálně se to projeví jako „namačkaná" dvojice sekcí uprostřed jinak
pravidelně rozestupovaného webu.

**Zjištěno a opraveno 26. 8. 2026** na `/sluzby`: `.sluzby-chapter--plan`
(kapitola „Finanční plán") mělo `padding-bottom: 0` na všech stupních,
zatímco sousední `.sluzby-chapter--dominant` („Hypotéky") a `.sluzby-areas`
(„Další oblasti") měly padding symetrický. Přechod Hypotéky→Finanční plán
tak měl dvojnásobnou mezeru (padding obou sekcí) oproti přechodu Finanční
plán→Další oblasti (jen padding jedné sekce, protože druhá strana měla 0) —
uživatel to popsal jako „moc namačkané". Oprava: `padding-bottom` sjednocen
s `padding-top` na všech stupních (base/tablet/notebook/desktop).

**Homepage na mobilu (<768) — 72 px nahoře i dole u každé sekce**
(sjednoceno 1. 10. 2026 na 96 px, 4. 10. 2026 na přání uživatele zmenšeno
na 72 px — mezi sekcemi se stejným pozadím působilo 192 px prázdně; mezery
mezi položkami v Procesu, Výhodách a hodnocení → první recenze 56 px): od horní hrany sekce k prvnímu
obsahu (nadpis) a od posledního obsahu (text, odkaz, tlačítko, u fotky
s rozpuštěním konec viditelné části) ke spodní hraně, Connections až
Kontakt. U sekcí s pevnou výškou (Connections, Router, Process) to drží
souřadnice + výška sekce; RouterSection výšku na mobilu dopočítává v JS
(popisky se na úzkých telefonech zalamují). Hero, statistický pás
a patička mají vlastní rytmus.

**Kontrola při tvorbě/úpravě sekce:** neposuzuj jen CSS hodnoty izolovaně —
změř v prohlížeči skutečnou mezeru mezi POSLEDNÍM viditelným prvkem jedné
sekce (typicky odkaz/CTA/poslední řádek posledního sloupce — ne hranici
`<section>` samotnou, ta je vždy 0) a PRVNÍM viditelným prvkem další sekce
(nadpis, pruh/bar), a porovnej ji s mezerami u ostatních přechodů na téže
stránce. Pokud je nápadně menší nebo větší bez zdůvodnění, jde o stejnou
třídu chyby jako výše.

## Konvence: mezera MEZI BLOKY uvnitř sekce (flex `gap`, ne izolovaně CSS hodnoty)

Platí **globálně a automaticky** — pro homepage i pro každou budoucí
podstránku. Doplněk k „Konvenci: mezera mezi sekcemi" výše — ta řeší mezeru
MEZI sekcemi, tahle mezeru MEZI bloky (úvodní text → seznam, nadpis →
seznam kroků, dvě po sobě jdoucí věty v postranním sloupci) uvnitř jedné
sekce, kde je `flex; flex-direction: column; gap: <N>px` na společném
rodiči zavedený vzor napříč webem (`.sluzby-chapter__content`,
`.hyp-chapter__content` apod.).

**Zjištěno a opraveno 1. 9. 2026** na `/sluzby/hypoteky` — uživatel nahlásil
„text je na sobě moc namačkaný" u čtyř kapitol. Dvě samostatné příčiny,
obě stejná rodina chyby (mezera se spoléhá na `gap`, ale něco ho tiše
zruší nebo zdvojí):

1. **Responzivní override změnil `display` a tím zahodil `gap`.** Base
   pravidlo mělo `display: flex; gap: 32px`, notebook+ override pro
   jednosloupcovou variantu (`.hyp-chapter__content--single`) přepsal na
   `display: block` — `gap` platí jen na flex/grid kontejneru, na `block`
   se prostě ztratí, žádná náhrada za něj nenastoupí. Úvodní text
   (Oblasti/Průběh) pak seděl nalepený přímo na navazující seznam.
   **Pravidlo:** měníš-li v responzivním override `display`, buď zachovej
   `flex`/`grid` (jen změň směr/šablonu), nebo za ztracený `gap` vědomě
   dosaď náhradu (`margin-top` na dětech) — nikdy ho neztrácej mlčky.
2. **`gap` na rodiči + vlastní `margin-top` na dítěti se SČÍTAJÍ.** `gap`
   mezi flex položkami nekoliduje s jejich vlastními external margins —
   obojí se přičte. `.hyp-steps` mělo `margin: 24px 0 0` navíc k rodičovu
   `gap: 40px` (h2 → seznam kroků vyšlo 64px), `.hyp-steps__closing` mělo
   `margin: 36px 0 0` navíc ke stejnému `gap` (seznam → závěrečná věta
   místo zamýšlených ~40px vyšlo výrazně víc). Menší z těchto dvou chyb je
   neškodná (jen víc vzduchu), ale svědčí o stejném architektonickém
   problému — **vyber JEDEN zdroj mezery mezi danou dvojicí bloků, ne oba
   zároveň.** Preferuj `gap` na rodiči (funguje automaticky pro všechny
   sourozence bez nutnosti pamatovat na `:first-child`/`:last-child`
   výjimky) a nech dětem `margin: 0`.

**Kontrola:** stejná jako u mezery mezi sekcemi — změř v prohlížeči
skutečnou mezeru mezi KAŽDÝMI dvěma po sobě jdoucími bloky uvnitř sekce
(`getBoundingClientRect`, ne jen čtení CSS), na stupni, kde se `gap`
poprvé mění (typicky notebook 1200px). Nespoléhej na to, že vizuálně
„vypadá to podobně jako jinde" — konkrétní px hodnotu ověř.
