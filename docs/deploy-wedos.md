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

## 2) Každé nasazení (od 10. 10. 2026 automaticky přes GitHub)

Web se nahrává automatem `.github/workflows/deploy-wedos.yml` — **jen záměrně**,
nikdy sám po pushi (push do `main` jde jen na náhled na GitHub Pages):

```bash
git tag ostry-RRRR-MM-DDx && git push origin ostry-RRRR-MM-DDx
```

nebo v GitHubu Actions → „Nasazení na Wedos“ → Run workflow. Automat udělá
`npm run build`, ověří, že build obsahuje `.htaccess`, `api/.htaccess`
a `api/poptavka.php` a nemá `noindex`, a přes FTP s TLS nahraje celý `dist/`
do `/www/domains/patrikgajdadzis.cz/` (včetně skrytých souborů, složku
`api/limity/` nemaže). Přístup k FTP je v tajných údajích repozitáře
(`WEDOS_FTP_HOST` = 405333.w33.wedos.net, `WEDOS_FTP_USER` = w405333,
`WEDOS_FTP_PASSWORD` — zadal Patrik, nikde jinde není).

**Hostingový `/www/.htaccess` se nahrává taky** — z `deploy/www.htaccess`.
Výchozí soubor Wedosu obsahuje pravidlo „aliasy – správné přesměrování při
chybějícím /“, které přidává koncové lomítko (302 `/sluzby` → `/sluzby/`);
náš `.htaccess` ho odebírá (kanonické adresy jsou bez lomítka) → nekonečná
smyčka, podstránky se neotevřely (zjištěno při spuštění 10. 10. 2026).
V `deploy/www.htaccess` je to pravidlo vypnuté, zbytek odpovídá výchozímu.

Ruční nasazení (záloha postupu): `npm run build` → nahrát celý obsah `dist/`
do `/www/domains/patrikgajdadzis.cz/` (pozor na skryté `.htaccess`
a `api/.htaccess`) a `deploy/www.htaccess` jako `/www/.htaccess`; nemazat
`api/limity/`.

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
