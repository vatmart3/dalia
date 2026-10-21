import { Reveal } from './Reveal'
import { Hl } from './Highlight'
import { CtaRow } from './CtaRow'
import { Blobs } from './Blobs'
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
    <section className="section sheet sheet--creme" id="comment-ca-marche" aria-labelledby="how-title">
      <Blobs items={[{ color: 'var(--menthe)', size: '240px', top: '10%', right: '-100px', opacity: 0.35 }]} />
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Comment ça marche</span>
          <h2 id="how-title" className="h2">
            Trois gestes. <Hl>Aucune formation.</Hl>
          </h2>
        </div>
        <ol className="steps">
          {STEPS.map(({ title, text, Visual }, i) => (
            <Reveal as="li" key={title} delay={i * 0.12} y={80} rotate={[-1.5, 1.2, -0.8][i]}>
              <div className="card step">
                <div className="step__visual">
                  <Visual />
                </div>
                <span className="step__num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>
                  <span className="sr-only">Étape {i + 1} : </span>
                  {title}
                </h3>
                <p>{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
        <CtaRow note={<>Installation dans votre boutique, offerte.</>} />
      </div>
    </section>
  )
}
