// Petites icônes produits au trait, pour l'écran de l'appli (à la place d'emojis).
const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export type Product = 'yaourt' | 'brioche' | 'fromage' | 'fruit'

const TINT: Record<Product, { bg: string; fg: string }> = {
  yaourt: { bg: '#D8F4EC', fg: '#1F8C72' },
  brioche: { bg: '#FFEFCF', fg: '#A75F00' },
  fromage: { bg: '#FFE7C2', fg: '#3B1F4A' },
  fruit: { bg: '#FFE1D9', fg: '#D8432A' },
}

function Glyph({ kind }: { kind: Product }) {
  switch (kind) {
    case 'yaourt':
      return (
        <svg {...base} aria-hidden="true">
          <path d="M6 7h12l-1.3 11.2a1.5 1.5 0 0 1-1.5 1.3H8.8a1.5 1.5 0 0 1-1.5-1.3z" />
          <path d="M5 4.5h14V7H5z" />
        </svg>
      )
    case 'brioche':
      return (
        <svg {...base} aria-hidden="true">
          <path d="M4 16.5c0-5 3.6-9 8-9s8 4 8 9z" />
          <path d="M3.5 16.5h17M9 8.5c.6 2 .6 5 0 8M15 8.5c-.6 2-.6 5 0 8" />
        </svg>
      )
    case 'fromage':
      return (
        <svg {...base} aria-hidden="true">
          <path d="M3.5 15.5 13 6l7.5 4.5v6a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5z" />
          <path d="M3.5 15.5h17" />
          <circle cx="9" cy="17.6" r="0.6" />
          <circle cx="15" cy="13" r="1" />
        </svg>
      )
    case 'fruit':
      return (
        <svg {...base} aria-hidden="true">
          <path d="M12 8c-4.5-2-8 1-7.5 5.5.4 3.8 3.2 7 7.5 6 4.3 1 7.1-2.2 7.5-6C20 9 16.5 6 12 8z" />
          <path d="M12 8c0-2 .8-3.5 2.5-4.5" />
        </svg>
      )
  }
}

export function ProductThumb({ kind }: { kind: Product }) {
  const t = TINT[kind]
  return (
    <span className="app__thumb" style={{ background: t.bg, color: t.fg }}>
      <Glyph kind={kind} />
    </span>
  )
}
