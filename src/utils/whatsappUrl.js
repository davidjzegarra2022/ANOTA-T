/**
 * Link para abrir WhatsApp con el mensaje escrito.
 *
 * Vive en su propio archivo (sin importar la base de agencias) para que los
 * botones de soporte no arrastren ~400 kB de datos de agencias al bundle
 * inicial: solo lo usan para armar una URL.
 *
 * Va directo a api.whatsapp.com/send y NO a wa.me: la redirección de wa.me
 * cambia cada emoji por "�" (lo comprobamos: 📦 llega como %EF%BF%BD), y el
 * resumen del pedido salía lleno de signos raros. Sin número, WhatsApp deja
 * elegir el contacto o grupo.
 */
export function buildWhatsAppUrl(phoneWithCountryCode, message) {
  const digits = String(phoneWithCountryCode || '').replace(/\D/g, '')
  const params = []
  if (digits) params.push(`phone=${digits}`)
  if (message) params.push(`text=${encodeURIComponent(message)}`)
  return `https://api.whatsapp.com/send${params.length ? `?${params.join('&')}` : ''}`
}
