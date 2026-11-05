import { HEROES, PLAYERS, ROLES, STAT_NAMES, STAT_SHORT, EXPANSIONS, TURN_RULES, ROUND_PHASES, QUICK_FACTS, SOURCES } from './data.js';
import { CARDS } from './cards.js';

const STORAGE_KEY = 'jime-companion:v1';
const view = document.getElementById('view');

const heroById = id => HEROES.find(h => h.id === id);
const roleById = id => ROLES.find(r => r.id === id);
const playerById = id => PLAYERS.find(p => p.id === id);
const ownerOf = heroId => PLAYERS.find(p => p.heroes.includes(heroId));

// ---------- state ----------

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const s = JSON.parse(raw);
    // Drop stale ids so a data change can't render an empty hero.
    if (s.hero && !heroById(s.hero)) delete s.hero;
    if (s.role && !roleById(s.role)) delete s.role;
    return s;
  } catch (err) {
    console.warn('Cannot read saved choice, starting fresh.', err);
    return {};
  }
}

let state = loadState();
let storageWorks = true;

function saveState(patch) {
  state = { ...state, ...patch };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    storageWorks = true;
  } catch (err) {
    // Private mode / blocked storage: the app still works until reload.
    console.warn('Cannot persist choice.', err);
    storageWorks = false;
  }
}

// ---------- helpers ----------

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Card text keeps keyword reminder lines like "Strike 2 (When you attack, discard to add 2 hits.)" — render them dimmer.
function cardText(text) {
  return text.split('\n').map(line => {
    const kw = /^[A-Z][A-Za-z-]+(?: \d+| X)?(?: \(.*\))?$/.test(line.trim());
    return `<p class="${kw ? 'kw' : ''}">${esc(line)}</p>`;
  }).join('');
}

function cardHtml(c, { showXp = false } = {}) {
  const badges = [];
  if (c.copies > 1) badges.push(`<span class="badge">×${c.copies}</span>`);
  if (c.success) badges.push(`<span class="badge success" title="Symbol sukcesu">✦ ${c.success}</span>`);
  if (c.fate) badges.push(`<span class="badge fate" title="Symbol losu">◈ ${c.fate}</span>`);
  if (showXp) badges.push(`<span class="badge xp">${c.xp} XP</span>`);
  const types = c.types.length ? `<span class="types">${esc(c.types.join(' · '))}</span>` : '';
  return `<article class="skill">
    <header><h4>${esc(c.name)}</h4><div class="badges">${badges.join('')}</div></header>
    ${types}
    <div class="skill-text">${cardText(c.text)}</div>
  </article>`;
}

function roleLabel(roleId) {
  const r = roleById(roleId);
  return r ? `${r.pl} <span class="en">${r.en}</span>` : '—';
}

function statsHtml(h) {
  return `<div class="stats">${h.stats.map((v, i) => `
    <div class="stat" title="${STAT_NAMES[i]}"><span class="stat-v">${v}</span><span class="stat-n">${STAT_NAMES[i]}</span></div>`).join('')}
  </div>
  <div class="limits">
    <div><span>${h.damage}</span>próg obrażeń</div>
    <div><span>${h.fear}</span>próg strachu</div>
    <div><span>${h.inspiration}</span>limit natchnienia</div>
  </div>`;
}

function heroHead(h) {
  const owner = ownerOf(h.id);
  return `<div class="hero-head">
    <div class="sigil" aria-hidden="true">${esc(h.name[0])}</div>
    <div>
      <h2>${esc(h.name)}</h2>
      <p class="meta">${esc(h.race)} · ${esc(EXPANSIONS[h.expansion])}${owner ? ` · pula: ${esc(owner.name)}` : ''}</p>
    </div>
  </div>`;
}

