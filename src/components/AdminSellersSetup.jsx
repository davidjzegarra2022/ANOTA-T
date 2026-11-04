import { useEffect, useState } from 'react'
import { copyText } from '../utils/clipboard'
import { checkSellersSql } from '../utils/merchantProfile'
import { SELLERS_SQL } from '../utils/sellers'
import { IconCheck, IconRefresh } from './icons'

// Estado del SQL de Vendedores. Solo lo ve el administrador: los negociantes
// ya no ven avisos técnicos. Mientras el SQL no se haya corrido en Supabase,
// los vendedores no se guardan en la cuenta, los pedidos no salen marcados con
// su vendedor y el resumen no vuelve al WhatsApp del vendedor.
export default function AdminSellersSetup() {
  const [status, setStatus] = useState('checking') // checking | ok | missing | unknown
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  async function check() {
    setStatus('checking')
    setStatus(await checkSellersSql())
  }

  useEffect(() => {
    let alive = true
    checkSellersSql().then((s) => alive && setStatus(s))
    return () => {
      alive = false
    }
  }, [])

  async function copy() {
    await copyText(SELLERS_SQL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (status === 'ok') {
    return (
      <p className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        <IconCheck className="h-3.5 w-3.5" /> Vendedores activo en Supabase
      </p>
    )
  }

  return (
    <div className="rounded-xl border border-amber-300 bg-amber-50 p-3.5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-amber-900">
            {status === 'checking' ? 'Comprobando SQL de Vendedores…' : status === 'missing' ? 'Falta activar Vendedores en Supabase' : 'No se pudo comprobar el SQL de Vendedores'}
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-amber-900">
            Mientras no se corra, los vendedores de cada tienda no se guardan en su cuenta, los pedidos salen sin vendedor y el resumen va al WhatsApp de la
            tienda en vez del de su vendedor. Es una sola vez: copia el SQL, pégalo en Supabase → SQL Editor y ejecútalo; luego pulsa «Volver a comprobar».
          </p>
        </div>
        <button type="button" onClick={check} className="inline-flex items-center gap-1 rounded-lg border border-amber-400 bg-white px-2.5 py-1 text-xs font-bold text-amber-900 hover:bg-amber-100">
          <IconRefresh className={`h-3.5 w-3.5 ${status === 'checking' ? 'animate-spin' : ''}`} /> Volver a comprobar
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        <button type="button" onClick={copy} className="rounded-lg bg-navy px-3 py-1.5 text-xs font-bold text-white hover:bg-navy-2">
          {copied ? '✓ SQL copiado' : 'Copiar SQL'}
        </button>
        <button type="button" onClick={() => setOpen((o) => !o)} className="rounded-lg border border-amber-400 bg-white px-3 py-1.5 text-xs font-bold text-amber-900 hover:bg-amber-100">
          {open ? 'Ocultar SQL' : 'Ver SQL'}
        </button>
      </div>
      {open && <pre className="mt-2 max-h-64 overflow-auto rounded-lg bg-navy p-3 text-[11px] leading-relaxed text-white">{SELLERS_SQL}</pre>}
    </div>
  )
}
