const CACHE_NAME = 'matematika-v1.7';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install service worker and cache files
self.addEventListener('install', event => {
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Clean up old caches
self.addEventListener('activate', event => {
  // Take control of all pages immediately
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all([
        ...cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
        self.clients.claim()
      ]);
    })
  );
});
