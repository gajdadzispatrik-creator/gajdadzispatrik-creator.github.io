# Sloupce a plátno: pruh + obsah, wide desktop, centrovaný stage

Přesunuto z `CLAUDE.md` 13. 10. 2026 beze změny obsahu (úspora tokenů –
CLAUDE.md se načítá s každou zprávou). Odkazy v kódu a dokumentech ve tvaru
„CLAUDE.md „Konvence: …““ vedou na stejnojmenný oddíl tady; „výše/níže“
může mířit do jiného souboru v `docs/konvence/` (rozcestník je v CLAUDE.md).

## Konvence: pruh (bar) + obsah vedle sebe — zarovnání prvního prvku

Platí pro layout „popisek/pruh vlevo, obsah vpravo" (`display: flex;
align-items: flex-start`) — na `/sluzby` používají `.sluzby-router__bar`
+ `.sluzby-router__list`, `.sluzby-chapter__bar` + `.sluzby-chapter__content`,
`.sluzby-areas__bar` + `.sluzby-areas__columns`, a bude ho pravděpodobně
používat i každá další podstránka s obdobnou kompozicí.

**Pravidlo:** první/hlavní prvek obsahového sloupce (první nadpis, první
karta, první řádek seznamu) musí vizuálně začínat na STEJNÉ výšce jako
text pruhu vedle něj — `align-items: flex-start` na rodiči k tomu nestačí
samo o sobě, pokud první prvek obsahu má vlastní `padding-top`/`margin-top`
(typicky proto, že sdílí styl se zbytkem seznamu pod ním, kde je ten
padding žádoucí jako mezera mezi položkami). V takovém případě dostane
PRVNÍ prvek `:first-child` výjimku (`padding-top: 0`), zbytek seznamu
pokračuje v původním rozestupu beze změny.

Tohle je nezávislé na pozici TEČKY u pruhu — ta se podle „Konvence:
kontinuální linka, tečky a text" centruje na celý text pruhu
(`rect.top + rect.height / 2`), ne na jeho horní hranu, a zůstává tak
i po zarovnání prvního prvku obsahu.

**Zjištěno a opraveno 26. 8. 2026** u `.sluzby-router__list` — první řádek
(„Chci řešit bydlení") měl stejný `padding-top: 22px` jako všechny další
řádky pod ním, takže seděl o 26 px níž než pruh „Začněte tím, co právě
řešíte." vedle něj, zatímco `.sluzby-chapter__content`/`.sluzby-areas__columns`
(bez per-item paddingu na prvním prvku) už byly zarovnané správně. Oprava:
`.sluzby-router__list li:first-child .sluzby-router__row { padding-top: 0; }`
od notebooku výš (na tabletu/mobilu je layout naskládaný pod sebe, ne vedle
sebe, takže se tam netýká).

**Vodorovné zarovnání DRUHÉHO sloupce napříč sourozeneckými sekcemi
(zjištěno a opraveno 28. 8. 2026).** Když stejný „bar + dvousloupcový obsah"
vzor používá VÍC sekcí stejného typu za sebou (`.sluzby-chapter--dominant`
a `.sluzby-chapter--plan`, obě s `lead-col` vlevo + druhý sloupec vpravo),
šířka `lead-col` (prvního sloupce) musí být na daném stupni STEJNÁ napříč
všemi variantami — i když mají různě dlouhý nadpis/text a menší `lead-col`
by se textu vešel. Jinak druhý sloupec (kde sedí text, který si čtenář
porovnává mezi sekcemi svisle nad sebou) začíná v každé sekci na jiné
vodorovné pozici, což čtenář vnímá jako neúmyslné rozjetí, i když je každá
sekce samostatně „správně" zarovnaná (bar → obsah, `align-items: flex-start`).
Nalezeno na `.sluzby-chapter--plan .sluzby-chapter__lead-col`, který měl
o 40 px užší `width` než `.sluzby-chapter--dominant`'s (kvůli kratšímu
nadpisu) — `.sluzby-chapter__list-label`/`.sluzby-chapter__statement-intro`
tak nezačínaly na stejné ose. Oprava: `lead-col` šířka sjednocena (odstraněn
`--plan`-specifický užší override na notebooku i desktopu), `font-size`
nadpisu zůstává rozdílný (to je samostatná, záměrná typografická volba,
ne příčina chyby).

**Šířka nadpisového sloupce musí být STEJNÁ napříč VŠEMI kapitolami stránky
— i mezi dvousloupcovými a jednosloupcovými layouty (zjištěno a opraveno
1. 9. 2026, `/sluzby/hypoteky`, finální řešení po dvou kolech).**

První kolo (zvrácené, zdokumentováno pro dohledatelnost — NEOPAKOVAT):
zúžení jednosloupcových kapitol (Oblasti/Průběh, `.hyp-chapter__content--single`,
tehdy 640px) na 340px, aby odpovídaly dvousloupcovým (Fáze/Rozhodnutí/
Souvislosti). Uživatel při kontrole screenshotů řekl, že se mu naopak líbí
„roztáhlejší" styl — širší sloupec jako na `/sluzby` (600px desktop/540px
notebook), ne užší 340px.

**Finální řešení:** šířka `.hyp-chapter__lead-col` sjednocena na **540px
notebook / 600px desktop** pro VŠECHNY kapitoly bez rozdílu typu layoutu —
stejné hodnoty jako `.sluzby-chapter__lead-col` na `/sluzby`. Kapitoly BEZ
vlastního `.hyp-chapter__lead-col` wrapperu (Průběh — H2 je mimo něj,
sdílí sloupec se seznamem kroků) dostaly stejnou šířku samostatně
(`#steps-heading`/`.hyp-steps`, 640px — prakticky totožné se 600px ostatních,
navázané na šířku vlastního obsahu pod nadpisem, ne na svévolnou hodnotu).

