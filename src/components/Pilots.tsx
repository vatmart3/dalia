import type { CSSProperties } from 'react'
import { Crate } from './etal/Crate'
import { CtaRow } from './CtaRow'
import { Hl } from './Highlight'
import { PILOT_SEATS } from '../lib/config'

const ADVANTAGES = [
  { title: 'Installation offerte', text: 'On vient dans votre boutique, on installe Dalia et on vous montre sur vos propres produits.' },
  { title: '1 mois gratuit', text: 'Un mois complet pour mesurer ce que vous économisez, sans engagement ni carte bancaire.' },
  { title: 'Prix pilote garanti', text: 'Le tarif de lancement reste le vôtre, même quand Dalia sera ouverte à tous.' },
]

/** Le grand panneau « 10 places pilotes » (sans jauge : on n'invente pas de places prises). */
export function Pilots() {
  return (
    <Crate
      id="pilotes"
      titleId="pilots-title"
      className="panel--pilots"
      tone="creme"
      eyebrow="Bassin de Thau"
      title={
        <>
          Devenez l’un des {PILOT_SEATS} commerces pilotes <Hl>du bassin de Thau</Hl>
        </>
      }
      aside={<CtaRow label="Je réserve ma place pilote" />}
    >
      <div className="pilots">
        <div className="signboard" aria-hidden="true">
          <span className="signboard__num">{PILOT_SEATS}</span>
          <span className="signboard__text">places pilotes</span>
        </div>
        <p className="pilots__seats">{PILOT_SEATS} places, pas une de plus.</p>
        <ul className="pilots__list">
          {ADVANTAGES.map((a, i) => (
            <li key={a.title} className="kraft" style={{ '--tilt': ['-3deg', '2deg', '-1.5deg'][i] } as CSSProperties}>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Crate>
  )
}
