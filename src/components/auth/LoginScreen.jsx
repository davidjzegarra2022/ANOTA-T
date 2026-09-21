import { useState } from 'react'
import logoIcon from '../../assets/logo-icon.png'
import { signInMerchant } from '../../utils/supabaseAuth'
import { logActivation } from '../../utils/telemetry'

export default function LoginScreen({ onLoggedIn, onGoToSignup, onGoToForgotPassword }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const res = await signInMerchant(email, password)
    setLoading(false)
    if (res.ok) {
      logActivation({ type: 'merchant', serial: email.trim().toLowerCase() }) // fire-and-forget
      onLoggedIn()
    } else {
      setError(/confirm/i.test(res.error) ? 'Confirma tu correo antes de ingresar (revisa tu bandeja).' : 'Correo o contraseña incorrectos.')
    }
  }

  return (
    <div className="card w-full max-w-md p-6 sm:p-7">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white to-[#e6eef7] shadow-md">
          <img src={logoIcon} alt="" className="h-5.5 w-5.5" />
        </span>
        <p className="text-lg font-bold text-navy">ANOTA-T</p>
      </div>

      <h1 className="mt-5 text-2xl font-bold text-navy">Ingresa a tu cuenta</h1>
      <p className="mt-1 text-sm text-muted">Gestiona tus envíos y tu panel de negociante.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">Correo</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@negocio.com"
            autoComplete="email"
            autoFocus
            className="input-field"
          />
        </label>

        <label className="block">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-sm font-semibold text-ink">Contraseña</span>
            <button type="button" onClick={onGoToForgotPassword} className="text-xs font-semibold text-brand-dark hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="input-field"
          />
        </label>

        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        ¿No tienes cuenta?{' '}
        <button type="button" onClick={onGoToSignup} className="font-semibold text-brand-dark hover:underline">
          Crea una gratis
        </button>
      </p>
    </div>
  )
}
