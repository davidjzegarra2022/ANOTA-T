// @vitest-environment jsdom
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { markOnboarding, onboardingSteps } from '../src/utils/onboarding.js'

const hasAnyOrder = vi.fn()
vi.mock('../src/utils/orders', () => ({ hasAnyOrder: (...a) => hasAnyOrder(...a) }))
vi.mock('../src/utils/clipboard', () => ({ copyText: vi.fn(async () => true) }))

const { default: OnboardingChecklist } = await import('../src/components/dashboard/OnboardingChecklist.jsx')

const M = { id: 'm-1', slug: 'nexus-import', logoUrl: null, sellers: [] }

beforeEach(() => {
  localStorage.clear()
  hasAnyOrder.mockReset()
})
afterEach(cleanup)

test('onboardingSteps: el paso actual es el primero sin hacer y Vendedores solo con Pro', () => {
  const basic = onboardingSteps({ merchant: M, proEnabled: false, hasOrders: false })
  expect(basic.steps.map((s) => s.id)).toEqual(['config', 'logo', 'share', 'order'])
  expect(basic.current.id).toBe('config')

  const pro = onboardingSteps({ merchant: { ...M, logoUrl: 'x' }, proEnabled: true, hasOrders: false, flags: { configSaved: true } })
  expect(pro.steps.map((s) => s.id)).toContain('sellers')
  expect(pro.current.id).toBe('sellers')
  expect(pro.doneCount).toBe(2)

  const all = onboardingSteps({ merchant: { ...M, logoUrl: 'x' }, proEnabled: false, hasOrders: true, flags: { configSaved: true, linkShared: true } })
  expect(all.complete).toBe(true)
})

test('la guía resalta el paso actual, lleva a Configuración y se puede ocultar', async () => {
  hasAnyOrder.mockResolvedValue(false)
  const onGoTo = vi.fn()
  render(<OnboardingChecklist merchant={M} proEnabled={false} onGoTo={onGoTo} />)

  await waitFor(() => expect(screen.getByText(/primeros pasos · 0 de 4/i)).toBeTruthy())
  fireEvent.click(screen.getByRole('button', { name: /ir a configuración/i }))
  expect(onGoTo).toHaveBeenCalledWith('configuracion')

  // Guardar la configuración (desde otra pantalla) actualiza la guía al instante.
  markOnboarding('m-1', 'configSaved')
  await waitFor(() => expect(screen.getByText(/primeros pasos · 1 de 4/i)).toBeTruthy())

  fireEvent.click(screen.getByRole('button', { name: /ocultar guía/i }))
  await waitFor(() => expect(screen.queryByText(/primeros pasos/i)).toBeNull())
})

test('compartir el link marca el paso como hecho', async () => {
  hasAnyOrder.mockResolvedValue(false)
  render(<OnboardingChecklist merchant={{ ...M, logoUrl: 'x' }} proEnabled={false} onGoTo={() => {}} />)
  await waitFor(() => expect(screen.getByRole('button', { name: /copiar mi link/i })).toBeTruthy())
  fireEvent.click(screen.getByRole('button', { name: /copiar mi link/i }))
  await waitFor(() => expect(screen.getByText(/primeros pasos · 2 de 4/i)).toBeTruthy())
})

test('una tienda que ya recibe pedidos y tiene lo básico no ve la guía', async () => {
  hasAnyOrder.mockResolvedValue(true)
  localStorage.setItem('anotat-onboarding:m-1', JSON.stringify({ configSaved: true }))
  const { container } = render(<OnboardingChecklist merchant={{ ...M, logoUrl: 'x' }} proEnabled={false} onGoTo={() => {}} />)
  await waitFor(() => expect(hasAnyOrder).toHaveBeenCalled())
  await new Promise((r) => setTimeout(r, 0))
  expect(container.textContent).toBe('')
})
