# Kontroly: skripty a povinné porovnání s referenční stránkou

Přesunuto z `CLAUDE.md` 13. 10. 2026 beze změny obsahu (úspora tokenů –
CLAUDE.md se načítá s každou zprávou). Odkazy v kódu a dokumentech ve tvaru
„CLAUDE.md „Konvence: …““ vedou na stejnojmenný oddíl tady; „výše/níže“
může mířit do jiného souboru v `docs/konvence/` (rozcestník je v CLAUDE.md).

## Kontrolní skripty podrobně (původně v „Jak spustit“)

`check:spacing` (`scripts/check-spacing.mjs`, od 4. 10. 2026) měří na
vykreslené stránce skutečnou vzdálenost nadpisu (h2/h3/dt/`*__name`) od
prvního textu pod ním — i když text leží v jiném bloku/sloupci markupu
(dřívější ruční měření bralo jen sourozence a minulo text přilepený pod
nadpisem na `/sluzby/financni-plan`). Stejná role (typ sekce + úroveň
nadpisu + text/seznam) musí mít na jednom stupni všude stejnou mezeru, nikde
pod 8 px. Dál hlídá konce sekcí: homepage na mobilu 72 px nahoře i dole,
kapitoly a závěrečné pásy podstránek na každém stupni všude stejně.

`check:typo` (`scripts/check-typography.mjs`) projde **všechny stránky, na
které web odkazuje** (plus `/clanky` a stránku 404), a hledá ve vykresleném
textu místa, kde se řádek může zlomit tam, kde nesmí — viz „Konvence:
nezlomitelná mezera" níže. **Spusť ho po každé změně nebo doplnění textu**
(nový článek, podstránka, úprava copy, právní texty) — teprve s 0 nálezy je
text hotový. Nová stránka se zkontroluje sama, jakmile na ni vede odkaz;
stránku bez odkazu přidej do `EXTRA_PATHS` ve skriptu.

`check:layout` (Playwright, `scripts/audit-layout.mjs`) ověří na živém dev serveru u
sekcí s dekorativní trasou: že text drží konstantní odstup od tečky/osy na
celém rozsahu jednoho breakpointu (ne jen na kalibrační šířce), že nadpisy
bez sousední trasy sedí na stejné souřadnici všude, že sekce na sebe navazují
švem 0 px, a že se hlavní bloky nepřekrývají. **Spusť ho po každé úpravě
pozicování v sekci s trasou** (nová sekce, změna `margin`/`padding`/
`grid-template-columns` u nadpisu/textu/dělítka) — přesně tuhle třídu chyb
(pevný px místo procentuálního odsazení, špatná základna `%` v CSS Grid)
jinak odhalí jen ruční proměření v prohlížeči na netriviální šířce.

