// Fruits et légumes stylisés en aplats, contour aubergine (palette Dalia uniquement).
const INK = '#3B1F4A'
const S = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

export function Tomato({ size = 96 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 22c22 0 40 14 40 36S72 92 50 92 10 80 10 58s18-36 40-36z" fill="#FF5A3C" {...S} />
      <ellipse cx="32" cy="48" rx="7" ry="11" fill="#FFF6E9" opacity=".7" transform="rotate(25 32 48)" />
      <path d="M50 30l-8-12 10 6 6-10 2 12 12-2-10 8 8 8-12-3-6 9z" fill="#2EC4A0" {...S} />
    </svg>
  )
}

export function Apricot({ size = 88 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 18c24 0 40 18 38 40-2 22-18 34-38 34S12 80 12 58 26 18 50 18z" fill="#FFB23E" {...S} />
      <path d="M50 20c-6 20-6 46 2 70" fill="none" {...S} />
      <ellipse cx="32" cy="46" rx="6" ry="10" fill="#FFF6E9" opacity=".7" transform="rotate(20 32 46)" />
      <path d="M52 20c6-10 16-14 28-12-4 11-14 16-28 12z" fill="#2EC4A0" {...S} />
    </svg>
  )
}

export function Eggplant({ size = 110 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M58 30c20 8 30 30 22 48-7 16-28 18-42 6C24 72 26 46 40 34c5-4 11-6 18-4z" fill="#573468" {...S} />
      <ellipse cx="46" cy="52" rx="6" ry="13" fill="#FFF6E9" opacity=".45" transform="rotate(-30 46 52)" />
      <path d="M40 34c4-8 14-12 22-8l6-12M44 30c6 4 14 6 20 2" fill="#2EC4A0" {...S} />
    </svg>
  )
}

export function MintLeaf({ size = 70 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <path d="M14 80C14 40 40 14 86 14c0 46-26 72-72 66z" fill="#2EC4A0" {...S} />
      <path d="M18 78C40 58 58 40 78 22M40 58l-4-16M54 44l-2-14M40 58l16 2M54 44l14 2" fill="none" {...S} strokeWidth={2.5} />
    </svg>
  )
}

export function Baguette({ size = 140 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.45} viewBox="0 0 140 64" aria-hidden="true">
      <path d="M12 44C10 30 40 14 80 10c34-3 50 4 50 14S100 48 64 54c-30 5-50 2-52-10z" fill="#FFB23E" {...S} />
      <path d="M40 30l10 10M60 22l10 10M80 18l10 10M100 18l8 8" fill="none" {...S} />
    </svg>
  )
}
