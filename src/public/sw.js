const CACHE_NAME = 'story-app-shell-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/scripts/pages/login-page.js',
  '/scripts/pages/register-page.js',
  '/styles.css',
  '/scripts/app.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
];

// Cache App Shell saat install
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
  self.skipWaiting();
});

// Hapus cache lama saat activate
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

// Ambil data dari cache dulu jika offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => res || fetch(event.request))
  );
});

self.addEventListener('push', (event) => {
   console.log('📩 Push Received:', event);

  let data = {};
  try {
    data = event.data.json();
  } catch {
    data = {
      title: 'Notifikasi',
      options: { body: 'Ada notifikasi baru' },
    };
  }

  
  event.waitUntil(
    self.registration.showNotification(data.title, data.options)
  );
});

