Design Direction
patrikgajdadzis.cz
Verze: 1.0
Účel dokumentu: Závazné vizuální zadání pro Claude Design a Claude Code.
Tento dokument doplňuje:

* `docs/brand-experience-brief.md`
* `docs/content-homepage.md`

Při rozporu má přednost Brand & Experience Brief a následně tento dokument.
1. Hlavní vizuální směr
Web má působit jako moderní osobní finanční značka pro klienty s vyššími nároky na odbornost, důvěru a osobní péči.
Výsledný dojem:

* klidný,
* sebevědomý,
* čistý,
* osobní,
* moderní,
* precizní,
* prémiový kvalitou detailu.

Prémiovost nesmí vznikat pomocí zlata, okázalosti, velkých stínů nebo množství efektů.
Web nesmí připomínat:

* běžnou banku,
* pojišťovnu,
* investiční fond,
* technologický startup,
* univerzální šablonu finančního poradce,
* typický AI návrh složený z množství karet.

2. Barevný systém
Primární temně modrá
`#0F2747`
Použití:

* hlavní texty,
* nadpisy,
* navigace,
* vybrané tmavé sekce,
* footer,
* sekundární tlačítka,
* důležité linky a grafické prvky.

Hlavní světlé pozadí
`#F8FAFC`
Použití:

* hlavní pozadí webu,
* většina obsahových sekcí,
* čisté a vzdušné plochy.

Smaragdová
`#1E7A5C`
Použití:

* hlavní CTA,
* aktivní stavy,
* zvýraznění důležitých prvků,
* jemné grafické detaily,
* potvrzení úspěšných akcí.

Smaragdová má být kontrolovaný akcent. Nemá tvořit velké barevné plochy bez jasného důvodu.
Doplňkové odstíny
Je možné používat pouze technické odstíny odvozené z hlavních barev:

* čistá bílá `#FFFFFF`,
* světle šedá pro hranice,
* tlumená modrošedá pro sekundární text,
* tmavší smaragdová pro hover,
* tmavší modrá pro hover a aktivní stavy.

Nepřidávat další výrazné značkové barvy.
Nepoužívat velké vícebarevné gradienty.
3. Typografie
Hlavní a jediný font
Manrope
Používané řezy:

* 400,
* 500,
* 600,
* 

700. 

Font se používá pro:

* navigaci,
* nadpisy,
* běžné texty,
* čísla,
* CTA,
* formuláře,
* footer.

Nepřidávat druhý dekorativní nebo serifový font.
Typografický charakter

* výrazné, ale čisté nadpisy,
* kratší řádky,
* dostatek prostoru,
* minimum textu,
* dobře rozpoznatelná hierarchie,
* žádná přehnaná velikost bez obsahového důvodu.

Orientační velikosti
Hero H1

```css
font-size: clamp(2.5rem, 1.7rem + 3vw, 5rem);
line-height: 1.02;
font-weight: 700;
letter-spacing: -0.04em;

```

Nadpis sekce

```css
font-size: clamp(2rem, 1.5rem + 1.8vw, 3.25rem);
line-height: 1.1;
font-weight: 700;
letter-spacing: -0.03em;

```

Menší nadpis

```css
font-size: clamp(1.15rem, 1.05rem + 0.35vw, 1.4rem);
line-height: 1.25;
font-weight: 600;

```

Běžný text

```css
font-size: clamp(1rem, 0.96rem + 0.18vw, 1.125rem);
line-height: 1.65;
font-weight: 400;

```

Běžný text ani text formulářových polí nesmí být na mobilu menší než 16 px.
4. Layout a šířka obsahu
Hlavní kontejner
Maximální šířka obsahu:
`1240 px`
Web musí mít dostatek prostoru po stranách.
Orientační horizontální odsazení:

* malý mobil: 16 px,
* větší mobil: 20–24 px,
* tablet: 32–40 px,
* desktop: 48–64 px.

Textové odstavce nesmí být roztažené přes celou šířku obrazovky.
Maximální délka běžného textového řádku:
`60–65 znaků`
Marketingové úvodní texty mohou být ještě užší.

Wide desktop: centrované designové plátno (doplněk, 25. 8. 2026)
Web je záměrně asymetrický. Asymetrie ale nesmí znamenat, že se hlavní obsah na širokých monitorech drží u levého okraje, zatímco napravo vzniká neúměrně velké prázdno.
Rozlišovat tři vrstvy:

