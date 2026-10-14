import { test, expect } from 'vitest'
import { earliestDayOffset, generateAvailableDates, isPastCutoff } from '../src/utils/dates.js'

// Tienda típica: corte 17:00, sin anticipación, despacha lunes a sábado.
const M = { cutoffHour: 17, leadTimeHours: 0, dispatchDays: [1, 2, 3, 4, 5, 6] }
const at = (iso) => new Date(iso) // iso con -05:00 (hora de Perú)
const first = (m, iso) => generateAvailableDates(m, at(iso))[0]?.shortLabel

test('antes del corte permite el mismo día', () => {
  expect(earliestDayOffset(M, at('2026-10-12T10:00:00-05:00'))).toBe(0) // lunes 10am
  expect(first(M, '2026-10-12T10:00:00-05:00')).toBe('Lunes 12/10')
  expect(first(M, '2026-10-12T16:59:00-05:00')).toBe('Lunes 12/10')
})

test('desde el corte pasa al siguiente día de despacho', () => {
  expect(earliestDayOffset(M, at('2026-10-12T17:00:00-05:00'))).toBe(1)
  expect(first(M, '2026-10-12T17:00:00-05:00')).toBe('Martes 13/10')
  // Jueves 8 a las 21:37 → viernes 9 (el caso que reportó el usuario).
  expect(first(M, '2026-10-08T21:37:00-05:00')).toBe('Viernes 9/10')
})

test('salta el domingo (no es día de despacho)', () => {
  // Sábado 18:00 (pasado el corte) → el siguiente despacho es lunes.
  expect(first(M, '2026-10-10T18:00:00-05:00')).toBe('Lunes 12/10')
})

test('isPastCutoff usa la hora de Perú', () => {
  expect(isPastCutoff(M, at('2026-10-12T16:59:00-05:00'))).toBe(false)
  expect(isPastCutoff(M, at('2026-10-12T17:00:00-05:00'))).toBe(true)
})
