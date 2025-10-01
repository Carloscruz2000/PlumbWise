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
function setActive(email, active){
  if (active) {
    localStorage.setItem("plumbwise_active","1");
    if (email) localStorage.setItem("plumbwise_email", email);
  } else {
    localStorage.removeItem("plumbwise_active");
  }
  reflectAccessUI();
}
function isActive(){ return localStorage.getItem("plumbwise_active")==="1"; }
function savedEmail(){ return localStorage.getItem("plumbwise_email") || ""; }

function reflectAccessUI(){
  const badge = document.getElementById("accessState");
  if (badge) badge.textContent = isActive() ? "Access: Active" : "Access: Locked";
  const subBtn = [...document.querySelectorAll("button, a.btn")].find(b => /Subscribe/i.test(b?.textContent||""));
  if (subBtn) subBtn.style.display = isActive() ? "none" : "";
}

// Re-check on load using saved email (keeps access after refresh)
window.addEventListener("DOMContentLoaded", async () => {
  reflectAccessUI();
  const email = savedEmail();
  if (!email) return; // nothing to check
  try {
    const res = await fetch("/api/subscription-status", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    setActive(email, !!data.active);
  } catch {}
});
