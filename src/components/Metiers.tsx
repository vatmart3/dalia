import { Reveal } from './Reveal'
import { METIERS } from '../lib/metiers'
import { href } from '../lib/router'

/** Accueil : « Pour votre métier », avec un lien vers chaque page dédiée. */
export function Metiers() {
  return (
    <section className="section" id="metiers" aria-labelledby="metiers-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Pour votre métier</span>
          <h2 id="metiers-title" className="h2">
            Pensé pour les commerces <em>de proximité.</em>
          </h2>
        </div>
        <ul className="metiers">
          {METIERS.map((m, i) => (
            <Reveal as="li" key={m.slug} delay={i * 0.06}>
              <a className="card metier-card" href={href(m.slug)}>
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
