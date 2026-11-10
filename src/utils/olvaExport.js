// Formato de carga masiva de Olva Courier ("Envíos Masivos Pago en Destino").
//
// Igual que con Shalom, no se genera un Excel nuevo: se RELLENA la plantilla
// oficial (.xlsm) editando directamente la hoja "Envíos Masivos Pago en
// Destino" dentro del archivo. Así se conservan las listas desplegables, las
// validaciones, las fórmulas y las macros (vbaProject.bin).
//
// La plantilla solo permite "Entrega en tienda" y trae las listas oficiales
// de departamentos, provincias, distritos y tiendas/agentes ocultas en las
// hojas "Destinos" y "Tiendas-Agentes". Aquí se leen esas listas para escribir
// valores que la plantilla acepte (si no, Olva rechaza la carga).

export const OLVA_TEMPLATE_URL = '/plantillas/plantilla-olva-masivo-pago-destino.xlsm'
const MAX_ROWS = 100 // filas 5 a 104 de la plantilla

/** Medidas de la hoja "tabla1" de la plantilla. */
export const OLVA_SIZES = ['Sobre', 'Paquete XXS', 'Paquete XS', 'Paquete S', 'Paquete M', 'Paquete L']

/** Categorías de artículo admitidas para paquetes (hoja "Dropdowns"). */
export const OLVA_ARTICLE_TYPES = [
  'ACCESORIOS ELECTRÓNICOS',
  'ACCESORIOS PARA FIESTA',
  'ALIMENTACIÓN Y BEBIDAS',
  'ARTÍCULOS DE LIMPIEZA',
  'ARTÍCULOS PUBLICITARIOS',
  'BISUTERIA',
  'CELULAR',
  'COSMÉTICOS',
  'CÁMARA',
  'ELECTROHOGAR',
  'FERRETERÍA Y CONSTRUCCIÓN',
  'JUGUETES',
  'LAPTOP',
  'MATERIAL MÉDICO',
  'MEDICINAS',
  'REPUESTOS',
  'ROPA Y ACCESORIOS',
  'TABLET',
  'TARJETAS PERSONALES',
  'VALIJA-DOCUMENTOS',
  'ÚTILES DE ESCRITORIO',
  'ÚTILES DE OFICINA',
]

/** Pedidos que van en el formato: retiro en agencia Olva y no cancelados. */
export function isOlvaOrder(order) {
  return order.deliveryMethod === 'agency' && String(order.courier).toLowerCase() === 'olva' && order.status !== 'cancelled'
}

