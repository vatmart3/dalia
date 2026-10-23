import type { CSSProperties, ReactNode } from 'react'

/**
 * Emplacement photo (commerce, fondateur, témoignage).
 * Avec `src` : la vraie photo (WebP, chargement différé, dimensions fixées pour éviter les sauts de mise en page).
 * Sans `src` : `fallback`, un visuel aux couleurs de Frescy, jamais un cadre vide.
 */
export function PhotoSlot({
  src,
  alt,
  fallback,
  width = 1200,
  height = 750,
  className = '',
  style,
}: {
  src: string | null
  alt: string
  fallback: ReactNode
  width?: number
  height?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <figure className={`photo-slot ${src ? '' : 'photo-slot--art'} ${className}`} style={style}>
      {src ? <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" /> : fallback}
    </figure>
  )
}

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

const SHOP_ICONS: Record<string, ReactNode> = {
  boulangerie: (
    <>
      <path d="M5 17c-1.5-1.5 0-4.5 3.5-8S15.5 4 17 5.5s0 4.5-3.5 8S6.5 18.5 5 17z" />
      <path d="M8.8 10.4l1.6 1.6M11.4 7.9l1.6 1.6M6.4 13l1.6 1.6" />
    </>
  ),
  boucherie: (
    <>
      <path d="M7 6c3-2.5 9-2 11 1.5s.5 8-3.5 10-7.5 1.5-9.5-1S4 8.5 7 6z" />
      <circle cx="10" cy="11.5" r="1.8" />
    </>
  ),
  epicerie: (
    <>
      <path d="M4 10h16l-1.6 8.2a1.5 1.5 0 0 1-1.5 1.3H7.1a1.5 1.5 0 0 1-1.5-1.3z" />
      <path d="M8 10l3-5M16 10l-3-5M9.5 13.5v3M14.5 13.5v3" />
    </>
  ),
  superette: (
    <>
      <path d="M3.5 5h2l2 10h10l2-7H7" />
      <circle cx="9.5" cy="18.5" r="1.3" />
      <circle cx="16.5" cy="18.5" r="1.3" />
    </>
  ),
}

/** Visuel d'attente d'un commerce : l'outil du métier, au trait, sur fond bleu très clair. */
export function ShopArt({ kind }: { kind: string }) {
  return (
    <div className="photo-art photo-art--shop" aria-hidden="true">
      <span className="photo-art__disc">
        <svg viewBox="0 0 24 24" {...stroke}>
          {SHOP_ICONS[kind] ?? SHOP_ICONS.epicerie}
        </svg>
      </span>
    </div>
  )
}

/** Visuel d'attente d'une personne : l'initiale, sur le bleu Frescy. */
export function PersonArt({ name, note }: { name: string; note?: string }) {
  return (
    <div className="photo-art photo-art--person" aria-hidden="true">
      <span className="photo-art__initial">{name.charAt(0)}</span>
      {note && <span className="photo-art__note">{note}</span>}
    </div>
  )
}
