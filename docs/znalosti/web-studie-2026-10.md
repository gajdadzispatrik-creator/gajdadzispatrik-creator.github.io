# Web patrikgajdadzis.cz — hloubková studie (říjen 2026)

Zadání: Patrik přes Asistenta, 13. 10. 2026 (pravidlo „Profesionální úroveň“
v `../../CLAUDE.md`). Chat Web. **Na webu se nic neměnilo** — jde o podklad
k rozhodnutí. Fakta mají u sebe zdroj a datum (13. 10. 2026); co nešlo
ověřit, je označené „neověřeno“. **Právní závěry jsou shrnutí předpisů, ne
právní rada — vždy „ověřit u kvalifikované osoby“.**

Postup: tři samostatné rešerše (konkurence, nástroje, pravidla), klíčová
zjištění jsem pak ověřil sám u zdroje:
- limit 50 e-mailů z PHP denně na tarifu LowCost (NoLimit 500) —
  [vedos.hosting/webhosting/srovnani](https://vedos.hosting/webhosting/srovnani/), 13. 10. 2026;
  `public/api/poptavka.php` posílá na jednu poptávku 3 e-maily (Patrik,
  záloha, potvrzení klientovi) — ověřeno v kódu;
- FAQ rich results Google nezobrazuje od 7. 5. 2026, `llms.txt` Google
  Search nepoužívá —
  [developers.google.com/search/updates](https://developers.google.com/search/updates), 13. 10. 2026;
- zásady zpracování (`src/data/legal/privacy.ts`) tvrdí, že formulář
  nesbírá výši příjmů ani stav úvěrů — formulář „Na kolik dosáhnete?“ je
  sbírá a nabízí volbu „Invalidní důchod“ — ověřeno v kódu.

**Pozor:** hypotekaostrava.cz není konkurence — je to Patrikův druhý web
(stejný telefon). Pro SEO i reklamy hlídat, aby si oba weby nekonkurovaly
(chat Reklama to řeší u Google Ads).

---

## Souhrn

**V čem jsme v Ostravě napřed:** žádný z 12 prověřených ostravských
konkurentů nemá online výběr termínu v kalendáři ani funkční finanční
check-up; máme rychlý web, strukturovaná data, měření s platným souhlasem
a cookie lištu podle pravidel ÚOOÚ/EDPB.

**Co dělá špička lépe než my:**
1. Počet recenzí a jejich zdroj přímo nahoře na webu (Houfek „Google 5,0 / 76“,
   Frank 4,9 / 122) — my „5,0“ bez počtu.
2. Kalkulačky s výsledkem hned (ZFP Brno 7 kalkulaček, L&C, Interhyp) — naše
   „Na kolik dosáhnete?“ je formulář s odpovědí do 1 pracovního dne.
3. Rychlá reakce na poptávku — data HBR: kontakt do hodiny ≈ 7× vyšší šance;
   my slibujeme „do 1 pracovního dne“.
4. Příběhy klientů jako samostatné stránky s číslem v nadpisu (Houfek 10 studií).
5. Hlídání konce fixace / posouzení nabídky banky (Interhyp, L&C).
6. Pravidelný obsah a městské stránky (4poradci, Rabiec, hyponamiru).
7. Vysvětlení „kdo mě platí“ na samostatné stránce (Rabiec, L&C).
8. Silná pozice v katalozích (Váš konzultant 216 hodnocení na firmy.cz) —
   oblast chatu Marketing.

**Co máme v nástrojích nevyužité:** import „poptávka → skutečný klient“ do
Google Ads, propojení GA4 se Search Console, nové přehledy Search Console
(dotazy na jméno, AI přehledy), Bing Webmaster + IndexNow + Seznam,
`lastmod` v sitemapě, hlídání dostupnosti webu (WEDOS OnLine, zdarma),
měření dokončené rezervace (dnes jen klik).

**Rizika podle pravidel (ověřit u kvalifikované osoby):** rozpor zásad
zpracování s formulářem „Na kolik dosáhnete?“ a možný údaj o zdraví
(„Invalidní důchod“); status vázaného zástupce není vidět při prvním
kontaktu (jen na stránce Regulatorní informace); na té stránce chybí IČO a
sídlo BEplanu, ČNB jako dohled, odkaz na finančního arbitra a ČOI a je tam
věta odkazující na neexistující registrační číslo; Google Ads ověření
finančních služeb platí i pro ČR (vymáhání podle Googlu od 15. 9. 2026 —
chat Reklama).

---

## 5 doporučení podle dopadu (pro Strategii — návrh do plánu zavádění)

1. **Srovnat web s pravidly (nejvyšší riziko, malá práce).** Opravit zásady
   zpracování podle skutečného formuláře „Na kolik dosáhnete?“, nahradit volbu
   „Invalidní důchod“ obecnější, přidat stálou větu „vázaný zástupce BEplan…“
   do patičky a potvrzovacího e-mailu, doplnit stránku Regulatorní informace
   (IČO a sídlo BEplanu, ČNB, arbitr/ČOI, opravit větu o registračním čísle,
   ověřit zápis pro penzijní spoření). *Proč:* chybné zásady a chybějící
   označení zástupce jsou nejsnáze prokazatelné nedostatky; texty před
   nasazením ověřit u compliance BEplanu. *Práce:* ~2–3 h + kontrola compliance.
2. **Žádná poptávka se nesmí ztratit a odpověď do hodiny.** Přejít na tarif
   NoLimit (500 e-mailů/den) nebo posílat zálohu jako skrytou kopii; potvrzení
   klientovi doplnit o odkaz na výběr termínu; vnitřní cíl reagovat do hodiny
   v pracovní době. *Proč:* při ~16 poptávkách denně (i se spamem) se dnes
   e-maily přestanou tiše odesílat; rychlost reakce je podle HBR nejsilnější
   páka na převod poptávky v klienta. *Práce:* ~1 h + rozhodnutí o tarifu.
3. **Hypoteční kalkulačka s výsledkem hned** („na kolik dosáhnu / splátka“),
   současný formulář jako druhý krok „pošlu přesný propočet od bank“.
   *Proč:* nikdo v Ostravě ji nemá funkční, špička ji staví jako hlavní vstup;
   zároveň odpadá odpověď „do 1 dne“. Výsledky musí respektovat pravidla pro
   reklamu na úvěr (§ 91 ZSÚ, RPSN) — ověřit u kvalifikované osoby. Měřit
   v GA4 (výpočet → poptávka), důkaz pro konverze je zatím slabý (neověřeno).
   *Práce:* 1–2 dny.
4. **Důkazy na webu: počet recenzí + příběhy klientů jako samostatné stránky.**
   „5,0 z N recenzí na Googlu“ s pravidelně aktualizovaným číslem (dřívější
   rozhodnutí „počet neuvádět“ by šlo vyřešit automatickou aktualizací —
   rozhodne Patrik) a 3–5 skutečných příběhů na vlastních stránkách s číslem
   v nadpisu. *Proč:* BrightLocal 2026 — 47 % lidí nevyužije firmu s méně než
   20 recenzemi; samostatné stránky navíc přinášejí hledání na konkrétní
   situace. Sběr recenzí řeší Marketing. *Práce:* ~1 den.
5. **Učit reklamy a SEO na skutečných klientech.** Import „poptávka →
   podepsaná smlouva“ do Google Ads (Data Manager / vylepšené konverze pro
   poptávky, se souhlasem a doplněním zásad), propojit GA4 se Search Console,
   klíčové události v GA4, Bing Webmaster + IndexNow + Seznam, `lastmod`
   v sitemapě, hlídání dostupnosti webu. *Proč:* dnes reklamy optimalizují na
   kliky a odeslané formuláře, ne na klienty; s malým objemem dat je každý
   kvalitní signál cenný. Právní základ pro nahrávání dat o smlouvách ověřit
   u kvalifikované osoby. *Práce:* 3–5 h, společně s chatem Reklama.

Další nápady (nižší dopad nebo potřebují rozhodnutí): stránka „Konec fixace /
posouzení nabídky banky“ s připomínkou, krátký dotazník před rezervací,
stránka „Kdo mě platí“, městské stránky jen s unikátním obsahem,
e-mailová návaznost na check-up (Marketing), video a podcast (nízká priorita).

---

# Přílohy — podrobné rešerše se zdroji

## Příloha A — Konkurence a co konvertuje



Datum zjištění všech údajů: **13. 10. 2026** (pokud není uvedeno jinak).
Metoda: WebSearch + WebFetch (stažení textu stránek). Google Mapy ani výsledky vyhledávání Google přímo otevřít nešly (přístup zamítnut), proto **počty Google recenzí konkurence ověřené přímo na Googlu nemám**. Kde je číslo uvedené, jde o (a) údaj z firmy.cz (Seznam), nebo (b) číslo, které firma sama ukazuje na svém webu (označeno „vlastní údaj webu“).
Marketingová tvrzení konkurence (počty klientů, úspory, „nejlepší sazby“) jsou uváděna jako jejich tvrzení, ne jako fakta.

> **Upozornění:** Mezi výsledky pro „hypotéka Ostrava“ se objevuje **hypotekaostrava.cz** – web uvádí jako ředitele Patrika Gajdadzise, stejný telefon +420 775 217 721 a články od Patrika Gajdadzise. Jde tedy o vlastní projekt, ne o konkurenci; ze srovnání je vyřazený (zmínka jen v sekci 5). Ověř, jestli je žádoucí, aby oba weby cílily na stejná klíčová slova (riziko vzájemné kanibalizace ve vyhledávání – neověřeno).

---

### 1. Ostrava – konkurence

Poznámka k vyhledávání: dotazy „finanční poradce Ostrava“, „hypoteční poradce Ostrava“, „hypotéka Ostrava“, „pojištění Ostrava poradce“ vracely hlavně katalogy (firmy.cz, ceskestavby.cz, ekatalog.cz), pracovní inzeráty (Partners, NN, Swiss Life Select) a národní hráče s městskou landing page (hyponamiru.cz). Velké sítě (Partners, Swiss Life Select/Fincentrum, OVB, Chytrý Honza) **samostatnou ostravskou stránku ve výsledcích neměly** – nalezeny jen jejich náborové inzeráty (neověřeno, zda ostravské stránky existují jinde na jejich webech). Broker Consulting je na firmy.cz jako „Broker Consulting – Broker Point“, Moravská Ostrava, bez hodnocení.

#### 1a. Přehled webů

| # | Web | Kdo / pod kým | Kalkulačka | Online rezervace | Recenze na webu | Články / video | Lokální stránky | Kontakty | Důvěra |
|---|---|---|---|---|---|---|---|---|---|
| 1 | [hyponamiru.cz/hypoteky/hypoteky-ostrava](https://www.hyponamiru.cz/?p=14111) | národní online broker (Hypo na míru s.r.o.) | příkladová karta splátky, tlačítko vede na „#“ – okamžitý výpočet neověřen | ne (vše „online“, formulář) | **4,9/5 z 591** s odkazem na Google Maps (vlastní údaj webu); ~16 citací vč. 3★ a 4★ | ano, blog; video ne | **ano** – Ostrava, Praha, Zlín, Hradec Králové, kraje + „kalkulačka podle lokality“ | zelená linka 800 688 388, e-mail, pobočky | ČNB, licence, APEK, „77 000+ klientů“, vysvětlení odměny od banky |
| 2 | [pavelzym.cz](https://pavelzym.cz/) | Pavel Zym, Broker Consulting a.s. | ne | ne (formulář) | 6 textových referencí, bez hvězd a zdroje | 3 články + blog; video ne | ne (Ostrava v title) | tel., formulář, FB, LinkedIn | „25+ let praxe“, odkaz na registr ČNB; cílovka manažeři/IT/podnikatelé/sportovci |
| 3 | [tomas-kopecky.cz](https://tomas-kopecky.cz/) | Ing. Tomáš Kopecký, PFP; vázaný zástupce Broker Trust (4fin/snadne-finance) | ne | ne (formulář s CAPTCHA) | 15 textových referencí, bez hvězd | 8 novinek převzatých od snadne-finance (9/2024–5/2025), infografiky; video ne | ne (kancelář Poruba, galerie kanceláře) | tel. 2×, „Zavolejte mi“, e-mail, mapa, FB/IG/LI | titul PFP (EFPA), kariérní osa od 2013 |
| 4 | [rostarabiec.cz](https://www.rostarabiec.cz/) | Rostislav Rabiec; vázaný zástupce Prosperity Financial Services | ne | tlačítko „Rezervovat schůzku“ → kontaktní stránka (bez kalendáře) | 3 citace + stránka /reference, bez hvězd/zdroje | blog; video ne | **ano – /financni-poradce-ostrava**, kanceláře Ostrava + Karviná | tel., e-mail, **WhatsApp** | odkaz na registr ČNB, **stránka „Jak funguje moje odměna“** (provizní model) |
| 5 | [nelakleckova.cz](https://nelakleckova.cz/) | Nela Vlčková Klečková (firma neuvedena) | ne | ne (formulář s volbou osobně/online) | 5× 5★ + „Zobrazit všechny recenze“ na Google; „200+ klientů“ | blog (na HP nic); video ne | ne | tel., e-mail, IG | sekce „Zkoušky ČNB“ obsahuje zástupný text „bude doplněna“ (slabina) |
| 6 | [jansamarek.cz](https://jansamarek.cz/) | Jan Šamárek (pod Broker Consulting) | ne | ne | 4 reference + odkaz na Google recenze; „20+ doporučení“ | **30+ článků** (9 náhledů na HP); video ne | ne (Ostrava + Opava v title) | stránka Kontakt, FB/IG/LI | „600+ klientů, 8+ let praxe“ (vlastní údaj) |
| 7 | [4poradci.cz](https://4poradci.cz/) | 4poradci s.r.o., Ostrava; vázaný zástupce OK KLIENT | ne | ne | žádné | **týdenní blog „Přečetli jsme za vás“ + podcast „Příliš (ne)bezpečné finance“ (Spotify)** | ne | tel., e-mail, adresa, sítě | „Bez tlaku na prodej / Transparentní přístup“, loga 10 partnerů |
| 8 | [janchlebek.cz](https://www.janchlebek.cz/) | Jan Chlebek („nezávislý“, IČO ani vázané zastoupení neuvedeno) | ne | ne | 3× 5★ bez zdroje | ne | ne | tel., e-mail, adresa, formulář | loga institucí, „5+ let praxe“ |
| 9 | [vaskonzultant.cz](https://www.vaskonzultant.cz/) | Váš konzultant s.r.o.; vázaný zástupce Broker Trust | ne | ne | 5 referencí na webu; **firmy.cz: 5,0 z 216 (Mor. Ostrava) + 5,0 z 15 (Zábřeh), štítek TOP firma 2025** | blog, YouTube v patičce | ne (pobočky jen na firmy.cz) | tel., e-mail, formulář, FB/LI/IG/YT | etický kodex (PDF), regulatorní údaje, sekce Kariéra |
| 10 | [chcipojistitmajetek.cz/akce-hypoteky](https://www.chcipojistitmajetek.cz/akce-hypoteky/) | Bc. Petra Rolová; VZ IBS-GROUP a OK KLIENT | ne | **formulář „Rezervovat“ informativní schůzku** (online/tel./osobně) s e-mailovým potvrzením | žádné | – | Ostrava (Stará Bělá) + celá ČR | tel. 8–18 h, 3 e-maily | konkrétní akce „KATASTR ZDARMA“, sazba „od 4,89 %“ |
| 11 | [filipklumpar.cz](https://www.filipklumpar.cz/) | Filip Klumpar (firma neuvedena) | ne | ne | 6 referencí | ne | ne | jen formulář (bez telefonu na HP) | **lead magnet: e-book zdarma** |
| 12 | [financni-poradce-ostrava.cz](https://www.financni-poradce-ostrava.cz/) | Mgr. Josef Lindovský | ne | ne | žádné | 2 články z 3/2022 (zastaralé) | ne (doména EMD „financni-poradce-ostrava“) | tel., e-mail, adresa | žádné konkrétní (ČNB, praxe neuvedeny) |

Daniel Kaloč (kalocdaniel.cz) – web je JS aplikace, text se nepodařilo načíst (neověřeno). Z úryvku ve vyhledávání: „prvních 30–45 minut zdarma“, schůzka osobně i videohovorem.

#### 1b. Jak se prezentují v Google
Výsledky Google (popisky ve SERP) přímo vidět nebyly. K dispozici jsou jen titulky stránek (title), které Google typicky přebírá:
- „Hypoteční poradce Ostrava – hypotéky a refinancování | Pavel Zym“
- „Ing. Tomáš Kopecký | 4fin a.s. - finanční poradce Ostrava“
- „Finanční poradce Ostrava a Karviná – Rostislav Rabiec“
- „Finanční poradce pro Moravskoslezský kraj | Nela Vlčková Klečková“
- „Finanční poradenství Ostrava a Opava | Jan Šamárek“
- „Jan Chlebek | Nezávislý finanční poradce Ostrava“
- „Srovnání hypoték Ostrava [kalkulačka 2025] - hyponamiru.cz“ (zastaralý rok v title)
- náš: „Finanční poradce Ostrava | Patrik Gajdadzis“

Většina konkurence (stejně jako my) cílí title na „finanční poradce Ostrava“; na „hypoteční poradce Ostrava“ cílí výslovně jen Pavel Zym a hyponamiru.

#### 1c. Čím je konkurence lepší / horší než patrikgajdadzis.cz

**Kde je někdo z Ostravy lepší:**
- **Počet veřejných recenzí:** Váš konzultant má na firmy.cz 216 hodnocení (5,0) a TOP firma 2025; hyponamiru ukazuje 591 Google recenzí. Náš web ukazuje „5,0“ bez počtu (záměrné rozhodnutí, viz CLAUDE.md) – počet je ale přesně to, co podle BrightLocal 47 % lidí kontroluje (sekce 4).
- **Lokální/městské stránky:** Rabiec (/financni-poradce-ostrava + Karviná), hyponamiru (Ostrava, další města, kraje). My nemáme.
- **Transparentnost odměny jako samostatná stránka:** Rabiec („Jak funguje moje odměna“), hyponamiru (broker placen bankou). My komunikujeme „bez poplatků“, ale samostatné vysvětlení „kdo mě platí“ – ověř, zda je na /pristup dost explicitní.
- **Obsahová frekvence:** 4poradci (týdenní blog + podcast), Šamárek (30+ článků). My 3 články.
- **Lead magnet:** Klumpar (e-book). My máme check-up (silnější – výsledek hned), ale bez e-mailové návaznosti/newsletteru.

**Kde jsme lepší než všichni zkontrolovaní ostravští konkurenti:**
- **Skutečná online rezervace do kalendáře** (Google Kalendář) – nikdo z 12 zkontrolovaných ostravských webů nemá kalendář s výběrem termínu; všichni mají jen formulář „domluvit schůzku“.
- **Interaktivní nástroj s okamžitým výsledkem** (Finanční check-up) – žádný ostravský konkurent nemá funkční kalkulačku ani test s výsledkem hned.
- Skutečné příběhy klientů, strukturovaná data (JSON-LD), FAQ, proces spolupráce, regulatorní informace, rychlý statický web – u konkurence často chybí (např. Lindovský, Chlebek bez IČO/vázaného zastoupení; Klečková má nevyplněné „Zkoušky ČNB“).

---

### 2. ČR – špička (nezávislí poradci / hypoteční specialisté)

| Web | Kdo | Co dělá výjimečně | Co chybí |
|---|---|---|---|
| [zfpbrno.cz](https://www.zfpbrno.cz/) | ZFP Brno (Miholová, Regueyra EFA) | **Online rezervace přes SimplyBook** (zfpbrno.simplybook.it); **7 kalkulaček** (splátka, dosažitelná hypotéka, refinancování, koupě vs. nájem, spoření pro děti, test finančního zdraví, analýza výdajů); hypoteční kvíz; stránka „Když hypotéka spěchá“; **placená konzultace s cenou 2 500 Kč/h** (vedle bezplatné); 3krokový proces; TOP firma 2025 (firmy.cz); čísla „9 150+ klientů, 1,1 mld. Kč hypoték“ (vlastní údaj) | počet Google recenzí neuveden; v době stažení chybové hlášení formuláře |
| [jirihoufek.cz](https://jirihoufek.cz/) | Jiří Houfek, EFA, Praha | **Rezervace v kalendáři s automatickým odkazem na Google Meet**; **Google odznak 5,0 / 76 hodnocení v hlavičce i hero**; **10 číselných případových studií, každá na vlastní stránce** („+1,5 mil. Kč na hypotéce a sazba o 0,3 % nižší“); slib rychlosti (hypotéka průměrně 3 týdny, při spěchu do 14 dnů) | statistiky zobrazené jako „0“, loga „logoipsum“ (nedodělky) |
| [lukasfrank.cz](https://www.lukasfrank.cz/) | Lukáš Frank, VZ eDO finance, Praha/Tábor | **Podcast od 2020, 170+ dílů, epizody se automaticky načítají z YouTube na web**; **Google 4,9 z 122** s odkazem; 25 referencí; **vstupní dotazník před schůzkou**; měsíční newsletter „Novinky od Lukáše“; tým se jmény; otevřené vysvětlení provizí | online rezervace, blog, případové studie |
| [tomasrusnak.cz](https://tomasrusnak.cz/) | Tomáš Rusňák, EFA | **Úzká nika** (IT, OSVČ, majitelé firem); podcast Hypotécast (Spotify, YouTube); **mediální loga s odkazy** (ČT, zpravodajství, rozhovor ČNB); měsíční newsletter; „850+ hypoték“ (vlastní údaj) | kalkulačky, rezervace, Google recenze |
| [michaldoubek.cz](https://navolnenoze.cz/prezentace/michal-doubek/) | Michal Doubek, Brno | **Honorované poradenství bez provizí**; vzdělávací platforma Finance prakticky (podcast), **videokurzy** (Naučmese), YouTube, newsletter | rezervace (jen e-mail), ceník na profilu neuveden |
| [jansusanka.cz](https://www.jansusanka.cz/) | Sušánka & partneři (privátní, kapitál 100 mil.+) | **Týdenní analytický newsletter (1 000+ odběratelů, vlastní údaj)**, e-booky, kniha, podcast „Mysl investora“, měsíční YouTube; **6 příběhů klientů + nabídka kontaktu na referenční klienty**; CTA „úvodní strategický hovor“ | jiná cílovka (HNWI) – inspirace jen pro obsah |
| [snadne-finance.cz](https://snadne-finance.cz/) | Snadné finance (síť, Broker Trust) | newsletter „Chci finanční tipy e-mailem“, srovnávač pojištění, CTA „Chci 30min setkání“, Google 4,9 | pobočky jen jako kotvy (#ostrava), nekonzistentní čísla (17 vs. 32 center) |

Společné rysy české špičky: (1) **sociální důkaz s číslem a zdrojem** (Google X,X z N) hned v hero; (2) **konkrétní případové studie s čísly**; (3) **pravidelný obsah s distribucí** (podcast/newsletter), který web napojuje; (4) u nejlepších konverzních webů **kalendářová rezervace** a **kalkulačky**.

---

### 3. Zahraničí – špička

| Web | Typ | Co mají | Co u nás chybí |
|---|---|---|---|
| [interhyp.de](https://www.interhyp.de/) | DE, největší hypoteční zprostředkovatel | **Dvě cesty: průvodce sazbou („Jetzt Zinsangebot erhalten“) jako hlavní CTA + „Termin vereinbaren“**; ~12 kalkulaček (sazba, rozpočet); „Baufi-Check“ – nahrání cizí nabídky k posouzení zdarma; **„Persönliches Zins-Update“** (registrace k hlídání sazeb); graf vývoje sazeb + výhled expertů; Trustpilot, pečeť Finanztip; 140+ poboček se stránkou /standorte | hlídání sazeb, posouzení cizí nabídky, graf sazeb |
| [landc.co.uk](https://www.landc.co.uk/) | UK, fee-free mortgage broker | 4 kalkulačky s panelem „Your results“ (kolik si půjčíte, splátka, **„cost of doing nothing“** = kolik stojí nic nedělat při konci fixace, odhad ceny nemovitosti); **srovnání s konkurencí, která si účtuje £250–2 377** (vysvětlení hodnoty „zdarma“); Trustpilot, FCA číslo, B Corp | kalkulačka „kolik stojí nic nedělat“ (refixace), explicitní srovnání „zdarma vs. poplatek“ |
| [facet.com](https://facet.com/) | USA, flat-fee plánování (fiduciary, CFP) | **4minutový kvalifikační dotazník před rozhovorem** („Is Facet right for me?“); **klientská aplikace** (roadmapa, zprávy s týmem 24/7, připomínky); recenze Trustpilot 1 300+ / 4,8 a Google 1 000+ / 4,8; homepage postavená na **otázkách klienta** („Can I afford a new house?“, „When can I actually retire?“). Pozn.: fotky u referencí jsou AI (uvedeno drobně) – negativní příklad | kvalifikace před schůzkou, klientská zóna, otázkami vedená navigace |
| XY Planning Network (USA) – [model](https://wealthtender.com/financial-advisors/kevin-burkle-cfp-cslp/) | síť fee-only plánovačů | **„Book Intro Call“** jako standard, povinná možnost **měsíčního předplatného** (původně ~100–150 USD/měs.), zveřejněný typ odměny | (služba je u nás zdarma – relevantní je jen standard „intro call“ s kalendářem) |
| [meaningfulmoney.tv](https://meaningfulmoney.tv/) | UK, Pete Matthew, Chartered Financial Planner | **Obsahový ekosystém**: 410 dílů podcastu, 450 videí, kniha, akademie; **rámec Budget–Protect–Invest + životní fáze** (začínám / buduji majetek / užívám si); VIP e-mail list. Konverze na poradenství je slabá (bez rezervace) a web má bezpečnostní nedostatky (vložený spamový odkaz) – negativní příklad | obsah členěný podle životní situace, e-mail list |

Co v zahraničí funguje a u nás chybí: **kvalifikace/dotazník napojený na rezervaci**, **hlídání sazby / připomínka konce fixace** (Interhyp, L&C), **posouzení cizí nabídky** jako lead magnet, **klientský portál** (Facet), **externí recenzní platforma s viditelným počtem** (Trustpilot/Google).

---

### 4. Co prokazatelně konvertuje (zdroje)

| Tvrzení | Data | Zdroj | Síla důkazu |
|---|---|---|---|
| Recenze a jejich počet rozhodují | 97 % spotřebitelů čte recenze firem; 41 % je čte pokaždé (2025: 29 %); 68 % použije jen firmu se 4+★, 31 % jen 4,5+★; **47 % nepoužije firmu s méně než 20 recenzemi**; 74 % hledá recenze z posledních 3 měsíců; 80 % spíš zvolí firmu, která odpovídá na všechny recenze, 50 % odradí šablonovité odpovědi; po pozitivních recenzích **54 % jde na web firmy**, 20 % kontaktuje, 20 % si objedná schůzku; AI nástroje jako zdroj doporučení 6 % → 45 % | [BrightLocal Local Consumer Review Survey 2026](https://www.brightlocal.com/learn/local-consumer-review-survey/) (11. 2. 2026, n = 1 002, USA) | silná (velký průzkum), ale USA; pro ČR neověřeno |
| Recenze na webu poradce = levnější klient | Firmy zobrazující recenze na webu: náklady na získání tržeb (RAC) **0,13 USD** vs. 0,86 USD u minima; 29 % firem sbírajících Google recenze roste rychleji vs. ~25 % ostatních | [Kitces Report 2026 via Financial Planning](https://www.financial-planning.com/news/kitces-research-pegs-the-winners-and-losers-in-marketing-roi) (15. 9. 2026, n = 506 poradců USA) | střední (korelace, sebehodnocení) – ale přímo z oboru |
| Nejefektivnější kanály poradců | RAC na 1 USD nové tržby: online katalogy poradců 0,28; **doporučení klientů 0,34**; **SEO 0,45**; COI doporučení 0,72; blog 1,64; semináře 1,76; newsletter 4,14; **sociální sítě 4,88**; typické CAC 2 551 USD | tamtéž | střední; USA |
| Úplný Google profil | Zákazníci jsou o **70 % pravděpodobněji navštíví** a o **50 % pravděpodobněji zváží nákup** u firmy s úplným profilem; 2,7× spíš ji považují za důvěryhodnou | [Google Business Profile Help](https://support.google.com/business/answer/10515606?hl=en) | vlastní data Google (korelace) |
| Lokální ranking | Mapový balíček: #1 primární kategorie GBP, #2 vzdálenost, #3 klíčová slova v názvu GBP, #9 počet Google recenzí s textem, #11 čerstvost recenzí. Lokální organika: **#1 samostatná stránka pro každou službu**, #2 geografická relevance obsahu, #4 klíčová slova v title vstupní stránky GBP | [Whitespark Local Search Ranking Factors 2026](https://whitespark.ca/local-search-ranking-factors/) (6. 11. 2025, expertní průzkum 47 odborníků) | střední (názor expertů, ne měření) |
| Rychlost reakce na poptávku | Kontakt do 1 hodiny = **~7× vyšší šance lead kvalifikovat** než o hodinu později; >60× oproti 24 h a více | [HBR – The Short Life of Online Sales Leads (2011)](https://scholarsarchive.byu.edu/facpub/9711) (1,25 mil. leadů) | silná, ale starší a z prodeje obecně. **Náš slib „odpověď do 1 prac. dne“ u kalkulačky je podle toho pomalý.** |
| Rychlost webu | Zrychlení mobilního webu o 0,1 s: lead-gen weby +21,6 % uživatelů postupujících na stránku s formulářem | [Deloitte/Google – Milliseconds Make Millions](https://web.dev/case-studies/milliseconds-make-millions) (2020, 37 značek) | silná, ale 2020; finanční služby nezahrnuty |
| Interaktivní obsah (kalkulačky, kvízy) | 70 % marketérů s interaktivním obsahem hodnotí konverze jako dobré, vs. 36 % u pasivního | [Demand Metric via MarTech](https://martech.org/interactive-content-successor-landing-page/) (n = 185, sponzorováno dodavatelem) | **slabá** – vnímání, ne měřená konverze |
| Online rezervace | 67 % preferuje online rezervaci (GetApp 2024); 82 % preferuje web/aplikaci (Accenture 2023) | jen sekundárně přes [SimplyBook.me](https://simplybook.me/en/blog/online-booking-statistics) (prodejce rezervačního SW) | **neověřeno** (primární zdroje nenalezeny); pro poradenství žádná data |
| Kratší formulář | HubSpot: kratší formulář pro mobil → 5× víc mobilních leadů za 2 týdny; víc rozbalovacích polí koreluje s nižší konverzí | [HubSpot blog](https://blog.hubspot.com/marketing/optimize-forms-conversion) | slabá–střední (case study jedné firmy) |
| Důvěryhodnost webu | 4 faktory: kvalita designu, **otevřené uvedení nákladů/poplatků a kontaktů**, úplný a aktuální obsah, **propojení se zbytkem webu (recenze třetích stran, média)** | [Nielsen Norman Group – Trustworthiness in Web Design](https://www.nngroup.com/articles/trustworthy-design/) (2016) | silná (UX výzkum), starší |
| Fotky skutečných lidí | Fotka zaměstnance na bankovním webu zvýšila vnímanou důvěryhodnost, ale reakce se liší; fotobanka působí hůř | [Riegelsberger & Sasse, UCL](https://discovery-pp.ucl.ac.uk/id/eprint/20286/1/Sasse_Riegelsberger%20et%20al%202004_redacted.pdf) | střední, starší |
| Recenze → nákup (Spiegel 270 %) | Produkty s 5 recenzemi mají o 270 % vyšší pravděpodobnost nákupu než bez recenzí | Spiegel Research Center (2015, data PowerReviews) – [shrnutí](https://lipscore.com/blog/product-reviews-increase-your-online-sales-by-270/) | **slabá pro náš případ** – e-commerce, korelace, metodika nepublikovaná |
| Video | „85 % lidí přesvědčilo video ke koupi“, „96 % vidělo explainer“ | Wyzowl 2026 jen přes [sekundární souhrny](https://www.teleprompter.com/blog/video-marketing-statistics) (čísla si odporují) | **neověřeno** |
| Podíl hypoték přes zprostředkovatele v ČR | – | nenalezeno | **neověřeno** |
| Jak Češi vybírají poradce | 34 % vnímá poradce jako cestu k výhodnějším podmínkám; 27 % hledá info na webech institucí (průzkum Swiss Life Select, bez data a metodiky) | sekundárně ve vyhledávání | **neověřeno** |

---

### 5. Lokální SEO u poradců v Ostravě

| Subjekt | Co je vidět | Zdroj, datum |
|---|---|---|
| Váš konzultant s.r.o. (Janáčkova, Mor. Ostrava) | firmy.cz **5,0 / 216–217 hodnocení**, štítek TOP FIRMA 2025, nabídka (DIP); druhá provozovna Zábřeh 5,0 / 15; **první místo** v kategoriích Finanční poradenství (203 firem), Investování i štítek Dluhopisy pro Ostravu-město; zařazeno v kategoriích Finanční poradenství i Investování (víc kategorií = víc výpisů) | [firmy.cz Finanční poradenství Ostrava](https://www.firmy.cz/Banky-a-financni-sluzby/Bankovni-a-sporitelni-sluzby/Financni-poradenstvi/kraj-moravskoslezsky/ostrava-mesto), [Investování](https://www.firmy.cz/Banky-a-financni-sluzby/Investovani/kraj-moravskoslezsky/ostrava-mesto), 13. 10. 2026 |
| Šárka Němcová (Zábřeh) | firmy.cz 5,0 / 17; první v kategorii Pojišťovací poradci (123 firem) | [firmy.cz Pojišťovací poradci Ostrava](https://www.firmy.cz/Banky-a-financni-sluzby/Pojistovaci-sluzby/Pojistovaci-poradci/kraj-moravskoslezsky/ostrava-mesto), 13. 10. 2026 |
| Allianz – Ing. Lenka Hladná (Zábřeh) | firmy.cz 5,0 / 25 | tamtéž |
| Petr Kaštovský – investiční poradce (Poděbradova) | firmy.cz 5,0 / 8, „18 let praxe, osobně i online“ | úryvek z firmy.cz ve vyhledávání, 13. 10. 2026 |
| Národní hráči ve výpisu Ostravy | RIXO.cz (Praha) 4,5 / 670 a Dluhová poradna (Karlovy Vary) 4,9 / 345 se zobrazují i ve výpisu Ostrava-město – konkurují i bez místní adresy | firmy.cz, 13. 10. 2026 |
| hyponamiru.cz | městské landing pages (Ostrava + další), Google 4,9 / 591 (vlastní údaj webu) | [hyponamiru Ostrava](https://www.hyponamiru.cz/?p=14111) |
| Lokální podstránky | jen Rabiec (/financni-poradce-ostrava) a hyponamiru; ostatní cílí jen title/H1 | weby výše |
| hypotekaostrava.cz (vlastní projekt) | 159 recenzí, 4,8/5 (platforma neuvedena), zmínka měst MSK (Frýdek-Místek, Havířov, Karviná, Opava, Nový Jičín, Třinec) bez samostatných stránek | [hypotekaostrava.cz](https://hypotekaostrava.cz/) |
| Google recenze konkurence | **neověřeno** – Google Mapy nešly otevřít. Čísla z webů: hyponamiru 591, Lukáš Frank 122, Houfek 76 (mimo Ostravu) | – |

Postřehy:
- Na Seznamu (firmy.cz) je ostravská konkurence v poradenství **slabá**: kromě Váš konzultant má většina subjektů 0–25 hodnocení. **Profil s 20+ hodnoceními na firmy.cz by se dostal do top 3 výpisu** (odhad podle aktuálních výpisů, neověřeno, jak firmy.cz řadí).
- Ve výpisech firmy.cz se patrikgajdadzis.cz / Patrik Gajdadzis na prvních stránkách kategorií Finanční poradenství, Pojišťovací poradci ani Investování **neobjevil** (zobrazeno jen prvních 14 z 203/123/28 výsledků; existence profilu neověřena).
- Google Business Profile konkurence (kategorie, příspěvky) nebylo možné zjistit.

---

### Co dělá špička lépe než patrikgajdadzis.cz

1. **Ukazuje počet recenzí a jejich zdroj přímo v hero** – Houfek „Google 5,0 / 76“ v hlavičce i hero ([jirihoufek.cz](https://jirihoufek.cz/)), Frank 4,9 / 122 ([lukasfrank.cz](https://www.lukasfrank.cz/)), hyponamiru 4,9 / 591. My ukazujeme „5,0“ bez počtu. BrightLocal: 47 % nepoužije firmu s méně než 20 recenzemi – počet je informace, kterou člověk hledá.
2. **Číselné případové studie na vlastních stránkách** – Houfek: 10 příběhů s výsledkem v nadpisu („+1,5 mil. Kč na hypotéce, sazba o 0,3 % nižší“). Naše příběhy jsou skutečné, ale (ověř) bez samostatných stránek a bez čísla v titulku.
3. **Kalkulačky s výsledkem hned** – ZFP Brno 7 kalkulaček ([zfpbrno.cz](https://www.zfpbrno.cz/)), L&C 4 kalkulačky vč. „cost of doing nothing“ ([landc.co.uk](https://www.landc.co.uk/)), Interhyp průvodce sazbou jako hlavní CTA. Naše „Na kolik dosáhnete?“ je formulář s odpovědí do 1 pracovního dne.
4. **Kvalifikace před schůzkou** – Facet 4minutový dotazník ([facet.com](https://facet.com/)), Frank vstupní dotazník. Náš Google Kalendář je rezervace bez kontextu.
5. **Pravidelný obsah s distribucí (newsletter/podcast)** – Frank (podcast 170+ dílů na webu + měsíčník), Rusňák (Hypotécast + newsletter), Sušánka (týdenní newsletter 1 000+), lokálně 4poradci (týdenní blog + podcast). My 3 články, bez newsletteru.
6. **Lokální/městské stránky** – Rabiec (/financni-poradce-ostrava + Karviná), hyponamiru (města a kraje). Whitespark: „samostatná stránka pro každou službu“ = faktor č. 1 pro lokální organiku (podstránky služeb máme; městské ne).
7. **Hlídání sazby / konce fixace a posouzení cizí nabídky** – Interhyp („Zins-Update“, „Baufi-Check“). U nás chybí, přitom refinancování je silné téma 2026 (konce fixací).
8. **Silná pozice v katalozích** – Váš konzultant 216 hodnocení na firmy.cz + TOP firma. Kitces: online katalogy jsou nejlevnější kanál poradců (RAC 0,28).
9. **Úzká nika v komunikaci** – Rusňák (IT, OSVČ, majitelé firem), Zym (manažeři, IT, sportovci).
10. **Explicitní vysvětlení „kdo mě platí“** – Rabiec („Jak funguje moje odměna“), L&C (srovnání s brokery, kteří si účtují £250–2 377). NN/g: otevřené uvedení nákladů = jeden ze 4 faktorů důvěry.

---

### Nápady seřazené podle odhadovaného dopadu na poptávky

Odhad dopadu je můj úsudek z dat výše, ne měření. Nic z toho není doporučení měnit design/texty bez zadání (CLAUDE.md §25) – jde o podklad k rozhodnutí.

1. **Systematický sběr Google recenzí + odpovídání na všechny + zobrazení počtu („5,0 z N recenzí na Googlu“)** – *nejvyšší dopad, nízké náklady.* BrightLocal 2026: 47 % nepoužije firmu s <20 recenzemi, 74 % chce recenze z posledních 3 měsíců, 80 % preferuje firmy odpovídající na recenze; Whitespark: počet a čerstvost recenzí patří mezi top 11 faktorů mapového balíčku; Kitces: zobrazené recenze korelují s levnějším klientem. Pravidelná žádost po každé schůzce (QR/odkaz) zajistí čerstvost. (Pozn.: rozhodnutí „počet neuvádět, mění se“ lze řešit dynamickým/pravidelně aktualizovaným číslem – rozhodne uživatel.)
2. **Optimalizace Google Business Profile** – primární kategorie (Finanční poradce vs. Hypoteční makléř – ověřit, co sedí), klíčové slovo v názvu jen pokud je součástí skutečného názvu (pravidla Google), fotky, otevírací doba, služby, příspěvky. *Vysoký dopad:* primární kategorie je podle Whitespark faktor č. 1 mapového balíčku; Google: úplný profil = +70 % návštěv.
3. **Profil na firmy.cz (Seznam) a sběr hodnocení tam** – *vysoký dopad v ČR, nízké náklady.* Ostravská konkurence tam má kromě Váš konzultant 0–25 hodnocení; Kitces: katalogy jsou nejlevnější kanál. Zařadit do více relevantních kategorií (Finanční poradenství, Pojišťovací poradci, Hypotéky).
4. **Kalkulačka splátky / „na kolik dosáhnu“ s výsledkem hned + nabídka „pošlu přesný propočet“** – *vysoký dopad.* Nikdo z ostravských konkurentů ji nemá funkční; špička (ZFP Brno, L&C, Interhyp) ji staví jako hlavní vstup. Výsledek hned zachová současný formulář jako druhý krok (lead). Důkaz pro „kalkulačky generují leady“ je slabý (Demand Metric = vnímání), proto měřit v GA4 (událost výpočtu → odeslání).
5. **Zrychlit reakci na poptávku (cíl do 1 hodiny v pracovní době, automatické potvrzení s odkazem do kalendáře)** – *vysoký dopad, téměř zdarma.* HBR: kontakt do hodiny ~7× vyšší šance kvalifikace. Současný slib „do 1 pracovního dne“ je podle dat pomalý.
6. **Případové studie jako samostatné stránky s číslem v nadpisu** (z existujících skutečných příběhů) – *střední až vysoký dopad.* Houfek; NN/g „úplný, aktuální obsah ukazující skutečný proces“; samostatné stránky navíc rozšiřují long-tail SEO.
7. **Krátký kvalifikační krok před rezervací v kalendáři** (3–4 otázky: téma, časový horizont, preferovaná forma) – *střední dopad* (lepší příprava schůzky a vyšší podíl uskutečněných schůzek; Facet, Frank). Data o konverzi pro tento krok nenalezena – neověřeno.
8. **Refinancování / konec fixace: stránka + připomínka („pohlídám vám fixaci“)** – *střední dopad*, sezónně vysoký. Interhyp Zins-Update, L&C „cost of doing nothing“. Zároveň lead magnet s dlouhodobou hodnotou (e-mail + datum fixace).
9. **Městské stránky pro okolí, kde reálně působíte** (Poruba, Havířov, Frýdek-Místek, Karviná, Opava…) – *střední dopad*, jen s unikátním obsahem (příběhy klientů z daného místa, dojezd, schůzky). Whitespark: geografická relevance obsahu #2 lokální organiky; Rabiec a hyponamiru to dělají. Riziko: tenké duplicitní stránky nefungují – neověřeno, kolik vyhledávání mají jednotlivá města. Pozor na souběh s hypotekaostrava.cz.
10. **E-mailová návaznost na Finanční check-up (výsledek do e-mailu + krátká série / měsíční newsletter)** – *střední dopad v delším horizontu.* Frank, Rusňák, Sušánka. Kitces ale ukazuje newsletter jako drahý kanál (RAC 4,14) – smysl dává hlavně jako péče o nerozhodnuté zájemce, ne jako hlavní zdroj.
11. **Stránka/sekce „Kdo mě platí a proč je služba bez poplatků“** – *nízký až střední dopad*, posiluje důvěru (NN/g upfront disclosure; Rabiec, L&C). Ověřit, zda to /pristup už nepokrývá dostatečně.
12. **Krátké představovací video (O mně / jak probíhá schůzka)** – *nejistý dopad* (data Wyzowl neověřena). Nízká priorita, dokud nejsou hotové body 1–6.
13. **Podcast / YouTube** – *nízký dopad na poptávky z webu v krátkém horizontu*, vysoké časové náklady. Kitces: časově náročné obsahové kanály (blog, sociální sítě) patří mezi nejméně efektivní. Spíš budování značky (viz cíl „systémy a škálování“).

Neověřeno / chybí data: přímé počty Google recenzí ostravské konkurence, popisky ve výsledcích Google, podíl hypoték přes zprostředkovatele v ČR, české průzkumy výběru poradce, vliv online rezervace na konverzi v poradenství.

## Příloha B — Nástroje: co umí a co nevyužíváme



Stav k **13. 10. 2026**. Všechny zdroje otevřené tento den (pokud není uvedeno jinak).
Nic se neměnilo — jen čtení kódu, oficiální dokumentace a veřejných HTTP odpovědí webu.

Legenda sloupce **Využíváme?**: ✔ ano · ✘ ne · ? nevím / nutno ověřit v účtu (z kódu to nejde poznat).
**Neověřeno** = nenašel jsem oficiální zdroj nebo dva nezávislé zdroje.

### Co jsem zjistil přímo z webu a kódu (13. 10. 2026)

- Ostrý web: `Server: Apache`, **HTTP/2 ano** (ALPN h2), **HTTP/3 ne** (chybí hlavička `alt-svc`), komprese **gzip, ne Brotli**, certifikát **Let's Encrypt**. Odpověď jde přímo z Apache (IP 46.28.106.248) — **neběží přes WEDOS Global CDN/ochranu** (web wedos.cz sám posílá hlavičky `x-cdn-provider: WEDOS Global CDN`, náš web žádné takové nemá).
- Bezpečnostní hlavičky jsou (HSTS, CSP jen `frame-ancestors/base-uri/object-src`, X-Frame-Options…). CSP **nehlídá skripty** (`script-src` chybí).
- `sitemap-0.xml` **nemá `<lastmod>`**. RSS `/rss.xml` existuje (200).
- `astro.config.mjs` používá `markdown.rehypePlugins` — v Astru 7 **zastaralá (deprecated) volba**, funguje jen díky `@astrojs/markdown-remark`.
- Žádný `prefetch`, žádný `<ClientRouter />`, žádná verifikace Bingu/Seznamu, žádný IndexNow klíč.
- Formulář: `poptavka.php` volá `mail()` **3× na jednu poptávku** (Patrik, záloha, potvrzení klientovi).
- Strukturovaná data: WebSite, Person, FinancialService, BreadcrumbList, ProfilePage, BlogPosting, Service, **FAQPage** (7 stránek).
- Z `docs/audits/prelaunch-p0-status.md`: GA4 retence už 14 měsíců ✔, Search Console propojená s Ads ✔, Bing Webmaster Tools zatím v TODO, hlídání dostupnosti (bod 15) v TODO, pafinga.cz už je na **Cloudflare Free**.

---

### 1. Google Search Console

| Funkce | Využíváme? | Stojí za to? | Zdroj |
|---|---|---|---|
| Ověření domény (DNS TXT), odeslání sitemapy | ✔ | — | prelaunch-p0-status.md (projekt) |
| Změna adresy pafinga.cz → patrikgajdadzis.cz | ✔ (12. 10.) | — | totéž |
| Propojení s Google Ads | ✔ (11. 10.) | — | totéž |
| **Přehled Výkon** (dotazy, stránky, CTR, pozice) — od 16. 6. 2025 počítá i AI Mode | ? | **Ano** — jediný zdroj, na co lidé web hledají | [Search updates](https://developers.google.com/search/updates) |
| **Filtr značkových / neznačkových dotazů** (dostupný všem způsobilým webům od 11. 3. 2026; ne pro URL-prefix vlastnosti) | ✘ | **Ano** — odliší „Patrik Gajdadzis“ od „hypotéka Ostrava“ (tj. co přivedl obsah, ne jméno). Pozn.: při malém objemu dat se nemusí zobrazit | [Blog 11/2025](https://developers.google.com/search/blog/2025/11/search-console-branded-filter) |
| **Vlastní poznámky v grafu** (anotace, 120 znaků) | ✘ | **Ano** — zapsat „10. 10. spuštění“, „11. 10. Ads“, nový článek… | [Blog 11/2025](https://developers.google.com/search/blog/2025/11/custom-chart-annotations) |
| **Přehled Statistiky (Insights)** — od 6/2025 součástí SC | ? | Ano, jednoduchý měsíční přehled | [Blog 6/2025](https://developers.google.com/search/blog/2025/06/search-console-insights) |
| Skupiny dotazů (Query groups) | ✘ | Ne — jen pro weby s velkým objemem dotazů | [Blog 10/2025](https://developers.google.com/search/blog/2025/10/search-console-query-groups) |
| **Přehled generativní AI** (zobrazení v AI Overviews / AI Mode / Discover; stránky, země, zařízení) — od 31. 8. 2026 všem webům | ✘ | **Ano** — ukáže, jestli nás Google cituje v AI odpovědích (cíl GEO z briefu §23) | [Blog 3. 6. 2026](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports) |
| Multimodální vyhledávání (Lens apod.) — filtr ve Výkonu, od 24. 9. 2026 | ✘ | Spíš ne | [Blog 9/2026](https://developers.google.com/search/blog/2026/09/web-multimodal-in-sc) |
| **Vlastnosti pro platformy** (Instagram, TikTok, X, YouTube — výkon příspěvků ve vyhledávání Google) — od 7. 7. 2026 | ✘ | **Možná** — Patrik má Instagram (Facebook podporovaný není) | [Blog 7. 7. 2026](https://developers.google.com/search/blog/2026/07/search-console-social-video-platforms) |
| Kontrola URL + žádost o indexování | ✔ (homepage) | Ano — po každém novém článku | [Nápověda](https://support.google.com/webmasters/answer/9012289) |
| Přehled Indexování stránek | ? | Ano — jednou měsíčně zkontrolovat vyloučené stránky | [Nápověda](https://support.google.com/webmasters/answer/7440203) |
| Sitemapy | ✔ | Doplnit `lastmod` (Google ho použije, je-li soustavně přesný) | [Sitemaps docs](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) — *pravidlo o lastmod uvádím z paměti dokumentace, tento den neotevřeno → neověřeno* |
| Odebrání (dočasné skrytí URL) | ✘ | Jen při nouzi | [Nápověda](https://support.google.com/webmasters/answer/9689846) |
| **Core Web Vitals** (data z CrUX — u malého webu často „nedostatek dat“; pak PageSpeed Insights) | ? | Ano, ale pravděpodobně bez dat | [Nápověda](https://support.google.com/webmasters/answer/9205520) |
| HTTPS přehled | ? | Jen kontrola jednou | — (neověřeno, nedohledal jsem stránku) |
| Odkazy (kdo na web odkazuje) | ? | Ano — kontrola zpětných odkazů (Mint, profily) | [Nápověda](https://support.google.com/webmasters/answer/9049606) |
| **Propojení se GA4** (přehledy „Dotazy z Google“ a „Organická návštěvnost“, data ~48 h zpoždění, max. 16 měsíců, kolekci je nutné v GA4 **publikovat** v Knihovně) | ? | **Ano** — dotazy vedle konverzí v jednom nástroji, 5 minut práce | [GA nápověda](https://support.google.com/analytics/answer/10737381) |
| Hromadný export do BigQuery (denně, bez anonymizovaných dotazů; účtuje se BigQuery) | ✘ | Ne — pro desítky dotazů denně zbytečné | [Nápověda](https://support.google.com/webmasters/answer/12918484) |
| Search Console API | ✘ | Ne (jen přes Looker/Data Studio, viz §6) | [API](https://developers.google.com/webmaster-tools) |

#### Strukturovaná data / rich results — co je pro nás relevantní

| Typ | Na webu? | Stav v Google (13. 10. 2026) | Zdroj |
|---|---|---|---|
| **FAQPage** | ✔ 7 stránek | **Rich result zrušen — od 7. 5. 2026 se v Googlu nezobrazuje**, dokumentace odstraněna 15. 6. 2026. Značka neškodí (a může pomáhat AI asistentům), ale **žádné rozbalovací FAQ ve výsledcích nebude**. Text v `prelaunch-p0-status.md` bod 13 („ověřit FAQPage v Rich Results Test“) je tím překonaný | [Search updates](https://developers.google.com/search/updates) |
| Breadcrumb | ✔ | Podporováno | [Galerie](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) (aktualizace 15. 6. 2026) |
| Article (BlogPosting) | ✔ | Podporováno | totéž |
| Profile page | ✔ `/o-mne` | Podporováno | totéž |
| Local business (u nás FinancialService) | ✔ | Podporováno (znalostní panel). Chybí `openingHoursSpecification` (TODO 17) | totéž |
| Organization (logo, kontakt) | částečně (Person/FinancialService) | Podporováno — logo PG by šlo doplnit | totéž |
| Review snippet | ✘ záměrně | Správně — vlastní hodnocení firmy na vlastním webu Google nezobrazuje | entity.ts + galerie |
| HowTo, Service | Service ✔ | Service ani HowTo **nejsou** v galerii (bez rich resultu) | galerie |
| `llms.txt` | ✔ | **Google Search ho nepoužívá** (poznámka v dokumentaci 15. 6. 2026). Pro ChatGPT/Claude/Perplexity může mít smysl dál | [Search updates](https://developers.google.com/search/updates) |

Doporučení pro náš web: **zapnout si anotace + značkový filtr + přehled generativní AI, propojit SC s GA4, doplnit `lastmod`**. BigQuery a API vynechat.

---

### 2. Google Analytics 4 (+ Google Ads měření)

| Funkce | Využíváme? | Stojí za to? | Zdroj |
|---|---|---|---|
| Události `poptavka_odeslana`, `klik_telefon`, `klik_rezervace`, `klik_whatsapp` | ✔ (kód) | — | CookieConsent.astro |
| **Označit je jako klíčové události** (Key events) | ? | **Ano** — bez toho GA4 nepočítá konverzní poměry ani je neukáže v přehledech získávání | [Nápověda](https://support.google.com/analytics/answer/9267568) |
| Uchovávání dat 14 měsíců (výchozí 2; ovlivňuje jen explorace a cestu, ne standardní přehledy) | ✔ | — | [Nápověda](https://support.google.com/analytics/answer/7667196) |
| **Propojení GA4 ↔ Google Ads** | ? | **Ano** — přehledy kampaní v GA4, sdílení publik, import klíčových událostí | [Nápověda o klíčových událostech](https://support.google.com/analytics/answer/9267568) |
| Propojení GA4 ↔ Search Console | ? | Ano (viz §1) | [Nápověda](https://support.google.com/analytics/answer/10737381) |
| **Explorace: cesta (path), trychtýř** — např. článek → služba → formulář | ✘ | **Ano** — ukáže, které stránky vedou k poptávce. Pozor: data jen od lidí se souhlasem | [Explorations](https://support.google.com/analytics/answer/7579450) |
| Cílové skupiny (publika) pro remarketing ve Vyhledávání | ✘ | Spíš později — publikum pro Search potřebuje **≥ 100 aktivních uživatelů za 30 dní** a jen lidi s marketingovým souhlasem (`ad_personalization`) | [Ads nápověda](https://support.google.com/google-ads/answer/2472738) |
| **Consent Mode v2 – základní režim** (bez souhlasu se nic nenačte; Ads pak používá jen „obecný model“) | ✔ | Ponechat | [Ads nápověda](https://support.google.com/google-ads/answer/10000067) |
| Consent Mode v2 – rozšířený režim (bezcookie pingy i bez souhlasu) | ✘ | **Ne.** GA4 modelování chování vyžaduje rozšířený režim **a** ≥ 1 000 událostí/den s odmítnutím po 7 dní **a** ≥ 1 000 uživatelů/den se souhlasem 7 z 28 dní; Ads modelování konverzí potřebuje 700 kliknutí na reklamu za 7 dní na doménu × zemi (jiná stránka Google uvádí 100/den — rozpor). Náš web má desítky návštěv a ~10–30 kliků denně → **prahy nesplníme**, a rozšířený režim je v rozporu se slibem „bez souhlasu nic“ | [GA4 modelování](https://support.google.com/analytics/answer/11161109), [Ads modelování](https://support.google.com/google-ads/answer/10548233) |
| **Vylepšené konverze (enhanced conversions) pro formulář** — hashovaný e-mail/telefon z formuláře (SHA-256), posílá se jen se souhlasem `ad_user_data`; nutné přijmout podmínky zákaznických dat v Ads/GA; od 2026 jeden přepínač pro web i leady; zlepšení se projeví až za ~1 měsíc | ✘ | **Ano, středně** — zpřesní přiřazení poptávek k reklamám (i napříč zařízeními). Nutno doplnit zásady OÚ (předání hashovaného e-mailu Googlu) | [Ads – o EC](https://support.google.com/google-ads/answer/9888656), [GA – EC](https://support.google.com/analytics/answer/14252663), [Nastavení přes gtag](https://support.google.com/google-ads/answer/13258081) |
| **Vylepšené konverze pro potenciální zákazníky / offline import** — dodatečně nahrát, které poptávky se staly klienty (s hodnotou). Od 15. 6. 2026 jen přes Data Manager (API) | ✘ | **Ano, nejvyšší dopad na Ads** — kampaně se pak učí na klientech, ne na klicích na telefon. Při desítkách poptávek měsíčně stačí ruční nahrání (zda Data Manager umí ruční CSV: **neověřeno**). Potřebuje uložit GCLID/e-mail k poptávce | [Ads – EC for leads](https://support.google.com/google-ads/answer/15713840) |
| Export do BigQuery (sandbox zdarma, standard 1 mil. událostí/den, streaming 0,05 USD/GB) | ✘ | Ne | [Nápověda](https://support.google.com/analytics/answer/9358801) |
| Identita přehledů „Blended“ | ? | Bez významu (modelování nenastane) | [GA4 modelování](https://support.google.com/analytics/answer/11161109) |

Doporučení pro malý web: **klíčové události + propojení s Ads a SC + jedna explorace „cesta k poptávce“ + později offline import klientů**. Rozšířený Consent Mode, BigQuery a modelování nemají při našem objemu smysl.

---

### 3. Rezervace termínů

#### Google Kalendář — plány schůzek

| Funkce | Osobní účet / Business Starter | Workspace Individual | Business Standard+ | Využíváme? | Stojí za to? |
|---|---|---|---|---|---|
| Jedna rezervační stránka | ✔ | ✔ | ✔ | ✔ | — |
| Více plánů schůzek | ✘ | ✔ | ✔ | ✘ | Možná (osobně vs. online) |
| **Automatické e-mailové připomínky** (až 5) | ✘ | ✔ | ✔ | ✘ | **Ano** — méně nedorazivších (TODO 18a) |
| **Kontrola obsazenosti napříč více kalendáři** | ✘ | ✔ | ✔ | ✘ | Ano, pokud má Patrik i jiný kalendář (Mint) |
| Ověření e-mailu rezervujícího (proti spamu) | ✘ | ✔ | ✔ | ✘ | Spíš ne |
| Platby (Stripe) | ✘ | ✔ | ✔ (admin musí zapnout) | ✘ | Ne (služba je zdarma) |
| Sekundární kalendáře, až 20 spoluhostitelů | ✘ | ✘ | ✔ | ✘ | Ne |
| Vlastní otázky ve formuláři, max. rezervací/den, přestávky, okno rezervace (výchozí min. 4 h předem) | popsáno bez rozlišení tarifu | | | ? | Ano (otázka „Co chcete řešit?“) |
| Vložení na web (tlačítko s vyskakovacím oknem nebo vložená stránka, iframe) | dostupné ze „Sharing options → Website embed“ | | | ✘ (jen odkaz) | Spíš ne — iframe Googlu před souhlasem s cookies by narazil na naše pravidla |

Zdroje: [Srovnání prémiových funkcí](https://support.google.com/calendar/answer/16287038), [Vytvoření plánu](https://support.google.com/calendar/answer/10729749), [Sdílení / vložení](https://support.google.com/calendar/answer/10733297).
Rozpor: ceník Workspace uvádí „rezervační stránky“ u Starteru jako nepodporované, nápověda Kalendáře říká, že Starter má jednu stránku → jde nejspíš o prémiovou verzi. **Ceny Workspace (EUR/uživatel/měsíc, bez DPH, měsíční platba):** Starter 6,80 · Standard 13,60 · Plus 21,10; roční závazek −16 % ([ceník](https://workspace.google.com/intl/cs/pricing.html)).
**Měření:** s Google Kalendářem měříme jen **klik** na rezervaci, ne dokončenou rezervaci (stránka je na doméně Googlu bez našeho tagu).

#### „Rezervovat“ v Google profilu firmy

| Funkce | Využíváme? | Stojí za to? | Zdroj |
|---|---|---|---|
| **Vlastní odkaz na rezervaci v profilu** (až 10 odkazů na kategorii; schůzky, rezervace…) | ? | **Ano, 5 minut** — vložit `calendar.app.google/…` | [Nápověda GBP](https://support.google.com/business/answer/6218037) |
| Modré tlačítko „Rezervovat“ přes partnera Reserve with Google | ✘ | **Neověřeno pro ČR a finanční služby** — oficiální stránka nevyjmenovává země ani kategorie; dle jednoho neoficiálního zdroje cílí na fitness/wellness/krásu | [Nápověda – poskytovatel](https://support.google.com/business/answer/7475773) |
| Metrika „Rezervace“ v přehledu výkonu profilu (jen přes poskytovatele) | ✘ | — | [Výkon profilu](https://support.google.com/business/answer/9918094) |

#### Alternativy (jen fakta)

| Nástroj | Zdarma | Placeně | Co navíc oproti Google Kalendáři | Zdroj |
|---|---|---|---|---|
| Calendly | 1 typ schůzky, 1 kalendář, bez připomínek, bez GA4 | Standard 10 USD/uživatel/měs. | Připomínky, **GA4 a Meta Pixel** (měření dokončené rezervace) | [Ceník](https://calendly.com/pricing) |
| Cal.com | 1 uživatel, neomezené typy a kalendáře, e-mail + SMS notifikace, Stripe | Teams od 12 USD | Open-source, self-hosting a EU hosting existují (u kterého tarifu: neověřeno); GA4 na free: neověřeno | [Ceník](https://cal.com/pricing) |
| Reservio (CZ) | 40 rezervací/30 dní, max. 100 klientů, bez SMS, **bez synchronizace s Google** | od 199 Kč/měs. (ročně, bez DPH); sync s Google od Starteru | Česky, SMS připomínky (kredity). Reserve with Google / GA4: na ceníku neuvedeno | [Ceník](https://www.reservio.com/cs/cenik) |

---

### 4. Astro (verze 5–7)

Stav: Astro 7.3, statický výstup, MDX, sitemap, RSS, `astro:assets`/`<Picture>`.

| Funkce (verze) | Využíváme? | Stojí za to? | Jde na Wedosu? | Zdroj |
|---|---|---|---|---|
| Content Layer / kolekce obsahu (5.0; staré API odstraněno v 6.0) | ✔ | — | ✔ | [Astro 6](https://astro.build/blog/astro-6/) |
| Optimalizace obrázků, `<Picture>`, responzivní `image.layout` | ✔ částečně | Ano — `layout` u obrázků v článcích | ✔ (build) | [Config reference](https://docs.astro.build/en/reference/configuration-reference/) |
| **Prefetch** (`data-astro-prefetch`, strategie hover/tap/viewport/load) | ✘ | **Ano, levně** — rychlejší přechod na podstránky; čisté statické JS | ✔ | totéž |
| View Transitions / `<ClientRouter />` | ✘ | **Ne** — nefunguje s CSP API a rozbije skripty sekcí (trasa, tečky, ResizeObserver) | ✔ | totéž |
| **CSP API** (`security: { csp: true }`, stabilní od 6.0) — u statiky jako `<meta>` s hashi skriptů | ✘ | **Ano, střední** — dnes CSP nehlídá skripty. Externí gtag nutno povolit (`scriptDirective.resources`). V dev režimu nefunguje; `frame-ancestors` v meta nejde (zůstane v .htaccess) | ✔ | [Config reference](https://docs.astro.build/en/reference/configuration-reference/), [Astro 6](https://astro.build/blog/astro-6/) |
| Fonts API (6.0) — self-hosting, náhradní metriky, preload | ✘ (ruční @font-face) | Malý — mohl by zmenšit poskakování při `font-display: swap` | ✔ | [Astro 6](https://astro.build/blog/astro-6/) |
| **Markdown pipeline Sätteri (7.0)** — `markdown.rehypePlugins` je deprecated, běží přes `@astrojs/markdown-remark` | (používáme starou cestu) | **Hlídat** — při příští velké verzi přepsat `rehype-czech-nbsp` na Sätteri HAST plugin nebo nastavit `markdown.processor: unified()` | ✔ | [Upgrade v7](https://docs.astro.build/en/guides/upgrade-to/v7/) |
| `compressHTML: 'jsx'` (7.0 — mizí mezery mezi inline prvky) | ✔ (výchozí) | Už ověřeno buildem/kontrolami | ✔ | totéž |
| Inkrementální statické buildy (7.2, experimentální) | ✘ | Ne — malý web | ✔ | [Astro 7.2](https://astro.build/blog/astro-720/) |
| astro:env (typované proměnné) | ✘ | Malý — ID měření v configu místo v komponentě | ✔ (veřejné, build-time) | — (neotevřeno; neověřeno) |
| i18n routing | ✘ | Ne — jen čeština | ✔ | — |
| Server Islands (`server:defer`) | ✘ | Ne | **✘ — vyžaduje adapter** | [Docs](https://docs.astro.build/en/guides/server-islands/) |
| Actions, Sessions, on-demand rendering, Live Content Collections (6.0), route caching (7.0) | ✘ | Až při klientské zóně | **✘ — potřebují Node/serverless adapter**; Wedos webhosting = Apache + PHP (Node v srovnání tarifů neuveden) | [Astro 6](https://astro.build/blog/astro-6/), [Astro 7](https://astro.build/blog/astro-7/) |

Shrnutí: na Wedosu zůstáváme u statiky + PHP. Z novinek má smysl **prefetch** a **CSP API**; serverové funkce (Actions, Sessions, Server Islands) by vyžadovaly jiný hosting (Node/Vercel/Netlify/Cloudflare) — dnes nic z toho nepotřebujeme, formulář řeší PHP.

---

### 5. Wedos (dnes značka **VEDOS**)

Hostingová divize WEDOS byla v únoru 2025 přejmenována na **VEDOS** (firma zůstává WEDOS, a.s.); `wedos.cz` přesměrovává na `vedos.cz` ([Lupa.cz](https://www.lupa.cz/pr-clanky/vedos-odvazny-rebranding-ktery-prinesl-rust/) — PR článek, + vlastní ověření přesměrování 13. 10. 2026).

#### LowCost vs. NoLimit (oficiální srovnání [vedos.hosting/webhosting/srovnani](https://vedos.hosting/webhosting/srovnani/))

| Parametr | LowCost | NoLimit | Poznámka pro nás |
|---|---|---|---|
| Cena (bez DPH / s DPH 1. rok) | 33 Kč / 39,93 Kč měs. | 39 Kč / 47,19 Kč měs. (kupon) | Cena po 1. roce: na stránce jasně neuvedena (recenze uvádějí vyšší) → neověřeno |
| Disk | 10 GB SSD | neomezeno | Statický web má jednotky MB |
| Přenos | neomezeno | neomezeno | |
| SSL zdarma | ✔ | ✔ | Let's Encrypt ✔ (ověřeno na webu) |
| Aliasy | **0** | 3 (víc za příplatek) | Proto pafinga.cz řešena přes Cloudflare |
| **PHP mail(): max. e-mailů/den** | **50** | 500 | **Riziko:** 3 e-maily/poptávku → strop ~16 poptávek/den (včetně spamu, který projde honeypotem) |
| SMTP max./den | 50 | 500 | |
| E-maily: prostor / schránky | 5 GB / neomezeno | 5 GB / neomezeno | |
| Databáze (MariaDB): prostor / počet | 1 GB / neomezeno, phpMyAdmin | 2 GB | Stačí na budoucí jednoduchou klientskou zónu |
| PHP verze | 8.x / 7.x / 5.x | totéž | Přesná nejvyšší 8.x verze: neověřeno |
| PHP vlákna / memory_limit / max_execution_time | 7 / 256 MB / 30 s | 25 / 512 MB / 90 s | Pro formulář stačí |
| Cron | 3 úlohy zdarma (max. 1×/h), 10 úloh za příplatek (1×/5 min) | totéž | Nevyužíváme |
| Zálohy (web, DB, e-maily) | týdně; **obnova zpoplatněná** | týdně; obnova zpoplatněná | Kód je v gitu; schránka `poptavka@` jen týdně |
| WEDOS Disk pro vlastní zálohy | 5 GB zdarma | 5 GB zdarma | Nevyužíváme |
| Logy (access/error) | zdarma 24 h (1×/30 dní), 7 dní za příplatek | totéž | |
| Ochrana | „basic“ | „smart“ | Obsah úrovní: **neověřeno** |
| Garance dostupnosti | 99,9 % | 99,98 % | |

#### Další služby Wedosu

| Funkce | Využíváme? | Stojí za to? | Zdroj |
|---|---|---|---|
| HTTP/2 | ✔ (ověřeno) | — | vlastní měření |
| HTTP/3, Brotli | ✘ (ověřeno: jen h2 + gzip) | Malý přínos; přišlo by s CDN (WEDOS Global / Cloudflare) | vlastní měření |
| **WEDOS Global** (reverzní proxy: CDN cache, WAF, DDoS, test prohlížeče pro podezřelé) | ✘ | **Neověřeno** — ceník jsem z oficiálního webu nezískal (web blokuje automatické čtení); jediná zmínka o ceně je uživatelská recenze (300 Kč / 2 000 Kč měs. bez DPH) → nespolehlivé | [WordPress plugin](https://wordpress.org/plugins/wgpwpp/), [blog WEDOS](https://blog.wedos.com/waf-report-from-wedos-global-protection-for-february-2023) |
| **WEDOS OnLine** — hlídání dostupnosti: **FREE 10 kontrol, interval 5 min**, 3 příjemci (e-mail + další kanály), stavová stránka, historie 3 měsíce; PRO od 100 Kč/měs. | ✘ (TODO 15) | **Ano, zdarma** | [wedos.online](https://wedos.online/) |
| Cron (např. čištění `api/limity/`, budoucí automatické e-maily) | ✘ | Až bude potřeba | srovnání tarifů |
| MariaDB (budoucí klientská zóna, evidence poptávek) | ✘ | Později | srovnání tarifů |

Alternativa k WEDOS Global: **Cloudflare Free** (SSL, CDN, DDoS zdarma — [plans/free](https://www.cloudflare.com/plans/free/)); účet už existuje kvůli pafinga.cz. HTTP/3, Brotli a WAF pravidla ve Free: na stránce neuvedeno → neověřeno. Vyžadovalo by přesun DNS patrikgajdadzis.cz na Cloudflare (dopad na e-mail/DKIM nutno promyslet).

---

### 6. Další nástroje zdarma / levně

| Nástroj · funkce | Využíváme? | Stojí za to? | Zdroj |
|---|---|---|---|
| **Bing Webmaster Tools** — import webů ze Search Console (bez nového ověřování) | ✘ (v TODO) | **Ano, 10 min** — Bing napájí i Copilot a ChatGPT vyhledávání (to druhé neověřeno) | [Bing blog – srovnání s GSC](https://blogs.bing.com/webmaster/2024/8/Bing-Webmaster-Tools-or-Google-Search-Console-A-Comparison/) |
| Bing **AI Performance** — citace webu v Copilotu a AI souhrnech Bingu, „grounding“ dotazy, export CSV (public preview od 2/2026; od 6/2026 Intents, Topics, Citation Share) | ✘ | **Ano** — jediný nástroj, který ukazuje citace v AI asistentovi | [Bing blog 2/2026](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview), [nápověda](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c) |
| **IndexNow** — oznámení změněné URL; účastníci: Bing, **Seznam**, Yandex, Naver, Yep, Internet Archive, Amazonbot (Google ne) | ✘ | **Ano** — klíčový soubor do `public/` + jeden `curl` v GitHub Actions po nasazení | [indexnow.org seznam](https://www.indexnow.org/searchengines.json) |
| **Seznam Webmaster** — přehled indexovaných a problémových stránek, žádosti o reindexaci, API klíč | ✘ | **Ano** — v ČR stále relevantní vyhledávač | dva nezávislé zdroje: [Collabim](https://help.collabim.com/projects/position-tracking/connection-with-seznam-webmaster), [Mergado](https://help.mergado.com/en/seznam-index-checker/what-is-the-seznam-index-checker-extension/) (oficiální nápovědu Seznamu jsem nenačetl) |
| **Microsoft Clarity** — heatmapy, nahrávky relací, zdarma. Od 31. 10. 2025 pro EHP/UK/CH vyžaduje signál souhlasu (Consent API v2); bez souhlasu jen bezcookie data (každá stránka = nová relace) | ✘ | **Možná** — u 1–2 klíčových stránek (formulář, check-up) cenné. Načítat **jen po analytickém souhlasu** (jinak porušení našeho slibu „bez souhlasu nic“); doplnit stránku Cookies a zásady OÚ | [Consent mode](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode), [FAQ](https://learn.microsoft.com/en-us/clarity/faq), [Bez souhlasu](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-without-cookie-consent) |
| **Google profil firmy — Výkon** (hledané výrazy, zobrazení, trasy, hovory, kliky na web, rezervace) | ? | **Ano** — měsíčně; hledané výrazy se aktualizují na začátku měsíce (až 5 dní) | [Nápověda](https://support.google.com/business/answer/9918094) |
| UTM parametry na odkazu „Web“ v profilu (odliší návštěvy z profilu v GA4) | ? | Ano, 2 min | běžná praxe; v dokumentaci GBP nezmíněno → neověřeno |
| Business Profile API (statistiky, příspěvky přes API) — nutná žádost, profil aktivní ≥ 60 dní, kvóta 0 do schválení | ✘ | Ne — pro jeden profil stačí web rozhraní | [Prereqs](https://developers.google.com/my-business/content/prereqs) |
| Otázky a odpovědi v profilu — **Q&A API ukončeno 3. 11. 2025** (zda zmizela i veřejná sekce: neověřeno) | — | — | [Q&A changelog](https://developers.google.com/my-business/content/qanda/change-log) |
| **Looker Studio** (dle oficiální stránky Google Cloud 13. 10. 2026 přejmenováno na **Data Studio**; zdarma) — konektory GA4, Search Console, Google Ads | ✘ | **Možná** — jedna měsíční stránka „poptávky + dotazy + Ads“; při 4 nástrojích spíš luxus | [Google Cloud docs](https://docs.cloud.google.com/looker/docs/studio), [konektor SC](https://support.google.com/datastudio/answer/7314895) |

---

### Co nevyužíváme a přineslo by nejvíc (podle dopadu)

| # | Co | Proč | Pracnost |
|---|---|---|---|
| 1 | **Offline import „poptávka → klient“ do Google Ads** (enhanced conversions for leads / Data Manager) | Ads utrácí ~10 000 Kč/měs. a dnes se učí na klicích na telefon a rezervaci; s importem by optimalizoval na skutečné klienty. Nutné: uložit GCLID (skryté pole → e-mail z `poptavka.php`) + jednou měsíčně nahrát výsledky | Střední (2–4 h kód + 15 min/měs.); ověřit ruční nahrání v Data Manageru |
| 2 | **Hlídání limitu 50 e-mailů/den na LowCost** | Každá poptávka = 3× `mail()`. Spam vlna nebo úspěšná kampaň může tiše zastavit doručování poptávek. Řešení: přejít na NoLimit (+~7 Kč/měs. v 1. roce, 500/den) nebo snížit počet volání (záloha přes Bcc) | Nízká (rozhodnutí + 30 min) |
| 3 | **GA4: klíčové události + propojení s Ads a Search Console** (pokud ještě není) | Bez klíčových událostí GA4 neukazuje konverze; propojení dá dotazy a kampaně vedle poptávek | Nízká (15 min v rozhraní) |
| 4 | **Vylepšené konverze pro formulář** (`user_data` s e-mailem/telefonem při souhlasu) | Přesnější přiřazení poptávek k reklamám; připraví půdu pro bod 1 | Nízká–střední (1–2 h + doplnění zásad OÚ) |
| 5 | **WEDOS OnLine Free** (hlídání dostupnosti + formuláře `api/poptavka.php` přes kód 405/200) | TODO 15; výpadek se dnes nikdo nedozví | Nízká (15 min) |
| 6 | **Bing Webmaster Tools + IndexNow (Bing + Seznam) + Seznam Webmaster** | AI citace v Bingu/Copilotu, rychlejší indexace článků v Seznamu; GitHub Actions to zvládne automaticky po nasazení | Nízká (1 h celkem) |
| 7 | **Search Console: anotace, značkový filtr, přehled generativní AI** | Měření, jestli články a GEO fungují (bez značkových dotazů) | Nízká (zapnout/používat) |
| 8 | **Odkaz na rezervaci v Google profilu firmy + UTM na odkazu „Web“** | Rezervace přímo z Map; odlišení návštěv z profilu | Nízká (10 min) |
| 9 | **Placený Workspace Business Standard** (13,60 €/měs.) kvůli připomínkám schůzek a kontrole více kalendářů | Méně nedorazivších; podmínka pro TODO 18a | Nízká technicky, ale stojí peníze |
| 10 | **`lastmod` v sitemapě** (u článků z `publishedAt`/`updatedAt`) | Rychlejší přeindexování upravených článků | Nízká (30 min, `serialize` v `astro.config.mjs`) |
| 11 | **Astro prefetch** | Rychlejší přechody mezi stránkami bez změny designu | Nízká (config + kontrola) |
| 12 | **Astro CSP API** (hashe skriptů v `<meta>`) | Lepší ochrana proti XSS; nutno povolit gtag a otestovat všechny skripty sekcí | Střední (2–4 h + `check:funkce`) |
| 13 | Microsoft Clarity (jen po souhlasu) | Heatmapy formuláře a check-upu | Nízká technicky, ale úprava cookies/zásad OÚ |
| 14 | Přepsat `rehype-czech-nbsp` na Sätteri / `markdown.processor` | Prevence rozbití při Astru 8 | Střední, není spěch |

**Vědomě nedoporučuji:** rozšířený Consent Mode (prahy nesplníme, rozpor se slibem v cookie liště), BigQuery exporty (GA4 i SC), ClientRouter/View Transitions (rozbije trasu a CSP), Server Islands/Actions/Sessions (vyžadují jiný hosting), Business Profile API, platby v Kalendáři.

**Překonané v projektu:** FAQPage už rich result nedává (od 7. 5. 2026) — upravit text bodu 13 v `docs/audits/prelaunch-p0-status.md`; `llms.txt` Google nepoužívá (pro jiné AI ano).

## Příloha C — Pravidla: cookies, GDPR, vázaný zástupce, reklama, tipaři



Stav k 13. 10. 2026. Zpracoval rešeršér, **ne právník**. Text shrnuje, co říkají předpisy,
úřady a oficiální stanoviska, a porovnává to s kódem webu (jen čtení, nic se neměnilo).
**Každý právní závěr je třeba ověřit u kvalifikované osoby** (advokát / compliance BEplan
finanční plánování s.r.o.). Všechny odkazy byly otevřeny 13. 10. 2026.

Znění zákonů je z zakonyprolidi.cz, ověřené přímo v textu paragrafu (ne z paměti):

| Předpis | Verze na zakonyprolidi.cz (13. 10. 2026) | URL |
|---|---|---|
| 127/2005 Sb., o elektronických komunikacích | aktuální znění od 1. 1. 2026 (verze 52) | https://www.zakonyprolidi.cz/cs/2005-127 |
| 257/2016 Sb., o spotřebitelském úvěru (ZSÚ) | 1. 9. 2024 – 31. 12. 2026 (verze 12) | https://www.zakonyprolidi.cz/cs/2016-257 |
| 170/2018 Sb., o distribuci pojištění a zajištění (ZDPZ) | 1. 7. 2025 – 31. 12. 2026 (verze 6) | https://www.zakonyprolidi.cz/cs/2018-170 |
| 256/2004 Sb., o podnikání na kapitálovém trhu (ZPKT) | 1. 9. 2026 – 31. 12. 2026 (verze 60) | https://www.zakonyprolidi.cz/cs/2004-256 |
| 427/2011 Sb., o doplňkovém penzijním spoření | od 1. 8. 2026 (verze 20) | https://www.zakonyprolidi.cz/cs/2011-427 |
| 480/2004 Sb., o některých službách informační společnosti | od 23. 3. 2023 (verze 12) | https://www.zakonyprolidi.cz/cs/2004-480 |
| 634/1992 Sb., o ochraně spotřebitele (ZOS) | 20. 8. 2025 – 31. 12. 2026 (verze 57) | https://www.zakonyprolidi.cz/cs/1992-634 |
| 89/2012 Sb., občanský zákoník | 1. 1. 2026 – 31. 12. 2026 (verze 18) | https://www.zakonyprolidi.cz/cs/2012-89 |
| 229/2002 Sb., o finančním arbitrovi | od 15. 2. 2025 (verze 18) | https://www.zakonyprolidi.cz/cs/2002-229 |
| Nařízení (EU) 2016/679 (GDPR) | — | https://eur-lex.europa.eu/eli/reg/2016/679/oj |

Pozor: u ZSÚ, ZDPZ, ZPKT a ZOS končí „aktuální znění" 31. 12. 2026, od 1. 1. 2027 tedy
platí novela (u ZSÚ pravděpodobně transpozice nové směrnice o spotřebitelském úvěru
2023/2225). Obsah budoucích znění jsem nekontroloval. **Před koncem roku zkontrolovat
změny, ověřit u kvalifikované osoby.**

---

### 1. Cookies

#### Co říká předpis (s odkazem)

- **§ 89 odst. 3 zákona 127/2005 Sb.** (ověřeno v textu): kdo ukládá údaje v koncovém
  zařízení uživatele nebo k nim přistupuje, „získá od těchto účastníků nebo uživatelů
  předem prokazatelný souhlas s rozsahem a účelem jejich zpracování". Výjimka: technické
  ukládání výhradně pro přenos zprávy nebo pokud je to nezbytné pro službu výslovně
  vyžádanou uživatelem. Režim opt-in platí od 1. 1. 2022 (potvrzuje ÚOOÚ, viz níže).
  https://www.zakonyprolidi.cz/cs/2005-127
- **ÚOOÚ – Q&A Cookies** (https://uoou.gov.cz/verejnost/qa-otazky-a-odpovedi/cookies):
  - analytické a marketingové cookies jen po předchozím aktivním souhlasu, technické bez něj,
  - tlačítko pro souhlas i odmítnutí ve **stejné vrstvě** lišty, se srovnatelnou vizuální váhou,
    souhlas musí jít „stejně jednoduše neudělit jako udělit",
  - předem zaškrtnutá políčka nejsou souhlas, zavření nebo ignorování lišty také ne,
  - odvolání souhlasu kdykoli a stejně snadno jako udělení (doporučen trvale dostupný odkaz/tlačítko),
  - **platnost souhlasu přiměřeně cca 12 měsíců**; **po odmítnutí lištu znovu nezobrazovat
    alespoň 6 měsíců**; dřív jen při podstatné změně zpracování,
  - bez souhlasu analytické cookies použít nelze; cookie wall (přístup podmíněný souhlasem) není svobodný souhlas,
  - doporučen seznam cookies s účelem a uvedením příjemců.
- **ÚOOÚ, prezentace „Praxe ÚOOÚ v oblasti cookies", 12. 6. 2024**
  (https://uoou.gov.cz/media/seminare-uoou/prezentace/2024-06-12-p04-praxe-uoou-v-oblasti-cookies.pdf):
  od roku 2023 ÚOOÚ ukládá pokuty. Časté prohřešky: cookies bez souhlasu, neúplný výčet cookies,
  ztížené odvolání (minimálně odkaz v zápatí), volby souhlasu a nesouhlasu v různých vrstvách.
  Informační povinnost platí **i pro technické cookies**. Lištu je třeba zobrazit znovu při
  významné změně zpracování (nový účel, změna okruhu správců/zpracovatelů).
- **EDPB, Report of the work undertaken by the Cookie Banner Taskforce, přijato 17. 1. 2023**
  (https://www.edpb.europa.eu/our-work-tools/our-documents/other/report-work-undertaken-cookie-banner-taskforce_en,
  PDF `edpb_20230118_report_cookie_banner_taskforce_en.pdf`): chybějící odmítnutí ve vrstvě se
  souhlasem je podle velké většiny úřadů porušení; předzaškrtnutá políčka nejsou platný souhlas
  (recitál 32 GDPR); odmítnutí jen jako nenápadný odkaz nebo s nečitelným kontrastem je klamavé;
  „nezbytné" cookies nesmí zahrnovat nenezbytné účely; odvolání musí být snadno dostupné
  (ikona nebo odkaz na viditelném, standardním místě) a stejně snadné jako udělení.
- **SDEU C-673/17 Planet49 (1. 10. 2019)**: předem zaškrtnuté políčko není platný souhlas
  (v kódu webu je už citováno).
- **Google EU User Consent Policy** (https://www.google.com/about/company/user-consent-policy/):
  pro uživatele z EHP je třeba získat platný souhlas s cookies a s použitím osobních údajů pro
  personalizaci reklam, **uchovávat záznamy o souhlasech**, jasně označit každou stranu, která
  údaje získá (Google), poskytnout výrazné a snadno dostupné informace o tom, jak tato strana
  údaje používá, a jasný návod k odvolání souhlasu.
- **Google Consent Mode** (https://support.google.com/google-ads/answer/10000067): v „basic"
  režimu jsou tagy Googlu zcela blokované, dokud uživatel nesouhlasí. V „advanced" režimu se tagy
  načtou hned a bez souhlasu posílají pingy bez cookies.

#### Jak to máme na webu (`src/components/CookieConsent.astro`, `src/data/legal/cookies.ts`)

- Lišta: „Přijmout vše" a „Odmítnout" v první vrstvě, stejně velká tlačítka (grid se stejnými
  sloupci), plus „Nastavení" a odkaz na zásady.
- Nastavení: přepínače analytické/marketingové **bez `checked`** (výchozí vypnuto), tlačítka
  „Přijmout vše" a „Uložit volbu". „Odmítnout vše" v panelu chybí, odmítnutí jde přes Uložit
  s vypnutými přepínači nebo přes Odmítnout v liště.
- Consent Mode v2 v **basic** režimu: dokud nepřijde souhlas, gtag.js se vůbec nenačte. Výchozí
  stav `denied` a pak `update` podle kategorií (analytics_storage; ad_storage + ad_user_data +
  ad_personalization). Po odvolání souhlasu skript maže `_ga`/`_gcl` cookies.
- Souhlas (i odmítnutí) se ukládá do `localStorage` (`pg-cookie-consent`) s verzí a časem,
  platnost 365 dní. Verze se zvedá při změně kategorií (verze 2 od přidání Google Ads, 10. 10. 2026).
- Odvolání: „Nastavení cookies" v patičce a tlačítko na stránce /cookies.
- Na /cookies a /zpracovani-osobnich-udaju se lišta automaticky nezobrazuje (nic se bez souhlasu stejně nenačte).
- Stránka Cookies: kategorie Nezbytné (12 měsíců), Analytické (GA4 `_ga`, `_ga_<ID>`, 2 roky),
  Marketingové (Google Ads `_gcl*`, 90 dnů, „Google může tyto údaje použít i k přizpůsobení reklam").

#### Rozdíl / riziko

V pořádku (podle zdrojů výše): opt-in, odmítnutí v první vrstvě se stejnou váhou, žádné
předzaškrtnutí, žádný cookie wall, odvolání v patičce, platnost 12 měsíců, po odmítnutí nové
zobrazení až za 12 měsíců (víc než minimum 6 měsíců), nové zobrazení po změně verze, basic
Consent Mode (bez souhlasu žádné volání Googlu).

Možné mezery:
1. **Prokazatelnost souhlasu.** § 89 odst. 3 chce „prokazatelný" souhlas, čl. 7 odst. 1 GDPR
   ukládá správci souhlas doložit a Google EU User Consent Policy výslovně chce „retain records
   of consent". Souhlas je dnes jen v prohlížeči návštěvníka, na straně správce žádný záznam
   neexistuje. Riziko: střední (běžná praxe malých webů, ale formálně slabé místo).
2. **První vrstva lišty nejmenuje Google ani personalizaci reklam.** Lišta říká jen, že
   marketingové cookies „měří, jestli funguje reklama na Googlu". Udělením souhlasu se ale
   zapne i `ad_personalization` (personalizace/remarketing) a `ad_user_data`. Google policy
   chce jasně označit stranu (Google) a její použití dat. Stránka Cookies personalizaci zmiňuje,
   lišta a panel ne. Riziko: střední (souhlas nemusí být plně „informovaný").
3. **Chybí odkaz na informace Googlu**, např. „Jak Google využívá informace z webů, které
   používají jeho služby" (https://policies.google.com/technologies/partner-sites). Policy
   chce „prominent and easily accessible information". Riziko: nízké až střední.
4. **Úplnost výčtu cookies.** ÚOOÚ trestá neúplný výčet. Google Ads/GA4 mohou s plným souhlasem
   nastavit i jiné cookies, než jsou uvedené (např. další `_gcl_*`, cookies na doménách Googlu).
   Výčet je potřeba ověřit v prohlížeči po udělení souhlasu. Doby uložení jsou podle
   komentáře v `cookies.ts` „odhad". Riziko: nízké až střední.
5. **Nezbytná „cookie" je ve skutečnosti `localStorage`.** Věcně nevadí (§ 89 odst. 3 se týká
   jakéhokoli ukládání v zařízení, viz i EDPB Guidelines 2/2023 k technickému rozsahu čl. 5
   odst. 3), ale text by mohl přesněji říkat „údaj v úložišti prohlížeče". Riziko: nízké.
6. „Odmítnout vše" v panelu Nastavení chybí. Odmítnutí je ale v první vrstvě a v panelu jsou
   přepínače výchozí vypnuté, takže „Uložit volbu" bez zásahu = odmítnutí. Podle ÚOOÚ
   i EDPB je podstatné, že odmítnutí je ve stejné vrstvě jako souhlas, a to v liště splněno je.
   Riziko: nízké (kosmetické, k úvaze).

#### ověřit u kvalifikované osoby
- zda je ukládání souhlasu jen v `localStorage` dostatečně „prokazatelné", nebo je potřeba
  záznam na serveru (anonymní ID + čas + verze + volba),
- zda text lišty stačí k informovanému souhlasu s personalizací reklam Google.

---

### 2. GDPR na formulářích

#### Co říká předpis (s odkazem)

- **Čl. 13 GDPR** (informace při získání údajů od subjektu): totožnost a kontakt správce, účely
  a právní základ, oprávněné zájmy (při čl. 6/1/f), příjemci, předání do třetích zemí a záruky,
  doba uložení, práva subjektu, právo odvolat souhlas, právo podat stížnost u ÚOOÚ, zda je
  poskytnutí údajů zákonným/smluvním požadavkem a následky neposkytnutí, automatizované
  rozhodování. https://eur-lex.europa.eu/eli/reg/2016/679/oj
- **Čl. 6 odst. 1 písm. b) GDPR**: zpracování je nezbytné pro „provedení opatření přijatých
  před uzavřením smlouvy na žádost tohoto subjektu údajů". Poptávka konzultace nebo výpočtu
  hypotéky z iniciativy návštěvníka sem typicky spadá. Souhlas (písm. a) pak potřeba není a
  nemá se vyžadovat „pro jistotu" (EDPB Guidelines 2/2019 k čl. 6/1/b a Guidelines 05/2020
  k souhlasu, https://www.edpb.europa.eu). **Ověřit u kvalifikované osoby.**
- **Čl. 5 odst. 1 písm. c) a e)**: minimalizace a omezení uložení. **Čl. 28**: smlouva se
  zpracovatelem (hosting/e-mail Wedos, Google Workspace). **Čl. 32**: přiměřené zabezpečení
  (HTTPS, přístup ke schránce, 2FA). **Čl. 44 a násl.**: předání mimo EHP. Pro USA platí
  rozhodnutí o odpovídající ochraně EU–US Data Privacy Framework (2023/1795, 10. 7. 2023).
  Tribunál žalobu Latombe zamítl 3. 9. 2025 (T-553/23), **odvolání C-703/25 P je u Soudního
  dvora** (https://eur-lex.europa.eu/eli/C/2025/6610/oj). Stav je potřeba průběžně sledovat.
- **Čl. 9 GDPR – zvláštní kategorie (zdraví)** a **SDEU C-184/20 (1. 8. 2022)**: zvláštní
  kategorií jsou i údaje, ze kterých lze citlivou informaci (např. zdravotní stav) **nepřímo
  vyvodit**. Zpracovat je lze jen při výjimce podle čl. 9 odst. 2 (typicky výslovný souhlas).
- **Antispam:** honeypot, měření doby vyplnění a krátkodobý otisk IP se běžně opírají
  o oprávněný zájem (čl. 6/1/f, recitál 49 – bezpečnost sítě). Musí to být uvedeno
  v informacích a uchováno jen nezbytně dlouho.
- **Obchodní sdělení e-mailem – § 7 zákona 480/2004 Sb.** (ověřeno): elektronický kontakt
  lze k obchodním sdělením použít jen s **předchozím souhlasem**. Výjimka podle odst. 3 platí
  pro vlastního **zákazníka** (kontakt získaný „v souvislosti s prodejem výrobku nebo služby"),
  jen pro vlastní obdobné služby a s možností odmítnutí v každé zprávě. Podle odst. 4 musí být
  e-mail označen jako obchodní sdělení, nesmí skrývat odesílatele a musí mít adresu pro
  odhlášení. Pojem obchodní sdělení je v § 2 písm. f). Pro pojištění navíc **§ 73 odst. 3
  ZDPZ**: „každé obchodní sdělení jasně označit slovy ‚obchodní sdělení'".

#### Jak to máme na webu

- **Kontaktní formulář** (`ContactSection.astro`): jméno, telefon, e-mail (povinné), oblast
  zájmu (povinná), popis situace (nepovinný). Honeypot `website`, minimální doba 3 s, limit
  8 odeslání/h z IP. IP se uchovává jako hash max. 1 h (`public/api/poptavka.php`). Pod
  formulářem je text „Údaje použiji pouze pro vyřízení vaší poptávky a navazující komunikaci"
  a odkaz na zásady. Žádný souhlas se nesbírá (správně, základ je 6/1/b).
- **Odeslání:** PHP pošle e-mail na `patrik@mintfinance.cz` (Google Workspace) **a zálohu na
  `poptavka@patrikgajdadzis.cz` (schránka u Wedosu)**. Klient dostane potvrzovací e-mail
  (transakční, bez reklamy).
- **„Na kolik dosáhnete?"** (`na-kolik-dosahnete.astro`): typ příjmu (Zaměstnanec, OSVČ,
  **Invalidní důchod**, Rodičovská nebo mateřská, Jiný) pro jednoho až dva žadatele, čistý
  příjem / roční příjmy z daňového přiznání, paušální výdaje, splátky úvěrů, limit karty,
  počet dětí, věk, úspory, jiná nemovitost k zástavě, termín koupě. K tomu jméno, telefon
  (povinné) a e-mail (nepovinný). Vše se pošle e-mailem stejnou cestou. Pod formulářem je
  stejná krátká věta a odkaz na zásady.
- **Finanční check-up:** vyhodnocení v prohlížeči. Odpovědi se volitelně přes `sessionStorage`
  předají do pole „situace" kontaktního formuláře a odešle je až návštěvník.
- **Zásady zpracování** (`privacy.ts`): správce, účely kontaktního formuláře a rezervace,
  základ 6/1/b (a oprávněný zájem po neúspěšné poptávce), GA/Ads na souhlas, příjemci (Wedos,
  Google Workspace, Google Kalendář, GA/Ads + DPF), lhůty (6 měsíců / 10 let / 14 měsíců /
  90 dnů), práva, ÚOOÚ.

#### Rozdíl / riziko

1. **Zásady neodpovídají formuláři „Na kolik dosáhnete?" – vysoké.** `privacy.ts` výslovně říká,
   že formulář nesbírá „konkrétní finanční údaje (… výše příjmů, stav úvěrů)". Formulář na
   /sluzby/hypoteky/na-kolik-dosahnete ale přesně tyto údaje sbírá (příjmy, splátky, limity,
   věk, děti, zástava). Tvrzení je nepravdivé a čl. 13 pro tento formulář splněný není (chybí
   kategorie údajů, účel výpočtu bonity a doba uložení). Zásady také nezmiňují odeslání výsledku
   check-upu ani zálohovou schránku u Wedosu.
2. **„Invalidní důchod" jako typ příjmu – středně vysoké.** Volba prozrazuje zdravotní stav
   žadatele (případně i spolužadatele). Podle C-184/20 jde nejspíš o údaj zvláštní kategorie
   (čl. 9), pro který 6/1/b nestačí a je potřeba výjimka podle čl. 9/2 (výslovný souhlas).
   Možné řešení k ověření: obecnější volba (např. „Důchod" nebo „Jiný příjem, např. důchod")
   a upřesnění až na konzultaci. Totéž platí pro volné pole „Stručně popište situaci", kam
   může člověk napsat zdravotní údaje (např. u pojištění). Zásady by měly říct, ať tam citlivé
   údaje nepíše.
3. **Údaje o druhém žadateli.** Formulář sbírá příjem a věk spolužadatele, který formulář sám
   nevyplňuje. Ten musí dostat informace podle **čl. 14** (údaje nezískané od subjektu),
   nejpozději při prvním kontaktu. Riziko: střední, typicky to řeší dokumentace BEplanu na
   schůzce. **Ověřit.**
4. **Předání mimo EU u Google Workspace a Kalendáře – střední.** Odstavec o předání mimo EU
   byl 25. 8. 2026 na přání uživatele odstraněn. DPF teď zásady zmiňují jen u GA/Ads. Google
   Workspace (schránka s poptávkami) a Kalendář jsou ale také služby Googlu s možným předáním
   do USA. Čl. 13 odst. 1 písm. f) chce informaci o záměru předat údaje do třetí země a o
   zárukách. Vhodné doplnit jednu větu i pro Workspace/Kalendář.
5. **WhatsApp a Google Meet** jsou na webu nabídnuté jako kanály, v zásadách chybí (Meta jako
   samostatný správce/příjemce). Riziko: nízké.
6. **Smlouvy se zpracovateli (čl. 28)** s Wedosem a Googlem (Workspace DPA) – na webu je to
   nevidět, je potřeba ověřit, že existují (obvykle součást obchodních podmínek). Riziko: nízké.
7. **Krátký text u formulářů** je v pořádku jako první vrstva (vrstvený přístup podle
   pokynů k transparentnosti WP260), ale mohl by říkat správce a právní základ, např.:
   *„Správcem je Patrik Gajdadzis, IČO 09214526. Údaje zpracuji k vyřízení vaší poptávky
   (opatření před uzavřením smlouvy, čl. 6 odst. 1 písm. b) GDPR) a pak je smažu podle
   Zásad zpracování osobních údajů."* U „Na kolik dosáhnete?" navíc: *„Údaje o příjmech
   a závazcích použiji jen k orientačnímu výpočtu, na kolik můžete dosáhnout."* Formulaci
   ověřit u kvalifikované osoby.
8. **Marketing:** formuláře žádný marketingový souhlas nesbírají a zásady slibují „jen pro
   vyřízení poptávky". Je to konzistentní. Případný newsletter nebo nabídky e-mailem
   kontaktům z formuláře by vyžadovaly souhlas (§ 7/2 zákona 480/2004), nebo by u stávajících
   klientů šlo o výjimku podle § 7/3 s odhlášením v každém e-mailu. U pojištění k tomu přistupuje
   označení „obchodní sdělení". Potvrzovací e-mail je transakční a tak by měl zůstat
   (bez nabídek produktů).
9. **Zabezpečení:** HTTPS a e-mail bez ukládání na webu jsou v pořádku. U citlivých
   finančních údajů posílaných e-mailem doporučuji 2FA na obou schránkách a omezit přístup
   k zálohové schránce u Wedosu (ověřit, kdo k ní má přístup a jak dlouho se poptávky drží).

#### ověřit u kvalifikované osoby
- právní základ pro formulář s příjmy (6/1/b je pravděpodobný, ale ověřit), zacházení
  s „Invalidní důchod" podle čl. 9, informace pro spolužadatele (čl. 14),
- lhůta 10 let (AML zákon 253/2008 Sb.) a zda ji nese Patrik, nebo BEplan jako zastoupený.

---

### 3. Povinné údaje vázaného zástupce na webu a v propagaci

#### Co říká předpis (s odkazem; paragrafy ověřené v aktuálním textu)

**Spotřebitelský úvěr – ZSÚ 257/2016 Sb.** (https://www.zakonyprolidi.cz/cs/2016-257)
- **§ 76 odst. 2**: z jednání musí být spotřebiteli zřejmé, zda jde o vázaného zástupce,
  a **„u vázaného zástupce … musí být z jeho jednání zřejmá osoba zastoupeného"**.
- **§ 77**: komunikace „včetně propagačního sdělení" nesmí být nejasná, nepravdivá, zavádějící
  nebo klamavá a nesmí vyvolávat klamné očekávání o dostupnosti úvěru a výši nákladů.
- **§ 81**: pojem „nezávislý" smí použít jen ten, kdo zvažuje produkty většiny poskytovatelů
  na trhu a nemá odměňování závislé na prodejních cílech.
- **§ 91 – Povinné informace uváděné v reklamě**: obsahuje-li reklama na úvěr nebo jeho
  zprostředkování **jakýkoli číselný údaj o nákladech**, musí uvést (u úvěru na bydlení) jméno
  poskytovatele, případně zprostředkovatele, požadavek na zajištění, **RPSN** (alespoň stejně
  zřetelně jako úrokovou sazbu), zápůjční úrokovou sazbu (pevná/pohyblivá) a poplatky, celkovou
  výši úvěru, výši a počet splátek, celkovou splatnou částku, dobu trvání a povinné doplňkové
  služby (pojištění). Údaje c) až j) **formou reprezentativního příkladu** (odst. 2).
  *(Ve vašem zadání bylo „§ 92–93 reklama"; podle aktuálního textu je reklama v § 91, § 92 jsou
  informace trvale přístupné u **poskytovatele**, § 93 informace o **zprostředkovateli**.)*
- **§ 93 – Informace týkající se zprostředkovatele**: s dostatečným předstihem před
  zprostředkováním informace o: postavení (vázaný zástupce), kontaktech zprostředkovatele
  **i zastoupeného**, **registru, registračním čísle a postupu ověření**, radě (§ 85), zákazu
  svazování s doplňkovou službou, odměně od poskytovatele u úvěru na bydlení, právu vyžádat si
  výši provizí jednotlivých poskytovatelů, interním vyřizování stížností, finančním arbitrovi
  a **orgánu dohledu**. **§ 93 odst. 3**: „Při **prvním navázání kontaktu** se spotřebitelem"
  sdělí zprostředkovatel aspoň, že je vázaný zástupce, a **kterého zastoupeného zastupuje**.
- **ČNB, stanovisko RS2017-02 „K některým ustanovením zákona č. 257/2016 Sb."** (platnost od
  5. 4. 2017,
  https://www.cnb.cz/cs/dohled-financni-trh/legislativni-zakladna/stanoviska-k-regulaci-financniho-trhu/RS2017-02/):
  otázky 8–10 řeší načasování a obsah informací podle § 93 (u vázaného zástupce samostatného
  zprostředkovatele se informace podle § 93/1/b týkají i zastoupeného). Otázka 25 řeší weby:
  posuzuje se **veškerý obsah webu**. Poznámka 11: formulář, kde zájemce vyplňuje „zdroje a výši
  příjmů, kolik si chce půjčit…", lze považovat za **nabízení možnosti sjednat úvěr, tedy
  zprostředkování**.

**Pojištění – ZDPZ 170/2018 Sb.** (https://www.zakonyprolidi.cz/cs/2018-170)
- **§ 72 odst. 2**: jednat tak, aby bylo zákazníkovi zřejmé, „v jaké pozici a jménem koho" jedná.
- **§ 73**: žádné nejasné/klamavé informace „včetně obchodního sdělení". **§ 73 odst. 3**:
  „každé obchodní sdělení jasně označit slovy ‚obchodní sdělení'".
- **§ 88 – Informace o pojišťovacím zprostředkovateli**: jméno, sídlo, postavení vázaného
  zástupce, registr, **stížnosti včetně možnosti obrátit se na ČNB** a mimosoudní řešení,
  jméno zastoupeného, jména pojišťoven, povaha odměny a kdo ji platí. Poskytuje se
  **s dostatečným předstihem před sjednáním** (§ 92 odst. 2), tedy ne nutně na webu.
- **§ 75**: zákaz výhod, které mohou vést k porušení povinností. **§ 49**: zákaz vstupních
  plateb a odměn odvozených od získání dalších osob pro distribuci.

**Investice – ZPKT 256/2004 Sb.** (https://www.zakonyprolidi.cz/cs/2004-256)
- **§ 32a**: vázaný zástupce smí pro **jednoho** zastoupeného (obchodník s CP nebo investiční
  zprostředkovatel) zařizovat obchody, poskytovat investiční poradenství nebo **propagovat
  investiční služby** zastoupeného (odst. 1 písm. c).
- **§ 32k písm. c) a d)**: zastoupený zajistí, že vázaný zástupce **sděluje zákazníkům
  a potenciálním zákazníkům údaje o osobě zastoupeného** a **které činnosti podle § 32a
  odst. 1 je oprávněn vykonávat a ve vztahu ke kterým investičním nástrojům**.
- **§ 15a odst. 1** (na investičního zprostředkovatele se použije přes § 32 odst. 6):
  komunikace „včetně … propagačního sdělení" nesmí být klamavá a **u propagačního sdělení musí
  být z obsahu a formy zřejmé, že jde o propagační sdělení**. Podrobnosti jsou v čl. 44 nařízení
  (EU) 2017/565 (např. nezdůrazňovat výnosy bez rizik a minulé výnosy jen s upozorněním).
- BEplan finanční plánování s.r.o., IČO 05779944, Kolbenova 931/40b, Praha 9, je podle
  příkazu ČNB č. j. 2021/46791/570 ze 4. 5. 2021 samostatný zprostředkovatel (ZSÚ, ZDPZ)
  a investiční zprostředkovatel (ZPKT). V příkazu dostal pokutu mj. za **nesdělení výše
  pobídek** a **neposkytnutí informací podle § 93 ZSÚ s dostatečným předstihem**
  (https://www.cnb.cz/export/sites/cnb/cs/dohled-financni-trh/.galleries/prilohy/S-Sp-2020_00317_CNB_573.pdf).
  Ukazuje to, na co se ČNB u tohoto zastoupeného dívá. Aktuální sídlo je potřeba ověřit v JERRS.

**Doplňkové penzijní spoření – zákon 427/2011 Sb.** (https://www.zakonyprolidi.cz/cs/2011-427)
- **§ 74 odst. 1**: zprostředkovávat DPS smí jen samostatný zprostředkovatel nebo vázaný
  zástupce **podle tohoto zákona**. Od novely zákonem č. 119/2020 Sb. jde o samostatnou
  registraci v registru ČNB (přechodná ustanovení čl. VIII).

**Obecně**
- **§ 435 odst. 1 občanského zákoníku** (ověřeno): podnikatel uvádí „v rámci informací
  zpřístupňovaných veřejnosti prostřednictvím dálkového přístupu" **jméno a sídlo**, údaj
  o zápisu do rejstříku/evidence (u OSVČ živnostenský rejstřík) a identifikující údaj (IČO).
- **§ 14 ZOS 634/1992** (ověřeno): informovat o věcně příslušném subjektu mimosoudního řešení
  **včetně jeho internetové adresy**, a to i na webu. **§ 20e ZOS**: ve finančních službách
  finanční arbitr v rozsahu své působnosti, jinak ČOI. **§ 1 odst. 1 písm. e) zákona
  229/2002**: finanční arbitr řeší u pojištění **jen životní pojištění**. Pro **neživotní
  pojištění** je tak příslušná ČOI (případně Kancelář ombudsmana ČAP), viz ČNB
  (https://www.cnb.cz/cs/verejnost/kontakty/stiznosti-na-financni-instituce/soud-nebo-subjekt-mimosoudniho-reseni-sporu/).
- **§ 4–5a ZOS**: zákaz nekalých (klamavých) praktik. **§ 5a odst. 5**: zpřístupňuje-li
  podnikatel spotřebitelské recenze, je podstatnou informací, **zda a jak zajišťuje, že
  recenze pocházejí od skutečných zákazníků**. Příloha 1 písm. y) a z): zakázané praktiky
  u recenzí.

#### Jak to máme na webu (`src/data/legal/regulatory.ts`, patička, formuláře)

- /regulatorni-informace: jméno, IČO, telefon, adresa konzultací (17. listopadu 599/30,
  Ostrava-Poruba), MINT reality a finance s.r.o. (tým), **vázaný zástupce BEplan finanční
  plánování s.r.o.** pro ZSÚ / ZDPZ / ZPKT (bez IČO a sídla BEplanu), odkaz na JERRS,
  osvědčení VECTOR, odměňování provizí, stížnosti „nejdřív na mě" + finanční arbitr (adresa
  bez webu), upozornění na rizika investic.
- V komentáři: „registrační číslo vědomě není" a datum registrace se nezveřejňuje. Text na
  stránce přitom říká „nejsou to registrační čísla v registru ČNB, **ta jsou uvedená výše**",
  ale výše žádné číslo není.
- BEplan se **nikde jinde na webu** neuvádí (patička ho záměrně vynechává). Formuláře, stránky
  služeb, kalkulačka ani potvrzovací e-mail status vázaného zástupce neobsahují.
- /sluzby/penze nabízí penzijní spoření, regulatorní tabulka ale zákon 427/2011 neuvádí.
- Slovo „nezávislý" se v copy nepoužívá (v pořádku vůči § 81 ZSÚ).
- Články: např. `vyplati-se-cekat-s-hypotekou-na-nizsi-urok.mdx` a
  `nejdriv-hypoteka-potom-nemovitost.mdx` obsahují konkrétní sazby (5,5 %, 7,5 %) a splátky.
- /recenze: vybrané recenze s odkazem na Google profil, bez informace o ověřování recenzí.

#### Rozdíl / riziko

1. **Status vázaného zástupce není zřejmý při prvním kontaktu – vysoké.** § 93 odst. 3 ZSÚ
   (a obdobně § 72/2 ZDPZ a § 32k/c ZPKT) chce při **prvním navázání kontaktu** sdělit, že jde
   o vázaného zástupce a koho zastupuje. Pro lidi z Google Ads je prvním kontaktem web nebo
   formulář, BEplan je ale jen na jedné podstránce v patičce. Podle ČNB (RS2017-02, ot. 25,
   pozn. 11) je formulář „Na kolik dosáhnete?" s údaji o příjmech nejspíš už samotným
   zprostředkováním. Doporučení k ověření: jedna stálá věta v patičce všech stránek
   a v potvrzovacím e-mailu, např. *„Patrik Gajdadzis, IČO 09214526, je vázaným zástupcem
   společnosti BEplan finanční plánování s.r.o., IČO 05779944, zapsaným v registru ČNB."*
   s odkazem na /regulatorni-informace.
2. **Chybí údaje o zastoupeném a orgánu dohledu – středně vysoké.** § 93/1/b ZSÚ: kontakty
   zastoupeného. § 32k/c ZPKT: „údaje o osobě zastoupeného" (název, sídlo, IČO). § 93/1/k ZSÚ
   a § 88/1/c ZDPZ: orgán dohledu (ČNB) a možnost stížnosti u ČNB. Na webu je jen název
   BEplanu a „registrovaný u ČNB". Doplnit IČO a sídlo BEplanu a větu „Orgánem dohledu je
   Česká národní banka, Na Příkopě 28, Praha 1, www.cnb.cz; stížnost lze podat i u ČNB."
3. **Rozsah oprávnění u investic – střední.** § 32k/d ZPKT: sdělovat, které činnosti podle
   § 32a/1 a u kterých investičních nástrojů vázaný zástupce smí vykonávat. Tabulka říká jen
   „Investice – vázaný zástupce". Doplnit podle zápisu v JERRS (např. „přijímání a předávání
   pokynů a investiční poradenství u podílových listů fondů kolektivního investování").
   Upřesnit podle skutečného zápisu.
4. **Penzijní spoření (427/2011) v tabulce chybí – střední.** Web DPS propaguje. V JERRS je
   potřeba ověřit, zda je Patrik zapsán jako vázaný zástupce i podle zákona 427/2011, a podle
   toho doplnit řádek, nebo upravit /sluzby/penze.
5. **Registrační číslo a vnitřní rozpor textu – střední.** § 93/1/c ZSÚ výslovně uvádí
   „registrační číslo a postup ověření registrace". Komentář v kódu tvrdí, že ČNB u vázaných
   zástupců žádné číslo nevede. Nenašel jsem oficiální zdroj, který by to potvrdil nebo
   vyvrátil. V JERRS se dohledává podle IČO a stránka má subjekt se svým ID. Text „ta jsou
   uvedená výše" je každopádně nepravdivý. Doporučení: uvést „Registraci ověříte v registru
   ČNB (JERRS) podle IČO 09214526" a opravit větu. **Ověřit u compliance BEplanu, co přesně
   uvádět jako registrační číslo.**
6. **Mimosoudní řešení – střední.** § 14 ZOS chce i **internetovou adresu** subjektu: doplnit
   www.finarbitr.gov.cz. Finanční arbitr navíc nepokrývá neživotní pojištění (majetek,
   odpovědnost, auto), které web nabízí. Pro ně doplnit ČOI (https://adr.coi.cz), případně
   ombudsmana ČAP. Ověřit, co uvádí BEplan.
7. **Čísla v článcích a reklama na úvěr (§ 91 ZSÚ) – střední.** Konkrétní sazby a splátky
   v článcích na webu vázaného zástupce, který na konci článku nabízí konzultaci k hypotéce,
   mohou být posouzeny jako reklama s „číselným údajem o nákladech", a pak by bylo potřeba
   uvést RPSN a reprezentativní příklad. Zatím jde o ilustrativní/tržní údaje (průměrná sazba,
   modelový výpočet), nikoli nabídku. Hranice ale není jistá. Totéž platí pro **text reklam
   v Google Ads**: jakmile reklama uvede sazbu nebo splátku, platí § 91 naplno.
8. **Odměňování – nízké až střední.** Text „Provize … Nejde o částku navíc nad rámec toho, co
   byste za produkt platili tak jako tak" je potřeba ověřit hlavně u investic (vstupní
   poplatky jdou často zprostředkovateli a jsou skutečnou částkou navíc). U hypoték ZSÚ
   § 93/1/f a h ukládá sdělit výši odměny a právo vyžádat si provize, to ale řeší dokumenty
   BEplanu. Tvrzení „bez poplatků/zdarma" u investic posoudit vůči § 77 ZSÚ, § 15a ZPKT
   a § 5 ZOS. **Ověřit.**
9. **Recenze – nízké.** § 5a odst. 5 ZOS: doplnit k recenzím větu, odkud pocházejí a zda je
   web nějak ověřuje (např. *„Recenze jsou převzaté z veřejného profilu na Googlu, který je
   vede; sám je neověřuji ani neupravuji."*). Formulaci ověřit.
10. **Sídlo vs. adresa konzultací – nízké.** § 435 OZ chce na webu **sídlo** a údaj o zápisu
    (živnostenský rejstřík). Web uvádí adresu konzultací, ověřit, zda je to i sídlo
    z živnostenského rejstříku.
11. **Označení „obchodní sdělení" (§ 73/3 ZDPZ) a „propagační sdělení" (§ 15a ZPKT) –
    nejasné.** Oficiální výklad ČNB k tomu, zda se má takto označovat web nebo stránka služby,
    jsem nenašel. V praxi se označují hlavně e-mailové a reklamní kampaně. U e-mailů s nabídkou
    pojištění a u reklam to ale platí. **Ověřit u compliance BEplanu** (zastoupený odpovídá
    za vázaného zástupce a mívá interní pravidla propagace, která je potřeba dodržet).

#### ověřit u kvalifikované osoby
- zda a v jakém rozsahu je web „prvním navázáním kontaktu" (§ 93/3 ZSÚ) a co přesně musí být
  na webu a co stačí v dokumentech BEplanu,
- registrační číslo, rozsah investičních činností, registrace pro DPS,
- zda články s čísly jsou reklamou podle § 91 ZSÚ,
- interní pravidla BEplanu pro propagaci a weby vázaných zástupců (běžně existují a mohou
  vyžadovat schválení obsahu).

---

### 4. Reklamy na finanční služby (Google Ads)

#### Co říká předpis / pravidla Googlu (s odkazem)

- **Ověření finančních služeb (Financial Services Verification) pro Česko:**
  - Oznámení Googlu z 23. 6. 2026 (https://support.google.com/adspolicy/answer/17127726):
    rozšíření na 24 trhů EHP **včetně Česka**. Inzerenti v rozsahu musí ověření dokončit
    „when requested by Google". Kategorie: bankovnictví, kreditní karty, **úvěry**,
    **investice**, makléřské služby, **pojištění** (výčet není úplný). Postupné vymáhání
    od 23. 7. 2026.
  - Stránka regulátorů a termínů (https://support.google.com/adspolicy/answer/12390454):
    pro **Česko uvádí začátek vymáhání 15. 9. 2026**. Regulátoři: ČNB, KAČR, KDP, MSp, MPO,
    EBA, EIOPA, ESMA. *(Dvě stránky Googlu si datem odporují. Platí to, co Google sdělí
    v notifikaci v účtu.)*
  - Česká stránka postupu (https://support.google.com/adspolicy/answer/15332527?co=GENIE.CountryCode%3DCZ):
    **Authorized (First Party) Advertiser** = přímo oprávněný regulátorem, ověřuje se přes
    G2 a údaje musí „exactly match" s registrem. **Approved Third Party** = propaguje služby
    se souhlasem oprávněného subjektu, **sám žádat nemůže**, žádost za něj podává oprávněný
    subjekt (zastoupený) s Customer ID účtu. Neověření zatím nevede k pozastavení účtu, ale
    omezí zobrazování reklam v rozsahu ověření.
  - Vázané zástupce Google výslovně neřeší. Vázaný zástupce je zapsán v registru ČNB, ale
    oprávnění odvozuje od zastoupeného. Může tedy jít o „Authorized" (zápis v JERRS pod
    vlastním IČO), nebo o „Approved Third Party" (žádost podá BEplan). **Nejasné, ověřit
    u Googlu/G2 a u BEplanu.**
- **Zásady Google „Financial products and services"** (https://support.google.com/adspolicy/answer/2464998):
  zveřejnit fyzickou adresu podniku a všechny poplatky, informace musí být hned viditelné
  bez prokliku. U **osobních půjček** (nesplácené jednorázově, ne na pořízení fixního aktiva)
  musí cílová stránka uvádět minimální a maximální dobu splácení, maximální RPSN a
  reprezentativní příklad. Hypotéky na koupi nemovitosti pod definici „personal loans"
  pravděpodobně nespadají (výjimka pro „fixed asset"), Google to ale výslovně neuvádí.
  Platí i místní předpisy, tedy § 91 ZSÚ pro reklamu s čísly.

#### Jak to máme na webu

- Google Ads (`AW-18127073321`) a konverze (formulář, telefon, rezervace, WhatsApp) jen se
  souhlasem. Podle commitů běží kampaně (protokol Google Ads, vyloučení konkurence).
- Na webu je adresa (17. listopadu 599/30) a „bez poplatků/zdarma".
- Stav ověření finančních služeb v účtu Google Ads jsem z repozitáře zjistit nemohl.

#### Rozdíl / riziko

1. **Ověření v Google Ads – vysoké pro provoz kampaní.** Hypotéky, pojištění i investice jsou
   v rozsahu. Pokud v účtu přišla výzva a ověření není hotové, reklamy na finanční služby se
   v Česku od termínu vymáhání (15. 9. 2026 podle stránky termínů) nezobrazí. Nejdřív
   zkontrolovat v Google Ads (Zásady/Ověření inzerenta), zda je výzva aktivní, a se
   zastoupeným domluvit cestu (Authorized vs. Approved Third Party).
2. **Texty reklam:** reklama se sazbou, splátkou nebo „od X %" spouští § 91 ZSÚ (RPSN,
   reprezentativní příklad). Bezpečnější jsou reklamy bez čísel o nákladech.
3. Cílová stránka hypoték: adresa a poplatky (žádné) jsou dostupné, pro personal loans
   Google nic dalšího nevyžaduje (web je nenabízí).

#### ověřit u kvalifikované osoby
- jakou cestou ověřit vázaného zástupce v Google/G2 a zda ji podává BEplan,
- zda konkrétní texty reklam spadají pod § 91 ZSÚ.

---

### 5. Odměny za doporučení klientů (tipaři)

#### Co říká předpis (s odkazem)

- **ZSÚ § 3 odst. 1 písm. b)**: zprostředkováním je mj. nabízení možnosti sjednat úvěr,
  přípravné práce **včetně doporučení vedoucího ke sjednání**. **§ 4 odst. 4 písm. b)**: zákon
  se nepoužije na „pouhé poskytování obecných informací o produktech … za předpokladu, že
  účelem takové činnosti není napomáhat uzavření" smlouvy.
- **ČNB RS2017-02, otázka 25** (ZSÚ): tipařství je vyjmuté z působnosti ZSÚ. Činnost tipaře
  „nesmí přesáhnout hranici, kdy v obecné rovině zjistí zájem spotřebitele o případné
  uzavření smlouvy o úvěru … a tuto informaci společně s kontaktními údaji zájemce předá"
  zprostředkovateli. Hranici překračuje sdělování vlastností konkrétního produktu (sazba,
  splátky), analýza s doporučením („doporučujeme", „tip", „nejvýhodnější") a aktivity
  směřující k **získání** zájemce, ne jen k jeho „vytipování".
- **ČNB RS2011-0004 „K vymezení hranice mezi tipařstvím a zprostředkováním pojištění"**
  (platnost od 10. 5. 2011, ještě podle starého zákona 38/2004 Sb.; ČNB na něj v RS2017-02
  odkazuje jako na stále použitelný přístup,
  https://www.cnb.cz/cs/dohled-financni-trh/legislativni-zakladna/stanoviska-k-regulaci-financniho-trhu/RS2011-0004):
  tipař bez registrace jen zjistí obecný zájem o pojištění a předá ho spolu s kontaktem.
  Nevyžaduje to odbornost a nepodléhá to dohledu ČNB. **ZDPZ § 2 odst. 1 písm. e)** definuje
  zprostředkování (nabízení, předkládání návrhů, přípravné práce včetně doporučení…),
  **§ 3 odst. 1 písm. a)** vyjímá pouhé obecné informace, jejichž účelem není napomáhat
  sjednání.
- **ZPKT § 2 odst. 1 písm. y)** (ověřeno): zprostředkování obchodů s investičními nástroji
  (nabízení, předkládání návrhů, přípravné práce včetně doporučení…). **ČNB RS2017-25**
  (https://www.cnb.cz/cs/dohled-financni-trh/legislativni-zakladna/stanoviska-k-regulaci-financniho-trhu/RS2017-25/):
  tipař „pouze v obecné rovině zjistí zájem osoby o případné uzavření smlouvy týkající se
  investičních nástrojů" a předá kontakt. Hranici překračuje diskuse nebo propagace
  konkrétního nástroje. **Pozor: stanovisko má platnost do 18. 11. 2022**, aktuálnější verzi
  jsem nenašel. Odborný článek (AK Schejbal, 12. 5. 2020,
  https://akschejbal.cz/konec-investicnich-tiparu-v-cechach-na-morave-a-ve-slezsku) zmiňuje
  zpřesnění definice od 1. 5. 2020 a § 30c odst. 2 ZPKT (přičitatelnost jednání). Doporučuje
  pevnou odměnu tipaře spíš než provizi z objemu. Jde o názor advokáta, ne o výklad ČNB.
- **Kdo smí odměnu vyplácet:** **§ 78 ZSÚ** a **§ 75 ZDPZ** zakazují pobídky, které mohou
  vést k porušení povinností (včetně „neobvyklé úplaty" nebo „neopodstatněné výhody").
  **§ 82 odst. 2 ZSÚ** a **§ 49 odst. 2 ZDPZ**: odměny za zprostředkování se nesmí
  odvozovat od získání dalších osob **pro tuto činnost** (zákaz „pyramid" u zprostředkovatelů,
  ne přímo u klientských doporučení). U investic platí pravidla pobídek (§ 15–15e ZPKT
  a vyhláška 308/2017 Sb.). BEplan už byl za nesdělení pobídek pokutován (viz sekce 3).
- **Daně a forma:** odměna tipaři je jeho příjem (u fyzické osoby typicky ostatní příjem
  podle zákona o daních z příjmů). Daňovou stránku jsem nezkoumal. **Ověřit u daňového
  poradce.**

#### Jak to máme na webu

Formulář „Doporučit známého" zatím na webu není (Patrik ho zvažuje). Web dnes nemá žádný
program odměn.

#### Rozdíl / riziko

1. **Formulář sám o sobě:** doporučující jen zadá kontakt na známého a obecný zájem (oblast).
   To odpovídá vymezení tipaře podle ČNB. Riziko roste, pokud by stránka nebo program vedly
   doporučujícího k tomu, aby známému produkt **doporučoval**, porovnával nebo „přesvědčoval",
   nebo pokud by odměna závisela na objemu sjednaného produktu (provize). ČNB i advokátní
   praxe takový model vidí jako náznak zprostředkování bez oprávnění. Bezpečnější varianta
   k ověření: malá pevná odměna (nebo dárek), jen za předání kontaktu nebo za uskutečněnou
   konzultaci, ne za sjednání produktu, a bez instrukcí k doporučování.
2. **GDPR u doporučovaného – vysoké, pokud se formulář spustí.** Doporučující vkládá osobní
   údaje **třetí osoby** (jméno, telefon). Je potřeba (a) právní základ pro zpracování
   (obvykle oprávněný zájem, nebo lépe postup, kdy doporučující jen předá Patrikův kontakt,
   případně potvrdí, že známý s předáním souhlasí), (b) informovat doporučovaného podle
   **čl. 14 GDPR** nejpozději při prvním kontaktu a (c) **nepoužít jeho e-mail k obchodním
   sdělením bez souhlasu** (§ 7 zákona 480/2004). Telefonování s nabídkou může narážet na
   pravidla pro nevyžádané hovory v zákoně 127/2005 Sb. (nezkoumal jsem).
3. **Informace o odměně na webu** musí být pravdivá a úplná (§ 77 ZSÚ, § 73 ZDPZ, § 5 ZOS):
   podmínky, výše, kdy se vyplácí. Odměna by neměla vytvářet tlak na sjednání („odměna jen
   když si známý sjedná hypotéku" je rizikovější).
4. **Souhlas zastoupeného:** tipařské programy vázaného zástupce obvykle podléhají smlouvě
   a interním pravidlům zastoupeného (BEplan odpovídá za jednání vázaného zástupce; u investic
   výslovně § 30c ZPKT). Bez souhlasu BEplanu nespouštět.

#### ověřit u kvalifikované osoby
- zda zamýšlený model (výše a forma odměny, za co se platí) zůstává v mezích „tipařství"
  ve všech třech oblastech (úvěr, pojištění, investice), a zda ho BEplan povoluje,
- právní základ a informační povinnost vůči doporučované osobě, daňové zacházení s odměnou.

---

### Co na webu ověřit nebo doplnit (seřazeno podle rizika)

**Vysoké**
1. **Zásady zpracování neodpovídají formuláři „Na kolik dosáhnete?"**: zásady tvrdí, že se
   nesbírají příjmy ani úvěry, formulář je sbírá. Doplnit kategorie údajů, účel, základ
   a dobu uložení. Zmínit i odeslání výsledku check-upu a zálohovou schránku u Wedosu.
   (`src/data/legal/privacy.ts`)
2. **Status vázaného zástupce při prvním kontaktu**: stálá věta v patičce všech stránek
   a v potvrzovacím e-mailu (vázaný zástupce BEplan finanční plánování s.r.o., IČO 05779944,
   registr ČNB, odkaz na /regulatorni-informace). (§ 93/3 a § 76/2 ZSÚ, § 72/2 ZDPZ, § 32k/c ZPKT)
3. **Google Ads – ověření finančních služeb**: zkontrolovat v účtu, zda je výzva aktivní.
   Pro Česko je podle Googlu vymáhání od 15. 9. 2026. Domluvit s BEplanem cestu ověření.
4. **„Invalidní důchod" ve formuláři**: možný údaj o zdraví (čl. 9 GDPR, C-184/20). Nahradit
   obecnější volbou, nebo řešit výslovným souhlasem. Ověřit.
5. Před případným spuštěním **„Doporučit známého"**: model odměny v mezích tipařství, souhlas
   BEplanu, informační povinnost vůči doporučovanému (čl. 14), žádný marketing bez souhlasu.

**Středně vysoké / střední**
6. Na /regulatorni-informace doplnit **IČO a sídlo BEplanu**, **ČNB jako orgán dohledu**
   a možnost stížnosti u ČNB. (§ 93/1/b, k ZSÚ, § 88/1/c ZDPZ, § 32k/c ZPKT)
7. **Rozsah investičních činností a nástrojů** podle zápisu v JERRS. (§ 32k/d ZPKT)
8. **Penzijní spoření**: ověřit v JERRS zápis podle zákona 427/2011. Doplnit řádek, nebo
   upravit /sluzby/penze.
9. **Registrační číslo / postup ověření** (§ 93/1/c ZSÚ) a oprava věty „ta jsou uvedená výše",
   která odkazuje na neexistující údaj.
10. **Mimosoudní řešení**: doplnit web finančního arbitra (www.finarbitr.gov.cz) a pro
    neživotní pojištění ČOI (adr.coi.cz), případně ombudsmana ČAP. (§ 14 a § 20e ZOS,
    § 1 zákona 229/2002)
11. **Předání do USA i u Google Workspace/Kalendáře**: jedna věta s odkazem na DPF/SCC v
    zásadách. Sledovat řízení C-703/25 P.
12. **Prokazatelnost souhlasu s cookies**: zvážit záznam souhlasu na serveru (§ 89/3 ZEK,
    čl. 7/1 GDPR, Google EU User Consent Policy).
13. **Lišta: zmínit Google a personalizaci reklam** u marketingových cookies a přidat odkaz
    na informace Googlu (policies.google.com/technologies/partner-sites).
14. **Čísla v článcích o hypotékách** (sazby, splátky): posoudit podle § 91 ZSÚ, případně
    přeformulovat jako obecné tržní údaje bez vazby na nabídku. U reklam v Google Ads čísla
    o nákladech nepoužívat bez RPSN a reprezentativního příkladu.
15. **Informace pro spolužadatele** (čl. 14 GDPR). Ověřit, že to pokrývají dokumenty BEplanu.
16. **Text o odměňování** („nejde o částku navíc") ověřit hlavně u investic (vstupní poplatky).

**Nízké**
17. Výčet cookies ověřit v prohlížeči po souhlasu, doby uložení podle skutečné konfigurace,
    nezbytné „cookie" popsat jako úložiště prohlížeče.
18. Zásady: doplnit WhatsApp/Google Meet jako komunikační kanály. Krátký text u formulářů
    rozšířit o správce a právní základ. Upozornit, ať do volného pole nepíší zdravotní údaje.
19. Recenze: věta o původu a ověřování (§ 5a/5 ZOS).
20. Sídlo podle živnostenského rejstříku a údaj o zápisu (§ 435 OZ). Ověřit, zda adresa
    konzultací je i sídlo.
21. Označení „obchodní sdělení" (§ 73/3 ZDPZ) u případných e-mailových nabídek pojištění
    a „propagační sdělení" (§ 15a ZPKT). Řídit se interními pravidly BEplanu.
22. Zvážit tlačítko „Odmítnout vše" i v panelu Nastavení (není povinné, odmítnutí je
    v první vrstvě).

---

#### Zdroje (otevřeno 13. 10. 2026)
- Zákony: viz tabulka nahoře (zakonyprolidi.cz), GDPR na eur-lex.europa.eu.
- ÚOOÚ Q&A Cookies: https://uoou.gov.cz/verejnost/qa-otazky-a-odpovedi/cookies
- ÚOOÚ, Praxe ÚOOÚ v oblasti cookies (12. 6. 2024): https://uoou.gov.cz/media/seminare-uoou/prezentace/2024-06-12-p04-praxe-uoou-v-oblasti-cookies.pdf
- EDPB Cookie Banner Taskforce report (17. 1. 2023): https://www.edpb.europa.eu/our-work-tools/our-documents/other/report-work-undertaken-cookie-banner-taskforce_en
- Google EU User Consent Policy: https://www.google.com/about/company/user-consent-policy/
- Google Consent Mode: https://support.google.com/google-ads/answer/10000067
- Google Financial Services Verification: https://support.google.com/adspolicy/answer/17127726 , https://support.google.com/adspolicy/answer/12390454 , https://support.google.com/adspolicy/answer/15332527?co=GENIE.CountryCode%3DCZ
- Google Financial products and services: https://support.google.com/adspolicy/answer/2464998
- ČNB RS2017-02 (ZSÚ): https://www.cnb.cz/cs/dohled-financni-trh/legislativni-zakladna/stanoviska-k-regulaci-financniho-trhu/RS2017-02/
- ČNB RS2011-0004 (tipař – pojištění): https://www.cnb.cz/cs/dohled-financni-trh/legislativni-zakladna/stanoviska-k-regulaci-financniho-trhu/RS2011-0004
- ČNB RS2017-25 (odborná zkouška ZPKT, tipař): https://www.cnb.cz/cs/dohled-financni-trh/legislativni-zakladna/stanoviska-k-regulaci-financniho-trhu/RS2017-25/
- ČNB příkaz BEplan (4. 5. 2021): https://www.cnb.cz/export/sites/cnb/cs/dohled-financni-trh/.galleries/prilohy/S-Sp-2020_00317_CNB_573.pdf
- ČNB – mimosoudní řešení sporů: https://www.cnb.cz/cs/verejnost/kontakty/stiznosti-na-financni-instituce/soud-nebo-subjekt-mimosoudniho-reseni-sporu/
- Odvolání DPF C-703/25 P (Úř. věst. C/2025/6610): https://eur-lex.europa.eu/eli/C/2025/6610/oj
- AK Schejbal, Konec investičních tipařů? (12. 5. 2020): https://akschejbal.cz/konec-investicnich-tiparu-v-cechach-na-morave-a-ve-slezsku

Nedohledáno / neověřeno: oficiální výklad ČNB k označování webu slovy „obchodní sdělení"
(§ 73/3 ZDPZ), formát „registračního čísla" vázaného zástupce v JERRS, aktuální (po 2022)
stanovisko ČNB k investičním tipařům, obsah znění zákonů účinných od 1. 1. 2027.
