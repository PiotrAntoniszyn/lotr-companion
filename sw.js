// Cache-first app shell: the app must work at the table without network.
// Bump VERSION whenever any file below changes, otherwise phones keep the old copy.
const VERSION = 'v1';
const CACHE = `jime-companion-${VERSION}`;
const SHELL = [
  './',
  './index.html',
  './css/app.css',
  './js/app.js',
  './js/data.js',
  './js/cards.js',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('jime-companion-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== location.origin) return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(hit => hit || fetch(event.request)),
  );
});
