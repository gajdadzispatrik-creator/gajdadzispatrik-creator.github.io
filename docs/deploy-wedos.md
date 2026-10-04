# Nasazení na Wedos — postup a kontrola

Web je statický (Astro) + jeden PHP skript pro formulář. Na Wedos se nahrává
jen obsah složky `dist/` vzniklé příkazem `npm run build`.

## 1) Jednorázové nastavení na Wedosu (před prvním nasazením)

1. **Doména `patrikgajdadzis.cz`** — zaregistrovaná a nasměrovaná na webhosting.
2. **SSL certifikát** (Let's Encrypt v administraci webhostingu) — zapnout
   PŘED nahráním webu. `.htaccess` přesměrovává vše na HTTPS a posílá HSTS;
   bez certifikátu by web nešel otevřít.
3. **PHP 8.1 nebo novější** (administrace webhostingu → nastavení PHP).
   `api/poptavka.php` na starší verzi nepoběží.
4. **Schránka `poptavka@patrikgajdadzis.cz`** — skutečná e-mailová schránka.
   Je odesílatel poptávek (SPF) i zálohový příjemce (když e-mail na
   `patrik@mintfinance.cz` spadne do spamu, kopie je tady). Sem se vrací
   i případná hlášení o nedoručení.
5. **DNS pro doručitelnost e-mailu** (DNS záznamy domény u Wedosu):
   - **SPF** — TXT záznam povolující odesílání z Wedosu (Wedos ho u domény
     s e-mailem obvykle nastaví sám; zkontrolovat, že existuje).
   - **DKIM** — zapnout v nastavení e-mailu domény.
   - **DMARC** — TXT `_dmarc.patrikgajdadzis.cz`, na začátek
     `v=DMARC1; p=none; rua=mailto:poptavka@patrikgajdadzis.cz`.

## 2) Každé nasazení

1. `npm run build` → musí skončit `0 errors`.
2. Zálohovat to, co je na serveru teď (stáhnout obsah složky domény) — pro
   rychlý návrat, kdyby se něco rozbilo.
3. Nahrát **celý obsah** `dist/` do `/www/domains/patrikgajdadzis.cz/`
   (FTP/SFTP). **Pozor na skryté soubory:** `.htaccess` a `api/.htaccess`
   začínají tečkou a řada FTP klientů je ve výchozím stavu nezobrazuje ani
   nenahrává — zapnout zobrazení skrytých souborů a ověřit, že na serveru jsou.
4. Nemazat na serveru složku `api/limity/` (vzniká sama, drží limit
   odeslání formuláře).

## 3) Kontrola po nasazení

### Přesměrování (vše musí skončit na `https://patrikgajdadzis.cz/…` jedním 301)

```bash
curl -sI http://www.patrikgajdadzis.cz/
curl -sI http://patrikgajdadzis.cz/
curl -sI https://www.patrikgajdadzis.cz/
curl -sI https://patrikgajdadzis.cz/sluzby/
curl -sI https://patrikgajdadzis.cz/sluzby/index.html
```

V odpovědi hledat `HTTP/… 301` a `location: https://patrikgajdadzis.cz/…`
bez zdvojeného `www` a bez `/domains/…` v cestě. `https://patrikgajdadzis.cz/`
a `https://patrikgajdadzis.cz/sluzby` musí vracet `200`.

### Bezpečnostní hlavičky

```bash
curl -sI https://patrikgajdadzis.cz/
```

Musí obsahovat `strict-transport-security`, `x-content-type-options`,
`x-frame-options`, `referrer-policy`, `permissions-policy`,
`content-security-policy`. Případně ověřit na securityheaders.com.

### Formulář

1. Na webu vyplnit a odeslat zkušební poptávku (formulář vyplňovat aspoň
   3 sekundy — rychlejší odeslání se bere jako robot a tiše zahodí).
2. Ověřit, že dorazila **do obou schránek** (`patrik@mintfinance.cz`
   i `poptavka@patrikgajdadzis.cz`) a ne do spamu.
3. „Odpovědět" u přijatého e-mailu musí jít na adresu z formuláře.
4. `https://patrikgajdadzis.cz/api/limity/` musí vracet `403`.

### Stránka 404

```bash
curl -sI https://patrikgajdadzis.cz/neexistuje
```

Musí vracet `404` (ne `200` ani `301`) a v prohlížeči se na té adrese musí
ukázat stránka „Tuhle stránku jsem nenašel." s hlavičkou a patičkou webu.
Kdyby se místo ní ukázala výchozí chybová stránka Wedosu, změnit v
`.htaccess` řádek na `ErrorDocument 404 /domains/patrikgajdadzis.cz/404.html`
(hostingová `/www/.htaccess` může cestu k chybové stránce řešit jinak než
běžné požadavky).

### Ostatní

- `robots.txt` a `sitemap-index.xml` (+ `sitemap-0.xml`) se otevírají.
- Web jednou projít na skutečném iPhonu (Safari) — hlavně tučné nadpisy
  a dekorativní linky (testovací WebKit pro Windows tučnost variabilního
  fontu nevykresluje věrně).
- PageSpeed Insights (pagespeed.web.dev) na homepage a jedné službě.
