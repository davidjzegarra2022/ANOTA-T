import { test, expect } from 'vitest'
import { periodRange, destinationCity, dispatchChannel, countBy, foldOthers, buyerKey } from '../src/utils/periods.js'

test('periodRange semana va de lunes a domingo', () => {
  const { from, to } = periodRange('week', new Date('2026-10-14T12:00:00-05:00')) // miércoles
  expect(from.getDay()).toBe(1) // lunes
  expect(Math.round((to - from) / 86400000)).toBe(7)
})

test('periodRange mes abarca el mes completo', () => {
  const { from, to } = periodRange('month', new Date('2026-10-14T12:00:00'))
  expect(from.getDate()).toBe(1)
  expect(from.getMonth()).toBe(9) // octubre
  expect(to.getMonth()).toBe(10) // noviembre
})

test('destinationCity toma la provincia de la agencia', () => {
  expect(destinationCity({ deliveryMethod: 'agency', agencyLabel: 'Arequipa / Arequipa / Cayma / Cayma' })).toBe('Arequipa')
  expect(destinationCity({ deliveryMethod: 'home', provinceDistrict: 'Trujillo / El Porvenir', department: 'La Libertad' })).toBe('Trujillo')
  expect(destinationCity({ deliveryMethod: 'store' })).toBe(null)
})

test('dispatchChannel distingue courier, delivery y tienda', () => {
  expect(dispatchChannel({ deliveryMethod: 'agency', courier: 'shalom' }).key).toBe('shalom')
  expect(dispatchChannel({ deliveryMethod: 'home' }).key).toBe('delivery')
  expect(dispatchChannel({ deliveryMethod: 'store' }).key).toBe('store')
})

test('countBy ordena de mayor a menor y foldOthers agrupa el resto', () => {
  const counts = countBy([{ courier: 'shalom' }, { courier: 'shalom' }, { courier: 'olva' }], (o) => o.courier)
  expect(counts[0].key).toBe('shalom')
  expect(counts[0].count).toBe(2)
  const folded = foldOthers([{ key: 'a', count: 5 }, { key: 'b', count: 3 }, { key: 'c', count: 2 }, { key: 'd', count: 1 }], 3)
  expect(folded.length).toBe(3)
  expect(folded[2].key).toBe('__others')
  expect(folded[2].count).toBe(3) // 2 + 1
})

test('buyerKey prefiere DNI, luego teléfono, luego nombre', () => {
  expect(buyerKey({ customerDni: '123', customerPhone: '999', customerName: 'Ana' })).toBe('123')
  expect(buyerKey({ customerPhone: '999', customerName: 'Ana' })).toBe('999')
  expect(buyerKey({ customerName: 'Ana' })).toBe('ana')
})
