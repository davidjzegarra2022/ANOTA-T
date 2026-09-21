import { useState } from 'react'
import logoIcon from '../assets/logo-icon.png'
import { isValidAdmin } from '../utils/serial'
import { logActivation } from '../utils/telemetry'
import { IconShield } from './icons'

/**
 * Login del dueño de la plataforma (ruta `/admin`). Los negociantes ya NO
 * usan esto — tienen cuentas reales de Supabase Auth (ver
 * components/auth/AuthGate.jsx), por eso este componente ya no necesita un
 * `mode`.
 */
export default function AccessGate({ onUnlock }) {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (isValidAdmin(user, password)) {
      logActivation({ type: 'admin' }) // fire-and-forget
      onUnlock()
    } else {
      setError(true)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-surface px-5 py-10">
      <div className="card w-full max-w-sm p-6 text-center sm:p-7">
        <div className="mx-auto flex items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white to-[#e6eef7] shadow-md">
            <img src={logoIcon} alt="" className="h-6 w-6" />
          </span>
        </div>
        <div className="mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-brand-dark ring-1 ring-brand/40">
          <IconShield className="h-6 w-6" />
        </div>
        <h1 className="mt-3 text-base font-bold text-navy sm:text-lg">Acceso administrador</h1>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted sm:text-sm">Ingresa tus credenciales</p>

        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3 text-left sm:mt-5">
          <input
            value={user}
            onChange={(e) => {
              setUser(e.target.value)
              setError(false)
            }}
            placeholder="Usuario"
            autoFocus
            autoCapitalize="none"
            autoComplete="username"
            spellCheck={false}
            className={`input-field ${error ? 'has-error' : ''}`}
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(false)
            }}
            type="password"
            placeholder="Contraseña"
            autoComplete="current-password"
            className={`input-field ${error ? 'has-error' : ''}`}
          />
          {error && <p className="text-center text-xs text-red-600">Usuario o contraseña incorrectos.</p>}
          <button type="submit" className="btn btn-primary w-full">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}
