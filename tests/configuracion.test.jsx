// @vitest-environment jsdom
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import ConfiguracionPage from '../src/components/dashboard/ConfiguracionPage.jsx'

// Reemplaza la llamada a Supabase: lo que se prueba es la pantalla (que no
// borre lo escrito y que guarde los vendedores cuando corresponde).
const updateMyMerchant = vi.fn()

vi.mock('../src/utils/merchantProfile', () => ({
  updateMyMerchant: (...args) => updateMyMerchant(...args),
  uploadMerchantLogo: vi.fn(async () => ({ ok: true, url: 'https://logo' })),
}))

const BASE = {
  id: 'm-1',
  businessName: 'NEXUS IMPORT',
  whatsappNumber: '51962029292',
  currency: 'PEN',
  timezone: 'America/Lima',
  logoUrl: null,
  slug: 'nexus-import',
  couriersActive: [],
  dispatchDays: [1, 2, 3, 4, 5],
  cutoffHour: 17,
  leadTimeHours: 0,
  sellers: [],
  sellersSupported: true,
}

function renderPage(overrides = {}) {
  const merchant = { ...BASE, ...overrides }
  const utils = render(<ConfiguracionPage merchant={merchant} onSaved={() => {}} />)
  return { ...utils, merchant }
}

function addSeller(name, whatsapp = '') {
  fireEvent.click(screen.getByRole('button', { name: /añadir vendedor/i }))
  fireEvent.change(screen.getByLabelText(/nombre del vendedor 1/i), { target: { value: name } })
  if (whatsapp) fireEvent.change(screen.getByLabelText(/whatsapp del vendedor 1/i), { target: { value: whatsapp } })
}

beforeEach(() => {
  updateMyMerchant.mockReset()
  localStorage.clear()
})

afterEach(cleanup)

test('guarda los vendedores y NO los borra de la pantalla al guardar', async () => {
  updateMyMerchant.mockResolvedValue({ ok: true, merchant: { ...BASE, sellers: [{ name: 'Juan Pérez', whatsapp: '987654321' }] } })
  renderPage()

  addSeller('Juan Pérez', '987654321')
  fireEvent.click(screen.getByRole('button', { name: /guardar cambios/i }))

  await waitFor(() => expect(updateMyMerchant).toHaveBeenCalledTimes(1))
  const patch = updateMyMerchant.mock.calls[0][0]
  expect(patch.sellers).toEqual([{ id: expect.stringMatching(/^[a-z0-9]{8}$/), name: 'Juan Pérez', whatsapp: '987654321' }])

  // Lo escrito sigue en el formulario después de guardar.
  await waitFor(() => expect(screen.getByLabelText(/nombre del vendedor 1/i).value).toBe('Juan Pérez'))
  expect(screen.getByLabelText(/whatsapp del vendedor 1/i).value).toBe('987654321')
})

test('si la base todavía no tiene la columna, guarda el resto y conserva el vendedor', async () => {
  updateMyMerchant.mockResolvedValue({ ok: true, merchant: BASE })
  renderPage({ sellersSupported: false })

  addSeller('Herman Zegarra', '994237031')
  fireEvent.click(screen.getByRole('button', { name: /guardar cambios/i }))

  await waitFor(() => expect(updateMyMerchant).toHaveBeenCalledTimes(1))
  const patch = updateMyMerchant.mock.calls[0][0]
  // No se manda una columna que no existe (así el guardado no falla)…
  expect('sellers' in patch).toBe(false)
  // …y el nombre queda en el formulario y en el borrador local.
  expect(screen.getByLabelText(/nombre del vendedor 1/i).value).toBe('Herman Zegarra')
  expect(localStorage.getItem('anotate-sellers-draft:m-1')).toContain('Herman Zegarra')
  // El aviso técnico del SQL ya no se muestra al negociante (vive en /admin).
  expect(screen.queryByText(/se están guardando en este dispositivo/i)).toBeNull()
  expect(screen.queryByRole('button', { name: /copiar sql/i })).toBeNull()
})

test('al volver a entrar recupera los vendedores del borrador', () => {
  localStorage.setItem('anotate-sellers-draft:m-1', JSON.stringify([{ name: 'Ana Torres', whatsapp: '912345678' }]))
  renderPage({ sellers: [], sellersSupported: false })
  expect(screen.getByLabelText(/nombre del vendedor 1/i).value).toBe('Ana Torres')
})

