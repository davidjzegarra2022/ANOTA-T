import { useEffect, useState } from 'react'
import logoFull from '../assets/logo-full.png'
import logoIcon from '../assets/logo-icon.png'
import { fetchActivePlans } from '../utils/plans'
import { trackOrderByCode, ORDER_STATUS_LABELS } from '../utils/orders'
import { IconCheck } from './icons'

const FEATURES = [
  { icon: '▣', title: 'Formulario universal', text: 'Completa tus datos una sola vez y genera el formulario para cualquier agencia.' },
  { icon: '⌁', title: 'Base de datos de agencias', text: 'Accede a las agencias de transporte más conocidas a nivel nacional.' },
  { icon: '▤', title: 'Panel de control', text: 'Consulta el estado de tus formularios y envíos en un solo lugar.' },
  { icon: '🖨', title: 'Etiquetas al instante', text: 'Genera e imprime tus etiquetas de envío desde tu celular.' },
]

const STEPS = [
  { title: 'Completa tus datos', text: 'Ingresa la información de tu envío una sola vez.' },
  { title: 'Elige la agencia', text: 'Selecciona la empresa de transporte de tu preferencia.' },
  { title: 'Genera tu formulario', text: 'Obtén tu formulario y etiqueta listos para imprimir.' },
  { title: '¡Listo!', text: 'Entrega tu paquete con todo listo en tu agencia elegida.' },
]

