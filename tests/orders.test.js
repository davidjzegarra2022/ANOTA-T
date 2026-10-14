import { test, expect } from 'vitest'
import { orderMatchesSearch } from '../src/utils/orders.js'

const order = {
  orderNumber: 27, dailyNumber: 3, trackingCode: 'ANOTA-7KQ2PX',
  customerName: 'Lucía Fernández', customerPhone: '912345678', customerDni: '12345678',
  courier: 'shalom', agencyLabel: 'Arequipa / Arequipa / Cayma / Cayma', status: 'pending',
  createdAt: '2026-10-12T15:00:00-05:00', shippingDate: '2026-10-13',
}

test('"#N" busca el número general por defecto', () => {
  expect(orderMatchesSearch(order, '#27')).toBe(true)
  expect(orderMatchesSearch(order, '#3')).toBe(false)
})

test('"#N" con daily usa el número del día (Envíos)', () => {
  expect(orderMatchesSearch(order, '#3', { daily: true })).toBe(true)
  expect(orderMatchesSearch(order, '#27', { daily: true })).toBe(false)
})

test('busca por nombre y código, sin distinguir acentos ni mayúsculas', () => {
  expect(orderMatchesSearch(order, 'lucia')).toBe(true)
  expect(orderMatchesSearch(order, '7kq2px')).toBe(true)
  expect(orderMatchesSearch(order, 'juan')).toBe(false)
})

test('cada palabra escrita debe aparecer', () => {
  expect(orderMatchesSearch(order, 'lucia shalom')).toBe(true)
  expect(orderMatchesSearch(order, 'lucia olva')).toBe(false)
})
