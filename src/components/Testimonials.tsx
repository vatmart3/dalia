import { Reveal } from './Reveal'
import { CtaRow } from './CtaRow'
import { IconStar } from './Icons'

// ⚠️ Témoignages d'exemple : à remplacer par ceux des commerçants pilotes (avec leur accord et leur photo).
const QUOTES = [
  {
    text: 'Avant, je découvrais les yaourts périmés le samedi soir en faisant le rayon. Maintenant Dalia me prévient le mercredi, je les mets en promo et ils partent.',
    name: 'Martine R.',
    shop: 'Épicerie du Port · Sète',
    initials: 'MR',
    color: '#0B63CE',
  },
  {
    text: 'Les applis, ce n’est pas mon truc. Là, je prends la photo et c’est tout. Ils sont venus l’installer, en une matinée c’était réglé.',
    name: 'Karim B.',
    shop: 'Boucherie des Halles · Mèze',
    initials: 'KB',
    color: '#13804C',
  },
  {
    text: 'Les promos de fin de journée, je les faisais au feeling. Dalia me dit quoi baisser et de combien. Je jette beaucoup moins de viennoiseries.',
    name: 'Sophie L.',
    shop: 'Boulangerie · Marseillan',
    initials: 'SL',
    color: '#062B5B',
  },
]

export function Testimonials() {
  return (
    <section className="section" aria-labelledby="quotes-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Bassin de Thau</span>
          <h2 id="quotes-title" className="h2">
            Des commerçants d’ici, <em>pas des promesses.</em>
          </h2>
        </div>
        <ul className="quotes__list">
          {QUOTES.map((q, i) => (
            <Reveal as="li" key={q.name} delay={i * 0.08}>
              <figure className="card quote">
                <div className="quote__stars" aria-label="5 sur 5">
                  {Array.from({ length: 5 }, (_, k) => (
                    <IconStar key={k} />
                  ))}
                </div>
                <blockquote>« {q.text} »</blockquote>
                <figcaption>
                  {/* Remplacer par <img className="quote__photo" src="…" alt="" /> */}
                  <span className="quote__photo" style={{ background: q.color }} aria-hidden="true">
                    {q.initials}
                  </span>
                  <span>
                    <span className="quote__name">{q.name}</span>
                    <span className="quote__shop">{q.shop}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
        <p className="quotes__note">Témoignages d’illustration, programme pilote en cours dans le bassin de Thau.</p>
        <CtaRow note={<>Rejoignez les premiers commerces pilotes <strong>du bassin de Thau</strong>.</>} />
      </div>
    </section>
  )
}
