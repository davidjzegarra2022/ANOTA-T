// «Probar aviso push» desde la campanita: el negociante (con su sesión)
// se envía una notificación de prueba a sus propios dispositivos.
import { missingConfig, pushEnv, send, sendToMerchants } from './_push.js'

export default async function handler(req, res, { fetchImpl = fetch, webpushImpl, env = process.env } = {}) {
  if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed' })
  const cfg = pushEnv(env)
  const missing = missingConfig(cfg)
  if (missing.length) return send(res, 503, { error: 'push_not_configured', missing })
  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '')
  if (!token) return send(res, 401, { error: 'unauthorized' })
  // Se valida la sesión con Supabase: solo se le envía a SU tienda.
  const who = await fetchImpl(`${cfg.supabaseUrl}/auth/v1/user`, { headers: { apikey: cfg.anonKey || cfg.serviceKey, Authorization: `Bearer ${token}` } })
  if (!who.ok) return send(res, 401, { error: 'unauthorized' })
  const user = await who.json()
  try {
    const r = await sendToMerchants(cfg, fetchImpl, webpushImpl, [user.id], () => ({
      title: '✅ Avisos push activados',
      body: 'Así te llegarán tus recordatorios y pedidos nuevos, aunque ANOTA-T esté cerrado.',
      tag: 'push-test',
      kind: 'reminder',
      url: '/',
    }))
    return send(res, 200, { ok: true, ...r })
  } catch (err) {
    return send(res, 500, { error: 'send_failed', detail: String(err?.message || err).slice(0, 200) })
  }
}