**Skript od 2. 9. 2026 běží nad polem `PAGES`** (ne jen nad homepage) — každá
podstránka je vlastní záznam s `path` + `anchoredChecks`/`flatChecks`/
`seamChain`/`overlapChecks`/`wideStageChecks`. **Při vytvoření další
podstránky s dekorativní trasou (pruh kapitoly + tečka podle „Konvence:
kontinuální linka, tečky a text") je POVINNÉ přidat do `PAGES` nový záznam,
ne jen ověřit stránku ručně v prohlížeči** — ruční kontrola se dřív
opakovaně ukázala nedostatečná (viz „Globální pravidlo: povinná kontrola
nové stránky proti referenční implementaci" níže) a bez trvalého záznamu
v `PAGES` navíc přestane příští úpravu stránky hlídat cokoliv automaticky.
Pro běžný vzor „pruh s popiskem + tečka" (většina podstránek) stačí použít
pomocnou funkci `chapterBarChecks(prefix, markers)` ve skriptu — stejně,
jako je to udělané pro `SLUZBY_PAGE`/`HYPOTEKY_PAGE`/`FINANCNI_PLAN_PAGE`;
netypické vzory (odlišná struktura popisku, vlastní dvojice prvků k
porovnání) přidej jako ruční `anchoredChecks`/`wideStageChecks` záznam
stejně jako u `HOME_PAGE`. Teprve po čistém průběhu `npm run check:layout`
(0 selhání pro NOVOU stránku i pro všechny ostatní) smí báze úkolu napsat
uživateli, že je layout stránky hotový/ověřený.

## Globální pravidlo: povinná kontrola nové stránky proti referenční implementaci

Doplněno 2. 9. 2026 po `/sluzby/financni-plan` — Claude Code při implementaci
téhle stránky opakovaně napsal, že „ověřil" shodu s `hypoteky.astro`, a
přitom minul: asymetrický padding kapitol na desktopu (nulový vertikální
padding vzniklý nedopatřením), `margin-top` navíc na KAŽDÉ kapitole místo
jen první, dvojitě počítanou mezeru (`gap` na rodiči + vlastní `margin-top`
na dítěti) na třech místech, velikosti H2 na mobilu posunuté o 6px mimo
zadání, natvrdo zapsané hex barvy místo tokenů, posunutou pozici hero
nadpisu (jiný `padding` než referenční stránka) a odlišnou techniku ohybu
dekorativní trasy v hero. Každou z těchto chyb musel odhalit až uživatel
ručním porovnáním screenshotů — to se nesmí opakovat. Platí **globálně a
automaticky** pro každou budoucí podstránku a každou netriviální úpravu
existující stránky, bez ohledu na to, jestli to zadání znovu zmíní.

**Proč nestačí jen přečíst zadání a CSS zdrojový kód:** psané zadání úkolu
může obsahovat čísla, která si sama odporují se skutečností na již
schválené a nasazené referenční stránce (typicky `hypoteky.astro` — první
plně dokončená detailní stránka služby, dosud nejvíc prověřená). Čtení
CSS druhé stránky „od oka" a subjektivní dojem, že „to sedí", tenhle
rozpor nezachytí — přesně to se stalo v tomto úkolu opakovaně.

**Povinný postup před tím, než napíšeš uživateli „ověřeno"/„hotovo":**

1. Najdi nejbližší existující referenční stránku se stejným typem layoutu
   (kapitoly s pruhem a tečkou, hero s trasou apod. — typicky
   `hypoteky.astro`, případně `sluzby.astro`).
2. Otevři OBĚ stránky živě v prohlížeči na STEJNÉ šířce viewportu (ne dvě
   různá okna v různém zoomu — použij `resize_window`/`preview` na obou).
3. Pro každou z následujících kategorií přímo změř `getBoundingClientRect()`/
   `getComputedStyle()` na obou stránkách a **porovnej čísla vedle sebe**,
   ne z paměti/dojmu:
   - padding sekcí na každém stupni (musí být symetrický top/bottom, viz
     „Konvence: mezera mezi sekcemi" — a **jen první** kapitola smí mít
     navíc `margin-top`, žádná další),
   - každý `margin-top`/`margin` u prvku, který je zároveň potomkem
     rodiče s vlastním `gap` — to je dvakrát započtená mezera, oprav na
     jeden zdroj (viz „Konvence: mezera MEZI BLOKY"),
   - `font-size`/`line-height` prvek po prvku na KAŽDÉM stupni (mobil,
     tablet, notebook, desktop) — ne jen na jednom kalibračním stupni,
   - pozice hero nadpisu (`padding`/`left`/`top` sekce hero) — musí sedět
     na stejné ose jako referenční stránka, pokud není explicitně a
     viditelně jinak zdůvodněno,
   - šířky sloupců (nadpisový sloupec, druhý/obsahový sloupec, seznamy) —
     nepřebírej číslo ze zadání slepě, ověř ho proti referenční stránce,
   - chování dekorativní trasy v hero (technika ohybu, vzdálenost od
     tlačítek CTA) — stejná technika jako referenční stránka, pokud není
     explicitně jinak zdůvodněno,
   - barvy — žádný natvrdo zapsaný hex, pokud existuje token se stejnou
     hodnotou v `tokens.css`.
4. **Když psané zadání dává jiné číslo, než jaké má referenční stránka ve
   skutečnosti, a není u toho jasné kompoziční zdůvodnění proč se stránky
   mají lišit, důvěřuj referenční stránce** a rozpor nahlas uživateli v
   souhrnu úkolu — neimplementuj mlčky číslo ze zadání jen proto, že tam
   je napsané.
5. Teprve po tomhle porovnání smí báze úkolu napsat uživateli, že je
   layout „ověřen shodný" s referenční stránkou — bez živého srovnání čísel
   na obou stránkách vedle sebe je taková věta nepravdivá, i kdyby autor
   subjektivně věřil, že to zkontroloval.
6. **Přidej stránku do `PAGES` v `scripts/audit-layout.mjs`** (viz „Jak
   spustit" výše) a spusť `npm run check:layout` — 0 selhání pro novou
   stránku i pro všechny ostatní, teprve pak je úkol hotový. Ruční
   porovnání v bodech 1–5 najde chyby při TÉHLE úpravě; zápis do `PAGES`
   je to, co zachytí regresi při KAŽDÉ BUDOUCÍ úpravě, aniž by si o to
   uživatel musel znovu říkat — přesně to bylo doplněno 2. 9. 2026 poté, co
   `/sluzby`, `/sluzby/hypoteky` a `/sluzby/financni-plan` několik týdnů
   neměly žádnou automatickou kontrolu vůbec (audit běžel jen na homepage)
   a jednu regresi v `/sluzby` tak odhalil až tenhle rozšířený skript,
   ne dřívější ruční review.
