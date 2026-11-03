import { test, expect } from 'vitest'
import { mergePlanFallbacks, PLAN_FALLBACKS } from '../src/utils/plans.js'

const base = [
  { id: 1, name: 'Prueba Free', trialDays: 15, pricePerDay: 0, features: [] },
  { id: 3, name: 'Emprendedor', trialDays: null, pricePerDay: 1, features: [] },
]

test('agrega Emprendedor Pro cuando la base todavía no lo tiene', () => {
  const merged = mergePlanFallbacks(base)
  expect(merged.map((p) => p.name)).toEqual(['Prueba Free', 'Emprendedor', 'Emprendedor Pro'])
  const pro = merged.find((p) => p.name === 'Emprendedor Pro')
  expect(pro.pricePerDay).toBe(1.5)
  expect(pro.localOnly).toBe(true)
  expect(pro.features).toHaveLength(4)
})

test('no duplica el plan si ya existe en la base (mismo nombre, sin importar mayúsculas)', () => {
  const withPro = [...base, { id: 9, name: '  emprendedor PRO ', trialDays: null, pricePerDay: 1.5, features: ['x'] }]
  const merged = mergePlanFallbacks(withPro)
  expect(merged.filter((p) => p.name.toLowerCase().includes('pro'))).toHaveLength(1)
  expect(merged.some((p) => p.localOnly)).toBe(false)
})

test('ordena por precio y los planes locales van al final del mismo precio', () => {
  const merged = mergePlanFallbacks([...base].reverse())
  expect(merged.map((p) => p.pricePerDay)).toEqual([0, 1, 1.5])
})

test('sin planes en la base, igual muestra el catálogo de respaldo', () => {
  expect(mergePlanFallbacks([]).map((p) => p.name)).toEqual(PLAN_FALLBACKS.map((p) => p.name))
})
