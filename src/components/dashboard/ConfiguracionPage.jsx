import { useState } from 'react'
import { getKnownCouriers } from '../../data/agencies'
import { updateMyMerchant, uploadMerchantLogo } from '../../utils/merchantProfile'
import { IconCheck } from '../icons'

const WEEKDAYS = [
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sábado' },
  { value: 0, label: 'Domingo' },
]

const CURRENCIES = [
  { value: 'PEN', label: 'Sol peruano (PEN)' },
  { value: 'USD', label: 'Dólar (USD)' },
]

const TIMEZONES = [
  { value: 'America/Lima', label: 'Perú (Lima)' },
  { value: 'America/Bogota', label: 'Colombia (Bogotá)' },
  { value: 'America/Mexico_City', label: 'México (CDMX)' },
]

function Checkbox({ checked, onChange, label }) {
  return (
    <label className="inline-flex items-center gap-1.5 text-sm text-gray-200">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-white/20 bg-white/5 accent-amber-500"
      />
      {label}
    </label>
  )
}

export default function ConfiguracionPage({ merchant, onSaved }) {
  const couriers = getKnownCouriers()
  const [form, setForm] = useState({
    businessName: merchant.businessName,
    whatsapp: merchant.whatsappNumber.replace(/^51/, ''),
    currency: merchant.currency,
    timezone: merchant.timezone,
    slug: merchant.slug,
    logoUrl: merchant.logoUrl,
    couriersActive: merchant.couriersActive,
    dispatchDays: merchant.dispatchDays,
    cutoffHour: merchant.cutoffHour,
    leadTimeHours: merchant.leadTimeHours,
  })
  const [logoFile, setLogoFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState(null)

  const allCouriersSelected = form.couriersActive.length === 0

  function toggleCourier(id) {
    setForm((f) => {
      const base = allCouriersSelected ? couriers.map((c) => c.id) : f.couriersActive
      const active = base.includes(id) ? base.filter((c) => c !== id) : [...base, id]
      return { ...f, couriersActive: active }
    })
  }

  function toggleDay(value) {
    setForm((f) => ({
      ...f,
      dispatchDays: f.dispatchDays.includes(value) ? f.dispatchDays.filter((d) => d !== value) : [...f.dispatchDays, value],
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMsg(null)
    if (form.whatsapp.replace(/\D/g, '').length < 9) {
      setMsg({ ok: false, text: 'El WhatsApp de tu tienda debe tener al menos 9 dígitos.' })
      return
    }
    setSaving(true)

    let logoUrl = form.logoUrl
    if (logoFile) {
      const up = await uploadMerchantLogo(logoFile)
      if (!up.ok) {
        setSaving(false)
        setMsg({ ok: false, text: up.error })
        return
      }
      logoUrl = up.url
    }

    const res = await updateMyMerchant({
      businessName: form.businessName,
      whatsappNumber: '51' + form.whatsapp.replace(/\D/g, ''),
      currency: form.currency,
      timezone: form.timezone,
      slug: form.slug,
      logoUrl,
      couriersActive: form.couriersActive,
      dispatchDays: form.dispatchDays,
      cutoffHour: form.cutoffHour,
      leadTimeHours: form.leadTimeHours,
    })
    setSaving(false)
    if (!res.ok) {
      const friendly = /duplicate key/i.test(res.error) ? 'Ese link ya lo usa otra tienda, elige otro.' : res.error
      setMsg({ ok: false, text: friendly })
      return
    }
    setMsg({ ok: true, text: 'Cambios guardados.' })
    onSaved?.()
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Configuración</h1>
        <p className="mt-1 text-sm text-gray-400">Tu logística y tu marca. Esto es lo que va a ver tu cliente cuando entre a tu link.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <p className="text-sm font-bold text-white">Logística</p>

          <div className="mt-3">
            <span className="mb-1.5 block text-xs font-semibold text-gray-400 uppercase">Couriers activos</span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {couriers.map((c) => (
                <Checkbox
                  key={c.id}
                  label={c.label}
                  checked={allCouriersSelected || form.couriersActive.includes(c.id)}
                  onChange={() => toggleCourier(c.id)}
                />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <span className="mb-1.5 block text-xs font-semibold text-gray-400 uppercase">Días de despacho</span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {WEEKDAYS.map((d) => (
                <Checkbox key={d.value} label={d.label} checked={form.dispatchDays.includes(d.value)} onChange={() => toggleDay(d.value)} />
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-gray-400 uppercase">Hora de corte</span>
              <input
                type="time"
                value={`${String(form.cutoffHour).padStart(2, '0')}:00`}
                onChange={(e) => setForm((f) => ({ ...f, cutoffHour: Number(e.target.value.split(':')[0]) }))}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-amber-400/70 focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-gray-400 uppercase">Anticipación (horas)</span>
              <input
                type="number"
                min={0}
                max={72}
                value={form.leadTimeHours}
                onChange={(e) => setForm((f) => ({ ...f, leadTimeHours: Number(e.target.value) || 0 }))}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-amber-400/70 focus:outline-none"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
          <p className="text-sm font-bold text-white">Marca</p>

          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-semibold text-gray-400 uppercase">Nombre de tu tienda</span>
            <input
              value={form.businessName}
              onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-amber-400/70 focus:outline-none"
            />
          </label>

          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-semibold text-gray-400 uppercase">WhatsApp de tu tienda</span>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 focus-within:border-amber-400/70">
              <span className="font-semibold text-gray-500">+51</span>
              <input
                value={form.whatsapp}
                onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value.replace(/\D/g, '').slice(0, 9) }))}
                inputMode="numeric"
                className="min-w-0 flex-1 bg-transparent text-sm text-white focus:outline-none"
              />
            </div>
          </label>

          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-semibold text-gray-400 uppercase">Moneda en la que ves tus precios</span>
            <select
              value={form.currency}
              onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-amber-400/70 focus:outline-none"
            >
              {CURRENCIES.map((c) => (
                <option key={c.value} value={c.value} className="bg-gray-900">
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-semibold text-gray-400 uppercase">Zona horaria</span>
            <select
              value={form.timezone}
              onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-amber-400/70 focus:outline-none"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value} className="bg-gray-900">
                  {tz.label}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-3">
            <span className="mb-1 block text-xs font-semibold text-gray-400 uppercase">Logo (PNG, JPG o WEBP, máx. 2MB)</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
              className="block text-xs text-gray-400 file:mr-3 file:rounded-lg file:border file:border-white/10 file:bg-white/10 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-gray-200"
            />
          </div>

          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-semibold text-gray-400 uppercase">Tu link</span>
            <div className="flex items-center rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
              <span className="shrink-0 text-gray-500">{window.location.origin}/f/</span>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent text-white focus:outline-none"
              />
            </div>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-bold text-white transition hover:from-amber-400 hover:to-orange-500 disabled:opacity-60"
          >
            <IconCheck className="h-4 w-4" /> {saving ? 'Guardando…' : 'Guardar cambios'}
          </button>
          {msg && <span className={`text-sm font-semibold ${msg.ok ? 'text-emerald-400' : 'text-red-400'}`}>{msg.text}</span>}
        </div>
      </form>
    </div>
  )
}
