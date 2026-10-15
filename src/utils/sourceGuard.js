// Disuasión contra curiosos en producción: bloquea el clic derecho y los
// atajos para ver/guardar el código (F12, Ctrl+U, Ctrl+Shift+I/J/C, Ctrl+S…).
//
// OJO: ningún sitio web puede ocultar del todo su código (el navegador lo
// necesita para mostrar la página). Esto solo lo dificulta. La seguridad
// real de ANOTA-T está en el servidor (RLS de Supabase, validaciones,
// CSP), no en esconder el código.

// El clic derecho sigue funcionando en campos de texto para que los
// clientes puedan pegar sus datos (WhatsApp, DNI, dirección…).
function isEditable(el) {
  return Boolean(el?.closest?.('input, textarea, select, [contenteditable="true"]'))
}

function blockedCombo(e) {
  const key = String(e.key || '').toLowerCase()
  const mod = e.ctrlKey || e.metaKey
  if (key === 'f12') return true
  if (mod && key === 'u') return true // ver código fuente
  if (mod && key === 's') return true // guardar página
  if (mod && e.shiftKey && ['i', 'j', 'c', 'k'].includes(key)) return true // herramientas de desarrollo
  if (e.metaKey && e.altKey && ['i', 'j', 'c', 'u'].includes(key)) return true // Mac
  return false
}

export function installSourceGuard() {
  document.addEventListener(
    'contextmenu',
    (e) => {
      if (!isEditable(e.target)) e.preventDefault()
    },
    { capture: true },
  )
  document.addEventListener(
    'keydown',
    (e) => {
      if (blockedCombo(e)) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    { capture: true },
  )
  // Evita arrastrar imágenes (logo) al escritorio.
  document.addEventListener('dragstart', (e) => {
    if (e.target?.tagName === 'IMG') e.preventDefault()
  })
}
