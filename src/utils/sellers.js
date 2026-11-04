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

/** WhatsApp (9 dígitos) del vendedor con ese nombre dentro de la lista, o '' si no hay. */
export function findSellerWhatsApp(sellers, name) {
  const wanted = cleanSellerName(name).toLowerCase()
  if (!wanted) return ''
  const found = (sellers || []).find((s) => cleanSellerName(s?.name).toLowerCase() === wanted)
  return String(found?.whatsapp ?? '').replace(/\D/g, '')
}

/** Número con código de país (51) para wa.me; '' si el vendedor no tiene número. */
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
// sql/2026-11-03-vendedores.sql), la lista se guarda en este dispositivo para
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
 * SQL para activar los vendedores en Supabase (el mismo de
 * sql/2026-11-03-vendedores.sql). Se muestra con botón "copiar" en
 * Configuración cuando la base todavía no tiene las columnas.
 */
export const SELLERS_SQL = `alter table public.merchants
  add column if not exists sellers jsonb not null default '[]'::jsonb;

alter table public.orders
  add column if not exists seller_name text;

create or replace function public.set_order_seller(p_code text, p_seller text)
returns void language plpgsql security definer set search_path = public as $$
begin
  update public.orders
     set seller_name = left(regexp_replace(coalesce(p_seller, ''), '[[:cntrl:]]', '', 'g'), 60)
   where tracking_code = upper(trim(p_code))
     and seller_name is null
     and created_at > now() - interval '10 minutes';
end; $$;
grant execute on function public.set_order_seller(text, text) to anon, authenticated;

-- El formulario público necesita el WhatsApp del vendedor para devolverle el
-- resumen del pedido. Solo devuelve el número del vendedor cuyo nombre llega
-- en el link (?v=...), nunca la lista completa.
create or replace function public.get_seller_contact(p_slug text, p_name text)
returns text language sql stable security definer set search_path = public as $$
  select s->>'whatsapp'
    from public.merchants m, jsonb_array_elements(m.sellers) s
   where m.slug = lower(trim(p_slug))
     and lower(trim(s->>'name')) = lower(trim(p_name))
   limit 1;
$$;
revoke all on function public.get_seller_contact(text, text) from public;
grant execute on function public.get_seller_contact(text, text) to anon, authenticated;
`

