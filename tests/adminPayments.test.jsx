// @vitest-environment jsdom
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'

const api = vi.hoisted(() => ({
  adminListPayments: vi.fn(),
  adminRegisterPayment: vi.fn(),
  adminAdjustDays: vi.fn(),
  adminVoidPayment: vi.fn(),
  adminRestorePayment: vi.fn(),
}))
vi.mock('../src/utils/adminMerchants', async (orig) => {
  const real = await orig()
  return { ...real, ...api }
})

import AdminPaymentsDialog from '../src/components/AdminPaymentsDialog.jsx'
import { hasPaymentToday, limaTodayText } from '../src/utils/adminMerchants.js'

const PLANS = [{ id: 2, name: 'Emprendedor', pricePerDay: 2, trialDays: 0 }]
const NOW = Date.now()
const UNTIL = new Date(NOW + 58 * 86400000).toISOString()
const MERCHANT = { id: 'm-1', businessName: 'JT CARTERAS', email: 'x@y.z', planId: 2, paidUntil: UNTIL }
const pay = (id, extra = {}) => ({
  id, kind: 'payment', planName: 'Emprendedor', days: 30, amount: 60, method: 'Yape', note: '',
  periodStart: new Date(NOW).toISOString(), periodEnd: UNTIL, createdAt: new Date(NOW).toISOString(), voidedAt: null, voidReason: '', ...extra,
})

beforeEach(() => {
  Object.values(api).forEach((f) => f.mockReset())
})
afterEach(cleanup)

test('limaTodayText usa la hora de Perú y formato DD/MM/AAAA', () => {
  // 20/11/2026 03:00 UTC todavía es 19/11/2026 en Lima (UTC−5).
  expect(limaTodayText(new Date('2026-11-20T03:00:00Z'))).toBe('19/11/2026')
  expect(limaTodayText(new Date('2026-11-20T15:00:00Z'))).toBe('20/11/2026')
})

test('hasPaymentToday ignora anulados, ajustes y pagos de otros días', () => {
  const now = new Date('2026-11-20T15:00:00Z')
  const today = '2026-11-20T14:00:00Z'
  expect(hasPaymentToday([{ kind: 'payment', createdAt: today }], now)).toBe(true)
  expect(hasPaymentToday([{ kind: 'payment', createdAt: today, voidedAt: today }], now)).toBe(false)
  expect(hasPaymentToday([{ kind: 'adjustment', createdAt: today }], now)).toBe(false)
  expect(hasPaymentToday([{ kind: 'payment', createdAt: '2026-11-18T14:00:00Z' }], now)).toBe(false)
})

test('segundo pago del día pide escribir la fecha de hoy antes de registrar', async () => {
  api.adminListPayments.mockResolvedValue({ ok: true, payments: [pay(1)] })
  api.adminRegisterPayment.mockResolvedValue({ ok: true, payment: { period_end: UNTIL } })
  render(<AdminPaymentsDialog merchant={MERCHANT} plans={PLANS} onClose={() => {}} />)
  await screen.findByText(/Emprendedor · 30 días/)

  fireEvent.click(screen.getByRole('button', { name: /Registrar pago y activar/ }))
  const today = limaTodayText()
  expect(await screen.findByText(/Ya registraste un pago hoy/)).toBeTruthy()
  expect(screen.getByText(`«${today}»`)).toBeTruthy()
  expect(api.adminRegisterPayment).not.toHaveBeenCalled()

  const confirm = screen.getByRole('button', { name: /Confirmar nuevo pago/ })
  fireEvent.change(screen.getByLabelText(/Introduce la fecha actual/), { target: { value: '01/01/2020' } })
  expect(confirm.disabled).toBe(true)
  fireEvent.change(screen.getByLabelText(/Introduce la fecha actual/), { target: { value: today } })
  expect(confirm.disabled).toBe(false)
  fireEvent.click(confirm)
  await waitFor(() => expect(api.adminRegisterPayment).toHaveBeenCalledTimes(1))
  expect(api.adminRegisterPayment.mock.calls[0][0].confirm).toBe(today)
})

