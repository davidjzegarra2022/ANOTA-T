import { useState } from 'react'
import { sendPasswordReset } from '../../utils/supabaseAuth'
import { IconBox, IconCheck } from '../icons'

export default function ForgotPasswordScreen({ onGoToLogin }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const res = await sendPasswordReset(email)
    setLoading(false)
    if (!res.ok) return setError(res.error)
    setSent(true)
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl animate-fade-in-up sm:p-7">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-300 ring-1 ring-amber-400/30">
          <IconBox className="h-5 w-5" />
        </span>
        <p className="text-lg font-bold text-white">ANOTA-T</p>
      </div>

      {sent ? (
        <>
          <div className="mx-auto mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/30">
            <IconCheck className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-lg font-bold text-white">Revisa tu correo</h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-400">
            Si <b className="text-gray-200">{email}</b> tiene una cuenta, te llegó un link para elegir una nueva
            contraseña.
          </p>
        </>
      ) : (
        <>
          <h1 className="mt-5 text-2xl font-bold text-white">Recupera tu contraseña</h1>
          <p className="mt-1 text-sm text-gray-400">Te mandamos un link a tu correo para elegir una nueva.</p>

          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-gray-200">Correo</span>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@negocio.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-[15px] text-white placeholder:text-gray-500 focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
              />
            </label>

            {error && <p className="text-sm font-semibold text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3 text-[15px] font-bold text-white shadow-[0_8px_30px_-8px_rgba(249,115,22,0.6)] transition hover:from-amber-400 hover:to-orange-500 active:scale-[0.99] disabled:opacity-60"
            >
              {loading ? 'Enviando…' : 'Enviar link'}
            </button>
          </form>
        </>
      )}

      <button
        type="button"
        onClick={onGoToLogin}
        className="mt-5 w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-bold text-gray-200 transition hover:bg-white/10"
      >
        Volver al login
      </button>
    </div>
  )
}
