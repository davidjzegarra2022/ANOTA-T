import { test, expect } from 'vitest'
import { cleanSellerName, collectSellerNames, normalizeSellers, readSellerFromSearch, sellerLink } from '../src/utils/sellers.js'
import { orderMatchesSearch } from '../src/utils/orders.js'

test('cleanSellerName limpia controles, espacios y largo', () => {
  expect(cleanSellerName('  Juan   Pérez ')).toBe('Juan Pérez')
  expect(cleanSellerName('Ana\u0000 Luz')).toBe('Ana Luz')
  expect(cleanSellerName('x'.repeat(100))).toHaveLength(60)
  expect(cleanSellerName(null)).toBe('')
})

test('readSellerFromSearch lee ?v, ?vendedor y ?ref', () => {
  expect(readSellerFromSearch('?v=Juan%20P%C3%A9rez')).toBe('Juan Pérez')
  expect(readSellerFromSearch('?vendedor=Maria')).toBe('Maria')
  expect(readSellerFromSearch('?ref=pedro')).toBe('pedro')
  expect(readSellerFromSearch('')).toBe('')
  expect(readSellerFromSearch('?v=%20%20')).toBe('')
  expect(readSellerFromSearch('?otro=1')).toBe('')
})

test('sellerLink arma el link del formulario con el vendedor', () => {
  expect(sellerLink('https://anotat.vercel.app', 'nexus-import', 'Juan Pérez')).toBe(
    'https://anotat.vercel.app/f/nexus-import?v=Juan%20P%C3%A9rez',
  )
  expect(sellerLink('https://anotat.vercel.app/', 'nexus', '')).toBe('https://anotat.vercel.app/f/nexus')
})

test('normalizeSellers deja máximo 4, exige nombre y limpia el WhatsApp', () => {
  const list = normalizeSellers([
    { name: 'Juan', whatsapp: '+51 987 654 321' },
    { name: '  ', whatsapp: '999' },
    { name: 'Ana' },
    { name: 'Luis' },
    { name: 'Eva' },
    { name: 'Sofi' },
  ])
  expect(list).toHaveLength(4)
  expect(list[0]).toEqual({ name: 'Juan', whatsapp: '51987654321' })
  expect(list[1]).toEqual({ name: 'Ana', whatsapp: '' })
  expect(normalizeSellers(null)).toEqual([])
})

test('collectSellerNames junta configuración y pedidos sin repetir', () => {
  const names = collectSellerNames([{ name: 'Juan' }], [{ sellerName: 'Ana' }, { sellerName: 'Juan' }, {}])
  expect(names).toEqual(['Ana', 'Juan'])
})

test('la búsqueda de Envíos también encuentra por vendedor', () => {
  const order = { orderNumber: 7, customerName: 'Herman', sellerName: 'Juan Pérez', status: 'pending' }
  expect(orderMatchesSearch(order, 'juan')).toBe(true)
  expect(orderMatchesSearch(order, 'perez')).toBe(true)
  expect(orderMatchesSearch(order, 'carlos')).toBe(false)
})