/** Texto comparable: mayúsculas, sin tildes y con espacios simples. */
function normKey(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Nombre que usa la plantilla para sus rangos: mayúsculas y los mismos
 * reemplazos de la fórmula de la hoja (espacios, guiones, paréntesis, puntos).
 */
function sheetToken(text) {
  return String(text ?? '')
    .toUpperCase()
    .trim()
    .replace(/ /g, '_')
    .replace(/-/g, '_')
    .replace(/\(/g, '_')
    .replace(/\)/g, '')
    .replace(/\./g, '_')
    .replace(/_+/g, '_')
}

function xmlEscape(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    // Caracteres que XML no admite (rompen el archivo).
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
}

/** Lee los valores de un rango tipo "Hoja!$A$1:$A$5" con SheetJS. */
function readRange(XLSX, wb, ref) {
  if (!ref) return []
  const bang = ref.lastIndexOf('!')
  if (bang < 0) return []
  const sheetName = ref.slice(0, bang).replace(/^'|'$/g, '')
  const address = ref.slice(bang + 1).replace(/\$/g, '')
  const ws = wb.Sheets[sheetName]
  if (!ws) return []
  const range = XLSX.utils.decode_range(address)
  const out = []
  for (let r = range.s.r; r <= range.e.r; r++) {
    for (let c = range.s.c; c <= range.e.c; c++) {
      const cell = ws[XLSX.utils.encode_cell({ r, c })]
      const value = cell?.v
      if (value !== null && value !== undefined && String(value).trim()) out.push(String(value).trim())
    }
  }
  return out
}

/** Parsea la plantilla una sola vez: listas oficiales + medidas por talla. */
export async function parseOlvaTemplate(bytes) {
  const XLSX = await import('xlsx')
  const wb = XLSX.read(bytes, { type: 'array', bookVBA: true })
  const refs = new Map((wb.Workbook?.Names || []).map((n) => [String(n.Name), String(n.Ref || '')]))
  const get = (name) => readRange(XLSX, wb, refs.get(name))

  // Árbol Departamento → Provincia → Distrito → Tiendas/Agentes.
  const tree = new Map()
  for (const department of get('DEST_STORE_DEPARTAMENTOS')) {
    const dept = { name: department, provinces: new Map() }
    tree.set(normKey(department), dept)
    const departmentToken = sheetToken(department)
    for (const province of get(`DEST_STORE_${departmentToken}_PROVINCIAS`)) {
      const prov = { name: province, districts: new Map() }
      dept.provinces.set(normKey(province), prov)
      const provinceToken = sheetToken(province)
      for (const district of get(`DEST_STORE_${departmentToken}__${provinceToken}_DISTRITOS`)) {
        const dist = { name: district, agencies: [] }
        prov.districts.set(normKey(district), dist)
        dist.agencies = get(`DEST_STORE_${departmentToken}__${provinceToken}__${sheetToken(district)}_TIENDAS`)
      }
    }
  }

  // Medidas de la hoja "tabla1" (fila 2 en adelante).
  const sizes = {}
  const table = wb.Sheets.tabla1
  if (table) {
    for (let r = 2; r <= 7; r++) {
      const name = table[`A${r}`]?.v
      if (!name) continue
      sizes[String(name).trim()] = {
        largo: Number(table[`B${r}`]?.v) || 0,
        ancho: Number(table[`C${r}`]?.v) || 0,
        alto: Number(table[`D${r}`]?.v) || 0,
        peso: Number(table[`E${r}`]?.v) || 0,
      }
    }
  }

  return {
    bytes,
    tree,
    sizes,
    articleTypes: get('TipoArticuloNoDocumentos'),
    documentTypes: get('TipoArticuloDocumentos'),
  }
}

let templateCache = null

async function loadTemplate() {
  if (templateCache) return templateCache
  const res = await fetch(OLVA_TEMPLATE_URL, { cache: 'force-cache' })
  if (!res.ok) throw new Error('No se pudo descargar la plantilla de Olva.')
  const bytes = new Uint8Array(await res.arrayBuffer())
  templateCache = await parseOlvaTemplate(bytes)
  return templateCache
}

/** Nombres oficiales de las tiendas/agentes de Olva (para elegir la agencia). */
export async function fetchOlvaAgencyNames() {
  const tpl = await loadTemplate()
  const all = []
  for (const dept of tpl.tree.values()) {
    for (const prov of dept.provinces.values()) {
      for (const dist of prov.districts.values()) all.push(...dist.agencies)
    }
  }
  return [...new Set(all)].sort((a, b) => a.localeCompare(b, 'es'))
}

/**
 * Parte "Departamento / Provincia / Distrito / Agencia" que guarda el pedido.
 * Para los pedidos de agencia siempre llegan las 4 partes.
 */
export function destinationOf(order) {
  const parts = String(order.agencyLabel || '').split('/').map((p) => p.trim()).filter(Boolean)
  if (parts.length >= 4) {
    return { department: parts[0], province: parts[1], district: parts[2], zone: parts.slice(3).join(' / ') }
  }
  return {
    department: order.department || parts[0] || '',
    province: parts[1] || '',
    district: parts[2] || '',
    zone: parts[parts.length - 1] || '',
  }
}

/** Coincide la agencia del pedido con una de las tiendas oficiales del distrito. */
function matchAgency(agencies, zone) {
  const z = normKey(zone)
  if (!z) return null
  let best = null
  for (const agency of agencies) {
    const left = normKey(String(agency).split('|')[0])
    let score = 0
    if (left === z) score = 100
    else if (left.startsWith(`${z} `) || left.startsWith(`${z}-`) || left.startsWith(`${z}(`)) score = 80
    else if (left.includes(z)) score = 60
    else if (z.includes(left)) score = 40
    if (score && (!best || score > best.score)) best = { agency, score }
  }
  return best?.agency || null
}

/** Busca el destino del pedido en el árbol oficial. */
export function findOlvaDestination(template, order) {
  const wanted = destinationOf(order)
  const dept = template.tree.get(normKey(wanted.department))
  const prov = dept?.provinces.get(normKey(wanted.province))
  const dist = prov?.districts.get(normKey(wanted.district))
  const agency = dist ? matchAgency(dist.agencies, wanted.zone) : null
  return {
    department: dept?.name || wanted.department,
    province: prov?.name || wanted.province,
    district: dist?.name || wanted.district,
    agency,
    matched: Boolean(dist && agency),
    hasDistrict: Boolean(dist),
  }
}

/** Documento: DNI (8), RUC (11) o carnet/pasaporte (8 a 12 alfanumérico). */
export function documentInfo(dni) {
  const value = String(dni ?? '').trim().replace(/\s+/g, '')
  if (!value) return { type: '', number: '' }
  if (/^\d{11}$/.test(value) && /^(10|15|17|20)/.test(value)) return { type: 'RUC', number: value }
  if (/^\d{8}$/.test(value)) return { type: 'DNI', number: value }
  if (/^[A-Za-z0-9]{8,12}$/.test(value)) return { type: 'CARNET EXTRANJERIA', number: value }
  return { type: 'DNI', number: value }
}

/**
 * "NOMBRES" + "APELLIDO PATERNO" conservando el nombre completo: se corta en
 * el último espacio, así al imprimir la etiqueta se lee igual que lo escribió
 * el cliente (aunque tenga dos apellidos).
 */
export function splitName(fullName) {
  const parts = String(fullName ?? '').trim().split(/\s+/).filter(Boolean)
  if (parts.length <= 1) return { nombres: parts[0] || '', apellido: parts[0] ? '-' : '' }
  return { nombres: parts.slice(0, -1).join(' '), apellido: parts[parts.length - 1] }
}

/** Celular peruano: 9 dígitos que empiezan con 9 (si no, se deja vacío). */
export function phoneInfo(phone) {
  const digits = String(phone ?? '').replace(/\D/g, '')
  const local = digits.length > 9 ? digits.slice(-9) : digits
  return /^9\d{8}$/.test(local) ? local : ''
}

function cellXml(ref, style, value) {
  const s = style ? ` s="${style}"` : ''
  if (value === null || value === undefined || value === '') return `<c r="${ref}"${s}/>`
  if (typeof value === 'number' && Number.isFinite(value)) return `<c r="${ref}"${s}><v>${value}</v></c>`
  return `<c r="${ref}"${s} t="inlineStr"><is><t xml:space="preserve">${xmlEscape(value)}</t></is></c>`
}

/** Reemplaza una celda existente de la fila conservando su estilo. */
function setCell(sheetXml, ref, value) {
  const re = new RegExp(`<c r="${ref}"((?: [a-z]+="[^"]*")*)\\s*(?:/>|>[\\s\\S]*?</c>)`)
  return sheetXml.replace(re, (_m, attrs) => {
    const style = /s="(\d+)"/.exec(attrs)?.[1]
    return cellXml(ref, style, value)
  })
}

/**
 * Genera el .xlsm con los pedidos de Olva.
 * Devuelve { bytes, count, warnings, truncated }. `warnings` son los pedidos
 * con datos que la plantilla oficial no reconoce (revisar antes de subir).
 */
export async function buildOlvaWorkbook(orders, { size = 'Paquete S', article = 'ROPA Y ACCESORIOS', declaredValue = 100, template } = {}) {
  const tpl = template || (await loadTemplate())
  const selected = (orders || [])
    .filter(isOlvaOrder)
    .sort((a, b) => (a.orderNumber ?? 0) - (b.orderNumber ?? 0))
  const rows = selected.slice(0, MAX_ROWS)

  const talla = OLVA_SIZES.includes(size) ? size : 'Paquete S'
  const measure = tpl.sizes[talla] || tpl.sizes['Paquete S'] || { largo: 30, ancho: 25, alto: 16, peso: 2 }
  const isSobre = talla === 'Sobre'
  const mercaderia = isSobre ? 'Sobre' : 'Usa medidas personalizadas'
  const documentType = tpl.documentTypes[0] || 'DOCUMENTOS'
  const articleType = isSobre ? documentType : tpl.articleTypes.includes(article) ? article : tpl.articleTypes[0] || 'ROPA Y ACCESORIOS'
  const value = Math.min(1500, Math.max(0.02, Number(declaredValue) || 100))

  const warnings = []
  const byRow = new Map()
  rows.forEach((order, index) => {
    const dest = findOlvaDestination(tpl, order)
    const doc = documentInfo(order.customerDni)
    const name = doc.type === 'RUC' ? { nombres: '', apellido: '' } : splitName(order.customerName)
    const phone = phoneInfo(order.customerPhone)
    const issues = []
    if (!dest.hasDistrict) issues.push('destino no está en la lista oficial de Olva')
    else if (!dest.agency) issues.push('agencia no está en la lista oficial de Olva')
    if (!doc.type || !doc.number) issues.push('falta documento')
    if (!isSobre && doc.type !== 'RUC' && !name.nombres) issues.push('falta nombre')
    if (!phone) issues.push('celular inválido')
    if (issues.length) warnings.push({ orderNumber: order.orderNumber, customerName: order.customerName, issues })

    byRow.set(index + 5, {
      B: doc.type, // Tipo Documento
      C: doc.number, // Número de documento
      D: name.nombres, // NOMBRES
      E: name.apellido, // APELLIDO PATERNO
      F: doc.type === 'RUC' ? order.customerName : '', // RAZON SOCIAL
      H: phone, // Celular
      J: 'Entrega en tienda', // Tipo de entrega
      K: dest.department, // Departamento
      L: dest.province, // Provincia
      M: dest.district, // Distrito
      O: dest.agency || '', // Tienda o Agente
      Q: mercaderia, // ¿Qué deseas enviar?
      R: measure.largo,
      S: measure.ancho,
      T: measure.alto,
      U: measure.peso,
      V: articleType, // Tipo de artículo
      W: value, // Valor del artículo
      X: 'NO', // ¿Deseo contratar un seguro?
    })
  })

  const { unzipSync, zipSync, strFromU8, strToU8 } = await import('fflate')
  const files = unzipSync(tpl.bytes)
  const sheetPath = 'xl/worksheets/sheet1.xml'
  let sheet = strFromU8(files[sheetPath])
  sheet = sheet.replace(/<row r="(\d+)"([^>]*)>([\s\S]*?)<\/row>/g, (whole, n, attrs, inner) => {
    const values = byRow.get(Number(n))
    if (!values) return whole
    let next = inner
    for (const [col, cell] of Object.entries(values)) next = setCell(next, `${col}${n}`, cell)
    return `<row r="${n}"${attrs}>${next}</row>`
  })
  files[sheetPath] = strToU8(sheet)

  // Forzar el recálculo de las columnas auxiliares (AA:AN) al abrir el Excel.
  const workbookPath = 'xl/workbook.xml'
  if (files[workbookPath]) {
    let workbook = strFromU8(files[workbookPath])
    workbook = workbook.replace(/<calcPr([^>]*)\/>/, (match, attrs) => (attrs.includes('fullCalcOnLoad') ? match : `<calcPr${attrs} fullCalcOnLoad="1"/>`))
    files[workbookPath] = strToU8(workbook)
  }

  return {
    bytes: zipSync(files, { level: 6 }),
    count: rows.length,
    warnings,
    truncated: selected.length > MAX_ROWS,
  }
}

/** Genera y descarga el .xlsm con los pedidos de Olva. */
export async function exportOlvaMassive(orders, { filename, ...options } = {}) {
  const result = await buildOlvaWorkbook(orders, options)
  const blob = new Blob([result.bytes], { type: 'application/vnd.ms-excel.sheet.macroEnabled.12' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename || `olva-carga-masiva-${new Date().toISOString().slice(0, 10)}.xlsm`
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return result
}
