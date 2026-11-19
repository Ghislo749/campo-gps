// Campo GPS – service worker: app offline + cache delle mappe già viste
const V = 'campogps-v1';
const SHELL = ['./', './index.html', './leaflet.js', './leaflet.css', './manifest.webmanifest',
  './icon-180.png', './icon-192.png', './icon-512.png'];
const TILE_MAX = 4000;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== V && k !== 'tiles').map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  if (u.origin === location.origin) {
    // stale-while-revalidate: parte subito anche offline, si aggiorna in background
    e.respondWith(caches.open(V).then(async c => {
      const hit = await c.match(e.request, { ignoreSearch: true });
      const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; })
        .catch(() => hit || Response.error());
      return hit || net;
    }));
  } else if (/arcgisonline\.com$|tile\.openstreetmap\.org$/.test(u.host)) {
    e.respondWith(caches.open('tiles').then(async c => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      try {
        const r = await fetch(e.request);
        if (r.ok || r.type === 'opaque') { c.put(e.request, r.clone()); trim(c); }
        return r;
      } catch (_) { return new Response('', { status: 504 }); }
    }));
  }
});

async function trim(c) {
  if (Math.random() > 0.02) return;
  const ks = await c.keys();
  if (ks.length > TILE_MAX) for (const k of ks.slice(0, ks.length - TILE_MAX)) await c.delete(k);
}
