import { useEffect, useState } from 'react'
import logoIcon from '../assets/logo-icon.png'

export default function Header({ businessName, subtitle, minimal = false, logoUrl }) {
  const [logoFailed, setLogoFailed] = useState(false)

  // Si cambia el logo (o el negociante), vuelve a intentar mostrarlo.
  useEffect(() => {
    setLogoFailed(false)
  }, [logoUrl])

  const showCustomLogo = Boolean(logoUrl) && !logoFailed

  return (
    <header className="border-b border-slate-200 bg-navy text-white">
      <div className="mx-auto flex max-w-xl items-center gap-3 px-5 py-4 sm:px-6">
        <span
          className={`flex shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br from-white to-[#e6eef7] shadow-md ${
            showCustomLogo ? 'h-[49px] w-[49px] rounded-2xl' : 'h-9 w-9 rounded-xl'
          }`}
        >
          <img
            src={showCustomLogo ? logoUrl : logoIcon}
            alt=""
            className={showCustomLogo ? 'h-full w-full object-cover' : 'h-5.5 w-5.5'}
            onError={() => setLogoFailed(true)}
          />
        </span>
        {minimal ? (
          <p className="text-xs font-bold tracking-wide text-slate-300 uppercase">Formulario de Envío</p>
        ) : (
          <div className="min-w-0 leading-tight">
            <p className="truncate text-base font-bold tracking-wide text-white">{businessName}</p>
            <p className="text-[11px] font-bold tracking-wide text-slate-300 uppercase">{subtitle}</p>
          </div>
        )}
      </div>
    </header>
  )
}