test('la lista de la base manda sobre el borrador cuando ya existen vendedores', () => {
  localStorage.setItem('anotate-sellers-draft:m-1', JSON.stringify([{ name: 'Viejo', whatsapp: '' }]))
  renderPage({ sellers: [{ name: 'Nuevo', whatsapp: '900000000' }], sellersSupported: true })
  expect(screen.getByLabelText(/nombre del vendedor 1/i).value).toBe('Nuevo')
})

test('no permite más de 4 vendedores y el botón queda deshabilitado', () => {
  renderPage()
  for (const name of ['Uno', 'Dos', 'Tres', 'Cuatro']) {
    fireEvent.click(screen.getByRole('button', { name: /añadir vendedor/i }))
    fireEvent.change(screen.getByLabelText(new RegExp(`nombre del vendedor ${['Uno', 'Dos', 'Tres', 'Cuatro'].indexOf(name) + 1}`, 'i')), { target: { value: name } })
  }
  const add = screen.getByRole('button', { name: /añadir vendedor/i })
  expect(add.disabled).toBe(true)
  expect(screen.getAllByLabelText(/nombre del vendedor/i)).toHaveLength(4)
})

test('un error de la base se muestra y no pierde nada', async () => {
  updateMyMerchant.mockResolvedValue({ ok: false, error: 'Sin conexión.' })
  renderPage()

  addSeller('Juan Pérez', '987654321')
  fireEvent.click(screen.getByRole('button', { name: /guardar cambios/i }))

  await waitFor(() => expect(screen.getByText('Sin conexión.')).toBeTruthy())
  expect(screen.getByLabelText(/nombre del vendedor 1/i).value).toBe('Juan Pérez')
  expect(localStorage.getItem('anotate-sellers-draft:m-1')).toContain('Juan Pérez')
})

test('no guarda un vendedor sin WhatsApp: ese número recibe los pedidos de sus clientes', async () => {
  renderPage()
  addSeller('Carlos Jesus')
  fireEvent.click(screen.getByRole('button', { name: /guardar cambios/i }))
  await waitFor(() => expect(screen.getByText(/whatsapp de carlos jesus debe tener 9 dígitos/i)).toBeTruthy())
  expect(updateMyMerchant).not.toHaveBeenCalled()
})

test('el link del vendedor usa su código y solo aparece cuando ya está guardado', () => {
  const saved = { id: 'k3m9x2qa', name: 'Carlos Jesus', whatsapp: '957514082' }
  renderPage({ sellers: [saved] })
  expect(screen.getByText('http://localhost:3000/f/nexus-import?v=k3m9x2qa')).toBeTruthy()
  expect(screen.getByText(/whatsapp \+51 957514082/i)).toBeTruthy()

  // Si se cambia el número sin guardar, el link se oculta hasta guardar.
  fireEvent.change(screen.getByLabelText(/whatsapp del vendedor 1/i), { target: { value: '900000000' } })
  expect(screen.queryByText(/\?v=k3m9x2qa/)).toBeNull()
  expect(screen.getByText(/guardar cambios.*para activar el link/i)).toBeTruthy()
})

test('explica que el link del dueño manda a SU WhatsApp y el de cada vendedor al del vendedor', () => {
  renderPage({ sellers: [{ id: 'k3m9x2qa', name: 'Carlos Jesus', whatsapp: '957514082' }] })
  expect(screen.getByText(/links de venta: tú y tus vendedores/i)).toBeTruthy()
  expect(screen.getByText('Dueño')).toBeTruthy()
  expect(screen.getByText(/tu whatsapp \+51 962029292/i)).toBeTruthy()
  expect(screen.getByText(/su whatsapp \+51 957514082/i)).toBeTruthy()
  expect(screen.getByText('Vendedor 1')).toBeTruthy()

  // Si cambia su número sin guardar, su link avisa que falta guardar.
  fireEvent.change(screen.getByDisplayValue('962029292'), { target: { value: '911111111' } })
  expect(screen.getByText(/activar tu link con el nombre y número nuevos/i)).toBeTruthy()
})
