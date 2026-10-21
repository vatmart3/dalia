import { Reveal } from './Reveal'
import { CtaRow } from './CtaRow'
import { AlertVisual, PhotoVisual, PromoVisual } from './StepVisuals'

const STEPS = [
  {
    title: 'Photographiez vos produits',
    text: 'À la livraison, une photo de l’étiquette suffit. Dalia lit la date limite toute seule. Pas de saisie, pas de tableur.',
    Visual: PhotoVisual,
  },
  {
    title: 'Dalia vous alerte avant la date',
    text: 'Une notification claire sur votre téléphone, quelques jours avant : quel produit, combien, où dans le magasin.',
    Visual: AlertVisual,
  },
  {
    title: 'Elle vous dit quoi mettre en promo',
    text: 'La bonne remise au bon moment, pour vendre avant la date au lieu de jeter. Vous validez d’un geste.',
    Visual: PromoVisual,
  },
]

export function HowItWorks() {
  return (
    <section className="section" id="comment-ca-marche" aria-labelledby="how-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Comment ça marche</span>
          <h2 id="how-title" className="h2">
            Trois gestes. Aucune <em>formation</em>.
          </h2>
        </div>
        <ol className="steps">
          {STEPS.map(({ title, text, Visual }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className={i === 0 ? 'steps__lead' : undefined}>
              <div className="step">
                <div className="step__visual">
                  <Visual />
                </div>
                <div className="step__body">
                  <span className="step__num" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <div>
                    <h3>
                      <span className="sr-only">Étape {i + 1} : </span>
                      {title}
                    </h3>
                    <p>{text}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
        <CtaRow note={<>Installation dans votre boutique, offerte.</>} />
      </div>
    </section>
  )
}
