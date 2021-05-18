self.addEventListener('install', (evt) => {
  console.log('[Service Worker] installing');

  // Activate imidiatley
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[Service Worker] Activating');

  // Start fetch-event imidietly
  evt.waitUntil(clients.claim());
});

// Not to sleep between events (default behavior is to sleep between)
self.addEventListener('fetch', (evt) => {
  evt.respondWith(onFetch(evt));
});

async function onFetch(evt) {
  if (navigator.onLine) {
    let response = await fetch(evt.request);

    let cache = await caches.open('dynamic-cache');

    // dont cashe this
    if (!evt.request.url.endsWith('.png') && !evt.request.url.endsWith('.jpg') && !evt.request.url.endsWith('.jpeg'))
      cache.put(evt.request, response.clone());

    return response;
  }

  // If offline, return response from cache
  else {
    return await caches.match(evt.request);
  }
}
