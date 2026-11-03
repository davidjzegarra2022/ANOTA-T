// Vendedores de una tienda: hasta 4 personas que comparten links distintos
// y alimentan el MISMO panel. El link de cada vendedor lleva su nombre en la
// URL (`/f/mi-tienda?v=Juan%20Pérez`); el formulario público lo lee, lo
// guarda en el pedido y así el panel sabe de quién es cada venta sin que el
// cliente final vea nada distinto.
export const MAX_SELLERS = 4
export const SELLER_PARAMS = ['v', 'vendedor', 'ref']
export const SELLER_NAME_MAX = 60

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
      if (clean) return clean
    }
  } catch {
    // URL inválida: se trata como si no hubiera vendedor.
  }
  return ''
}

/** Link público del formulario para un vendedor (sin vendedor devuelve el link normal). */
export function sellerLink(origin, slug, name) {
  const base = `${String(origin || '').replace(/\/+$/, '')}/f/${slug || ''}`
  const clean = cleanSellerName(name)
  return clean ? `${base}?v=${encodeURIComponent(clean)}` : base
}

/** Texto listo para pegar en WhatsApp: link + una frase corta. */
export function sellerShareText({ businessName, link }) {
  const shop = String(businessName || 'mi tienda').trim()
  return `Hola 👋 Este es el formulario de envío de ${shop}. Llénalo y coordinamos el despacho: ${link}`
}

/** Deja la lista en el formato que se guarda en la base: [{ name, whatsapp }], máx. 4. */
export function normalizeSellers(list) {
  if (!Array.isArray(list)) return []
  return list
    .map((s) => ({
      name: cleanSellerName(s?.name),
      whatsapp: String(s?.whatsapp ?? '')
        .replace(/\D/g, '')
        .slice(0, 12),
    }))
    .filter((s) => s.name)
    .slice(0, MAX_SELLERS)
}

/** Todos los vendedores que aparecen en un pedido o en la configuración, sin repetir. */
export function collectSellerNames(sellers, orders) {
  const names = new Set()
  for (const s of sellers || []) if (s?.name) names.add(s.name)
  for (const o of orders || []) if (o?.sellerName) names.add(o.sellerName)
  return [...names].sort((a, b) => a.localeCompare(b, 'es'))
}
