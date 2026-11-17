import { expect, test } from 'vitest'
import { interpretar, validTicket } from '../api/_shalom.js'
import handler from '../api/rastrear-shalom.js'

test('interpretar: lee estado, fechas y no guarda datos personales', () => {
  expect(interpretar({ titulo: 'En tránsito', desde: 'desde el 14/11/26 a las 10:15', detalle: null, tramos_completos: 1, tramos_totales: 3 })).toEqual({
    ok: true, codigo: 0, estado: 'En tránsito', etapa: 'En tránsito', registrado_el: '14/11/26 10:15', entregado_el: null,
  })
  const ent = interpretar({ titulo: 'Entregado', desde: 'desde el 14/11/26 a las 10:15', detalle: 'Recogido por JUAN PEREZ DNI 12345678 el 16/11/26 a las 16:40', tramos_completos: 3, tramos_totales: 3 })
  expect(ent).toMatchObject({ estado: 'Entregado', entregado_el: '16/11/26 16:40' })
  expect(JSON.stringify(ent)).not.toMatch(/JUAN|12345678/)
  // Sin título, se usa la barra de avance.
  expect(interpretar({ titulo: null, desde: null, detalle: null, tramos_completos: 2, tramos_totales: 3 }).estado).toBe('En destino')
  // La página cambió: no se inventa un estado.
  expect(interpretar({ titulo: 'Algo raro', desde: null, detalle: null, tramos_completos: 0, tramos_totales: 7 })).toMatchObject({ ok: false, codigo: 4 })
  expect(validTicket('100000000', 'ab12')).toBe(true)
  expect(validTicket('123', 'AB12')).toBe(false)
})

const env = { VITE_SUPABASE_URL: 'https://x.supabase.co', VITE_SUPABASE_ANON_KEY: 'anon' }
function res() { return { statusCode: 0, setHeader() {}, end(b) { this.body = JSON.parse(b) } } }
function fakeFetch(order, { userOk = true } = {}) {
  const calls = []
  const f = async (url, opts = {}) => {
    calls.push({ url, method: opts.method || 'GET', body: opts.body && JSON.parse(opts.body), auth: opts.headers?.Authorization })
    if (url.includes('/auth/v1/user')) return new Response(JSON.stringify({ id: 'm1' }), { status: userOk ? 200 : 401 })
    if (opts.method === 'PATCH') return new Response(null, { status: 204 })
    return new Response(JSON.stringify(order ? [order] : []), { status: 200 })
  }
  return { f, calls }
}
const order = { id: 7, courier: 'shalom', courier_tracking_number: '100000000', courier_tracking_code: 'AB12', courier_checked_at: null }

test('consulta Shalom con la sesión del negociante y guarda el estado en su pedido', async () => {
  const { f, calls } = fakeFetch(order)
  const r = res()
  await handler({ method: 'POST', headers: { authorization: 'Bearer tok' }, body: { order_id: 7 } }, r, { env, fetchImpl: f, track: async () => ({ ok: true, codigo: 0, estado: 'En destino', registrado_el: '14/11/26 10:15', entregado_el: null }) })
  expect(r.body).toMatchObject({ ok: true, reused: false, saved: true, estado: 'En destino' })
  const patch = calls.find((c) => c.method === 'PATCH')
  expect(patch.body).toMatchObject({ courier_status: 'En destino', courier_registered_at: '14/11/26 10:15' })
  expect(calls.every((c) => c.auth === 'Bearer tok')).toBe(true) // nunca con claves de servicio
})

test('freno: si se consultó hace menos de 10 min no vuelve a entrar a Shalom', async () => {
  const now = Date.parse('2026-11-17T10:05:00Z')
  const { f } = fakeFetch({ ...order, courier_status: 'En tránsito', courier_checked_at: '2026-11-17T10:00:00Z' })
  let called = false
  const r = res()
  await handler({ method: 'POST', headers: { authorization: 'Bearer tok' }, body: { order_id: 7 } }, r, { env, fetchImpl: f, now, track: async () => ((called = true), {}) })
  expect(called).toBe(false)
  expect(r.body).toMatchObject({ ok: true, reused: true, estado: 'En tránsito' })
})

test('casos de error: sin sesión, pedido ajeno, sin ticket, Shalom no la encuentra', async () => {
  let r = res(); await handler({ method: 'POST', headers: {}, body: { order_id: 7 } }, r, { env, fetchImpl: fakeFetch(order).f }); expect(r.statusCode).toBe(401)
  r = res(); await handler({ method: 'POST', headers: { authorization: 'Bearer x' }, body: { order_id: 7 } }, r, { env, fetchImpl: fakeFetch(order, { userOk: false }).f }); expect(r.statusCode).toBe(401)
  r = res(); await handler({ method: 'POST', headers: { authorization: 'Bearer tok' }, body: { order_id: 99 } }, r, { env, fetchImpl: fakeFetch(null).f }); expect(r.statusCode).toBe(404)
  r = res(); await handler({ method: 'POST', headers: { authorization: 'Bearer tok' }, body: { order_id: 7 } }, r, { env, fetchImpl: fakeFetch({ ...order, courier_tracking_code: null }).f }); expect(r.body.error).toBe('faltan_datos')
  r = res(); await handler({ method: 'POST', headers: { authorization: 'Bearer tok' }, body: { order_id: 7 } }, r, { env, fetchImpl: fakeFetch(order).f, track: async () => ({ ok: false, codigo: 3, error: 'no_encontrada', mensaje: 'Shalom no encontró la orden' }) })
  expect(r.statusCode).toBe(404)
})
