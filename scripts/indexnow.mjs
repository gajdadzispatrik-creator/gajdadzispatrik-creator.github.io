// IndexNow – po nasazení oznámí Bingu (a tím Copilotu), Seznamu a dalším
// vyhledávačům, které adresy jsou nové nebo změněné (implementační plán SEO
// 25. 11. 2026, A-3d). Google IndexNow nepoužívá – tomu stačí sitemapa.
//
//   node scripts/indexnow.mjs snapshot  – PŘED nahráním: uloží živou sitemapu
//   node scripts/indexnow.mjs submit    – PO nahrání: porovná s dist/ a oznámí rozdíl
//
// Oznamuje se jen to, co je nové nebo má jiné `lastmod` (u článků z
// publishedAt/updatedAt). Chyba nikdy neshodí nasazení (skript končí 0).
//
// Oprava 26. 11. 2026: web běží za ochranou WEDOS Protection, která skriptům
// s výchozím podpisem „node“ může vrátit ověřovací výzvu (HTTP 401) místo
// sitemapy. Dřív se taková chyba načtení vyhodnotila jako „první běh“ a
// oznámil se celý web. Nově:
//   • živá sitemapa se čte s vlastním podpisem a až třemi pokusy,
//   • odpověď se počítá jen tehdy, když je to opravdu sitemapa s adresami,
//   • chyba načtení NENÍ změna obsahu: v náhradním režimu se oznámí jen
//     adresy, jejichž vlastní `lastmod` je z posledních dnů (nový článek),
//     nic dalšího.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const HOST = 'patrikgajdadzis.cz';
const KEY = '799e4ea299b46c2d91344136d0d17ec7'; // soubor public/<KEY>.txt
const SNAPSHOT = '.indexnow-pred.json';
// Adresu živé sitemapy lze pro zkoušky přepsat proměnnou INDEXNOW_LIVE_SITEMAP.
const LIVE_SITEMAP = process.env.INDEXNOW_LIVE_SITEMAP || `https://${HOST}/sitemap-0.xml`;
const USER_AGENT = `patrikgajdadzis-deploy/1.0 (+https://${HOST}/; IndexNow)`;
const ATTEMPTS = 3;
// Náhradní režim: jak staré `lastmod` se ještě považuje za čerstvou změnu.
const FALLBACK_DAYS = 2;

const parse = (xml) =>
  Object.fromEntries(
    [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
      .map((m) => [
        m[1].match(/<loc>([^<]+)<\/loc>/)?.[1],
        m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? '',
      ])
      .filter(([loc]) => loc)
  );

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Vrátí { ok: true, urls } jen pro skutečnou sitemapu s adresami, jinak { ok: false, reason }.
async function loadLive() {
  let reason = 'neznámá chyba';
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    try {
      const res = await fetch(LIVE_SITEMAP, {
        headers: { 'User-Agent': USER_AGENT, Accept: 'application/xml,text/xml;q=0.9,*/*;q=0.1' },
      });
      const text = await res.text();
      const urls = parse(text);
      if (res.ok && text.includes('<urlset') && Object.keys(urls).length > 0) return { ok: true, urls };
      reason = res.ok ? 'odpověď není sitemapa s adresami' : `HTTP ${res.status}`;
    } catch (err) {
      reason = err.message;
    }
    if (attempt < ATTEMPTS) await wait(3000 * attempt);
  }
  return { ok: false, reason };
}

async function snapshot() {
  try {
    const live = await loadLive();
    writeFileSync(SNAPSHOT, JSON.stringify(live));
    if (live.ok) {
      console.log(`IndexNow: uložen stav živé sitemapy (${Object.keys(live.urls).length} adres).`);
    } else {
      console.log(
        `IndexNow: živou sitemapu se nepodařilo načíst (${live.reason}). Po nahrání se oznámí jen adresy s čerstvým datem změny.`
      );
    }
  } catch (err) {
    console.log(`IndexNow: stav před nahráním se nepodařilo uložit (${err.message}). Nasazení tím neovlivněno.`);
  }
}

// Stav před nahráním. Starý tvar souboru (prostá mapa adres) se bere jako platný jen tehdy, když není prázdný.
function readSnapshot() {
  if (!existsSync(SNAPSHOT)) return { ok: false, reason: 'chybí soubor se stavem před nahráním' };
  const data = JSON.parse(readFileSync(SNAPSHOT, 'utf8'));
  if (typeof data.ok === 'boolean') return data;
  return Object.keys(data).length > 0 ? { ok: true, urls: data } : { ok: false, reason: 'prázdný stav před nahráním' };
}

function changedUrls(snap, after) {
  if (snap.ok) {
    const before = snap.urls;
    // První běh (živá sitemapa ještě nemá žádné lastmod): oznámit celý web jednou.
    const firstRun = Object.values(before).every((lastmod) => !lastmod);
    return Object.entries(after)
      .filter(([url, lastmod]) => firstRun || !(url in before) || (lastmod && before[url] !== lastmod))
      .map(([url]) => url);
  }
  // Náhradní režim: chyba načtení se nepočítá jako změna obsahu.
  const limit = Date.now() - FALLBACK_DAYS * 24 * 60 * 60 * 1000;
  console.log(
    `IndexNow: náhradní režim (${snap.reason}). Oznamují se jen adresy s datem změny z posledních ${FALLBACK_DAYS} dnů.`
  );
  return Object.entries(after)
    .filter(([, lastmod]) => lastmod && Date.parse(lastmod) >= limit)
    .map(([url]) => url);
}

async function submit() {
  try {
    const after = parse(readFileSync('dist/sitemap-0.xml', 'utf8'));
    const changed = changedUrls(readSnapshot(), after);
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
