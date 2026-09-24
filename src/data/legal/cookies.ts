import { type LegalPageData } from './types';

/**
 * Obsah stránky /cookies.
 *
 * NÁVRH — vychází ze zákona č. 127/2005 Sb. o elektronických komunikacích
 * (§ 89) a GDPR. Analytický nástroj je od úkolu „doplnění právních stránek“
 * (§3) známý (Google Analytics 4, Google Ireland Limited, cookies _ga a
 * _ga_<ID>). Doby uložení v tabulce „Jaké cookies používám“ jsou odhad —
 * uživatel je sám nezná a požádal mě (25. 8. 2026), ať je doplním podle
 * vlastního úsudku. U nezbytné cookie (12 měsíců) jsem převzal stejnou
 * lhůtu, jaká je už jinde na této stránce uvedená pro platnost souhlasu
 * (sekce „Souhlas a jeho odvolání“); u GA4 (2 roky) jde o výchozí nastavení
 * GA4 pro cookies _ga/_ga_<ID>, které je NUTNÉ ověřit ve skutečné
 * konfiguraci účtu. Nejde o ověřený fakt — MUSÍ projít právní kontrolou
 * a potvrzením Patrika před nasazením.
 *
 * Tlačítko „Nastavení cookies“ (poslední sekce) otevírá STEJNÝ panel jako
 * tlačítko ve footeru — LegalLayout.astro mu jen simuluje klik na skutečný
 * spouštěč (`#footer-cookie-settings`), CookieConsent.astro se neupravuje.
 */
export const cookiesPage: LegalPageData = {
  metaTitle: 'Cookies - Patrik Gajdadzis',
  metaDescription: 'Jaké cookies na webu používám, k čemu slouží a jak souhlas s nimi upravit nebo odvolat.',
  heading: 'Cookies',
  sections: [
    {
      id: 'co-jsou-cookies',
      title: 'Co jsou cookies',
      blocks: [
        {
          type: 'p',
          content: [
            'Cookies jsou malé textové soubory, které si při návštěvě webu ukládá váš prohlížeč. Pomáhají webu zapamatovat si vaše nastavení nebo mi ukazují, jak web lidé používají.',
          ],
        },
        {
          type: 'p',
          content: [
            'Některé cookies web potřebuje k tomu, aby vůbec fungoval. Jiné jsou volitelné a nastaví se jen s vaším souhlasem.',
          ],
        },
      ],
    },
    {
      id: 'jake-cookies',
      title: 'Jaké cookies používám',
      blocks: [
        {
          type: 'table',
          caption: 'Kategorie cookies, jejich účel, doba uložení a poskytovatel',
          columns: ['Kategorie', 'Účel'],
          rows: [
            [
              ['Nezbytné'],
              [
                'Zapamatují si vaši volbu v cookie liště, aby se vám při další návštěvě neukazovala znovu. Bez nich web nefunguje. Doba uložení: 12 měsíců. Poskytovatel: tento web.',
              ],
            ],
            [
              ['Analytické'],
              [
                'Google Analytics 4 (cookies _ga a _ga_<ID>): měření návštěvnosti a chování na webu v souhrnné podobě. Nastaví se jen s vaším souhlasem. Doba uložení: 2 roky. Poskytovatel: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irsko.',
              ],
            ],
            [['Marketingové'], ['Zatím nepoužívám.']],
          ],
        },
      ],
    },
    {
      id: 'souhlas',
      title: 'Souhlas a jeho odvolání',
      blocks: [
        {
          type: 'p',
          content: [
            'Při první návštěvě webu vás cookie lišta požádá o souhlas s analytickými cookies. Bez tohoto souhlasu se Google Analytics nespustí a žádná cookie _ga se nenastaví. Nezbytné cookies běží vždy, protože bez nich web nefunguje.',
          ],
        },
        {
          type: 'p',
          content: [
            'Souhlas platí 12 měsíců od udělení, poté se vás web zeptá znovu. Svou volbu můžete kdykoli změnit nebo odvolat tlačítkem „Nastavení cookies“ níže na této stránce nebo v patičce webu.',
          ],
        },
      ],
    },
    {
      id: 'nastaveni-cookies',
      title: 'Nastavení cookies',
      blocks: [
        {
          type: 'p',
          content: [
            'Svou volbu ohledně analytických cookies můžete kdykoli upravit: tlačítko níže otevře stejný panel nastavení, jaký najdete v patičce webu.',
          ],
        },
        { type: 'cookie-settings-button', label: 'Nastavení cookies' },
      ],
    },
    {
      id: 'nastaveni-v-prohlizeci',
      title: 'Nastavení v prohlížeči',
      blocks: [
        {
          type: 'p',
          content: [
            'Cookies můžete spravovat i přímo ve svém prohlížeči: zablokovat je, mazat po zavření nebo se nechat upozornit před jejich uložením. Nastavení najdete v možnostech ochrany soukromí vašeho konkrétního prohlížeče.',
          ],
        },
      ],
    },
  ],
};
