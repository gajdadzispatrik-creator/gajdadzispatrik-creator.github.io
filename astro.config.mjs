import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://patrikgajdadzis.cz',
  output: 'static',
  server: {
    // Windows: bez explicitního hosta naslouchal dev server jen na "::"
    // (IPv6) a odmítal spojení na 127.0.0.1. `host: true` to řešilo, ale
    // otevíralo server celé lokální síti — 127.0.0.1 stačí a zůstane jen na
    // tomhle počítači (prohlížeče i Node při „localhost“ zkusí obě adresy).
    host: '127.0.0.1',
  },
});
