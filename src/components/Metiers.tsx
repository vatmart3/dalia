import type { CSSProperties, ReactNode } from 'react'
import { Crate } from './etal/Crate'
import { Apricots, Baguette, Tray, Yogurt } from './etal/Products'
import { Hl } from './Highlight'
import { METIERS } from '../lib/metiers'
import { href, type MetierSlug } from '../lib/router'

// Chaque stand a son auvent et sa marchandise.
const STAND: Record<MetierSlug, { stripe: string; goods: ReactNode }> = {
  boulangerie: { stripe: 'var(--abricot)', goods: <Baguette size={116} /> },
  boucherie: { stripe: 'var(--tomate)', goods: <Tray size={96} /> },
  epicerie: { stripe: 'var(--menthe)', goods: <Apricots size={100} /> },
  superette: { stripe: 'var(--aubergine)', goods: <Yogurt size={58} /> },
}

/** Accueil : « Pour votre métier », un stand par commerce, chacun mène à sa page. */
export function Metiers() {
  return (
    <Crate
      id="metiers"
      titleId="metiers-title"
      className="panel--metiers"
      tone="creme"
      label="carton"
      eyebrow="Pour votre métier"
      title={
        <>
          Pensé pour les commerces <Hl>de proximité.</Hl>
        </>
      }
    >
      <ul className="stands">
        {METIERS.map((m) => (
          <li key={m.slug}>
            <a className="stand" href={href(m.slug)} style={{ '--stripe': STAND[m.slug].stripe } as CSSProperties}>
              <span className="stand__awning" aria-hidden="true" />
              <span className="stand__name">{m.name}</span>
              <span className="stand__goods" aria-hidden="true">
                {STAND[m.slug].goods}
              </span>
              <span className="stand__counter">
                <span className="stand__title">{m.title}</span>
                <span className="stand__more" aria-hidden="true">
                  Voir →
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Crate>
  )
}
