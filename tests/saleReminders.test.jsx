// @vitest-environment jsdom
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { saleSummary, suggestSaleReminder } from '../src/utils/saleReminders.js'
import { addDaysKey, dayKey, loadReminders, reminderForOrder } from '../src/utils/reminders.js'
import SaleReminderDialog from '../src/components/dashboard/SaleReminderDialog.jsx'

const NOW = new Date(2026, 10, 6, 10, 0) // vie 6 nov 2026, 10:00
const today = dayKey(NOW)
const order = (extra = {}) => ({
  id: 7, dailyNumber: 3, trackingCode: 'ANOTA-ABC123', customerName: 'Jessica Alfaro', customerPhone: '970804662',
  deliveryMethod: 'agency', courier: 'shalom', agencyLabel: 'Lima / Lima / Miraflores / Agencia Larco', agencyAddress: 'Av. Larco 345',
  notes: '2 polos talla M', amount: 45, sellerName: 'CARLOS JESUS', status: 'pending', shippingDate: addDaysKey(today, 1), ...extra,
})

test('saleSummary resume estado, cliente, entrega, productos, monto y vendedor', () => {
  const s = saleSummary(order())
  expect(s).toContain('Pedido #3 de Jessica Alfaro (ANOTA-ABC123) · Pendiente.')
  expect(s).toContain('Retiro en agencia Shalom → Agencia Larco')
  expect(s).toContain('Productos / notas: 2 polos talla M.')
  expect(s).toContain('Monto: S/ 45.00.')
  expect(s).toContain('Vendido por CARLOS JESUS.')
  expect(saleSummary(order({ amount: null }))).toContain('Monto: sin registrar.')
})

test('suggestSaleReminder elige día y hora según el momento de la venta', () => {
  const s = (o, extra) => suggestSaleReminder(order(o), { now: NOW, cutoffHour: 17, ...extra })
  // Pendiente con envío mañana → mañana 9:00
  expect(s({})).toMatchObject({ date: addDaysKey(today, 1), time: '09:00' })
  // Pendiente con envío hoy → en una hora
  expect(s({ shippingDate: today })).toMatchObject({ date: today, time: '11:00' })
  // Pendiente atrasado → en 30 min y marcado URGENTE
  const late = s({ shippingDate: addDaysKey(today, -1) })
  expect(late).toMatchObject({ date: today, time: '10:30' })
  expect(late.title).toMatch(/URGENTE/)
  // Empacado para hoy → 1 h antes del cierre
  expect(s({ status: 'packed', shippingDate: today })).toMatchObject({ date: today, time: '16:00' })
  // Empacado y ya pasó la hora de cierre → en 30 min
  expect(suggestSaleReminder(order({ status: 'packed', shippingDate: today }), { now: new Date(2026, 10, 6, 18, 2), cutoffHour: 17 })).toMatchObject({ time: '18:35' })
  // Enviado a agencia → confirmar recojo en 2 días
  const shipped = s({ status: 'shipped', shippingDate: today })
  expect(shipped).toMatchObject({ date: addDaysKey(today, 2), time: '11:00' })
  expect(shipped.title).toMatch(/recogió/)
  // Enviado a domicilio → confirmar entrega mañana
  expect(s({ status: 'shipped', deliveryMethod: 'home' }).title).toMatch(/recibió/)
  // Cancelado → mañana 10:00 para recuperar la venta
  expect(s({ status: 'cancelled' })).toMatchObject({ date: addDaysKey(today, 1), time: '10:00' })
})

// ---- Flujo del panel (campana) -----------------------------------------
const merchant = { id: 'm-1', cutoffHour: 17 }
beforeEach(() => localStorage.clear())
afterEach(cleanup)

test('Pro: muestra resumen, teléfono y nota; al confirmar agrega el recordatorio con todo vinculado', () => {
  const onSaved = vi.fn()
  const onClose = vi.fn()
  render(<SaleReminderDialog order={order()} merchant={merchant} onClose={onClose} onSaved={onSaved} />)

  expect(screen.getByText(/Pedido #3 de Jessica Alfaro/)).toBeTruthy()
  expect(screen.getByRole('link', { name: /Llamar al \+51970804662/ }).getAttribute('href')).toBe('tel:+51970804662')
  fireEvent.change(screen.getByLabelText(/nota breve/i), { target: { value: 'Cobrar saldo S/ 20 por Yape' } })

  // Sin responder la pregunta no se puede guardar.
  expect(screen.queryByRole('button', { name: /Agregar al recordatorio/ })).toBeNull()
  expect(screen.getByText('¿Desea agregar esta venta al recordatorio?')).toBeTruthy()
  fireEvent.click(screen.getByRole('radio', { name: /Sí, agregar/ }))
  expect(screen.getByText(/Sugerido:/)).toBeTruthy()
  fireEvent.click(screen.getByRole('button', { name: /Agregar al recordatorio/ }))

  const saved = reminderForOrder(loadReminders('m-1'), 7)
  expect(saved).toBeTruthy()
  expect(saved.category).toBe('envios')
  expect(saved.dueDate).toBeTruthy()
  expect(saved.dueTime).toMatch(/^\d{2}:\d{2}$/)
  expect(saved.sale).toMatchObject({ orderId: '7', phone: '970804662', note: 'Cobrar saldo S/ 20 por Yape', trackingCode: 'ANOTA-ABC123' })
  expect(saved.sale.summary).toContain('Monto: S/ 45.00')
  expect(onSaved).toHaveBeenCalled()
  expect(onClose).toHaveBeenCalled()
})

test('una venta tiene un solo recordatorio: abrir de nuevo lo edita y se puede quitar', () => {
  render(<SaleReminderDialog order={order()} merchant={merchant} onClose={() => {}} />)
  fireEvent.click(screen.getByRole('radio', { name: /Sí, agregar/ }))
  fireEvent.click(screen.getByRole('button', { name: /Agregar al recordatorio/ }))
  cleanup()
  render(<SaleReminderDialog order={order()} merchant={merchant} onClose={() => {}} />)
  fireEvent.change(screen.getByLabelText(/nota breve/i), { target: { value: 'Nueva nota' } })
  fireEvent.click(screen.getByRole('button', { name: /Actualizar recordatorio/ }))
  const list = loadReminders('m-1')
  expect(list).toHaveLength(1)
  expect(list[0].sale.note).toBe('Nueva nota')
  cleanup()
  render(<SaleReminderDialog order={order()} merchant={merchant} onClose={() => {}} />)
  fireEvent.click(screen.getByRole('button', { name: /Quitar/ }))
  expect(loadReminders('m-1')).toHaveLength(0)
})

test('No Pro: la campana muestra el aviso del plan y no guarda nada', () => {
  const onUpgrade = vi.fn()
  render(<SaleReminderDialog order={order()} merchant={merchant} locked onUpgrade={onUpgrade} onClose={() => {}} />)
  expect(screen.getByText(/plan Emprendedor Pro/)).toBeTruthy()
  expect(screen.queryByLabelText(/nota breve/i)).toBeNull()
  fireEvent.click(screen.getByRole('button', { name: /Ver Mi plan/ }))
  expect(onUpgrade).toHaveBeenCalled()
  expect(loadReminders('m-1')).toHaveLength(0)
})