* pozadí sekcí a barevné pásy — mohou zůstat `full-width`,
* dekorativní kontinuální linka — může mít jiný horizontální rozsah než obsah, pokud to vyžaduje kompozice,
* hlavní obsah (text, CTA, důležité obsahové prvky) — musí mít definovaný maximální horizontální rozsah, a celý tento rozsah musí být na širokých obrazovkách horizontálně centrovaný vůči viewportu („designové plátno" / stage).

Centruje se plátno, ne jednotlivé prvky uvnitř něj. Uvnitř plátna zůstává plná editorial asymetrie z bodů výše: H1/H2 nemusí být geometricky uprostřed, textové bloky mohou být vlevo nebo vpravo, sekce mohou mít různou kompozici a velké záměrné plochy negativního prostoru — to je součást vizuálního systému, ne chyba. Chybou je jen nezáměrné prázdno, kdy obsah zůstal nalepený vlevo jen proto, že viewport narostl.
Na 1366 px a 1440 px layout dál přirozeně využívá dostupnou šířku podle schváleného designu. Od vhodného wide-desktop breakpointu (typicky 1600 px a výš) se hlavní obsah dál nesmí donekonečna roztahovat s viewportem — patří do centrovaného `max-width` plátna. Přesnou hodnotu tento dokument neurčuje závazně (orientační rozsah 1720–1760 px) — musí se ověřit při konkrétní implementaci proti 1440/1920/2048 px.
Výjimka z centrovaného plátna je povolená jen tehdy, když je záměrně definovaná schváleným designem, vizuálně odůvodněná, nezpůsobuje optické vychýlení celé stránky a je výslovně popsaná v komponentě nebo implementační specifikaci.
Při každé významné změně desktopového layoutu kontrolovat minimálně 1366 / 1440 / 1920 / 2048 px — na 1440 px se chyba wide-desktop stage nemusí vůbec projevit. Podrobnosti a závazné znění viz `CLAUDE.md`, „Konvence: wide desktop a centrované designové plátno".
5. Vertikální rytmus
Sekce mají mít dostatek prostoru, ale mobilní verze nesmí být zbytečně dlouhá.
Orientační odsazení sekcí:

```css
padding-block: clamp(4.5rem, 8vw, 8.5rem);

```

Menší navazující sekce mohou používat menší rozestup.
Claude Design nesmí každé sekci nastavovat náhodné odsazení.
Střídat různé kompozice, ne však nekonzistentní rozestupy.
6. Pozadí sekcí
Většina homepage bude světlá.
Preferované plochy:

* hlavní světlé pozadí `#F8FAFC`,
* čistě bílá pro vybrané obsahové plochy,
* temně modrá pro strategicky důležité sekce.

Temně modrou lze použít například pro:

* finální kontaktní sekci,
* vybraný důkaz autority,
* footer.

Nestřídat mechanicky každou druhou sekci mezi světlou a tmavou.
Nepoužívat velké dekorativní barevné skvrny bez významu.
7. Fotografie
Fotografie Patrika Gajdadzise jsou hlavním vizuálním prvkem webu.
Hero fotografie
Hero fotografie musí být:

* bez klasického rámečku,
* bez karty,
* bez výrazného stínu,
* bez glassmorphismu,
* přirozeně integrovaná do layoutu.

Preferované způsoby:

* vyříznutá postava na transparentním nebo sjednoceném pozadí,
* jemný přechod fotografie do pozadí stránky,
* citlivé překrytí s grafickým motivem,
* fotografie přesahující běžnou mřížku.

Fotografie nesmí působit jako obrázek vložený do šablony.
Ostatní fotografie
Kde to kompozice dovolí, používat fotografie bez:

* rámečků,
* umělých karet,
* výrazných stínů,
* automatického zaobleného obdélníku.

Zaoblení použít pouze tehdy, pokud má jasný kompoziční důvod.
Responzivita fotografií
Navrhnout zvlášť:

* desktopové zobrazení,
* tabletový ořez,
* mobilní ořez.

Obličej musí být vždy dobře viditelný.
Layout nesmí záviset na jedné přesné fotografii tak, že jej nelze později upravit.
8. Tlačítka
Primární CTA
Text:
Nezávazná konzultace
Vzhled:

* smaragdové pozadí,
* bílý text,
* Manrope 600,
* výška přibližně 52–56 px,
* zaoblení 12–14 px,
* dostatečné horizontální odsazení,
* jemná změna barvy při hoveru.

Sekundární CTA
Text:
Zavolat
Vzhled:

* světlé nebo průhledné pozadí,
* temně modrý text,
* jemný okraj,
* stejná výška a zaoblení jako primární CTA.

Pravidla

* CTA mají mít krátké texty.
* Nepoužívat extrémně kulatá pill tlačítka.
* Nepoužívat úplně ostré rohy.
* Nepoužívat gradientní tlačítka.
* Nepoužívat lesk nebo výrazné světelné efekty.
* Stejná akce musí mít na celém webu stejný text a vzhled.
* Dotyková plocha musí mít minimálně 48 px.

9. Zaoblení
Používat jednotnou hierarchii:

* malé štítky: přibližně 8 px,
* formulářová pole: 12 px,
* tlačítka: 12–14 px,
* běžné karty: 18–20 px,
* větší obsahové bloky: maximálně 24–28 px.

Nepoužívat rozdílná náhodná zaoblení napříč stránkou.
Fotografie nemusí automaticky přebírat zaoblení karet.
10. Stíny a hranice
Stíny musí být velmi jemné.
Výchozí obsahové bloky mají používat:

* jemnou hranici,
* rozdíl odstínu pozadí,
* dostatek prostoru,
* žádný nebo téměř neviditelný stín.

Silnější stín lze použít pouze u jednoho dominantního prvku, například kontaktního formuláře.
Příklad maximálního stínu:

```css
box-shadow: 0 18px 50px rgba(15, 39, 71, 0.08);

```

Nepoužívat množství plovoucích karet.
11. Karty a obsahové bloky
Web nesmí být složený převážně z mřížek stejných karet.
Střídat:

* fotografii a text,
* výraznou typografii,
* čísla,
* propojený diagram,
* případovou studii,
* krátkou citaci,
* jednoduchý proces,
* dominantní blok s menšími doplňkovými položkami.

Karty použít jen tam, kde pomáhají orientaci.
Nevytvářet kartu kolem každého krátkého textu.
12. Podpisový grafický motiv
Podpisovým motivem bude jemná propojená finanční mapa.
Motiv může používat:

* linky,
* body,
* uzly,
* jednoduché propojení finančních oblastí.

Má symbolizovat vztah mezi:

* bydlením,
* rezervou,
* ochranou,
* investicemi,
* penzí.

Motiv musí být:

* jemný,
* srozumitelný,
* funkční i bez animace,
* použitý jen na několika místech.

Nesmí připomínat:

* blockchain,
* počítačovou síť,
* umělou inteligenci,
* technologický dashboard.

13. Ikony
Používat pouze:

* jednoduché linkové ikony,
* jednu ikonovou sadu,
* jednotnou tloušťku čáry,
* temně modrou nebo smaragdovou barvu.

Nepoužívat:

* emoji,
* kombinaci více ikonových sad,
* barevné 3D ikony,
* ikonu u každého odstavce,
* generické finanční symboly bez přidané hodnoty.

Pokud ikona není potřeba pro pochopení, nepoužívat ji.
14. Animace
Animace mají být jemné a vedlejší.
Povolené:

* postupné objevení obsahu,
* posun 12–20 px,
* změna opacity,
* jemná změna barvy CTA,
* drobný pohyb šipky,
* lehké nadzvednutí vybraného prvku,
* postupné vykreslení finanční mapy.

Orientační délka běžné animace:
`400–700 ms`
Hover:
`150–220 ms`
Nepoužívat:

* agresivní parallax,
* animovaný kurzor,
* dlouhou úvodní animaci,
* nekonečné pohyby,
* automatický carousel,
* animovaný text po jednotlivých písmenech,
* prvky reagující na každý pohyb myši,
* animaci nutnou k přečtení obsahu.

Respektovat `prefers-reduced-motion`.
15. Navigace
Navigace musí být:

* čistá,
* subtilní,
* snadno čitelná,
* bez zbytečné výšky.

Obsah:

* Služby
* Jak pracuji
* Reference
* O mně
* Články
* Nezávazná konzultace

Vlevo použít textovou značku:
Patrik Gajdadzis
Navigace může být po scrollování přichycená.
Po přichycení může získat:

* jemné světlé pozadí,
* decentní hranici,
* lehké rozostření pouze tehdy, pokud nebude vytvářet glassmorphismový vzhled.

Na mobilu použít jednoduché menu.
Mobilní menu nesmí zabírat složitou víceúrovňovou strukturu.
16. Hero sekce
Hero musí být nejvýraznější částí homepage.
Preferované rozložení:

* textová část,
* integrovaná fotografie Patrika,
* dvě krátká CTA,
* minimum dalších prvků.

Hero nesmí obsahovat:

* velký formulář,
* množství karet,
* carousel,
* několik produktových nabídek,
* dlouhý odstavec,
* fotobankovou grafiku.

Důvěryhodnostní pás může navazovat přímo na hero a opticky s ním tvořit jeden celek.
Na mobilu musí být pořadí:

1. identifikace Patrika,
2. hlavní nadpis,
3. krátký text,
4. CTA,
5. fotografie nebo její vhodná část.

Claude Design může navrhnout i fotografii dříve než CTA, pokud prokáže lepší čitelnost a konverzní logiku.
17. Kontaktní formulář
Formulář má působit:

* jednoduše,
* přehledně,
* osobně,
* bezpečně.

Používat:

* stále viditelné labely,
* dostatečně vysoká pole,
* jednoduché chybové zprávy,
* jasně označená povinná pole,
* minimální počet vizuálních dekorací.

Nepoužívat:

* label pouze jako placeholder,
* výrazný plovoucí stín,
* více formulářových sloupců na mobilu,
* komplikované postupné formuláře,
* citlivé finanční údaje.

Na desktopu může mít formulář dva sloupce pouze tam, kde je to přirozené.
Na mobilu vždy jeden sloupec.
18. Responzivní návrh
Návrh musí být vytvořen minimálně pro:

* mobil přibližně 390 px,
* tablet přibližně 768–834 px,
* notebook přibližně 1280–1366 px,
* desktop přibližně 1440 px.

Návrh nesmí fungovat pouze v těchto přesných šířkách.
Musí se plynule přizpůsobovat mezilehlým rozměrům.
Na mobilu:

* žádné horizontální posouvání,
* žádný zmenšený desktop,
* žádná funkce závislá pouze na hoveru,
* dotykové prvky minimálně 48 px,
* běžný text minimálně 16 px,
* formuláře v jednom sloupci,
* samostatně kontrolovaný ořez fotografie.

19. Přístupnost
Každý návrh musí počítat s:

* dostatečným kontrastem,
* viditelným focus stavem,
* ovládáním klávesnicí,
* logickým pořadím obsahu,
* čitelnými labely formulářů,
* alternativními texty fotografií,
* omezením animací,
* dostatečnými dotykovými plochami.

Design nesmí používat pouze barvu jako jediný způsob sdělení významu.
20. Zakázané vizuální prvky
Bez výslovného schválení nepoužívat:

* glassmorphism,
* neonové efekty,
* vícebarevné gradienty,
* abstraktní 3D koule,
* AI generované dekorace,
* fotobankové rodiny,
* prasátka, mince a deštníky,
* automatické carousely,
* tmavý režim,
* velké plovoucí WhatsApp tlačítko,
* přehnaný parallax,
* animovaný kurzor,
* výrazné rámečky kolem fotografií,
* množství plovoucích karet,
* druhý font,
* pokaždé jiný styl sekce.

21. Varianty pro Claude Design
Claude Design má nejdřív vytvořit tři odlišné směry pouze pro:

* navigaci,
* hero sekci,
* CTA,
* hero fotografii,
* důvěryhodnostní pás,
* začátek následující sekce.

Varianta A — Personal Authority
Důraz na:

* Patrika jako hlavní osobnost,
* velkou integrovanou fotografii,
* osobní důvěru,
* výrazný nadpis,
* klidnou a čistou kompozici.

Varianta B — Editorial Premium
Důraz na:

* výraznou typografii,
* více volného prostoru,
* elegantní asymetrii,
* časopisecký rytmus,
* minimum karet.

Varianta C — Modern Financial
Důraz na:

* systémovost,
* jemnou finanční mapu,
* přesnost,
* současný finanční design,
* čistou práci s čísly.

Všechny varianty musí používat stejné:

* barvy,
* písmo,
* texty,
* CTA,
* fakta,
* pravidla přístupnosti,
* pravidla responzivity.

22. Co Claude Design smí rozhodnout
Claude Design může navrhnout:

* konkrétní kompozici,
* poměr textu a fotografie,
* umístění finanční mapy,
* rytmus světlých a tmavých ploch,
* asymetrii,
* způsob napojení trust baru,
* jemné dekorativní detaily,
* pořadí fotografie a textu na mobilu.

23. Co Claude Design nesmí rozhodnout
Bez schválení nesmí změnit:

* barvy,
* font,
* texty,
* hlavní CTA,
* cílovou skupinu,
* fakta,
* právní informace,
* styl komunikace,
* význam sekcí,
* základní obsahovou strukturu,
* pravidla fotografií,
* zákaz generických AI efektů.

24. Kritéria schválení designu
Návrh lze schválit pouze tehdy, pokud:

* je okamžitě jasné, kdo je Patrik,
* je okamžitě jasné, že řeší finance jako celek,
* fotografie působí přirozeně a osobně,
* hlavní CTA je dobře viditelné,
* web nepůsobí agresivně,
* design je originální, ale použitelný,
* nejsou použity generické AI dekorace,
* mobilní verze je plnohodnotná,
* texty jsou čitelné,
* stránka působí prémiově prostřednictvím detailu,
* návrh lze realisticky implementovat.

25. Závěrečný princip
Každý vizuální prvek musí podporovat alespoň jeden z těchto cílů:

* důvěru,
* orientaci,
* osobní značku,
* srozumitelnost,
* odbornost,
* konverzi.

Prvek, který žádný z těchto cílů nepodporuje, se do návrhu nepřidává.
