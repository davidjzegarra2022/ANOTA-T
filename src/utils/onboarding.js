// Primeros pasos del negociante: una lista corta con lo que de verdad hace
// falta para empezar a recibir pedidos. Cada paso se marca solo cuando se
// cumple (logo subido, configuración guardada, link compartido, primer
// pedido). Lo que no se puede saber desde la base (guardó la configuración,
// compartió el link, cerró la guía) se recuerda en este navegador.

const EVENT = 'anotat-onboarding'

function key(merchantId) {
  return `anotat-onboarding:${merchantId || 'anon'}`
}

export function loadOnboardingFlags(merchantId) {
  try {
    return JSON.parse(localStorage.getItem(key(merchantId)) || '{}') || {}
  } catch {
    return {}
  }
}

/** Marca un paso como hecho (configSaved, linkShared, dismissed) y avisa a la guía. */
export function markOnboarding(merchantId, flag) {
  try {
    const flags = loadOnboardingFlags(merchantId)
    if (flags[flag]) return
    localStorage.setItem(key(merchantId), JSON.stringify({ ...flags, [flag]: true }))
  } catch {
    // sin localStorage: la guía igual funciona, solo no recuerda el paso
  }
  try {
    window.dispatchEvent(new Event(EVENT))
  } catch {
    // fuera del navegador (tests sin window)
  }
}

export function onOnboardingChange(callback) {
  window.addEventListener(EVENT, callback)
  return () => window.removeEventListener(EVENT, callback)
}

/**
 * Pasos en orden. `action` dice qué hace el botón del paso:
 * { tab } abre esa pestaña del panel; { share: true } muestra copiar/WhatsApp.
 */
export function onboardingSteps({ merchant, proEnabled, hasOrders, flags = {} }) {
  const steps = [
    {
      id: 'config',
      title: 'Configura tus envíos',
      hint: 'Elige tus couriers, días de despacho y hora de cierre. Luego pulsa «Guardar cambios».',
      done: Boolean(flags.configSaved),
      action: { label: 'Ir a Configuración', tab: 'configuracion' },
    },
    {
      id: 'logo',
      title: 'Sube tu logo',
      hint: 'Es lo primero que ven tus clientes al abrir tu link y en la vista previa de WhatsApp.',
      done: Boolean(merchant?.logoUrl),
      action: { label: 'Subir logo', tab: 'configuracion' },
    },
  ]
  if (proEnabled) {
    steps.push({
      id: 'sellers',
      title: 'Agrega a tus vendedores',
      hint: 'Cada vendedor recibe su propio link y los pedidos de sus clientes llegan a SU WhatsApp.',
      done: (merchant?.sellers || []).length > 0,
      action: { label: 'Agregar vendedores', tab: 'configuracion' },
    })
  }
  steps.push(
    {
      id: 'share',
      title: 'Comparte tu link',
      hint: 'Pásalo a tus clientes por WhatsApp o ponlo en tu bio: ahí llenan sus datos de envío.',
      done: Boolean(flags.linkShared),
      action: { label: 'Compartir link', share: true },
    },
    {
      id: 'order',
      title: 'Recibe tu primer pedido',
      hint: 'Aparece solo en Envíos cuando un cliente llena tu formulario.',
      done: Boolean(hasOrders),
      action: null,
    },
  )
  const doneCount = steps.filter((s) => s.done).length
  const current = steps.find((s) => !s.done) || null
  return { steps, doneCount, total: steps.length, current, complete: !current }
}
