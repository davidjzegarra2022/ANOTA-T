import { useState } from 'react'
import logoIcon from '../../assets/logo-icon.png'
import { checkEmailDomain } from '../../utils/emailDomains'
import { signUpMerchant } from '../../utils/supabaseAuth'
import { IconCheck } from '../icons'

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
    const domainCheck = await checkEmailDomain(email)
    if (!domainCheck.ok) {
      setLoading(false)
      return setError(domainCheck.error)
    }
    const res = await signUpMerchant({ email, password, businessName, whatsappNumber: whatsapp })
    setLoading(false)
    if (!res.ok) return setError(res.error)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="card w-full max-w-md p-6 text-center sm:p-7">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
          <IconCheck className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-lg font-bold text-navy">Revisa tu correo</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Te enviamos un link de confirmación a <b className="text-ink">{email}</b>. Ábrelo para activar tu cuenta
          y poder ingresar.
        </p>
        <button type="button" onClick={onGoToLogin} className="btn btn-outline mt-5 w-full">
          Volver al login
        </button>
      </div>
    )
  }

  return (
    <div className="card w-full max-w-md p-6 sm:p-7">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white to-[#e6eef7] shadow-md">
          <img src={logoIcon} alt="" className="h-5.5 w-5.5" />
        </span>
        <p className="text-lg font-bold text-navy">ANOTA-T</p>
      </div>

      <h1 className="mt-5 text-2xl font-bold text-navy">Crea tu cuenta gratis</h1>
      <p className="mt-1 text-sm text-muted">En 1 minuto tienes tu link de envíos listo para compartir.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">Nombre de tu tienda</span>
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Ferretería Telco"
            autoFocus
            className="input-field"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">WhatsApp de tu tienda</span>
          <div className="input-field flex items-center gap-2">
            <span className="font-semibold text-muted">+51</span>
            <input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, '').slice(0, 9))}
              placeholder="987654321"
              inputMode="numeric"
              className="min-w-0 flex-1 bg-transparent focus:outline-none"
            />
          </div>
          <p className="mt-1 text-xs text-muted">Es al que te llegarán los pedidos de tus clientes.</p>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">Correo</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@negocio.com"
            autoComplete="email"
            className="input-field"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-ink">Contraseña</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            placeholder="Mínimo 6 caracteres"
            className="input-field"
          />
        </label>

        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? 'Creando cuenta…' : 'Crear cuenta'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-muted">
        ¿Ya tienes cuenta?{' '}
        <button type="button" onClick={onGoToLogin} className="font-semibold text-brand-dark hover:underline">
          Ingresa
        </button>
      </p>
    </div>
  )
}
