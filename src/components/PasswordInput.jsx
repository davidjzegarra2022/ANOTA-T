import { useEffect, useRef, useState } from 'react'

function IconEye({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function IconEyeOff({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10.6 5.1A10.4 10.4 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-2.3 3.2M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18" />
    </svg>
  )
}

const SAVE_TIP_MS = 10_000

/**
 * Campo de contraseña con "ojito" para mostrarla u ocultarla.
 *
 * Con `saveTip`, al enfocar el campo por primera vez aparece un recordatorio
 * para guardar la contraseña, que se va solo a los 10 segundos. Se usa en el
 * login, el registro y la pantalla de nueva contraseña.
 */
export default function PasswordInput({ saveTip = false, className = 'input-field', onFocus, ...props }) {
  const [visible, setVisible] = useState(false)
  const [tip, setTip] = useState(false)
  const shown = useRef(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  function handleFocus(e) {
    if (saveTip && !shown.current) {
      shown.current = true
      setTip(true)
      timer.current = setTimeout(() => setTip(false), SAVE_TIP_MS)
    }
    onFocus?.(e)
  }

  return (
    <div>
      <div className="relative">
        <input
          {...props}
          type={visible ? 'text' : 'password'}
          onFocus={handleFocus}
          className={`${className} pr-12`}
        />
        <button
          type="button"
          onClick={(e) => {
            // Dentro de un <label>, el navegador reenvía el clic al primer
            // control del label (en el login, "¿Olvidaste tu contraseña?").
            e.preventDefault()
            setVisible((v) => !v)
          }}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          title={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded-lg p-2 text-muted transition hover:bg-surface hover:text-navy"
        >
          {visible ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
        </button>
      </div>
      {tip && (
        <p className="animate-fade-in-up mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-[13px] leading-snug font-semibold text-amber-800">
          Necesito que guardes tu contraseña o tomes una foto. Igual, soporte técnico te ayudará sin ningún problema 😉
        </p>
      )}
    </div>
  )
}
