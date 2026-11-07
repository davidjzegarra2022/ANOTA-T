import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { APK_URL, canPromptInstall, devicePlatform, isInAppBrowser, isInstalledApp, onInstallAvailabilityChange, promptInstall } from '../utils/installApp'
import { IconDownload, IconX } from './icons'

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="inline h-4 w-4 align-[-3px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v12M7 8l5-5 5 5" />
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
    </svg>
  )
}

/**
 * Botón «Descargar app» para celulares. En Android baja el APK; en iPhone
 * abre la guía para agregarla a inicio desde Safari. No se muestra en
 * computadoras ni si ya se está usando la app instalada.
 */
export default function InstallAppButton({ variant = 'light', className = '' }) {
  const [platform] = useState(() => devicePlatform())
  const [installed] = useState(() => isInstalledApp())
  const [canPrompt, setCanPrompt] = useState(canPromptInstall)
  const [open, setOpen] = useState(false)

  useEffect(() => onInstallAvailabilityChange(() => setCanPrompt(canPromptInstall())), [])

  if (installed || platform === 'desktop') return null

  const base = variant === 'dark' ? 'bg-brand text-navy hover:brightness-105' : 'bg-navy text-white hover:bg-navy-2'

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${base} ${className}`}>
        <IconDownload className="h-4 w-4" /> Descargar la app
      </button>
      {open &&
        createPortal(
          <div role="dialog" aria-modal="true" aria-labelledby="install-title" className="fixed inset-0 z-[95] flex items-end justify-center bg-navy/70" onClick={() => setOpen(false)}>
            <div className="w-full max-w-md rounded-t-3xl bg-white p-5 pb-7 text-left text-ink shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start gap-3">
                <img src="/icon-192.png" alt="" className="h-12 w-12 rounded-2xl shadow" />
                <div className="min-w-0 flex-1">
                  <p id="install-title" className="text-lg font-extrabold text-navy">ANOTA-T en tu celular</p>
                  <p className="text-xs text-muted">Pantalla completa, avisos con sonido y acceso directo desde tu inicio.</p>
                </div>
                <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar" className="rounded-lg p-1 text-muted hover:bg-surface">
                  <IconX className="h-5 w-5" />
                </button>
              </div>

              {platform === 'android' ? (
                <div className="mt-4 space-y-3">
                  <a href={APK_URL} download="anota-t.apk" className="btn btn-primary w-full justify-center !py-3 text-base">
                    <IconDownload className="h-5 w-5" /> Descargar APK (0.5 MB)
                  </a>
                  <ol className="list-decimal space-y-1 pl-5 text-[13px] text-ink">
                    <li>Abre el archivo descargado <b>anota-t.apk</b>.</li>
                    <li>Si Android lo pide, permite <b>«Instalar apps desconocidas»</b> para tu navegador (es normal en apps fuera de la Play Store).</li>
                    <li>Toca <b>Instalar</b> y abre ANOTA-T desde tu pantalla de inicio.</li>
                  </ol>
                  {canPrompt && (
                    <button type="button" onClick={() => promptInstall().then(() => setOpen(false))} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-navy hover:bg-surface">
                      O instalar sin descargar archivo
                    </button>
                  )}
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {isInAppBrowser() && (
                    <p role="alert" className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-[13px] font-semibold text-amber-900">
                      Estás dentro de otra app (WhatsApp, Instagram…). Toca «⋯» y elige <b>Abrir en Safari</b> para poder instalarla.
                    </p>
                  )}
                  <p className="text-[13px] text-ink">En iPhone se instala desde <b>Safari</b> (Apple no permite APK ni apps fuera de su tienda):</p>
                  <ol className="space-y-2 text-[13px]">
                    <li className="flex gap-2 rounded-xl bg-surface p-2.5">
                      <b className="text-brand-dark">1.</b> Toca el botón <b>Compartir</b> <ShareIcon /> en la barra de Safari.
                    </li>
                    <li className="flex gap-2 rounded-xl bg-surface p-2.5">
                      <b className="text-brand-dark">2.</b> Desliza y elige <b>«Agregar a inicio»</b>.
                    </li>
                    <li className="flex gap-2 rounded-xl bg-surface p-2.5">
                      <b className="text-brand-dark">3.</b> Toca <b>Agregar</b>. ANOTA-T aparece en tu inicio como una app.
                    </li>
                  </ol>
                  <p className="text-[12px] text-muted">
                    Para recibir avisos (iOS 16.4 o superior): abre ANOTA-T desde el ícono de inicio, toca la campanita y activa «Recibir avisos».
                  </p>
                </div>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
