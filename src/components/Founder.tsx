import { Reveal } from './Reveal'
import { IconPhone } from './Icons'
import { FOUNDER } from '../lib/config'

/** « Qui est derrière Dalia » : un visage et un numéro direct, pour rassurer. */
export function Founder() {
  const initials = FOUNDER.name.slice(0, 1).toUpperCase()
  return (
    <section className="section section--soft" id="equipe" aria-labelledby="founder-title">
      <div className="wrap">
        <Reveal className="founder">
          <div className="founder__photo">
            {FOUNDER.photo ? <img src={FOUNDER.photo} alt={`Portrait de ${FOUNDER.name}`} width="240" height="240" /> : <span aria-hidden="true">{initials}</span>}
          </div>
          <div className="founder__body">
            <span className="eyebrow">Qui est derrière Dalia</span>
            <h2 id="founder-title" className="h2 founder__title">
              Une personne d’ici, <em>pas un centre d’appels.</em>
            </h2>
            <p className="lead founder__text">
              Je m’appelle {FOUNDER.firstName}, je suis à Sète. Je viens installer Dalia dans votre boutique, je vous montre sur vos propres produits, et vous
              m’appelez directement si quelque chose coince.
            </p>
            <p className="founder__sign">
              <strong>{FOUNDER.name}</strong> · {FOUNDER.role}
            </p>
            <div className="founder__contact">
              <a className="btn btn--ghost" href={`tel:${FOUNDER.tel}`}>
                <IconPhone />
                <span>{FOUNDER.phone}</span>
              </a>
              <a className="btn btn--ghost" href={`https://wa.me/${FOUNDER.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <span>Écrire sur WhatsApp</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
