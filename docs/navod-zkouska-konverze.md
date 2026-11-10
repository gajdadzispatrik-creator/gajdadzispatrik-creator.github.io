# Zkouška konverze na živém webu – návod pro Patrika (připraveno 15. 10. 2026)

Cíl: potvrdit, že se po souhlasu s cookies odešle konverze z formuláře. **Formulář odesíláte vy**, já nic neodesílám.
Nejlépe **v pátek 16. 10. ráno** (Reklama pak odpoledne ověří, kdy Ads konverzi ukáže); nejpozději do pá 23. 10.

## Postup (5 kroků)

1. **Okno prohlížeče bez blokátorů reklam** (vypněte AdBlock / uBlock, jinak se `gtag.js` zablokuje a zkouška bude falešně „nefunguje“). Otevřete `https://patrikgajdadzis.cz/`, v liště klikněte **Přijmout vše** (kvůli konverzi pro Ads stačí marketingový souhlas, kvůli GA4 i analytický).
2. V sekci Kontakt vyplňte: jméno **`TEST – smazat`**, telefon **`777 000 000`**, e-mail svůj (dostanete potvrzení; nebo jakýkoli vlastní test), oblast libovolná, situace „test měření“. Počkejte aspoň 5 sekund po otevření stránky (formulář odeslaný dřív se zahazuje) a klikněte **Odeslat poptávku**; musí se objevit „Děkuji. Ozvu se vám co nejdříve.“
3. **Hned (do 2 minut) ověřte v Gmailu patrik@mintfinance.cz:** přišel e-mail „Nová poptávka – TEST – smazat“ a má štítek **Poptávka**; v téže schránce i potvrzení „Děkuji za zprávu“, pokud jste zadal její adresu. Zkontrolujte i schránku `poptavka@patrikgajdadzis.cz` na Wedosu (záložní kopie).
4. **Do 5 minut v GA4** (Přehledy → Reálný čas): musí být událost `poptavka_odeslana`. To je nejrychlejší důkaz, že se po souhlasu odeslala konverze.
5. **V Google Ads až za 3–24 hodin:** Cíle → Konverze → akce **Web – formulář**: stav se změní z „Doposud žádné konverze“; Reklama to zkontroluje v pá 16. 10. kolem 8:00 a 14:00 a dá vědět.

## Úklid a označení testu

- **Gmail:** smazat e-mail s poptávkou, potvrzení i případnou odpověď (konverzace „TEST – smazat“); koš se maže sám po 30 dnech, případně ho vyprázdnit. Totéž v záložní schránce na Wedosu.
- **BEplan:** nic nezapisovat (není to klient). **Čísla:** poptávka „TEST – smazat“ se nepočítá – řádek Čísla vynechají.
- **Google Ads:** konverzi samotnou **smazat nejde**. Označit ji lze poznámkou v grafu výkonu a zápisem do `docs/audits/google-ads-kontroly.md` (datum, 1 konverze = test, odečíst z cen za poptávku). Poznámku v grafu dělá Reklama se souhlasem (poznámky v grafech Ads jsou obecná funkce, v tomto účtu **neověřeno**).

## Důležité upozornění k Ads (neověřeno, ale pravděpodobné)

Ads započítá konverzi jen u návštěvníka, který předtím **kliknul na reklamu** (cookie/`gclid`). Při vstupu přímo na adresu webu proto **konverze v Ads nemusí být vidět, i když web funguje** – důkazem pak jsou GA4 Reálný čas a Gmail. Klikat kvůli zkoušce na vlastní reklamu **nedoporučuji** (stojí peníze a Google vlastní kliky filtruje). Plná zkouška s Ads je tedy ověřená až první skutečnou poptávkou z reklamy; do té doby stačí body 3 a 4. Stav akce v Ads (např. „Bez nedávných konverzí“ místo „Neověřeno“) může zkoušku potvrdit i bez započítání – **neověřeno**.
