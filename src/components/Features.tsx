import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CssPhone } from './AppScreen'
import { CtaRow } from './CtaRow'
import { Crate } from './etal/Crate'
import { Hl } from './Highlight'
import { IconBell, IconPhone, IconPrinter, IconTag } from './Icons'
import { useInViewport } from '../hooks/useInViewport'

const FEATURES = [
  { Icon: IconBell, title: 'Ce qui expire, en premier', text: 'Les produits à traiter aujourd’hui, en haut de l’écran. Rien d’autre.' },
  { Icon: IconTag, title: 'La remise déjà calculée', text: 'Dalia propose le bon pourcentage selon le produit et le délai restant.' },
  { Icon: IconPrinter, title: 'L’étiquette prête à imprimer', text: 'Un geste et l’étiquette promo part à l’imprimante du magasin.' },
  { Icon: IconPhone, title: 'Aussi simple que vos SMS', text: 'Fonctionne sur n’importe quel smartphone, sans ordinateur.' },
]

type Stage = 0 | 1 | 2
const STEPS = ['Photo', 'Alerte', 'Promo']
const STAGE_MS = [5200, 3400, 3400]

export function Features({ reducedMotion }: { reducedMotion: boolean }) {
  const phoneRef = useRef<HTMLDivElement>(null)
  const visible = useInViewport(phoneRef, '0px')
  const [stage, setStage] = useState<Stage>(reducedMotion ? 2 : 0)

  // Démo de l'appli : Photo → Alerte → Promo en boucle, en pause hors écran.
  useEffect(() => {
    if (reducedMotion || !visible) return
    const timer = window.setTimeout(() => setStage(((stage + 1) % 3) as Stage), STAGE_MS[stage])
    return () => window.clearTimeout(timer)
  }, [reducedMotion, stage, visible])

  return (
    <Crate
      id="appli"
      titleId="features-title"
      className="panel--features"
      tone="aubergine"
      label="carton"
      eyebrow="L’appli"
      title={
        <>
          Une alerte claire. <Hl>Au bon moment.</Hl>
        </>
      }
      aside={<CtaRow />}
    >
      <div className="features__wrap">
        <div ref={phoneRef} className="features__phone">
          <CssPhone stage={stage} />
          <p className="sr-only" aria-live="polite">
            {stage === 0 && 'L’appli Dalia photographie un pot de yaourt et lit sa date limite : 16 mai.'}
            {stage === 1 && 'Alerte Dalia : 12 yaourts expirent dans 2 jours, promo conseillée moins 20 %.'}
            {stage === 2 && 'Promo moins 20 % activée, étiquette envoyée à l’imprimante.'}
          </p>
          <ol className="demo-steps" aria-label="Étapes de la démonstration">
            {STEPS.map((label, i) => (
              <li key={label}>
                <button type="button" aria-current={stage === i ? 'step' : undefined} onClick={() => setStage(i as Stage)}>
                  {stage === i && <motion.span layoutId="demo-step" className="demo-steps__pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                  {i + 1}. {label}
                </button>
              </li>
            ))}
          </ol>
        </div>
        <ul className="features__list">
          {FEATURES.map(({ Icon, title, text }) => (
            <li key={title} className="feature">
              <span className="feature__icon">
                <Icon />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Crate>
  )
}
