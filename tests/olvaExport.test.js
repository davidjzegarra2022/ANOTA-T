import { expect, test } from 'vitest'
import { readFileSync } from 'node:fs'
import { strFromU8, unzipSync } from 'fflate'
import {
  buildOlvaWorkbook,
  documentInfo,
  findOlvaDestination,
  isOlvaOrder,
  parseOlvaTemplate,
  phoneInfo,
  splitName,
} from '../src/utils/olvaExport.js'

const TEMPLATE = new URL('../public/plantillas/plantilla-olva-masivo-pago-destino.xlsm', import.meta.url)
let cached = null

async function template() {
  cached ||= await parseOlvaTemplate(new Uint8Array(readFileSync(TEMPLATE)))
  return cached
}

const order = (n, name, dni, phone, agencyLabel) => ({
  orderNumber: n,
  customerName: name,
  customerDni: dni,
  customerPhone: phone,
  deliveryMethod: 'agency',
  courier: 'olva',
  status: 'pending',
  agencyLabel,
})

const tacna = order(1, 'Colin Importaciones', '12345678', '976556778', 'Tacna / Tacna / Coronel Gregorio Albarracin Lanchipa / Tienda Cono Sur-Tacna')
const julcan = order(2, 'Juana de Arco', '87654321', '973457934', 'La Libertad / Julcan / Julcan / Julcan')
const barranca = order(3, 'Juanito el Chavito', '11223344', '985435783', 'Lima / Barranca / Barranca / Barranca')

test('lee las listas oficiales de la plantilla y reconoce destinos/agencias', async () => {
  const tpl = await template()
  expect(tpl.sizes['Paquete S']).toMatchObject({ largo: expect.any(Number), ancho: expect.any(Number), alto: expect.any(Number), peso: expect.any(Number) })
  expect(tpl.articleTypes.length).toBeGreaterThan(10)
  expect(documentInfo('12345678')).toEqual({ type: 'DNI', number: '12345678' })
  expect(tpl.documentTypes).toContain('DOCUMENTOS')

  expect(findOlvaDestination(tpl, tacna)).toMatchObject({ department: 'TACNA', district: 'CORONEL GREGORIO ALBARRACIN LANCHIPA', matched: true })
  expect(findOlvaDestination(tpl, julcan)).toMatchObject({ province: 'JULCAN', matched: true })
  // Barranca no está en la versión 31/10/2026 de la plantilla: se avisa.
  expect(findOlvaDestination(tpl, barranca)).toMatchObject({ hasDistrict: false, matched: false })
})

test('genera el .xlsm con la plantilla oficial, macros y avisos de destinos no listados', async () => {
  const shalom = { ...tacna, orderNumber: 4, courier: 'shalom' }
  const res = await buildOlvaWorkbook([tacna, shalom, barranca, julcan], {
    template: await template(),
    size: 'Paquete S',
    article: 'ROPA Y ACCESORIOS',
    declaredValue: 120,
  })

  expect(res.count).toBe(3)
  expect(res.truncated).toBe(false)
  // Solo Barranca queda fuera de la lista oficial (el pedido Shalom no entra).
  expect(res.warnings).toHaveLength(1)
  expect(res.warnings[0]).toMatchObject({ orderNumber: 3, customerName: 'Juanito el Chavito' })
  expect(res.warnings[0].issues.join(' ')).toContain('destino')

  const files = unzipSync(res.bytes)
  expect(files['xl/vbaProject.bin']).toBeTruthy()
  expect(strFromU8(files['xl/workbook.xml'])).toContain('fullCalcOnLoad="1"')

  const sheet = strFromU8(files['xl/worksheets/sheet1.xml'])
  expect(sheet).toContain('TIENDA CONO SUR-TACNA')
  expect(sheet).toContain('JULCAN (TRUJILLO)')
  expect(sheet).toContain('Entrega en tienda')
  expect(sheet).toContain('Usa medidas personalizadas')
  expect(sheet).toContain('ROPA Y ACCESORIOS')
  expect(sheet).toContain('>120<')
  // Los nombres y documentos viajan como texto inline (no se pierden tildes).
  expect(sheet).toContain('Colin Importaciones'.split(' ')[0])
})

test('Sobre usa DOCUMENTOS y medidas de la tabla; los datos se preparan', async () => {
  const res = await buildOlvaWorkbook([tacna], { template: await template(), size: 'Sobre' })
  const sheet = strFromU8(unzipSync(res.bytes)['xl/worksheets/sheet1.xml'])
  expect(sheet).toContain('Sobre')
  expect(sheet).toContain('DOCUMENTOS')
  expect(isOlvaOrder(tacna)).toBe(true)
  expect(isOlvaOrder({ ...tacna, status: 'cancelled' })).toBe(false)
  expect(isOlvaOrder(shalomOrder())).toBe(false)

  expect(splitName('Juana de Arco')).toEqual({ nombres: 'Juana de', apellido: 'Arco' })
  expect(splitName('Cher')).toEqual({ nombres: 'Cher', apellido: '-' })
  expect(phoneInfo('+51 976 556 778')).toBe('976556778')
  expect(phoneInfo('12345')).toBe('')
})

function shalomOrder() {
  return { ...tacna, courier: 'shalom' }
}
