import { useState } from 'react'
import logoIcon from '../../assets/logo-icon.png'
import { sendPasswordReset } from '../../utils/supabaseAuth'
import { IconCheck } from '../icons'

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
    <div className="card w-full max-w-md p-6 sm:p-7">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white to-[#e6eef7] shadow-md">
          <img src={logoIcon} alt="" className="h-5.5 w-5.5" />
        </span>
        <p className="text-lg font-bold text-navy">ANOTA-T</p>
      </div>

      {sent ? (
        <>
          <div className="mx-auto mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
            <IconCheck className="h-6 w-6" />
          </div>
          <h1 className="mt-4 text-lg font-bold text-navy">Revisa tu correo</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Si <b className="text-ink">{email}</b> tiene una cuenta, te llegó un link para elegir una nueva
            contraseña.
          </p>
        </>
      ) : (
        <>
          <h1 className="mt-5 text-2xl font-bold text-navy">Recupera tu contraseña</h1>
          <p className="mt-1 text-sm text-muted">Te mandamos un link a tu correo para elegir una nueva.</p>

          <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-ink">Correo</span>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@negocio.com"
                className="input-field"
              />
            </label>

            {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

            <button type="submit" disabled={loading} className="btn btn-primary w-full">
              {loading ? 'Enviando…' : 'Enviar link'}
            </button>
          </form>
        </>
      )}

      <button type="button" onClick={onGoToLogin} className="btn btn-outline mt-5 w-full">
        Volver al login
      </button>
    </div>
  )
}
