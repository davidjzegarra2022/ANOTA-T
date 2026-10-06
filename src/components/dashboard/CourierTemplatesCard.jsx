import { IconDownload } from '../icons'

// Plantillas de carga masiva de cada courier. `file` = null → aún no está
// disponible (se muestra como "Próximamente"). Los archivos viven en
// public/plantillas/.
const TEMPLATES = [
  { courier: 'Shalom', description: 'Guías masivas para Shalom Empresarial (Excel PRO).', file: '/plantillas/plantilla-shalom-masivo.xlsx' },
  { courier: 'Olva Courier', description: 'Carga masiva de envíos para Olva.', file: null },
  { courier: 'Marvisur', description: 'Carga masiva de envíos para Marvisur.', file: null },
]

export default function CourierTemplatesCard() {
  return (
    <div className="card p-4">
      <p className="text-sm font-bold text-navy">Plantillas de carga masiva</p>
      <p className="mt-1 text-xs text-muted">Descarga el formato de cada courier para subir muchas guías de una sola vez en su plataforma.</p>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {TEMPLATES.map((tpl) => (
          <div key={tpl.courier} className="flex flex-col rounded-xl border border-slate-200 p-3.5">
            <p className="text-sm font-bold text-navy">{tpl.courier}</p>
            <p className="mt-1 flex-1 text-xs text-muted">{tpl.description}</p>
            {tpl.file ? (
              <a href={tpl.file} download className="btn btn-primary mt-3 w-full !py-2 text-xs">
                <IconDownload className="h-4 w-4" /> Descargar plantilla
              </a>
            ) : (
              <span className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-dashed border-slate-300 py-2 text-xs font-semibold text-muted">
                Próximamente
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
