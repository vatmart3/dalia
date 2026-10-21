import type { ReactNode } from 'react'

type Props = {
  id?: string
  titleId: string
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  aside?: ReactNode
  /** Couleur du fond de la cagette. */
  tone?: 'creme' | 'abricot' | 'menthe' | 'tomate' | 'aubergine'
  /** Étiquette-titre : ardoise (craie) ou carton. */
  label?: 'ardoise' | 'carton'
  /** Classe de largeur sur l'étal (ordinateur). */
  className?: string
  children: ReactNode
}

/**
 * Une section = une cagette en bois posée sur l'étal.
 * Colonne de gauche : l'étiquette-titre + le texte d'intro ; à droite : le contenu.
 */
export function Crate({ id, titleId, eyebrow, title, lead, aside, tone = 'creme', label = 'ardoise', className = '', children }: Props) {
  return (
    <section className={`panel ${className}`} id={id} aria-labelledby={titleId}>
      <div className={`crate crate--${tone}`}>
        <div className="crate__side">
          <div className={`label label--${label}`}>
            {eyebrow && <span className="label__eyebrow">{eyebrow}</span>}
            <h2 id={titleId} className="h2">
              {title}
            </h2>
          </div>
          {lead && <div className="crate__lead">{lead}</div>}
          {aside}
        </div>
        <div className="crate__body">{children}</div>
        <div className="crate__slats" aria-hidden="true">
          <i />
          <i />
        </div>
      </div>
    </section>
  )
}
