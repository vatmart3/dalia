// Produits de l'étal en aplats, contour aubergine (palette Dalia uniquement).
const INK = '#3B1F4A'
const S = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

export function Yogurt({ size = 92 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 100 115" aria-hidden="true">
      <path d="M16 30h68l-8 74a8 8 0 0 1-8 7H32a8 8 0 0 1-8-7z" fill="#FFF6E9" {...S} />
      <rect x="10" y="16" width="80" height="18" rx="8" fill="#FF5A3C" {...S} />
      <rect x="30" y="56" width="40" height="26" rx="6" fill="#2EC4A0" {...S} />
      <path d="M38 69h24" {...S} />
      <ellipse cx="28" cy="50" rx="4" ry="12" fill="#FFFFFF" opacity=".7" />
    </svg>
  )
}

export function Cheese({ size = 110 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.72} viewBox="0 0 110 80" aria-hidden="true">
      <path d="M6 54 70 10l34 22v30a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" fill="#FFB23E" {...S} />
      <path d="M6 54h98" {...S} />
      <circle cx="30" cy="62" r="4" fill="#3B1F4A" />
      <circle cx="66" cy="40" r="6" fill="#FFF6E9" {...S} strokeWidth={2.5} />
      <circle cx="84" cy="60" r="4" fill="#3B1F4A" />
    </svg>
  )
}

export function Apricots({ size = 120 }: { size?: number }) {
  const one = (x: number, y: number, r: number) => (
    <g key={`${x}-${y}`}>
      <circle cx={x} cy={y} r={r} fill="#FFB23E" {...S} />
      <path d={`M${x} ${y - r + 2}c-3 ${r * 0.6}-2 ${r * 1.2} 2 ${r * 1.8}`} fill="none" {...S} strokeWidth={2.5} />
      <ellipse cx={x - r * 0.45} cy={y - r * 0.2} rx={r * 0.15} ry={r * 0.3} fill="#FFF6E9" opacity=".7" />
    </g>
  )
  return (
    <svg width={size} height={size * 0.62} viewBox="0 0 120 74" aria-hidden="true">
      {one(30, 48, 22)}
      {one(90, 48, 22)}
      {one(60, 34, 24)}
      <path d="M62 11c4-7 11-9 19-7-3 7-10 10-19 7z" fill="#2EC4A0" {...S} strokeWidth={2.5} />
    </svg>
  )
}

export function Baguette({ size = 150 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.45} viewBox="0 0 140 64" aria-hidden="true">
      <path d="M12 44C10 30 40 14 80 10c34-3 50 4 50 14S100 48 64 54c-30 5-50 2-52-10z" fill="#FFB23E" {...S} />
      <path d="M40 30l10 10M60 22l10 10M80 18l10 10M100 18l8 8" fill="none" {...S} />
    </svg>
  )
}

export function Tomato({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 22c22 0 40 14 40 36S72 92 50 92 10 80 10 58s18-36 40-36z" fill="#FF5A3C" {...S} />
      <ellipse cx="32" cy="48" rx="7" ry="11" fill="#FFF6E9" opacity=".7" transform="rotate(25 32 48)" />
      <path d="M50 30l-8-12 10 6 6-10 2 12 12-2-10 8 8 8-12-3-6 9z" fill="#2EC4A0" {...S} />
    </svg>
  )
}

/** Barquette de boucherie. */
export function Tray({ size = 110 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 110 66" aria-hidden="true">
      <path d="M6 22h98l-8 34a8 8 0 0 1-8 6H22a8 8 0 0 1-8-6z" fill="#FFF6E9" {...S} />
      <path d="M22 26c8-10 30-12 44-6 14 6 22 2 26 8-6 14-26 20-46 16-16-3-28-8-24-18z" fill="#FF5A3C" {...S} />
      <path d="M40 30c6 4 14 4 20 0M56 38c6 2 12 1 16-2" fill="none" stroke="#FFF6E9" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
