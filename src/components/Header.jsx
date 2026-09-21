import logoIcon from '../assets/logo-icon.png'

export default function Header({ businessName, subtitle, minimal = false }) {
  return (
    <header className="border-b border-slate-200 bg-navy text-white">
      <div className="mx-auto flex max-w-xl items-center gap-3 px-5 py-4 sm:px-6">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-white to-[#e6eef7] shadow-md">
          <img src={logoIcon} alt="" className="h-5.5 w-5.5" />
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
