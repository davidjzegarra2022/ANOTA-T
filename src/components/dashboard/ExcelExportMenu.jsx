import { useEffect, useRef, useState } from 'react'
import { exportOrdersToExcel } from '../../utils/ordersExport'
import { isShalomOrder } from '../../utils/shalomExport'
import { IconDownload } from '../icons'
import ShalomExportDialog from './ShalomExportDialog'

const isOlvaOrder = (o) => o.deliveryMethod === 'agency' && String(o.courier).toLowerCase() === 'olva' && o.status !== 'cancelled'

/**
 * Botón Excel de Envíos: antes de descargar pregunta el formato. Siempre
 * ofrece el Excel general; Shalom u Olva masivo aparecen solo si en los
 * pedidos hay envíos por esa agencia.
 */
export default function ExcelExportMenu({ orders, merchant, label, disabled }) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [shalomOpen, setShalomOpen] = useState(false)
  const ref = useRef(null)
  const shalomCount = orders.filter(isShalomOrder).length
  const olvaCount = orders.filter(isOlvaOrder).length

  useEffect(() => {
    if (!open) return undefined
    const onDown = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  async function general() {
    setOpen(false)
    setBusy(true)
    try {
      await exportOrdersToExcel(orders)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div ref={ref} className="relative flex-1 sm:flex-none">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={disabled || busy}
        aria-haspopup="menu"
        aria-expanded={open}
        className="btn btn-outline w-full"
      >
        <IconDownload className="h-4 w-4" />
        {busy ? 'Exportando…' : label} <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <div role="menu" className="animate-fade-in-up absolute top-full right-0 z-30 mt-2 w-72 max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl">
          <p className="px-3 pt-1.5 pb-1 text-[11px] font-bold tracking-wide text-muted uppercase">¿Qué descarga deseas?</p>
          <MenuItem badge="X" tone="bg-emerald-100 text-emerald-700" title="General" text={`Todos los datos · ${orders.length} pedido${orders.length === 1 ? '' : 's'}`} onClick={general} />
          {shalomCount > 0 && (
            <MenuItem
              badge="S"
              tone="bg-red-100 text-red-700"
              title="Shalom masivo"
              text={`Formato Pro Masivo · ${shalomCount} pedido${shalomCount === 1 ? '' : 's'}`}
              onClick={() => {
                setOpen(false)
                setShalomOpen(true)
              }}
            />
          )}
          {olvaCount > 0 && <MenuItem badge="O" tone="bg-violet-100 text-violet-700" title="Olva masivo" text={`${olvaCount} pedido${olvaCount === 1 ? '' : 's'} · próximamente`} disabled />}
        </div>
      )}
      {shalomOpen && <ShalomExportDialog merchant={merchant} periodOrders={orders} periodLabel="Pedidos de la lista" onClose={() => setShalomOpen(false)} />}
    </div>
  )
}

function MenuItem({ badge, tone, title, text, onClick, disabled }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:bg-transparent"
    >
      <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${tone}`}>{badge}</span>
      <span className="min-w-0">
        <span className="block text-sm font-bold text-navy">{title}</span>
        <span className="block text-xs text-muted">{text}</span>
      </span>
    </button>
  )
}
