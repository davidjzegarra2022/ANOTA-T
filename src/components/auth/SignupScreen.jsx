import { useState } from 'react'
import { signUpMerchant } from '../../utils/supabaseAuth'
import { IconBox, IconCheck } from '../icons'

export default function SignupScreen({ onGoToLogin }) {
  const [businessName, setBusinessName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    if (!businessName.trim()) return setError('Ingresa el nombre de tu tienda.')
    if (whatsapp.replace(/\D/g, '').length < 9) return setError('Ingresa un WhatsApp válido (mínimo 9 dígitos).')
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.')

    setLoading(true)
    const res = await signUpMerchant({ email, password, businessName, whatsappNumber: whatsapp })
    setLoading(false)
    if (!res.ok) return setError(res.error)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-center shadow-2xl shadow-black/50 backdrop-blur-xl animate-fade-in-up sm:p-7">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-400/30">
          <IconCheck className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-lg font-bold text-white">Revisa tu correo</h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          Te enviamos un link de confirmación a <b className="text-gray-200">{email}</b>. Ábrelo para activar tu
          cuenta y poder ingresar.
        </p>
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

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl animate-fade-in-up sm:p-7">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-300 ring-1 ring-amber-400/30">
          <IconBox className="h-5 w-5" />
        </span>
        <p className="text-lg font-bold text-white">ANOTA-T</p>
      </div>

      <h1 className="mt-5 text-2xl font-bold text-white">Crea tu cuenta gratis</h1>
      <p className="mt-1 text-sm text-gray-400">En 1 minuto tienes tu link de envíos listo para compartir.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-gray-200">Nombre de tu tienda</span>
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Ferretería Telco"
            autoFocus
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-[15px] text-white placeholder:text-gray-500 focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-gray-200">WhatsApp de tu tienda</span>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 focus-within:border-amber-400/70 focus-within:ring-2 focus-within:ring-amber-400/20">
            <span className="font-semibold text-gray-500">+51</span>
            <input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, '').slice(0, 9))}
              placeholder="987654321"
              inputMode="numeric"
              className="min-w-0 flex-1 bg-transparent text-[15px] text-white placeholder:text-gray-500 focus:outline-none"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">Es al que te llegarán los pedidos de tus clientes.</p>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-gray-200">Correo</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@negocio.com"
            autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-[15px] text-white placeholder:text-gray-500 focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-gray-200">Contraseña</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            placeholder="Mínimo 6 caracteres"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-[15px] text-white placeholder:text-gray-500 focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
          />
        </label>

        {error && <p className="text-sm font-semibold text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3 text-[15px] font-bold text-white shadow-[0_8px_30px_-8px_rgba(249,115,22,0.6)] transition hover:from-amber-400 hover:to-orange-500 active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-400">
        ¿Ya tienes cuenta?{' '}
        <button type="button" onClick={onGoToLogin} className="font-semibold text-amber-300 hover:underline">
          Ingresa
        </button>
      </p>
    </div>
  )
}
