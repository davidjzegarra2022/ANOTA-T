import { test, expect } from 'vitest'
import {
  addDaysKey,
  countReminders,
  dayKey,
  dueLabel,
  filterReminders,
  groupReminders,
  newReminder,
  sortReminders,
  timeLabel,
} from '../src/utils/reminders.js'

const TODAY = '2026-11-02'
const mk = (over) => ({ ...newReminder({ text: 'x' }), ...over })

test('dayKey usa la fecha local, no UTC', () => {
  expect(dayKey(new Date(2026, 10, 2, 23, 30))).toBe('2026-11-02')
  expect(addDaysKey('2026-11-02', 1)).toBe('2026-11-03')
  expect(addDaysKey('2026-12-31', 1)).toBe('2027-01-01')
})

test('dueLabel dice hoy, mañana, ayer y fecha corta', () => {
  expect(dueLabel('', TODAY)).toBe('Sin fecha')
  expect(dueLabel(TODAY, TODAY)).toBe('Hoy')
  expect(dueLabel('2026-11-03', TODAY)).toBe('Mañana')
  expect(dueLabel('2026-11-01', TODAY)).toBe('Ayer')
  expect(dueLabel('2026-11-05', TODAY)).toMatch(/5/)
})

test('timeLabel pasa a formato de 12 horas', () => {
  expect(timeLabel('')).toBe('')
  expect(timeLabel('15:00')).toBe('3:00 p.m.')
  expect(timeLabel('00:05')).toBe('12:05 a.m.')
  expect(timeLabel('12:00')).toBe('12:00 p.m.')
})

test('sortReminders deja pendientes con fecha primero y hechos al final', () => {
  const list = [mk({ id: 'hecho', done: true, dueDate: '2026-11-01' }), mk({ id: 'sinfecha' }), mk({ id: 'tarde', dueDate: '2026-11-05' }), mk({ id: 'manana', dueDate: '2026-11-03' })]
  expect(sortReminders(list).map((r) => r.id)).toEqual(['manana', 'tarde', 'sinfecha', 'hecho'])
})

test('filterReminders separa hoy, próximos, importantes, sin fecha y listos', () => {
  const list = [
    mk({ id: 'hoy', dueDate: TODAY }),
    mk({ id: 'futuro', dueDate: '2026-11-20' }),
    mk({ id: 'sinfecha' }),
    mk({ id: 'imp', dueDate: '2026-11-05', important: true }),
    mk({ id: 'hecho', done: true, dueDate: TODAY }),
  ]
  const ids = (f) => filterReminders(list, f, TODAY).map((r) => r.id)
  expect(ids('todos')).toHaveLength(5)
  expect(ids('hoy')).toEqual(['hoy'])
  expect(ids('proximos').sort()).toEqual(['futuro', 'imp'])
  expect(ids('importantes')).toEqual(['imp'])
  expect(ids('sinfecha')).toEqual(['sinfecha'])
  expect(ids('listos')).toEqual(['hecho'])
})

test('groupReminders arma las secciones en orden y omite las vacías', () => {
  const list = [
    mk({ id: 'vencido', dueDate: '2026-10-30' }),
    mk({ id: 'hoy', dueDate: TODAY }),
    mk({ id: 'manana', dueDate: '2026-11-03' }),
    mk({ id: 'semana', dueDate: '2026-11-06' }),
    mk({ id: 'despues', dueDate: '2026-12-15' }),
    mk({ id: 'sinfecha' }),
    mk({ id: 'hecho', done: true }),
  ]
  const groups = groupReminders(list, TODAY)
  expect(groups.map((g) => g.id)).toEqual(['vencidos', 'hoy', 'manana', 'semana', 'despues', 'sinfecha', 'listos'])
  expect(groups.map((g) => g.items[0].id)).toEqual(['vencido', 'hoy', 'manana', 'semana', 'despues', 'sinfecha', 'hecho'])
})

test('countReminders cuenta solo pendientes donde corresponde', () => {
  const list = [mk({ dueDate: TODAY }), mk({ dueDate: TODAY, done: true }), mk({ dueDate: '2026-11-09' }), mk({ important: true })]
  const counts = countReminders(list, TODAY)
  expect(counts).toMatchObject({ todos: 4, hoy: 1, proximos: 1, importantes: 1, sinfecha: 1, listos: 1, pendientes: 3 })
})

test('newReminder normaliza el texto y la categoría', () => {
  const r = newReminder({ text: '  Llamar a Juan  ', category: 'inexistente' })
  expect(r.text).toBe('Llamar a Juan')
  expect(r.category).toBe('general')
  expect(r.done).toBe(false)
})
