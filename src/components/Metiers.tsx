import { Reveal } from './Reveal'
import { PhotoSlot, ShopArt } from './PhotoSlot'
import { METIERS } from '../lib/metiers'
import { SHOP_PHOTOS, SHOP_PHOTO_SIZE } from '../lib/config'
import { href } from '../lib/router'

/** Accueil : « Pour votre métier », avec un lien vers chaque page dédiée. */
export function Metiers() {
  return (
    <section className="section" id="metiers" aria-labelledby="metiers-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Pour votre métier</span>
          <h2 id="metiers-title" className="h2">
            Pensé pour les commerces de <em>proximité</em>.
          </h2>
        </div>
        {/* Bento : deux grandes cases avec photo du commerce, deux petites en texte seul. */}
        <ul className="metiers">
          {METIERS.map((m, i) => (
            <Reveal as="li" key={m.slug} delay={i * 0.06} className={`metiers__item metiers__item--${i}`}>
              <a className="card metier-card" href={href(m.slug)}>
                {i < 2 && (
                  <PhotoSlot
                    className="metier-card__photo"
                    src={SHOP_PHOTOS[m.slug]}
                    {...SHOP_PHOTO_SIZE}
                    alt={`${m.name} équipée de Frescy`}
                    fallback={<ShopArt kind={m.slug} />}
                  />
                )}
                <span className="metier-card__name">{m.name}</span>
                <span className="metier-card__title">{m.title}</span>
                <span className="metier-card__more" aria-hidden="true">
                  Voir →
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
