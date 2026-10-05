> **Nahrazeno verzí 2 (5. 10. 2026): docs/financni-check-up-v2.md.** Tento dokument popisuje původní verzi.

# Finanční check-up — návrh textů k připomínkám

Stav: **SCHVÁLENO a postaveno 4. 10. 2026** — `src/pages/financni-check-up.astro`.
Odkazy: patička (Navigace), rozcestník na `/sluzby`. Tvrzení [OVĚŘIT] Patrik
potvrdil (fixace: začít klidně i rok předem a zjistit situaci na trhu).

Princip: 8 otázek na klikání, jedna otázka na obrazovce, vyhodnocení přímo
v prohlížeči, nic se neodesílá. Výsledek: 6 oblastí, každá **v pořádku**
(zelená) nebo **vyplatí se podívat** (oranžová), krátké vysvětlení a odkaz na
službu. Na konci nabídka termínu.

Místa označená (potvrzeno) jsou odborná tvrzení, která musí Patrik potvrdit
nebo upravit.

---

## Úvod stránky

**Nadpis:** Jak na tom jsou vaše finance?

**Text:** Stačí 8 krátkých otázek a zhruba 2 minuty. Na konci uvidíte, co máte
kde máte základ a kde se vyplatí podívat blíž. Odpovědi zůstávají jen ve
vašem prohlížeči, nikam se neodesílají.

**Tlačítko:** Začít

---

## Otázky

### 1. Rezerva
**Kdybyste zítra přišli o příjem, na jak dlouho by vám vystačily úspory?**
- Méně než měsíc
- 1 až 3 měsíce
- 3 až 6 měsíců
- Déle než 6 měsíců

### 2. Pojištění příjmu
**Jste pojištění pro případ dlouhodobé nemoci nebo invalidity?**
- Ano a vím, na jaké částky
- Ano, ale nevím přesně, co pojištění kryje
- Ne
- Nevím

### 3. Kdo na vás závisí
**Živí váš příjem i další lidi, nebo z něj splácíte úvěr?**
- Ano
- Ne

### 4. Hypotéka
**Máte hypotéku?**
- Nemám
- Mám a vím, kdy mi končí fixace
- Mám, ale nevím, kdy mi končí fixace

(Bez dotazu na konkrétní rok fixace — většina lidí ho z hlavy neví. „Nevím“
je platná odpověď, ne slepá ulička.)

### 5. Plány s bydlením
**Plánujete v příštích dvou letech koupi, stavbu nebo rekonstrukci bydlení?**
- Ano
- Možná
- Ne

### 6. Dlouhodobé peníze
**Odkládáte si pravidelně peníze na delší dobu, na pět a více let?**
- Ano, pravidelně investuji
- Spořím, ale peníze leží na účtu
- Zatím ne

### 7. Penze
**Víte, z čeho budete žít v důchodu?**
- Mám představu a pravidelně si na to odkládám
- Mám penzijní spoření nebo DIP, ale nevím, jestli to stačí
- Zatím to neřeším

### 8. Přehled o smlouvách
**Kdy jste naposledy prošli své smlouvy (pojištění, úvěry, spoření)?**
- Během posledního roku
- Před více lety
- Ještě nikdy

---

## Vyhodnocení (6 oblastí)

### Rezerva → /sluzby/financni-plan
- **V pořádku** (otázka 1: 3 až 6 měsíců, déle než 6 měsíců):
  Máte rezervu, která vás podrží i při nečekaném výpadku příjmu.
- **Vyplatí se podívat** (méně než měsíc, 1 až 3 měsíce):
  Rezerva je základ, na kterém stojí všechno ostatní. Obvykle se doporučuje
  mít stranou alespoň tři až šest měsíčních výdajů. (potvrzeno)

### Příjem a rodina → /sluzby/pojisteni
- **V pořádku** (otázka 2: Ano a vím, na jaké částky):
  Máte pojištěné to nejdůležitější, svůj příjem.
- **Vyplatí se podívat** (cokoli jiného; silnější text, když otázka 3 = Ano):
  - obecně: Největší finanční riziko většiny lidí není škoda na majetku, ale
    dlouhý výpadek příjmu. Vyplatí se vědět, co by se v takové situaci stalo.
  - když na vás někdo závisí / splácíte úvěr: Na vašem příjmu závisí další
    lidé nebo splátky. O to důležitější je vědět, že ho máte dobře
    pojištěný.

### Bydlení a hypotéka → /sluzby/hypoteky
- **Vyplatí se podívat** (otázka 4: Mám, ale nevím, kdy mi končí fixace,
  NEBO otázka 5: Ano/Možná):
  - neví, kdy končí fixace: Vyplatí se to zjistit. Konec fixace je nejlepší
    chvíle hypotéku zkontrolovat a začít se vyplatí několik měsíců předem,
    ne až když přijde nabídka od banky. (potvrzeno)
  - plány s bydlením: Než začnete hledat, je dobré znát čísla: na jakou cenu
    dosáhnete, kolik budete potřebovat vlastních peněz a jaká splátka je pro
    vás rozumná.
- **V pořádku** (jinak):
  - nemá hypotéku: V oblasti bydlení teď nic akutního neřešíte.
  - ví, kdy končí fixace: Víte, kdy vám končí fixace, to je dobrý základ.
    Hypotéku se vyplatí začít řešit několik měsíců před tímto datem.

