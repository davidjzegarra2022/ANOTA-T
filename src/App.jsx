import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import ClaudeCodeLoader from './components/ClaudeCodeLoader'

// Carga diferida de las zonas pesadas: así el formulario público (/f/:slug),
// que es lo que abren los clientes en el celular, NO descarga el panel, el
// admin ni la landing. Cada uno baja solo cuando se entra a su ruta.
const AccessGate = lazy(() => import('./components/AccessGate'))
const AdminDashboard = lazy(() => import('./components/AdminDashboard'))
const AuthGate = lazy(() => import('./components/auth/AuthGate'))
const DashboardLayout = lazy(() => import('./components/dashboard/DashboardLayout'))
const LandingPage = lazy(() => import('./components/LandingPage'))
const ShippingForm = lazy(() => import('./components/ShippingForm'))
const SuccessScreen = lazy(() => import('./components/SuccessScreen'))
const TrackingPage = lazy(() => import('./components/TrackingPage'))
import { fetchMerchantBySlug, fetchSellerPublic } from './utils/merchantProfile'
import { createOrder } from './utils/orders'
import { setPageMeta, metaForPath } from './utils/pageMeta'
import { readSellerFromSearch } from './utils/sellers'
import { codeFromLocation } from './utils/tracking'
import { getCurrentSession, isPlatformAdmin, onAuthStateChange, signOutMerchant } from './utils/supabaseAuth'

// Merchant de muestra SOLO para que el administrador pueda previsualizar el
// formulario ("Ver formulario" en su panel) — no está atado a ninguna
// cuenta real (el admin no es un negociante con su propio slug).
const ADMIN_PREVIEW_MERCHANT = {
  businessName: 'ANOTA-T (vista previa)',
  subtitle: 'Formulario de Envío',
  whatsappNumber: '51900000000',
  couriersActive: [],
  dispatchDays: [1, 2, 3, 4, 5, 6],
  cutoffHour: 18,
  leadTimeHours: 0,
}

function LoadingScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-6">
      <ClaudeCodeLoader />
    </main>
  )
}

/** Esqueleto mientras baja el formulario (ahora es un chunk aparte). */
function FormSkeleton() {
  return (
    <div className="space-y-3 py-2" role="status" aria-label="Cargando formulario">
      <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
      <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200" />
      <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200" />
      <div className="h-11 w-full animate-pulse rounded-xl bg-slate-200" />
      <div className="h-11 w-1/2 animate-pulse rounded-xl bg-slate-200" />
    </div>
  )
}

