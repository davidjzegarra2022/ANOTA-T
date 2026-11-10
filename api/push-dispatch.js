// Despachador de notificaciones push. Lo llama Supabase (nunca el navegador):
//   * {"type":"tick"}  — cada minuto (pg_cron): recordatorios que llegaron a
//     su hora, avisos 6 horas antes y, en los turnos de 9, 13 y 18 h (Lima),
//     resumen de pendientes.
//   * {"type":"order","order_id":123} — al entrar un pedido (trigger).
// Protegido con el encabezado x-push-secret = PUSH_DISPATCH_SECRET.
// Variables en Vercel: SUPABASE_SERVICE_ROLE_KEY, VAPID_PUBLIC_KEY,
// VAPID_PRIVATE_KEY, PUSH_DISPATCH_SECRET (y VITE_SUPABASE_URL, que ya existe).
import { SUMMARY_HOURS, limaNow, missingConfig, pushEnv, readJson, rpc, sameSecret, send, sendToMerchants } from './_push.js'

const firstName = (n) => String(n || 'un cliente').trim().split(/\s+/)[0]
const phoneText = (p) => (p ? `📞 +51 ${String(p).replace(/\D/g, '').slice(-9)}` : '')

export default async function handler(req, res, { fetchImpl = fetch, webpushImpl, env = process.env, now = new Date() } = {}) {
  if (req.method !== 'POST') return send(res, 405, { error: 'method_not_allowed' })
  const cfg = pushEnv(env)
  if (!cfg.secret || !sameSecret(req.headers['x-push-secret'], cfg.secret)) return send(res, 401, { error: 'unauthorized' })
  const missing = missingConfig(cfg)
  if (missing.length) return send(res, 500, { error: 'missing_config', missing })

  const body = await readJson(req)
  try {
    if (body.type === 'order') {
      const [o] = (await rpc(cfg, fetchImpl, 'push_order_info', { p_order_id: Number(body.order_id) })) || []
      if (!o) return send(res, 200, { ok: true, sent: 0 })
      const payload = {
        title: `🛍️ Nuevo pedido de ${firstName(o.customer_name)}`,
        body: [o.tracking_code, o.seller_name ? `vía ${o.seller_name}` : 'desde tu link'].filter(Boolean).join(' · '),
        tag: `order-${body.order_id}`,
        kind: 'order',
        url: '/',
      }
      const r = await sendToMerchants(cfg, fetchImpl, webpushImpl, [o.merchant_id], () => payload)
      return send(res, 200, { ok: true, type: 'order', ...r })
    }

    // tick: recordatorios vencidos
    const due = (await rpc(cfg, fetchImpl, 'push_claim_due_reminders')) || []
    const byMerchant = new Map()
    for (const r of due) byMerchant.set(r.merchant_id, [...(byMerchant.get(r.merchant_id) || []), r])
    const reminders = await sendToMerchants(cfg, fetchImpl, webpushImpl, [...byMerchant.keys()], (mid) => {
      const list = byMerchant.get(mid) || []
      if (!list.length) return null
      const r0 = list[0]
      return {
        title: list.length === 1 ? `⏰ ${r0.text}` : `⏰ ${list.length} recordatorios ahora`,
        body: list.length === 1 ? [phoneText(r0.phone), r0.note ? `📝 ${r0.note}` : ''].filter(Boolean).join(' · ') || 'Es hora de tu recordatorio.' : list.map((r) => r.text).join(' · '),
        tag: list.length === 1 ? `rem-${r0.reminder_id}` : `rem-${Date.now()}`,
        kind: 'reminder',
        url: '/',
      }
    })

    // tick: aviso adelantado, 6 horas antes de la hora pactada
    const early = (await rpc(cfg, fetchImpl, 'push_claim_advance_reminders')) || []
    const earlyByMerchant = new Map()
    for (const r of early) earlyByMerchant.set(r.merchant_id, [...(earlyByMerchant.get(r.merchant_id) || []), r])
    const advance = await sendToMerchants(cfg, fetchImpl, webpushImpl, [...earlyByMerchant.keys()], (mid) => {
      const list = earlyByMerchant.get(mid) || []
      if (!list.length) return null
      const r0 = list[0]
      const hours = Math.max(1, Math.round(Number(r0.hours_left) || 6))
      return {
        title: list.length === 1 ? `⏰ En ${hours} h: ${r0.text}` : `⏰ ${list.length} recordatorios próximos`,
        body:
          list.length === 1
            ? [`Pactado para las ${String(r0.due_time || '').slice(0, 5)}`, phoneText(r0.phone), r0.note ? `📝 ${r0.note}` : ''].filter(Boolean).join(' · ')
            : list.map((r) => r.text).join(' · '),
        tag: list.length === 1 ? `adv-${r0.reminder_id}` : `adv-${Date.now()}`,
        kind: 'reminder',
        url: '/',
      }
    })

    // tick: resumen en los turnos de 9, 13 y 18 h
    let summaries = { sent: 0, gone: 0 }
    const { date, hour } = limaNow(now)
    if (SUMMARY_HOURS.includes(hour)) {
      const rows = (await rpc(cfg, fetchImpl, 'push_claim_summaries', { p_slot: `${date}@${hour}` })) || []
      const map = new Map(rows.map((r) => [r.merchant_id, r]))
      summaries = await sendToMerchants(cfg, fetchImpl, webpushImpl, [...map.keys()], (mid) => {
        const r = map.get(mid)
        return r && { title: `🔔 Tienes ${r.pending} pendiente${r.pending === 1 ? '' : 's'}`, body: r.first_text || 'Revisa tus recordatorios.', tag: `summary-${date}-${hour}`, kind: 'reminder', url: '/' }
      })
    }
    return send(res, 200, { ok: true, type: 'tick', reminders, advance, summaries })
  } catch (err) {
    return send(res, 500, { error: 'dispatch_failed', detail: String(err?.message || err).slice(0, 200) })
  }
}
