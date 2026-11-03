import { useEffect, useMemo, useState } from 'react'
import { getKnownCouriers } from '../../data/agencies'
import { copyText } from '../../utils/clipboard'
import { updateMyMerchant, uploadMerchantLogo } from '../../utils/merchantProfile'
import { MAX_SELLERS, SELLERS_SQL, loadSellerDraft, normalizeSellers, saveSellerDraft, sellerLink, sellerShareText } from '../../utils/sellers'
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
    <label className="inline-flex items-center gap-1.5 text-sm text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-slate-300 bg-white accent-brand"
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
    // Si la base todavía no tiene la columna `sellers`, se arranca con el
    // borrador guardado en este dispositivo: lo escrito nunca se pierde.
    sellers: normalizeSellers(merchant.sellers).length
      ? normalizeSellers(merchant.sellers)
      : loadSellerDraft(merchant.id),
  })
  const [logoFile, setLogoFile] = useState(null)
  const [logoRemoved, setLogoRemoved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState(null)
  const [copiedSeller, setCopiedSeller] = useState(null)
  const [copiedSql, setCopiedSql] = useState(false)

  // Vista previa: el archivo recién elegido (si hay uno), si no el logo ya
  // guardado, a menos que el usuario lo haya quitado manualmente.
  const logoPreviewUrl = useMemo(() => {
    if (logoFile) return URL.createObjectURL(logoFile)
    if (logoRemoved) return null
    return form.logoUrl || null
  }, [logoFile, logoRemoved, form.logoUrl])

  useEffect(() => {
    return () => {
      if (logoFile) URL.revokeObjectURL(logoPreviewUrl)
    }
  }, [logoFile, logoPreviewUrl])

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

  function addSeller() {
    setForm((f) => (f.sellers.length >= MAX_SELLERS ? f : { ...f, sellers: [...f.sellers, { name: '', whatsapp: '' }] }))
  }

  function updateSeller(index, patch) {
    setForm((f) => ({ ...f, sellers: f.sellers.map((s, i) => (i === index ? { ...s, ...patch } : s)) }))
  }

  function removeSeller(index) {
    setForm((f) => ({ ...f, sellers: f.sellers.filter((_, i) => i !== index) }))
  }

  async function copySeller(index) {
    const seller = form.sellers[index]
    await copyText(sellerLink(window.location.origin, form.slug, seller.name))
    setCopiedSeller(index)
    setTimeout(() => setCopiedSeller(null), 2000)
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
    } else if (logoRemoved) {
      logoUrl = null
    }

    const sellers = normalizeSellers(form.sellers)
    // La columna `merchants.sellers` llega con sql/2026-11-03-vendedores.sql.
    // Mientras no exista, la lista se guarda como borrador en este
    // dispositivo: "Guardar cambios" nunca la borra ni falla por su culpa.
    const sellersSupported = merchant.sellersSupported !== false
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
      ...(sellersSupported ? { sellers } : {}),
    })
    setSaving(false)
    if (!res.ok) {
      // Aun si la base falla, el borrador local conserva los vendedores.
      saveSellerDraft(merchant.id, sellers)
      const friendly = /duplicate key/i.test(res.error) ? 'Ese link ya lo usa otra tienda, elige otro.' : res.error
      setMsg({ ok: false, text: friendly })
      return
    }
    saveSellerDraft(merchant.id, sellers)
    setMsg({
      ok: true,
      text:
        res.sellersIgnored || !sellersSupported
          ? 'Cambios guardados. Los vendedores quedan guardados en este dispositivo; se sincronizarán cuando apliques el SQL de vendedores en Supabase.'
          : 'Cambios guardados.',
    })
    setForm((f) => ({ ...f, logoUrl, sellers }))
    setLogoFile(null)
    setLogoRemoved(false)
    onSaved?.()
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-xl font-bold text-navy sm:text-2xl">Configuración</h1>
        <p className="mt-1 text-sm text-muted">Tu logística y tu marca. Esto es lo que va a ver tu cliente cuando entre a tu link.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card p-5">
          <p className="text-sm font-bold text-navy">Logística</p>

          <div className="mt-3">
            <span className="mb-1.5 block text-xs font-semibold text-muted uppercase">Couriers activos</span>
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
            <span className="mb-1.5 block text-xs font-semibold text-muted uppercase">Días de despacho</span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {WEEKDAYS.map((d) => (
                <Checkbox key={d.value} label={d.label} checked={form.dispatchDays.includes(d.value)} onChange={() => toggleDay(d.value)} />
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted uppercase">Hora de cierre</span>
              <input
                type="time"
                value={`${String(form.cutoffHour).padStart(2, '0')}:00`}
                onChange={(e) => setForm((f) => ({ ...f, cutoffHour: Number(e.target.value.split(':')[0]) }))}
                className="input-field"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-muted uppercase">Anticipación (horas)</span>
              <input
                type="number"
                min={0}
                max={72}
                value={form.leadTimeHours}
                onChange={(e) => setForm((f) => ({ ...f, leadTimeHours: Number(e.target.value) || 0 }))}
                className="input-field"
              />
            </label>
          </div>
          <p className="mt-2 text-xs text-muted">
            Antes de las <b className="text-ink">{String(form.cutoffHour).padStart(2, '0')}:00</b> tu cliente puede elegir despacho el mismo día; después, desde el
            siguiente día de despacho (hora de Perú). La anticipación se suma a la hora del pedido.
          </p>
        </div>

        <div className="card p-5">
          <p className="text-sm font-bold text-navy">Marca</p>

          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-semibold text-muted uppercase">Nombre de tu tienda</span>
            <input
              value={form.businessName}
              onChange={(e) => setForm((f) => ({ ...f, businessName: e.target.value }))}
              className="input-field"
            />
          </label>

          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-semibold text-muted uppercase">WhatsApp de tu tienda</span>
            <div className="input-field flex items-center gap-2">
              <span className="font-semibold text-muted">+51</span>
              <input
                value={form.whatsapp}
                onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value.replace(/\D/g, '').slice(0, 9) }))}
                inputMode="numeric"
                className="min-w-0 flex-1 bg-transparent focus:outline-none"
              />
            </div>
          </label>

          <div className="mt-4 rounded-xl border border-slate-200 bg-surface/60 p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-muted uppercase">Vendedores (hasta {MAX_SELLERS})</span>
              <button
                type="button"
                onClick={addSeller}
                disabled={form.sellers.length >= MAX_SELLERS}
                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-navy transition hover:bg-surface disabled:opacity-40"
              >
                + Añadir vendedor
              </button>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-muted">
              Cada vendedor comparte <b>su propio link</b>. Todos los pedidos caen en este mismo panel, marcados con el nombre de quien los trajo.
            </p>

            {merchant.sellersSupported === false && (
              <div className="mt-2 rounded-lg border border-amber-300 bg-amber-50 p-2.5">
                <p className="text-[11px] font-bold text-amber-900">
                  Los vendedores se están guardando en este dispositivo.
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-amber-900/85">
                  Los links ya funcionan, pero para que queden en tu cuenta y cada pedido salga marcado con su vendedor falta activarlos en Supabase
                  (SQL Editor → pegar y ejecutar). Es una sola vez:
                </p>
                <button
                  type="button"
                  onClick={async () => {
                    await copyText(SELLERS_SQL)
                    setCopiedSql(true)
                    setTimeout(() => setCopiedSql(false), 2000)
                  }}
                  className="mt-1.5 rounded-lg border border-amber-400 bg-white px-2.5 py-1 text-[11px] font-bold text-amber-900 transition hover:bg-amber-100"
                >
                  {copiedSql ? '✓ SQL copiado' : 'Copiar SQL'}
                </button>
              </div>
            )}

            {form.sellers.length === 0 ? (
              <p className="mt-2 text-[11px] text-muted">Todavía no agregaste vendedores.</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {form.sellers.map((seller, i) => {
                  const link = sellerLink(window.location.origin, form.slug, seller.name)
                  return (
                    <li key={i} className="rounded-lg border border-slate-200 bg-white p-2.5">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <input
                          value={seller.name}
                          onChange={(e) => updateSeller(i, { name: e.target.value })}
                          placeholder={`Vendedor ${i + 1} (ej. Juan Pérez)`}
                          aria-label={`Nombre del vendedor ${i + 1}`}
                          maxLength={60}
                          className="input-field min-w-0 flex-1 py-2 text-[13px]"
                        />
                        <div className="input-field flex min-w-0 items-center gap-1.5 py-2 sm:w-44">
                          <span className="shrink-0 text-xs font-semibold text-muted">+51</span>
                          <input
                            value={seller.whatsapp}
                            onChange={(e) => updateSeller(i, { whatsapp: e.target.value.replace(/\D/g, '').slice(0, 9) })}
                            inputMode="numeric"
                            placeholder="WhatsApp"
                            aria-label={`WhatsApp del vendedor ${i + 1}`}
                            className="min-w-0 flex-1 bg-transparent text-[13px] focus:outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSeller(i)}
                          aria-label={`Quitar vendedor ${i + 1}`}
                          className="shrink-0 self-start rounded-lg px-2 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 sm:self-auto"
                        >
                          Quitar
                        </button>
                      </div>

                      {seller.name.trim() && (
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <code className="min-w-0 flex-1 truncate rounded-md bg-surface px-2 py-1 font-mono text-[11px] text-muted">{link}</code>
                          <button
                            type="button"
                            onClick={() => copySeller(i)}
                            className="rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-navy transition hover:bg-surface"
                          >
                            {copiedSeller === i ? '✓ Copiado' : 'Copiar link'}
                          </button>
                          {seller.whatsapp && (
                            <a
                              href={`https://wa.me/51${seller.whatsapp}?text=${encodeURIComponent(sellerShareText({ businessName: form.businessName, link }))}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-700 transition hover:bg-emerald-50"
                            >
                              Enviar por WhatsApp
                            </a>
                          )}
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-semibold text-muted uppercase">Moneda en la que ves tus precios</span>
            <select
              value={form.currency}
              onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
              className="input-field"
            >
              {CURRENCIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-semibold text-muted uppercase">Zona horaria</span>
            <select
              value={form.timezone}
              onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
              className="input-field"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-3">
            <span className="mb-1 block text-xs font-semibold text-muted uppercase">Logo (PNG, JPG o WEBP, máx. 2MB)</span>
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-surface">
                {logoPreviewUrl ? (
                  <img src={logoPreviewUrl} alt="Logo actual" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-[10px] font-semibold text-muted">Sin logo</span>
                )}
              </span>
              <div className="min-w-0 flex-1 space-y-1.5">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => {
                    setLogoFile(e.target.files?.[0] || null)
                    setLogoRemoved(false)
                  }}
                  className="block text-xs text-muted file:mr-3 file:rounded-lg file:border file:border-slate-200 file:bg-surface file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-ink"
                />
                {logoPreviewUrl && (
                  <button
                    type="button"
                    onClick={() => {
                      setLogoFile(null)
                      setLogoRemoved(true)
                    }}
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Quitar logo
                  </button>
                )}
              </div>
            </div>
            <p className="mt-1.5 text-[11px] text-muted">
              Se guarda al presionar "Guardar cambios" y queda así hasta que subas otro o lo quites — es el logo que verán tus clientes en el
              formulario.
            </p>
          </div>

          <label className="mt-3 block">
            <span className="mb-1 block text-xs font-semibold text-muted uppercase">Tu link</span>
            <div className="input-field flex items-center">
              <span className="shrink-0 text-muted">{window.location.origin}/f/</span>
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent focus:outline-none"
              />
            </div>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
          >
            <IconCheck className="h-4 w-4" /> {saving ? 'Guardando…' : 'Guardar cambios'}
          </button>
          {msg && <span className={`text-sm font-semibold ${msg.ok ? 'text-emerald-600' : 'text-red-600'}`}>{msg.text}</span>}
        </div>
      </form>
    </div>
  )
}
