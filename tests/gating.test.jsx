// @vitest-environment jsdom
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import RecordatoriosPage from '../src/components/dashboard/RecordatoriosPage.jsx'
import ConfiguracionPage from '../src/components/dashboard/ConfiguracionPage.jsx'
import { isProPlan } from '../src/utils/plans.js'

vi.mock('../src/utils/merchantProfile', () => ({
  updateMyMerchant: vi.fn(async () => ({ ok: true })),
  uploadMerchantLogo: vi.fn(async () => ({ ok: true, url: 'https://logo' })),
}))

const MERCHANT = {
  id: 'm-1',
  businessName: 'NEXUS IMPORT',
  whatsappNumber: '51962029292',
  currency: 'PEN',
  timezone: 'America/Lima',
  logoUrl: null,
  slug: 'nexus-import',
  couriersActive: [],
  dispatchDays: [1, 2, 3],
  cutoffHour: 17,
  leadTimeHours: 0,
  sellers: [{ name: 'Juan Pérez', whatsapp: '987654321' }],
  sellersSupported: true,
}

beforeEach(() => localStorage.clear())
afterEach(cleanup)

test('isProPlan reconoce solo el nivel Pro', () => {
  expect(isProPlan({ name: 'Emprendedor Pro' })).toBe(true)
  expect(isProPlan({ name: 'emprendedor PRO' })).toBe(true)
  expect(isProPlan({ name: 'Emprendedor' })).toBe(false)
  expect(isProPlan({ name: 'Prueba Free' })).toBe(false)
  expect(isProPlan({ name: 'Productor' })).toBe(false)
  expect(isProPlan(null)).toBe(false)
})

test('Recordatorios bloqueado: aviso, campos y botones deshabilitados', () => {
  const onUpgrade = vi.fn()
  const { container } = render(<RecordatoriosPage merchant={MERCHANT} locked onUpgrade={onUpgrade} />)

  expect(screen.getByText(/parte del plan Emprendedor Pro/i)).toBeTruthy()
  // Todo el módulo vive dentro de un <fieldset disabled>: el navegador
  // deshabilita de golpe los campos y los botones de adentro.
  const fieldset = container.querySelector('fieldset')
  expect(fieldset).toBeTruthy()
  expect(fieldset.disabled).toBe(true)
  expect(fieldset.contains(screen.getByLabelText('Qué tienes que recordar'))).toBe(true)
  expect(fieldset.contains(screen.getByRole('button', { name: /^añadir$/i }))).toBe(true)
  // El botón de la barra lateral sigue activo para poder pedir el plan.
  expect(screen.getByRole('button', { name: /ver planes/i }).disabled).toBe(false)
})

test('Recordatorios habilitado con plan Pro: se puede escribir', () => {
  const { container } = render(<RecordatoriosPage merchant={MERCHANT} locked={false} />)
  expect(screen.queryByText(/parte del plan Emprendedor Pro/i)).toBeNull()
  expect(container.querySelector('fieldset').disabled).toBe(false)
  expect(screen.getByLabelText('Qué tienes que recordar').disabled).toBe(false)
})

test('Vendedores bloqueado: aviso y campos deshabilitados', () => {
  render(<ConfiguracionPage merchant={MERCHANT} onSaved={() => {}} locked onUpgrade={() => {}} />)

  expect(screen.getByText(/Vendedores es parte del plan Emprendedor Pro/i)).toBeTruthy()
  expect(screen.getByLabelText(/nombre del vendedor 1/i).disabled).toBe(true)
  expect(screen.getByLabelText(/whatsapp del vendedor 1/i).disabled).toBe(true)
  expect(screen.getByRole('button', { name: /añadir vendedor/i }).disabled).toBe(true)
})

test('Vendedores habilitado con plan Pro: se puede editar', () => {
  render(<ConfiguracionPage merchant={MERCHANT} onSaved={() => {}} />)
  expect(screen.queryByText(/Vendedores es parte del plan Emprendedor Pro/i)).toBeNull()
  expect(screen.getByLabelText(/nombre del vendedor 1/i).disabled).toBe(false)
})
