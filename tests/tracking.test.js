import { expect, test } from 'vitest'
import { cleanTrackingCode, codeFromLocation, trackingHeadline, trackingLink, trackingSteps } from '../src/utils/tracking.js'
import { buildWhatsAppSummary, buildStatusMessage } from '../src/utils/whatsapp.js'

test('trackingLink y codeFromLocation: link directo y links antiguos', () => {
  expect(trackingLink(' anota-adk3h5 ', 'https://anotat.vercel.app/')).toBe('https://anotat.vercel.app/rastreo/ANOTA-ADK3H5')
  expect(codeFromLocation('/rastreo/anota-adk3h5')).toBe('ANOTA-ADK3H5')
  expect(codeFromLocation('/rastreo', '?codigo=ANOTA-X1')).toBe('ANOTA-X1')
  expect(codeFromLocation('/', '', '#rastreo?c=ANOTA-Y2')).toBe('ANOTA-Y2')
  expect(codeFromLocation('/', '', '#rastreo')).toBe('')
  expect(cleanTrackingCode('ANOTA-ADK3H5 <script>')).toBe('ANOTA-ADK3H5SC')
})

test('trackingSteps: el paso actual sigue al último confirmado por el estado', () => {
  const states = (o) => trackingSteps(o).map((s) => s.state)
  expect(states({ status: 'pending', deliveryMethod: 'agency', courier: 'shalom' })).toEqual(['done', 'current', 'todo', 'todo'])
  expect(states({ status: 'packed', deliveryMethod: 'agency' })).toEqual(['done', 'done', 'current', 'todo'])
  expect(states({ status: 'shipped', deliveryMethod: 'agency' })).toEqual(['done', 'done', 'done', 'current'])
  // Empacado: el envío es lo SIGUIENTE y todavía no dice "va camino".
  const packed = trackingSteps({ status: 'packed', deliveryMethod: 'agency', courier: 'olva courier' })
  expect(packed[1].title).toBe('Pedido empacado')
  expect(packed[2]).toMatchObject({ title: 'Envío con Olva Courier', badge: 'Siguiente' })
  expect(packed[2].text).not.toMatch(/va camino/)
  const shipped = trackingSteps({ status: 'shipped', deliveryMethod: 'agency', courier: 'shalom' })
  expect(shipped[2]).toMatchObject({ title: 'Enviado por Shalom', state: 'done' })
  expect(trackingSteps({ status: 'pending', deliveryMethod: 'agency' })[1].badge).toBe('Ahora')
  expect(trackingSteps({ status: 'pending', deliveryMethod: 'home' })[3].title).toBe('Entrega en tu dirección')
  expect(trackingHeadline({ status: 'cancelled', businessName: 'NEXUS' }).tone).toBe('bad')
})

test('los mensajes de WhatsApp llevan el link directo al rastreo', () => {
  const summary = buildWhatsAppSummary({ deliveryMethod: 'agency', trackingCode: 'ANOTA-W8ME3M', orderStatus: 'pending', fullName: 'Carlos' }, { businessName: 'NEXUS' })
  expect(summary).toContain('/rastreo/ANOTA-W8ME3M')
  expect(summary).not.toContain('#rastreo')
  expect(buildStatusMessage({ status: 'shipped', trackingCode: 'ANOTA-W8ME3M', customerName: 'Carlos' }, { businessName: 'NEXUS' })).toContain('/rastreo/ANOTA-W8ME3M')
})

test('trackingSteps muestra la hora real de cada paso cuando la base la tiene', () => {
  const steps = trackingSteps({ status: 'shipped', deliveryMethod: 'agency', createdAt: 'c', packedAt: 'p', shippedAt: 's' })
  expect(steps.map((x) => x.at)).toEqual(['c', 'p', 's', null])
  // Sin SQL de horas (o pedido antiguo): sin hora, no se inventa.
  expect(trackingSteps({ status: 'shipped', deliveryMethod: 'agency', createdAt: 'c' }).map((x) => x.at)).toEqual(['c', null, null, null])
  // Un paso que aún no pasó nunca muestra hora.
  expect(trackingSteps({ status: 'pending', deliveryMethod: 'agency', createdAt: 'c', packedAt: 'p' })[1].at).toBe(null)
})

test('orderDestination: agencia, domicilio y tienda', async () => {
  const { orderDestination } = await import('../src/utils/orderSummary.js')
  expect(orderDestination({ deliveryMethod: 'agency', agencyLabel: 'Amazonas / Bongara / Jazan / Pedro Ruiz', agencyAddress: 'Av. Sacsahuaman 513' })).toEqual({
    main: 'Pedro Ruiz',
    detail: 'Jazan, Bongara (Amazonas) · Av. Sacsahuaman 513',
  })
  expect(orderDestination({ deliveryMethod: 'home', address: 'Jr. Las Flores 123', provinceDistrict: 'Lima / Surco', department: 'Lima' })).toEqual({
    main: 'Jr. Las Flores 123',
    detail: 'Lima / Surco · Lima',
  })
  expect(orderDestination({ deliveryMethod: 'store' }).main).toBe('Recojo en tienda')
})