function PlanCard({ plan, featured }) {
  const priceLabel = plan.trialDays ? `${plan.trialDays} días` : `S/ ${plan.pricePerDay.toFixed(2)}`
  const priceSuffix = plan.trialDays ? 'gratis' : 'x día'
  return (
    <article className={`relative flex flex-col rounded-[18px] border p-8 ${featured ? 'scale-[1.02] border-navy bg-navy text-white shadow-xl' : 'border-slate-200 bg-surface'}`}>
      {featured && (
        <span className="absolute -top-3.5 right-6 rounded-full bg-brand px-3.5 py-1.5 text-[11px] font-extrabold text-navy">Recomendado</span>
      )}
      <div className={`mb-5 border-b pb-5 text-center ${featured ? 'border-white/15' : 'border-black/10'}`}>
        <h3 className="text-lg font-bold">{plan.name}</h3>
        <p className={`mt-2 text-2xl font-extrabold ${featured ? 'text-brand' : 'text-brand-dark'}`}>
          {priceLabel}
          <span className={`mt-0.5 block text-xs font-semibold ${featured ? 'text-slate-300' : 'text-muted'}`}>{priceSuffix}</span>
        </p>
      </div>
      <ul className="mb-6 flex-1 space-y-2">
        {plan.features.map((f) => (
          <li key={f} className={`flex items-start gap-2 text-[13.5px] ${featured ? 'text-slate-200' : 'text-muted'}`}>
            <IconCheck className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${featured ? 'text-brand' : 'text-brand-dark'}`} />
            {f}
          </li>
        ))}
      </ul>
      <a href="/signup" className={`btn w-full ${featured ? 'btn-primary' : 'btn-dark'}`}>
        {plan.trialDays ? 'Probar gratis' : `Elegir ${plan.name}`}
      </a>
    </article>
  )
}

function TrackingBox() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)
  const [checking, setChecking] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!code.trim()) return
    setChecking(true)
    const res = await trackOrderByCode(code)
    setChecking(false)
    setResult(res)
  }

  return (
    <form onSubmit={handleSubmit} className="reveal">
      <label htmlFor="trackingCode" className="mb-2 block text-sm text-slate-300">
        Código de formulario
      </label>
      <div className="flex gap-2.5">
        <input
          id="trackingCode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Ej. ANOTA-4F8K2"
          className="input-field min-w-0 flex-1"
        />
        <button type="submit" disabled={checking} className="btn btn-primary shrink-0">
          {checking ? 'Buscando…' : 'Consultar'}
        </button>
      </div>
      {result && (
        <p className={`mt-3 text-[13px] font-semibold ${result.ok ? 'text-brand' : 'text-red-300'}`}>
          {result.ok
            ? `${result.order.trackingCode} — ${ORDER_STATUS_LABELS[result.order.status] ?? result.order.status} · ${result.order.businessName}`
            : result.error}
        </p>
      )}
    </form>
  )
}

export default function LandingPage() {
  const [plans, setPlans] = useState([])

  useEffect(() => {
    fetchActivePlans().then(setPlans)
  }, [])

  return (
    <div className="bg-white text-ink">
      <header className="sticky top-0 z-20 bg-navy text-white">
        <nav className="mx-auto flex min-h-[76px] w-[92%] max-w-[1180px] items-center justify-between gap-6">
          <a href="/" className="inline-flex items-center gap-2.5 text-[22px] font-extrabold tracking-tight">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-white to-[#e6eef7] shadow-lg">
              <img src={logoIcon} alt="" className="h-7 w-7" />
            </span>
            <span>
              ANOTA<span className="text-brand">-T</span>
            </span>
          </a>
          <div className="hidden items-center gap-6 text-[13px] font-semibold sm:flex">
            <a href="#servicios" className="opacity-90 hover:text-brand">Funciones</a>
            <a href="#planes" className="opacity-90 hover:text-brand">Planes</a>
            <a href="#como-funciona" className="opacity-90 hover:text-brand">Cómo funciona</a>
            <a href="#rastreo" className="opacity-90 hover:text-brand">Rastrear pedido</a>
            <a href="/login" className="btn btn-primary !px-5 !py-2.5">Iniciar sesión</a>
          </div>
          <a href="/login" className="btn btn-primary !px-4 !py-2 text-xs sm:hidden">Ingresar</a>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[linear-gradient(110deg,#071d2d_0%,#0b3046_50%,#163e50_100%)] text-white">
          <div className="mx-auto flex w-[92%] max-w-[1180px] flex-col items-center gap-10 py-14 md:flex-row md:justify-between">
            <div className="max-w-[650px]">
              <p className="mb-3 text-[13px] font-extrabold tracking-wide text-brand-dark">HERRAMIENTA DE FORMULARIOS PARA ENVÍOS</p>
              <h1 className="mb-5 text-[42px] leading-[1.06] font-extrabold tracking-tight sm:text-[56px]">
                Tu formulario de envío,
                <br />
                <span className="text-brand">listo en segundos</span>
              </h1>
              <p className="mb-7 max-w-[500px] text-[#e0e8ee]">
                ANOTA-T arma automáticamente los datos de tu envío y los deja listos para la agencia de transporte
                que elijas. Nota: ANOTA-T no realiza delivery ni transporte, solo simplificamos tu formulario.
              </p>
              <a href="/signup" className="btn btn-primary">
                Crea tu formulario ahora →
              </a>
              <div className="mt-7 grid max-w-[620px] grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ['◷', 'Rápido', 'Formularios en segundos'],
                  ['♢', 'Seguro', 'Tus datos protegidos'],
                  ['✓', 'Confiable', 'Compatible con tus agencias'],
                ].map(([icon, title, text]) => (
                  <div key={title} className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-navy/90 p-3.5">
                    <strong className="text-2xl text-brand">{icon}</strong>
                    <div>
                      <b className="block">{title}</b>
                      <small className="block text-[11px] text-slate-300">{text}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="logo-stage w-full max-w-[460px] py-4">
              <div className="logo-float mx-auto">
                <div className="logo-3d mx-auto w-[min(400px,78vw)] p-8 pb-6">
                  <img src={logoFull} alt="ANOTA-T" />
                </div>
                <div className="logo-ground mx-auto mt-6 h-6 w-[70%]" />
              </div>
            </div>
          </div>
        </section>

        <section id="servicios" className="py-20">
          <div className="mx-auto w-[92%] max-w-[1180px]">
            <div className="mb-10 text-center">
              <p className="mb-2 text-[13px] font-extrabold tracking-wide text-brand-dark">SOLUCIONES PARA TI</p>
              <h2 className="text-[32px] font-extrabold tracking-tight sm:text-[40px]">
                Nuestras <span className="text-brand-dark">Funciones</span>
              </h2>
              <p className="mt-2 text-muted">Todo lo que necesitas para armar y organizar tus formularios de envío.</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => (
                <article key={f.title} className="rounded-[18px] bg-surface p-8 text-center transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="mb-3.5 text-4xl text-brand-dark">{f.icon}</div>
                  <h3 className="mb-3 text-[17px] font-bold">{f.title}</h3>
                  <p className="text-sm text-muted">{f.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="planes" className="bg-surface py-20">
          <div className="mx-auto w-[92%] max-w-[1180px]">
            <div className="mb-10 text-center">
              <p className="mb-2 text-[13px] font-extrabold tracking-wide text-brand-dark">PLANES ANOTA-T</p>
              <h2 className="text-[32px] font-extrabold tracking-tight sm:text-[40px]">
                Elige el <span className="text-brand-dark">plan</span> ideal para ti
              </h2>
              <p className="mt-2 text-muted">Empieza gratis y crece con nosotros a tu ritmo.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {plans.map((p, i) => (
                <PlanCard key={p.id} plan={p} featured={i === plans.length - 1 && plans.length > 1} />
              ))}
            </div>
          </div>
        </section>

        <section id="como-funciona" className="bg-white py-20">
          <div className="mx-auto grid w-[92%] max-w-[1180px] grid-cols-1 items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="mx-auto w-[270px] rounded-[38px] border-[9px] border-[#152f40] bg-navy p-3 shadow-xl">
              <div className="relative h-[420px] overflow-hidden rounded-[25px] bg-white">
                <div className="bg-navy p-4 text-center font-extrabold text-brand">ANOTA-T</div>
                <div className="relative h-[210px] bg-[#e8f0e8]" />
                <div className="p-4">
                  <span className="mb-3 inline-block rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-extrabold text-emerald-700">
                    Formulario listo
                  </span>
                  <h4 className="mb-2 text-sm font-bold">Tu formulario está generado</h4>
                  <p className="text-[11px] text-muted">✓ Listo para entregar a tu agencia</p>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-2 text-[13px] font-extrabold tracking-wide text-brand-dark">¿CÓMO FUNCIONA?</p>
              <h2 className="mb-6 text-[32px] font-extrabold tracking-tight sm:text-[40px]">
                Armar tu formulario es <span className="text-brand-dark">muy fácil</span>
              </h2>
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                {STEPS.map((s, i) => (
                  <div key={s.title} className="flex gap-4">
                    <b className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand font-extrabold text-navy">{i + 1}</b>
                    <div>
                      <h3 className="mb-1 text-[15px] font-bold">{s.title}</h3>
                      <p className="text-[13px] text-muted">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="rastreo" className="bg-navy py-20 text-white">
          <div className="mx-auto grid w-[92%] max-w-[1180px] grid-cols-1 items-center gap-14 md:grid-cols-2">
            <div className="reveal">
              <p className="mb-2 text-[13px] font-extrabold tracking-wide text-brand-dark">PANEL EN TIEMPO REAL</p>
              <h2 className="mb-3 text-[32px] font-extrabold tracking-tight sm:text-[40px]">
                ¿Cómo va tu <span className="text-brand">formulario?</span>
              </h2>
              <p className="text-slate-300">Ingresa tu código de formulario para consultar su estado.</p>
            </div>
            <TrackingBox />
          </div>
        </section>

        <section id="nosotros" className="py-20">
          <div className="mx-auto grid w-[92%] max-w-[1180px] grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div>
              <p className="mb-2 text-[13px] font-extrabold tracking-wide text-brand-dark">CONOCE ANOTA-T</p>
              <h2 className="mb-4 text-[32px] font-extrabold tracking-tight sm:text-[40px]">
                Tu formulario, <span className="text-brand-dark">nuestra prioridad</span>
              </h2>
              <p className="mb-6 text-muted">
                Somos la herramienta que simplifica tus formularios de envío con procesos simples y compatibilidad
                con tus agencias de confianza. No hacemos delivery: nos enfocamos en ahorrarte tiempo con el papeleo.
              </p>
              <a href="/signup" className="btn btn-dark">Conócenos más →</a>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                ['24/7', 'Disponibilidad'],
                ['100%', 'Compromiso'],
                ['1', 'Gran prioridad: tú'],
              ].map(([num, label]) => (
                <div key={label} className="rounded-2xl bg-surface p-6 text-center">
                  <strong className="block text-[28px] text-brand-dark">{num}</strong>
                  <span className="block text-xs text-muted">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contacto" className="bg-navy pt-14 pb-5 text-white">
        <div className="mx-auto grid w-[92%] max-w-[1180px] grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          <div>
            <a href="/" className="inline-flex items-center gap-2.5 text-xl font-extrabold">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-white to-[#e6eef7]">
                <img src={logoIcon} alt="" className="h-6 w-6" />
              </span>
              <span>
                ANOTA<span className="text-brand">-T</span>
              </span>
            </a>
            <p className="mt-4 text-[13px] text-slate-300">ANOTA-T es una herramienta de formularios. No realizamos delivery ni transporte.</p>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-brand">Enlaces rápidos</h4>
            <div className="space-y-2 text-[13px] text-slate-300">
              <a href="#servicios" className="block hover:text-brand">Funciones</a>
              <a href="#como-funciona" className="block hover:text-brand">Cómo funciona</a>
              <a href="#rastreo" className="block hover:text-brand">Rastrear pedido</a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-brand">Soporte</h4>
            <div className="space-y-2 text-[13px] text-slate-300">
              <a href="#contacto" className="block hover:text-brand">Preguntas frecuentes</a>
              <a href="#contacto" className="block hover:text-brand">Términos y condiciones</a>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-bold text-brand">Contáctanos</h4>
            <p className="mb-2 text-[13px] text-slate-300">✉ helpanotat@gmail.com</p>
            <p className="text-[13px] text-slate-300">📍 Lima, Perú</p>
          </div>
        </div>
        <div className="mx-auto mt-10 flex w-[92%] max-w-[1180px] flex-col justify-between gap-3 border-t border-white/15 pt-4 text-[11px] text-slate-400 sm:flex-row">
          <span>© {new Date().getFullYear()} ANOTA-T. Todos los derechos reservados.</span>
          <span className="text-brand">Tu formulario, en segundos.</span>
        </div>
      </footer>
    </div>
  )
}
