import { Reveal } from './Reveal'
import { PhotoSlot } from './PhotoSlot'
import { IconPhone } from './Icons'
import { FOUNDER } from '../lib/config'

/** « Qui est derrière Frescy » : une vraie personne, sa raison d'être, un numéro direct. */
export function Founder() {
  return (
    <section className="section section--soft" id="equipe" aria-labelledby="founder-title">
      <div className="wrap">
        <Reveal className="founder">
          <figure className="founder__quote">
            <blockquote>
              <p>
                « Je travaille dans la distribution de produits frais à Sète. Je vois tous les jours ce qui part à la poubelle. J’ai créé Frescy pour ça. »
              </p>
            </blockquote>
            <figcaption>
              <span className="founder__signature" aria-hidden="true">
                {FOUNDER.firstName}
              </span>
              <span className="founder__sign">
                <strong>{FOUNDER.name}</strong> · {FOUNDER.role}
              </span>
            </figcaption>
          </figure>

          <PhotoSlot className="founder__photo" width={800} height={1000} src={FOUNDER.photo} alt={`Portrait de ${FOUNDER.name}`} what={`Portrait de ${FOUNDER.firstName}, idéalement dans un commerce de Sète`} />

          <div className="founder__body">
            <span className="eyebrow">Qui est derrière Frescy</span>
            <h2 id="founder-title" className="h2 founder__title">
              Une personne d’<em>ici</em>, pas un centre d’appels.
            </h2>
            <p className="lead founder__text">
              Je m’appelle {FOUNDER.firstName}, je suis à Sète. Je viens installer Frescy dans votre boutique, je vous montre sur vos propres produits, et vous
              m’appelez directement si quelque chose coince.
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
