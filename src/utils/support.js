// Soporte de ANOTA-T por WhatsApp. Los botones de renovar, cambiar o
// activar un plan (no hay pasarela de pago: el plan lo asigna el
// administrador) abren un chat con un mensaje ya escrito según el caso,
// para que el negociante solo tenga que presionar "Enviar".
export const SUPPORT_WHATSAPP = '51970804662'

function storeLine(merchant) {
  if (!merchant) return null
  const link = merchant.slug && typeof window !== 'undefined' ? ` (${window.location.origin}/f/${merchant.slug})` : ''
  return `🏪 Mi tienda: *${merchant.businessName || 'sin nombre'}*${link}`
}

const MESSAGES = {
  renew: ({ merchant }) => [
    'Hola equipo ANOTA-T 👋',
    'Necesito apoyo para *renovar mi plan*: mi suscripción venció y mi formulario está en pausa.',
    storeLine(merchant),
    '¿Me indican cómo realizar el pago para reactivarlo? ¡Gracias!',
  ],
  upgrade: ({ merchant, daysLeft }) => [
    'Hola equipo ANOTA-T 👋',
    `Quiero *pasar a un plan pagado* antes de que termine mi prueba gratuita${daysLeft ? ` (me quedan ${daysLeft} día${daysLeft === 1 ? '' : 's'})` : ''}.`,
    storeLine(merchant),
    '¿Me ayudan con las opciones y el pago? ¡Gracias!',
  ],
  changePlan: ({ merchant, planName }) => [
    'Hola equipo ANOTA-T 👋',
    `Necesito apoyo para *cambiarme al plan ${planName}*.`,
    storeLine(merchant),
    '¿Me indican los pasos para activarlo? ¡Gracias!',
  ],
  activate: ({ merchant }) => [
    'Hola equipo ANOTA-T 👋',
    'Todavía *no tengo un plan asignado* y necesito apoyo para activar uno.',
    storeLine(merchant),
    '¡Gracias!',
  ],
  reactivate: ({ email }) => [
    'Hola equipo ANOTA-T 👋',
    'Mi cuenta aparece *desactivada* y necesito apoyo para reactivarla.',
    email ? `📧 Correo de mi cuenta: ${email}` : null,
    '¡Gracias!',
  ],
  interested: ({ planName }) => [
    'Hola equipo ANOTA-T 👋',
    `Me interesa el *plan ${planName}* para mi negocio.`,
    '¿Me cuentan cómo empezar? ¡Gracias!',
  ],
  improve: ({ merchant, planName }) => [
    'Hola equipo ANOTA-T 👋',
    `Quiero *mejorar mi plan*${planName ? ` (hoy tengo ${planName})` : ''} para recibir más pedidos.`,
    storeLine(merchant),
    '¿Qué opciones tengo? ¡Gracias!',
  ],
  info: () => [
    'Hola equipo ANOTA-T 👋',
    'Vengo desde su página web y necesito apoyo: quiero saber más sobre ANOTA-T para mi negocio.',
  ],
  webSystem: () => [
    'Hola equipo ANOTA-T 👋',
    'Vi su sistema de formularios de envío y me gustaría un *sistema web para mi empresa*.',
    '¿Me pueden dar más información? ¡Gracias!',
  ],
  help: ({ merchant }) => ['Hola equipo ANOTA-T 👋', 'Necesito apoyo con mi cuenta.', storeLine(merchant)],
}

/** Link de WhatsApp a soporte con el mensaje del caso (`renew`, `upgrade`, `changePlan`, …). */
export function supportWhatsAppUrl(topic, context = {}) {
  const lines = (MESSAGES[topic] || MESSAGES.help)(context).filter(Boolean)
  return `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`
}
