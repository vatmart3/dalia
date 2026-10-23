import { Reveal } from './Reveal'
import { PersonArt, PhotoSlot } from './PhotoSlot'
import { TEMOIGNAGES, showTemoignages } from '../lib/config'

/** « Ils ont déjà économisé » : masquée tant que showTemoignages vaut false (src/lib/config.ts). */
export function Temoignages() {
  if (!showTemoignages || TEMOIGNAGES.length === 0) return null
  return (
    <section className="section section--soft" id="temoignages" aria-labelledby="temoignages-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Premiers résultats</span>
          <h2 id="temoignages-title" className="h2">
            Ils ont déjà <em>économisé</em>.
          </h2>
        </div>
        <ul className="temoignages">
          {TEMOIGNAGES.map((t, i) => (
            <Reveal as="li" key={t.shop} delay={i * 0.08} className="card temoignage">
              <PhotoSlot className="temoignage__photo" src={t.photo} width={400} height={400} alt={`${t.shop}, ${t.city}`} fallback={<PersonArt name={t.shop} />} />
              <p className="temoignage__amount display">{t.amount}</p>
              <blockquote className="temoignage__quote">« {t.quote} »</blockquote>
              <p className="temoignage__shop">
                <strong>{t.shop}</strong> · {t.city}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
