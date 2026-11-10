import { expect, test } from 'vitest'
import { advanceReminderDue, dueSlot, isOverdue, newOrdersSince, pendingReminders, reminderAt, timedReminderDue } from '../src/utils/alerts.js'

const at = (h, m = 0) => new Date(2026, 10, 4, h, m)
const atOn = (d, h, m = 0) => new Date(2026, 10, d, h, m)
const r = (id, extra) => ({ id, text: id, done: false, dueDate: '', dueTime: '', important: false, ...extra })

test('pendingReminders: vencidos, de hoy e importantes sin fecha; no los listos ni los futuros', () => {
  const list = [
    r('ayer', { dueDate: '2026-11-03' }),
    r('hoy', { dueDate: '2026-11-04', dueTime: '15:00' }),
    r('manana', { dueDate: '2026-11-05' }),
    r('importante', { important: true }),
    r('sinfecha'),
    r('listo', { dueDate: '2026-11-04', done: true }),
  ]
  expect(pendingReminders(list, '2026-11-04').map((x) => x.id)).toEqual(['ayer', 'hoy', 'importante'])
})

test('dueSlot avisa 3 veces al día (9, 13 y 18 h) y no repite un turno ya avisado', () => {
  expect(dueSlot(at(8, 59), [])).toBe(null)
  expect(dueSlot(at(9, 0), [])).toBe('2026-11-04@9')
  expect(dueSlot(at(12, 30), ['2026-11-04@9'])).toBe(null)
  expect(dueSlot(at(13, 5), ['2026-11-04@9'])).toBe('2026-11-04@13')
  expect(dueSlot(at(21, 0), ['2026-11-04@9', '2026-11-04@13'])).toBe('2026-11-04@18')
  expect(dueSlot(at(23, 0), ['2026-11-04@18'])).toBe(null)
})

test('timedReminderDue: avisa a la hora exacta una sola vez', () => {
  const list = [r('a', { dueDate: '2026-11-04', dueTime: '15:00' }), r('b', { dueDate: '2026-11-04', dueTime: '17:00' })]
  expect(timedReminderDue(list, at(14, 59)).length).toBe(0)
  expect(timedReminderDue(list, at(15, 0)).map((x) => x.id)).toEqual(['a'])
  expect(timedReminderDue(list, at(15, 1), ['a']).length).toBe(0)
})

test('advanceReminderDue: avisa 6 horas antes, no antes ni en la última hora', () => {
  const list = [
    r('tarde', { dueDate: '2026-11-05', dueTime: '14:00' }),
    r('sinhora', { dueDate: '2026-11-05' }),
    r('listo', { dueDate: '2026-11-05', dueTime: '14:00', done: true }),
  ]
  // El día anterior todavía falta mucho.
  expect(advanceReminderDue(list, at(8, 0), []).length).toBe(0)
  // 6 horas antes sí; 6 h y 1 min antes todavía no.
  expect(advanceReminderDue(list, atOn(5, 7, 59), []).length).toBe(0)
  expect(advanceReminderDue(list, atOn(5, 8, 0), []).map((x) => x.id)).toEqual(['tarde'])
  // Dentro de la ventana (4 h 30 min, 1 h) también avisa.
  expect(advanceReminderDue(list, atOn(5, 9, 30), []).map((x) => x.id)).toEqual(['tarde'])
  expect(advanceReminderDue(list, atOn(5, 13, 0), []).map((x) => x.id)).toEqual(['tarde'])
  // A menos de 1 hora ya no es aviso adelantado (le toca el de la hora exacta).
  expect(advanceReminderDue(list, atOn(5, 13, 1), []).length).toBe(0)
  // Con la clave 'adv:<id>' ya avisada no se repite.
  expect(advanceReminderDue(list, atOn(5, 8, 0), ['adv:tarde']).length).toBe(0)
  // Si faltan 6 h justas, las horas que muestra el aviso son 6.
  const due = reminderAt(list[0])
  expect(due.getDate()).toBe(5)
  expect(due.getHours()).toBe(14)
})

test('isOverdue y newOrdersSince', () => {
  expect(isOverdue(r('x', { dueDate: '2026-11-04', dueTime: '10:00' }), at(11))).toBe(true)
  expect(isOverdue(r('x', { dueDate: '2026-11-04' }), at(23))).toBe(false)
  const orders = [{ id: 1, createdAt: '2026-11-04T15:00:00Z' }, { id: 2, createdAt: '2026-11-04T13:00:00Z' }]
  expect(newOrdersSince(orders, '2026-11-04T14:00:00Z').map((o) => o.id)).toEqual([1])
  expect(newOrdersSince(orders, '')).toEqual([])
})
