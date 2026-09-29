import { useEffect, useState } from 'react'

// Frases que rotan debajo del dibujo, con el "asterisco" que gira como el
// spinner de una terminal.
const PHRASES = ['Pensando…', 'Escribiendo código…', 'Anotando pedidos…', 'Empacando envíos…', 'Revisando agencias…', 'Casi listo…']
const SPINNER = ['·', '✢', '✳', '✶', '✻', '✽', '✻', '✶', '✳', '✢']

// Líneas de "código" que se escriben en la pantalla del laptop:
// [x, ancho, color] — cada una aparece con un retraso distinto.
const CODE_LINES = [
  [0, 46, '#f5a97f'],
  [10, 70, '#8bd5ca'],
  [10, 38, '#eed49f'],
  [20, 58, '#c6a0f6'],
  [10, 30, '#8bd5ca'],
  [0, 24, '#f5a97f'],
]

/**
 * Pantalla de carga animada: un personaje naranja escribiendo en su laptop
 * mientras las líneas de código aparecen en la terminal. Todo en SVG + CSS
 * (keyframes `ccl-*` en index.css); con "reducir movimiento" queda quieto.
 */
export default function ClaudeCodeLoader({ label, compact = false }) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 120)
    return () => clearInterval(id)
  }, [])

  const phrase = label || PHRASES[Math.floor(tick / 18) % PHRASES.length]

  return (
    <div role="status" aria-live="polite" className="ccl flex flex-col items-center gap-3 text-center">
      <svg viewBox="0 0 220 170" className={compact ? 'h-28 w-36' : 'h-40 w-52 sm:h-44 sm:w-56'} aria-hidden="true">
        {/* símbolos que flotan desde el teclado */}
        <g className="ccl-float" fontFamily="ui-monospace, monospace" fontWeight="700" fontSize="11">
          <text x="44" y="60" fill="#f5a97f" style={{ animationDelay: '0s' }}>{'{ }'}</text>
          <text x="176" y="54" fill="#8bd5ca" style={{ animationDelay: '0.9s' }}>{'</>'}</text>
          <text x="30" y="92" fill="#c6a0f6" style={{ animationDelay: '1.7s' }}>;</text>
          <text x="190" y="88" fill="#eed49f" style={{ animationDelay: '2.4s' }}>✳</text>
        </g>

        {/* sombra */}
        <ellipse cx="110" cy="160" rx="78" ry="6" fill="currentColor" opacity="0.08" />

        {/* personaje */}
        <g className="ccl-body">
          {/* antena con destello */}
          <line x1="110" y1="30" x2="110" y2="18" stroke="#d97757" strokeWidth="3" strokeLinecap="round" />
          <text x="110" y="16" textAnchor="middle" fontSize="13" fill="#d97757" className="ccl-spark">✳</text>
          {/* cuerpo */}
          <rect x="76" y="30" width="68" height="58" rx="18" fill="#d97757" />
          <rect x="76" y="30" width="68" height="20" rx="18" fill="#e5896a" opacity="0.55" />
          {/* ojos que parpadean */}
          <g className="ccl-eyes" fill="#1f1e1d">
            <rect x="94" y="50" width="7" height="11" rx="3.5" />
            <rect x="119" y="50" width="7" height="11" rx="3.5" />
          </g>
          {/* mejillas y sonrisa */}
          <circle cx="89" cy="67" r="4" fill="#f0a58a" opacity="0.8" />
          <circle cx="131" cy="67" r="4" fill="#f0a58a" opacity="0.8" />
          <path d="M103 68 Q110 74 117 68" stroke="#1f1e1d" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </g>

        {/* laptop */}
        <g>
          <rect x="52" y="86" width="116" height="62" rx="6" fill="#1f2937" />
          <rect x="57" y="91" width="106" height="52" rx="3" fill="#0f172a" />
          <text x="62" y="101" fontFamily="ui-monospace, monospace" fontSize="7" fill="#8bd5ca">&gt;</text>
          {CODE_LINES.map(([dx, w, color], i) => (
            <rect
              key={i}
              x={69 + dx}
              y={96 + i * 7.5}
              width={w}
              height="3.4"
              rx="1.7"
              fill={color}
              className="ccl-line"
              style={{ '--w': `${w}px`, animationDelay: `${i * 0.35}s` }}
            />
          ))}
          <rect x="69" y="137" width="5" height="4" fill="#e5e7eb" className="ccl-cursor" />
          {/* base del laptop */}
          <path d="M40 148 H180 L172 156 H48 Z" fill="#374151" />
        </g>

        {/* brazos tecleando por delante del laptop */}
        <g fill="#d97757">
          <rect x="72" y="140" width="22" height="9" rx="4.5" className="ccl-arm-l" />
          <rect x="126" y="140" width="22" height="9" rx="4.5" className="ccl-arm-r" />
        </g>
      </svg>

      <p className="flex items-center gap-2 font-mono text-sm font-semibold text-ink">
        <span className="inline-block w-4 text-center text-[#d97757]">{SPINNER[tick % SPINNER.length]}</span>
        {phrase}
      </p>
    </div>
  )
}
