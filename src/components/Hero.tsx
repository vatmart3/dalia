import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { ButtonLink } from './Button'
import { CssPhone } from './AppScreen'
import { Apricot, Baguette, Eggplant, MintLeaf, Tomato } from './Fruits'
import { useInViewport } from '../hooks/useInViewport'
import { CTA_LABEL, CTA_TARGET, PILOT_AREA, PILOT_SEATS } from '../lib/config'

type Stage = 0 | 1 | 2
const STEPS = ['Photo', 'Alerte', 'Promo']
// Durée de chaque étape : l'étape Photo laisse jouer un scan complet.
const STAGE_MS = [5200, 3400, 3400]

const word = {
  hidden: { y: '110%', rotate: 6, opacity: 0 },
  show: (i: number) => ({
    y: '0%',
    rotate: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 14, delay: 0.1 + i * 0.09 },
  }),
}

/** Élément flottant : ondule doucement (CSS) et suit un peu la souris (profondeur `depth`). */
function Float({
  mx,
  my,
  depth,
  style,
  bob = 6,
  r0 = -4,
  r1 = 5,
  back = false,
  children,
}: {
  mx: MotionValue<number>
  my: MotionValue<number>
  depth: number
  style: CSSProperties
  bob?: number
  r0?: number
  r1?: number
  back?: boolean
  children: ReactNode
}) {
  const x = useTransform(mx, (v) => v * depth * 28)
  const y = useTransform(my, (v) => v * depth * 22)
  return (
    <motion.div className={`float ${back ? 'float--back' : ''}`} style={{ ...style, x, y }} aria-hidden="true">
      <div className="float__inner" style={{ '--bob': `${bob}s`, '--r0': `${r0}deg`, '--r1': `${r1}deg`, '--delay': `${-bob / 3}s` } as CSSProperties}>
        {children}
      </div>
    </motion.div>
  )
}

export function Hero({ reducedMotion }: { reducedMotion: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null)
  const [stage, setStage] = useState<Stage>(reducedMotion ? 2 : 0)
  const visible = useInViewport(stageRef, '0px')

  // Souris → parallaxe douce (ressort), désactivée si mouvement réduit.
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const mx = useSpring(rawX, { stiffness: 60, damping: 18 })
  const my = useSpring(rawY, { stiffness: 60, damping: 18 })
  useEffect(() => {
    if (reducedMotion) return
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      rawX.set((e.clientX / window.innerWidth) * 2 - 1)
      rawY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reducedMotion, rawX, rawY])

  // Démo de l'appli : Photo → Alerte → Promo en boucle, en pause hors écran.
  useEffect(() => {
    if (reducedMotion || !visible) return
    const timer = window.setTimeout(() => setStage(((stage + 1) % 3) as Stage), STAGE_MS[stage])
    return () => window.clearTimeout(timer)
  }, [reducedMotion, stage, visible])

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <motion.p
            className="badge"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 12 }}
          >
            <span className="badge__dot" aria-hidden="true" />
            {PILOT_SEATS} places pilotes à {PILOT_AREA}
          </motion.p>
          <h1 id="hero-title" className="h1 hero__title">
            {[
              <>Dalia veille,</>,
              <span className="tilt">
                et votre <span className="blobword">marge</span>
              </span>,
              <span className="outline">ne part pas.</span>,
            ].map((content, i) => (
              <span key={i} className="line" style={{ overflow: 'hidden', padding: '0.14em 0.3em 0.1em 0', margin: '-0.14em -0.3em -0.02em 0' }}>
                <motion.span style={{ display: 'inline-block' }} variants={word} initial="hidden" animate="show" custom={i}>
                  {content}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="lead hero__sub"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.45 }}
          >
            L’appli qui surveille vos dates limites et transforme vos invendus en ventes.
          </motion.p>
          <motion.div
            className="cta-row"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.6 }}
          >
            <ButtonLink href={CTA_TARGET}>{CTA_LABEL}</ButtonLink>
            <ButtonLink href="#calculateur" variant="ghost" arrow={false}>
              Calculer mes pertes
            </ButtonLink>
          </motion.div>
          <motion.p className="cta-note" style={{ marginTop: '1rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <strong>1 mois offert</strong>, installation faite par nous. Sans engagement.
          </motion.p>
        </div>

        <div ref={stageRef} className="hero__stage">
          <motion.div
            className="hero__disc"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.15 }}
            aria-hidden="true"
          />

          <Float mx={mx} my={my} depth={-0.6} back style={{ left: '2%', top: '30%' }} bob={7} r0={-12} r1={-4}>
            <Eggplant size={118} />
          </Float>
          <Float mx={mx} my={my} depth={0.5} back style={{ right: '4%', top: '4%' }} bob={8} r0={10} r1={18}>
            <Baguette size={150} />
          </Float>

          <motion.div
            className="hero__phone"
            initial={{ y: 80, opacity: 0, rotate: 6 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 14, delay: 0.3 }}
          >
            <CssPhone stage={stage} />
          </motion.div>

          <Float mx={mx} my={my} depth={1.2} style={{ left: '6%', top: '6%' }} bob={5.5}>
            <Tomato size={92} />
          </Float>
          <Float mx={mx} my={my} depth={1} style={{ right: '3%', bottom: '18%' }} bob={6.5} r0={6} r1={-6}>
            <Apricot size={86} />
          </Float>
          <Float mx={mx} my={my} depth={0.8} style={{ left: '4%', bottom: '24%' }} bob={5} r0={-18} r1={-8}>
            <MintLeaf size={62} />
          </Float>
          <Float mx={mx} my={my} depth={1.5} style={{ right: '6%', top: '30%' }} bob={4.5} r0={8} r1={14}>
            <span className="price-chip">−20 %</span>
          </Float>
          <Float mx={mx} my={my} depth={1.3} style={{ left: '10%', bottom: '10%' }} bob={5.2} r0={-10} r1={-3}>
            <span className="price-chip" style={{ background: 'var(--menthe)' }}>
              J-2
            </span>
          </Float>

          <p className="sr-only" aria-live="polite">
            {stage === 0 && 'L’appli Dalia photographie un pot de yaourt et lit sa date limite : 16 mai.'}
            {stage === 1 && 'Alerte Dalia : 12 yaourts expirent dans 2 jours, promo conseillée moins 20 %.'}
            {stage === 2 && 'Promo moins 20 % activée, étiquette envoyée à l’imprimante.'}
          </p>

          <ol className="hero__steps" aria-label="Étapes de la démonstration">
            {STEPS.map((label, i) => (
              <li key={label}>
                <button type="button" aria-current={stage === i ? 'step' : undefined} onClick={() => setStage(i as Stage)}>
                  {stage === i && <motion.span layoutId="hero-step" className="hero__steps-pill" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                  {i + 1}. {label}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