test('primer pago del día no pide confirmación ni envía p_confirm', async () => {
  api.adminListPayments.mockResolvedValue({ ok: true, payments: [pay(1, { createdAt: '2026-01-01T15:00:00Z' })] })
  api.adminRegisterPayment.mockResolvedValue({ ok: true, payment: { period_end: UNTIL } })
  render(<AdminPaymentsDialog merchant={MERCHANT} plans={PLANS} onClose={() => {}} />)
  await screen.findByText(/Emprendedor · 30 días/)
  fireEvent.click(screen.getByRole('button', { name: /Registrar pago y activar/ }))
  await waitFor(() => expect(api.adminRegisterPayment).toHaveBeenCalledTimes(1))
  expect(api.adminRegisterPayment.mock.calls[0][0].confirm).toBeUndefined()
})

test('anular resta los días y restaurar los devuelve', async () => {
  api.adminListPayments.mockResolvedValueOnce({ ok: true, payments: [pay(2), pay(1)] })
  api.adminVoidPayment.mockResolvedValue({ ok: true })
  api.adminListPayments.mockResolvedValueOnce({ ok: true, payments: [pay(2, { voidedAt: new Date().toISOString(), voidReason: 'duplicado' }), pay(1)] })
  const onSaved = vi.fn()
  render(<AdminPaymentsDialog merchant={MERCHANT} plans={PLANS} onClose={() => {}} onSaved={onSaved} />)
  expect(await screen.findByText(/quedan 58 días/)).toBeTruthy()

  fireEvent.click(screen.getAllByRole('button', { name: 'Anular' })[0])
  fireEvent.change(screen.getByLabelText('Motivo de la anulación'), { target: { value: 'duplicado' } })
  fireEvent.click(screen.getByRole('button', { name: 'Confirmar anulación' }))
  await waitFor(() => expect(api.adminVoidPayment).toHaveBeenCalledWith(2, 'duplicado'))
  expect(await screen.findByText(/quedan 28 días/)).toBeTruthy()
  expect(screen.getByText(/Anulado el .* · duplicado/)).toBeTruthy()
  expect(onSaved).toHaveBeenCalled()

  api.adminRestorePayment.mockResolvedValue({ ok: true })
  api.adminListPayments.mockResolvedValueOnce({ ok: true, payments: [pay(2), pay(1)] })
  fireEvent.click(screen.getByRole('button', { name: /Restaurar/ }))
  await waitFor(() => expect(api.adminRestorePayment).toHaveBeenCalledWith(2))
  expect(await screen.findByText(/quedan 58 días/)).toBeTruthy()
})

test('ajustar días exige motivo y envía el número con signo', async () => {
  api.adminListPayments.mockResolvedValue({ ok: true, payments: [pay(1)] })
  api.adminAdjustDays.mockResolvedValue({ ok: true, payment: { period_end: new Date(NOW + 51 * 86400000).toISOString() } })
  render(<AdminPaymentsDialog merchant={MERCHANT} plans={PLANS} onClose={() => {}} />)
  await screen.findByText(/Emprendedor · 30 días/)
  fireEvent.click(screen.getByRole('button', { name: '-7' }))
  const apply = screen.getByRole('button', { name: /Aplicar ajuste \(-7 días\)/ })
  expect(apply.disabled).toBe(true)
  fireEvent.change(screen.getByLabelText('Motivo del ajuste'), { target: { value: 'error de días' } })
  fireEvent.click(apply)
  await waitFor(() => expect(api.adminAdjustDays).toHaveBeenCalledWith({ merchantId: 'm-1', days: -7, reason: 'error de días' }))
  expect(await screen.findByText(/quedan 51 días/)).toBeTruthy()
})
