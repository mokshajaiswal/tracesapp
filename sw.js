const CACHE_NAME = 'my-app-cache-v1';
// Add the paths to the files you want to cache
const urlsToCache = [
  '/',
  '/index.html',
  // Add other important pages, stylesheets, or scripts here
  // For Next.js static exports, you might add:
  // '/_next/static/css/...',
  // '/_next/static/js/...'
];

// Install event: cache the essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});