// Full hero sheet: used for "my hero" and for viewing teammates.
function heroSheet(h, roleId, { mine = false } = {}) {
  const roleCards = CARDS.roles[roleId];
  const heroCards = CARDS.heroes[h.id] || [];
  const roleSelect = mine ? `<label class="role-pick">Rola
      <select id="role-select">${ROLES.map(r => `<option value="${r.id}" ${r.id === roleId ? 'selected' : ''}>${esc(r.pl)} · ${esc(r.en)}</option>`).join('')}</select>
    </label>` : `<p class="meta">Sugerowana rola: ${roleLabel(roleId)}</p>`;

  return `${heroHead(h)}
    ${statsHtml(h)}
    <section class="block ability">
      <h3>Zdolność</h3>
      <p>${esc(h.ability)}</p>
    </section>
    <section class="block">
      ${roleSelect}
      <p class="meta">Ekwipunek startowy (I poziom): ${esc(h.gear)}</p>
      <p class="tip"><b>${esc(h.style)}.</b> ${esc(h.tip)}</p>
    </section>
    <section class="block">
      <h3>Karty bohatera <span class="count">${heroCards.reduce((n, c) => n + c.copies, 0)}</span></h3>
      <div class="skills">${heroCards.map(c => cardHtml(c)).join('')}</div>
    </section>
    ${roleCards ? `<section class="block">
      <h3>Karty startowe roli: ${roleLabel(roleId)}</h3>
      <div class="skills">${roleCards.starter.map(c => cardHtml(c)).join('')}</div>
      <a class="link" href="#/role/${roleId}">Ulepszenia roli (${roleCards.upgrades.length}) →</a>
    </section>` : ''}
    <p class="fine">Teksty kart po angielsku, jak na kartach. W razie rozbieżności rozstrzyga karta i aplikacja.</p>`;
}

// ---------- views ----------

function renderSetup(step) {
  const player = playerById(state.player);
  if (step !== 'hero' || !player) {
    return `<h1 class="title">Kim jesteś?</h1>
      <div class="choices">${PLAYERS.map(p => `
        <button class="choice" data-player="${p.id}"><b>${esc(p.name)}</b><span>${p.heroes.length} bohaterów w puli</span></button>`).join('')}
      </div>`;
  }
  return `<h1 class="title">${esc(player.name)}, wybierz bohatera</h1>
    <div class="choices">${player.heroes.map(id => {
      const h = heroById(id);
      return `<button class="choice hero-choice ${state.hero === id ? 'on' : ''}" data-hero="${id}">
        <b>${esc(h.name)}</b><span>${esc(h.race)} · ${esc(h.style)}</span>
        <span class="mini-stats">${h.stats.map((v, i) => `${STAT_SHORT[i]} ${v}`).join(' · ')} — ${h.damage}/${h.fear}/${h.inspiration}</span>
      </button>`;
    }).join('')}</div>
    <button class="ghost" data-goto="#/setup">← Zmień gracza</button>`;
}

function renderMe() {
  const h = heroById(state.hero);
  if (!h) { location.hash = '#/setup'; return ''; }
  const role = state.role || h.role;
  const player = playerById(state.player);
  return `<div class="topline"><span>${player ? esc(player.name) : ''}</span><button class="ghost small" data-goto="#/setup/hero">Zmień bohatera</button></div>
    ${heroSheet(h, role, { mine: true })}
    ${storageWorks ? '' : '<p class="warn">Przeglądarka blokuje zapis — wybór zniknie po odświeżeniu.</p>'}`;
}

function renderTeam(filter) {
  const list = filter ? (playerById(filter)?.heroes || []).map(heroById) : HEROES;
  return `<h1 class="title">Drużyna</h1>
    <div class="tabs">
      <a class="tab ${!filter ? 'on' : ''}" href="#/team">Wszyscy</a>
      ${PLAYERS.map(p => `<a class="tab ${filter === p.id ? 'on' : ''}" href="#/team/${p.id}">${esc(p.name)}</a>`).join('')}
    </div>
    <div class="team">${list.map(h => `
      <a class="team-row ${h.id === state.hero ? 'mine' : ''}" href="#/hero/${h.id}">
        <div class="row-head"><b>${esc(h.name)}</b><span class="meta">${esc(ownerOf(h.id)?.name || '')}</span></div>
        <p>${esc(h.ability)}</p>
      </a>`).join('')}
    </div>`;
}

function renderHero(id) {
  const h = heroById(id);
  if (!h) return `<p>Nie znaleziono bohatera.</p>`;
  return `<button class="ghost" data-back>← Wróć</button>${heroSheet(h, h.role)}`;
}

