/* This worker used to add cross-origin-isolation headers to some pages so WebLLM could use SharedArrayBuffer.
   Nothing on the site needs that any more, and the page script that depended on it reloaded the topic pages
   forever. The file stays at this address only so that browsers which still have the old worker installed
   fetch this version at their next update check, which removes it. It intercepts nothing. */

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.registration.unregister()));
