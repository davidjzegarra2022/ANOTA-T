import { useState } from 'react'
import { updateMerchantPassword } from '../../utils/supabaseAuth'
import { IconBox } from '../icons'

/** Se muestra cuando Supabase Auth entrega el evento PASSWORD_RECOVERY (el
 * usuario vino del link de "¿Olvidaste tu contraseña?"). */
export default function ResetPasswordScreen({ onDone }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.')
    setError(null)
    setLoading(true)
    const res = await updateMerchantPassword(password)
    setLoading(false)
    if (!res.ok) return setError(res.error)
    onDone()
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/50 backdrop-blur-xl animate-fade-in-up sm:p-7">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 text-amber-300 ring-1 ring-amber-400/30">
          <IconBox className="h-5 w-5" />
        </span>
        <p className="text-lg font-bold text-white">ANOTA-T</p>
      </div>

      <h1 className="mt-5 text-2xl font-bold text-white">Elige tu nueva contraseña</h1>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 6 caracteres"
          autoComplete="new-password"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-[15px] text-white placeholder:text-gray-500 focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/20 focus:outline-none"
        />
        {error && <p className="text-sm font-semibold text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-3 text-[15px] font-bold text-white shadow-[0_8px_30px_-8px_rgba(249,115,22,0.6)] transition hover:from-amber-400 hover:to-orange-500 active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? 'Guardando…' : 'Guardar contraseña'}
        </button>
      </form>
    </div>
  )
}
