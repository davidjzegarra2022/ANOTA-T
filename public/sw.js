// Service worker de ANOTA-T. A propósito es mínimo:
//  * hace la app instalable (Android/iOS) y permite abrirla sin señal
//    mostrando la última versión de la página de inicio;
//  * muestra las notificaciones del sistema (en Android el navegador solo
//    las permite desde aquí) y al tocarlas abre/enfoca el panel.
// No guarda en caché datos de la base: pedidos y recordatorios siempre se
// leen en vivo de Supabase.
const CACHE = 'anotat-shell-v3'

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

// Aviso push desde el servidor (/api/push-dispatch). Si ANOTA-T está abierto
// y a la vista, no se duplica: la propia página ya muestra su ventanita.
self.addEventListener('push', (event) => {
  let data = {}
  try {
    data = event.data ? event.data.json() : {}
  } catch {
    data = { title: 'ANOTA-T', body: event.data ? event.data.text() : '' }
  }
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      const visible = wins.some((w) => w.visibilityState === 'visible' && w.focused)
      if (visible && data.tag !== 'push-test') return undefined
      return self.registration.showNotification(data.title || 'ANOTA-T', {
        body: data.body || '',
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        tag: data.tag || 'anotat',
        renotify: true,
        vibrate: data.kind === 'order' ? [120, 60, 220] : [160, 80, 160, 80, 300],
        data: { url: data.url || '/' },
      })
    }),
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
