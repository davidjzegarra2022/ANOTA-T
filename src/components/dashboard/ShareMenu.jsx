import { useState } from 'react'
import { copyText } from '../../utils/clipboard'
import { buildWhatsAppUrl } from '../../utils/whatsapp'
import { IconCheck, IconChevronDown, IconCopy, IconShare, IconWhatsapp } from '../icons'

/**
 * "Compartir" al final del menú lateral: despliega las dos acciones con el
 * link público de la tienda — copiarlo al portapapeles o reenviarlo por
 * WhatsApp (sin número: WhatsApp deja elegir el chat o grupo).
 */
export default function ShareMenu({ slug, businessName, collapsed, onExpand }) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const link = `${window.location.origin}/f/${slug}`
  const message = `${businessName ? `${businessName} — ` : ''}Llena tus datos de envío aquí 👉 ${link}`

  function toggle() {
    if (collapsed) onExpand?.()
    setOpen((o) => !o)
  }

  function handleCopy() {
    copyText(link).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="pt-1">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        title="Compartir"
        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
          open ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
        }`}
      >
        <IconShare className="h-4.5 w-4.5 shrink-0" />
        <span className={`flex-1 truncate text-left ${collapsed ? 'lg:hidden' : ''}`}>Compartir</span>
        <IconChevronDown className={`h-4 w-4 shrink-0 transition ${open ? 'rotate-180' : ''} ${collapsed ? 'lg:hidden' : ''}`} />
      </button>

      {open && !collapsed && (
        <div className="animate-fade-in-up mt-1 space-y-1 rounded-xl bg-white/5 p-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            {copied ? <IconCheck className="h-4 w-4 shrink-0 text-emerald-300" /> : <IconCopy className="h-4 w-4 shrink-0" />}
            <span className="min-w-0">
              <span className="block">{copied ? '¡Link copiado!' : 'Link de tienda'}</span>
              <span className="block truncate font-mono text-[10.5px] font-normal text-slate-400">/f/{slug}</span>
            </span>
          </button>
          <a
            href={buildWhatsAppUrl('', message)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-emerald-300 transition hover:bg-white/10 hover:text-emerald-200"
          >
            <IconWhatsapp className="h-4 w-4 shrink-0" /> Reenviar por WhatsApp
          </a>
        </div>
      )}
    </div>
  )
}
