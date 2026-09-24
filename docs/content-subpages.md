# Obsahový master dokument — podstránky patrikgajdadzis.cz

Tento dokument je zdrojem pravdy pro obsah podstránek webu `patrikgajdadzis.cz`.
Při rozporu platí vyšší dokumenty podle hierarchie v `CLAUDE.md`, zejména:

1. `docs/brand-experience-brief.md`
2. `docs/art-direction-financial-architecture.md`
3. `docs/design-direction.md`
4. `docs/content-homepage.md`
5. `docs/content-subpages.md`

Claude Code ani Claude Design nesmí svévolně měnit schválené texty, fakta,
positioning, CTA ani strukturu obsahu.

Tento dokument zakládá informační architekturu podstránek. **Neimplementuje
žádnou stránku** — žádná z podstránek popsaných níže zatím neexistuje v
`src/pages/`. Homepage, existující komponenty, navigace ani URL existujících
odkazů se tímto dokumentem nemění.

---

## Standardní pole pro každou podstránku

Každá kapitola níže má (nebo bude mít, jakmile bude zadání schválené) tato pole:

- Úloha stránky
- Cílový návštěvník
- Search intent
- Obchodní cíl
- H1
- Hero text
- Sekční struktura
- Finální copy
- Primární CTA
- Sekundární CTA
- Interní odkazy
- SEO title
- Meta description
- FAQ
- Strukturovaná data / schema
- Poznámky pro Claude Design
- Stav schválení

Tam, kde zatím nemáme schválené zadání, je pole vyplněné `[BUDE DOPLNĚNO]`.
Nic v těchto polích není domyšlené ani odhadnuté.

---

## `/sluzby`

**Stav:** základní obsahová strategie SCHVÁLENA · struktura stránky SCHVÁLENA ·
první verze copy SCHVÁLENA PRO DALŠÍ PRÁCI · vizuální návrh (koncept SVC-07,
zkrácená osnova) IMPLEMENTOVÁN · implementace PROVEDENA (`src/pages/sluzby.astro`,
25. 8. 2026) · detailní stránky jednotlivých služeb DOSUD OBSAHOVĚ
NEDOPRACOVÁNY. Obsah níže **není definitivně uzamčený** — text bude ještě
možné jednotlivě upravovat.

**Zkrácení osnovy (25. 8. 2026):** sekční osnova byla zkrácena z deseti na
šest sekcí (koncept SVC-07; koncepty SVC-01–SVC-06 a SVC-08 byly zamítnuty).
**Žádný text nebyl smazán.** Odstavce, které na zkrácené `/sluzby` už nejsou,
byly přesunuty do kapitol detailních stránek služeb (`/sluzby/hypoteky`,
`/sluzby/financni-plan`, `/sluzby/pojisteni`, `/sluzby/investice`,
`/sluzby/penze`, nově založené níže) nebo do kapitoly `/pristup` (sekce „Jak
spolupráce začne“). H2 a text zrušené samostatné sekce „Finální CTA“ jsou
uloženy jako rezerva pro budoucí `/kontakt` na konci sekce 6 níže — viz
„Rezerva textu pro /kontakt“.

### Úloha stránky

Hlavní rozcestník služeb Patrika Gajdadzise.

Stránka nemá působit jako katalog finančních produktů.

Návštěvník má:

- poznat svou aktuální situaci,
- rychle pochopit, s čím mu Patrik může pomoci,
- pochopit způsob práce,
- nemít pocit, že musí okamžitě řešit všechny své finance,
- mít možnost přejít na detail konkrétní služby nebo rovnou na nezávaznou konzultaci.

Hypotéky a bydlení jsou na této stránce dominantní vstupní službou.
Finanční plán je druhá nejdůležitější oblast a vysvětluje širší způsob
Patrikovy práce. Pojištění, investice a penze mohou být na této rozcestníkové
stránce obsahově kompaktnější.

### Pracovní H1

`Co potřebujete vyřešit?`

### Hlavní služby (v tomto pořadí)

1. Hypotéky a bydlení
2. Finanční plán
3. Pojištění
4. Investice
5. Penze

### Situační rozcestník (souhrn)

- Chci řešit bydlení
- Chci dát finance do pořádku
- Chci ochránit příjem a rodinu
- Chci investovat peníze
- Chci se připravit na penzi

### Důležitý obchodní princip

Návštěvník nemusí řešit všechny finance najednou. Pokud přijde pouze s
hypotékou, řeší se nejdříve hypotéka. Další oblasti se otevírají pouze tehdy,
pokud dávají v jeho situaci smysl.

### SEO

**SEO title**
`Hypotéky, investice, pojištění a finanční plán | Patrik Gajdadzis`

**Meta description**
`Pomohu vám s hypotékou, finančním plánem, pojištěním, investicemi a penzí. Osobně v Ostravě nebo online po celé ČR.`

### Sekční osnova — schválená copy

#### 1. Hero

**H1**
`Co potřebujete vyřešit?`

**Hero text**
`Můžete přijít s hypotékou, investicí nebo jednou konkrétní otázkou. Začneme tím, co potřebujete vyřešit právě teď, a nastavíme další krok podle vaší situace.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

#### 2. Situační rozcestník

**H2**
`Začněte tím, co právě řešíte.`

Návštěvník nemá být nucen přemýšlet v názvech finančních produktů. Má se
poznat v konkrétní situaci.

**Chci řešit bydlení**
`Zjistit, na jakou nemovitost dosáhnu, vyřídit hypotéku, financovat rekonstrukci nebo upravit stávající úvěr.`
Odkaz: `Hypotéky a bydlení`

**Chci dát finance do pořádku**
`Zjistit, co už mám nastavené dobře, kde jsou slabá místa a co má smysl řešit jako první.`
Odkaz: `Finanční plán`

**Chci ochránit příjem a rodinu**
`Nastavit pojištění podle skutečných finančních dopadů, ne jen podle nabídky pojišťovny.`
Odkaz: `Pojištění`

**Chci investovat peníze**
`Nastavit investice podle cíle, času a rizika, které dává smysl podstoupit.`
Odkaz: `Investice`

**Chci se připravit na penzi**
`Spočítat, kolik bude potřeba vytvořit vlastního majetku a jak se k této částce postupně dostat.`
Odkaz: `Penze`

#### 3. Hypotéky a bydlení

*Poznámka pro Claude Design: tato služba má být v budoucím designu stránky
vizuálně dominantnější než ostatní služby.*

**H2**
`Bydlení začíná čísly, ne podpisem rezervace.`

**Text**
`Nejlepší chvíle začít řešit hypotéku je ještě před tím, než si vyberete konkrétní nemovitost.`

**Pomáhám například s**

- koupí bytu nebo domu,
- výstavbou,
- rekonstrukcí,
- refinancováním hypotéky,
- změnou nebo navýšením stávajícího úvěru,
- dalším financováním spojeným s bydlením.

**CTA**
`Zjistit více o hypotékách`
Cílová URL: `/sluzby/hypoteky`

**Obsahové pravidlo**
`/sluzby/hypoteky` nesmí být kopií `hypotekaostrava.cz`. Osobní web má
hypotéku prezentovat jako součást poradenské práce Patrika Gajdadzise a jeho
osobní značky.

*Zkráceno 25. 8. 2026: dvě věty a „Důležitý text“ přesunuty do kapitoly
`/sluzby/hypoteky` níže — viz její „Přesunutý text z /sluzby“.*

#### 4. Finanční plán

**H2**
`Aby jedno rozhodnutí nerozbilo druhé.`

**Text**
`Hypotéka ovlivní rezervu. Výše rezervy ovlivní, kolik můžete investovat. Příjem zase určuje, jak velké riziko by pro rodinu znamenala pracovní neschopnost nebo invalidita.`

**Výstup pro klienta**
Úvod: `Nemáte mít více produktů. Máte vědět:`
Zvýrazněná věta: `co řešit, proč to řešit a v jakém pořadí.`

**CTA**
`Finanční plán`
Cílová URL: `/sluzby/financni-plan`

*Zkráceno 25. 8. 2026: dvě věty přesunuty do kapitoly `/sluzby/financni-plan`
níže.*

#### 5. Další oblasti (Pojištění, Investice, Penze)

Tři rovnocenné kolony na jedné úrovni, každá H2 + jedna věta + CTA.

**Pojištění**
H2: `Pojištění má chránit váš rozpočet. Ne sbírku smluv.`
Text: `Nejdřív řeším, co by pro vás nebo vaši rodinu znamenal dlouhodobý výpadek příjmu, invalidita, úmrtí nebo škoda na majetku.`
CTA: `Pojištění`
Cílová URL: `/sluzby/pojisteni`

**Investice**
H2: `Investice začínají cílem. Ne produktem.`
Text: `Jiné řešení dává smysl pro peníze, které můžete potřebovat za několik let, a jiné pro majetek, který budujete na několik desetiletí.`
CTA: `Investice`
Cílová URL: `/sluzby/investice`

**Penze**
H2: `Na penzi je důležitější částka než název produktu.`
Text: `Cílem není „mít penzijko". Cílem je mít v budoucnu dost vlastních peněz.`
CTA: `Penze`
Cílová URL: `/sluzby/penze`

*Zkráceno 25. 8. 2026: u Pojištění a Investic přesunuty zbylé věty do
kapitol `/sluzby/pojisteni` a `/sluzby/investice`; u Penze přesunuty dvě
úvodní věty do `/sluzby/penze` (zůstala jen závěrečná věta o cíli). Viz
příslušné kapitoly níže.*

#### 6. Nemusíte řešit všechno najednou

**H2**
`Nemusíte řešit všechno najednou.`

**Text**
`Přijdete-li kvůli hypotéce, vyřešíme nejdřív hypotéku.`
`Když při tom zjistíme, že dává smysl upravit rezervu, ochranu příjmu nebo investice, vysvětlím vám proč a co by změna přinesla.`

Zvýrazněná závěrečná věta: `Co budete chtít řešit dál, je na vás.`

**Primární CTA** (přesunuto sem z bývalé samostatné sekce 10 „Finální CTA“,
25. 8. 2026)
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

**Psychologický význam sekce**
Sekce má odbourat obavu, že návštěvník přijde například kvůli hypotéce a
finanční poradce mu bude automaticky chtít předělávat všechny smlouvy a
finance. Tento význam zachovej i při pozdějším návrhu stránky.

**Rezerva textu pro `/kontakt` (nepoužito na `/sluzby`, 25. 8. 2026)**
Bývalá samostatná sekce 10 „Finální CTA“ byla jako sekce zrušena. Její H2 a
text se na `/sluzby` nepoužívají, ale nemažou se — jsou tu uložené jako
rezerva pro budoucí obsah `/kontakt`:
H2: `Začněme tím, co potřebujete vyřešit teď.`
Text: `Na první konzultaci si ujasníme vaši situaci a další krok. Nemusíte předem vědět, jaký produkt nebo službu potřebujete.`

**Poznámka o duplicitě (doplněno 8. 9. 2026):** stejný H2+text byl mezitím
navržen i jako Finální CTA kapitoly `/pristup` (sekce 9 její osnovy) —
viz její poznámka u té sekce. Zatím není rozhodnuté, jestli finální CTA
bude na `/pristup` i budoucím `/kontakt` identické, nebo jestli si
`/kontakt` při své budoucí tvorbě zvolí jiný text. Tahle rezerva se proto
nemaže ani nepřepisuje — jen se eviduje, že stejná copy je teď použitá/
navržená na dvou místech, aby při pozdější tvorbě `/kontakt` nevznikla
nechtěná duplicita bez povšimnutí.

*Bývalá sekce 9 „Jak spolupráce začne“ byla jako celá sekce přesunuta do
kapitoly `/pristup` — viz její „Přesunutý obsah z /sluzby“.*

### Interní odkazy

Plánované interní odkazy (zaznamenáno, **zatím neimplementováno**):

- `/sluzby/hypoteky`
- `/sluzby/financni-plan`
- `/sluzby/pojisteni`
- `/sluzby/investice`
- `/sluzby/penze`
- `/pristup`
- `/recenze`
- `/kontakt`

### Standardní pole

