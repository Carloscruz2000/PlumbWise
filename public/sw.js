// Minimal offline shell cache (avoid caching huge PDFs)
const CACHE = "plumbwise-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/app.html",
  "/css/style.css"
  // add "/js/app.js" if you split the JS out of app.html
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  const { request } = e;
  // Network-first for PDFs/resources to ensure latest files
  if (request.url.includes("/resources/")) {
    e.respondWith(fetch(request).catch(() => caches.match(request)));
    return;
  }
  // Cache-first for app shell
  e.respondWith(
    caches.match(request).then(hit => hit || fetch(request))
  );
});
