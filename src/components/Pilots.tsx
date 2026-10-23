import { Reveal } from './Reveal'
import { CtaRow } from './CtaRow'
import { SeatsCounter } from './SeatsCounter'
import { PILOT_AREA, PILOT_SEATS } from '../lib/config'

const ADVANTAGES = [
  { title: 'Installation offerte', text: 'On vient dans votre boutique, on installe Frescy et on vous montre sur vos propres produits.' },
  { title: '1 mois gratuit', text: 'Un mois complet pour mesurer ce que vous économisez, sans engagement ni carte bancaire.' },
  { title: 'Prix pilote garanti', text: 'Le tarif de lancement reste le vôtre, même quand Frescy sera ouverte à tous.' },
]

/** Bloc « commerces pilotes » (remplace les témoignages tant qu'il n'y en a pas de vrais). */
export function Pilots() {
  return (
    <section className="section" id="pilotes" aria-labelledby="pilots-title">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <span className="eyebrow">Programme pilote · {PILOT_AREA}</span>
            <h2 id="pilots-title" className="h2">
              Devenez l’un des {PILOT_SEATS} commerces pilotes du <em>bassin de Thau</em>.
            </h2>
          </div>
          <div>
            <p className="lead">Pas de faux avis ici : Frescy démarre avec des commerces du coin, qui l’essaient et la façonnent avec nous.</p>
            <SeatsCounter className="pilots__seats" />
          </div>
        </div>
        <ol className="pilots__list">
          {ADVANTAGES.map(({ title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className="pilot">
              <span className="pilot__num" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ol>
        <CtaRow />
      </div>
    </section>
  )
}
