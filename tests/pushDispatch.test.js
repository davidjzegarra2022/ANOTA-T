import { expect, test } from 'vitest'
import dispatch from '../api/push-dispatch.js'
import pushTest from '../api/push-test.js'

const env = { VITE_SUPABASE_URL: 'https://x.supabase.co', SUPABASE_SERVICE_ROLE_KEY: 'svc', VAPID_PUBLIC_KEY: 'pub', VAPID_PRIVATE_KEY: 'priv', PUSH_DISPATCH_SECRET: 'sek', VITE_SUPABASE_ANON_KEY: 'anon' }
const M1 = '11111111-0000-0000-0000-000000000001'

function fakeRes() {
  return { statusCode: 0, headers: {}, body: null, setHeader(k, v) { this.headers[k] = v }, end(b) { this.body = JSON.parse(b) } }
}

function fakeSupabase(rpcs) {
  const calls = []
  const fetchImpl = async (url, opts = {}) => {
    const name = url.split('/rpc/')[1] || url.split('/auth/v1/')[1]
    calls.push({ name, body: opts.body ? JSON.parse(opts.body) : null, headers: opts.headers })
    const out = typeof rpcs[name] === 'function' ? rpcs[name](opts) : rpcs[name]
    if (out instanceof Response) return out
    return new Response(out === undefined ? '' : JSON.stringify(out), { status: 200 })
  }
  return { fetchImpl, calls }
}

function fakeWebpush({ goneEndpoints = [] } = {}) {
  const sent = []
  return {
    sent,
    setVapidDetails() {},
    async sendNotification(sub, payload) {
      if (goneEndpoints.includes(sub.endpoint)) throw Object.assign(new Error('gone'), { statusCode: 410 })
      sent.push({ endpoint: sub.endpoint, payload: JSON.parse(payload) })
    },
  }
}

const subs = [{ endpoint: 'https://push/a', p256dh: 'k', auth: 'a', merchant_id: M1 }, { endpoint: 'https://push/vieja', p256dh: 'k', auth: 'a', merchant_id: M1 }]

test('rechaza llamadas sin el secreto correcto', async () => {
  const res = fakeRes()
  await dispatch({ method: 'POST', headers: { 'x-push-secret': 'otro' }, body: { type: 'tick' } }, res, { env })
  expect(res.statusCode).toBe(401)
})

test('pedido nuevo: avisa a los dispositivos de la tienda y borra los dados de baja', async () => {
  const sb = fakeSupabase({ push_order_info: [{ merchant_id: M1, customer_name: 'Carlos Pretel', seller_name: 'CARLOS JESUS', tracking_code: 'ANOTA-W8ME3M' }], push_subscriptions_for: subs, push_mark_sent: null })
  const wp = fakeWebpush({ goneEndpoints: ['https://push/vieja'] })
  const res = fakeRes()
  await dispatch({ method: 'POST', headers: { 'x-push-secret': 'sek' }, body: { type: 'order', order_id: 9 } }, res, { env, fetchImpl: sb.fetchImpl, webpushImpl: wp })
  expect(res.body).toMatchObject({ ok: true, type: 'order', sent: 1, gone: 1 })
  expect(wp.sent[0].payload).toMatchObject({ title: '🛍️ Nuevo pedido de Carlos', body: 'ANOTA-W8ME3M · vía CARLOS JESUS', kind: 'order' })
  expect(sb.calls.find((c) => c.name === 'push_mark_sent').body).toEqual({ p_endpoints: ['https://push/a'], p_gone: ['https://push/vieja'] })
  // Siempre con la clave de servicio, nunca la pública.
  expect(sb.calls[0].headers.Authorization).toBe('Bearer svc')
})

test('tick: recordatorio vencido con teléfono y nota; sin resumen fuera de turno', async () => {
  const sb = fakeSupabase({ push_claim_due_reminders: [{ merchant_id: M1, reminder_id: 'r_1', text: 'Despachar pedido #3', phone: '962029213', note: 'Cobrar saldo' }], push_subscriptions_for: [subs[0]], push_mark_sent: null, push_claim_summaries: [] })
  const wp = fakeWebpush()
  const res = fakeRes()
  const at11 = new Date('2026-11-08T16:00:00Z') // 11:00 en Lima
  await dispatch({ method: 'POST', headers: { 'x-push-secret': 'sek' }, body: { type: 'tick' } }, res, { env, fetchImpl: sb.fetchImpl, webpushImpl: wp, now: at11 })
  expect(res.body.reminders.sent).toBe(1)
  expect(wp.sent[0].payload).toMatchObject({ title: '⏰ Despachar pedido #3', body: '📞 +51 962029213 · 📝 Cobrar saldo' })
  expect(sb.calls.some((c) => c.name === 'push_claim_summaries')).toBe(false)
})