| Pole | Hodnota |
|---|---|
| Úloha stránky | viz „Úloha stránky" výše |
| Cílový návštěvník | `[BUDE DOPLNĚNO]` |
| Search intent | `[BUDE DOPLNĚNO]` |
| Obchodní cíl | `[BUDE DOPLNĚNO]` |
| H1 | `Co potřebujete vyřešit?` (schváleno) |
| Hero text | `Můžete přijít s hypotékou, investicí nebo jednou konkrétní otázkou. Začneme tím, co potřebujete vyřešit právě teď, a nastavíme další krok podle vaší situace.` (schváleno) |
| Sekční struktura | viz „Sekční osnova — schválená copy" výše — **šest sekcí** (Hero, Situační rozcestník, Hypotéky a bydlení, Finanční plán, Další oblasti, Nemusíte řešit všechno najednou), zkráceno z deseti 25. 8. 2026 |
| Finální copy | schválena pro další práci — viz „Sekční osnova — schválená copy" (sekce 1–6); odstavce nad rámec těchto šesti sekcí přesunuty na detailní stránky služeb a na `/pristup`, žádný text nebyl smazán |
| Primární CTA | `Nezávazná konzultace` (schváleno) |
| Sekundární CTA | `+420 775 217 721` (schváleno) |
| Interní odkazy | viz „Interní odkazy" výše (zaznamenáno, neimplementováno) |
| SEO title | `Hypotéky, investice, pojištění a finanční plán \| Patrik Gajdadzis` (schváleno) |
| Meta description | `Pomohu vám s hypotékou, finančním plánem, pojištěním, investicemi a penzí. Osobně v Ostravě nebo online po celé ČR.` (schváleno) |
| FAQ | `[BUDE DOPLNĚNO]` |
| Strukturovaná data / schema | `[BUDE DOPLNĚNO]` |
| Poznámky pro Claude Design | Hypotéky a bydlení (sekce 3) mají být vizuálně dominantnější než ostatní služby; sekce 6 („Nemusíte řešit všechno najednou") má odbourat obavu z nucené sanace všech financí najednou — zachovat tento význam v návrhu |
| Stav schválení | základní obsahová strategie: SCHVÁLENA · struktura stránky: SCHVÁLENA (zkrácena z 10 na 6 sekcí, koncept SVC-07, 25. 8. 2026; SVC-01–06 a SVC-08 zamítnuty) · první verze copy: SCHVÁLENA PRO DALŠÍ PRÁCI · vizuální návrh: IMPLEMENTOVÁN (25. 8. 2026) · implementace: PROVEDENA (`src/pages/sluzby.astro`) · detailní stránky jednotlivých služeb: DOSUD OBSAHOVĚ NEDOPRACOVÁNY, mají založené kapitoly s přesunutým textem. Obsah není definitivně uzamčený. |

### Budoucí detailní stránky služeb

Plánovaná (zatím neschválená, neimplementovaná) architektura:

- `/sluzby/hypoteky`
- `/sluzby/financni-plan`
- `/sluzby/pojisteni`
- `/sluzby/investice`
- `/sluzby/penze`

Tyto detailní stránky zatím **nejsou obsahově schválené ani implementované**.

**Důležitá poznámka k `/sluzby/hypoteky`:** tato stránka nesmí být obsahovou
kopií `hypotekaostrava.cz`. Osobní web má hypotéku prezentovat jako součást
poradenské práce Patrika Gajdadzise a jeho osobní značky. Specializovaný web
`hypotekaostrava.cz` má samostatnou lokální SEO a leadovou funkci — obsah se
nesmí duplikovat (viz i `docs/brand-experience-brief.md` §23: „Budoucí obsah
nesmí být kopírován z webu Hypotéka Ostrava. Osobní web má mít vlastní
originální texty, zkušenosti a témata.").

Kapitoly níže (`/sluzby/hypoteky` až `/sluzby/penze`) byly založeny 25. 8. 2026
při zkrácení `/sluzby` na šest sekcí — původně obsahovaly jen text přesunutý
z `/sluzby`. `/sluzby/hypoteky` (25. 8. 2026), `/sluzby/financni-plan`
(1. 9. 2026), `/sluzby/pojisteni` (2. 9. 2026), `/sluzby/investice`
(8. 9. 2026) a `/sluzby/penze` (8. 9. 2026) mají od té doby kompletní
první verzi copy ve stavu **NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ**.

---

## `/sluzby/hypoteky`

**Stav:** `NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ`

**Historie:** Kapitola dřív obsahovala jen text přesunutý z `/sluzby` při
zkrácení její osnovy na šest sekcí (25. 8. 2026). Tento návrh (doplněn
25. 8. 2026) z něj vychází a začleňuje ho do plné struktury stránky —
původní přesunutý text je pro dohledatelnost zachovaný beze změny v
„Archivní poznámce" na konci této kapitoly, ne smazaný.

### Úloha stránky

Detail hlavní služby osobního webu.

Stránka má návštěvníka přesvědčit, že Patrik neřeší hypotéku jen jako
„najít sazbu a poslat žádost do banky", ale nejdřív nastaví reálný rámec
financování a následně klienta provede celým procesem.

Primární obchodní cíl: `nezávazná konzultace`

Sekundární cíl: Aby člověk, který zatím jen hledá nemovitost, pochopil, že
právě teď je vhodná chvíle financování začít řešit.

### Cílový návštěvník

Člověk, který:

- plánuje koupi bytu nebo domu,
- teprve hledá nemovitost a chce vědět, na co dosáhne,
- už má nemovitost vybranou,
- řeší výstavbu nebo rekonstrukci,
- chce refinancovat hypotéku,
- potřebuje změnit nebo navýšit stávající úvěr.

### Sekční osnova — návrh copy (NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ)

#### 1. Hero

**H1**
`Hypotéka má začít čísly, ne podpisem.`

**Hero text**
`Nejdřív zjistíme, jaké financování je pro vás reálně dostupné, kolik vlastních peněz budete potřebovat a jaká splátka dává smysl pro váš rozpočet. Potom hledáme konkrétní řešení a dotáhneme ho až po čerpání.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

**Podpůrný text**
`Osobně v Ostravě-Porubě nebo online.`

#### 2. Hypotéku řeší každý v jiné fázi

**H2**
`Hypotéku řeší každý v jiné fázi.`

**Úvod**
`Někdo ještě nemá vybranou nemovitost. Jiný už podepsal rezervaci. A někdo potřebuje upravit hypotéku, kterou několik let splácí. Podle toho se liší i další postup.`

**Teprve hledáte nemovitost**
Zvýraznění: `To je ideální chvíle začít.`
Text: `Nejdřív zjistíme, v jaké ceně můžete nemovitost bezpečně hledat, kolik budete potřebovat vlastních peněz a jaká splátka odpovídá vašemu rozpočtu.`
`Díky tomu nehledáte naslepo a víte, jaký prostor skutečně máte.`

**Už máte nemovitost vybranou**
Zvýraznění: `Pak rozhodují i termíny.`
Text: `Prověříme možnosti financování, podmínky banky a kroky, které je potřeba stihnout podle rezervace a průběhu obchodu.`

**Hypotéku už máte**
Text: `Podíváme se, zda dává smysl refinancování, změna úvěru, navýšení nebo úprava financování podle vaší současné situace.`

#### 3. Nestačí najít nejnižší sazbu

**H2**
`Dobrá hypotéka není jen úroková sazba.`

**Text**
`Sazba je důležitá. Ale sama o sobě neříká, jestli je financování nastavené dobře.`
`Při návrhu řešení proto sleduji i:`

- kolik vlastních prostředků použít,
- jak vysoká splátka je dlouhodobě rozumná,
- jakou rezervu si ponechat,
- podmínky jednotlivých možností financování,
- termíny obchodu a čerpání,
- možnosti budoucích změn hypotéky.

**Zvýrazněná věta**
`Cílem není dostat od banky co nejvyšší úvěr. Cílem je financovat bydlení tak, aby vám po zaplacení splátky dál fungoval život.`

#### 4. S čím vám pomohu

**H2**
`Od prvního propočtu až po čerpání.`

**Úvodní text**
`Hypotéka pro mě nekončí schválením úvěru. Řeším s vámi celý proces až po čerpání a hlídám i další důležité termíny.`

**Oblasti**

Koupě bytu nebo domu
`Financování vlastní nemovitosti včetně nastavení vlastních zdrojů a výše úvěru.`

Výstavba
`Nastavení financování podle průběhu stavby a postupného čerpání.`

Rekonstrukce
`Hypotéka nebo jiné vhodné financování rekonstrukce podle jejího rozsahu.`

Refinancování
`Posouzení stávající hypotéky a možností před koncem fixace nebo při jiné vhodné příležitosti.`

Změna nebo navýšení hypotéky
`Pokud se od sjednání úvěru změnila vaše situace nebo potřebujete další prostředky.`

#### 5. Jak probíhá vyřízení hypotéky

**H2**
`V každém kroku víte, co se právě řeší.`

**Nejdřív spočítáme možnosti**
`Projdeme příjmy, závazky, vlastní prostředky a plánované bydlení.`
`Výsledkem je reálný rámec, ve kterém se můžeme pohybovat.`

**Vybereme vhodné financování**
`Porovnám možnosti podle vaší situace a vysvětlím vám rozdíly, které jsou pro rozhodnutí skutečně důležité.`

**Připravíme podklady**
`Řešíme potřebné dokumenty, ocenění nemovitosti a další podmínky pro schválení.`

**Schválení a smlouvy**
`Hlídám průběh schvalování a kroky potřebné k podpisu úvěrové dokumentace.`

**Čerpání**
`Zkontrolujeme splnění podmínek banky a dotáhneme financování až k čerpání.`

**Závěr**
`A ani potom hypotéku nemusíte hlídat sami. Důležité budoucí termíny má smysl řešit s předstihem, ne až ve chvíli, kdy hoří.`

#### 6. Hypotéka má fungovat i vedle ostatních výdajů

**H2**
`Bydlení nemá spolknout celý finanční plán.`

**Text**
`Hypotéka bývá jeden z největších finančních závazků v životě.`
`Proto při jejím nastavení dává smysl přemýšlet nejen nad tím, kolik banka půjčí, ale také nad rezervou, běžnými výdaji a tím, co chcete dělat s penězi v dalších letech.`

**Důležitá psychologická věta**
`Pokud za mnou přijdete jen kvůli hypotéce, vyřešíme nejdřív hypotéku.`
`Když při tom narazíme na něco, co má pro financování bydlení skutečný význam, vysvětlím vám proč.`

Zvýrazněná závěrečná věta: `Co budete chtít řešit dál, je na vás.`

#### 7. FAQ

**Kdy je nejlepší začít řešit hypotéku?**
`Ideálně ještě před výběrem konkrétní nemovitosti. Budete předem vědět, na jakou cenu můžete reálně dosáhnout, kolik potřebujete vlastních peněz a jaká splátka je pro vás rozumná.`

**Co když už mám podepsanou rezervaci?**
`Pak je potřeba vycházet z konkrétních termínů a podmínek obchodu. Projdeme aktuální situaci a stanovíme další postup podle toho, co už je podepsané a co je potřeba stihnout.`

**Kolik vlastních peněz budu potřebovat?**
`Záleží na ceně nemovitosti, jejím ocenění, vašich možnostech a konkrétním způsobu financování. Proto tuto část počítám ještě před tím, než se definitivně nastaví úvěr.`

**Řešíte také refinancování?**
`Ano. Stejně tak změny nebo navýšení stávající hypotéky.`

**Musím kvůli hypotéce řešit i ostatní finance?**
`Ne. Pokud přijdete kvůli hypotéce, prioritou je hypotéka. Další témata mají smysl otevírat pouze tehdy, pokud jsou pro vaši situaci relevantní.`

**Jak probíhá první konzultace?**
`Přibližně 30 minut. Probereme, co řešíte, v jaké jste fázi a jaký by měl být další krok. Konzultace je nezávazná a může proběhnout osobně v Ostravě-Porubě nebo online.`

#### 8. Finální CTA

**H2**
`Než uděláte další krok, pojďme si ověřit čísla.`

**Text**
`Ať teprve hledáte nemovitost, máte podepsanou rezervaci nebo řešíte stávající hypotéku, na první konzultaci si ujasníme možnosti a další postup.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

**Podpůrný text**
`Přibližně 30 minut · Ostrava-Poruba nebo online`

### SEO

**SEO title**
`Hypoteční poradce Ostrava | Patrik Gajdadzis`

**Meta description**
`Pomohu vám zjistit, na jakou nemovitost dosáhnete, vyřídit hypotéku, refinancování, výstavbu nebo rekonstrukci. Ostrava nebo online po celé ČR.`

### Search intent

Primární:

- hypoteční poradenství
- pomoc s hypotékou
- vyřízení hypotéky
- financování bydlení

Sekundární:

- refinancování
- financování výstavby
- financování rekonstrukce
- kolik si mohu půjčit

### Interní odkazy

Plánované interní odkazy (zaznamenáno, **zatím neimplementováno**):

- `/sluzby`
- `/sluzby/financni-plan`
- `/sluzby/pojisteni`
- `/pristup`
- `/recenze`
- `/kontakt`

### Strukturovaná data / schema

Zapsáno jako plánovaný návrh (zatím neimplementováno):

- `Service`
- `BreadcrumbList`
- `FAQPage`

Poznámka: nevytvářet kvůli této stránce novou oddělenou značku/firmu.
Stránka má zůstat součástí entity Patrika Gajdadzise a celého osobního webu.

### Obsahové pravidlo

`/sluzby/hypoteky` nesmí být kopií `hypotekaostrava.cz`. Osobní web má
hypotéku prezentovat jako:

- součást poradenské práce Patrika Gajdadzise,
- jeho způsob uvažování,
- jeho proces práce s klientem,
- součást širšího finančního kontextu.

Specializovaný web `hypotekaostrava.cz` má samostatnou lokální SEO a
leadovou funkci. Nevytváří se mezi weby duplicitní copy.

### Archivní poznámka — původní přesunutý text z `/sluzby` (25. 8. 2026)

Zachováno pro dohledatelnost, beze změny. Tyto tři věty patřily na
`/sluzby` (sekce 3 „Hypotéky a bydlení") a byly sem přesunuty při zkrácení
osnovy `/sluzby` na šest sekcí, ještě před tímto návrhem. Jejich obsah je
nyní rozpracovaný v sekcích 1 a 5 návrhu výše (odlišnou, rozšířenou
formulací) — jako samostatné věty se v aktuální copy nepoužívají.

`Nejdřív zjistíme, jaké financování je pro vás reálně dostupné, kolik vlastních peněz budete potřebovat a jaká splátka dává smysl pro váš rozpočet. Teprve potom víte, v jaké ceně můžete nemovitost bezpečně hledat.`

`Pokud už nemovitost máte vybranou, řešíme financování podle aktuální situace a termínů obchodu.`

`Hypotéka pro mě nekončí schválením úvěru. Řeším s vámi celý proces až po čerpání a hlídám i další důležité termíny.`

### Standardní pole

| Pole | Hodnota |
|---|---|
| Úloha stránky | viz „Úloha stránky" výše |
| Cílový návštěvník | viz „Cílový návštěvník" výše |
| Search intent | viz „Search intent" výše |
| Obchodní cíl | primární: nezávazná konzultace; sekundární: přesvědčit návštěvníka, který teprve hledá nemovitost, že je vhodná chvíle začít řešit financování — viz „Úloha stránky" výše |
| H1 | `Hypotéka má začít čísly, ne podpisem.` (návrh) |
| Hero text | `Nejdřív zjistíme, jaké financování je pro vás reálně dostupné, kolik vlastních peněz budete potřebovat a jaká splátka dává smysl pro váš rozpočet. Potom hledáme konkrétní řešení a dotáhneme ho až po čerpání.` (návrh) |
| Sekční struktura | osm sekcí — viz „Sekční osnova — návrh copy" výše (Hero, Hypotéku řeší každý v jiné fázi, Nestačí najít nejnižší sazbu, S čím vám pomohu, Jak probíhá vyřízení hypotéky, Hypotéka má fungovat i vedle ostatních výdajů, FAQ, Finální CTA) |
| Finální copy | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — kompletní první verze, viz „Sekční osnova — návrh copy" výše (sekce 1–8); původní přesunutý text z `/sluzby` zachován v „Archivní poznámce" |
| Primární CTA | `Nezávazná konzultace` (návrh) |
| Sekundární CTA | `+420 775 217 721` (návrh) |
| Interní odkazy | viz „Interní odkazy" výše (zaznamenáno, neimplementováno) |
| SEO title | `Hypoteční poradce Ostrava \| Patrik Gajdadzis` (změněno v předspouštěcím úkolu, v plánu sjednoceno 24. 9. 2026) |
| Meta description | `Pomohu vám zjistit, na jakou nemovitost dosáhnete, vyřídit hypotéku, refinancování, výstavbu nebo rekonstrukci. Ostrava nebo online po celé ČR.` (návrh) |
| FAQ | šest otázek — viz sekce 7 „FAQ" výše (návrh) |
| Strukturovaná data / schema | `Service`, `BreadcrumbList`, `FAQPage` — plánovaný návrh, zatím neimplementováno (viz „Strukturovaná data / schema" výše) |
| Poznámky pro Claude Design | Nesmí být obsahovou kopií `hypotekaostrava.cz` — viz „Obsahové pravidlo" výše; nevytvářet kvůli stránce novou oddělenou značku/firmu, stránka zůstává součástí entity Patrika Gajdadzise |
| Stav schválení | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — kompletní první verze copy a obsahové struktury doplněna; vizuální návrh ani implementace detailní stránky zatím nejsou schválené. |

---

## `/sluzby/financni-plan`

**Stav:** `NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ`

**Historie:** Kapitola dřív obsahovala jen dva odstavce přesunuté z
`/sluzby` při zkrácení její osnovy na šest sekcí (25. 8. 2026). Tento návrh
(doplněn 1. 9. 2026) z nich vychází a začleňuje je do plné struktury
stránky — oba odstavce jsou v návrhu níže zachované beze změny (Hero text
v sekci 1 a druhá věta sekce 2 „Jedno finanční rozhodnutí ovlivní další"),
ne smazané.

### Úloha stránky

Vysvětlit, co u Patrika znamená finanční plánování.

Finanční plán nemá být prezentovaný jako:

- tabulka,
- audit smluv,
- seznam produktů,
- automatický důvod měnit vše, co klient už má.

Má ukázat:

- co klient už má nastavené dobře,
- co má prioritu,
- co může počkat,
- co není potřeba měnit,
- jak jednotlivá finanční rozhodnutí souvisejí,
- jaký má být další postup.

Hlavní myšlenka: `Co řešit. Proč. V jakém pořadí. A co naopak není potřeba
měnit vůbec.`

Stránka je druhou nejdůležitější detailní službou po hypotékách a nejlépe
vysvětluje hlavní positioning osobní značky Patrika: finance neřešit po
jednotlivých produktech, ale v souvislostech.

### Cílový návštěvník

Člověk, který:

- má více finančních produktů a neví, jestli spolu dávají smysl,
- chce udělat pořádek ve financích,
- má vyšší příjem a chce lépe řídit rezervu, bydlení, ochranu a investice,
- stojí před větším finančním rozhodnutím,
- chce zjistit, co má řešit jako první,
- nechce automaticky měnit všechny současné smlouvy,
- hledá dlouhodobého partnera pro další finanční rozhodnutí.

### Sekční osnova — návrh copy (NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ)

#### 1. Hero

**H1**
`Finanční plán ukáže, co má smysl řešit jako první.`

**Hero text**
`Nejdřív společně projdeme vaši současnou situaci, příjmy, závazky, majetek a cíle. Potom stanovíme, co má prioritu, co může počkat a co není potřeba měnit vůbec.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

*Hero na této stránce záměrně NEOBSAHUJE podpůrný text typu „Přibližně
30 minut · Ostrava-Poruba nebo online" — na rozdíl od `/sluzby/hypoteky`
(kde je jen ve Finálním CTA, ne v hero) se u `/sluzby/financni-plan`
nepoužívá ani tam.*

#### 2. Jedno finanční rozhodnutí ovlivní další

**H2**
`Jedno finanční rozhodnutí ovlivní další.`

**Text**
`Výše hypotéky ovlivní rezervu. Rezerva určuje, kolik peněz můžete bezpečně investovat. Příjem a závazky zase rozhodují o tom, jak velký problém by představovala dlouhodobá pracovní neschopnost nebo invalidita.`

`Proto se při finančním plánování nedívám na jednotlivé smlouvy odděleně.`
*(tahle věta pochází z původně přesunutého textu z `/sluzby`, zachována
beze změny)*

`Výdaje určují rezervu, rezerva rozhoduje o bydlení, závazek vyžaduje ochranu, přebytek jde do investic a z nich postupně vzniká majetek na penzi.`
*(schváleno uživatelem 2. 9. 2026 — nahrazuje dřívější obecný pokyn
„Obsahově lze pracovat s návazností: Příjem → Rezerva → Bydlení → Ochrana →
Investice → Penze". Opraveno 14. 9. 2026: „Příjem určuje rezervu" nahrazeno
za „Výdaje určují rezervu" — věcně správně se rezerva odvíjí od výdajů,
ne od příjmu.)*

#### 3. Nejdřív potřebujeme vědět, co už funguje

**H2**
`Nejdřív potřebujeme vědět, co už funguje.`

**Text**
`Finanční plán nezačíná tím, co vám můžu nabídnout. Začíná tím, co už máte a kam se chcete dostat.`

**Projdeme například**

- příjmy a běžné výdaje,
- rezervy a dostupné peníze,
- úvěry a další závazky,
- majetek,
- současné pojištění,
- investice,
- zajištění na penzi,
- krátkodobé a dlouhodobé cíle.

**Zvýrazněná věta**
`Některé věci mohou zůstat přesně tak, jak jsou.`

#### 4. Co řešit, proč a v jakém pořadí

**H2**
`Máte vědět, co řešit, proč a v jakém pořadí.`

**Text**
`Cílem finančního plánu není vytvořit seznam produktů. Cílem je určit priority.`

**Obsahové body — BEZ ČÍSLOVÁNÍ** (viz CLAUDE.md, globální pravidlo proti
viditelnému číslování)

Co funguje
`Co už máte nastavené dobře a není důvod do toho zasahovat.`

Co má prioritu
`Co má největší význam pro vaši současnou situaci a cíle.`

Co může počkat
`Ne všechno je potřeba řešit okamžitě.`

Co uděláme dál
`Konkrétní kroky seřadíme tak, aby na sebe dávaly smysl.`

**Hlavní statement**
`Finanční plán nemá přidat složitost. Má v ní udělat pořádek.`

#### 5. Co může finanční plán propojit

**H2**
`Plán propojí rozhodnutí, která by jinak vznikala odděleně.`

**Oblasti**

Rezerva
`Kolik peněz potřebujete mít dostupných a kdy už přebytek může pracovat jinde.`

Bydlení a úvěry
`Jak vysoký závazek odpovídá vašemu rozpočtu a ostatním plánům.`

Ochrana příjmu a majetku
`Které situace by měly skutečný finanční dopad na vás nebo rodinu.`

Investice
`Kolik můžete dlouhodobě investovat, na jaký cíl a s jakým časem.`

Penze
`Jaký majetek bude potřeba vytvořit, aby budoucí příjem nebyl závislý pouze na státu.`

**Zvýrazněný závěr**
`Nemusíte řešit všechny oblasti najednou.`

#### 6. Jak finanční plán vzniká

**H2**
`Od současného stavu ke konkrétním krokům.`

**Body — BEZ VIDITELNÉHO ČÍSLOVÁNÍ** (viz CLAUDE.md, globální pravidlo)

Projdeme vaši situaci
`Příjmy, výdaje, závazky, majetek, současná řešení a cíle.`

Určíme priority
`Zjistíme, co je důležité teď a co lze řešit později.`

Spočítáme souvislosti
`Podíváme se, jak jedno rozhodnutí ovlivní rezervu, rozpočet a další cíle.`

Navrhnu další postup
`Dostanete konkrétní doporučení a vysvětlení, proč jednotlivé kroky dávají smysl.`

Pomohu s realizací
`Pokud budete chtít doporučené změny provést, pomohu vám je dotáhnout.`

Plán se může měnit s vámi
`Když se změní příjem, rodina, bydlení nebo cíle, dává smysl plán znovu projít.`

#### 7. Nemusíte začínat kompletním plánem

**H2**
`Můžete přijít i s jednou konkrétní otázkou.`

**Text**
`Nemusíte mít pocit, že před první schůzkou potřebujete připravit celý svůj finanční život.`

`Můžete přijít kvůli hypotéce, investici, pojištění nebo jen proto, že chcete zjistit, jestli máte finance nastavené rozumně.`

`Začneme tím, co právě potřebujete vyřešit. Širší plán má smysl pouze tehdy, pokud vám pomůže udělat lepší rozhodnutí.`

**Highlight**
`Rozsah spolupráce určujete vy.`

#### 8. FAQ

**Co je finanční plán?**
`Přehled vaší současné finanční situace, cílů a kroků, které dávají smysl řešit. Nejde pouze o seznam smluv. Důležité je, jak jednotlivá rozhodnutí fungují dohromady.`

**Musím kvůli finančnímu plánu měnit své současné smlouvy?**
`Ne. Nejdřív zjistíme, co máte nastavené dobře. Pokud něco není potřeba měnit, není důvod do toho zasahovat.`

**Musím řešit všechny oblasti financí najednou?**
`Ne. Stanovíme priority a začneme tím, co má pro vaši situaci největší význam. Ostatní věci mohou počkat.`

**Co si mám připravit na první schůzku?**
`Na první konzultaci stačí základní informace o vaší situaci a o tom, co chcete řešit. Pokud bude pro další krok potřeba něco konkrétního, řeknu vám co.`

**Je finanční plán jen pro lidi s vysokými příjmy?**
`Ne. Smyslem je vědět, jak pracovat s penězi, které máte k dispozici, a určit správné priority podle vaší konkrétní situace.`

**Můžeme finanční plán řešit online?**
`Ano. Konzultace může proběhnout osobně v Ostravě-Porubě nebo online.`

#### 9. Finální CTA

**H2**
`Začněme tím, kde jste dnes.`

**Text**
`Na první konzultaci projdeme, co právě řešíte, a zjistíme, jestli a v jakém rozsahu pro vás finanční plán dává smysl.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

*Pokud je v aktuálním globálním designu finální CTA řešeno jinak (viz
`/sluzby/hypoteky` a jeho podpůrný text „Přibližně 30 minut..."), tahle
kapitola popisuje jen OBSAH — vizuální řešení se rozhoduje až při
implementaci, ne v tomto dokumentu.*

### Obchodní cíl

Primární: `Nezávazná konzultace`

Sekundární: Vysvětlit návštěvníkovi, že finanční plán není „balíček
produktů", ale způsob, jak určit priority a další postup.

Důležitý psychologický cíl: odstranit obavu „Přijdu k finančnímu poradci a
začne mi rušit všechno, co už mám."

### SEO

**SEO title**
`Finanční plánování | Patrik Gajdadzis, Ostrava`

**Meta description**
`Pomohu vám dát finance do souvislostí, určit priority a nastavit další kroky. Finanční plánování osobně v Ostravě nebo online po celé ČR.`

**Canonical**
`https://patrikgajdadzis.cz/sluzby/financni-plan`

### Search intent

Primární:

- finanční plán
- finanční plánování
- osobní finanční plán
- finanční plánování Ostrava

Sekundární:

- jak si uspořádat finance
- kontrola osobních financí
- finanční poradce Ostrava
- plánování osobních financí

Search intent je podklad pro strukturu a SEO, ne pokyn ke keyword
stuffingu — neaplikovat mechanicky do copy.

### Interní odkazy

Plánované interní odkazy (zaznamenáno, **zatím neimplementováno**):

- `/sluzby`
- `/sluzby/hypoteky`
- `/sluzby/pojisteni`
- `/sluzby/investice`
- `/sluzby/penze`
- `/pristup`
- `/recenze`
- `/kontakt`

### Strukturovaná data / schema

Zapsáno jako plánovaný návrh (zatím neimplementováno):

- `Service`
- `BreadcrumbList`
- `FAQPage` — pouze pokud bude FAQ skutečně později implementované a
  viditelné na stránce

Poznámka: nevytvářet kvůli této stránce novou oddělenou značku/firmu.
Stránka je službou v rámci hlavní entity Patrika Gajdadzise a osobního webu.

Breadcrumb: `Domů → Služby → Finanční plán`

### Poznámky pro Claude Design

- stránka nesmí působit jako audit smluv nebo finanční dashboard,
- nevytvářet tabulkový nebo excelový vizuální jazyk,
- nepracovat s velkým množstvím stejných karet,
- neukazovat produktové portfolio,
- hlavní vizuální myšlenka je propojení souvislostí a priorit,
- kontinuální linka může spojovat příjem, rezervu, bydlení, ochranu,
  investice a penzi,
- nesmí z toho vzniknout technologický diagram,
- viditelné číslování kroků je zakázané (viz CLAUDE.md, globální pravidlo
  proti viditelnému číslování),
- hero nesmí obsahovat podpůrný text „30 minut · Ostrava-Poruba nebo
  online",
- design musí respektovat globální centrované designové plátno
  (`--stage-max`, CLAUDE.md „Konvence: wide desktop a centrované
  designové plátno"),
- background sekcí zůstává full-width,
- asymetrie se děje uvnitř stage.

### Standardní pole

| Pole | Hodnota |
|---|---|
| Úloha stránky | viz „Úloha stránky" výše |
| Cílový návštěvník | viz „Cílový návštěvník" výše |
| Search intent | viz „Search intent" výše |
| Obchodní cíl | viz „Obchodní cíl" výše |
| H1 | `Finanční plán ukáže, co má smysl řešit jako první.` (návrh) |
| Hero text | `Nejdřív společně projdeme vaši současnou situaci, příjmy, závazky, majetek a cíle. Potom stanovíme, co má prioritu, co může počkat a co není potřeba měnit vůbec.` (návrh, převzato beze změny z dřívějšího přesunutého textu `/sluzby`) |
| Sekční struktura | devět sekcí — viz „Sekční osnova — návrh copy" výše (Hero, Jedno finanční rozhodnutí ovlivní další, Nejdřív potřebujeme vědět co už funguje, Co řešit proč a v jakém pořadí, Co může finanční plán propojit, Jak finanční plán vzniká, Nemusíte začínat kompletním plánem, FAQ, Finální CTA) |
| Finální copy | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — kompletní první verze, viz „Sekční osnova — návrh copy" výše (sekce 1–9); oba dříve přesunuté odstavce z `/sluzby` zachovány beze změny (Hero text a druhá věta sekce 2) |
| Primární CTA | `Nezávazná konzultace` (návrh) |
| Sekundární CTA | `+420 775 217 721` (návrh) |
| Interní odkazy | viz „Interní odkazy" výše (zaznamenáno, neimplementováno) |
| SEO title | `Finanční plánování \| Patrik Gajdadzis, Ostrava` (návrh) |
| Meta description | `Pomohu vám dát finance do souvislostí, určit priority a nastavit další kroky. Finanční plánování osobně v Ostravě nebo online po celé ČR.` (návrh) |
| FAQ | šest otázek — viz sekce 8 „FAQ" výše (návrh) |
| Strukturovaná data / schema | `Service`, `BreadcrumbList`, `FAQPage` — plánovaný návrh, zatím neimplementováno (viz „Strukturovaná data / schema" výše) |
| Poznámky pro Claude Design | viz „Poznámky pro Claude Design" výše |
| Stav schválení | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — obsahová strategie: návrh · sekční struktura: návrh · první kompletní copy: návrh · SEO/search intent: návrh · schema plán: návrh · vizuální návrh: zatím neexistuje · implementace: zatím neexistuje |

---

## `/sluzby/pojisteni`

**Stav:** `NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ`

**Historie:** Kapitola dřív obsahovala jen dva odstavce přesunuté z
`/sluzby` při zkrácení její osnovy na šest sekcí (25. 8. 2026). Tento návrh
(doplněn 2. 9. 2026) z nich vychází a začleňuje je do plné struktury
stránky — oba odstavce jsou v návrhu níže zachované beze změny (Výrazná
věta v sekci 2 „Nejdřív finanční dopad" a první věta sekce 3 „Životní
pojištění"), ne smazané. Pro dohledatelnost jsou zachované i tady v
původním znění:

`Až podle finančního dopadu má smysl určit, která rizika pojistit a na jaké částky.`

`U životního pojištění proto nevycházím jen z přednastaveného balíčku pojišťovny. U majetku zase řešíme nejen cenu, ale také rozsah ochrany a situace, které skutečně potřebujete pokrýt.`

### Úloha stránky

Vysvětlit, že pojištění není o počtu sjednaných rizik ani pouze o
nejnižší ceně.

Hlavní princip: nejdřív zjistit, jaký finanční dopad by měla konkrétní
událost na klienta, jeho rodinu, příjem nebo majetek. Až potom řešit:

- která rizika má smysl pojistit,
- na jaké částky,
- v jakém rozsahu,
- za jakých podmínek.

Stránka má přivést ke konzultaci člověka, který:

- chce sjednat nové pojištění,
- chce zkontrolovat současné smlouvy,
- řeší změnu životní nebo finanční situace,
- chce ochránit příjem, rodinu nebo majetek.

Nemá působit jako katalog pojistných produktů.

### Cílový návštěvník

Člověk, který:

- má hypotéku nebo jiné závazky,
- je rodič a chce chránit rodinu před finančními následky vážných událostí,
- je podnikatel nebo zaměstnanec závislý na svém příjmu,
- má starší životní pojištění a neví, zda odpovídá dnešní situaci,
- je vlastníkem nemovitosti nebo domácnosti,
- prošel rekonstrukcí, změnou příjmu nebo jinou významnou životní změnou,
- chce vědět, co má smysl pojistit a co zvládne finančně sám.

### Sekční osnova — návrh copy (NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ)

#### 1. Hero

**H1**
`Pojištění má vycházet z toho, co by vás finančně ohrozilo.`

**Hero text**
`Nejdřív zjistíme, jaké následky by pro vás nebo vaši rodinu měl výpadek příjmu, vážná nemoc, invalidita, úmrtí nebo škoda na majetku. Podle toho nastavíme, co má smysl pojistit, na jaké částky a za jakých podmínek.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

*Hero na této stránce záměrně NEOBSAHUJE podpůrný text typu „Přibližně
30 minut · Ostrava-Poruba nebo online" — stejná konvence jako
`/sluzby/financni-plan`, na výslovné přání uživatele (nechce tenhle typ
textu v hero žádné detailní služby).*

#### 2. Nejdřív finanční dopad

**H2**
`Nejdřív finanční dopad. Potom pojistná částka.`

**Text**
`Dvěma lidem může stejná událost způsobit úplně jiný finanční problém. Záleží na příjmu, závazcích, rezervě, rodině i majetku.`

`Proto nestačí vybrat riziko z nabídky pojišťovny. Potřebujeme vědět, co by se skutečně změnilo ve vašem rozpočtu.`

**Obsahové situace — podle finančního dopadu, ne jako katalog rizik**

Dlouhodobý výpadek příjmu
`Pokud člověk nemůže delší dobu pracovat, mění se schopnost hradit běžné výdaje a splácet závazky.`

Invalidita
`Invalidita má dlouhodobý dopad na příjem i soběstačnost — mění se, co klient nebo jeho rodina potřebují k běžnému fungování.`

Úmrtí živitele
`Ztráta příjmu živitele dopadá na rodinu, na běžné výdaje, na závazky a na další finanční potřeby, které zůstávají.`

Vážná nemoc
`Některá onemocnění znamenají zvýšené výdaje, omezení schopnosti pracovat nebo potřebu mít po ruce finanční rezervu.`

Škoda na nemovitosti
`Významná škoda na majetku znamená náklady potřebné k jeho obnově.`

*Žádná z pěti situací výše nepracuje s konkrétní pojistnou částkou,
procentem, statistikou ani modelovým příkladem s neověřenými čísly — podle
zadání záměrně, viz „Co nesmíš měnit"/pokyny k této sekci.*

**Výrazná věta** *(zachovaný původní text z `/sluzby`, beze změny)*
`Až podle finančního dopadu má smysl určit, která rizika pojistit a na jaké částky.`

#### 3. Životní pojištění

**H2**
`Stejná pojistka nedává smysl každému.`

**Text**
`Jinou ochranu potřebuje člověk bez závazků, jinou rodič s hypotékou a jinou podnikatel, jehož příjem závisí na tom, že může pracovat.`

`U životního pojištění proto nevycházím jen z přednastaveného balíčku pojišťovny.`
*(tahle věta pochází z původně přesunutého textu z `/sluzby`, zachována
beze změny)*

**Ochrana příjmu a rodiny — podle toho, kdy a proč mají rizika význam, ne
jako produktový katalog**

Pracovní neschopnost
`Řeší období, kdy člověk dočasně nemůže pracovat a přichází o běžný příjem.`

Invalidita
`Řeší dlouhodobý nebo trvalý dopad na schopnost pracovat a na příjem rodiny.`

Úmrtí
`Řeší zajištění rodiny a závazků v situaci, kdy by chyběl příjem živitele.`

Závažná onemocnění
`Řeší zvýšené výdaje a omezení, která mohou taková onemocnění přinést.`

Trvalé následky úrazu
`Řeší situace, kdy úraz dlouhodobě ovlivní zdraví, práci nebo běžný život.`

**Hlavní statement**
`Nejde o to pojistit všechno. Jde o to vědět, která rizika byste finančně zvládli sami a která už by mohla zásadně změnit váš život.`

#### 4. Pojištění majetku

**H2**
`Nestačí mít pojištěný dům. Důležité je, jak.`

**Text**
`U pojištění nemovitosti, domácnosti nebo odpovědnosti nestačí porovnat cenu. Podstatné je, na jakou hodnotu je majetek pojištěný, jaký je rozsah krytí, výluky, limity a spoluúčast.`

`U majetku zase řešíme nejen cenu, ale také rozsah ochrany a situace, které skutečně potřebujete pokrýt.`
*(tahle věta pochází z původně přesunutého textu z `/sluzby`, zachována
beze změny)*

**Podíváme se na**

- rozdíl mezi pojištěním nemovitosti a domácnosti,
- správnou pojistnou částku,
- riziko podpojištění,
- rozsah krytí,
- limity a výluky,
- spoluúčast,
- odpovědnost,
- potřebu aktualizace po rekonstrukci nebo jiné větší změně majetku.

**Závěr**
`Pojištění má odpovídat tomu, co dnes vlastníte a jaká rizika potřebujete skutečně pokrýt.`

#### 5. Kontrola současného pojištění

**H2**
`Nejdřív se podívám na to, co už máte sjednané.`

**Text**
`Pokud už máte životní nebo majetkové pojištění, není důvod začínat automaticky novou smlouvou. Nejdřív projdeme současné nastavení a zjistíme, jestli odpovídá vaší dnešní situaci.`

`Může se ukázat, že je všechno v pořádku. Někdy dává smysl upravit pojistné částky, rozsah krytí nebo vyřešit konkrétní slabé místo.`

**Výrazná věta**
`Změna má mít důvod. Ne být cílem sama o sobě.`

*Účel sekce: odbourat obavu z automatického rušení současných smluv (viz
„Obchodní cíl" níže, psychologický cíl).*

#### 6. Jak spolupráce probíhá

**H2**
`Od současné situace ke konkrétnímu nastavení.`

**Body — BEZ VIDITELNÉHO ČÍSLOVÁNÍ** (viz CLAUDE.md, globální pravidlo
proti viditelnému číslování)

Projdeme vaši situaci
`Příjmy, závazky, rodinu, majetek a současné pojištění.`

Určíme důležitá rizika
`Zjistíme, které situace by pro vás měly největší finanční dopad.`

Nastavíme rozsah ochrany
`Podle potřeb stanovíme pojistné částky, důležitá krytí a podmínky.`

Porovnáme vhodné možnosti
`Vysvětlím vám rozdíly mezi řešeními, které jsou pro vaše rozhodnutí podstatné.`

Pomohu s realizací a další péčí
`Pokud se rozhodnete pro změnu nebo nové sjednání, pomohu vám s postupem. Když se vaše situace změní, má smysl ochranu znovu projít.`

#### 7. Dlouhodobá péče

**H2**
`Když se něco změní, má se změnit i ochrana.`

**Text**
`Nová hypotéka, narození dítěte, vyšší příjem, změna zaměstnání nebo rekonstrukce domu mohou změnit i to, jaké pojištění dává smysl.`

`Proto má smysl se k nastavení vracet. A pokud nastane pojistná událost, pomohu vám zorientovat se v dalším postupu a potřebných podkladech.`

**Právní/komunikační omezení — závazné pro copy i implementaci**

- Neslibovat, že pojišťovna vždy vyplatí plnění.
- Neslibovat garantovaný výsledek pojistné události.
- Neslibovat plnění bez ohledu na pojistné podmínky.

#### 8. FAQ

**Jak poznám, jestli mám životní pojištění nastavené správně?**
`Záleží na vašem příjmu, závazcích, rodinné situaci, rezervě a rozsahu současného krytí. Při kontrole se podíváme, jaké finanční následky by pro vás měla jednotlivá rizika a zda jim nastavení odpovídá.`

**Musím při kontrole pojištění rušit současnou smlouvu?**
`Ne. Nejdřív zjistíme, co máte nastavené dobře a zda vůbec existuje důvod něco měnit.`

**Jak vysoké pojistné částky potřebuji?**
`Univerzální částka neexistuje. Vychází se z konkrétních finančních dopadů, závazků, rezervy a potřeb lidí, které chcete chránit.`

**Řešíte také pojištění domu a domácnosti?**
`Ano. Podíváme se na hodnotu majetku, rozsah krytí, limity, spoluúčast i rizika, která potřebujete pokrýt.`

**Co když jsem rekonstruoval nemovitost nebo se mi změnil příjem?**
`To jsou situace, kdy má smysl současné pojištění znovu zkontrolovat. Původní nastavení už nemusí odpovídat dnešní hodnotě majetku nebo finanční situaci.`

**Pomůžete mi i při pojistné události?**
`Ano. Pomohu vám zorientovat se v postupu, potřebných podkladech a komunikaci s pojišťovnou. Samotné posouzení a plnění se řídí pojistnou smlouvou a příslušnými podmínkami.`

#### 9. Finální CTA

**H2**
`Podívejme se, jestli vaše pojištění odpovídá tomu, co potřebujete chránit.`

**Text**
`Ať už chcete sjednat nové pojištění, zkontrolovat současné smlouvy nebo řešíte změnu své situace, na první konzultaci si ujasníme, co má smysl udělat dál.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

*Tahle kapitola popisuje jen OBSAH — nový formulář ani vizuální řešení se
v tomto dokumentu nenavrhuje, rozhoduje se až při implementaci.*

### Obchodní cíl

Primární: `Nezávazná konzultace`

Sekundární: Vysvětlit rozdíl mezi pojištěním podle přednastaveného balíčku
a pojištěním podle skutečných finančních dopadů.

Důležitý psychologický cíl: odstranit obavu, že kontrola současného
pojištění automaticky znamená zrušení všech smluv a sjednání nových.

### SEO

**SEO title**
`Pojištění příjmu, rodiny a majetku | Patrik Gajdadzis`

**Meta description**
`Pomohu vám nastavit nebo zkontrolovat životní a majetkové pojištění podle skutečných finančních rizik. Osobně v Ostravě nebo online po celé ČR.`

**Canonical**
`https://patrikgajdadzis.cz/sluzby/pojisteni`

### Search intent

Primární:

- pojištění
- životní pojištění
- pojištění příjmu
- pojištění majetku
- kontrola životního pojištění
- pojišťovací poradce Ostrava

Sekundární:

- pojištění pracovní neschopnosti
- pojištění invalidity
- pojištění nemovitosti
- pojištění domácnosti
- podpojištění
- kontrola pojistné smlouvy

Search intent je podklad pro obsahovou architekturu a SEO, ne pokyn ke
keyword stuffingu — neaplikovat mechanicky do copy.

### Interní odkazy

Plánované interní odkazy (zaznamenáno, **zatím neimplementováno**):

- `/sluzby`
- `/sluzby/financni-plan`
- `/sluzby/hypoteky`
- `/sluzby/investice`
- `/sluzby/penze`
- `/pristup`
- `/recenze`
- `/kontakt`

### Strukturovaná data / schema

Zapsáno jako plánovaný návrh (zatím neimplementováno):

- `Service`
- `BreadcrumbList`
- `FAQPage` — pouze pokud bude FAQ skutečně později implementované a
  viditelné na stránce

Poznámka: nevytvářet kvůli této stránce novou oddělenou značku/firmu.
Stránka je službou v rámci hlavní entity Patrika Gajdadzise a osobního
webu. Finální profesní a regulatorní text musí odpovídat aktuálním
zápisům v registrech ČNB a případně projít compliance kontrolou — v
tomto dokumentu se žádné regulatorní oprávnění ani profesní označení
nevymýšlí.

Breadcrumb: `Domů → Služby → Pojištění`

### Poznámky pro Claude Design

- stránka má mít vlastní vizuální charakter — nesmí být kopií hypoték ani
  finančního plánu,
- hlavní vizuální princip je „finanční dopad → ochrana",
- nevytvářet katalog pojistných produktů,
- nevytvářet pět stejných karet pojistných rizik,
- nepoužívat štíty, deštníky, zámky a další generické pojišťovací ikonky
  jako hlavní motiv,
- kontinuální linka může vyjadřovat vztah mezi finanční situací, rizikem a
  ochranou,
- nesmí z toho vzniknout technologický diagram,
- viditelné číslování kroků je zakázané (viz CLAUDE.md, globální pravidlo
  proti viditelnému číslování),
- žádný podpůrný provozní text v hero,
- design musí respektovat globální centrované designové plátno
  (`--stage-max`, CLAUDE.md „Konvence: wide desktop a centrované
  designové plátno"),
- background sekcí zůstává full-width,
- asymetrie se děje uvnitř stage.

### Standardní pole

| Pole | Hodnota |
|---|---|
| Úloha stránky | viz „Úloha stránky" výše |
| Cílový návštěvník | viz „Cílový návštěvník" výše |
| Search intent | viz „Search intent" výše |
| Obchodní cíl | viz „Obchodní cíl" výše |
| H1 | `Pojištění má vycházet z toho, co by vás finančně ohrozilo.` (návrh) |
| Hero text | `Nejdřív zjistíme, jaké následky by pro vás nebo vaši rodinu měl výpadek příjmu, vážná nemoc, invalidita, úmrtí nebo škoda na majetku. Podle toho nastavíme, co má smysl pojistit, na jaké částky a za jakých podmínek.` (návrh) |
| Sekční struktura | devět sekcí — viz „Sekční osnova — návrh copy" výše (Hero, Nejdřív finanční dopad, Životní pojištění, Pojištění majetku, Kontrola současného pojištění, Jak spolupráce probíhá, Dlouhodobá péče, FAQ, Finální CTA) |
| Finální copy | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — kompletní první verze, viz „Sekční osnova — návrh copy" výše (sekce 1–9); oba dříve přesunuté odstavce z `/sluzby` zachovány beze změny (Výrazná věta v sekci 2 a první věta sekce 3) |
| Primární CTA | `Nezávazná konzultace` (návrh) |
| Sekundární CTA | `+420 775 217 721` (návrh) |
| Interní odkazy | viz „Interní odkazy" výše (zaznamenáno, neimplementováno) |
| SEO title | `Pojištění příjmu, rodiny a majetku \| Patrik Gajdadzis` (návrh) |
| Meta description | `Pomohu vám nastavit nebo zkontrolovat životní a majetkové pojištění podle skutečných finančních rizik. Osobně v Ostravě nebo online po celé ČR.` (návrh) |
| FAQ | šest otázek — viz sekce 8 „FAQ" výše (návrh) |
| Strukturovaná data / schema | `Service`, `BreadcrumbList`, `FAQPage` — plánovaný návrh, zatím neimplementováno (viz „Strukturovaná data / schema" výše) |
| Poznámky pro Claude Design | viz „Poznámky pro Claude Design" výše |
| Stav schválení | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — obsahová strategie: návrh · sekční struktura: návrh · první kompletní copy: návrh · SEO/search intent: návrh · schema plán: návrh · vizuální návrh: zatím neexistuje · implementace: zatím neexistuje |

---

## `/sluzby/investice`

**Stav:** `NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ`

**Historie:** Kapitola dřív obsahovala jen text přesunutý z `/sluzby` při
zkrácení její osnovy na šest sekcí (25. 8. 2026). Tento návrh (doplněn
8. 9. 2026) z něj vychází a začleňuje ho do plné struktury stránky —
původní přesunutý text je pro dohledatelnost zachovaný beze změny v sekci
7 „Rozpočet a rezerva" (body i závěrečná věta) a v „Archivní poznámce" na
konci této kapitoly, ne smazaný. Pro dohledatelnost je zachovaný i tady v
původním znění:

`Proto nejdřív řešíme:`

- k čemu mají peníze sloužit,
- kdy je budete potřebovat,
- jakou rezervu už máte,
- kolik můžete pravidelně investovat,
- jaké kolísání jste schopni přijmout.

Závěr: `Až potom vybíráme způsob investování.`

**Doplněno 8. 9. 2026 (implementační zadání pro `investice.astro`):**
každá ze sedmi kapitol dostala jednoslovný popisek pro pruh kontinuální
linky (stejný vzor jako `hypoteky`/`financni-plan`/`pojisteni`) a kapitola
2 „Různý cíl = jiný přístup" dostala eyebrow — obojí doplněno níže u
příslušné sekce, beze změny už schváleného textu H2/odstavců/statementů.

### Úloha stránky

Vysvětlit, že investování nezačíná výběrem fondu, produktu ani hledáním
nejvyššího výnosu.

Hlavní princip: nejdřív pochopit,

- na co mají peníze sloužit,
- kdy je klient bude potřebovat,
- jakou už má rezervu,
- kolik může investovat,
- jaké riziko a kolísání dává smysl podstoupit,
- jak investice zapadají do ostatních finančních rozhodnutí.

Významová návaznost: `Cíl → čas → rezerva → riziko → způsob investování.`
Jde o významovou návaznost, ne o pokyn k veřejnému číslovanému procesu —
viz „Globální pravidlo: žádné viditelné číslování kroků/bodů" v
`CLAUDE.md`.

Stránka nemá působit jako:

- katalog fondů,
- investiční e-shop,
- žebříček produktů,
- reklama na konkrétní investiční řešení,
- spekulativní trading stránka.

### Cílový návštěvník

Člověk, který:

- chce začít investovat,
- má volné prostředky,
- chce investovat pravidelně,
- buduje dlouhodobý majetek,
- už investuje a chce zkontrolovat současné portfolio,
- řeší investice na konkrétní cíl,
- řeší investice na penzi,
- chce investovat, ale neví, jaké riziko dává pro jeho situaci smysl.

### Sekční osnova — návrh copy (NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ)

#### 1. Hero

**H1**
`Investice mají vycházet z toho, na co a kdy peníze potřebujete.`

**Hero text**
`Nejdřív si ujasníme, co chcete investováním získat, kdy budete peníze potřebovat a jaké riziko dává smysl podstoupit. Potom nastavíme způsob investování, který odpovídá vašim cílům i ostatním financím.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

*Hero na této stránce záměrně NEOBSAHUJE podpůrný text typu „Přibližně
30 minut · Ostrava-Poruba nebo online" — stejná konvence jako
`/sluzby/financni-plan` a `/sluzby/pojisteni`, na výslovné přání uživatele
(nechce tenhle typ textu v hero žádné detailní služby).*

#### 2. Různý cíl = jiný přístup

**Popisek v pruhu:** `Cíl` — dominantní kapitola (stejná role jako
„Dopad" na `/sluzby/pojisteni`): největší H2 na stránce, smaragdový
popisek a smaragdová kotva.

**H2**
`Jinak se investuje na několik let. Jinak na několik desetiletí.`

**Text**
`Peníze na plánovanou koupi nemovitosti mají jiný účel než majetek, který vytváříte na penzi. Rozdílný čas a cíl znamenají i rozdílné nároky na dostupnost peněz a přijatelné riziko.`

`Proto nezačínám otázkou, který fond nebo investiční produkt vybrat. Nejdřív potřebujeme vědět, jakou roli mají peníze ve vašem životě.`

**Eyebrow** *(jediný eyebrow na stránce, stejné provedení jako „Podíváme
se na" v kapitole Majetek na `/sluzby/pojisteni`)*
`Peníze mohou mít jiný úkol`

**Obsahové příklady — jako různé cíle a horizonty, ne jako produktové
karty** (vykreslené jako tichý výčet na vlasových řádcích pod eyebrow,
stejné provedení jako seznam v kapitole Majetek na `/sluzby/pojisteni`)

- vlastní bydlení,
- budoucí větší výdaje,
- tvorba dlouhodobého majetku,
- penze.

**Výrazný statement** *(na smaragdové svislici)*
`Stejná investice nemusí dávat smysl pro dva různé cíle.`

#### 3. Rozpočet a rezerva

**Popisek v pruhu:** `Rozpočet`

**H2**
`Nejdřív musí fungovat rozpočet a rezerva.`

**Text**
`Investování nemá být na úkor peněz, které můžete potřebovat v nejbližší době. Proto se nejdřív podíváme na příjmy, výdaje, závazky, rezervu a plánované větší výdaje.`

`Až potom dává smysl určit, kolik můžete investovat pravidelně nebo jednorázově.`

**Body** *(rozvíjí přesunutý text z `/sluzby`, viz „Historie" výše — pět
původních odrážek je tu rozepsáno jako pět bloků nadpis + text)*

K čemu mají peníze sloužit
`Jaký cíl chcete financovat a co pro vás bude znamenat jeho splnění.`

Kdy je budete potřebovat
`Čas určuje, jaké kolísání a jakou dostupnost peněz si můžete dovolit.`

Jakou rezervu už máte
`Peníze na běžné a nečekané výdaje nemají automaticky patřit do dlouhodobých investic.`

Kolik můžete pravidelně investovat
`Částka má odpovídat vašemu rozpočtu a ostatním prioritám.`

Jaké kolísání jste schopni přijmout
`Investice musí odpovídat nejen cíli, ale i tomu, jak budete reagovat na pokles její hodnoty.`

**Závěr** *(zachovaný původní text z `/sluzby`, beze změny — bez
smaragdové svislice, stejné provedení jako závěrečná věta kapitoly
Majetek na `/sluzby/pojisteni`, protože je to zakončení výčtu, ne
samostatný statement)*
`Až potom vybíráme způsob investování.`

#### 4. Riziko, náklady a podmínky

**Popisek v pruhu:** `Riziko`

**H2**
`Důležité je vědět, jaké riziko podstupujete a za co platíte.`

**Text**
`Vyšší očekávaný výnos bývá spojený s vyšším rizikem. Hodnota investice může kolísat a v některých obdobích také výrazně klesnout. Proto je důležité rozumět nejen tomu, co může investice přinést, ale i tomu, co se může stát cestou.`

**Obsah**

Riziko a kolísání
`Jak se může měnit hodnota investice a zda takový průběh odpovídá vašemu cíli a zkušenostem.`

Dostupnost peněz
`Za jakých podmínek a v jakém čase můžete prostředky potřebovat nebo vybrat.`

Rozložení investic
`Proč není vhodné stavět celý majetek na jedné investici nebo úzké skupině aktiv.`

Náklady
`Jaké poplatky a další náklady jsou s investováním spojené a jak ovlivňují výsledek.`

Daňové souvislosti
`Jaké daňové podmínky mohou být pro zvolený způsob investování relevantní.`

**Výrazný statement** *(na smaragdové svislici)*
`Investici máte rozumět i ve chvíli, kdy její hodnota klesá.`

**Regulatorní opatrnost — závazné pro copy i implementaci** (viz i
`docs/brand-experience-brief.md` §8, §24 v `CLAUDE.md`)

- Nepoužívat konkrétní procenta výnosů, modelové výnosy ani historická
  čísla bez zdroje.
- Nepoužívat garance ani tvrzení o „nejlepší"/„nejvýhodnější" investici či
  portfoliu.
- Nepoužívat konkrétní daňové sazby bez ověření.

#### 5. Co když už investujete

**Popisek v pruhu:** `Portfolio` — kompozičně totožné s kapitolou
Kontrola na `/sluzby/pojisteni` (statement hned pod H2 v levé koloně,
odstavce v doprovodné koloně).

**H2**
`Nejdřív se podívám na to, co už máte.`

**Text**
`Pokud už máte investice, není důvod začínat od nuly. Projdeme jejich účel, složení, náklady, riziko a to, jestli odpovídají vašim současným cílům.`

`Může se ukázat, že současné nastavení dává smysl. Pokud najdeme něco, co stojí za úpravu, vysvětlím vám proč a jaké jsou možnosti.`

**Výrazný statement** *(na smaragdové svislici, umístěn hned pod H2 v
levé koloně — ne pod odstavci)*
`Změna portfolia má mít důvod. Ne být cílem sama o sobě.`

*Účel sekce: odbourat obavu z automatického převádění stávajících
investic (viz „Obchodní cíl" níže, psychologický cíl) — stejná role jako
sekce „Kontrola současného pojištění" na `/sluzby/pojisteni`.*

#### 6. Jak investiční plán vzniká

**Popisek v pruhu:** `Průběh` — šest kroků (o jeden víc než pět kroků
„Jak spolupráce probíhá" na `/sluzby/pojisteni`), první kotva smaragdová,
ostatní tlumené, stejná technika odbočky trasy jako sourozenci.

**H2**
`Od cíle ke konkrétnímu způsobu investování.`

**Body — BEZ VIDITELNÉHO ČÍSLOVÁNÍ** (viz CLAUDE.md, globální pravidlo
proti viditelnému číslování)

Ujasníme si cíle
`Co chcete financovat, kdy a jakou částku budete potřebovat.`

Projdeme současnou situaci
`Rezervu, závazky, dostupné prostředky a investice, které už máte.`

Nastavíme čas a riziko
`Určíme, jaký investiční horizont a míra kolísání odpovídají vašim potřebám a zkušenostem.`

Porovnáme vhodné možnosti
`Vysvětlím vám rozdíly v investičním přístupu, riziku, dostupnosti peněz a nákladech.`

Pomohu s realizací
`Pokud se rozhodnete investovat, pomohu vám s dalšími kroky a potřebnou dokumentací.`

K plánu se budeme vracet
`Když se změní vaše cíle, příjem nebo životní situace, má smysl zkontrolovat, zda investice stále odpovídají tomu, co potřebujete.`

#### 7. Investice a ostatní finance

**Popisek v pruhu:** `Souvislosti` — tlumená kapitola (pruh v tlumené
barvě jako „Péče"/„Otázky" na `/sluzby/pojisteni`), ale layout jako
Kontrola/Portfolio (statement hned pod H2 v levé koloně).

**H2**
`Investování nemá fungovat odděleně od zbytku vašeho života.`

**Text**
`Výše rezervy, hypotéka, ochrana příjmu nebo plánovaná koupě nemovitosti mohou ovlivnit, kolik peněz má smysl investovat a na jak dlouho.`

`Proto se při investování dívám i na ostatní důležitá finanční rozhodnutí. Neznamená to ale, že kvůli investici musíte automaticky řešit všechny své finance.`

**Highlight** *(na smaragdové svislici, hned pod H2 v levé koloně)*
`Začneme tím, co chcete vyřešit právě teď.`

*Sekce propojuje investice s finančním plánem, ale nesmí působit jako
nucený cross-sell — stejné omezení jako u sekce 5 „Co může finanční plán
propojit" na `/sluzby/financni-plan`.*

#### 8. FAQ

**Popisek v pruhu:** `Otázky` — tlumená kapitola, provedení totožné s
FAQ na sourozeneckých stránkách.

**Jakou částku potřebuji, abych mohl začít investovat?**
`Záleží na vašem cíli, rozpočtu a zvoleném způsobu investování. Důležitější než samotná počáteční částka je, aby investování odpovídalo vašim možnostem a neohrozilo potřebnou rezervu.`

**Je lepší investovat pravidelně, nebo jednorázově?**
`Záleží na tom, kolik prostředků máte k dispozici, kdy je budete potřebovat a jaké riziko jste ochotni podstoupit. Oba způsoby mohou mít své místo a lze je také kombinovat.`

**Můžu při investování přijít o peníze?**
`Ano. Investice nesou riziko a jejich hodnota může klesnout. Míra rizika závisí na konkrétním řešení. Proto je důležité rozumět možným ztrátám a neinvestovat peníze, které budete potřebovat v nevhodnou dobu.`

**Musím kvůli vám převádět své současné investice?**
`Ne. Nejdřív se podíváme na to, co už máte. Pokud současné investice odpovídají vašim cílům a potřebám, není důvod je měnit jen kvůli změně poradce.`

**Jak poznám, jaké investiční riziko je pro mě vhodné?**
`Posuzujeme váš cíl, investiční horizont, finanční situaci, zkušenosti a schopnost i ochotu nést ztráty. Podle toho lze určit, jaký způsob investování pro vás dává smysl.`

**Pomůžete mi také s investicemi na penzi?**
`Ano. Nejdřív si ujasníme, jaký majetek a budoucí příjem chcete vytvořit. Potom můžeme řešit, jakou roli mají v plánu investice, penzijní produkty nebo další majetek.`

#### 9. Finální CTA

**H2**
`Pojďme zjistit, jak mají vaše peníze pracovat pro vaše cíle.`

**Text**
`Ať chcete začít investovat, využít volné prostředky nebo zkontrolovat současné portfolio, na první konzultaci si ujasníme vaši situaci a další postup.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

*Tahle kapitola popisuje jen OBSAH — nový formulář ani vizuální řešení se
v tomto dokumentu nenavrhuje, rozhoduje se až při implementaci.*

### Obchodní cíl

Primární: `Nezávazná konzultace`

Sekundární: Vysvětlit návštěvníkovi, že investiční řešení má vycházet z
cíle, času, finanční situace a přijatelného rizika.

Důležitý psychologický cíl: odstranit obavu, že kontrola současných
investic automaticky znamená převod všech peněz jinam, rušení současného
portfolia nebo prodej nového produktu za každou cenu.

### SEO

**SEO title**
`Investiční poradenství a plánování | Patrik Gajdadzis`

**Meta description**
`Pomohu vám nastavit nebo zkontrolovat investice podle vašich cílů, času a rizika. Investiční poradenství osobně v Ostravě nebo online po celé ČR.`

**Canonical**
`https://patrikgajdadzis.cz/sluzby/investice`

### Search intent

Primární:

- investiční poradenství
- investiční poradce Ostrava
- osobní investování
- investiční plán
- jak začít investovat

Sekundární:

- pravidelné investování
- jednorázové investování
- kontrola investičního portfolia
- investování na penzi
- investiční riziko
- náklady investování

Search intent je podklad pro obsahovou architekturu a SEO, ne pokyn ke
keyword stuffingu — neaplikovat mechanicky do copy.

### Interní odkazy

Plánované interní odkazy (zaznamenáno, **zatím neimplementováno** —
`/sluzby/investice` ani žádná z cílových stránek zatím neexistuje v
`src/pages/`, takže žádný z odkazů zatím nesmí být implementovaný jako
funkční):

- `/sluzby`
- `/sluzby/financni-plan`
- `/sluzby/pojisteni`
- `/sluzby/hypoteky`
- `/sluzby/penze`
- `/pristup`
- `/recenze`
- `/kontakt`

### Strukturovaná data / schema

Zapsáno jako plánovaný návrh (zatím neimplementováno):

- `Service`
- `BreadcrumbList`
- `FAQPage` — pouze pokud bude FAQ skutečně později implementované a
  viditelné na stránce

Poznámka: nevytvářet kvůli této stránce novou oddělenou značku, firmu ani
samostatnou investiční společnost, nevymýšlet neexistující oprávnění ani
tvrzení o nezávislosti. Stránka je službou v rámci hlavní entity Patrika
Gajdadzise a osobního webu. Finální profesní a regulatorní text musí
odpovídat aktuálním zápisům v registrech ČNB a případně projít compliance
kontrolou — v tomto dokumentu se žádné regulatorní oprávnění ani profesní
označení nevymýšlí.

Breadcrumb: `Domů → Služby → Investice`

### Poznámky pro Claude Design

- stránka má vizuálně navazovat na schválené detailní stránky služeb
  (`/sluzby/hypoteky`, `/sluzby/financni-plan`, `/sluzby/pojisteni`),
  nepřipravovat pro ni nový samostatný designový systém,
- hlavní obsahový motiv je `cíl → čas → rezerva → riziko → způsob investování`,
- nevytvářet burzovní ani tradingový vizuální jazyk,
- nepoužívat grafy výnosů jako hlavní dekoraci,
- nepoužívat svíčkové grafy,
- nepoužívat investiční dashboard,
- nepoužívat produktové karty fondů,
- nevytvářet pět stejných karet,
- kontinuální linka může vyjadřovat cestu od cíle k investičnímu
  rozhodnutí,
- nesmí z toho vzniknout technický flowchart,
- viditelné číslování kroků je zakázané (viz CLAUDE.md, globální pravidlo
  proti viditelnému číslování),
- žádný podpůrný provozní text v hero,
- design musí respektovat globální centrované designové plátno
  (`--stage-max`, CLAUDE.md „Konvence: wide desktop a centrované
  designové plátno"),
- background sekcí zůstává full-width,
- asymetrie se děje uvnitř stage,
- použít stejný systém Header/Footer/FAQ/CTA jako předchozí detailní
  stránky.

### Archivní poznámka — původní přesunutý text z `/sluzby` (25. 8. 2026)

Zachováno pro dohledatelnost, beze změny. Tento text patřil na `/sluzby`
(sekce 6 „Investice") a byl sem přesunut při zkrácení osnovy `/sluzby` na
šest sekcí, ještě před tímto návrhem. Jeho obsah je nyní rozpracovaný v
sekci 3 „Rozpočet a rezerva" návrhu výše (pět bodů rozepsaných jako
nadpis + text, závěrečná věta zachována doslovně) — jako samostatný blok
odrážek se v aktuální copy nepoužívá.

`Proto nejdřív řešíme:`

- k čemu mají peníze sloužit,
- kdy je budete potřebovat,
- jakou rezervu už máte,
- kolik můžete pravidelně investovat,
- jaké kolísání jste schopni přijmout.

Závěr: `Až potom vybíráme způsob investování.`

### Standardní pole

| Pole | Hodnota |
|---|---|
| Úloha stránky | viz „Úloha stránky" výše |
| Cílový návštěvník | viz „Cílový návštěvník" výše |
| Search intent | viz „Search intent" výše |
| Obchodní cíl | viz „Obchodní cíl" výše |
| H1 | `Investice mají vycházet z toho, na co a kdy peníze potřebujete.` (návrh) |
| Hero text | `Nejdřív si ujasníme, co chcete investováním získat, kdy budete peníze potřebovat a jaké riziko dává smysl podstoupit. Potom nastavíme způsob investování, který odpovídá vašim cílům i ostatním financím.` (návrh) |
| Sekční struktura | devět sekcí — viz „Sekční osnova — návrh copy" výše (Hero, Různý cíl = jiný přístup, Rozpočet a rezerva, Riziko náklady a podmínky, Co když už investujete, Jak investiční plán vzniká, Investice a ostatní finance, FAQ, Finální CTA) |
| Finální copy | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — kompletní první verze, viz „Sekční osnova — návrh copy" výše (sekce 1–9); původní přesunutý text z `/sluzby` zachován beze změny v sekci 3 a v „Archivní poznámce" |
| Primární CTA | `Nezávazná konzultace` (návrh) |
| Sekundární CTA | `+420 775 217 721` (návrh) |
| Interní odkazy | viz „Interní odkazy" výše (zaznamenáno, neimplementováno) |
| SEO title | `Investiční poradenství a plánování \| Patrik Gajdadzis` (návrh) |
| Meta description | `Pomohu vám nastavit nebo zkontrolovat investice podle vašich cílů, času a rizika. Investiční poradenství osobně v Ostravě nebo online po celé ČR.` (návrh) |
| FAQ | šest otázek — viz sekce 8 „FAQ" výše (návrh) |
| Strukturovaná data / schema | `Service`, `BreadcrumbList`, `FAQPage` — plánovaný návrh, zatím neimplementováno (viz „Strukturovaná data / schema" výše) |
| Poznámky pro Claude Design | viz „Poznámky pro Claude Design" výše |
| Stav schválení | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — obsahová strategie: návrh · sekční struktura: návrh · první kompletní copy: návrh · SEO/search intent: návrh · schema plán: návrh · vizuální návrh: zatím neschválen · implementace: zatím neprovedena |

---

## `/sluzby/penze`

**Stav:** `NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ`

**Historie:** Kapitola dřív obsahovala jen text přesunutý z `/sluzby` při
zkrácení její osnovy na šest sekcí (25. 8. 2026). Tento návrh (doplněn
8. 9. 2026) z něj vychází a začleňuje ho do plné struktury stránky —
původní přesunutý text je pro dohledatelnost zachovaný beze změny jako
poslední dva odstavce sekce 2 „Nejdřív částka, potom produkt" a v
„Archivní poznámce" na konci této kapitoly, ne smazaný. Pro dohledatelnost
je zachovaný i tady v původním znění:

`Nejdřív potřebujeme vědět, jaký příjem budete chtít mít, kolik let zbývá do penze a jaký majetek už vytváříte.`

`Z toho lze určit, kolik bude potřeba dlouhodobě odkládat a jakou roli mají ve vašem plánu investice, penzijní produkty nebo další majetek.`

### Úloha stránky

Vysvětlit, že příprava na penzi není jen sjednání penzijního produktu.

Hlavní princip: nejdřív zjistit,

- jaký příjem bude klient chtít mít,
- kdy chce přestat pracovat nebo omezit pracovní příjem,
- jaký majetek už vytváří,
- jaké další zdroje příjmu může mít,
- kolik vlastního majetku bude potřeba vytvořit,
- jak tento majetek postupně vytvářet a později využívat.

Až potom řešit konkrétní investiční a penzijní produkty.

Hlavní myšlenka: `Cílem není mít penzijko. Cílem je mít z čeho žít.`

Stránka nemá působit jako:

- reklama na penzijní spoření,
- katalog DPS a DIP,
- slib finanční nezávislosti,
- kalkulačka garantované renty,
- univerzální návod pro každého.

### Cílový návštěvník

Člověk, který:

- chce začít s přípravou na penzi,
- už si pravidelně odkládá,
- má vyšší příjem a chce vědět, jaký majetek bude potřebovat,
- chce zkontrolovat současné penzijní spoření nebo investice,
- se blíží k penzi,
- chce postupně omezit pracovní příjem,
- chce zjistit, zda mu současný plán může stačit,
- nechce být v budoucnu závislý pouze na státním důchodu.

### Sekční osnova — návrh copy (NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ)

#### 1. Hero

**H1**
`Na penzi potřebujete plán, ne jen penzijní produkt.`

**Hero text**
`Nejdřív si ujasníme, jaký příjem budete chtít mít, kdy chcete přestat pracovat a jaký majetek už vytváříte. Potom spočítáme, kolik bude potřeba postupně odkládat a jakou roli mohou mít ve vašem plánu investice, penzijní produkty nebo další majetek.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

*Hero na této stránce záměrně NEOBSAHUJE podpůrný text typu „Přibližně
30 minut · Ostrava-Poruba nebo online" — stejná konvence jako
`/sluzby/financni-plan`, `/sluzby/pojisteni` a `/sluzby/investice`, na
výslovné přání uživatele (nechce tenhle typ textu v hero žádné detailní
služby).*

#### 2. Nejdřív částka, potom produkt

**H2**
`Důležitější než název produktu je vědět, kolik budete potřebovat.`

**Text**
`Mít penzijní spoření ještě neznamená mít vyřešenou penzi. Stejně tak samotná výše pravidelného příspěvku neříká, jestli vám vytvořený majetek bude stačit.`

`Nejdřív potřebujeme vědět, jaký příjem budete chtít mít, kolik let zbývá do penze a jaký majetek už vytváříte.`
*(zachovaný původní text z `/sluzby`, beze změny)*

`Z toho lze určit, kolik bude potřeba dlouhodobě odkládat a jakou roli mají ve vašem plánu investice, penzijní produkty nebo další majetek.`
*(zachovaný původní text z `/sluzby`, beze změny)*

**Výrazný statement**
`Cílem není mít penzijko. Cílem je mít z čeho žít.`

#### 3. Jaký příjem budete chtít mít

**H2**
`Začněme tím, jak chcete v penzi žít.`

**Text**
`Někdo chce po skončení kariéry výrazně omezit výdaje. Jiný chce cestovat, pomáhat dětem nebo si zachovat podobnou životní úroveň jako dnes. Od toho se odvíjí i částka, kterou bude potřeba vytvořit.`

**Při plánování řešíme**

- požadovaný měsíční příjem,
- očekávané výdaje,
- bydlení a závazky,
- předpokládaný věk odchodu do penze,
- dobu, po kterou má vlastní majetek sloužit.

**Text**
`Důležité je počítat také s tím, že za několik desetiletí budou mít peníze jinou kupní sílu než dnes.`

**Statement**
`Nejdřív si určeme, jaký život má majetek financovat. Potom můžeme počítat, kolik ho bude potřeba.`

#### 4. Současné zdroje a potřebný majetek

**H2**
`Možná už máte část penze vyřešenou. Možná zatím nevíte, jak velkou.`

**Text**
`Při plánování se podíváme na dostupný odhad státního důchodu, současné úspory, investice, penzijní produkty a další majetek, který může v budoucnu přinášet příjem nebo sloužit k financování penze.`

`Potom můžeme odhadnout rozdíl mezi příjmem, který budete chtít mít, a prostředky, které už máte nebo pravděpodobně vytvoříte.`

**Významová návaznost**
`Požadovaný příjem → dostupné zdroje → částka, kterou je potřeba vytvořit.`

*Regulatorní opatrnost: bez modelových částek, výnosů, inflace nebo
předpokladů státního důchodu — viz „Regulatorní a věcná opatrnost" níže.
Odhad státního důchodu se prezentuje jako odhad podle dostupných
podkladů, ne jako garantovaná budoucí částka.*

#### 5. Role jednotlivých možností

**H2**
`Penzijní produkt je jedna z možností. Ne celý plán.`

**Text**
`Doplňkové penzijní spoření, dlouhodobý investiční produkt, běžné investice nebo další majetek mohou mít při přípravě na penzi různé role. Liší se pravidly, dostupností peněz, náklady, rizikem i případnými daňovými výhodami nebo příspěvky zaměstnavatele.`

`Nejdřív proto potřebujeme vědět, co má konkrétní část majetku plnit. Až potom dává smysl vybírat způsob, jakým ji budete vytvářet.`

**Penzijní produkty**
`Doplňkové penzijní spoření a dlouhodobý investiční produkt mohou mít v plánu svou roli — podrobnosti k jejich pravidlům a podmínkám patří do samostatných odborných článků, kde je lze průběžně aktualizovat.`

**Dlouhodobé investice**
`Mohou sloužit k vytváření majetku pro budoucí příjem, ale nesou riziko a jejich vhodnost závisí na konkrétní situaci klienta.`

**Další majetek**
`Součástí plánu může být i další majetek, pokud může v budoucnu přinášet příjem nebo být využit k financování penze.`

**Statement**
`Výhoda produktu má smysl jen tehdy, když zapadá do vašeho plánu.`

*Regulatorní opatrnost: bez konkrétních aktuálních státních příspěvků,
daňových limitů, podmínek výběru nebo jiných časově proměnlivých
parametrů — viz „Regulatorní a věcná opatrnost" níže.*

#### 6. Co když už si na penzi spoříte

**H2**
`Nejdřív zjistíme, jestli vás současné nastavení vede k cíli.`

**Text**
`Pokud už máte penzijní spoření, DIP nebo jiné investice na penzi, není důvod začínat automaticky od nuly. Podíváme se, kolik odkládáte, jak jsou prostředky investované, jaké jsou náklady a zda současný postup odpovídá vašemu cíli a času, který zbývá.`

`Může se ukázat, že není potřeba nic měnit. Pokud najdeme něco, co stojí za úpravu, vysvětlím vám proč a jaké jsou možnosti.`

**Výrazný statement**
`Nejde o to změnit produkt. Jde o to zjistit, jestli vás současný plán dovede tam, kam chcete.`

*Účel sekce: odbourat obavu z automatického rušení/převádění současného
DPS, DIP nebo investic (viz „Obchodní cíl" níže, psychologický cíl) —
stejná role jako „Kontrola současného pojištění" na `/sluzby/pojisteni`
a „Co když už investujete" na `/sluzby/investice`.*

#### 7. Jak plánování penze probíhá

**H2**
`Od představy o penzi ke konkrétnímu plánu.`

**Body — BEZ VIDITELNÉHO ČÍSLOVÁNÍ** (viz CLAUDE.md, globální pravidlo
proti viditelnému číslování)

Ujasníme si váš cíl
`Jaký příjem budete chtít mít a kdy chcete začít využívat vytvořený majetek.`

Projdeme současné zdroje
`Státní důchod podle dostupných podkladů, úspory, investice, penzijní produkty a další relevantní majetek.`

Spočítáme potřebný majetek
`Odhadneme, kolik bude potřeba vytvořit a jakou část mohou pokrýt současné prostředky a budoucí pravidelné investice.`

Nastavíme další postup
`Podíváme se na vhodné možnosti podle času, rizika, dostupnosti peněz a vašich ostatních finančních priorit.`

Pomohu s realizací
`Pokud se rozhodnete doporučené kroky provést, pomohu vám s jejich nastavením.`

K plánu se budeme vracet
`Když se změní příjem, cíle, majetek nebo pravidla, má smysl plán znovu projít a případně upravit.`

#### 8. Využívání majetku v penzi

**H2**
`Důležité je i to, jak budete majetek později využívat.`

**Text**
`Vytvořit majetek je jedna část plánu. Druhá je rozhodnout, jak z něj budete postupně financovat svůj život, až přestanete pracovat nebo omezíte příjem.`

`Při plánování proto dává smysl přemýšlet také o dostupné rezervě, postupném výběru prostředků, investičním riziku a o tom, jak se může měnit vaše potřeba peněz v různých obdobích penze.`

**Statement**
`Majetek nemá jen růst. Jednou má sloužit vám.`

*Regulatorní opatrnost: bez univerzálního „bezpečného procenta výběru",
bez slibu garantované renty, bez tvrzení, že konkrétní částka vydrží
přesně určitý počet let, bez modelových grafů s neověřenými předpoklady
— viz „Regulatorní a věcná opatrnost" níže.*

#### 9. FAQ

**Kdy je nejlepší začít řešit penzi?**
`Čím více času máte, tím větší prostor zpravidla získáte pro postupné vytváření majetku. Smysl ale má začít i později. Důležité je zjistit, jaká je vaše současná situace a jaké možnosti ještě máte.`

**Kolik si mám měsíčně odkládat na penzi?**
`Záleží na požadovaném příjmu, době do penze, současném majetku a předpokladech použitého výpočtu. Univerzální částka proto neexistuje. Nejdřív potřebujeme spočítat váš konkrétní cíl.`

**Stačí mi doplňkové penzijní spoření?**
`To záleží na tom, kolik odkládáte, jak dlouho, jak jsou prostředky investované a jaký majetek chcete vytvořit. Penzijní spoření může být užitečnou součástí plánu, ale samo o sobě nezaručuje, že budete mít v penzi dostatek peněz.`

**Jaký je rozdíl mezi DPS a DIP?**
`Jde o odlišné způsoby dlouhodobého zajištění na stáří s různými pravidly a možnostmi investování. Při výběru je potřeba zohlednit konkrétní podmínky, náklady, riziko, dostupnost prostředků a případné daňové výhody. Aktuální pravidla projdeme podle vaší situace.`

**Co když už mám penzijní spoření nebo investice?**
`Nejdřív se podíváme na současné nastavení. Pokud odpovídá vašemu cíli, není důvod ho měnit jen kvůli změně poradce.`

**Můžu si naplánovat penzi dříve než ve státním důchodovém věku?**
`Ano. Pokud chcete přestat pracovat dříve nebo postupně omezit pracovní příjem, můžeme spočítat, jaký vlastní majetek byste k tomu potřebovali. Výsledek závisí na vašich cílech, současných prostředcích a použitých předpokladech.`

#### 10. Finální CTA

**H2**
`Pojďme zjistit, jak jste na tom s přípravou na penzi.`

**Text**
`Ať teprve začínáte, už si pravidelně odkládáte nebo chcete vědět, jestli vám současný plán bude stačit, na první konzultaci si ujasníme vaši situaci a další postup.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

*Tahle kapitola popisuje jen OBSAH — nový formulář ani vizuální řešení se
v tomto dokumentu nenavrhuje, rozhoduje se až při implementaci.*

### Obchodní cíl

Primární: `Nezávazná konzultace`

Sekundární: Vysvětlit návštěvníkovi, že plánování penze začíná
požadovaným příjmem a potřebným majetkem, ne výběrem produktu.

Důležitý psychologický cíl: odstranit obavu, že kontrola současného DPS,
DIP nebo investic automaticky znamená jejich zrušení a převod jinam.

### SEO

**SEO title**
`Plánování penze a důchodu | Patrik Gajdadzis`

**Meta description**
`Pomohu vám spočítat, jaký majetek budete potřebovat na penzi a jak ho postupně vytvářet. Plánování penze v Ostravě nebo online po celé ČR.`
*(Upraveno 24. 9. 2026: první osoba podle briefu §6, zkráceno pod ~920 px, aby ho Google neořezal.)*

**Canonical**
`https://patrikgajdadzis.cz/sluzby/penze`

*Trailing slash: při budoucí implementaci respektovat skutečnou globální
konvenci webu (viz existující implementované stránky) — tady se
zaznamenává jen návrh URL, ne finální formát.*

### Search intent

Primární:

- plánování penze
- příprava na důchod
- kolik spořit na důchod
- finanční plán na penzi
- penzijní poradenství Ostrava

Sekundární:

- kolik potřebuji na penzi
- investice na důchod
- doplňkové penzijní spoření
- dlouhodobý investiční produkt
- DIP
- kontrola penzijního spoření
- předčasná finanční nezávislost *(pouze možný související intent —
  stránka není primárně FIRE landing page)*

Search intent je podklad pro obsahovou architekturu a SEO, ne pokyn ke
keyword stuffingu — neaplikovat mechanicky do copy.

### Interní odkazy

Plánované interní odkazy (zaznamenáno, **zatím neimplementováno** —
`/sluzby/penze` ani žádná z cílových stránek zatím neexistuje jako
`/sluzby/penze` v `src/pages/`, takže žádný z odkazů zatím nesmí být
implementovaný jako funkční):

- `/sluzby`
- `/sluzby/financni-plan`
- `/sluzby/investice`
- `/sluzby/pojisteni`
- `/sluzby/hypoteky`
- `/pristup`
- `/recenze`
- `/kontakt`

### Strukturovaná data / schema

Zapsáno jako plánovaný návrh (zatím neimplementováno):

- `Service`
- `BreadcrumbList`
- `FAQPage` — pouze pokud bude FAQ skutečně později implementované a
  viditelné na stránce a strukturovaná data budou odpovídat zobrazenému
  obsahu; neprezentovat jako záruku rich results ve vyhledávání.

Poznámka: nevytvářet kvůli této stránce novou oddělenou značku, firmu ani
samostatnou penzijní společnost, nevymýšlet neexistující oprávnění ani
tvrzení o nezávislosti. Stránka je službou v rámci hlavní entity Patrika
Gajdadzise a osobního webu. Finální profesní a regulatorní text musí
odpovídat aktuálním zápisům v registrech ČNB a případně projít compliance
kontrolou — v tomto dokumentu se žádné regulatorní oprávnění ani profesní
označení nevymýšlí.

Breadcrumb: `Domů → Služby → Penze`

### Regulatorní a věcná opatrnost

Závazné pro copy i budoucí implementaci (viz i
`docs/brand-experience-brief.md` §8, §24 v `CLAUDE.md`).

**Nepoužívat tvrzení typu:**

- garantovaný výnos,
- jistá renta,
- bezpečná investice bez rizika,
- nejlepší penzijní produkt,
- nejvýhodnější portfolio,
- přesně víme, kolik budete mít v penzi,
- státní důchod bude mít garantovanou konkrétní výši,
- konkrétní majetek vám určitě vydrží celý život.

**Nevkládat aktuální právní, daňové ani produktové parametry bez
ověření**, zejména ne: výše státních příspěvků, daňové limity DPS/DIP,
podmínky předčasného výběru, věkové hranice, aktuální důchodový věk,
konkrétní sazby nebo výnosové předpoklady. Pokud je pro copy některý
takový údaj nezbytný, označit ho jako **bod k ověření**, ne jako hotový
fakt — v aktuální verzi copy výše žádný takový údaj není použit.

**Bez modelových částek, výnosů, inflace nebo předpokladů státního
důchodu** (sekce 4) a **bez univerzálního „bezpečného procenta výběru",
garantované renty nebo modelových grafů** (sekce 8) — viz jednotlivé
sekce výše.

### Poznámky pro Claude Design

- stránka má vizuálně navazovat na schválené detailní stránky služeb
  (`/sluzby/hypoteky`, `/sluzby/financni-plan`, `/sluzby/pojisteni`,
  `/sluzby/investice`), nepřipravovat pro ni nový samostatný designový
  systém,
- hlavní obsahový motiv je `požadovaný příjem → současné zdroje →
  potřebný majetek → plán vytváření a využívání`,
- nevytvářet katalog DPS/DIP,
- nepoužívat grafy garantovaného růstu,
- nepoužívat vymyšlené výnosy ani modelové částky,
- nepoužívat stock fotografie důchodců jako hlavní motiv,
- nevytvářet produktové karty penzijních fondů,
- kontinuální linka může vyjadřovat vztah mezi cílem, časem a majetkem,
- nesmí z toho vzniknout technický flowchart,
- viditelné číslování kroků je zakázané (viz CLAUDE.md, globální pravidlo
  proti viditelnému číslování),
- žádný podpůrný provozní text v hero,
- design musí respektovat globální centrované designové plátno
  (`--stage-max`, CLAUDE.md „Konvence: wide desktop a centrované
  designové plátno"),
- background sekcí zůstává full-width,
- asymetrie se děje uvnitř stage,
- použít stejný systém Header/Footer/FAQ/CTA jako předchozí detailní
  stránky.

### Archivní poznámka — původní přesunutý text z `/sluzby` (25. 8. 2026)

Zachováno pro dohledatelnost, beze změny. Tento text patřil na `/sluzby`
(sekce 7 „Penze") a byl sem přesunut při zkrácení osnovy `/sluzby` na
šest sekcí, ještě před tímto návrhem. Jeho obsah je nyní zachovaný beze
změny jako poslední dva odstavce sekce 2 „Nejdřív částka, potom produkt"
návrhu výše — jako samostatný blok se v aktuální copy nepoužívá.

`Nejdřív potřebujeme vědět, jaký příjem budete chtít mít, kolik let zbývá do penze a jaký majetek už vytváříte.`

`Z toho lze určit, kolik bude potřeba dlouhodobě odkládat a jakou roli mají ve vašem plánu investice, penzijní produkty nebo další majetek.`

### Standardní pole

| Pole | Hodnota |
|---|---|
| Úloha stránky | viz „Úloha stránky" výše |
| Cílový návštěvník | viz „Cílový návštěvník" výše |
| Search intent | viz „Search intent" výše |
| Obchodní cíl | viz „Obchodní cíl" výše |
| H1 | `Na penzi potřebujete plán, ne jen penzijní produkt.` (návrh) |
| Hero text | `Nejdřív si ujasníme, jaký příjem budete chtít mít, kdy chcete přestat pracovat a jaký majetek už vytváříte. Potom spočítáme, kolik bude potřeba postupně odkládat a jakou roli mohou mít ve vašem plánu investice, penzijní produkty nebo další majetek.` (návrh) |
| Sekční struktura | deset sekcí — viz „Sekční osnova — návrh copy" výše (Hero, Nejdřív částka potom produkt, Jaký příjem budete chtít mít, Současné zdroje a potřebný majetek, Role jednotlivých možností, Co když už si na penzi spoříte, Jak plánování penze probíhá, Využívání majetku v penzi, FAQ, Finální CTA) |
| Finální copy | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — kompletní první verze, viz „Sekční osnova — návrh copy" výše (sekce 1–10); původní přesunutý text z `/sluzby` zachován beze změny v sekci 2 a v „Archivní poznámce" |
| Primární CTA | `Nezávazná konzultace` (návrh) |
| Sekundární CTA | `+420 775 217 721` (návrh) |
| Interní odkazy | viz „Interní odkazy" výše (zaznamenáno, neimplementováno) |
| SEO title | `Plánování penze a důchodu \| Patrik Gajdadzis` (návrh) |
| Meta description | `Pomohu vám spočítat, jaký majetek budete potřebovat na penzi a jak ho postupně vytvářet. Plánování penze v Ostravě nebo online po celé ČR.` (upraveno 24. 9. 2026: první osoba podle briefu §6, zkráceno pod ~920 px, aby ho Google neořezal) |
| FAQ | šest otázek — viz sekce 9 „FAQ" výše (návrh) |
| Strukturovaná data / schema | `Service`, `BreadcrumbList`, `FAQPage` — plánovaný návrh, zatím neimplementováno (viz „Strukturovaná data / schema" výše) |
| Poznámky pro Claude Design | viz „Poznámky pro Claude Design" výše |
| Stav schválení | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — obsahová strategie: návrh · sekční struktura: návrh · první kompletní copy: návrh · SEO/search intent: návrh · schema plán: návrh · vizuální návrh: zatím neexistuje (žádný soubor `src/pages/sluzby/penze.astro` ani vizuální návrh v projektu neexistuje) · implementace: zatím neexistuje (potvrzeno `Glob`, žádný `*penze*` soubor v `src/`) |

---

## `/pristup`

**Stav:** `NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ`

**Historie:** Kapitola dřív obsahovala jen materiál přesunutý z `/sluzby`
(bývalá sekce 9 „Jak spolupráce začne") při zkrácení její osnovy na šest
sekcí (25. 8. 2026). Tento návrh (doplněn 8. 9. 2026) z něj vychází a
začleňuje ho do plné struktury stránky — původní přesunutý materiál je
pro dohledatelnost zachovaný beze změny v sekci 3 „Jak spolupráce začne"
a v „Archivní poznámce" na konci této kapitoly, ne smazaný. Původní
veřejné číselné prefixy `01/02/03` u tří kroků byly z veřejné copy
odstraněny už dřív (1. 9. 2026, viz CLAUDE.md „Globální pravidlo: žádné
viditelné číslování kroků/bodů" — Historie) — v tomto návrhu zůstávají
odstraněné, kroky jsou nečíslované nadpisy. Pro dohledatelnost je
materiál zachovaný i tady v původním znění:

**H2**
`Nejdřív potřebuji pochopit vaši situaci.`

**Řeknete mi, co řešíte**
`Hypotéku, investice, pojištění nebo třeba jen otázku, jestli máte finance nastavené správně.`

**Projdeme současný stav**
`Podíváme se na důležité informace, cíle a případně i řešení, která už používáte.`

**Řeknu vám, co dává smysl udělat dál**
`Bez toho, abychom museli řešit všechno najednou.`

**Doprovodný text**
`První konzultace trvá přibližně 30 minut a je nezávazná. Můžeme se potkat osobně v Ostravě-Porubě nebo online.`

### Úloha stránky

Vysvětlit:

- jak spolupráce s Patrikem probíhá,
- co se děje na první konzultaci,
- jak vzniká doporučení,
- kdo rozhoduje o dalším postupu,
- co se děje po rozhodnutí klienta,
- jak probíhá realizace,
- jak je spolupráce odměňována,
- co znamená dlouhodobá péče.

`/pristup` nemá být další kopií `/sluzby`. Nemá detailně znovu
vysvětlovat hypotéky, pojištění, investice ani penzi — detail
jednotlivých oblastí patří na příslušné service pages.

Hlavní úloha: `Jak se mnou bude spolupráce probíhat a co ode mě můžete
očekávat.`

### Cílový návštěvník

Člověk, který:

- už ví, co chce řešit, ale ještě si vybírá poradce,
- neví, co přesně potřebuje za produkt,
- chce vědět, co se bude dít na první schůzce,
- má obavu z nátlakového prodeje,
- nechce automaticky rušit stávající smlouvy,
- chce vědět, co se děje po doporučení,
- hledá dlouhodobého partnera, ne jednorázový prodej.

### Sekční osnova — návrh copy (NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ)

#### 1. Hero

**H1**
`Nejdřív potřebuji pochopit, co chcete vyřešit.`

**Hero text**
`Můžete přijít s jednou konkrétní otázkou nebo s celými financemi. Nejdřív projdeme vaši situaci a cíle. Potom vám vysvětlím, jaké možnosti dávají smysl a co bych doporučil řešit jako první.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

*Hero na této stránce záměrně NEOBSAHUJE podpůrný text typu „Přibližně
30 minut · Ostrava-Poruba nebo online" — stejná konvence jako detailní
service pages. Informace o délce a místě konzultace je dál v obsahu
stránky (sekce 3, doprovodný text), ne v hero.*

#### 2. Nemusíte vědět, jaký produkt potřebujete

**H2**
`Stačí vědět, co chcete vyřešit.`

**Text**
`Někdo přichází s konkrétní hypotékou. Jiný chce zkontrolovat pojištění, začít investovat nebo zjistit, jestli má finance nastavené rozumně.`

`Nemusíte předem vědět, jaké řešení potřebujete. Právě od toho je první konzultace. Společně si ujasníme, co je pro vás důležité a jaký další postup dává smysl.`

**Výrazný statement**
`Začneme vaším problémem. Ne nabídkou produktu.`

*Tato sekce NENÍ kompletní rozcestník všech služeb — ten patří na
`/sluzby`.*

#### 3. Jak spolupráce začne

**H2** *(zachovaný původní text z `/sluzby`, beze změny)*
`Nejdřív potřebuji pochopit vaši situaci.`

**Body — BEZ VIDITELNÉHO ČÍSLOVÁNÍ** (viz CLAUDE.md, globální pravidlo
proti viditelnému číslování; původní veřejné prefixy `01/02/03`
odstraněny)

Řeknete mi, co řešíte
`Hypotéku, investice, pojištění nebo třeba jen otázku, jestli máte finance nastavené správně.`

Projdeme současný stav
`Podíváme se na důležité informace, cíle a případně i řešení, která už používáte.`

Řeknu vám, co dává smysl udělat dál
`Bez toho, abychom museli řešit všechno najednou.`

**Doprovodný text** *(zachovaný původní text z `/sluzby`, beze změny)*
`První konzultace trvá přibližně 30 minut a je nezávazná. Můžeme se potkat osobně v Ostravě-Porubě nebo online.`

#### 4. Doporučení a rozhodnutí

**H2**
`Máte vědět, co doporučuji a proč.`

**Text**
`Když projdeme vaši situaci, vysvětlím vám, jaké možnosti připadají v úvahu, v čem se liší a co bych doporučil řešit jako první.`

`Pokud bude dávat smysl něco změnit, řeknu vám proč a co by vám změna měla přinést. Stejně tak vám řeknu, když podle mého posouzení není potřeba do současného nastavení zasahovat.`

`Nemusíte se rozhodnout hned na první schůzce. Důležité je, abyste rozuměli tomu, pro co se rozhodujete.`

**Výrazný statement**
`Doporučení má mít důvod. Rozhodnutí zůstává na vás.`

*Účel sekce: jasně odbourat dojem nátlakového prodeje.*

#### 5. Realizace

**H2**
`Doporučením moje práce nekončí.`

**Text**
`Pokud se rozhodnete pro navržený postup, pomohu vám s jeho realizací. Podle konkrétní služby to může znamenat přípravu podkladů, porovnání vhodných možností, komunikaci s příslušnými institucemi nebo vyřízení potřebných kroků.`

`U hypotéky řešíme celý proces až po čerpání. U pojištění nebo investic zase záleží na tom, co potřebujete nastavit nebo změnit.`

`Průběžně vám vysvětlím, co se právě řeší a co bude potřeba z vaší strany.`

**Výrazný statement**
`Máte vědět, co se děje. Ne jen čekat na výsledek.`

*Tahle sekce nevytváří nový detailní proces jednotlivých služeb — ten už
patří na detailní service pages.*

#### 6. Odměna a transparentnost — ODSTRANĚNO Z ŽIVÉ STRÁNKY 14. 9. 2026

*Na přání uživatele („a tuto sekci smazat v přístupu podstránce") byla celá
tato kapitola i s pruhem/kotvou na trase 14. 9. 2026 odstraněna ze
`src/pages/pristup.astro` (i z `scripts/audit-layout.mjs`'s kontrolního
pole pro tuhle stránku). Text níže zůstává jen jako historický záznam
schváleného copy, NENÍ už na produkčním webu. Otázka odměňování zůstává na
`/pristup` řešená jen stručně ve FAQ („Kolik stojí spolupráce se mnou?").
Celá tato sekce byla dřív označená K OVĚŘENÍ PŘED PUBLIKACÍ — způsob
odměňování musí odpovídat skutečnému obchodnímu, smluvnímu a
regulatornímu nastavení pro jednotlivé oblasti, viz „Regulatorní
opatrnost" níže.*

**H2**
`O odměně a podmínkách máte vědět předem.`

**Pracovní copy**
`První konzultace je nezávazná. Pokud se následně rozhodnete pro zprostředkování finančního produktu, odměna za zprostředkování je zpravidla vyplácena příslušnou finanční institucí.`

`Před sjednáním vám vysvětlím podstatné podmínky konkrétního řešení, včetně nákladů a způsobu odměňování v rozsahu, který se na danou službu vztahuje.`

`Pokud by měla být některá služba zpoplatněná přímo vámi, musí být její rozsah a cena dohodnuté předem.`

#### 7. Dlouhodobá péče

**H2**
`Finanční rozhodnutí nekončí podpisem smlouvy.`

**Text**
`Hypotéka se časem dostane ke konci fixace. Změní se příjem, rodinná situace nebo hodnota majetku. Investice a plán na penzi zase mohou potřebovat úpravu podle nových cílů.`

`Proto se s klienty vracím k tomu, co jsme společně nastavili. Když nastane důležitá změna, podíváme se, jestli současné řešení stále dává smysl.`

`A pokud potřebujete řešit něco nového, nemusíte začínat s dalším poradcem od nuly. Můžete se na mě obrátit a navážeme na to, co už o vaší situaci víme.`

**Výrazný statement**
`Chci být člověk, kterému zavoláte i při dalším finančním rozhodnutí.`

*Sekce vyjadřuje dlouhodobého partnera bez generických frází typu
„komplexní servis", „finance bez starostí", „vše pod jednou střechou" —
viz „Brand voice" níže.*

#### 8. FAQ

**Musím mít před první konzultací připravené všechny smlouvy?**
`Ne. Na začátku stačí vědět, co chcete řešit. Pokud budou pro další postup potřeba konkrétní dokumenty nebo informace, řeknu vám, co si připravit.`

**Musím na schůzce něco sjednat?** (aktualizováno 14. 9. 2026, zadání
uživatele „Sjednotit FAQ na /pristup" — otázka i odpověď upraveny, „první"
odstraněno ze zadání otázky a „PRVNÍ konzultace je nezávazná" nahrazeno za
„Konzultace jsou nezávazné", protože nezávazné jsou konzultace obecně, ne
jen ta první)
`Ne. Konzultace jsou nezávazné. Nejdřív si ujasníme vaši situaci a možnosti. O případném sjednání nebo změně se rozhodnete až podle konkrétního doporučení.`

**Můžu přijít jen kvůli hypotéce nebo jedné smlouvě?**
`Ano. Začneme tím, co potřebujete vyřešit. Další oblasti má smysl otevírat pouze tehdy, pokud jsou pro vaši situaci relevantní.`

**Jak dlouho trvá první konzultace a kde probíhá?**
`Přibližně 30 minut. Můžeme se potkat osobně v Ostravě-Porubě nebo online. Konkrétní termín a způsob si domluvíme předem.`
*(zde „první konzultace" zůstává — otázka řeší konkrétně délku úvodního setkání)*

**Kolik stojí spolupráce se mnou?** (aktualizováno 14. 9. 2026, zadání
uživatele „Sjednotit FAQ na /pristup" — nahrazuje otázku „Jak je vaše práce
placená?" i její odpověď; odstraněno vysvětlování provize od finanční
instituce, sjednoceno se stejnou FAQ na homepage)
`Konzultace jsou nezávazné a zdarma. Za mou práci mi nic přímo neplatíte.`

**Končí spolupráce podpisem?** (aktualizováno 14. 9. 2026, zadání uživatele
„Sjednotit FAQ na /pristup" — nahrazuje otázku „Můžu se na vás obrátit i po
sjednání?" i její odpověď)
`Ne. Podpisem pro mě spolupráce nekončí. Chci s klienty zůstávat v kontaktu dlouhodobě a být člověk, na kterého se mohou obrátit i při dalších finančních rozhodnutích. Když se jejich situace nebo cíle změní, navážeme na to, co už máme společně nastavené.`

#### 9. Finální CTA

**H2**
`Začneme tím, co potřebujete vyřešit teď.`

**Text**
`Na první konzultaci si ujasníme vaši situaci a další krok. Nemusíte předem vědět, jaký produkt nebo službu potřebujete.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

*Tento H2+text je STEJNÝ jako rezervovaná copy uložená pro `/kontakt` v
kapitole `/sluzby` („Rezerva textu pro /kontakt", 25. 8. 2026) — viz tam
doplněná poznámka o duplicitě (8. 9. 2026). Zatím není rozhodnuté, jestli
finální CTA bude na obou stránkách identické, nebo jestli si `/kontakt`
při své budoucí tvorbě zvolí jiný text — rozhodne se až tehdy. Nový
formulář se v tomto dokumentu nenavrhuje.*

### Obchodní cíl

Primární: `Nezávazná konzultace`

Sekundární:

- zvýšit důvěru před první schůzkou,
- snížit nejistotu z průběhu finančního poradenství,
- vysvětlit rozhodovací proces,
- ukázat, že klient není tlačen do okamžitého sjednání,
- ukázat dlouhodobou péči.

Psychologicky důležitá myšlenka: `Doporučení má mít důvod. Rozhodnutí
zůstává na vás.`

### SEO

**SEO title**
`Jak pracuji | Patrik Gajdadzis, finanční poradce`

**Meta description**
`Zjistěte, jak se mnou probíhá spolupráce. Od první konzultace přes doporučení a realizaci až po dlouhodobou péči. Ostrava i online.`
*(Upraveno 24. 9. 2026: první osoba podle briefu §6, zkráceno pod ~920 px, aby ho Google neořezal.)*

**Canonical**
`https://patrikgajdadzis.cz/pristup`

*Trailing slash: při budoucí implementaci respektovat skutečnou globální
konvenci webu (viz existující implementované stránky) — tady se
zaznamenává jen návrh URL, ne finální formát.*

### Search intent

Primární:

- jak probíhá finanční poradenství
- první schůzka s finančním poradcem
- jak funguje finanční poradce
- jak je placený finanční poradce
- spolupráce s finančním poradcem

Brandový / navigační:

- Patrik Gajdadzis spolupráce
- Patrik Gajdadzis finanční poradce

*`/pristup` nemá agresivně soupeřit s homepage o hlavní intent „finanční
poradce Ostrava" — homepage zůstává hlavní vstupní stránkou pro osobní/
lokální poradenský intent. Search intent je podklad pro obsahovou
architekturu a SEO, ne pokyn ke keyword stuffingu — neaplikovat
mechanicky do copy.*

### Interní odkazy

Plánované interní odkazy (zaznamenáno, **zatím neimplementováno** —
`/pristup` zatím neexistuje jako stránka v `src/pages/`, takže žádný z
odkazů zatím nesmí být implementovaný jako funkční):

- `/sluzby`
- `/sluzby/hypoteky`
- `/sluzby/financni-plan`
- `/sluzby/pojisteni`
- `/sluzby/investice`
- `/sluzby/penze`
- `/o-mne`
- `/recenze`
- `/kontakt`

### Strukturovaná data / schema

Zapsáno jako plánovaný návrh (zatím neimplementováno):

- `WebPage`
- `BreadcrumbList`
- `FAQPage` — pouze pokud bude FAQ skutečně později implementované a
  viditelné na stránce a strukturovaná data budou odpovídat zobrazenému
  obsahu.

Poznámka: nevytvářet pro `/pristup` novou samostatnou `Service` entitu —
stránka vysvětluje způsob práce napříč službami, ne jednu konkrétní
službu. Vše má být napojené na existující hlavní `Person` entitu Patrika
Gajdadzise.

Breadcrumb: `Domů → Přístup`

### Brand voice

Při psaní i budoucích úpravách zachovat pravidla brand briefu: převážně
první osoba, profesionální vykání, krátké věty, krátké odstavce,
konkrétní formulace, klidný tón, žádný agresivní prodej, žádný anonymní
firemní styl.

Nepoužívat formulace typu: „komplexní řešení šité na míru", „finance bez
starostí", „cesta k finanční svobodě", „nejlepší nabídka", „nejvýhodnější
řešení", „nezávislé finanční poradenství", „certifikovaný poradce u
ČNB" — v copy výše žádná z nich není použita.

### Regulatorní opatrnost

Sekce 6 „Odměna a transparentnost" a příslušná FAQ odpověď (sekce 8) jsou
označené `K OVĚŘENÍ PŘED PUBLIKACÍ` — způsob odměňování musí odpovídat
skutečnému obchodnímu, smluvnímu a regulatornímu nastavení pro jednotlivé
oblasti (viz i `docs/brand-experience-brief.md` §8, §24 v `CLAUDE.md`).

V copy výše nejsou a nesmí být bez ověření tvrzení typu: všechny služby
jsou zdarma, klient nikdy nic neplatí, neexistují žádné náklady, odměna
je vždy výhradně od instituce. Finální profesní a regulatorní text musí
odpovídat aktuálním zápisům v registrech ČNB a případně projít compliance
kontrolou — v tomto dokumentu se žádné regulatorní oprávnění ani profesní
označení nevymýšlí.

### Poznámky pro Claude Design

- `/pristup` má vizuálně patřit do stejného webu jako detailní služby,
  nepřipravovat pro ni nový samostatný designový systém,
- může být osobnější než service detail pages,
- vhodná je skutečná fotografie Patrika,
- hlavní vizuální návaznost: pochopení situace → doporučení → rozhodnutí
  klienta → realizace → dlouhodobá péče,
- nepřevádět tuto návaznost na viditelně číslovaný flowchart,
- kontinuální linka může princip jemně propojit,
- stránka nemá působit jako katalog služeb,
- stránka nemá působit jako poradenská korporátní prezentace,
- využít výraznou typografii a negativní prostor,
- zachovat full-width background,
- obsah v centered 1760px stage (`--stage-max`, CLAUDE.md „Konvence: wide
  desktop a centrované designové plátno"),
- asymetrie uvnitř stage,
- žádný podpůrný provozní text v hero,
- FAQ a finální CTA vizuálně navázat na současný web,
- běžný text na mobilu minimálně 16px.

### Archivní poznámka — původní přesunutý obsah z `/sluzby` (25. 8. 2026)

Zachováno pro dohledatelnost, beze změny. Tento text patřil na `/sluzby`
(bývalá sekce 9 „Jak spolupráce začne") a byl sem přesunut celý při
zkrácení osnovy `/sluzby` na šest sekcí, ještě před tímto návrhem. Jeho
obsah je nyní zachovaný beze změny v sekci 3 „Jak spolupráce začne"
návrhu výše (číselné prefixy `01/02/03` byly z veřejné copy odstraněny
už 1. 9. 2026 — viz CLAUDE.md).

**H2**
`Nejdřív potřebuji pochopit vaši situaci.`

**Řeknete mi, co řešíte**
`Hypotéku, investice, pojištění nebo třeba jen otázku, jestli máte finance nastavené správně.`

**Projdeme současný stav**
`Podíváme se na důležité informace, cíle a případně i řešení, která už používáte.`

**Řeknu vám, co dává smysl udělat dál**
`Bez toho, abychom museli řešit všechno najednou.`

**Doprovodný text**
`První konzultace trvá přibližně 30 minut a je nezávazná. Můžeme se potkat osobně v Ostravě-Porubě nebo online.`

### Standardní pole

| Pole | Hodnota |
|---|---|
| Úloha stránky | viz „Úloha stránky" výše |
| Cílový návštěvník | viz „Cílový návštěvník" výše |
| Search intent | viz „Search intent" výše |
| Obchodní cíl | viz „Obchodní cíl" výše |
| H1 | `Nejdřív potřebuji pochopit, co chcete vyřešit.` (návrh) |
| Hero text | `Můžete přijít s jednou konkrétní otázkou nebo s celými financemi. Nejdřív projdeme vaši situaci a cíle. Potom vám vysvětlím, jaké možnosti dávají smysl a co bych doporučil řešit jako první.` (návrh) |
| Sekční struktura | devět sekcí — viz „Sekční osnova — návrh copy" výše (Hero, Nemusíte vědět jaký produkt potřebujete, Jak spolupráce začne, Doporučení a rozhodnutí, Realizace, Odměna a transparentnost, Dlouhodobá péče, FAQ, Finální CTA) |
| Finální copy | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — kompletní první verze, viz „Sekční osnova — návrh copy" výše (sekce 1–9); původní přesunutý obsah z `/sluzby` zachován beze změny v sekci 3 a v „Archivní poznámce"; sekce 6 a příslušná FAQ odpověď `K OVĚŘENÍ PŘED PUBLIKACÍ` |
| Primární CTA | `Nezávazná konzultace` (návrh) |
| Sekundární CTA | `+420 775 217 721` (návrh) |
| Interní odkazy | viz „Interní odkazy" výše (zaznamenáno, neimplementováno) |
| SEO title | `Jak pracuji \| Patrik Gajdadzis, finanční poradce` (návrh) |
| Meta description | `Zjistěte, jak se mnou probíhá spolupráce. Od první konzultace přes doporučení a realizaci až po dlouhodobou péči. Ostrava i online.` (upraveno 24. 9. 2026: první osoba podle briefu §6, zkráceno pod ~920 px, aby ho Google neořezal) |
| FAQ | šest otázek — viz sekce 8 „FAQ" výše (návrh; jedna odpověď `K OVĚŘENÍ PŘED PUBLIKACÍ`) |
| Strukturovaná data / schema | `WebPage`, `BreadcrumbList`, `FAQPage` — plánovaný návrh, zatím neimplementováno (viz „Strukturovaná data / schema" výše) |
| Poznámky pro Claude Design | viz „Poznámky pro Claude Design" výše |
| Stav schválení | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — obsahová strategie: návrh · sekční struktura: návrh · první kompletní copy: návrh · SEO/search intent: návrh · schema plán: návrh · sekce o odměňování: `K OVĚŘENÍ PŘED PUBLIKACÍ` · vizuální návrh: zatím neexistuje (žádný soubor `src/pages/pristup.astro` ani vizuální návrh v projektu neexistuje) · implementace: zatím neexistuje (potvrzeno `Glob`, žádný `*pristup*` soubor v `src/`) |

---

## `/recenze`

**Poznámka k URL:** používej `/recenze`, ne `/reference`. Tohle je zaznamenané
rozhodnutí do dokumentace — **nevytváří se tím zatím žádný redirect ani se
nemění žádné existující odkazy** (ty se řeší mimo tento dokument).

**Stav:** `NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ`

**Historie:** Kapitola dřív obsahovala jen základní účel (Google recenze
klientů, důvěryhodnost, později případové studie). Tento návrh (doplněn
9. 9. 2026) je pracovní copy z implementačního zadání „Úkol pro Claude
Code — podstránka /recenze" — **NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ**, ne
finální schválený text. Původní účel je zachovaný beze změny významu
v „Úloze stránky" níže.

### Úloha stránky

Pomoct návštěvníkovi, který zvažuje spolupráci, udělat si vlastní obrázek
na základě skutečných zkušeností klientů.

Hlavní obsah mají tvořit recenze, ne marketingové texty.

Návštěvník má mít možnost:

- přečíst si skutečné recenze,
- ověřit jejich původ,
- přejít na odpovídající Google profil,
- zjistit, jak spolupráce probíhá,
- případně přejít na nezávaznou konzultaci.

Stránka nemá být další katalog služeb ani kopie `/pristup`. Je **záměrně
kratší** než detailní stránky — jen dvě obsahové kapitoly, hlavní prostor
patří recenzím.

### Cílový návštěvník

Člověk, který:

- si vybírá finančního poradce,
- už zná Patrikovo jméno a hledá zkušenosti,
- chce ověřit důvěryhodnost před první schůzkou,
- zvažuje hypotéku, finanční plán nebo jinou službu,
- chce vědět, jak spolupráci hodnotí skuteční klienti.

### Sekční osnova — pracovní copy (NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ)

#### 1. Hero

**H1**
`Co říkají klienti o spolupráci se mnou.`

**Hero text**
`Nejlepší obrázek o mé práci si uděláte od lidí, kteří se mnou už řešili své finance. Přečtěte si jejich zkušenosti a podívejte se, co pro ně bylo při spolupráci důležité.`

**Primární CTA**
`Zobrazit recenze` — plynulý přesun na výpis recenzí na téže stránce, ne
odkaz jinam.

**Sekundární akce**
`+420 775 217 721`

*Hero na této stránce záměrně NEOBSAHUJE podpůrný text typu „Přibližně
30 minut · Ostrava-Poruba nebo online" — stejná konvence jako `/pristup`
a detailní service pages. Žádný eyebrow ani SEO badge.*

#### 2. Skutečné recenze — dominantní

**Popisek v pruhu:** `Recenze` — dominantní kapitola (největší H2 na
stránce, smaragdový popisek a smaragdová kotva, žádná barevná plocha,
žádné podtržení pod popiskem).

**H2**
`Zkušenosti, které si můžete ověřit.`

**Text** (aktualizováno 14. 9. 2026, zadání uživatele „Upravit jednu větu na
stránce /recenze")
`Recenze pocházejí z mého Google profilu. Můžete si je přečíst tady na webu nebo si zobrazit můj profil a všechny recenze přímo na Googlu.`

*Tento text je pracovní copy a jeho veřejné použití předpokládá, že
skutečně zprovozníme výpis odpovídajících Google recenzí.*

**Odkaz na Google**
`Zobrazit na Google` (s ikonou externího odkazu) → viz „Google profil a
aktuální hodnocení" níže pro URL a stav ověření.

**Hlavní obsah kapitoly:** výpis skutečných recenzí. U každé recenze lze
podle dostupných a ověřených dat evidovat:

- veřejné jméno nebo označení autora,
- hodnocení,
- datum,
- původní text,
- identifikátor nebo odkaz na původní recenzi, pokud jej zdroj poskytuje,
- zdroj dat.

**DŮLEŽITÉ — závazné pro copy i implementaci:**

- Nevymýšlet žádné recenze, jména, fotografie, data ani hodnocení.
- Nepřepisovat recenze tak, aby vyzněly lépe.
- Nevytvářet fiktivní testimonialy, ani dočasně, ani jako placeholder s
  lorem ipsum textem, který by šel omylem publikovat.
- Dokud skutečná data nejsou dostupná, eviduje se jen požadovaná datová
  struktura a stav `ČEKÁ NA OVĚŘENÁ DATA` — viz „Podoba výpisu" a
  „Datová struktura recenzí" níže.

**Podoba výpisu (obsahové poznámky, technické řešení je samostatný
implementační úkol):**

- řádkový výpis, žádné karty; na desktopu dvoukolonový řádek (vlevo
  autor/hodnocení/datum, vpravo text), na tabletu/mobilu autor nad
  textem,
- řádek s autorem/hodnocením/datem je TRVALÝ obsah (ne placeholder) —
  jakmile recenze existuje, tahle metadata se zobrazují vždy,
  s dostatečným kontrastem, ne ve světlé/tlumené barvě,
  jako by šlo o vedlejší poznámku,
- hlavní prostor mají dostat samotné texty recenzí,
- při větším počtu recenzí lze řešit postupné načítání (tlačítko, ne
  automatické/nekonečné),
- zakázané: nekonečný automatický karusel, agresivní animace, generické
  marketingové karty, fiktivní citace, vymyšlené fotografie klientů,
  vodorovné posouvání recenzí na mobilu.

**Datová struktura recenzí (pro implementaci):** pole objektů se stavem
per recenze — dokud nejsou dodaná ověřená data, žádná položka pole
neobsahuje vymyšlený text/jméno/datum/hodnocení; placeholder nese jen
technickou strukturu a stav `ČEKÁ NA OVĚŘENÁ DATA`.

**Případné filtrování** — pouze volitelná budoucí možnost (témata typu
hypotéky/pojištění/investice/dlouhodobá spolupráce), a to jen pokud bude
existovat dostatek skutečných recenzí, které lze spolehlivě přiřadit.
Nevymýšlet kategorie ani nepřiřazovat recenze podle domněnek. Dokud data
nejsou dostatečná, preferovat čistý výpis bez filtrů.
Stav: `VOLITELNÉ, PODLE SKUTEČNÝCH DAT`.

#### 3. Přechod na `/pristup`

**Popisek v pruhu:** `Přístup`

**H2**
`Recenze vám ukážou zkušenosti. Přístup vysvětluje, jak pracuji.`

**Text**
`Pokud vás zajímá, co se děje na první konzultaci, jak vzniká doporučení a jak probíhá další péče, podívejte se na můj způsob práce.`

**CTA**
`Jak pracuji` → `/pristup`

*Krátký přechod — nevytváří se tu další kompletní proces spolupráce ani
rozcestník služeb, ten patří na `/pristup` a `/sluzby`.*

#### 4. Finální CTA

**H2**
`Pojďme se podívat i na vaši situaci.`

**Text**
`Ať už řešíte hypotéku, současné smlouvy nebo další finanční rozhodnutí, na první konzultaci si ujasníme, co potřebujete a jaký postup dává smysl.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

*Nový formulář ani vizuální implementace se v tomto dokumentu nenavrhuje.*

### Google profil a aktuální hodnocení

Brand brief (`docs/brand-experience-brief.md` §7) eviduje jako ověřený
podklad: **42 osobních Google recenzí, průměrné hodnocení 5 z 5.** Tohle
je ale **historický podklad ke dni zápisu do briefu, ne automaticky
aktuální veřejný stav** — recenze a průměr se v čase mění. Před publikací
je potřeba ověřit aktuální počet, aktuální průměr a že jde skutečně o
**osobní profil Patrika Gajdadzise** — ne o součet/recenze celého Mint
reality & finance, ne Hypotéky Ostrava, ne jiného poradce.

**Odkaz na Google profil:** přímo na záložku Recenze v Google Mapách — `GOOGLE_REVIEWS_URL` v `src/data/entity.ts` (sjednoceno 24. 9. 2026; původní `share.google/WyM4NvhpF51J3DbCZ` vedl na obecnou stránku místa).
(dodaný uživatelem přímo pro tuto stránku, 9. 9. 2026) — použít přesně
tuhle URL, nevymýšlet ani neodhadovat jinou.

Dokud aktuální počet/průměr nejsou ověřené jako platící pro tenhle
konkrétní osobní profil, **nepoužívat je jako definitivní veřejný údaj**
mimo tiché pole se štítkem „k ověření zdroje" (viz níže) — nikde jinde na
stránce ani ve strukturovaných datech.

**Souhrnné hodnocení — k ověření zdroje:** tiché pole na `--bg` s
hodnotami z brand briefu (`42 recenzí · 5,0 · Google hodnocení`) a
vysvětlující větou, viditelně označené štítkem `k ověření zdroje`. Štítek
zůstává i v implementaci, dokud se čísla a profil neověří.

Google recenze se **netahají přes API** — žádný fetch, žádný klíč, žádná
knihovna. Data se doplňují ručně, až budou k dispozici.

### Případové studie — budoucí rezerva (`NEPUBLIKOVAT — ČEKÁ NA SKUTEČNÉ PŘÍPADY`)

**H2**
`Některé situace stojí za podrobnější vysvětlení.`

**Text**
`Recenze zachycuje zkušenost klienta. U vybraných případů chci postupně ukázat také výchozí situaci, postup a výsledek, aby bylo vidět, co se při řešení konkrétního problému skutečně dělo.`

Tahle sekce je zatím rezervou pro budoucí skutečné případové studie.
**V implementaci zatím nebude vůbec** — dokud nejsou schválené skutečné
případy, byla by to sekce s placeholdery navíc. Až budou případy k
dispozici, vloží se jako běžná kapitola s popiskem `Případy`, mezi
kapitoly Recenze a Přístup.

Nevymýšlet klientské příběhy, výchozí situace, výsledky, částky, citace
ani fotografie. U budoucích případových studií bude potřeba ověřit
podklady, souhlas klienta a vhodné odstranění osobních/citlivých údajů.

### Obchodní cíl

Primární: přivést vhodného návštěvníka k nezávazné konzultaci
prostřednictvím důvěry založené na skutečných zkušenostech.

Sekundární: umožnit ověření recenzí přímo u jejich původního zdroje.

### SEO

**SEO title**
`Recenze a zkušenosti klientů | Patrik Gajdadzis`

**Meta description**
`Přečtěte si skutečné Google recenze a zkušenosti mých klientů. Finanční poradenství, hypotéky a dlouhodobá péče v Ostravě i online.`
*(Upraveno 24. 9. 2026: první osoba podle briefu §6, zkráceno pod ~920 px, aby ho Google neořezal.)*

**Canonical**
`https://patrikgajdadzis.cz/recenze`

*Trailing slash: při budoucí implementaci respektovat skutečnou globální
konvenci webu — tady se zaznamenává jen návrh URL.*

### Search intent

Primární:

- Patrik Gajdadzis recenze
- Patrik Gajdadzis zkušenosti
- recenze finančního poradce Patrik Gajdadzis

Sekundární:

- finanční poradce Ostrava recenze
- recenze hypotečního poradce
- zkušenosti s finančním poradcem

Stránka má primárně podporovat brandovou důvěru a **nemá agresivně
soupeřit s homepage o hlavní intent „finanční poradce Ostrava"**. Search
intent je podklad pro obsahovou architekturu a SEO, ne pokyn ke keyword
stuffingu.

### FAQ

`FAQ není pro tuto stránku navrženo. Hlavním obsahem jsou skutečné
recenze; nevytvářet FAQ pouze kvůli SEO.`

### Interní odkazy

Plánované interní odkazy (zaznamenáno, **zatím neimplementováno** —
`/recenze` zatím neexistuje jako stránka v `src/pages/`, takže žádný z
odkazů zatím nesmí být implementovaný jako funkční):

- `/pristup`
- `/o-mne`
- `/sluzby`
- relevantní detailní služby (podle skutečného obsahu recenzí, až budou
  k dispozici — **nevytvářet umělé prolinkování všech služeb pod každou
  recenzí**)
- `/kontakt`

### Strukturovaná data / schema

Zapsáno jako plánovaný návrh (zatím neimplementováno):

- `WebPage`
- `BreadcrumbList`
- napojení na existující `Person` entitu Patrika Gajdadzise (žádná nová
  samostatná entita)

Breadcrumb: `Domů → Recenze`

**Nevytvářet automaticky `Review` ani `AggregateRating` schema.** Jejich
případné použití musí být samostatně posouzeno podle skutečného zdroje,
správné entity a aktuálních pravidel Googlu — u recenzí vlastní služby
nelze automaticky předpokládat nárok na hvězdičkové rich results.
Strukturovaná data negarantují zobrazení hvězdiček ve vyhledávání a
copy/dokumentace to nikde nesmí tvrdit.

### Poznámky pro Claude Design

- použít stejný schválený vizuální systém jako ostatní podstránky,
  nevytvářet nový designový jazyk,
- stránka má být jednodušší než detailní služby — hlavní prostor dostávají
  skutečné recenze,
- nepoužívat fiktivní recenze ani generované fotografie klientů,
- nepoužívat automatický karusel ani vodorovné posouvání recenzí,
- nepoužívat přehnané hvězdičkové dekorace ani generické marketingové
  karty,
- případové studie jsou zatím jen budoucí rezerva, ne veřejná sekce,
- zachovat současný Header/Footer a systém CTA,
- respektovat centered 1760px stage (`--stage-max`), background sekcí
  full-width, asymetrie uvnitř stage,
- běžný text na mobilu minimálně 16px,
- žádné viditelné pořadové číslování (viz CLAUDE.md, globální pravidlo),
- žádný podpůrný provozní text v hero.

### Standardní pole

| Pole | Hodnota |
|---|---|
| Úloha stránky | viz „Úloha stránky" výše |
| Cílový návštěvník | viz „Cílový návštěvník" výše |
| Search intent | viz „Search intent" výše |
| Obchodní cíl | viz „Obchodní cíl" výše |
| H1 | `Co říkají klienti o spolupráci se mnou.` (návrh) |
| Hero text | `Nejlepší obrázek o mé práci si uděláte od lidí, kteří se mnou už řešili své finance. Přečtěte si jejich zkušenosti a podívejte se, co pro ně bylo při spolupráci důležité.` (návrh) |
| Sekční struktura | čtyři sekce — viz „Sekční osnova — pracovní copy" výše (Hero, Skutečné recenze, Přechod na /pristup, Finální CTA) — záměrně kratší než detailní služby |
| Finální copy / pracovní copy | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — viz „Sekční osnova — pracovní copy" výše (sekce 1–4); recenze samotné `ČEKÁ NA OVĚŘENÁ DATA` (viz „Skutečné recenze" výše); případové studie `NEPUBLIKOVAT — ČEKÁ NA SKUTEČNÉ PŘÍPADY` (samostatná sekce výše) |
| Primární CTA | `Nezávazná konzultace` (finální CTA), `Zobrazit recenze` (hero) — návrh |
| Sekundární CTA | `+420 775 217 721` (návrh) |
| Interní odkazy | viz „Interní odkazy" výše (zaznamenáno, neimplementováno) |
| SEO title | `Recenze a zkušenosti klientů \| Patrik Gajdadzis` (návrh) |
| Meta description | `Přečtěte si skutečné Google recenze a zkušenosti mých klientů. Finanční poradenství, hypotéky a dlouhodobá péče v Ostravě i online.` (upraveno 24. 9. 2026: první osoba podle briefu §6, zkráceno pod ~920 px, aby ho Google neořezal) |
| FAQ | `FAQ není pro tuto stránku navrženo. Hlavním obsahem jsou skutečné recenze; nevytvářet FAQ pouze kvůli SEO.` |
| Strukturovaná data / schema | `WebPage`, `BreadcrumbList` — plánovaný návrh, zatím neimplementováno; **`Review`/`AggregateRating` výslovně NE** (viz „Strukturovaná data / schema" výše) |
| Poznámky pro Claude Design | viz „Poznámky pro Claude Design" výše |
| Stav schválení | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — obsahová strategie: návrh · sekční struktura: návrh · pracovní copy: návrh · SEO/search intent: návrh · schema plán: návrh · skutečné recenze: `ČEKÁ NA OVĚŘENÁ DATA` · aktuální počet/hodnocení: k ověření zdroje (profil dodaný, čísla historická z brand briefu) · případové studie: budoucí rezerva, nepublikovat · vizuální návrh a implementace: podle skutečného aktuálního stavu projektu |

---

## `/o-mne`

**Stav:** `[OBSAH BUDE DOPLNĚN]`

### Účel

- osobní značka,
- zkušenosti,
- profesní role,
- způsob přemýšlení o financích,
- odborná způsobilost,
- důvod, proč má návštěvník Patrikovi důvěřovat.

### Standardní pole

| Pole | Hodnota |
|---|---|
| Úloha stránky | viz „Účel" výše |
| Cílový návštěvník | `[BUDE DOPLNĚNO]` |
| Search intent | `[BUDE DOPLNĚNO]` |
| Obchodní cíl | `[BUDE DOPLNĚNO]` |
| H1 | `[BUDE DOPLNĚNO]` |
| Hero text | `[BUDE DOPLNĚNO]` |
| Sekční struktura | `[BUDE DOPLNĚNO]` |
| Finální copy | `[BUDE DOPLNĚNO]` |
| Primární CTA | `[BUDE DOPLNĚNO]` |
| Sekundární CTA | `[BUDE DOPLNĚNO]` |
| Interní odkazy | `[BUDE DOPLNĚNO]` |
| SEO title | `[BUDE DOPLNĚNO]` |
| Meta description | `[BUDE DOPLNĚNO]` |
| FAQ | `[BUDE DOPLNĚNO]` |
| Strukturovaná data / schema | `[BUDE DOPLNĚNO]` |
| Poznámky pro Claude Design | `[BUDE DOPLNĚNO]` |
| Stav schválení | `[OBSAH BUDE DOPLNĚN]` |

---

## `/clanky`

**Stav:** `NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ`

**Historie:** Kapitola dřív obsahovala jen základní účel (obsahový hub,
SEO a GEO, odborné články, interní prolinkování na služby, budování
odborné autority Patrika). Tento návrh (doplněn 9. 9. 2026) ho zachovává
a rozpracovává — **NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ**, ne finální
schválený text.

**Zjištěný skutečný stav projektu (ověřeno před psaním tohoto návrhu,
9. 9. 2026):**

- **Žádné články zatím neexistují.** V projektu není `src/content/`,
  žádný Astro content collection (`src/content.config.*`), žádný
  markdown soubor v `src/`, žádná stránka `/clanky` ani stránka detailu
  článku.
- **Taxonomie pěti témat už existuje a je schválená** — `docs/
  content-homepage.md` §10 „Odborný obsah" a živá implementace
  `src/components/ArticlesSection.astro` (homepage) používají shodně:
  `Hypotéky a bydlení`, `Finanční plánování`, `Investice`, `Pojištění`,
  `Penze`. Tenhle návrh ji **přebírá beze změny**, nevymýšlí novou —
  žádný rozdíl k nahlášení, zadání i realita se shodují.
- **Homepage už na `/clanky` odkazuje** (`ArticlesSection.astro`'s CTA
  „Všechny články" → `href="/clanky"`) a už má vlastní tři místa pro
  články — všechna tři aktuálně `title: null, excerpt: null, href: null`
  (placeholder, čeká na obsah). Datový tvar tam použitý (`Article`
  interface: `category`, `title`, `excerpt`, `href`, `lineWidths`) je
  nejbližší existující precedens pro budoucí obsahový model — je to ale
  zjednodušený tvar jen pro homepage výřez, ne plný model článku (viz
  „Datový model článku" níže, který ho vědomě rozšiřuje, nenahrazuje
  paralelním systémem).
- **Vztah k Hypotéce Ostravě je už na homepage vyřešený a implementovaný**
  — `ArticlesSection.astro` má samostatný, jasně označený externí odkaz
  („Hypoteční články také na Hypotéka Ostrava", `target="_blank"`,
  `rel="noopener noreferrer"`, ikona + `sr-only` „(externí web)"), žádné
  přebírání celých článků. `docs/content-homepage.md` §10 to výslovně
  potvrzuje jako pravidlo: „Osobní web nesmí kopírovat celé články
  z Hypotéky Ostravy."
- **Žádná SEO infrastruktura zatím neexistuje** — v projektu není
  `sitemap.xml`, `robots.txt` ani `public/` soubor mimo fonty
  (potvrzeno i v CLAUDE.md, „Chybí/TODO", už dřív zapsáno jako chybějící
  napříč celým webem, ne jen pro `/clanky`).

### Úloha stránky

`/clanky` má být přehledným vstupem do odborného obsahu Patrika
Gajdadzise.

Hlavní cíle:

- pomáhat návštěvníkům porozumět konkrétním finančním otázkám,
- přivádět relevantní organickou návštěvnost,
- budovat odbornou důvěryhodnost Patrika,
- propojovat související témata a služby,
- umožnit návštěvníkovi pokračovat od informace ke konkrétnímu řešení.

Nemá jít o obecný magazín finančních zpráv, o stránku plnou reklamních
textů ani o další katalog služeb.

Obsah má vycházet z reálných otázek, které klienti řeší při hypotékách,
finančním plánování, pojištění, investicích a přípravě na penzi.

Hlavní princip: `Odpověď na konkrétní otázku → pochopení souvislostí →
relevantní další krok.`

### Cílový návštěvník

Člověk, který:

- hledá odpověď na konkrétní finanční otázku,
- zajímá se o hypotéku nebo financování bydlení,
- chce zkontrolovat současné finanční nastavení,
- řeší ochranu příjmu, rodiny nebo majetku,
- zajímá se o investování a dlouhodobé vytváření majetku,
- připravuje se na penzi,
- chce si před konzultací ověřit Patrikovu odbornost.

### Obchodní cíl

Primární: přivádět relevantní návštěvníky k nezávazné konzultaci
prostřednictvím užitečného odborného obsahu.

Sekundární: podporovat tematickou autoritu, interní prolinkování a
brandové vyhledávání Patrika Gajdadzise.

### Sekční osnova — pracovní copy (NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ)

Doporučené pořadí: Hero → hlavní výpis článků → tematická navigace →
krátký přechod na služby → finální CTA. Záměrně krátký redakční hub, ne
další dlouhá landing page — hlavní prostor dostávají skutečné články, ne
opakované ujišťování, že Patrik rozumí financím.

#### 1. Hero

**H1**
`Finance srozumitelně. A v souvislostech.`

**Hero text**
`Píšu o hypotékách, finančním plánování, pojištění, investicích a penzi. Vysvětluji konkrétní otázky, které lidé řeší při důležitých finančních rozhodnutích.`

**Primární akce**
`Procházet články` — plynulý přesun na hlavní výpis článků na téže
stránce, ne odkaz jinam.

**Sekundární akce**
`+420 775 217 721`

*Hero na této stránce záměrně NEOBSAHUJE podpůrný řádek o délce
konzultace nebo lokalitě, ani eyebrow, ani SEO badge — stejná konvence
jako `/pristup` a `/recenze`.*

#### 2. Hlavní výpis článků

**H2**
`Články, které vám pomohou rozhodovat se s větším přehledem.`

**Text**
`Vyberte si téma, které právě řešíte. U jednotlivých článků najdete vysvětlení, důležité souvislosti a odkazy na další informace.`

**Hlavní obsah kapitoly:** skutečný výpis publikovaných článků.

**DŮLEŽITÉ — závazné pro copy i implementaci:**

- Nevymýšlet názvy, data, autory, fotografie, počty ani perexy
  existujících článků.
- Žádný článek zatím neexistuje (potvrzeno výše) — výpis se eviduje jako
  stav `ČEKÁ NA SKUTEČNÉ ČLÁNKY`.
- Žádný „featured"/zvýrazněný článek se nevybírá napevno vymyšlený —
  featured pozice smí ukazovat jen skutečně existující a publikovaný
  článek, dokud žádný není, featured pozice se nezobrazuje.
- Nevytvářet fiktivní obsah jen proto, aby návrh vypadal naplněně.

**Podoba výpisu (obsahové poznámky, technické řešení je samostatný
implementační úkol):**

- preferovaná metadata u položky: název článku, krátký popis (pokud
  skutečně existuje), tematická oblast, datum publikace, případně autor
  podle schváleného content modelu, jasný odkaz na článek — metadata se
  nepřidávají jen jako dekorace,
- při větším množství článků navrhnout vhodné stránkování nebo postupné
  načítání (technické řešení je samostatný úkol),
- zakázané: automatický karusel,
- vyhledávání a filtrování jsou volitelné podle skutečného počtu článků
  — nepřidávat složitou funkcionalitu bez potřeby.

#### 3. Tematická navigace

Jednoduchá obsahová taxonomie navazující na služby — **už existuje a je
schválená** (viz „Historie" výše), tenhle návrh ji jen přenáší z homepage
do vlastního huba:

- Hypotéky a bydlení
- Finanční plánování
- Pojištění
- Investice
- Penze

Tato témata jsou navigační kategorie, ne další prodejní sekce. Nevytváří
se desítky kategorií, prázdné veřejné kategorie ani duplicitní kategorie
typu „Finance"/„Finanční rady"/„Poradenství"/„Tipy" bez jasně odlišného
účelu.

Pokud je pro kategorii zatím málo článků, může fungovat jen jako filtr
uvnitř `/clanky`, ne nutně jako samostatná indexovatelná URL. Samostatné
kategoriové stránky se navrhují až podle skutečného obsahu a
vyhledávacího záměru, ne teď.

#### 4. Přechod na služby

**H2**
`Potřebujete vyřešit konkrétní situaci?`

**Text**
`Článek vám může pomoci zorientovat se. Pokud chcete propočítat vlastní možnosti, zkontrolovat současné nastavení nebo připravit další postup, můžeme se podívat přímo na vaši situaci.`

**CTA**
`Zobrazit služby` → `/sluzby`

*Krátká sekce — nevytváří se tu další kompletní rozcestník všech služeb,
ten patří na `/sluzby`.*

#### 5. Finální CTA

**H2**
`Pojďme se podívat na vaši konkrétní otázku.`

**Text**
`Ať už řešíte bydlení, současné smlouvy nebo další finanční rozhodnutí, na první konzultaci si ujasníme vaši situaci a další postup.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

*Nový redundantní formulář se v tomto dokumentu nenavrhuje.*

### Redakční strategie — interní, ne veřejná sekce stránky

Principy pro budoucí tvorbu článků (neveřejná strategická část, neurčeno
k zobrazení na `/clanky`):

- vycházet ze skutečných klientských otázek,
- pokrývat konkrétní rozhodovací situace s finančním dopadem,
- vysvětlovat souvislosti a praktické dopady, ne přepisovat obecné
  definice bez přidané hodnoty,
- upřednostňovat konkrétní témata před obecnými články typu „5 tipů, jak
  mít lepší finance", „Jak dosáhnout finanční svobody", „Nejlepší
  finanční produkty",
- každý článek má mít jasný primární vyhledávací záměr a konkrétní
  užitek pro čtenáře,
- nepoužívat univerzální sliby výnosů či „nejvýhodnějších" produktů,
- časově proměnlivé údaje ověřovat před publikací,
- pravidelně kontrolovat obsah, který může zastarat,
- propojovat články s relevantními službami a souvisejícími články.

Nyní se nevytvářejí desítky nových článků. Lze navrhnout samostatný
budoucí redakční plán (konkrétní seznam témat/titulků) jako oddělený
úkol — tenhle dokument ho nepovažuje za schválený a neimplementuje ho.

### Vztah k hypotekaostrava.cz

Patrik je odbornou tváří projektu Hypotéka Ostrava a publikuje tam obsah
zaměřený na financování bydlení. Osobní web musí mít vlastní obsahovou
identitu — **žádné automatické kopie článků** z hypotekaostrava.cz.

Pokud se stejné téma objeví na obou webech, musí mít jasně odlišný účel,
úhel pohledu nebo rozsah. Příklad (strategický, ne pokyn k okamžité
realizaci):

- **Hypotéka Ostrava:** konkrétní financování bydlení, lokální a
  hypoteční intent.
- **Osobní web:** širší finanční souvislosti, rozhodování klienta,
  návaznost hypotéky na rezervu, ochranu příjmu a další cíle.

Pokud by se později uvažovalo o převzetí konkrétního článku, musí se
samostatně posoudit jeho účel, původní URL, duplicita, canonical a
případný dopad na SEO. Nic se teď nekopíruje ani nepřesouvá — potvrzeno,
že aktuální implementace (`ArticlesSection.astro`) už tenhle vztah řeší
čistě přes externí odkaz, ne přes duplicitní obsah.

### Datový model článku (návrh, pro budoucí implementaci)

**Zkontrolováno:** žádný paralelní ani konkurenční content model
v projektu zatím neexistuje — jediný existující precedens je zjednodušený
`Article` interface v `ArticlesSection.astro` (`category`, `title`,
`excerpt`, `href`, `lineWidths`), postavený jen pro tři místa na
homepage. Model níže ho vědomě rozšiřuje o pole, která homepage výřez
nepotřebuje, ale detail článku a plný výpis na `/clanky` ano — až se bude
implementovat, `ArticlesSection.astro`'s zjednodušený tvar by měl čerpat
ze stejného zdroje dat, ne zůstat jako oddělený systém.

Požadovaná obsahová pole:

- název článku,
- slug / URL,
- perex,
- hlavní obsah,
- autor,
- datum publikace,
- datum poslední významné aktualizace (jen pokud je relevantní),
- hlavní téma/kategorie,
- SEO title,
- meta description,
- canonical,
- případný hlavní obrázek a jeho alt text,
- související články,
- relevantní interní odkazy,
- zdroje a datum ověření u časově proměnlivých informací,
- stav publikace.

Autor musí být skutečný — pokud článek nebyl napsán nebo odborně
zkontrolován Patrikem, nepřipisuje se mu automaticky autorství. Datum
aktualizace odpovídá skutečné významné změně obsahu, ne se nevytváří
uměle jen kvůli SEO.

### Šablona detailu článku (obsahové a SEO požadavky, neimplementovat nyní)

Detail článku má obsahovat:

- jednu H1,
- jasný úvod odpovídající na hlavní otázku,
- logickou strukturu H2/H3,
- konkrétní a srozumitelný obsah,
- autora a datum,
- zdroje tam, kde jsou potřebné,
- relevantní interní odkazy,
- případné související články,
- přiměřené CTA navazující na téma.

Nevytváří se univerzální povinná délka článku, povinné FAQ u každého
článku ani umělé závěry/výplňové odstavce jen kvůli SEO. Obsah má
odpovědět na otázku čtenáře co nejpříměji a potom vysvětlit důležité
souvislosti.

### SEO / GEO

**SEO title**
`Články o financích | Patrik Gajdadzis`

**Meta description**
`Praktické články o hypotékách, finančním plánování, pojištění, investicích a penzi. Píšu je srozumitelně, jako finanční poradce z Ostravy.`
*(Upraveno 24. 9. 2026: první osoba podle briefu §6, zkráceno pod ~920 px, aby ho Google neořezal.)*

**Canonical**
`https://patrikgajdadzis.cz/clanky`

*Trailing slash: při implementaci respektovat skutečnou globální
konvenci webu.*

`/clanky` je obsahový hub, ne primární stránka pro obecný komerční
intent `finanční poradce Ostrava` — ten zůstává na homepage. Service
pages zůstávají hlavními stránkami pro jednotlivé služby. Budoucí
detailní články mají cílit na konkrétní informační a rozhodovací
intenty, ne kanibalizovat homepage/service pages.

**SEO/GEO požadavky pro budoucí implementaci:** obsah dostupný v HTML,
správná hierarchie nadpisů, unikátní metadata, canonical, sitemap
(zatím v projektu neexistuje — viz „Historie" výše), interní
prolinkování, skutečný autor, skutečné datum publikace/aktualizace,
přesné a ověřitelné informace, konzistentní hlavní `Person` entita
Patrika Gajdadzise. GEO se neprezentuje jako záruka zobrazování v AI
odpovědích.

### FAQ

`FAQ není pro obsahový hub navrženo. Nevytvářet FAQ pouze kvůli SEO.`

### Strukturovaná data / schema

Pro `/clanky` (plánovaný návrh, zatím neimplementováno):

- `CollectionPage` nebo vhodný `WebPage` podle skutečné implementace,
- `BreadcrumbList`,
- `ItemList` **pouze pro skutečně publikované položky** — dokud žádný
  článek není publikovaný, `ItemList` se nevytváří prázdný ani s
  placeholdery,
- napojení na existující `Person`/`WebSite` entitu, žádná nová.

Pro detail článku (samostatně posoudit až při jeho tvorbě, ne teď):
`Article`/`BlogPosting` podle skutečného obsahu a autora, `author`,
`datePublished`, `dateModified` jen při skutečné aktualizaci, `image`
pokud existuje, `BreadcrumbList`.

Nevytváří se neexistující autoři, data, obrázky ani organizace.
Nevytváří se `FAQPage` pouze kvůli SEO. Strukturovaná data musí
odpovídat skutečně viditelnému obsahu.

Breadcrumb: `Domů → Články`

### Interní odkazy

Plánované vazby (zaznamenáno, **zatím neimplementováno** — `/clanky`
zatím neexistuje jako stránka v `src/pages/`):

- `/sluzby`
- `/sluzby/hypoteky`
- `/sluzby/financni-plan`
- `/sluzby/pojisteni`
- `/sluzby/investice`
- `/sluzby/penze`
- `/pristup`
- `/o-mne`
- `/recenze`
- `/kontakt`

Odkazy mají být kontextové a relevantní — nevkládat automaticky všechny
služby pod každý článek. Nevytvářet broken odkazy ani odkazy na
neexistující články nebo kategorie.

### Věcná a regulatorní opatrnost

U finančních článků je důležitá přesnost. Časově proměnlivé informace
musí být před publikací ověřené z odpovídajících zdrojů — zejména:
úrokové sazby, pravidla hypoték, daňové limity, státní příspěvky,
DPS/DIP, důchodová pravidla, pojistné podmínky, investiční náklady a
rizika, právní a regulatorní informace.

Nevymýšlet aktuální čísla ani právní pravidla. Nevytvářet garantované
výnosy, univerzální doporučení ani tvrzení o „nejlepším produktu".
Případné modelové výpočty musí mít jasné předpoklady a nesmí být
prezentované jako jistý budoucí výsledek.

Profesní postavení Patrika musí odpovídat aktuálním registracím a
schválenému regulatornímu textu (viz i `docs/brand-experience-brief.md`
§8, §24 v `CLAUDE.md`) — v tomto dokumentu se nevymýšlí žádné nové
profesní tituly ani redakční tým.

### Poznámky pro Claude Design

- použít stejný schválený vizuální systém webu, nevytvářet nový
  designový jazyk,
- hlavní prostor mají dostat skutečné články,
- nevytvářet další dlouhou service-style landing page,
- nepoužívat fiktivní články jako hotový veřejný obsah,
- případný featured article pouze ze skutečných dat,
- tematická navigace musí být jednoduchá,
- žádný automatický karusel,
- žádná generická mřížka velkého množství stejných karet,
- žádné stock fotografie finančních poradců nebo rodin,
- zachovat současný Header/Footer a systém CTA,
- respektovat centered 1760px stage (`--stage-max`), background sekcí
  full-width, asymetrie uvnitř stage,
- běžný text na mobilu minimálně 16px,
- žádné viditelné pořadové číslování (viz CLAUDE.md, globální pravidlo),
- žádný podpůrný provozní text v hero.

### Standardní pole

| Pole | Hodnota |
|---|---|
| Úloha stránky | viz „Úloha stránky" výše |
| Cílový návštěvník | viz „Cílový návštěvník" výše |
| Search intent | primární: `finance srozumitelně`, `[téma] vysvětlení`, `jak funguje [téma]` — konkrétní intenty patří na jednotlivé budoucí články, ne na hub; hub sám cílí na brandové vyhledávání a orientaci mezi tématy, ne agresivně na `finanční poradce Ostrava` (ten zůstává na homepage) |
| Obchodní cíl | viz „Obchodní cíl" výše |
| H1 | `Finance srozumitelně. A v souvislostech.` (návrh) |
| Hero text | `Píšu o hypotékách, finančním plánování, pojištění, investicích a penzi. Vysvětluji konkrétní otázky, které lidé řeší při důležitých finančních rozhodnutích.` (návrh) |
| Sekční struktura | pět sekcí — viz „Sekční osnova — pracovní copy" výše (Hero, Hlavní výpis článků, Tematická navigace, Přechod na služby, Finální CTA) |
| Finální / pracovní copy | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — viz „Sekční osnova — pracovní copy" výše (sekce 1–5); skutečné články `ČEKÁ NA SKUTEČNÉ ČLÁNKY` |
| Primární CTA | `Nezávazná konzultace` (finální CTA), `Procházet články` (hero), `Zobrazit služby` (přechod) — návrh |
| Sekundární CTA | `+420 775 217 721` (návrh) |
| Interní odkazy | viz „Interní odkazy" výše (zaznamenáno, neimplementováno) |
| SEO title | `Články o financích \| Patrik Gajdadzis` (návrh) |
| Meta description | `Praktické články o hypotékách, finančním plánování, pojištění, investicích a penzi. Píšu je srozumitelně, jako finanční poradce z Ostravy.` (upraveno 24. 9. 2026: první osoba podle briefu §6, zkráceno pod ~920 px, aby ho Google neořezal) |
| FAQ | `FAQ není pro obsahový hub navrženo. Nevytvářet FAQ pouze kvůli SEO.` |
| Strukturovaná data / schema | `CollectionPage`/`WebPage`, `BreadcrumbList`, `ItemList` (jen pro skutečně publikované položky) — plánovaný návrh, zatím neimplementováno; `Article`/`BlogPosting` řešit samostatně na detailu článku (viz výše) |
| Poznámky pro Claude Design | viz „Poznámky pro Claude Design" výše |
| Stav schválení | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — obsahová strategie: návrh · struktura hubu: návrh · pracovní copy: návrh · taxonomie: podle skutečného stavu projektu (už existuje a je schválená, viz „Historie") · redakční strategie: návrh · datový model: návrh, podle skutečného stavu projektu (rozšiřuje existující `ArticlesSection.astro` precedens) · SEO/schema: návrh · skutečné články: podle aktuálního projektu — žádné zatím neexistují · vizuální návrh: podle skutečného stavu — žádný pro `/clanky` zatím neexistuje · implementace: podle skutečného stavu — `/clanky` zatím neexistuje jako stránka v `src/pages/` |

---

## `/o-mne`

**Stav:** `NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ`

**Historie:** Route `/o-mne` je odkazovaná z `Header.astro`, `SiteFooter.astro`
a homepage `AboutSection.astro` (CTA „Více o mně"), ale jako stránka v
`src/pages/` **zatím neexistuje** — potvrzeno předspouštěcím auditem
(`docs/audits/prelaunch-audit.md`, P0-2). Tato kapitola zakládá její
kompletní obsahovou verzi poprvé, na základě skutečných osobních podkladů
dodaných přímo Patrikem (9.–10. 9. 2026). Neimplementuje stránku, nemění
odkazy na ni, nemění žádnou jinou stránku ani dokument.

### DŮLEŽITÉ NOVÉ GLOBÁLNÍ ROZHODNUTÍ — zákaz roku zahájení praxe (10. 9. 2026)

Patrik nechce na veřejném webu nikde komunikovat rok, kdy začal pracovat ve
finančním poradenství (`Od roku 2020`), ani délku praxe vyjádřenou počtem
let. Pro `/o-mne` proto **neplatí** dřívější „Doporučená prezentace" z
`docs/brand-experience-brief.md` §7 (`Od roku 2020`) ani odpovídající
hodnota v `docs/art-direction-financial-architecture.md` §7 (`Od roku 2020
ve financích`) — copy níže tento údaj nikde neobsahuje.

**Skutečný rok (3. 6. 2020, `docs/brand-experience-brief.md` §7: „v oboru
od 3. 6. 2020") zůstává pouze interním historickým faktem** — používá se
v tomto dokumentu jen jako orientační kontext při psaní příběhu (např.
„přibližně pět let" před tím), nikoli jako veřejně publikovaný údaj.

**Důležité — toto rozhodnutí je zatím NOVÉ a platí závazně pro `/o-mne`,
ale ještě NEBYLO promítnuto do zbytku projektu.** Konkrétní veřejné
místo, kde se stejný údaj aktuálně skutečně zobrazuje na již spuštěné
části webu, je zaznamenané a NEBYLO v rámci tohoto (čistě obsahového)
úkolu měněno — viz „Nalezené veřejné použití zakázaného údaje jinde v
projektu" níže. Odstranění je samostatný, cílený úkol.

**Nalezené veřejné použití zakázaného údaje jinde v projektu:**

- `src/components/StatsBand.astro:5` — `{ number: 'Od 2020', label: 'Ve
  financích', modifier: 'since' }` — aktivně se vykresluje na homepage
  (statistický pás pod hero sekcí).
- Zdrojová hodnota pro tenhle blok je `docs/content-homepage.md:69-70`
  (sekce „3. Důkazy důvěry": `Od roku 2020` / `ve financích`) —
  schválený obsahový podklad homepage, ze kterého `StatsBand.astro`
  vychází.
- `docs/brand-experience-brief.md:179` a
  `design-exploration/financial-architecture/approved-hero/hero-implementation-spec.md`
  (více míst, např. řádek 41/144/215/324) a
  `design-exploration/financial-architecture/approved-hero/claude-code-task.md:38,48`
  obsahují stejnou hodnotu jako součást už schválené a implementované
  hero/statistiky specifikace homepage.

Žádný z výše uvedených souborů nebyl v rámci tohoto úkolu měněn (úkol byl
striktně omezen na kapitolu `/o-mne`). Rozpor mezi novým rozhodnutím a
už spuštěným stavem homepage je nutné vyřešit samostatným, cíleným
úkolem — viz finální report.

### Regulatorní jazyk — připomenutí existujícího zákazu

`docs/brand-experience-brief.md` §6 už globálně zakazuje formulace
„nezávislé finanční poradenství" a „certifikovaný poradce u ČNB" — toto
NENÍ nové pravidlo, jen jeho explicitní připomenutí pro `/o-mne`, protože
osobní příběhová stránka svádí k neformálnímu shrnutí typu „nezávislý
poradce". Copy níže tuto ani žádnou příbuznou neověřenou formulaci
(„vlastní licence Mint" apod.) nepoužívá. Repo-wide kontrola (`grep
-i nezávisl` přes `src/`) potvrzuje, že se fráze „nezávislý finanční
poradce" ve zdrojovém kódu webu aktuálně nikde nevyskytuje.

### Úloha stránky

Nejosobnější stránka webu — ne další produktová stránka, ne CV, ne
LinkedIn profil.

Má návštěvníkovi ukázat:

- kdo Patrik je,
- jak se k financím dostal,
- proč se jim začal věnovat,
- jak vznikla jeho současná role v Mint,
- proč pořád osobně pracuje s klienty,
- jak nad klientskými financemi přemýšlí,
- co považuje za svou silnou stránku,
- proč vznikla Hypotéka Ostrava,
- jaký vztah chce mít se svými klienty.

Nemá opakovat obsah `/sluzby`, `/pristup` ani jednotlivých detailních
služeb — ty řeší ČEHO se týká spolupráce, `/o-mne` řeší KDO za ní stojí a
PROČ tuhle práci dělá. Stránka má působit osobně, lidsky, sebevědomě,
věcně — bez přehnaného sebechválení a bez korporátních frází.

### Cílový návštěvník

Člověk, který:

- už prošel `/sluzby`, `/pristup` nebo homepage a chce před konzultací
  vědět, s kým bude jednat,
- hledá si Patrika Gajdadzise jménem (brandové vyhledávání),
- porovnává finanční poradce a rozhoduje se podle osobní důvěryhodnosti,
  ne jen podle nabídky služeb,
- chce vědět, proč Patrik dělá tuhle práci a jak přemýšlí o penězích,
  ne jen co nabízí.

### Zdrojová fakta (interní, podklad pro copy níže)

Skutečný osobní podklad dodaný přímo Patrikem (9.–10. 9. 2026), plné znění
zachováno v historii úkolu. Shrnutí faktů, ze kterých copy níže vychází,
beze změny/domýšlení nad jejich rámec:

- Patrik přibližně pět let jezdil za prací do zahraničí, pak už nechtěl
  pokračovat stejným způsobem a začal se zajímat o finance nejdřív sám
  pro sebe.
- Známý (tehdy ředitel poradenské společnosti) mu umožnil chodit po práci
  večer na neformální učení; po cca dvou týdnech mu nabídl, ať se tím
  začne živit. Patrik souhlasil, začal podnikat ve finančním poradenství
  a dál se vzdělával.
- V předchozí společnosti přestal být dlouhodobě spokojený se způsobem
  fungování — **bez jmenování firmy, bez kritiky vedení, bez popisu
  interních konfliktů**. Dlouholetý kamarád (majitel Mint reality) mu
  nabídl vybudovat finanční část v rámci Mint. Část původního týmu s ním
  přešla. Tak vzniklo propojení Mint reality a finance — Patrik dnes vede
  finanční část a osobně dál pracuje s klienty.
- S klienty pracuje dál proto, že ho práce baví — možnost hledat řešení
  pro konkrétní situaci, ukazovat možnosti a jejich plusy/mínusy, nechat
  rozhodnutí na klientovi. Cíl: dlouhodobě správně nastavené finance,
  možnost se na něj obracet opakovaně (i s rodinou) — **bez slibu
  zhodnocení nebo garantovaného bohatnutí**.
- Zásadní je důvěra — vysvětlit důvod doporučení, ne jen prodat produkt a
  zmizet. Interní formulace „ne všichni jsou hovada v tomhle oboru" se
  **nepoužívá veřejně** — přeloženo do profesionálního sdělení o důvěře,
  vysvětlení a dlouhodobém vztahu, bez útoku na jiné poradce.
- Silná stránka: kombinovat finanční nástroje/rozhodnutí tak, aby
  fungovaly společně, ne izolovaně; někdy díky tomu najde řešení tam, kde
  klient už dřív neuspěl jinde — **bez absolutních tvrzení** („vyřeším
  všechno", „vždy najdu řešení", „lepší než banky").
- Hypotéka Ostrava vznikla jako vlastní projekt pro orientaci v hypotékách
  (články, kalkulačka, propojení s odborníky) — dlouhodobá aspirace
  vybudovat jeden z nejznámějších hypotečních portálů na Moravě je
  **aspirace, ne ověřený současný stav**, a pokud se objeví ve veřejném
  copy, musí mít podmiňovací/cílovou formulaci, ne tvrzení o současné
  velikosti.

### Sekční osnova — návrh copy (NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ)

#### 1. Hero

**H1**
`Jsem Patrik Gajdadzis. Finanční poradce z Ostravy.`

**Hero text**
`Vedu finanční část Mint reality & finance a zároveň dál osobně pracuji s klienty. Baví mě hledat řešení, která dávají smysl nejen sama o sobě, ale i ve spojení s ostatními financemi.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

Hero záměrně neobsahuje: rok začátku praxe, délku zkušeností, provozní
řádek, „30 minut", „Ostrava-Poruba nebo online", eyebrow, SEO badge.

#### 2. Jak jsem se k financím dostal

**H2**
`Nejdřív jsem chtěl pochopit vlastní peníze.`

**Copy**
`Pět let jsem jezdil za prací do zahraničí. Časem jsem ale věděl, že takhle nechci pokračovat celý život.`

`Začalo mi docházet, že většinu života strávíme prací a vyděláváním peněz, ale málokdo se skutečně naučí, jak s nimi správně nakládat. Přišlo mi nesmyslné věnovat tolik času práci a potom se pořád pohybovat ve stejném kole jen proto, že nevím, co s vydělanými penězi dělat dál.`

`Začal jsem se proto o finance zajímat nejdřív sám pro sebe.`

`Jeden můj známý tehdy pracoval jako ředitel v poradenské společnosti. Ozval jsem se mu a domluvili jsme se, že za ním budu po práci chodit a učit se, jak finance a finanční poradenství fungují v praxi.`

`Po pár týdnech se mě zeptal, jestli bych se tím nechtěl začít živit. Bavilo mě to, připadalo mi to zajímavé a dávalo mi smysl pomáhat lidem řešit podobné otázky, které jsem předtím začal řešit sám.`

`Rozhodl jsem se proto začít ve finančním poradenství podnikat a dál se v oboru vzdělávat.`

**Výrazný statement**
`Nejdřív jsem chtěl pochopit, co dělat s vlastními penězi. Nakonec se z toho stala moje práce.`

Bez roku zahájení praxe.

#### 3. Mint

**H2**
`Další krok byl postavit finanční část Mint reality & finance.`

**Copy**
`Po čase mi přestaly vyhovovat prostředí a způsob fungování společnosti, ve které jsem tehdy pracoval. Rozhodl jsem se proto pokračovat jinak.`

`Dlouholetý kamarád, který stojí za Mint reality, mi nabídl možnost vybudovat v rámci firmy finanční část. Když jsem svému tehdejšímu týmu oznámil, že odcházím, několik kluků se mě zeptalo, jestli mohou jít se mnou.`

`Tak vznikla finanční část Mint reality & finance, kterou dnes vedu. Vedle vedení poradců ale dál osobně pracuji se svými klienty.`

Bez jmenování/kritiky původní společnosti a bez interních konfliktů.

#### 4. Proč pořád pracuji s klienty

**H2**
`Vedení týmu mě od klientů neodvedlo.`

**Copy**
`S klienty pracuji dál jednoduše proto, že mě to baví a naplňuje.`

`Každý člověk má jinou situaci, jiné cíle a jiné možnosti. Právě hledání řešení pro konkrétního člověka je část práce, která mě baví nejvíc.`

`Nechci rozhodovat za klienta. Chci mu ukázat možnosti, vysvětlit jejich výhody i nevýhody a dát mu dostatek informací, aby věděl, do čeho jde a mohl se správně rozhodnout.`

`A nechci, aby spolupráce skončila jednou smlouvou. Mým cílem je, aby se na mě klient mohl obracet i při dalších finančních rozhodnutích a aby jednotlivé kroky dlouhodobě dávaly smysl jemu i jeho rodině.`

**Výrazný statement**
`Nechci za klienta rozhodovat. Chci, aby rozuměl tomu, pro co se rozhoduje.`

#### 5. Co považuji za svou silnou stránku

**H2**
`Největší smysl mi dává spojovat věci dohromady.`

**Copy**
`Hypotéka, rezerva, pojištění, investice nebo penze nejsou oddělené světy. Jedno rozhodnutí často ovlivní několik dalších.`

`Za svou silnou stránku považuji schopnost kombinovat jednotlivé nástroje a možnosti tak, aby společně dávaly smysl pro konkrétní situaci klienta.`

`Setkávám se i s lidmi, kteří už svůj problém zkoušeli řešit v bance, pojišťovně nebo s jiným poradcem, ale nenašli vhodný postup. Někdy stačí podívat se na situaci z jiné strany a propojit možnosti, které byly předtím řešené odděleně.`

`Právě v takových případech je podle mě nejvíc vidět rozdíl mezi prodejem jednoho produktu a skutečným finančním plánováním.`

**Výrazný statement**
`Produkt je nástroj. Důležité je, jak zapadne do celku.`

Bez absolutních tvrzení (vyřeším každý problém / vždy najdu řešení /
dokážu, co ostatní neumí).

#### 6. Důvěra a dlouhodobá spolupráce

**H2**
`Chci, abyste věděli, proč vám něco doporučuji.`

**Copy**
`Důvěra je pro mě při spolupráci zásadní. Když klientovi něco doporučuji, chci, aby věděl, proč to doporučuji, jaké má možnosti a jaké jsou jejich výhody i nevýhody.`

`Nejde mi o to, aby ode mě člověk odešel s další smlouvou. Důležité je, aby jednotlivá rozhodnutí dlouhodobě fungovala a aby se klient finančně posouval tam, kam chce.`

`Když se později něco změní, chci, aby věděl, že má člověka, kterému může zavolat a navázat na to, co jsme už společně řešili.`

`Stejně tak chci, aby se na mě mohl v případě potřeby obrátit někdo z jeho rodiny.`

**Výrazný statement**
`Dlouhodobá spolupráce pro mě znamená víc než další smlouva.`

Bez slibu, že klient díky spolupráci určitě zbohatne — význam je dlouhodobé
finanční posouvání, budování a ochrana majetku.

#### 7. Hypotéka Ostrava

**H2**
`Proto vznikla i Hypotéka Ostrava.`

**Copy**
`Chtěl jsem vytvořit místo, kde se lidé dokážou v hypotékách lépe zorientovat a dostanou se k lidem, kteří je řeší každý den.`

`Na portálu Hypotéka Ostrava proto vznikají články o financování bydlení, hypoteční kalkulačka a možnost řešit konkrétní financování s hypotečními specialisty.`

`Hypotéka totiž není jen úroková sazba. Důležité jsou podmínky jednotlivých bank, příjmy, vlastní prostředky, nemovitost i další okolnosti konkrétního případu.`

`Pro člověka, který hypotéku řeší jednou nebo několikrát za život, může být celý proces zbytečně složitý a stresující. Cílem projektu je pomoct mu zorientovat se a dostat se k člověku, který mu jednotlivé možnosti vysvětlí a pomůže financování dotáhnout.`

**CTA / textový odkaz**
`Hypotéka Ostrava`
Cíl: `https://www.hypotekaostrava.cz/` — reálný, funkční, už jinde na webu
používaný odkaz (ověřeno 24. 8. 2026, viz `src/components/ArticlesSection.astro:29,48`
a `src/components/SiteFooter.astro:69`), ne nový/vymyšlený.

**Interní poznámka (NEPOUŽÍVAT ve veřejném copy bez dalšího schválení)**
Patrikovým dlouhodobým cílem je z Hypotéka Ostrava budovat velmi známý a
silný hypoteční portál pro Moravu. Toto je aspirace, ne ověřený současný
stav. Pokud se v budoucnu rozhodne tuhle aspiraci na stránce přece jen
zmínit, musí mít tvar cíle/procesu, např. `Mým cílem je z projektu
postupně vybudovat jeden z nejznámějších hypotečních portálů na Moravě.`
— nikdy tvar současného stavu jako `Jsme největší hypoteční portál na
Moravě.` Copy v sekci 7 výše tuto aspiraci prozatím nepoužívá.

#### 8. Profesní role / faktický blok (návrh pro budoucí vizuální blok)

Krátký, faktický blok — ne kariérní timeline, ne CV karty. Návrh obsahu
(k dopracování s Claude Design):

- vede finanční část Mint reality & finance,
- osobně pracuje s klienty,
- stojí za projektem Hypotéka Ostrava,
- odborná způsobilost pro úvěry, pojištění a investice (ověřeno,
  `docs/brand-experience-brief.md` §7 — „odborné zkoušky pro úvěry,
  pojištění a investice").

Nepovinně, pokud bude vizuálně žádoucí (obě hodnoty jsou ověřené v
`docs/brand-experience-brief.md` §7 a už veřejně použité na homepage
přes `StatsBand.astro` — repríza tady by NEBYLA nový, nepotvrzený údaj):

- 150+ klientů,
- 42 recenzí s hodnocením 5★ / Google hodnocení.

**Nepoužívat v tomto bloku ani nikde jinde na `/o-mne`:** rok zahájení
praxe, `Od roku 2020`, počet let v oboru. Žádné nové statistiky nebyly
vymyšleny — blok pracuje jen s fakty už ověřenými v
`docs/brand-experience-brief.md` §7.

#### 9. Přechod na recenze

**H2**
`Zkušenosti klientů si můžete přečíst sami.`

**Text**
`Pokud vás zajímá, jak spolupráci hodnotí lidé, se kterými jsem už pracoval, podívejte se na jejich recenze.`

**CTA**
`Zobrazit recenze`
Cíl: `/recenze`

Bez dalšího výpisu recenzí na této stránce — ten má vlastní stránku.

#### 10. Finální CTA

**H2**
`Pokud vám můj přístup dává smysl, pojďme se poznat.`

**Text**
`Na první konzultaci si projdeme, co právě řešíte, a zjistíme, jestli a jak vám můžu pomoct.`

**Primární CTA**
`Nezávazná konzultace`

**Sekundární akce**
`+420 775 217 721`

Bez dalšího redundantního formuláře.

**Sekční pořadí** (obsahové, bez viditelného číslování — viz CLAUDE.md,
globální pravidlo proti viditelnému číslování): Hero → Jak jsem se dostal
k financím → Mint → Proč pořád pracuji s klienty → Silná stránka → Důvěra
a dlouhodobá spolupráce → Hypotéka Ostrava → Profesní/faktická část →
Přechod na recenze → Finální CTA.

### SEO

**SEO title**
`O mně | Patrik Gajdadzis`

**Meta description**
`Jsem finanční poradce z Ostravy. Vedu finanční část Mint reality & finance, stojím za projektem Hypotéka Ostrava a s klienty pracuji osobně.`
*(Upraveno 24. 9. 2026: první osoba podle briefu §6, zkráceno pod ~920 px, aby ho Google neořezal.)*

**Canonical**
`https://patrikgajdadzis.cz/o-mne`

Žádný rok zahájení praxe v title, meta description ani jinde ve veřejném
SEO copy.

### Search intent

Primární:

- Patrik Gajdadzis
- Patrik Gajdadzis finanční poradce
- Patrik Gajdadzis Ostrava
- Patrik Gajdadzis Mint
- Patrik Gajdadzis Hypotéka Ostrava
- finanční poradce Patrik Gajdadzis

Primární účel stránky: osobní entita Patrika, brandové vyhledávání, důvěra
před konzultací, podpora lokální entity Ostrava. Homepage zůstává hlavní
stránkou pro obecný intent `finanční poradce Ostrava` — `/o-mne` s ním
nemá agresivně kanibalizovat.

### Interní odkazy

Plánované interní odkazy (zaznamenáno, **zatím neimplementováno**):

- `/sluzby`
- `/pristup`
- `/recenze`
- `/sluzby/hypoteky`
- `/sluzby/financni-plan`
- `/kontakt`
- externě: `https://www.hypotekaostrava.cz/` (skutečný ověřený odkaz, viz
  sekce 7 výše)

Bez umělého prolinkování všech detailních služeb.

### FAQ

`FAQ není pro tuto stránku navrženo. Osobní stránka nemá být rozšiřována o FAQ pouze kvůli SEO.`

Otázky o průběhu spolupráce patří na `/pristup`.

### Strukturovaná data / schema

Zapsáno jako plánovaný návrh (zatím neimplementováno — repo-wide kontrola
potvrzuje, že žádné JSON-LD zatím na webu vůbec neexistuje, viz
`docs/audits/prelaunch-audit.md` P0-3):

- `AboutPage`
- `BreadcrumbList`
- napojení na existující hlavní `Person` entitu Patrika Gajdadzise (stejný
  precedens jako u `/sluzby/hypoteky`, `/pristup`, `/clanky` výše —
  **žádná nová paralelní `Person` entita**)

Breadcrumb: `Domů → O mně`

Použít stejné jméno, kontaktní údaje, schválenou fotografii, profesní
označení a vazby na služby jako v hlavním globálním entity modelu. Vazby
na Mint, BEplan a Hypotéka Ostrava musí být věcně přesné. Nevytvářet
neověřené regulatorní role.

### Poznámky pro Claude Design

- `/o-mne` má být nejosobnější stránkou webu, musí navazovat na schválený
  designový systém — nepřipravovat nový designový jazyk,
- silně pracovat se skutečnými fotografiemi Patrika — žádné stock
  fotografie, žádná AI podoba,
- žádná klasická CV timeline, žádné viditelné roky jako kariérní osa,
  žádné viditelné pořadové číslování, žádné karty typu „skill /
  experience / education", žádná korporátní team page,
- příběh má být vyprávěný přes typografii, fotografie a jednotlivé silné
  momenty,
- kontinuální linka může jemně propojit cestu: vlastní otázka → finance →
  Mint → klienti → vlastní projekty → dlouhodobá spolupráce — ale nesmí
  vzniknout technická timeline,
- centered 1760px stage (`--stage-max`, CLAUDE.md „Konvence: wide desktop
  a centrované designové plátno"), background sekcí full-width, asymetrie
  uvnitř stage,
- fotografie bez klasických boxů/rámů/stínů,
- běžný text na mobilu minimálně 16px,
- finální CTA navázat na současný systém.

### Stav schválení

`NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ`

- osobní příběh: návrh vytvořený ze skutečných podkladů Patrika (9.–10. 9. 2026)
- sekční struktura: návrh
- copy: návrh
- SEO/search intent: návrh
- schema plán: návrh
- profesní/regulatorní formulace: podle skutečně ověřeného stavu
  (`docs/brand-experience-brief.md` §7–§8), bez nových neověřených tvrzení
- fotografie: podle skutečně dostupných assetů — momentálně žádná reálná
  fotografie Patrika není v projektu k dispozici (`public/` obsahuje jen
  fonty, viz `docs/audits/prelaunch-audit.md` P1-7)
- vizuální návrh: podle skutečného stavu projektu — zatím neexistuje
- implementace: podle skutečného stavu projektu — `/o-mne` zatím
  neexistuje jako stránka v `src/pages/`

### Standardní pole

| Pole | Hodnota |
|---|---|
| Úloha stránky | viz „Úloha stránky" výše |
| Cílový návštěvník | viz „Cílový návštěvník" výše |
| Search intent | viz „Search intent" výše |
| Obchodní cíl | primární: nezávazná konzultace; sekundární: vybudovat osobní důvěru před konzultací a podpořit brandové/lokální vyhledávání entity Patrika Gajdadzise |
| H1 | `Jsem Patrik Gajdadzis. Finanční poradce z Ostravy.` (návrh) |
| Hero text | `Vedu finanční část Mint reality & finance a zároveň dál osobně pracuji s klienty. Baví mě hledat řešení, která dávají smysl nejen sama o sobě, ale i ve spojení s ostatními financemi.` (návrh) |
| Sekční struktura | deset sekcí — viz „Sekční osnova — návrh copy" výše (Hero, Jak jsem se k financím dostal, Mint, Proč pořád pracuji s klienty, Co považuji za svou silnou stránku, Důvěra a dlouhodobá spolupráce, Hypotéka Ostrava, Profesní role/faktický blok, Přechod na recenze, Finální CTA) |
| Finální / pracovní copy | NÁVRH K UŽIVATELSKÉMU SCHVÁLENÍ — kompletní první verze, viz „Sekční osnova — návrh copy" výše (sekce 1–10), založená výhradně na skutečných podkladech od Patrika (viz „Zdrojová fakta" výše) |
| Primární CTA | `Nezávazná konzultace` (návrh) |
| Sekundární CTA | `+420 775 217 721` (návrh) |
| Interní odkazy | viz „Interní odkazy" výše (zaznamenáno, neimplementováno) |
| SEO title | `O mně \| Patrik Gajdadzis` (změněno v předspouštěcím úkolu, v plánu sjednoceno 24. 9. 2026) |
| Meta description | `Jsem finanční poradce z Ostravy. Vedu finanční část Mint reality & finance, stojím za projektem Hypotéka Ostrava a s klienty pracuji osobně.` (upraveno 24. 9. 2026: první osoba podle briefu §6, zkráceno pod ~920 px, aby ho Google neořezal) |
| FAQ | `FAQ není pro tuto stránku navrženo. Osobní stránka nemá být rozšiřována o FAQ pouze kvůli SEO.` |
| Strukturovaná data / schema | `AboutPage`, `BreadcrumbList`, napojení na existující `Person` entitu (žádná nová) — plánovaný návrh, zatím neimplementováno (viz „Strukturovaná data / schema" výše) |
| Poznámky pro Claude Design | viz „Poznámky pro Claude Design" výše |
| Stav schválení | viz „Stav schválení" výše |
