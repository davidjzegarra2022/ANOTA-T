// «Consultar en Shalom» desde el panel del negociante.
// POST {"order_id": 123} con la sesión del negociante (Authorization: Bearer).
//  * Solo su propio pedido: se lee y se guarda con SU sesión (reglas RLS).
//  * Bajo demanda y con freno: si se consultó hace menos de 10 minutos, se
//    devuelve lo guardado sin volver a entrar a Shalom.
import { send, readJson } from './_push.js'
import { trackShalom } from './_shalom.js'

const REUSE_MS = 10 * 60 * 1000

export default async function handler(req, res, { fetchImpl = fetch, track = trackShalom, env = process.env, now = Date.now() } = {}) {
  if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed' })
  const base = String(env.SUPABASE_URL || env.VITE_SUPABASE_URL || '').replace(/\/$/, '')
  const anon = env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || ''
  if (!base || !anon) return send(res, 503, { error: 'not_configured' })
  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '')
  if (!token) return send(res, 401, { error: 'unauthorized' })
  const headers = { apikey: anon, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  const who = await fetchImpl(`${base}/auth/v1/user`, { headers })
  if (!who.ok) return send(res, 401, { error: 'unauthorized' })

  const body = await readJson(req)
  const id = Number(body.order_id)
  if (!Number.isInteger(id) || id <= 0) return send(res, 400, { error: 'order_id' })
  const cols = 'id,courier,courier_tracking_number,courier_tracking_code,courier_status,courier_registered_at,courier_delivered_at,courier_checked_at'
  const r = await fetchImpl(`${base}/rest/v1/orders?id=eq.${id}&select=${cols}`, { headers })
  if (!r.ok) return send(res, r.status === 400 ? 503 : 502, { error: 'not_ready', mensaje: 'Falta activar el rastreo en Supabase (SQL de rastreo Shalom).' })
  const [order] = await r.json()
  if (!order) return send(res, 404, { error: 'not_found' })
  if (!order.courier_tracking_number || !order.courier_tracking_code) return send(res, 400, { error: 'faltan_datos', mensaje: 'Primero guarda el N° de orden y el código del ticket de Shalom.' })

  const cached = order.courier_checked_at && now - Date.parse(order.courier_checked_at) < REUSE_MS
  if (cached && !body.force) {
    return send(res, 200, { ok: true, reused: true, estado: order.courier_status, registrado_el: order.courier_registered_at, entregado_el: order.courier_delivered_at, consultado_en: order.courier_checked_at })
  }

  const result = await track(order.courier_tracking_number, order.courier_tracking_code)
  if (!result.ok) {
    const status = result.codigo === 3 ? 404 : result.codigo === 2 ? 400 : 502
    return send(res, status, { ok: false, error: result.error, mensaje: result.mensaje })
  }
  const checkedAt = new Date(now).toISOString()
  const patch = await fetchImpl(`${base}/rest/v1/orders?id=eq.${id}`, {
    method: 'PATCH',
    headers: { ...headers, Prefer: 'return=minimal' },
    body: JSON.stringify({ courier_status: result.estado, courier_registered_at: result.registrado_el, courier_delivered_at: result.entregado_el, courier_checked_at: checkedAt }),
  })
  return send(res, 200, { ok: true, reused: false, saved: patch.ok, estado: result.estado, registrado_el: result.registrado_el, entregado_el: result.entregado_el, consultado_en: checkedAt })
}
