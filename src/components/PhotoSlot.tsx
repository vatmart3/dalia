import type { CSSProperties } from 'react'

/**
 * Emplacement pour une vraie photo (commerce, fondateur).
 * Tant que `src` est vide, un cadre clairement marqué « Photo à remplacer » s'affiche.
 * Pas d'image générée par IA : uniquement des photos réelles, avec l'accord des personnes photographiées.
 */
export function PhotoSlot({ src, alt, what, className = '', style }: { src: string | null; alt: string; what: string; className?: string; style?: CSSProperties }) {
  return (
    <figure className={`photo-slot ${src ? 'photo-slot--filled' : ''} ${className}`} style={style}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <figcaption className="photo-slot__ph">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z" />
            <circle cx="12" cy="13" r="3.2" />
          </svg>
          <span className="photo-slot__tag">Photo à remplacer</span>
          <span className="photo-slot__what">{what}</span>
        </figcaption>
      )}
    </figure>
  )
}
