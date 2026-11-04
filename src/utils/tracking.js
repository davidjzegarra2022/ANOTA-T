// Rastreo público de un pedido: link directo y línea de tiempo del envío.
//
// El link que recibe el cliente por WhatsApp es /rastreo/<CÓDIGO>: abre la
// página de rastreo con el pedido ya consultado, sin tener que copiar y
// pegar el código. La línea de tiempo sale SOLO del estado guardado
// (pending → packed → shipped); no inventa fechas que la base no tiene.

/** Código limpio en mayúsculas ("anota-adk3h5 " → "ANOTA-ADK3H5"). */
export function cleanTrackingCode(value) {
  return String(value || '')
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, '')
    .slice(0, 14)
}

/** Link directo al rastreo de un pedido. */
export function trackingLink(code, origin = typeof window !== 'undefined' ? window.location.origin : 'https://anotat.vercel.app') {
  const base = `${String(origin).replace(/\/+$/, '')}/rastreo`
  const clean = cleanTrackingCode(code)
  return clean ? `${base}/${clean}` : base
}

/** Código que viene en la URL: /rastreo/ANOTA-X, /rastreo?codigo=ANOTA-X o #rastreo?c=ANOTA-X. */
export function codeFromLocation(pathname = '', search = '', hash = '') {
  const fromPath = String(pathname).match(/^\/rastreo\/([^/?#]+)/i)
  if (fromPath) return cleanTrackingCode(decodeURIComponent(fromPath[1]))
  const params = new URLSearchParams(search || '')
  const fromQuery = params.get('codigo') || params.get('c')
  if (fromQuery) return cleanTrackingCode(fromQuery)
  const hashQuery = String(hash).split('?')[1]
  if (hashQuery) return cleanTrackingCode(new URLSearchParams(hashQuery).get('c') || new URLSearchParams(hashQuery).get('codigo'))
  return ''
}

function titleCase(text) {
  return String(text || '').replace(/\b\p{L}/gu, (c) => c.toLocaleUpperCase('es'))
}

const STEP_INDEX = { pending: 1, packed: 2, shipped: 3 }

/**
 * Pasos del envío según cómo lo recibe el cliente. Cada paso:
 * { id, title, text, state: 'done' | 'current' | 'todo' }.
 */
export function trackingSteps(order) {
  const method = order?.deliveryMethod
  const courier = titleCase(order?.courier)
  // Cada paso dice algo distinto según si ya pasó, si es el que sigue o si
  // falta: un pedido empacado NO debe leer "va camino" todavía.
  const sent =
    method === 'agency'
      ? {
          id: 'shipped',
          title: courier ? `Envío con ${courier}` : 'Envío a tu agencia',
          doneTitle: courier ? `Enviado por ${courier}` : 'Enviado',
          text: 'Saldrá hacia la agencia que elegiste.',
          doneText: 'Tu paquete va camino a la agencia que elegiste.',
        }
      : method === 'home'
        ? { id: 'shipped', title: 'Salida a reparto', doneTitle: 'En camino', text: 'Saldrá hacia tu dirección.', doneText: 'Tu pedido salió hacia tu dirección.' }
        : { id: 'shipped', title: 'Listo para recoger', doneTitle: 'Listo para recoger', text: 'Te avisarán cuando esté listo en tienda.', doneText: 'Tu pedido ya te espera en tienda.' }
  const last =
    method === 'agency'
      ? { id: 'pickup', title: 'Recógelo en tu agencia', text: courier ? `Cuando ${courier} te avise que llegó, recógelo con tu DNI.` : 'Cuando llegue, recógelo con tu DNI.' }
      : method === 'home'
        ? { id: 'deliver', title: 'Entrega en tu dirección', text: 'El repartidor te contactará para entregártelo.' }
        : { id: 'pickup', title: 'Recógelo en tienda', text: 'Pasa por la tienda con tu código de pedido.' }
  const steps = [
    { id: 'registered', title: 'Pedido registrado', text: 'La tienda recibió tus datos de envío.' },
    { id: 'packing', title: 'Preparando tu pedido', doneTitle: 'Pedido empacado', text: 'Están alistando y empacando tus productos.', doneText: 'Tus productos ya están empacados.' },
    sent,
    last,
  ]
  // Hasta qué paso confirma el estado. Mientras está pendiente, «preparando»
  // es lo que pasa AHORA; en los demás, el paso que sigue es lo SIGUIENTE.
  const done = STEP_INDEX[order?.status] ?? 1
  return steps.map((s, i) => {
    const state = i < done ? 'done' : i === done ? 'current' : 'todo'
    return {
      id: s.id,
      state,
      badge: state === 'current' ? (s.id === 'packing' ? 'Ahora' : 'Siguiente') : '',
      title: state === 'done' && s.doneTitle ? s.doneTitle : s.title,
      text: state === 'done' && s.doneText ? s.doneText : s.text,
    }
  })
}

/** Frase principal, en tono tranquilo, según el estado. */
export function trackingHeadline(order) {
  const shop = order?.businessName || 'La tienda'
  switch (order?.status) {
    case 'packed':
      return { tone: 'ok', title: 'Tu pedido ya está empacado', text: `${shop} lo tiene listo para despachar. Pronto saldrá.` }
    case 'shipped':
      return order.deliveryMethod === 'agency'
        ? { tone: 'ok', title: '¡Tu pedido ya fue enviado!', text: `Va camino a tu agencia. Recógelo con tu DNI cuando te avisen.` }
        : order.deliveryMethod === 'home'
          ? { tone: 'ok', title: '¡Tu pedido va en camino!', text: 'Pronto llegará a tu dirección.' }
          : { tone: 'ok', title: '¡Tu pedido está listo!', text: 'Ya puedes recogerlo en tienda.' }
    case 'cancelled':
      return { tone: 'bad', title: 'Este pedido fue cancelado', text: `Si crees que es un error, escribe a ${shop} por WhatsApp.` }
    default:
      return { tone: 'ok', title: '¡Recibimos tu pedido!', text: `${shop} ya tiene tus datos y lo está preparando. Te avisarán por WhatsApp.` }
  }
}