function renderRoles() {
  return `<h1 class="title">Role</h1>
    <p class="meta">Rola to zestaw umiejętności. Można ją zmienić między przygodami.</p>
    <div class="team">${ROLES.map(r => {
      const rc = CARDS.roles[r.id];
      return `<a class="team-row ${r.id === state.role ? 'mine' : ''}" href="#/role/${r.id}">
        <div class="row-head"><b>${esc(r.pl)} <span class="en">${esc(r.en)}</span></b></div>
        <p>${rc.starter.map(c => esc(c.name)).join(' · ')}</p>
      </a>`;
    }).join('')}</div>`;
}

function renderRole(id) {
  const r = roleById(id);
  const rc = CARDS.roles[id];
  if (!r || !rc) return `<p>Nie znaleziono roli.</p>`;
  return `<button class="ghost" data-back>← Wróć</button>
    <h1 class="title">${esc(r.pl)} <span class="en">${esc(r.en)}</span></h1>
    <section class="block"><h3>Karty startowe</h3><div class="skills">${rc.starter.map(c => cardHtml(c)).join('')}</div></section>
    <section class="block"><h3>Ulepszenia</h3><div class="skills">${rc.upgrades.map(c => cardHtml(c, { showXp: true })).join('')}</div></section>`;
}

function renderRules() {
  return `<h1 class="title">Zasady w pigułce</h1>
    <section class="block"><h3>Runda</h3>
      <ol class="phases">${ROUND_PHASES.map(p => `<li><span class="meta">${esc(p.label)}</span><b>${esc(p.title)}</b><p>${esc(p.text)}</p></li>`).join('')}</ol>
    </section>
    <section class="block"><h3>Twoja tura</h3>
      ${TURN_RULES.map(r => `<details><summary>${esc(r.title)}</summary><p>${esc(r.text)}</p></details>`).join('')}
    </section>
    <section class="block"><h3>Pojęcia</h3>
      <dl class="facts">${QUICK_FACTS.map(f => `<dt>${esc(f.term)}</dt><dd>${esc(f.text)}</dd>`).join('')}</dl>
    </section>
    <section class="block"><h3>Źródła</h3>
      <ul class="sources">${SOURCES.map(s => `<li><a href="${esc(s.url)}" target="_blank" rel="noreferrer">${esc(s.label)} ↗</a></li>`).join('')}</ul>
      <p class="fine">Nieoficjalna ściąga. Pierwszeństwo mają karty, instrukcja i komunikaty aplikacji.</p>
    </section>`;
}

// ---------- router ----------

function route() {
  const [, page = '', arg] = location.hash.split('/');
  if (!page) {
    location.replace(state.hero ? '#/me' : '#/setup');
    return;
  }
  let html;
  switch (page) {
    case 'setup': html = renderSetup(arg); break;
    case 'me': html = renderMe(); break;
    case 'team': html = renderTeam(arg); break;
    case 'hero': html = renderHero(arg); break;
    case 'roles': html = renderRoles(); break;
    case 'role': html = renderRole(arg); break;
    case 'rules': html = renderRules(); break;
    default: location.replace('#/'); return;
  }
  view.innerHTML = html;
  const navKey = { setup: 'me', hero: 'team', role: 'roles' }[page] || page;
  document.querySelectorAll('.nav a').forEach(a => a.classList.toggle('on', a.dataset.nav === navKey));
  window.scrollTo(0, 0);
}

view.addEventListener('click', e => {
  const t = e.target.closest('button');
  if (!t) return;
  if (t.dataset.player) {
    // Switching player invalidates a hero from another pool.
    const keepHero = playerById(t.dataset.player).heroes.includes(state.hero);
    saveState({ player: t.dataset.player, ...(keepHero ? {} : { hero: undefined, role: undefined }) });
    location.hash = '#/setup/hero';
  } else if (t.dataset.hero) {
    const changed = state.hero !== t.dataset.hero;
    saveState({ hero: t.dataset.hero, ...(changed ? { role: heroById(t.dataset.hero).role } : {}) });
    location.hash = '#/me';
  } else if (t.dataset.goto) {
    location.hash = t.dataset.goto;
  } else if ('back' in t.dataset) {
    history.length > 1 ? history.back() : (location.hash = '#/team');
  }
});

view.addEventListener('change', e => {
  if (e.target.id === 'role-select') {
    saveState({ role: e.target.value });
    route();
  }
});

window.addEventListener('hashchange', route);
route();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(err => console.error('Service worker registration failed', err));
}
