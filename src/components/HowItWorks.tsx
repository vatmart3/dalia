import { useMemo, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Crate } from './etal/Crate'
import { Yogurt } from './etal/Products'
import { CtaRow } from './CtaRow'
import { Hl } from './Highlight'
import { IconBell, IconCamera, IconTag } from './Icons'
import { useEtalMode } from './etal/Etal'
import { useClosestToCenter } from '../hooks/useClosestToCenter'

const STEPS = [
  {
    title: 'Photographiez vos produits',
    text: 'À la livraison, une photo de l’étiquette suffit. Dalia lit la date limite toute seule. Pas de saisie, pas de tableur.',
    Icon: IconCamera,
  },
  {
    title: 'Dalia vous alerte avant la date',
    text: 'Une notification claire sur votre téléphone, quelques jours avant : quel produit, combien, où dans le magasin.',
    Icon: IconBell,
  },
  {
    title: 'Elle vous dit quoi mettre en promo',
    text: 'La bonne remise au bon moment, pour vendre avant la date au lieu de jeter. Vous validez d’un geste.',
    Icon: IconTag,
  },
]

/** Ce qui arrive au pot de yaourt dans chaque cagette. */
function StepDecor({ step }: { step: number }) {
  if (step === 0)
    return (
      <span className="decor decor--frame" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <span className="decor__chip">16/05</span>
      </span>
    )
  if (step === 1)
    return (
      <span className="decor decor--alert" aria-hidden="true">
        <span className="decor__chip decor__chip--tomate">J-2</span>
      </span>
    )
  return (
    <span className="decor decor--promo" aria-hidden="true">
      <span className="decor__chip decor__chip--abricot">−20 %</span>
    </span>
  )
}

export function HowItWorks() {
  const mode = useEtalMode()
  const r0 = useRef<HTMLLIElement>(null)
  const r1 = useRef<HTMLLIElement>(null)
  const r2 = useRef<HTMLLIElement>(null)
  const refs = useMemo(() => [r0, r1, r2], [])
  const active = useClosestToCenter(refs)
  // Sur l'étal horizontal le pot glisse de gauche à droite ; sur mobile, de haut en bas.
  const from = mode === 'horizontal' ? { x: -140, y: 0 } : { x: 0, y: -90 }
  const to = mode === 'horizontal' ? { x: 140, y: 0 } : { x: 0, y: 90 }

  return (
    <Crate
      id="comment-ca-marche"
      titleId="how-title"
      className="panel--how"
      eyebrow="Comment ça marche"
      title={
        <>
          Trois gestes. <Hl>Aucune formation.</Hl>
        </>
      }
      aside={<CtaRow note={<>Installation dans votre boutique, offerte.</>} />}
    >
      <ol className="mini-crates">
        {STEPS.map(({ title, text, Icon }, i) => (
          <li key={title} ref={refs[i]} className={`mini-crate ${active === i ? 'is-active' : ''}`}>
            <div className="mini-crate__stage">
              <span className="mini-crate__num" aria-hidden="true">
                {i + 1}
              </span>
              <StepDecor step={i} />
              <AnimatePresence mode="popLayout" initial={false}>
                {active === i && (
                  <motion.span
                    key={`pot-${i}`}
                    className="mini-crate__pot"
                    initial={{ ...from, opacity: 0, rotate: -8 }}
                    animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                    exit={{ ...to, opacity: 0, rotate: 8 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                    aria-hidden="true"
                  >
                    <Yogurt size={64} />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <h3 className="mini-crate__title">
              <Icon />
              <span>
                <span className="sr-only">Étape {i + 1} : </span>
                {title}
              </span>
            </h3>
            <p>{text}</p>
          </li>
        ))}
      </ol>
    </Crate>
  )
}
