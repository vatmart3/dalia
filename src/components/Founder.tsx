import { Hl } from './Highlight'
import { Crate } from './etal/Crate'
import { ButtonLink } from './Button'
import { IconPhone } from './Icons'
import { FOUNDER } from '../lib/config'

/** « Qui est derrière Dalia » : un visage et un numéro direct, pour rassurer. */
export function Founder() {
  return (
    <Crate
      id="equipe"
      titleId="founder-title"
      className="panel--founder"
      tone="abricot"
      label="carton"
      eyebrow="Qui est derrière Dalia"
      title={
        <>
          Une personne d’ici, <Hl>pas un centre d’appels.</Hl>
        </>
      }
    >
      <div className="founder">
        <div className="founder__photo">
          {FOUNDER.photo ? <img src={FOUNDER.photo} alt={`Portrait de ${FOUNDER.name}`} width="220" height="220" /> : <span aria-hidden="true">{FOUNDER.name[0]}</span>}
        </div>
        <div>
          <p className="lead founder__text">
            Je m’appelle {FOUNDER.firstName}, je suis à Sète. Je viens installer Dalia dans votre boutique, je vous montre sur vos propres produits, et vous
            m’appelez directement si quelque chose coince.
          </p>
          <p className="founder__sign">
            <strong>{FOUNDER.name}</strong> · {FOUNDER.role}
          </p>
          <div className="founder__contact">
            <ButtonLink href={`tel:${FOUNDER.tel}`} variant="dark" arrow={false}>
              <IconPhone /> Appeler {FOUNDER.firstName}
            </ButtonLink>
            <ButtonLink href={`https://wa.me/${FOUNDER.whatsapp}`} variant="ghost" arrow={false} target="_blank" rel="noopener noreferrer">
              Écrire sur WhatsApp
            </ButtonLink>
          </div>
          <p className="founder__number">
            Ou notez le numéro : <span className="founder__select">{FOUNDER.phone}</span>
          </p>
        </div>
      </div>
    </Crate>
  )
}
