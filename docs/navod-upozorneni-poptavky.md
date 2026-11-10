# Upozornění na poptávky z webu (štítek „Poptávka“)

Cíl: odpovědět na poptávku do hodiny (studie webu, doporučení 2). Štítek
„Poptávka“ v Gmailu patrik@mintfinance.cz založil chat Web 13. 10. 2026.
Filtry a telefon nastavuje Patrik.

## Co web posílá (ověřeno v `public/api/poptavka.php`, 13. 10. 2026)

| Co | Od | Předmět |
|---|---|---|
| Formuláře (kontakt, Na kolik dosáhnete?, Končí vám fixace?) | poptavka@patrikgajdadzis.cz | „Nová poptávka – <jméno a příjmení>“ (od 10. 11. 2026; typ je v pruhu nahoře v e-mailu) |
| Doporučení ze stránky /dekuji | poptavka@patrikgajdadzis.cz | „Nové doporučení – <jméno a příjmení>“ |
| Odpověď klienta na potvrzení | e-mail klienta | „Re: Děkuji za zprávu, ozvu se do jednoho pracovního dne“ |
| Online rezervace (Google Kalendář, stránka „Úvodní konzultace“) | calendar-notification@google.com (**neověřeno**: v Gmailu zatím žádná rezervace není) | obsahuje „Úvodní konzultace“ (**neověřeno**) |

## Filtry (Gmail na počítači → ozubené kolo → Zobrazit všechna nastavení → Filtry a blokované adresy → Vytvořit nový filtr)

1. **Od:** `poptavka@patrikgajdadzis.cz` → Vytvořit filtr → zaškrtnout
   *Použít štítek: Poptávka*, *Nikdy neposílat do spamu*, *Vždy označit jako
   důležité*, *Použít filtr také na odpovídající konverzace*.
2. **Předmět:** `"Děkuji za zprávu, ozvu se"` → stejné tři volby (zachytí
   odpovědi klientů na potvrzovací e-mail).
3. **Od:** `calendar-notification@google.com`, **Předmět:** `"Úvodní konzultace"`
   → stejné tři volby. Po první skutečné rezervaci ověřit, že se štítek
   přidal; jinak upravit podle skutečného předmětu.

## Telefon

**Android** (Google nápověda „Change Gmail notifications“, Android):
Gmail → ☰ → Nastavení → patrik@mintfinance.cz →
1. Správa štítků → **Poptávka** → Synchronizovat zprávy: *Posledních 30 dní*
   → Oznámení štítku: zapnout, *Upozornit na každou zprávu*, vlastní zvuk.
2. Chce-li upozornění **jen** na poptávky: Oznámení → *Žádná* (nebo jen
   *Vysoká priorita*). Pozor: pak nepřijdou upozornění na ostatní poštu.

**iPhone** (Google nápověda, iOS): Gmail neumí upozornění na jeden štítek,
jen pro celý účet (*Vše* / *Jen vysoká priorita* / *Žádná*). Nejbližší
řešení: Nastavení → účet → Oznámení e-mailu → *Jen vysoká priorita*;
filtry výše poptávky označí jako důležité. Že je pak Gmail bere jako
„vysokou prioritu“, je **neověřeno** – ověřit testovací poptávkou z webu.

Zdroje: [Gmail Help – Android](https://support.google.com/mail/answer/1075549?hl=en&co=GENIE.Platform%3DAndroid),
[Gmail Help – iPhone](https://support.google.com/mail/answer/1075549?hl=en&co=GENIE.Platform%3DiOS) (13. 10. 2026).

## Test

Po nastavení odeslat jednu testovací poptávku z patrikgajdadzis.cz (formulář
dole na homepage) a zkontrolovat: štítek Poptávka, upozornění na telefonu.
