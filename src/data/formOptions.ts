/**
 * Možnosti otázky „Jak jste se o mně dozvěděl/a?“ ve formulářích
 * (ContactSection.astro, sluzby/hypoteky/na-kolik-dosahnete.astro).
 * Nepovinná, ale bez popisku „(nepovinné)“ (Patrik 4. 11. 2026).
 * Hodnoty odsouhlasily Čísla a Reklama (15. 10. 2026): Google a reklama jsou
 * samostatné volby, aby šly oddělit. Server (public/api/poptavka.php,
 * HEARD_FROM) má stejný seznam jako whitelist — při změně upravit obojí.
 */
export const HEARD_FROM_OPTIONS = [
  'Google – vyhledávání',
  'Google Mapy / profil',
  'Reklama (Google)',
  'Doporučení od známého nebo klienta',
  'Seznam / Firmy.cz',
  'Sociální sítě',
  'Jiné',
] as const;
