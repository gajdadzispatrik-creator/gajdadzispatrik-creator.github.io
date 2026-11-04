// Má dnes vyjít schválený článek? (Patrik 4. 11. 2026: články se mají
// publikovat samy.) Používá ranní plán v .github/workflows/deploy-wedos.yml:
// web se sestaví a nahraje jen v den, kdy má článek bez `draft: true`
// datum `publishedAt` rovné dnešku (český čas). Jinak se nic nenahrává.
//
// Výstup: řádek `due=true|false` do $GITHUB_OUTPUT (v Actions) a výpis.
// Ručně: node scripts/clanky-k-vydani.mjs [YYYY-MM-DD]
import { readdirSync, readFileSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'src/content/clanky';
const today =
  process.argv[2] ??
  new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Prague' }).format(new Date());

const due = [];
const upcoming = [];
for (const file of readdirSync(dir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))) {
  const text = readFileSync(join(dir, file), 'utf8');
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  const draft = /^draft:\s*true\s*$/m.test(fm);
  const date = fm.match(/^publishedAt:\s*['"]?(\d{4}-\d{2}-\d{2})/m)?.[1];
  if (draft || !date) continue;
  if (date === today) due.push(file);
  else if (date > today) upcoming.push(`${date} ${file}`);
}

console.log(`Dnes (${today}) vychází: ${due.length ? due.join(', ') : 'nic'}`);
if (upcoming.length) console.log(`Naplánováno: ${upcoming.sort().join(' | ')}`);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `due=${due.length > 0}\n`);
