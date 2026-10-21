import type { CSSProperties } from 'react'

export type BlobSpec = {
  color: string
  size: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  duration?: number
  opacity?: number
  dx?: string
  dy?: string
}

/** Blobs de couleur qui ondulent en fond de section (CSS pur, figés si mouvement réduit). */
export function Blobs({ items }: { items: BlobSpec[] }) {
  return (
    <div className="blobs" aria-hidden="true">
      {items.map((b, i) => (
        <span
          key={i}
          className="blob"
          style={
            {
              '--c': b.color,
              '--s': b.size,
              '--d': `${b.duration ?? 12 + i * 3}s`,
              '--o': b.opacity ?? 1,
              '--dx': b.dx,
              '--dy': b.dy,
              top: b.top,
              left: b.left,
              right: b.right,
              bottom: b.bottom,
              animationDelay: `${-i * 2.3}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
