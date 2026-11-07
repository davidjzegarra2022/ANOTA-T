// Utilidades compartidas de las notificaciones push (no es una ruta: los
// archivos de /api que empiezan con «_» no se publican como funciones).
import webpush from 'web-push'
import { timingSafeEqual } from 'node:crypto'

export function pushEnv(env = process.env) {
  return {
    supabaseUrl: String(env.SUPABASE_URL || env.VITE_SUPABASE_URL || '').replace(/\/$/, ''),
    serviceKey: env.SUPABASE_SERVICE_ROLE_KEY || '',
    anonKey: env.VITE_SUPABASE_ANON_KEY || '',
    vapidPublic: env.VAPID_PUBLIC_KEY || '',
    vapidPrivate: env.VAPID_PRIVATE_KEY || '',
    vapidSubject: env.VAPID_SUBJECT || 'mailto:helpanotat@gmail.com',
    secret: env.PUSH_DISPATCH_SECRET || '',
  }
}

export function missingConfig(cfg) {
  return ['supabaseUrl', 'serviceKey', 'vapidPublic', 'vapidPrivate'].filter((k) => !cfg[k])
}

export function sameSecret(a, b) {
  const x = Buffer.from(String(a || ''))
  const y = Buffer.from(String(b || ''))
  return x.length > 0 && x.length === y.length && timingSafeEqual(x, y)
}

/** Llama una función de Supabase con la clave de servicio (solo en el servidor). */
export async function rpc(cfg, fetchImpl, name, args = {}) {
  const res = await fetchImpl(`${cfg.supabaseUrl}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { apikey: cfg.serviceKey, Authorization: `Bearer ${cfg.serviceKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(args),
  })
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status} ${await res.text().catch(() => '')}`.slice(0, 300))
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

/**
 * Envía `payload` a todas las suscripciones de esas tiendas. Las que el
 * navegador dio de baja (404/410) se eliminan. Devuelve cuántas salieron.
 */
export async function sendToMerchants(cfg, fetchImpl, webpushImpl, merchantIds, payloadFor) {
  const ids = [...new Set(merchantIds)].filter(Boolean)
  if (!ids.length) return { sent: 0, gone: 0 }
  const subs = (await rpc(cfg, fetchImpl, 'push_subscriptions_for', { p_merchants: ids })) || []
  const wp = webpushImpl || webpush
  wp.setVapidDetails(cfg.vapidSubject, cfg.vapidPublic, cfg.vapidPrivate)
  const ok = []
  const gone = []
  await Promise.all(
    subs.map(async (s) => {
      const payload = payloadFor(s.merchant_id)
      if (!payload) return
      try {
        await wp.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, JSON.stringify(payload), { TTL: 3600, urgency: 'high' })
        ok.push(s.endpoint)
      } catch (err) {
        if (err?.statusCode === 404 || err?.statusCode === 410) gone.push(s.endpoint)
      }
    }),
  )
  if (ok.length || gone.length) await rpc(cfg, fetchImpl, 'push_mark_sent', { p_endpoints: ok, p_gone: gone })
  return { sent: ok.length, gone: gone.length }
}

/** Fecha y hora actuales en Lima (para los turnos de 9, 13 y 18 h). */
export function limaNow(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  )
  return { date: `${parts.year}-${parts.month}-${parts.day}`, hour: Number(parts.hour) % 24 }
}

export const SUMMARY_HOURS = [9, 13, 18]

export function readJson(req) {
  if (req.body && typeof req.body === 'object') return Promise.resolve(req.body)
  if (typeof req.body === 'string') return Promise.resolve(JSON.parse(req.body || '{}'))
  return new Promise((resolve) => {
    let data = ''
    req.on('data', (c) => (data += c))
    req.on('end', () => {
      try {
        resolve(JSON.parse(data || '{}'))
      } catch {
        resolve({})
      }
    })
  })
}

export function send(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}