test('tick: aviso adelantado 6 horas antes del recordatorio', async () => {
  const sb = fakeSupabase({
    push_claim_due_reminders: [],
    push_claim_advance_reminders: [{ merchant_id: M1, reminder_id: 'r_2', text: 'Enviar a Arequipa', phone: '962029213', note: 'Cobrar saldo', due_time: '14:00', hours_left: 6 }],
    push_subscriptions_for: [subs[0]],
    push_mark_sent: null,
    push_claim_summaries: [],
  })
  const wp = fakeWebpush()
  const res = fakeRes()
  const at8 = new Date('2026-11-08T13:00:00Z') // 08:00 en Lima
  await dispatch({ method: 'POST', headers: { 'x-push-secret': 'sek' }, body: { type: 'tick' } }, res, { env, fetchImpl: sb.fetchImpl, webpushImpl: wp, now: at8 })
  expect(res.body.advance.sent).toBe(1)
  expect(wp.sent[0].payload).toMatchObject({ title: '⏰ En 6 h: Enviar a Arequipa', body: 'Pactado para las 14:00 · 📞 +51 962029213 · 📝 Cobrar saldo', kind: 'reminder' })
  // Los dos avisos usan columnas y etiquetas distintas.
  expect(sb.calls.find((c) => c.name === 'push_claim_advance_reminders').headers.Authorization).toBe('Bearer svc')
})

test('tick a las 13:00 de Lima: pide el resumen del turno', async () => {
  const sb = fakeSupabase({ push_claim_due_reminders: [], push_claim_summaries: [{ merchant_id: M1, pending: 3, first_text: 'Llamar a Jessica' }], push_subscriptions_for: [subs[0]], push_mark_sent: null })
  const wp = fakeWebpush()
  const res = fakeRes()
  await dispatch({ method: 'POST', headers: { 'x-push-secret': 'sek' }, body: { type: 'tick' } }, res, { env, fetchImpl: sb.fetchImpl, webpushImpl: wp, now: new Date('2026-11-08T18:05:00Z') })
  expect(sb.calls.find((c) => c.name === 'push_claim_summaries').body).toEqual({ p_slot: '2026-11-08@13' })
  expect(wp.sent[0].payload.title).toBe('🔔 Tienes 3 pendientes')
})

test('prueba push: solo con sesión válida y solo a la propia tienda', async () => {
  const sb = fakeSupabase({ 'user': (o) => (o.headers.Authorization === 'Bearer token-ok' ? new Response(JSON.stringify({ id: M1 }), { status: 200 }) : new Response('{}', { status: 401 })), push_subscriptions_for: [subs[0]], push_mark_sent: null })
  const wp = fakeWebpush()
  let res = fakeRes()
  await pushTest({ method: 'POST', headers: { authorization: 'Bearer malo' } }, res, { env, fetchImpl: sb.fetchImpl, webpushImpl: wp })
  expect(res.statusCode).toBe(401)
  res = fakeRes()
  await pushTest({ method: 'POST', headers: { authorization: 'Bearer token-ok' } }, res, { env, fetchImpl: sb.fetchImpl, webpushImpl: wp })
  expect(res.body).toMatchObject({ ok: true, sent: 1 })
  expect(sb.calls.find((c) => c.name === 'push_subscriptions_for').body).toEqual({ p_merchants: [M1] })
})

test('sin configurar en Vercel responde claro (no se cae)', async () => {
  const res = fakeRes()
  await dispatch({ method: 'POST', headers: { 'x-push-secret': 'sek' }, body: {} }, res, { env: { PUSH_DISPATCH_SECRET: 'sek' } })
  expect(res.statusCode).toBe(500)
  expect(res.body.error).toBe('missing_config')
})
