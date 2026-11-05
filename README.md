# Ściąga Śródziemia

Offline PWA cheat sheet for *The Lord of the Rings: Journeys in Middle-earth*, built for one 4-player group.
Each player picks their hero (from a fixed pool) and role; the app then shows stats, ability, hero and role skill cards, role upgrades, teammates' abilities and a rules summary.
It is a reference only: game state (damage, fear, inspiration) stays on the table, and the scenario runs in the official app.

## Run

Static files, no build. Any static server works:

```sh
python -m http.server 8765   # then open http://127.0.0.1:8765/
```

Deploy by pushing the folder to GitHub Pages (relative paths, works from a subpath).
Install on a phone via "Add to Home Screen".

## Data

- `js/data.js`: heroes, player pools and rules, copied from [je3yk/boardgame-setup](https://github.com/je3yk/boardgame-setup).
- `js/cards.js`: hero and role skill cards (English text) extracted from the [JIME Companion](https://jime-companion.therealbarenziah.com/) bundle.
  Regenerate: download its `assets/index-*.js`, then `node scripts/build-cards.mjs <bundle.js> cards.json` and wrap the output as `export const CARDS = …;`.
- Icons: `python scripts/make_icons.py`.

After changing any shipped file, bump `VERSION` in `sw.js`, otherwise installed copies keep serving the old cache.

The choice is stored per device in `localStorage`; there is no sync between phones.
