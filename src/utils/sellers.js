// Vendedores de una tienda: hasta 4 personas que comparten links distintos
// y alimentan el MISMO panel. El link de cada vendedor lleva su nombre en la
// URL (`/f/mi-tienda?v=Juan%20Pérez`); el formulario público lo lee, lo
// guarda en el pedido y así el panel sabe de quién es cada venta sin que el
// cliente final vea nada distinto.
export const MAX_SELLERS = 4
export const SELLER_PARAMS = ['v', 'vendedor', 'ref']
export const SELLER_NAME_MAX = 60
export const SELLER_ID_RE = /^[a-z0-9]{8}$/

/**
 * Código fijo de cada vendedor (8 letras/números). Va en su link
 * (`/f/mi-tienda?v=k3m9x2qa`) en vez del nombre: así el link sigue sirviendo
 * aunque se corrija el nombre, y nadie puede inventar un vendedor cambiando
 * la URL — el servidor solo reconoce códigos que la tienda registró.
 */
export function newSellerId() {
  const alphabet = 'abcdefghijkmnpqrstuvwxyz23456789'
  const bytes = new Uint8Array(8)
  try {
    crypto.getRandomValues(bytes)
  } catch {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256)
  }
  return [...bytes].map((b) => alphabet[b % alphabet.length]).join('')
}

/** Limpia un nombre: sin caracteres de control ni invisibles, 60 caracteres. */
export function cleanSellerName(value) {
  return String(value ?? '')
    .normalize('NFC')
    // eslint-disable-next-line no-control-regex -- se quitan a propósito
    .replace(/[\u0000-\u001f\u007f\u200b-\u200f\u202a-\u202e]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, SELLER_NAME_MAX)
}

/**
 * Nombre del vendedor que viene en la URL del formulario público
 * (`?v=`, `?vendedor=` o `?ref=`). Devuelve '' si no hay nada válido.
 */
export function readSellerFromSearch(search) {
  try {
    const params = new URLSearchParams(search || '')
    for (const key of SELLER_PARAMS) {
      const raw = params.get(key)
      const clean = cleanSellerName(raw)
      // Links de tienda antiguos llevaban la versión del logo en `?v=123456`:
      // un número corto no es un vendedor.
      if (key === 'v' && /^\d{1,6}$/.test(clean)) continue
      if (clean) return clean
    }
  } catch {
    // URL inválida: se trata como si no hubiera vendedor.
  }
  return ''
}

/**
 * Link público del formulario para un vendedor. Recibe el vendedor
 * ({ id, name }): usa su código si lo tiene y, si no, su nombre (links
 * antiguos). Sin vendedor devuelve el link normal de la tienda.
 */
export function sellerLink(origin, slug, seller) {
  const base = `${String(origin || '').replace(/\/+$/, '')}/f/${slug || ''}`
  const ref = typeof seller === 'object' && seller ? (SELLER_ID_RE.test(seller.id || '') ? seller.id : cleanSellerName(seller.name)) : cleanSellerName(seller)
  return ref ? `${base}?v=${encodeURIComponent(ref)}` : base
}

/** Texto listo para pegar en WhatsApp: link + una frase corta. */
export function sellerShareText({ businessName, link }) {
  const shop = String(businessName || 'mi tienda').trim()
  return `Hola 👋 Este es el formulario de envío de ${shop}. Llénalo y coordinamos el despacho: ${link}`
}

/**
 * Deja la lista en el formato que se guarda en la base:
 * [{ id, name, whatsapp }], máx. 4. A quien no tenga código se le asigna uno.
 */
export function normalizeSellers(list) {
  if (!Array.isArray(list)) return []
  return list
    .map((s) => ({
      id: SELLER_ID_RE.test(String(s?.id || '')) ? s.id : newSellerId(),
      name: cleanSellerName(s?.name),
      whatsapp: String(s?.whatsapp ?? '')
        .replace(/\D/g, '')
        .slice(0, 12),
    }))
    .filter((s) => s.name)
    .slice(0, MAX_SELLERS)
}

/**
 * Revisa la lista antes de guardar. Devuelve el primer problema en texto
 * para mostrarlo, o '' si está todo bien. Cada vendedor necesita nombre y
 * WhatsApp de 9 dígitos: ese número es el que recibe los resúmenes de SUS
 * clientes (sin número, el resumen iría a la tienda).
 */
export function sellersProblem(list) {
  const rows = Array.isArray(list) ? list : []
  const seen = new Set()
  for (let i = 0; i < rows.length; i++) {
    const name = cleanSellerName(rows[i]?.name)
    const wa = String(rows[i]?.whatsapp ?? '').replace(/\D/g, '')
    if (!name && !wa) continue
    if (!name) return `Escribe el nombre del vendedor ${i + 1} (o quita esa fila).`
    if (wa.length !== 9) return `El WhatsApp de ${name} debe tener 9 dígitos: ahí le llegan los pedidos de sus clientes.`
    const key = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    if (seen.has(key)) return `Hay dos vendedores llamados ${name}: usa nombres distintos.`
    seen.add(key)
  }
  return ''
}

/** WhatsApp (9 dígitos) del vendedor con ese nombre dentro de la lista, o '' si no hay. */
export function findSellerWhatsApp(sellers, name) {
  // Sin mayúsculas ni tildes: el link puede llegar escrito distinto al nombre guardado.
  const fold = (v) => cleanSellerName(v).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const wanted = fold(name)
  if (!wanted) return ''
  const found = (sellers || []).find((s) => fold(s?.name) === wanted)
  return String(found?.whatsapp ?? '').replace(/\D/g, '')
}

/** Número con código de país (51) para WhatsApp; '' si el vendedor no tiene número. */
export function sellerWhatsAppWithCountry(digits) {
  const d = String(digits ?? '').replace(/\D/g, '')
  if (!d) return ''
  return d.length <= 9 ? `51${d}` : d
}

/** Todos los vendedores que aparecen en un pedido o en la configuración, sin repetir. */
export function collectSellerNames(sellers, orders) {
  const names = new Set()
  for (const s of sellers || []) if (s?.name) names.add(s.name)
  for (const o of orders || []) if (o?.sellerName) names.add(o.sellerName)
  return [...names].sort((a, b) => a.localeCompare(b, 'es'))
}

// --- Borrador local -------------------------------------------------------// Mientras la columna `merchants.sellers` no exista en la base (falta correr
// sql/2026-11-04-vendedores.sql), la lista se guarda en este dispositivo para
// que "Guardar cambios" nunca borre lo que el usuario escribió. En cuanto la
// columna exista, el borrador se sube solo en el siguiente guardado.

function draftKey(merchantId) {
  return `anotate-sellers-draft:${merchantId || 'anon'}`
}

export function loadSellerDraft(merchantId) {
  try {
    const raw = localStorage.getItem(draftKey(merchantId))
    if (!raw) return []
    return normalizeSellers(JSON.parse(raw))
  } catch {
    return []
  }
}

export function saveSellerDraft(merchantId, list) {
  try {
    localStorage.setItem(draftKey(merchantId), JSON.stringify(normalizeSellers(list)))
    return true
  } catch {
    return false
  }
}

/**
 * SQL para activar los vendedores en Supabase. Se importa tal cual del
 * archivo del repo (una sola fuente): el panel /admin lo muestra con botón
 * "Copiar SQL" mientras la base todavía no lo tenga.
 */
export { default as SELLERS_SQL } from '../../sql/2026-11-04-vendedores.sql?raw'
