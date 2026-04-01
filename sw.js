const CACHE = 'martsan-uutiset-v1';
const ASSETS = [
  '/martsan-uutiset/',
  '/martsan-uutiset/index.html'
];
 
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});
 
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});
 
self.addEventListener('fetch', e => {
  // JSONbin-pyynnöt aina verkosta, ei cachesta
  if (e.request.url.includes('jsonbin.io')) return;
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
