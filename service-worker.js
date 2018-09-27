self.addEventListener('fetch', function(event) {
  let pedido = event.request
  let promiseResposta = caches.open('ceep-imagens')
    .then(cache => cache.match(pedido))
    .then(res => res || fetch(pedido))
  event.respondWith(promiseResposta)
})