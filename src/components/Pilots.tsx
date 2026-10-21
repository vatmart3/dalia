import { Reveal } from './Reveal'
import { CtaRow } from './CtaRow'
import { IconClock, IconHome, IconShield } from './Icons'
import { PILOT_AREA, PILOT_SEATS } from '../lib/config'

const ADVANTAGES = [
  { icon: IconHome, title: 'Installation offerte', text: 'On vient dans votre boutique, on installe Dalia et on vous montre sur vos propres produits.' },
  { icon: IconClock, title: '1 mois gratuit', text: 'Un mois complet pour mesurer ce que vous économisez, sans engagement ni carte bancaire.' },
  { icon: IconShield, title: 'Prix pilote garanti', text: 'Le tarif de lancement reste le vôtre, même quand Dalia sera ouverte à tous.' },
]

/** Bloc « commerces pilotes » (remplace les témoignages tant qu'il n'y en a pas de vrais). */
export function Pilots() {
  return (
    <section className="section" id="pilotes" aria-labelledby="pilots-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Programme pilote · {PILOT_AREA}</span>
          <h2 id="pilots-title" className="h2">
            Devenez l’un des {PILOT_SEATS} commerces pilotes <em>du bassin de Thau.</em>
          </h2>
        </div>
        <ul className="pilots__list">
          {ADVANTAGES.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08}>
              <div className="card pilot">
                <span className="pilot__icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
        <CtaRow label="Je réserve ma place pilote" />
      </div>
    </section>
  )
}
