// public/sw.js
// --- PlumbWise Service Worker ---
// v3: bump this when you change caching rules to force an update
const CACHE_NAME = "plumbwise-v3";

// Only cache small, frequently used shell assets (NOT PDFs)
const APP_SHELL = [
  "/",
  "/index.html",
  "/app.html",
  "/css/style.css",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Enable navigation preload for faster HTML on supported browsers
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    if ("navigationPreload" in self.registration) {
      await self.registration.navigationPreload.enable();
    }
    // Clean old caches
    const names = await caches.keys();
    await Promise.all(
      names
        .filter((n) => n.startsWith("plumbwise-") && n !== CACHE_NAME)
        .map((n) => caches.delete(n))
    );
  })());
  self.clients.claim();
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return; // let non-GET pass through

  const url = new URL(req.url);

  // 1) HTML/navigation → NETWORK FIRST (so you always get newest app code)
  const isHTML =
    req.mode === "navigate" ||
    (req.headers.get("accept") || "").includes("text/html");

  if (isHTML) {
    event.respondWith(
      (async () => {
        try {
          // If navigationPreload is available, prefer it
          const preload = await event.preloadResponse;
          if (preload) return preload;
          const fresh = await fetch(req, { cache: "no-store" });
          // Update cache copy in background
          const cache = await caches.open(CACHE_NAME);
          cache.put("/app.html", fresh.clone()).catch(() => {});
          return fresh;
        } catch {
          // Fallback to cached shell
          const cache = await caches.open(CACHE_NAME);
          return (await cache.match(url.pathname)) ||
                 (await cache.match("/app.html")) ||
                 new Response("Offline", { status: 503 });
        }
      })()
    );
    return;
  }

  // 2) Big files under /resources/ (PDFs etc.) → NETWORK FIRST, DON'T CACHE
  if (url.pathname.startsWith("/resources/")) {
    event.respondWith(
      fetch(req).catch(async () => {
        // As a last resort, try cache (in case the browser cached it itself)
        const cache = await caches.open(CACHE_NAME);
        return cache.match(req, { ignoreSearch: true }) ||
               new Response("Resource offline", { status: 503 });
      })
    );
    return;
  }

  // 3) Static assets (CSS/manifest/icons) → CACHE FIRST, then update in bg
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req, { ignoreSearch: true });
      const fetchPromise = fetch(req)
        .then((res) => {
          // Only cache OK, small-ish, same-origin responses
          try {
            if (res && res.ok && url.origin === location.origin) {
              cache.put(req, res.clone());
            }
          } catch {}
          return res;
        })
        .catch(() => null);
      return cached || (await fetchPromise) || new Response("Offline", { status: 503 });
    })()
  );
});

// Optional: allow pages to trigger an immediate SW update
self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") self.skipWaiting();
});
