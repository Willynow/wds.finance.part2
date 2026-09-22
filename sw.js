// v2: este service worker YA NO guarda la app en caché (eso causaba que
// las actualizaciones no se vieran). Solo limpia el caché viejo y deja
// pasar todas las peticiones directo a la red.
var OLD_CACHE_PREFIX = 'wds-finance-shell';

self.addEventListener('install', function(event){
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(
        keys.filter(function(k){ return k.indexOf(OLD_CACHE_PREFIX) === 0; })
            .map(function(k){ return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event){
  // Sin caché: siempre se pide la versión más reciente al servidor.
  event.respondWith(fetch(event.request));
});
