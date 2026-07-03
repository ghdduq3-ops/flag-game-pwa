const CACHE_NAME = "flag-coloring-layout-v19";
const FILES_TO_CACHE = ["./", "./index.html?v=19", "./index.html", "./manifest.json", "./flag_bgm_exciting.wav", "./icons/icon.svg"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(names => Promise.all(names.map(name => {
    if (name !== CACHE_NAME) return caches.delete(name);
  }))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
