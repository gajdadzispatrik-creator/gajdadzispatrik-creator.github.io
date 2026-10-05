# Finanční check-up v2 — návrh ke schválení

Stav: **SCHVÁLENO a postaveno 5. 10. 2026** — `src/pages/financni-check-up.astro` (data otázek, oblastí a hodnocení ve frontmatteru).
Nahradí verzi 1 (`docs/financni-check-up-navrh.md`, dnes na webu).

## Cíle (zadání Patrika, 5. 10. 2026)

1. Klient si už u otázky uvědomí, že to nemá vyřešené („aha").
2. Patrik z poslaného výsledku pozná o klientovi co nejvíc.
3. Žádné otázky na osobní situaci. Koho se téma netýká, vybere poslední
   odpověď a oblast se ve výsledku neukáže.
4. Bez konce fixace a bez oblasti „Přehled o smlouvách".
5. Silné, chytré, krátké a jasné.

Odborná tvrzení (nemocenská u podnikatelů, podpojištění) Patrik potvrdil.

---

## Úvod

Stačí 10 krátkých otázek a zhruba 2 minuty. Na konci uvidíte, kde máte
základ a kde se vyplatí podívat blíž.

## Otázky

Z = základ máte · O = vyplatí se podívat · N = netýká se (oblast se neukáže)

| # | Oblast | Otázka | Odpovědi |
|---|---|---|---|
| 1 | Rezerva | Kolik měsíců byste vyžili bez příjmu? | Méně než 1 (O) · 1–3 (O) · 3–6 (Z) · Víc než 6 (Z) |
| 2 | Příjem | Kdybyste půl roku nemohli pracovat, z čeho byste platili účty? | Z pojištění, mám to spočítané (Z) · Z úspor (O) · Z nemocenské (O) · Netuším (O) |
| 3 | Rodina | Zvládla by rodina bez vašeho příjmu splácet a žít jako dnes? | Ano, mám to pojištěné (Z) · Pár měsíců (O) · Netuším (O) · Nikdo na mně nezávisí (N) |
| 4 | Majetek | Odpovídá pojistka vašeho bydlení a vybavení dnešní ceně? | Ano (Z) · Je roky stará (O) · Netuším (O) · Nemám pojištěno (O) |
| 5 | Bydlení | Jak jste na tom s vlastním bydlením? | Bydlím ve vlastním (Z) · Chci a vím, na kolik dosáhnu (Z) · Chci, ale nevím, na kolik dosáhnu (O) · Neřeším (N) |
| 6 | Auto | Kdo zaplatí vaše auto, když nehodu zaviníte vy? | Pojišťovna, mám havarijní (Z) · Já, a počítám s tím (Z) · Já, ale tohle mě nenapadlo (O) · Netuším (O) · Nemám auto (N) |
| 7 | Penze | Kolik budete mít v důchodu? | Vím přesně (Z) · Tuším (O) · Netuším (O) |
| 8 | Investice | Vydělají vám úspory víc než inflace? | Ano (Z) · Netuším (O) · Ne, leží na účtu (O) · Nic neodkládám (O) |
| 9 | Děti | Spoříte dětem na start do života? | Ano, pravidelně (Z) · Občas (O) · Ne (O) · Nemám děti (N) |
| 10 | — | Co chcete vyřešit nejdřív? | Bydlení · Zajištění příjmu a majetku · Rodina a děti · Investice · Penze · Chci celkový přehled |

## Krátké věty na lince

| Oblast | Základ máte | Vyplatí se podívat |
|---|---|---|
| Rezerva | Rezervu máte. | Rezerva vás dlouho nepodrží. |
| Příjem | Máte pojištění, ověřte částky a cenu. | Půl roku bez příjmu byste nepokryli. |
| Rodina | Rodina je pojištěná, ověřte částky. | Rodina by bez vás dlouho nevydržela. / *(Netuším)* Nevíte, jak dlouho by rodina vydržela. |
| Majetek | Pojistka odpovídá dnešní ceně. | Pojistka nemusí stačit na obnovu. |
| Bydlení | Bydlíte ve vlastním. / Víte, na kolik dosáhnete. | Nevíte, na kolik dosáhnete. |
| Auto | Auto máte pojištěné. / *(Počítám s tím)* Víte, co povinné ručení nekryje. | Při vlastní nehodě platíte auto sami. / *(Netuším)* Nevíte, co vám pojištění kryje. |
| Penze | Víte, s čím počítat. | Nevíte, kolik budete mít v důchodu. |
| Investice | Úspory vám vydělávají víc než inflace. | *(Netuším)* Nevíte, jestli vaše úspory neztrácejí hodnotu. / *(Leží na účtu)* Úspory na účtu ztrácejí hodnotu. / *(Nic)* Nic si neodkládáte. |
| Děti | Dětem spoříte. | Na start dětí nemáte plán. |

## Rámeček „Tady bych začal"

- **Rezerva:** Rezerva je základ všeho. Kolik má být, spočítáme podle vašich výdajů.
- **Příjem:** Nemocenská pokryje jen část příjmu. Podnikatelé bez dobrovolného pojištění nedostanou nic.
- **Rodina:** Bez vašeho příjmu by rodině chyběly peníze na život i splátky. Ukážu vám, jak to vyřešit.
- **Majetek:** Ceny bydlení za poslední roky vyletěly. Stará pojistka nestačí a pojišťovna plnění krátí.
- **Bydlení:** Nejdřív čísla, pak prohlídky. Spočítáme, na co dosáhnete a jaká splátka je rozumná.
- **Auto:** Povinné ručení platí jen škody druhým. Jestli se vám vyplatí havarijní, záleží na hodnotě auta.
  *(5. 10. 2026: havarijní se nevyplatí vždy — vědomé „jen povinné ručení" je základ; nic nemá znít jako prodej.)*
- **Penze:** Čím dřív víte, kolik budete potřebovat, tím menší částky stačí odkládat.
- **Investice:** Peníze na účtu ztrácejí hodnotu. U investic rozhoduje strategie a poplatky.
- **Děti:** Díky času stačí i malé částky. Chce to jen plán.

## Hodnocení nahoře (podle podílu oblastí se základem)

| Podíl | Nadpis | Věta pod ním |
|---|---|---|
| všechny | Základ máte všude. | Jestli je nastavený správně, ukáže až pohled do smluv. |
| aspoň 2/3 | Základ máte dobrý. | Pár věcí se vyplatí doladit. |
| aspoň 1/3 | Pár důležitých věcí chybí. | Nic, co by se nedalo vyřešit. Začněme tím nejdůležitějším. |
| méně | Je co zlepšovat. | Dá se to vyřešit krok za krokem. |

Skóre: „X z N oblastí, kde máte základ" (N = oblasti, které se klienta týkají).

## Nabídka na konci

- Nadpis podle otázky 10: „Pojďme se podívat na vaše bydlení." · „…na
  zajištění příjmu a majetku." · „…na rodinu a děti." · „…na vaše
  investice." · „…na vaši penzi." Při „Chci celkový přehled" vyjmenuje
  oblasti k projití. Když má klient základ všude: „Ověříme, že je všechno
  nastavené správně?"
- Text: **Projdeme, co vám vyšlo, i vaše smlouvy. 30 minut, nezávazně
  a zdarma.**
- Tlačítka beze změny: Vybrat termín online · Poslat výsledek Patrikovi.

## Pořadí a poslaný výsledek

- Oblasti k projití: nejdřív to, co klient vybral v otázce 10, pak rezerva →
  příjem → rodina → majetek → bydlení → auto → penze → děti → investice.
  První má rámeček „Tady bych začal".
- Poslaný výsledek pro Patrika: nahoře „Chce řešit: …", pak oblasti
  k projití, oblasti se základem, oblasti, které se ho netýkají, a všechny
  odpovědi.

## Po spuštění: měření (GA4)

Události: začátek check-upu, dokončení, odeslání výsledku, klik na rezervaci
(z panelu výsledku). Podle čísel ladit otázky (kde lidé odpadají).
