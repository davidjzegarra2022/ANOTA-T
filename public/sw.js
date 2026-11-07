// Service worker de ANOTA-T. A propósito es mínimo:
//  * hace la app instalable (Android/iOS) y permite abrirla sin señal
//    mostrando la última versión de la página de inicio;
//  * muestra las notificaciones del sistema (en Android el navegador solo
//    las permite desde aquí) y al tocarlas abre/enfoca el panel.
// No guarda en caché datos de la base: pedidos y recordatorios siempre se
// leen en vivo de Supabase.
const CACHE = 'anotat-shell-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.add('/')).catch(() => {}))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET' || req.mode !== 'navigate') return
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok && new URL(req.url).pathname === '/') caches.open(CACHE).then((c) => c.put('/', res.clone())).catch(() => {})
        return res
      })
      .catch(() => caches.match('/').then((r) => r || Response.error())),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const target = (event.notification.data && event.notification.data.url) || '/'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      const open = wins.find((w) => new URL(w.url).origin === self.location.origin)
      if (open) return open.focus()
      return self.clients.openWindow(target)
    }),
  )
})
