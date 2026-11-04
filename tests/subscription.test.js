import { expect, test } from 'vitest'
import { countdownLevel, formatCountdown, subscriptionDeadline } from '../src/utils/subscription.js'
import { planRemaining } from '../src/utils/adminMerchants.js'

const DAY = 86400000

test('subscriptionDeadline: prueba, plan pagado con fecha y plan pagado sin pagos', () => {
  const start = '2026-11-01T00:00:00Z'
  expect(subscriptionDeadline({ planId: 1, planStartedAt: start }, { trialDays: 15 })).toEqual({ kind: 'trial', deadline: new Date(Date.parse(start) + 15 * DAY) })
  expect(subscriptionDeadline({ planId: 3, paidUntil: '2026-12-01T00:00:00Z' }, { trialDays: null }).kind).toBe('paid')
  expect(subscriptionDeadline({ planId: 3, paidUntil: null }, { trialDays: null })).toEqual({ kind: 'unlimited', deadline: null })
  expect(subscriptionDeadline({ planId: null }, null).kind).toBe('none')
})

test('formatCountdown y countdownLevel', () => {
  expect(formatCountdown(2 * DAY + 3 * 3600e3 + 4 * 60e3 + 5e3)).toBe('2d 03:04:05')
  expect(formatCountdown(59e3)).toBe('00:00:59')
  expect(formatCountdown(0)).toBe('Vencido')
  expect(countdownLevel(5 * DAY)).toBe('ok')
  expect(countdownLevel(2 * DAY)).toBe('soon')
  expect(countdownLevel(3600e3)).toBe('urgent')
  expect(countdownLevel(-1)).toBe('expired')
})

test('planRemaining (admin): los planes pagados vencen en paid_until', () => {
  const r = planRemaining({ planId: 3, planTrialDays: null, paidUntil: new Date(Date.now() + 10 * DAY).toISOString() })
  expect(r.kind).toBe('paid')
  expect(r.days).toBe(10)
  expect(planRemaining({ planId: 3, planTrialDays: null, paidUntil: null }).kind).toBe('forever')
})
