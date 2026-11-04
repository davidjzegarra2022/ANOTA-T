// Vigencia del plan de una tienda: cuándo vence y cuánto le queda.
//   * plan de prueba → plan_started_at + días de prueba (mínimo 15);
//   * plan pagado    → merchants.paid_until (lo pone el admin al registrar
//                      un pago; ver sql/2026-11-05-pagos-y-vencimiento.sql);
//   * plan pagado sin pagos registrados todavía → sin vencimiento.
import { TRIAL_DAYS } from './plans'

const DAY = 24 * 60 * 60 * 1000

/** { kind: 'none' | 'trial' | 'paid' | 'unlimited', deadline: Date | null } */
export function subscriptionDeadline(merchant, plan) {
  if (!merchant?.planId || !plan) return { kind: 'none', deadline: null }
  if (plan.trialDays) {
    const start = Date.parse(merchant.planStartedAt)
    if (Number.isNaN(start)) return { kind: 'trial', deadline: null }
    return { kind: 'trial', deadline: new Date(start + Math.max(plan.trialDays, TRIAL_DAYS) * DAY) }
  }
  const paid = Date.parse(merchant.paidUntil)
  if (Number.isNaN(paid)) return { kind: 'unlimited', deadline: null }
  return { kind: 'paid', deadline: new Date(paid) }
}

/** Cuenta regresiva legible: "12d 04:05:09", "04:05:09" o "Vencido". */
export function formatCountdown(ms) {
  if (ms <= 0) return 'Vencido'
  const total = Math.floor(ms / 1000)
  const d = Math.floor(total / 86400)
  const h = Math.floor((total % 86400) / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const hms = [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
  return d > 0 ? `${d}d ${hms}` : hms
}

/** Nivel de alerta según lo que falta: ok (> 3 días), soon (≤ 3 días), urgent (≤ 1 día), expired. */
export function countdownLevel(ms) {
  if (ms <= 0) return 'expired'
  if (ms <= DAY) return 'urgent'
  if (ms <= 3 * DAY) return 'soon'
  return 'ok'
}
