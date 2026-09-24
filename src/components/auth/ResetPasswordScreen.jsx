import { useState } from 'react'
import PasswordInput from '../PasswordInput'
import logoIcon from '../../assets/logo-icon.png'
import { checkNewPassword, MIN_PASSWORD_LENGTH } from '../../utils/passwordSecurity'
import { updateMerchantPassword } from '../../utils/supabaseAuth'

/** Se muestra cuando Supabase Auth entrega el evento PASSWORD_RECOVERY (el
 * usuario vino del link de "¿Olvidaste tu contraseña?"). */
export default function ResetPasswordScreen({ onDone }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const check = await checkNewPassword(password)
    if (!check.ok) {
      setLoading(false)
      return setError(check.error)
    }
    const res = await updateMerchantPassword(password)
    setLoading(false)
    if (!res.ok) return setError(res.error)
    onDone()
  }

  return (
    <div className="card w-full max-w-md p-6 sm:p-7">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white to-[#e6eef7] shadow-md">
          <img src={logoIcon} alt="" className="h-5.5 w-5.5" />
        </span>
        <p className="text-lg font-bold text-navy">ANOTA-T</p>
      </div>

      <h1 className="mt-5 text-2xl font-bold text-navy">Elige tu nueva contraseña</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <PasswordInput
          saveTip
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={`Mínimo ${MIN_PASSWORD_LENGTH} caracteres`}
          autoComplete="new-password"
        />
        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? 'Guardando…' : 'Guardar contraseña'}
        </button>
      </form>
    </div>
  )
}
