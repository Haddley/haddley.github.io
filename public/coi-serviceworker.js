/* coi-serviceworker — injects COOP/COEP headers so SharedArrayBuffer (required
   by WebLLM) works on static hosts like GitHub Pages that can't set HTTP headers.

   Scope discipline: this worker is registered at '/', which means it controls
   EVERY path on haddley.github.io — including the project sites (/vision,
   /three, /games, /3dlive, …) that are separate repos. Blanket interception
   broke them two ways: intercepted redirected navigations (/vision → /vision/)
   fail in Safari, and COEP require-corp blocks their cross-origin assets.
   WebLLM only runs on this Next.js site's own pages, and cross-origin
   isolation only requires headers on the DOCUMENT (BlogAgent has no worker;
   same-origin subresources satisfy require-corp automatically) — so isolate
   exactly those documents and pass every other request through untouched. */

const ISOLATED_PAGES = ['/index.html', '/404.html'];
const ISOLATED_PREFIXES = ['/posts', '/categories'];

function needsIsolation(path) {
  return path === '/' || ISOLATED_PAGES.includes(path) ||
    ISOLATED_PREFIXES.some((p) => path === p || path.startsWith(p + '/'));
}

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.mode !== 'navigate') return;
  if (!needsIsolation(new URL(request.url).pathname)) return;
  event.respondWith(
    fetch(request).then((response) => {
      // Redirects pass through untouched: reconstructing one breaks the
      // navigation (redirect mode is 'manual'); the follow-up request for the
      // final URL comes back through here and gets the headers.
      if (response.status === 0 || response.type === 'opaqueredirect' || response.redirected) {
        return response;
      }
      const headers = new Headers(response.headers);
      headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
      headers.set('Cross-Origin-Opener-Policy', 'same-origin');
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    })
  );
});
