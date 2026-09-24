import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://patrikgajdadzis.cz',
  output: 'static',
  server: {
    // Windows: naslouchání jen na "::" (IPv6) bez tohoto nastavení odmítá
    // spojení z prohlížečů, které "localhost" přednostně řeší na 127.0.0.1.
    host: true,
  },
});
