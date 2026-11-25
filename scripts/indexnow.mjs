// IndexNow – po nasazení oznámí Bingu (a tím Copilotu), Seznamu a dalším
// vyhledávačům, které adresy jsou nové nebo změněné (implementační plán SEO
// 25. 11. 2026, A-3d). Google IndexNow nepoužívá – tomu stačí sitemapa.
//
//   node scripts/indexnow.mjs snapshot  – PŘED nahráním: uloží živou sitemapu
//   node scripts/indexnow.mjs submit    – PO nahrání: porovná s dist/ a oznámí rozdíl
//
// Oznamuje se jen to, co je nové nebo má jiné `lastmod` (u článků z
// publishedAt/updatedAt). Chyba nikdy neshodí nasazení (skript končí 0).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const HOST = 'patrikgajdadzis.cz';
const KEY = '799e4ea299b46c2d91344136d0d17ec7'; // soubor public/<KEY>.txt
const SNAPSHOT = '.indexnow-pred.json';

const parse = (xml) =>
  Object.fromEntries(
    [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => [
      m[1].match(/<loc>([^<]+)<\/loc>/)?.[1],
      m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? '',
    ])
  );

async function snapshot() {
  try {
    const res = await fetch(`https://${HOST}/sitemap-0.xml`);
    const live = res.ok ? parse(await res.text()) : {};
    writeFileSync(SNAPSHOT, JSON.stringify(live));
    console.log(`IndexNow: uložen stav živé sitemapy (${Object.keys(live).length} adres).`);
  } catch (err) {
    writeFileSync(SNAPSHOT, '{}');
    console.log(`IndexNow: živou sitemapu se nepodařilo načíst (${err.message}), oznámí se vše nové.`);
  }
}

async function submit() {
  try {
    const before = existsSync(SNAPSHOT) ? JSON.parse(readFileSync(SNAPSHOT, 'utf8')) : {};
    const after = parse(readFileSync('dist/sitemap-0.xml', 'utf8'));
    // První běh (živá sitemapa ještě nemá žádné lastmod): oznámit celý web jednou.
    const firstRun = Object.values(before).every((lastmod) => !lastmod);
    const changed = Object.entries(after)
      .filter(([url, lastmod]) => firstRun || !(url in before) || (lastmod && before[url] !== lastmod))
      .map(([url]) => url);
    if (changed.length === 0) {
      console.log('IndexNow: nic nového ani změněného, nic se neoznamuje.');
      return;
    }
    if (process.env.INDEXNOW_DRY) {
      console.log(`IndexNow (zkouška, nic se neodesílá): oznámilo by se ${changed.length} adres.`);
      changed.forEach((url) => console.log(`  ${url}`));
      return;
    }
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: changed }),
    });
    console.log(`IndexNow: odesláno ${changed.length} adres, odpověď ${res.status}.`);
    changed.forEach((url) => console.log(`  ${url}`));
  } catch (err) {
    console.log(`IndexNow: oznámení se nepodařilo (${err.message}). Nasazení tím neovlivněno.`);
  }
}

const mode = process.argv[2];
if (mode === 'snapshot') await snapshot();
else if (mode === 'submit') await submit();
else console.log('Použití: node scripts/indexnow.mjs snapshot|submit');
