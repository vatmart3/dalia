import type { CSSProperties } from 'react'
import { Reveal } from './Reveal'
import { CtaRow } from './CtaRow'
import { Blobs } from './Blobs'
import { PILOT_SEATS } from '../lib/config'

const ADVANTAGES = [
  { title: 'Installation offerte', text: 'On vient dans votre boutique, on installe Dalia et on vous montre sur vos propres produits.' },
  { title: '1 mois gratuit', text: 'Un mois complet pour mesurer ce que vous économisez, sans engagement ni carte bancaire.' },
  { title: 'Prix pilote garanti', text: 'Le tarif de lancement reste le vôtre, même quand Dalia sera ouverte à tous.' },
]

/** Bloc « commerces pilotes » (remplace les témoignages tant qu'il n'y en a pas de vrais). */
export function Pilots() {
  return (
    <section className="section sheet sheet--creme" id="pilotes" aria-labelledby="pilots-title">
      <Blobs items={[{ color: 'var(--abricot)', size: '280px', top: '-60px', right: '-100px', opacity: 0.4 }]} />
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Bassin de Thau</span>
          <h2 id="pilots-title" className="h2">
            Devenez l’un des {PILOT_SEATS} commerces pilotes <span className="blobword">du bassin de Thau</span>
          </h2>
        </div>
        <ul className="pilots__list">
          {ADVANTAGES.map((a, i) => (
            <Reveal as="li" key={a.title} className="pilot" delay={i * 0.12} y={80}>
              <div className="tag" style={{ '--tilt': ['-4deg', '3deg', '-2deg'][i] } as CSSProperties}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="pilots__seats">
          <span className="seat-dots" aria-hidden="true">
            {Array.from({ length: PILOT_SEATS }, (_, i) => (
              <i key={i} />
            ))}
          </span>
          {PILOT_SEATS} places, pas une de plus.
        </p>
        <CtaRow label="Je réserve ma place pilote" />
      </div>
    </section>
  )
}