Obecné poučení pro budoucí podstránky: šířka nadpisového sloupce je
vlastnost STRÁNKY (jeden společný sloupcový systém), ne jednotlivé kapitoly
— i když má kapitola jiný typ layoutu (2 sloupce vs. 1 sloupec), nadpisový
sloupec musí zůstat stejně široký jako u sesterských kapitol. Než měnit
šířku kvůli „logice layoutu" (2sloup vs. 1sloup), ověř u uživatele, jestli
si to skutečně přeje — vizuální preference („roztáhlejší"/„užší") má
přednost před strukturální úhledností.

**Šířka pruhu (bar) musí bezpečně pojmout NEJDELŠÍ jednoslovný popisek
kapitoly na dané stránce — jinak přeteče do mezery ke sloupci obsahu
(zjištěno a opraveno 1. 9. 2026, `/sluzby/hypoteky`).** `<p>` v pruhu je
flex potomek (`align-self: stretch`), takže se NEZALOMÍ, pokud je to JEDNO
slovo bez mezery (žádná příležitost k zalomení) — místo toho text
horizontálně přeteče za hranici svého sloupce a spolyká mezeru k obsahu
vedle něj (`.hyp-chapter__bar { width: 180px }` s popiskem „Rozhodnutí"/
„Souvislosti" scvrklo mezeru z ~56 px na ~26–31 px, uživatel to nahlásil
jako „text namačkaný"). **Kontrola tohle NEODHALÍ prosté měření
`getBoundingClientRect()` na `<p>` elementu samotném** — blokový prvek
vyplňuje celou šířku svého sloupce bez ohledu na to, kam sahá skutečný
text, takže box vždy vrátí šířku sloupce. Musíš změřit skutečný okraj
TEXTU (`Range.selectNodeContents(p).getBoundingClientRect()`, nebo
vizuální kontrola screenshotem), ne box prvku. Oprava: šířka pruhu
sjednocena na 240 px (stejná hodnota jako `.sluzby-chapter__bar`/
`.sluzby-areas__bar` na `/sluzby`, tam už ověřeno bezpečné i pro
nejdelší tamní popisek „Finanční plán" — dvě slova, může se zalomit,
proto fungovalo i na užších 180 px, ale 240 px je bezpečnější univerzální
volba pro budoucí podstránky s neznámými popisky). Při zavádění pruhu s
novým textem na jakékoli budoucí podstránce zkontroluj TOUTO metodou
(Range, ne box), ne jen vizuálně na kalibrační šířce.

## Konvence: wide desktop a centrované designové plátno

Platí **globálně a automaticky** — pro homepage, všechny současné i budoucí
podstránky, nové i upravované komponenty, nové textové sekce a jakoukoli
změnu layoutu. Platí pro Claude Code i Claude Design bez ohledu na to, jestli
ji uživatel u konkrétního úkolu znovu zmíní.

Web je záměrně asymetrický — to zůstává. Asymetrie ale nesmí znamenat, že se
hlavní obsah na širokých monitorech drží u levého okraje a napravo vzniká
neúměrně velké nezáměrné prázdno.

**Princip:** pozadí sekcí, barevné pásy a dekorativní kontinuální linka
mohou zůstat `full-width` (linka může mít i jiný horizontální rozsah než
obsah, pokud to vyžaduje kompozice — nijak to nemění „Konvenci: kontinuální
linka, tečky a text" výše). Ale **hlavní obsah** sekce musí mít definovaný
maximální horizontální rozsah a celý tento rozsah musí být na širokých
obrazovkách horizontálně centrovaný vůči viewportu — „designové plátno" /
stage.

**Centruje se plátno, ne jednotlivé prvky.** Uvnitř plátna zůstává plná
editorial asymetrie: H1/H2 nemusí být geometricky uprostřed, textové bloky
mohou být vlevo nebo vpravo, sekce mohou mít různou kompozici a velké
záměrné plochy negativního prostoru — to je součást značky, ne chyba
layoutu. Chyba je jen **nezáměrné** prázdno vzniklé tím, že obsah zůstal
nalepený vlevo, protože viewport narostl.

**Rozsah:** na 1366/1440 px layout dál přirozeně využívá dostupnou šířku
podle schváleného designu beze změny. Od 1400 px (existující desktopový
stupeň — žádný nový breakpoint) se hlavní obsah dál nesmí donekonečna
roztahovat s viewportem; patří do centrovaného `max-width` plátna —
implementováno a ověřeno 25. 8. 2026, token `--stage-max: 1760px` v
`tokens.css` (mezi 1400–1759 px je hodnota no-op, sekce jsou užší; nad
1759 px se šířka zastaví a zbytek jde rovnoměrně do okrajů).

**Jeden společný souřadný základ pro VŠECHNO** (doplněno 25. 8. 2026 po
opravě nekonzistence popsané níže): full-width viewport se nikde nepoužívá
jako nezávislá horizontální základna pro běžný obsah. Všechny hlavní
obsahové horizontální souřadnice — H1/H2, odstavce, CTA, seznamy, karty,
čísla, texty a tečky u kontinuální linky — na homepage i libovolné
podstránce vycházejí z jednoho společného centrovaného stage, včetně
`Header.astro` a patičky. Výjimku tvoří jen skutečné full-bleed vrstvy
(pozadí, barevný pás, samotná SVG route, pokud technicky potřebuje celý
viewport) — a i tehdy platí, že obsahové kotvy dekorativní SVG (tečky,
zářezy, konce trasy vázané na text) se počítají ze stage, ne z viewportu.

**Implementační vzor — ZÁVAZNÉ pro každou sekci, jeden token
(`--stage-max`, tokens.css):**

`FULL-WIDTH SECTION BACKGROUND` → `CENTERED 1760px CONTENT STAGE` →
`ASYMMETRIC CONTENT`. Kořenový element sekce, který nese `background`
(barvu, gradient, obrázek — cokoli vizuálně odlišitelné od okolí), **nikdy
nesmí dostat `max-width`/`margin-inline: auto`** — zůstává full-width,
nese jen pozadí. Centrovaný strop patří na **samostatnou obsahovou
vrstvu** uvnitř sekce (existující `__inner`/`__stage` wrapper, nebo nově
zavedený, pokud sekce ještě žádný nemá):

```css
.section { /* kořen, nese background */
  position: relative; /* zůstává full-width, BEZ max-width */
}
.section__inner { /* obsahová stage vrstva */
  max-width: var(--stage-max);
  margin-inline: auto;
}
```

Díky tomu se `100%` uvnitř všech `calc(X * 100% / vb + Y)` výpočtů (CSS
i JS `getBoundingClientRect`) automaticky přepočítá vůči omezené šířce
obsahové vrstvy — beze změny jediného `calc()` vzorce, `--vb`/`--axis-x`
tokenu nebo JS `syncRoute`/`syncMarkers` funkce. Dekorativní trasa
(`.xxx__route--desktop`/`.xxx__axis--desktop`) zůstává PŘÍMÝM potomkem
kořenové sekce (ne obsahové vrstvy) a dostává STEJNÝ strop nezávisle
(`left: 50%; right: auto; width: 100%; max-width: var(--stage-max);
transform: translateX(-50%);`), protože je sourozenec obsahové vrstvy, ne
její rodič ani potomek — bez toho by obsahová vrstva a trasa sice byly OBĚ
capnuté, ale nezávisle na sobě, takže tohle jen zajišťuje, že obě dostanou
STEJNOU šířku a střed. Sekce bez vlastní trasy (StatsBand) dostane místo
wrapperu jen `max-width: calc(var(--stage-max) - <levý+pravý padding>);
margin-inline: auto;` na svůj přímý obsahový prvek (`.stats-band__list`) —
matematicky stejný výsledek, bez nutnosti nového wrapper elementu.

Tohle pravidlo platí **bez ohledu na to, jestli má sekce dnes stejnou
barvu jako okolí** (`--bg`) nebo jinou (`#FFFFFF`, tmavý gradient) — capnutí
kořenového background elementu je vždy strukturální chyba, i když se
zrovna vizuálně neprojeví, protože barva jednoho dne sedí. Aplikuj ho na
KAŽDOU novou sekci a při jakékoli budoucí úpravě existující sekce.

**Proč to dřív bylo nekonzistentní — dvě samostatné chyby, obě nalezené
a opravené 25. 8. 2026:**

1. *Obsah bez stropu.* První průchod tímhle pravidlem (dopoledne) capoval
   jen DEKORATIVNÍ TRASU plnobarevných sekcí (RouterSection, BenefitsSection,
   FaqSection, SiteFooter, StatsBand, `/sluzby`'s `.sluzby-closing`), ne
   jejich SKUTEČNÝ OBSAH — nadpisy/seznamy tam zůstaly pozicované napevno
   vůči CELÉMU viewportu (`left: 120px` nebo `100vw` uvnitř `calc()` vázané
   na neomezenou šířku sekce), zatímco jejich sousední sekce už obsah
   capovaly. `Header.astro` navíc vůbec nebyl součástí prvního průchodu a
   používal vlastní, jinak škálovaný strop (`.container`, `--content-max:
   1240px`, nesouvisející s `--stage-max: 1760px`). Výsledkem bylo, že se
   při scrollování horizontální osa obsahu mezi sekcemi opticky posouvala.
   Oprava: `.container`/`--content-max` odstraněny z `Header.astro` (token
   `--content-max` zůstal v `tokens.css` nepoužitý, nebyl nikde jinde),
   zavedeny `.router__stage`/`.benefits__stage` wrappery, `.faq__inner`/
   `.footer__inner`/`.sluzby-closing__grid` dostaly strop navíc ke svému
   existujícímu paddingu, `.stats-band__list` dostal odvozený `max-width`.

2. *Background capnutý spolu s obsahem.* Oprava bodu 1 capovala u
   „světlých" sekcí (CasesSection, ContactSection, a dalších — viz níže)
   strop přímo na kořenový element sekce, PROTOŽE u většiny z nich (Hero,
   ConnectionsSection, ProcessSection, ReviewsSection, AboutSection,
   ArticlesSection) `background: var(--bg)` je LITERÁLNĚ stejný token jako
   `body`, takže capnutí kořene je barevně neprokazatelné (nemůže vzniknout
   viditelný šev, ať dělá cokoli). CasesSection a ContactSection ale mají
   `background: #FFFFFF` — VIDITELNĚ odlišné od `--bg` (#F8FAFC) — takže
   capnutí jejich kořene omezilo i pozadí: nad `--stage-max` (1920/2048 px+)
   vznikly boční pruhy `--bg` kolem bílého středu. Oprava: strop přesunut
   z `.cases`/`.kontakt` (kořen, nese pozadí, teď zůstává full-width) na
   `.cases__inner`/`.kontakt__inner` (existující obsahová vrstva, dřív jen
   pro svislý padding), trasa (`.cases__route--desktop`/
   `.kontakt__route--desktop`, dřív bez vlastního stropu, protože ho
   implicitně dědila od capnutého kořene) dostala strop samostatně stejnou
   route-only-cap technikou jako plnobarevné sekce v bodě 1.
   Hero/ConnectionsSection/ProcessSection/ReviewsSection/AboutSection/
   ArticlesSection/`Header.astro`'s `.site-header__inner` NEBYLY
   restrukturalizované na wrapper vzor (žádný viditelný ani možný bug —
   `var(--bg)` je vždy identická barva), ale při jakékoli budoucí úpravě,
   která by některé z nich dala VLASTNÍ odlišnou barvu pozadí, MUSÍ dostat
   stejný wrapper vzor jako `.cases`/`.kontakt` výše — capnutí kořene je
   bezpečné jen do chvíle, kdy se barva pozadí od okolí odchýlí.

**Výjimka** z centrovaného plátna je povolená jen když je záměrně
definovaná schváleným designem, vizuálně odůvodněná, nezpůsobuje optické
vychýlení celé stránky a je výslovně popsaná v komponentě nebo
implementační specifikaci. Claude Code ani Claude Design ji nesmí vytvářet
svévolně. Známá, zdokumentovaná výjimka: `/sluzby`'s dekorativní trasa
používá vlastní, na `--vb` procentech nezávislou konvenci (viewBox
dynamicky sleduje SKUTEČNOU vykreslenou šířku SVG, ne nominální 1440/1366/
834/390 — viz komentář u `.sluzby__route-svg` v `sluzby.astro`), protože
obsah `/sluzby` používá pevné px odsazení, ne procenta vázaná na `--vb`
jako homepage.

**Šev `/sluzby` → `SiteFooter.astro` — opraveno 26. 8. 2026, čtvrté a
finální kolo** (tři předchozí pokusy — z-index schovávání textu, dlouhá
šikmá úsečka, krátký oblý zákrut „zub" — uživatel po každém z prvních tří
poslal screenshot s tím, že to pořád není správně; historii pokusů viz git
blame / dřívější verze téhle poznámky, pokud je někdy potřeba). Finální
řešení, dvě samostatné části v `sluzby.astro`:

1. **Jednotný posun osy, žádný zákrut.** `axis` je pevný reálný px (scaleX
   zdejšího SVG je vždy 1), zatímco `SiteFooter.astro`'s vstup roste
   procentuálně se skutečnou šířkou svého (staticky kalibrovaného) viewBoxu
   — na kalibrační šířce (1440/1366/834/390) se shodovaly, mimo ni ne (~27px
   rozjezd na 2048px). Místo dopočtu zákrutu na KONCI trasy se `axis` ROVNOU
   nahrazuje procentuálně přepočítanou verzí (`axisScaled = axis / nominalVb
   * vb`) a používá se DŮSLEDNĚ všude — v cestě (hero oblouk i rovný úsek
   pod ním), v zářezech i tečkách (`notch`/`dot` x-souřadnice). Pod
   `--stage-max` (do 1440px) je to no-op, nad ní se CELÁ trasa pod hero
   obloukem posune vpravo jako jeden nepřerušený celek — jediný ohyb na
   stránce zůstává ten v hero (existující, neměněný, „nahoře se linka
   napojí tak jak je napojena"). Aby zůstal zachovaný odstup tečka→text
   (CLAUDE.md, ≥20px) u popisků tras (Rozcestník/Hypotéky/Finanční plán/
   Další oblasti), posouvají se o STEJNOU hodnotu (`--sluzby-shift`, CSS
   custom property nastavovaná v JS) i ONY — `padding-left: calc(<původní
   hodnota> + var(--sluzby-shift, 0px))` na všech čtyřech stupních.

2. **Skutečná mezera v čáře u nadpisu „Nemusíte řešit všechno najednou.",
   NE z-index.** Nadpis nemá vlastní odsazení od kraje `.sluzby-closing__grid`
   — na desktopu např. začíná na x=100, `axisScaled` bez posunu je na x=120
   (uvnitř nadpisu, přes první písmeno „N"). Na VÝSLOVNÉ přání uživatele
   („MAŠ UDĚLAT TU LINKU PŘERUŠENOU TAM KDE LEŽÍ TEN NADPIS", text se
   NESMÍ posouvat) se `darkPath` v místě, kde `axisScaled` reálně padne do
   vodorovného rozsahu nadpisu (`getBoundingClientRect` nadpisu, měřeno
   živě), rozdělí na DVĚ samostatné `M...V` podcesty v jednom `d` řetězci —
   SVG mezi nimi nic nevykreslí, skutečná mezera (+12px rezerva nahoře/dole),
   ne spoléhání na to, že text (jen řídce pokrytý glyfy, ne plná plocha)
   čáru vizuálně překryje. Kontrola je dynamická (přepočítává se při každém
   `syncRoute()`) — na stupních, kde `axisScaled` do nadpisu nezasahuje
   (notebook/tablet), zůstává trasa vcelku, žádná zbytečná mezera.

   Kritická chyba nalezená a opravená PŘI implementaci bodu 1: zářezy/tečky
   zůstaly omylem na starém `axis` místo `axisScaled` (jen cesta byla
   opravená) — způsobilo by to, že by tečka „ujela" od popisku (odstup
   46,67px místo 20px na 2048px). Opraveno, ověřeno přeměřením všech čtyř
   popisků na 2048px (odstup 20px, délka zářezu 36px, shodné se
   sjednocením z předchozího úkolu).

   Ověřeno `getPointAtLength`/`getBoundingClientRect` na 390/834/1366/1440/
   1920/2048/2560 px — tmavý úsek svisle konstantní (X rozptyl 0px) všude,
   šev vůči `SiteFooter.astro` 0px všude, mezera u nadpisu se objevuje
   přesně na stupních, kde se osa a nadpis reálně kryjí (2048/1920/2560/1440/
   390), a chybí tam, kde se nekryjí (1366/834) — nadpis samotný beze změny
   pozice na žádném stupni.

3. **Nájezdový gradient — jen na skutečném začátku linky, ne na `/sluzby`'s
   napojení na Connections (opraveno 26.–28. 8. 2026, dvě kola).** Homepage
   má nájezdový gradient (smaragdová → modrá, `LineGradientDefs.astro`) na
   SKUTEČNÉM začátku trasy — v Hero, u H1. Krátce se to omylem zavedlo i na
   začátku ConnectionsSection.astro (hned po přerušení stat pásem) — to ale
   NENÍ nový začátek linky, jen pokračování TÉŽE linky po vizuálním zmizení
   za pásem (viz vlastní hlavičkový komentář ConnectionsSection.astro:
   „nájezd začíná na y=0... sekce navazuje přímo na statistický pás, za
   kterým mizí konec Hero linky"). Uživatel po nasazení na obě místa nahlásil,
   že to působí jako by se linka na homepage „restartovala" uprostřed
   stránky — `s2-line-entry-*` gradient/`<defs>` v ConnectionsSection.astro
   byl proto ODSTRANĚN, cesta se vrátila na jednobarevnou `var(--line)` @
   `.18` (stejná konvence jako ProcessSection/RouterSection/…). Obecné
   pravidlo (viz nová konvence „Nájezdový gradient jen na začátku linky"
   níže): efekt patří jen na první segment routy STRÁNKY (typicky její
   hero), ne na každé mezisekční napojení.

   `/sluzby` naopak nájezd nikdy neměla a DOSTALA ho — protože její hero je
   skutečný, samostatný začátek vlastní linky (analogie k homepage Hero, ne
   k Connections). Jen pro `hero: true` stupně (laptop/desktop — jediné, kde
   trasa vstupuje shora dolů z hlavičky; tablet/mobil na `/sluzby` žádnou
   trasu do hero nemají, §4 originálního zadání, beze změny). Svislý gradient
   (na rozdíl od vodorovného u Hero, protože tady trasa vstupuje shora, ne od
   H1 vodorovně) na `M {entry} {HERO_ENTRY_START_Y} L {entry} {+100}` (osa
   `entry`, beze změny s viewportem — leží v prázdném prostoru napravo od
   `.sluzby-hero__text`, ověřeno 1300/1440px).

   **Mezera od hlavičky (doplněno 28. 8. 2026).** Trasa v hero dřív začínala
   na `y=-20` (prakticky slepená na hranici hlavičky, žádný vizuální odstup)
   — na výslovné přání uživatele teď začíná na `y=40`
   (`HERO_ENTRY_START_Y` konstanta v `<script>` v `sluzby.astro`, musí sedět
   s `y1`/`y2` v `<LineGradientDefs>` a `d` entry overlaye v markupu nad ním
   — tři místa, jedna hodnota). Ověřeno živě: `mainTop === headerBottom`,
   trasa se objevuje 40px pod tím, ne v `0`.

   **Jemnost přechodu (doplněno 28. 8. 2026).** Gradient stops v
   `LineGradientDefs.astro` byly příliš ostré (skok 0→65% opacity během
   prvních ~19 % délky) — na přání uživatele („udělej ten přechod jemnější")
   zmírněno na pozvolnější náběh s nižším vrcholem (~32%/68% zlomy, nižší
   peak opacity ~0.4 místo ~0.6) u všech tří tierů (`desktop`/`laptop`/
   `tablet`) — sdílená komponenta, mění se tedy současně pro Hero i
   `/sluzby`.

   **Skok krytí/tloušťky na konci nájezdu — „zub" (opraveno 1. 9. 2026).**
   Nájezdová (`hero-line__entry`/`sluzby__route-entry`) a hlavní trasa se
   na úseku nájezdu vždy PŘEKRÝVALY — hlavní trasa (plná barva `--line` @
   .18) kreslila i tenhle úsek, nájezd přes ni. Dva poloprůhledné tahy
   STEJNÉ barvy nad sebou se opticky sečtou na vyšší výsledné krytí, než má
   samotná `.18` — na konci nájezdu (kde nájezdův poslední stop = `--line` @
   .18, tedy vizuálně STEJNÝ jako hlavní trasa) proto vznikal viditelný
   skok krytí/tloušťky, uživatel to popsal jako „tučná linka do tenčí,
   nějaký zub". Oprava: hlavní trasa teď kreslí `d` až OD KONCE nájezdu
   (Hero: `M` na `x2` gradientu místo `x1`; `/sluzby`: `heroArcPath` začíná
   na `HERO_ENTRY_START_Y + HERO_ENTRY_LENGTH` místo na `HERO_ENTRY_START_Y`)
   — cesty na sebe navazují BEZ překryvu, žádné sčítání krytí, přechod je
   matematicky hladký. Týká se všech čtyř tierů `HeroLine.astro` (desktop/
   laptop/tablet/tablet-wide) i obou hero tierů `sluzby.astro` (laptop/
   desktop). **Obecné pravidlo pro budoucí nájezdy:** nájezdová cesta a
   navazující plnobarevná cesta se nikdy nesmí překrývat — buď hlavní
   cesta začíná přesně tam, kde nájezd končí (tahle technika), nebo
   (alternativně) nese nájezd JEDNU cestu s gradientem po celé délce, ne
   dvě cesty nad sebou.

**Povinné testovací šířky** při každé významné změně desktopového layoutu:
1366 / 1440 / 1920 / 2048 px (2560 px navíc, pokud to jde snadno ověřit).
Pokud změna ovlivňuje responzivitu celé sekce, kontrolovat i 834 / 390 px.
Nestačí testovat jen 1440 px — chyba wide-desktop stage se tam nemusí vůbec
projevit, protože je pod `--stage-max` no-op. Při scrollování CELOU
stránkou (ne jen izolovanou sekcí) na těchto šířkách hledat horizontální
„skok" kompozice mezi sousedícími sekcemi — to je přesně třída chyby, která
unikla prvnímu průchodu (viz výše).

Zachovej všechny stávající konvence trasy při budoucí implementaci
(procentuální přepočty, `preserveAspectRatio="none"`, skutečné pozice přes
`getBoundingClientRect`, `ResizeObserver`, `document.fonts.ready`,
`npm run check:layout`) — rozliš `viewport`/`full-width` vrstvu, centrovaný
content stage a dekorativní route vrstvu; linka smí mít jiný rozsah než
stage, text a důležité obsahové prvky musí stage respektovat vždy.

`npm run check:layout` obsahuje od 25. 8. 2026 samostatnou kategorii
kontrol právě pro tenhle mechanismus (`WIDE_STAGE_CHECKS` ve
`scripts/audit-layout.mjs`) — ověřuje na 1440/1920/2048/2560 px, že
odstup mezi dvěma prvky na RŮZNÝCH sekcích, které mají ležet na stejné ose
(např. Header logo vs. Hero H1, nadpis Connections vs. nadpis Benefits),
zůstává konstantní. Existující `TIER_WIDTH_PAIRS`/`FLAT_CHECKS` k tomu
nestačí — jejich desktopový pár (1440/1700 px) nikdy neopouští no-op zónu
pod `--stage-max` (1760 px), takže by přesně tuhle třídu regrese vůbec
nezachytil (FLAT_CHECKS navíc testuje opačnou vlastnost — konstantní
POZICI JEDNOHO prvku, což je legitimně pravda jen pod `--stage-max`, ne
nad ním, takže se jeho páry NESMÍ rozšiřovat na širší rozsah bez rozmyslu).
Žádná z těchto kontrol netestuje BARVU pozadí (jen geometrii) — chybu
z bodu 2 výše (background capnutý spolu s obsahem) `check:layout`
nezachytí; při každé úpravě stropu na kořenovém elementu sekce proto
ručně ověř `getComputedStyle(section).backgroundColor` na kraji i uprostřed
viewportu nad `--stage-max`, ne jen pozice prvků.

Zdroj: úkol „wide desktop a centrované designové plátno" (25. 8. 2026), viz
i doplněk v `docs/design-direction.md` §4. Implementováno 25. 8. 2026 na
homepage i `/sluzby`, opraveno téhož dne ve dvou samostatných kolech (viz
„Proč to dřív bylo nekonzistentní" výše — nejdřív chybějící strop na
obsahu plnobarevných sekcí, pak omylem capnuté pozadí u CasesSection/
ContactSection) — `npm run check:layout` 206/206, `npm run build` bez
chyb, ověřeno 1366/1440/1920/2048/2560 px a regresně 834/390 px.
