import { useState } from 'react'
import PasswordInput from './PasswordInput'
import logoIcon from '../assets/logo-icon.png'
import { isPlatformAdmin, signInMerchant, signOutMerchant } from '../utils/supabaseAuth'
import { logActivation } from '../utils/telemetry'
import { IconShield } from './icons'

/**
 * Login del dueño de la plataforma (ruta `/admin`). Ya NO hay usuario ni
 * contraseña fijos en el bundle: es una cuenta real de Supabase Auth cuyo
 * rol de administrador vive en la tabla `platform_admins` de la base de
 * datos. Si la cuenta entra pero no es admin, se cierra la sesión.
 */
export default function AccessGate({ onUnlock }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const res = await signInMerchant(email, password)
    if (!res.ok) {
      setLoading(false)
      return setError(
        /confirm/i.test(res.error) ? 'Confirma tu correo antes de ingresar.' : 'Correo o contraseña incorrectos.',
      )
    }
    const admin = await isPlatformAdmin()
    setLoading(false)
    if (!admin) {
      await signOutMerchant()
      return setError('Esta cuenta no tiene permisos de administrador.')
    }
    logActivation({ type: 'admin' }) // fire-and-forget
    onUnlock()
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
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted sm:text-sm">Ingresa con tu cuenta de ANOTA-T</p>

        <form onSubmit={handleSubmit} noValidate className="mt-4 space-y-3 text-left sm:mt-5">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              setError(null)
            }}
            type="email"
            placeholder="Correo"
            autoFocus
            autoCapitalize="none"
            autoComplete="email"
            spellCheck={false}
            className={`input-field ${error ? 'has-error' : ''}`}
          />
          <PasswordInput
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError(null)
            }}
            placeholder="Contraseña"
            autoComplete="current-password"
            className={`input-field ${error ? 'has-error' : ''}`}
          />
          {error && <p className="text-center text-xs text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>

        <p className="mt-4 text-[11px] leading-relaxed text-muted">
          ¿Olvidaste tu contraseña? Recupérala desde{' '}
          <a href="/forgot-password" className="font-semibold text-brand-dark hover:underline">
            el login de negociantes
          </a>
          .
        </p>
      </div>
    </div>
  )
}