### Dlouhodobé peníze → /sluzby/investice
- **V pořádku** (otázka 6: Ano, pravidelně investuji):
  Pravidelně odkládáte na delší dobu. Vyplatí se jen občas zkontrolovat,
  jestli investice pořád odpovídají vašim cílům.
- **Vyplatí se podívat** (spořím na účtu, zatím ne):
  Peníze, které nebudete potřebovat pět a více let, na běžném účtu časem
  ztrácejí hodnotu kvůli inflaci. (potvrzeno)

### Penze → /sluzby/penze
- **V pořádku** (otázka 7: Mám představu a pravidelně si odkládám):
  Na penzi myslíte s předstihem, to je velká výhoda.
- **Vyplatí se podívat** (ostatní):
  Čím dřív víte, kolik budete na penzi potřebovat, tím menší částky stačí
  odkládat.

### Přehled o smlouvách → /sluzby/financni-plan
- **V pořádku** (otázka 8: Během posledního roku):
  Smlouvy máte zkontrolované nedávno.
- **Vyplatí se podívat** (před více lety, ještě nikdy):
  Starší smlouvy často neodpovídají tomu, co dnes potřebujete. Chybí v nich
  důležité krytí a platíte v nich za věci, které nevyužijete.

---

## Konec výsledku

**Souhrn nahoře:** V pořádku: X z 6 oblastí. Vyplatí se podívat: Y.

**Výzva:** Chcete to probrat? Úvodní konzultace trvá přibližně 30 minut
a je nezávazná.

**Tlačítka:**
- Vybrat termín online (rezervace v kalendáři)
- Poslat výsledek Patrikovi (vyplní kontaktní formulář odpověďmi; odešle se
  až po potvrzení, se souhlasem jako u formuláře)
- Projít znovu (textový odkaz)

**Upozornění pod výsledkem:** Přehled je orientační a vychází jen z vašich
odpovědí. Konkrétní doporučení je možné až poté, co společně probereme vaši
situaci i to, jak máte nastavené současné smlouvy.

---

## Otevřené otázky pro Patrika

1. Sedí výběr 8 otázek? Chybí něco důležitého (např. podnikatelé/OSVČ,
   majetkové pojištění, závěť), nebo je něco navíc?
2. Formulace s (potvrzeno) — souhlasí čísla a tvrzení?
3. Kde má být check-up na webu vidět: homepage (např. pod hero nebo
   u rozcestníku), menu, závěrečné pásy podstránek?

---

## Podoba výsledku (4. 10. 2026, přání uživatele: prémiově, vést ke konzultaci)

1. **Skóre:** „Váš výsledek“, velké číslo „X z 6“ + řada 6 teček (zelená
   v pořádku, okrová k projití) a celkové hodnocení podle počtu oblastí
   v pořádku: 6 = „Finance máte nastavené dobře.“, 4–5 = „Základ máte
   dobrý.“, 2–3 = „Některé důležité věci se vyplatí projít.“, 0–1 = „Ve
   financích je prostor udělat pořádek.“ (texty v `verdicts`).
2. **Vyplatí se podívat:** celé texty s odkazem na službu, pořadí rezerva →
   příjem → bydlení → smlouvy → penze → investice; první oblast má štítek
   „Začal bych tady“.
3. **V pořádku:** stručně, bez odkazu.
4. **Tmavý panel s nabídkou:** fotka + jméno, nadpis na míru („Pojďme se
   společně podívat na rezervu a penzi.“; vše v pořádku → „Chcete mít
   jistotu, že to tak zůstane?“), text o konzultaci, rezervace + „Poslat
   výsledek Patrikovi“, pod tím 5,0 na Google · 150+ osobních klientů.
5. Pod panelem „Projít znovu“ a upozornění.

### Úprava 4. 10. 2026 (večer) — linka a „základ máte"

- Výsledek je **linka se zastávkami**: u každé oblasti tečka (zelená / okrová),
  název a jedna krátká věta (`short` v datech). Rozbalená je jen první oblast
  k projití („Začal bych tady": delší text + odkaz na službu).
- **Nikdy netvrdit „v pořádku"** (Patrik: bez smluv nevím, jestli je to
  nastavené dobře — pojištění invalidity může být na 100 000 Kč místo
  4 milionů). Zelená = **„Základ máte"**, skóre „X z 6 oblastí, kde máte
  základ", hodnocení pro 6/6 „Základ máte ve všech oblastech." + věta, že
  správnost ukáže až pohled do smluv; nabídka pro 6/6 „Ověříme, že je všechno
  nastavené správně?". Krátké věty u základu jsou fakt z odpovědi
  („Pojištění příjmu máte, vyplatí se ověřit částky.").
- 5. 10. 2026: rezerva bez počtu měsíců a v první osobě („Jak velká má být,
  záleží na vašich výdajích, příjmu a na tom, kdo na vás závisí. Spočítáme ji
  spolu."); krátké věty: pojištění „ověřit částky a nastavení", investice
  „ověřit strategii a poplatky", smlouvy „druhý pohled se ale vyplatí"
  (záleží, s kým je procházeli).
- 5. 10. 2026: krátká věta Příjem (okrová) „Pojištění příjmu nemáte, nebo nevíte, co kryje." (místo „Příjem nemáte jistě pojištěný.").