function PublicShippingRoute({ slug }) {
  const [merchant, setMerchant] = useState(undefined)
  const [submittedForm, setSubmittedForm] = useState(null)
  const [suspended, setSuspended] = useState(false)
  // Vendedor que viene en el link (?v=<código>). Se resuelve en el servidor
  // al abrir el formulario: su nombre marca el pedido en el panel y su
  // WhatsApp recibe el resumen. Sin vendedor (o si la tienda ya lo quitó),
  // el resumen va al WhatsApp de la tienda.
  const [sellerRef] = useState(() => readSellerFromSearch(window.location.search))
  const [seller, setSeller] = useState(null)
  const sellerPromise = useRef(null)

  useEffect(() => {
    fetchMerchantBySlug(slug).then((m) => {
      setMerchant(m)
      setSuspended(m ? m.acceptingOrders === false : false)
      // El título de la pestaña y lo que se comparte llevan el nombre de la
      // tienda, no el genérico de la app.
      if (m?.businessName) setPageMeta({ title: `${m.businessName} · Formulario de envío` })
    })
    if (sellerRef) {
      sellerPromise.current = fetchSellerPublic(slug, sellerRef)
      sellerPromise.current.then(setSeller)
    }
  }, [slug, sellerRef])

  async function handleSubmit(form) {
    // Si el cliente envía antes de que llegue el vendedor, se le espera; y si
    // la primera consulta falló, se intenta otra vez antes de enviar.
    let sel = seller ?? (sellerPromise.current ? await sellerPromise.current : null)
    if (sel?.unresolved) {
      sel = await fetchSellerPublic(slug, sellerRef)
      setSeller(sel)
    }
    const res = await createOrder(merchant.id, { ...form, sellerRef: sel?.id || sellerRef })
    // Si la suscripción venció mientras el cliente llenaba el formulario,
    // el servidor rechaza el pedido: se muestra el aviso, no el éxito.
    if (res.suspended) {
      setSuspended(true)
      return res
    }
    if (res.ok) {
      setSubmittedForm({ ...form, sellerName: sel?.name || '', sellerWhatsapp: sel?.whatsapp || '', sellerUnresolved: Boolean(sel?.unresolved), trackingCode: res.trackingCode, orderNumber: res.orderNumber, orderStatus: res.status })
    }
    // Si falló (p. ej. anti-spam), el formulario muestra el error y no avanza.
    return res
  }

  // Desde la pantalla final: volver a buscar al vendedor del link.
  async function retrySeller() {
    const sel = await fetchSellerPublic(slug, sellerRef)
    setSeller(sel)
    if (sel && !sel.unresolved) {
      setSubmittedForm((f) => (f ? { ...f, sellerName: sel.name, sellerWhatsapp: sel.whatsapp, sellerUnresolved: false } : f))
      return true
    }
    return false
  }

  if (merchant === undefined) return <LoadingScreen />

  if (!merchant) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <p className="text-sm text-muted">Este link no existe o ya no está disponible.</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        businessName={merchant.businessName}
        subtitle="Formulario de Envío"
        minimal={Boolean(submittedForm)}
        logoUrl={merchant.logoUrl}
      />
      <main className="mx-auto w-full max-w-xl flex-1 px-3 py-5 sm:px-6 sm:py-7">
        {/* Panel de vidrio (Liquid Glass) sobre la luz ambiental del fondo. */}
        <div className="card px-4 py-5 sm:p-6">
          {submittedForm ? (
            <Suspense fallback={<FormSkeleton />}>
              <SuccessScreen form={submittedForm} merchant={merchant} onNewOrder={() => setSubmittedForm(null)} onRetrySeller={retrySeller} />
            </Suspense>
          ) : (
            <>
              {/* Guía corta para el cliente final: qué tiene que hacer y que el
                  último paso (WhatsApp) es el que confirma su pedido. */}
              {!suspended && (
                <ol className="mb-5 grid grid-cols-3 gap-1.5 text-center text-[11px] leading-tight font-semibold text-muted" aria-label="Cómo hacer tu pedido">
                  <li className="rounded-xl bg-brand/15 px-1.5 py-2 text-navy">
                    <span className="mb-0.5 block text-sm font-extrabold">1</span>Llena tus datos
                  </li>
                  <li className="rounded-xl bg-surface px-1.5 py-2">
                    <span className="mb-0.5 block text-sm font-extrabold">2</span>Revisa tu resumen
                  </li>
                  <li className="rounded-xl bg-surface px-1.5 py-2">
                    <span className="mb-0.5 block text-sm font-extrabold">3</span>Envíalo por WhatsApp
                  </li>
                </ol>
              )}
              {seller?.name && !seller.unresolved && (
                <p className="mb-4 flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/10 px-3 py-2 text-[13px] text-ink">
                  <span aria-hidden="true">🧑‍💼</span>
                  <span className="min-w-0">
                    Te atiende <b className="font-semibold">{seller.name}</b>
                  </span>
                </p>
              )}
              <Suspense fallback={<FormSkeleton />}>
                <ShippingForm merchant={merchant} onSubmit={handleSubmit} suspended={suspended} />
              </Suspense>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function AdminRoute() {
  // `undefined` = todavía comprobando la sesión; `false` = no es admin.
  const [isAdmin, setIsAdmin] = useState(undefined)
  const [adminView, setAdminView] = useState('dashboard') // 'dashboard' | 'form'
  const [submittedForm, setSubmittedForm] = useState(null)

  // El rol de admin lo decide la base de datos (tabla `platform_admins`), no
  // el navegador: aunque alguien fuerce este estado en memoria, las RPC
  // `admin_*` siguen respondiendo `forbidden` sin la sesión correcta.
  useEffect(() => {
    let alive = true
    getCurrentSession().then(async (session) => {
      const admin = session ? await isPlatformAdmin() : false
      if (alive) setIsAdmin(admin)
    })
    return () => {
      alive = false
    }
  }, [])

  function handleUnlock() {
    setIsAdmin(true)
  }

  async function handleLogout() {
    await signOutMerchant()
    setIsAdmin(false)
    setAdminView('dashboard')
    setSubmittedForm(null)
  }

  function handleBackToPanel() {
    setSubmittedForm(null)
    setAdminView('dashboard')
  }

  if (isAdmin === undefined) return <LoadingScreen />
  if (!isAdmin) return <AccessGate onUnlock={handleUnlock} />

  const wide = adminView === 'dashboard'

  return (
    <div className="flex min-h-screen flex-col">
      <Header businessName="ANOTA-T" subtitle="Panel de administrador" />
      <main className={`mx-auto w-full flex-1 px-5 py-6 sm:px-6 ${wide ? 'max-w-5xl' : 'max-w-xl'}`}>
        {adminView === 'dashboard' ? (
          <AdminDashboard onLogout={handleLogout} onOpenForm={() => setAdminView('form')} />
        ) : (
          <>
            <button
              type="button"
              onClick={handleBackToPanel}
              className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-muted transition hover:text-navy"
            >
              ← Volver al panel
            </button>
            {submittedForm ? (
              <Suspense fallback={<FormSkeleton />}>
                <SuccessScreen form={submittedForm} merchant={ADMIN_PREVIEW_MERCHANT} onNewOrder={() => setSubmittedForm(null)} onBackToPanel={handleBackToPanel} />
              </Suspense>
            ) : (
              <Suspense fallback={<FormSkeleton />}>
                <ShippingForm merchant={ADMIN_PREVIEW_MERCHANT} onSubmit={setSubmittedForm} />
              </Suspense>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}

// 'login' | 'signup' | 'forgot-password' | null (landing)
function authScreenForPath(path) {
  if (path === '/login') return 'login'
  if (path === '/signup') return 'signup'
  if (path === '/forgot-password') return 'forgot'
  return null
}

/**
 * Supabase manda al usuario de vuelta con un hash según el tipo de link de
 * correo: `type=signup` (confirmación de cuenta) o `type=recovery`
 * (recuperar contraseña). Se lee una sola vez, antes del primer render.
 */
function readAuthHashType() {
  const hash = window.location.hash || ''
  if (hash.includes('type=recovery')) return 'recovery'
  if (hash.includes('type=signup') || hash.includes('type=email_change')) return 'signup'
  return null
}

function MerchantSaasRoute({ path }) {
  const [hashType] = useState(readAuthHashType)
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    let cancelled = false
    let unsubscribe = () => {}

    async function init() {
      // El link de confirmación SOLO debe confirmar la cuenta: Supabase abre
      // una sesión automáticamente al validarlo, así que la cerramos y
      // dejamos al usuario en el login para que entre con sus credenciales.
      if (hashType === 'signup') {
        window.history.replaceState(null, '', '/login')
        await signOutMerchant()
      }

      // La suscripción se monta SIEMPRE, también al llegar del link de
      // confirmación: sin ella nada volvía a tocar `session`, así que al
      // ingresar el formulario se quedaba pegado sin redirigir al panel.
      const unsub = await onAuthStateChange((newSession) => {
        if (!cancelled) setSession(newSession)
      })
      if (cancelled) {
        unsub()
        return
      }
      unsubscribe = unsub

      const current = hashType === 'signup' ? null : await getCurrentSession()
      if (!cancelled) setSession(current)
    }

    init()
    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [hashType])

  async function handleLogout() {
    await signOutMerchant()
    setSession(null)
  }

  // La landing se muestra de inmediato: antes se veía un spinner hasta que
  // Supabase respondía, y al entrar por primera vez la página "llegaba vacía".
  if (session === undefined) {
    const showLanding = hashType !== 'recovery' && hashType !== 'signup' && !authScreenForPath(path)
    return showLanding ? <LandingPage /> : <LoadingScreen />
  }

  // Con sesión activa, siempre al panel — sin importar si llegó a /login por error.
  if (session && hashType !== 'recovery') {
    return <DashboardLayout email={session.user.email} onLogout={handleLogout} />
  }

  const authScreen = hashType === 'recovery' ? 'reset' : hashType === 'signup' ? 'login' : authScreenForPath(path)
  if (!authScreen) return <LandingPage />

  return (
    <AuthGate
      initialScreen={authScreen}
      notice={hashType === 'signup' ? 'Tu cuenta quedó confirmada. Ya puedes ingresar.' : null}
      onLoggedIn={async () => {
        // replaceState borra también el hash del link de correo. La sesión
        // se pide de frente (sin esperar al listener) para que el panel
        // aparezca apenas termina el login.
        window.history.replaceState(null, '', '/')
        setSession(await getCurrentSession())
      }}
    />
  )
}

export default function App() {
  const path = window.location.pathname
  const isAdminRoute = useMemo(() => /^\/admin(\/|$)/.test(path), [path])
  const publicFormSlug = useMemo(() => {
    const match = path.match(/^\/f\/([^/]+)/)
    return match ? decodeURIComponent(match[1]) : null
  }, [path])

  // Rastreo público: /rastreo/<CÓDIGO> (el link del WhatsApp) y también los
  // links antiguos /#rastreo, que antes caían en la página de inicio — o en
  // el panel, si quien lo abría tenía sesión de negociante.
  const isTrackingRoute = useMemo(() => /^\/rastreo(\/|$)/.test(path) || window.location.hash.startsWith('#rastreo'), [path])
  const trackingCode = useMemo(
    () => (isTrackingRoute ? codeFromLocation(path, window.location.search, window.location.hash) : ''),
    [isTrackingRoute, path],
  )

  // Título y descripción de la pestaña según la ruta. En /f/:slug los pone la
  // propia ruta cuando ya conoce el nombre de la tienda.
  useEffect(() => {
    if (!publicFormSlug) setPageMeta(metaForPath(path))
  }, [path, publicFormSlug])

  // Suspense cubre a los componentes cargados en diferido mientras bajan.
  return (
    <Suspense fallback={<LoadingScreen />}>
      {isTrackingRoute ? (
        <TrackingPage initialCode={trackingCode} />
      ) : isAdminRoute ? (
        <AdminRoute />
      ) : publicFormSlug ? (
        <PublicShippingRoute slug={publicFormSlug} />
      ) : (
        <MerchantSaasRoute path={path} />
      )}
    </Suspense>
  )
}
