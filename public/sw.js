/* Firdosh Marble Arts — service worker.
 *
 * The site is one static page, so offline support is simple: keep the page,
 * its hashed build assets and the photographs the visitor has already seen.
 * Bump VERSION to drop every old cache on the next visit.
 */
const VERSION = "v1";
const SHELL = `fma-shell-${VERSION}`;
const STATIC = `fma-static-${VERSION}`;
const IMAGES = `fma-images-${VERSION}`;
const KEEP = [SHELL, STATIC, IMAGES];

const MAX_IMAGES = 60;
const NAV_TIMEOUT_MS = 3500;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(["/", "/icons/icon-192.png"]))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !KEEP.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // Router/RSC traffic and the worker itself always go to the network.
  if (url.searchParams.has("_rsc") || url.pathname === "/sw.js") return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
  } else if (url.pathname.startsWith("/_next/static/")) {
    // Content-hashed: a cached copy can never be stale.
    event.respondWith(cacheFirst(request, STATIC));
  } else if (
    url.pathname.startsWith("/_next/image") ||
    url.pathname.startsWith("/work/") ||
    url.pathname.startsWith("/icons/")
  ) {
    event.respondWith(staleWhileRevalidate(request, IMAGES, MAX_IMAGES));
  }
});

/** Fresh HTML when the network is healthy, the saved page when it is not. */
async function networkFirstPage(request) {
  const cache = await caches.open(SHELL);
  try {
    const response = await withTimeout(fetch(request), NAV_TIMEOUT_MS);
    if (response.ok && new URL(request.url).pathname === "/") {
      cache.put("/", response.clone());
    }
    return response;
  } catch {
    const saved = await cache.match("/", { ignoreSearch: true });
    return (
      saved ||
      new Response("You are offline. Please reconnect and try again.", {
        status: 503,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      })
    );
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  const refresh = fetch(request)
    .then(async (response) => {
      if (response.ok) {
        await cache.put(request, response.clone());
        trim(cache, maxEntries);
      }
      return response;
    })
    .catch(() => undefined);
  return hit || (await refresh) || Response.error();
}

async function trim(cache, max) {
  const keys = await cache.keys();
  for (const key of keys.slice(0, Math.max(0, keys.length - max))) {
    await cache.delete(key);
  }
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}
