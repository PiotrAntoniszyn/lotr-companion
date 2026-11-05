import fs from 'node:fs';

// Build a trimmed card snapshot (role + hero personal cards) from the JIME Companion bundle.
// Usage: node build-cards.mjs <bundle.js> <out.json>
const src = fs.readFileSync(process.argv[2], 'utf8');
const re = /JSON\.parse\(`(\[[\s\S]*?\])`\)/g;
const BS = String.fromCharCode(92);
const arrays = [];
let m;
while ((m = re.exec(src))) {
  const txt = m[1].split(BS + BS).map(p => p.split(BS + '`').join('`')).join(BS);
  arrays.push(JSON.parse(txt));
}
const flat = arrays.flat();

const HEROES = ['aragorn', 'beravor', 'bilbo', 'elena', 'gimli', 'legolas', 'arwen', 'balin', 'dis', 'eleanor',
  'gandalf', 'beorn', 'boromir', 'calaminth-took', 'dwalin', 'freahild', 'renerien'];
const ROLES = ['captain', 'pathfinder', 'burglar', 'musician', 'guardian', 'hunter', 'herbalist', 'delver', 'smith',
  'traveller', 'meddler', 'guide', 'soldier', 'provisioner', 'lorekeeper', 'shieldmaiden', 'trickster'];

const slim = c => ({
  name: c.name,
  xp: c.xp_cost,
  copies: c.copies,
  success: c.symbols_success,
  fate: c.symbols_fate,
  types: c.types,
  text: c.effect_text,
});

const heroCards = {};
for (const c of flat.filter(c => c && c.hero)) (heroCards[c.hero] ??= []).push(slim(c));
const roleCards = {};
for (const c of flat.filter(c => c && c.role && ROLES.includes(c.role))) {
  const r = (roleCards[c.role] ??= { starter: [], upgrades: [] });
  (c.is_starter ? r.starter : r.upgrades).push(slim(c));
}
for (const r of Object.values(roleCards)) r.upgrades.sort((a, b) => a.xp - b.xp || a.name.localeCompare(b.name));

const missingHeroes = HEROES.filter(h => !heroCards[h]);
const missingRoles = ROLES.filter(r => !roleCards[r]);
console.log('hero ids in bundle:', Object.keys(heroCards).join(', '));
console.log('missing heroes:', missingHeroes, 'missing roles:', missingRoles);
for (const h of HEROES) console.log(h, (heroCards[h] || []).map(c => `${c.name}(${c.xp})`).join(', '));

const out = {
  source: 'https://jime-companion.therealbarenziah.com/',
  extractedAt: new Date().toISOString().slice(0, 10),
  heroes: Object.fromEntries(HEROES.map(h => [h, heroCards[h] || []])),
  roles: Object.fromEntries(ROLES.map(r => [r, roleCards[r]])),
};
fs.writeFileSync(process.argv[3], JSON.stringify(out, null, 1));
