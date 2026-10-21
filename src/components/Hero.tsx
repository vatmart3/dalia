import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ButtonLink } from './Button'
import { AppScreen, CssPhone } from './AppScreen'
import { ErrorBoundary } from './ErrorBoundary'
import { IconSkip } from './Icons'
import { useWebGL } from '../hooks/useWebGL'
import { useInViewport } from '../hooks/useInViewport'
import { CTA_LABEL, CTA_TARGET, PILOT_AREA, PILOT_SEATS } from '../lib/config'

gsap.registerPlugin(ScrollTrigger)

const PhoneScene = lazy(() => import('../three/PhoneScene'))

type Stage = 0 | 1 | 2
const STEPS = ['Photo', 'Alerte', 'Promo']
const stageOf = (p: number): Stage => (p < 0.3 ? 0 : p < 0.68 ? 1 : 2)

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 120, damping: 20, delay },
})

export function Hero({ reducedMotion }: { reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const progress = useRef(0)
  const [stage, setStage] = useState<Stage>(reducedMotion ? 2 : 0)
  const [introDone, setIntroDone] = useState(reducedMotion)
  const webgl = useWebGL()
  // Élément DOM de l'écran, projeté sur le téléphone 3D par la scène.
  const [screenEl] = useState(() => {
    const el = document.createElement('div')
    el.setAttribute('aria-hidden', 'true')
    return el
  })
  const visible = useInViewport(stageRef, '0px')

  // Intro au scroll : la section est épinglée le temps que le téléphone se redresse et montre l'alerte.
  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      ScrollTrigger.config({ ignoreMobileResize: true })
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        // Sur mobile, le hero est plus haut que l'écran : on épingle quand le téléphone est entièrement visible.
        start: 'bottom bottom',
        end: '+=120%',
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          progress.current = self.progress
          setStage(stageOf(self.progress))
          setIntroDone(self.progress > 0.97)
        },
      })
      triggerRef.current = st
      return () => {
        triggerRef.current = null
        st.kill()
      }
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      progress.current = 1
      setStage(2)
      setIntroDone(true)
    })
    return () => mm.revert()
  }, [])

  const skipIntro = () => {
    const st = triggerRef.current
    window.scrollTo({ top: st ? st.end + 1 : window.innerHeight, behavior: 'instant' as ScrollBehavior })
  }

  return (
    <section ref={sectionRef} className="hero" id="top" aria-labelledby="hero-title">
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <motion.p className="badge" {...fadeUp(0)}>
            <span className="badge__dot" aria-hidden="true" />
            {PILOT_SEATS} places pilotes à {PILOT_AREA}
          </motion.p>
          <motion.h1 id="hero-title" className="h1" {...fadeUp(0.08)}>
            Dalia veille, et <em>votre marge</em> ne part pas.
          </motion.h1>
          <motion.p className="lead hero__sub" {...fadeUp(0.16)}>
            L’appli qui surveille vos dates limites et transforme vos invendus en ventes.
          </motion.p>
          <motion.div className="cta-row" {...fadeUp(0.24)}>
            <ButtonLink href={CTA_TARGET}>{CTA_LABEL}</ButtonLink>
            <ButtonLink href="#calculateur" variant="ghost" arrow={false}>
              Calculer mes pertes
            </ButtonLink>
          </motion.div>
          <motion.p className="cta-note" style={{ marginTop: '1rem' }} {...fadeUp(0.3)}>
            <strong>1 mois offert</strong>, installation faite par nous. Sans engagement.
          </motion.p>
        </div>

        <motion.div
          ref={stageRef}
          className="hero__stage"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.2 }}
        >
          {webgl ? (
            <ErrorBoundary fallback={<CssPhone stage={stage} />}>
              <Suspense fallback={<CssPhone stage={stage} />}>
                <PhoneScene progress={progress} reducedMotion={reducedMotion} active={visible} screen={screenEl} />
              </Suspense>
              {createPortal(<AppScreen stage={stage} />, screenEl)}
            </ErrorBoundary>
          ) : (
            <CssPhone stage={stage} />
          )}
          <p className="sr-only" aria-live="polite">
            {stage === 0 && 'L’appli Dalia photographie un pot de yaourt et lit sa date limite : 16 mai.'}
            {stage === 1 && 'Alerte Dalia : 12 yaourts expirent dans 2 jours, promo conseillée moins 20 %.'}
            {stage === 2 && 'Promo moins 20 % activée, étiquette envoyée à l’imprimante.'}
          </p>

          <ol className="hero__steps" aria-hidden="true">
            {STEPS.map((label, i) => (
              <li key={label} className={stage === i ? 'is-active' : ''}>
                {stage === i && <motion.span layoutId="hero-step" className="hero__steps-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                {i + 1}. {label}
              </li>
            ))}
          </ol>
        </motion.div>
      </div>

      <AnimatePresence>
        {!introDone && (
          <motion.button
            type="button"
            className="skip-intro"
            onClick={skipIntro}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            Passer l’intro
            <IconSkip />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  )
}
