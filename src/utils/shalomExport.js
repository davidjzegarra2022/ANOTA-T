// Formato de carga masiva de Shalom Pro ("Formato Pro Masivo") con los
// pedidos de Shalom de la tienda.
//
// No se genera un Excel nuevo: se RELLENA la plantilla oficial
// (public/plantillas/plantilla-shalom-masivo.xlsx) editando directamente
// la hoja "Hoja1" dentro del .xlsx. Así se conservan las listas
// desplegables (ORIGEN/DESTINO validados contra la hoja oculta "Hoja2",
// MERCADERIA), las fórmulas que calculan ALTO/ANCHO/LARGO/PESO según la
// mercadería y los estilos — reescribir el archivo con SheetJS los perdería.

export const SHALOM_TEMPLATE_URL = '/plantillas/plantilla-shalom-masivo.xlsx'
export const MERCADERIA_OPTIONS = ['SOBRE', 'PAQUETE XXS', 'PAQUETE XS', 'PAQUETE S', 'PAQUETE M', 'PAQUETE L']
const MAX_ROWS = 499 // la plantilla trae filas preparadas hasta la 500

function norm(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9 ]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
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

let templateCache = null

async function loadTemplate() {
  if (templateCache) return templateCache
  const res = await fetch(SHALOM_TEMPLATE_URL, { cache: 'force-cache' })
  if (!res.ok) throw new Error('No se pudo descargar la plantilla de Shalom.')
  const bytes = new Uint8Array(await res.arrayBuffer())
  const XLSX = await import('xlsx')
  const wb = XLSX.read(bytes, { type: 'array', sheets: ['Hoja2'] })
  const rows = XLSX.utils.sheet_to_json(wb.Sheets.Hoja2, { header: 1, defval: '' })
  const unique = (list) => [...new Set(list.map((v) => String(v ?? '').trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'))
  // Igual que las validaciones de la plantilla: ORIGEN = Hoja2!B1:B509,
  // DESTINO = Hoja2!C2:C498 (hay agencias que solo reciben envíos de origen).
  const agencies = unique(rows.map((r) => r[1]))
  const destinations = unique(rows.slice(1, 498).map((r) => r[2]))
  templateCache = {
    bytes,
    agencies,
    byNorm: new Map(agencies.map((n) => [norm(n), n])),
    destByNorm: new Map(destinations.map((n) => [norm(n), n])),
  }
  return templateCache
}

/** Nombres oficiales de las agencias Shalom (para elegir la agencia de ORIGEN). */
export async function fetchShalomAgencyNames() {
  return (await loadTemplate()).agencies
}

/** Pedidos que van en el formato: retiro en agencia Shalom y no cancelados. */
export function isShalomOrder(order) {
  return order.deliveryMethod === 'agency' && String(order.courier).toLowerCase() === 'shalom' && order.status !== 'cancelled'
}

/**
 * Nombre oficial de la agencia Shalom de destino a partir de lo que guardó
 * el pedido ("Departamento / Provincia / Distrito / Agencia"). Primero la
 * agencia, después el distrito; si nada coincide se deja el texto tal cual
 * (en mayúsculas) y se avisa para revisarlo.
 */
export function matchDestino(order, byNorm) {
  const parts = String(order.agencyLabel || '').split('/').map((p) => p.trim()).filter(Boolean)
  const agency = norm(parts.length >= 4 ? parts[parts.length - 1] : '')
  const district = norm(parts[2] || '')
  // 1) nombre de la agencia exacto; 2) distrito exacto (agencias con el
  // nombre del distrito, ej. "PEDRO RUIZ"). La provincia nunca se usa: "LIMA"
  // mandaría el paquete a cualquier agencia de Lima.
  for (const c of [agency, district]) {
    const hit = c && byNorm.get(c)
    if (hit) return { value: hit, matched: true }
  }
  // 3) un único nombre oficial que empiece con el de la agencia
  // (ej. "JAEN" → "JAEN CO").
  if (agency.length >= 4) {
    const starts = [...byNorm.keys()].filter((k) => k.startsWith(`${agency} `))
    if (starts.length === 1) return { value: byNorm.get(starts[0]), matched: true }
  }
  return { value: (parts[parts.length - 1] || order.agencyLabel || '').toUpperCase(), matched: false }
}

function cellXml(ref, style, value) {
  const s = style ? ` s="${style}"` : ''
  if (value === null || value === undefined || value === '') return `<c r="${ref}"${s}/>`
  if (typeof value === 'number') return `<c r="${ref}"${s}><v>${value}</v></c>`
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

function digitsOrText(value) {
  const v = String(value ?? '').trim()
  return /^\d{1,15}$/.test(v) ? Number(v) : v
}

/**
 * Genera y descarga el .xlsx con los pedidos de Shalom.
 * Devuelve { count, unmatched } — `unmatched` son los pedidos cuyo destino
 * no coincidió con una agencia de la lista oficial (hay que revisarlos).
 */
export async function exportShalomMassive(orders, { origen = '', mercaderia = 'PAQUETE S', filename } = {}) {
  const rows = orders
    .filter(isShalomOrder)
    .sort((a, b) => (a.orderNumber ?? 0) - (b.orderNumber ?? 0))
    .slice(0, MAX_ROWS)
  const { bytes, byNorm, destByNorm } = await loadTemplate()
  const { unzipSync, zipSync, strFromU8, strToU8 } = await import('fflate')
  const files = unzipSync(bytes)
  const path = 'xl/worksheets/sheet1.xml'
  let sheet = strFromU8(files[path])

  const origenValue = origen ? byNorm.get(norm(origen)) || origen.toUpperCase() : ''
  const merc = MERCADERIA_OPTIONS.includes(mercaderia) ? mercaderia : 'PAQUETE S'
  const unmatched = []

  // Valores por fila (la fila 2 trae un ejemplo: se limpia aunque no haya pedidos).
  const byRow = new Map()
  const total = Math.max(rows.length, 1)
  for (let i = 0; i < total; i++) {
    const o = rows[i]
    const dest = o ? matchDestino(o, destByNorm) : { value: '', matched: true }
    if (o && !dest.matched) unmatched.push(o)
    byRow.set(i + 2, {
      A: o ? digitsOrText(o.customerDni) : '', // DESTINATARIO (DOC)
      B: o ? digitsOrText(o.customerPhone) : '', // TELF. DESTINATARIO
      C: '', // CONTACTO (DOC)
      D: '', // TELF. CONTACTO
      E: '', // NRO GRR
      F: o ? origenValue : '', // ORIGEN
      G: o ? dest.value : '', // DESTINO
      H: o ? merc : '', // MERCADERIA (las fórmulas calculan las medidas)
      M: o ? 1 : '', // CANTIDAD
    })
  }

  // Una sola pasada por la hoja: solo se tocan las filas que llevan pedido.
  sheet = sheet.replace(/<row r="(\d+)"([^>]*)>([\s\S]*?)<\/row>/g, (whole, n, attrs, inner) => {
    const values = byRow.get(Number(n))
    if (!values) return whole
    let next = inner
    for (const [col, value] of Object.entries(values)) next = setCell(next, `${col}${n}`, value)
    return `<row r="${n}"${attrs}>${next}</row>`
  })

  files[path] = strToU8(sheet)
  const out = zipSync(files, { level: 6 })
  const blob = new Blob([out], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename || `shalom-carga-masiva-${new Date().toISOString().slice(0, 10)}.xlsx`
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
  return { count: rows.length, unmatched, truncated: orders.filter(isShalomOrder).length > MAX_ROWS }
}
