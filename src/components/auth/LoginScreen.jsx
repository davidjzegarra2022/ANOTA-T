import { useState } from 'react'
import { signInMerchant } from '../../utils/supabaseAuth'
import { logActivation } from '../../utils/telemetry'
import { IconBox } from '../icons'

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
    }
    else setError(/confirm/i.test(res.error) ? 'Confirma tu correo antes de ingresar (revisa tu bandeja).' : 'Correo o contraseña incorrectos.')
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl animate-fade-in-up sm:p-7">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-300 ring-1 ring-amber-400/30">
          <IconBox className="h-5 w-5" />
        </span>
        <p className="text-lg font-bold text-white">ANOTA-T</p>
      </div>

      <h1 className="mt-5 text-2xl font-bold text-white">Ingresa a tu cuenta</h1>
      <p className="mt-1 text-sm text-gray-400">Gestiona tus envíos y tu panel de negociante.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-gray-200">Correo</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@negocio.com"
            autoComplete="email"
            autoFocus
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-[15px] text-white placeholder:text-gray-500 focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
          />
        </label>

        <label className="block">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-200">Contraseña</span>
            <button type="button" onClick={onGoToForgotPassword} className="text-xs font-semibold text-amber-300 hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-[15px] text-white focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
          />
        </label>

        {error && <p className="text-sm font-semibold text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3 text-[15px] font-bold text-white shadow-[0_8px_30px_-8px_rgba(249,115,22,0.6)] transition hover:from-amber-400 hover:to-orange-500 active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-400">
        ¿No tienes cuenta?{' '}
        <button type="button" onClick={onGoToSignup} className="font-semibold text-amber-300 hover:underline">
          Crea una gratis
        </button>
      </p>
    </div>
  )
}
