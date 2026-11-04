import { expect, test } from 'vitest'
import { dueSlot, isOverdue, newOrdersSince, pendingReminders, timedReminderDue } from '../src/utils/alerts.js'

const at = (h, m = 0) => new Date(2026, 10, 4, h, m)
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

test('isOverdue y newOrdersSince', () => {
  expect(isOverdue(r('x', { dueDate: '2026-11-04', dueTime: '10:00' }), at(11))).toBe(true)
  expect(isOverdue(r('x', { dueDate: '2026-11-04' }), at(23))).toBe(false)
  const orders = [{ id: 1, createdAt: '2026-11-04T15:00:00Z' }, { id: 2, createdAt: '2026-11-04T13:00:00Z' }]
  expect(newOrdersSince(orders, '2026-11-04T14:00:00Z').map((o) => o.id)).toEqual([1])
  expect(newOrdersSince(orders, '')).toEqual([])
})
