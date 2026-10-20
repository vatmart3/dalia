import { Reveal } from './Reveal'
import { ButtonLink } from './Button'
import { IconCheck } from './Icons'
import { CTA_TARGET, PILOT_AREA, PILOT_SEATS } from '../lib/config'

const POINTS = ['Installation sur place, faite par nous', '1 mois complet gratuit', 'Sans engagement, sans carte bancaire', 'Accompagnement par téléphone inclus']

export function Offer() {
  return (
    <section className="section" id="offre" aria-labelledby="offer-title">
      <div className="wrap">
        <Reveal className="offer__card" y={40}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span className="eyebrow">Offre pilote</span>
            <h2 id="offer-title" className="offer__title">
              Vous ne risquez rien. Vraiment.
            </h2>
            <p className="offer__promise">
              Installation sur place, 1 mois gratuit, sans engagement. <strong>Si vous n’économisez rien, vous arrêtez.</strong>
            </p>
          </div>
          <div className="offer__side">
            <div className="offer__price">
              <b>0 €</b>
              <span>pendant 1 mois</span>
            </div>
            <ul className="offer__list">
              {POINTS.map((p) => (
                <li key={p}>
                  <IconCheck />
                  {p}
                </li>
              ))}
            </ul>
            <ButtonLink href={CTA_TARGET} variant="white" block>
              Je réserve ma place pilote
            </ButtonLink>
            <p className="offer__seats">
              <span className="badge__dot" aria-hidden="true" />
              {PILOT_SEATS} places pilotes à {PILOT_AREA}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
