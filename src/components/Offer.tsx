import { Sticker } from './Sticker'
import { Crate } from './etal/Crate'
import { ButtonLink } from './Button'
import { IconCheck } from './Icons'
import { CTA_TARGET, PILOT_AREA, PILOT_SEATS, PRICE } from '../lib/config'
import { useEstimate } from '../lib/estimate'

const POINTS = ['Installation sur place, faite par nous', '1 mois complet gratuit', 'Sans engagement, sans carte bancaire', 'Accompagnement par téléphone inclus']

export function Offer() {
  const { weekly } = useEstimate()
  // Combien de jours de pertes représente l'abonnement ?
  const days = PRICE.monthly / (weekly / 7)
  const daysLabel = days <= 1 ? 'une journée' : `${Math.ceil(days)} jours`
  return (
    <Crate
      id="offre"
      titleId="offer-title"
      className="panel--offer"
      tone="aubergine"
      eyebrow="Offre pilote"
      title={<>Vous ne risquez rien. Vraiment.</>}
      lead={
        <p className="offer__promise">
          Installation sur place, 1 mois gratuit, sans engagement. <strong>Si vous n’économisez rien, vous arrêtez.</strong>
        </p>
      }
    >
      <div className="offer__side">
        <Sticker color="#FF5A3C" rotate={10} delay={0.35}>
          1 mois<small>offert</small>
        </Sticker>
        <div className="offer__price">
          <b>0 €</b>
          <span>pendant 1 mois</span>
        </div>
        <p className="offer__after">
          Ensuite <strong>{PRICE.monthly} {PRICE.unit}</strong>, sans engagement. Moins que ce que vous jetez en {daysLabel}.
        </p>
        <ul className="offer__list">
          {POINTS.map((p) => (
            <li key={p}>
              <IconCheck />
              {p}
            </li>
          ))}
        </ul>
        <ButtonLink href={CTA_TARGET} block>
          Je réserve ma place pilote
        </ButtonLink>
        <p className="offer__seats">
          {PILOT_SEATS} places pilotes à {PILOT_AREA}
        </p>
      </div>
    </Crate>
  )
}
