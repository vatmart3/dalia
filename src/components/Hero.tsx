import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ButtonLink } from './Button'
import { CssPhone } from './AppScreen'
import { IconCheck, IconSkip } from './Icons'
import { useInViewport } from '../hooks/useInViewport'
import { CTA_LABEL, CTA_TARGET, PILOT_AREA, PILOT_SEATS } from '../lib/config'

gsap.registerPlugin(ScrollTrigger)

type Stage = 0 | 1 | 2
const STEPS = ['Photo', 'Alerte', 'Promo']
const stageOf = (p: number): Stage => (p < 0.3 ? 0 : p < 0.68 ? 1 : 2)
// Autoplay (mobile) : durée de chaque étape. L'étape Photo laisse jouer un scan complet.
const STAGE_MS = [5200, 3400, 3400]
// Intro au scroll réservée aux écrans larges avec souris ; ailleurs elle joue toute seule.
const SCROLL_INTRO_QUERY = '(min-width: 900px) and (hover: hover) and (pointer: fine)'

type Mode = 'scroll' | 'auto' | 'static'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 120, damping: 20, delay },
})

export function Hero({ reducedMotion }: { reducedMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const [stage, setStage] = useState<Stage>(reducedMotion ? 2 : 0)
  const [introDone, setIntroDone] = useState(reducedMotion)
  const [mode, setMode] = useState<Mode>(reducedMotion ? 'static' : 'auto')
  const visible = useInViewport(stageRef, '0px')

  // Ordinateur : la section est épinglée pendant le scroll, le temps que le téléphone se redresse et montre l'alerte.
  // Mobile / tactile : pas d'épinglage (saccadé avec la barre d'adresse), l'intro joue toute seule.
  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const mm = gsap.matchMedia()
    mm.add({ desktop: SCROLL_INTRO_QUERY, reduce: '(prefers-reduced-motion: reduce)' }, (ctx) => {
      const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean }
      if (reduce) {
        setMode('static')
        setStage(2)
        setIntroDone(true)
        return
      }
      if (!desktop) {
        setMode('auto')
        setStage(0)
        setIntroDone(false)
        return
      }
      setMode('scroll')
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=120%',
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
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
    return () => mm.revert()
  }, [])

  // Autoplay : enchaîne Photo → Alerte → Promo en boucle tant que le téléphone est visible.
  useEffect(() => {
    if (mode !== 'auto' || !visible) return
    const timer = window.setTimeout(() => setStage(((stage + 1) % 3) as Stage), STAGE_MS[stage])
    return () => window.clearTimeout(timer)
  }, [mode, stage, visible])

  const goToStage = (i: Stage) => {
    const st = triggerRef.current
    if (mode === 'scroll' && st) {
      const target = i === 0 ? 0.05 : i === 1 ? 0.5 : 0.92
      window.scrollTo({ top: st.start + (st.end - st.start) * target, behavior: 'smooth' })
      return
    }
    setStage(i)
  }

  // Passe directement au contenu qui suit le hero.
  const skipIntro = () => {
    const st = triggerRef.current
    const next = sectionRef.current?.closest('.pin-spacer') ?? sectionRef.current
    const top = st ? st.end + 1 : (next?.getBoundingClientRect().bottom ?? window.innerHeight) + window.scrollY - 40
    if (mode !== 'scroll') {
      setStage(2)
      setIntroDone(true)
    }
    window.scrollTo({ top, behavior: mode === 'scroll' ? ('instant' as ScrollBehavior) : 'smooth' })
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
            Dalia veille, et votre <em>marge</em> ne part pas.
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
          {/* De face pour la photo, puis légèrement de biais pour l'alerte et la promo. */}
          <div className={`hero__phone hero__phone--s${stage}`} aria-hidden="true">
            <CssPhone stage={stage} />
          </div>
          {/* Petites étiquettes autour du téléphone (grands écrans) : elles s'allument au fil de la démo. */}
          <div className="hero__floats" aria-hidden="true">
            <span className={`float-card float-card--date ${stage === 0 ? 'is-on' : ''}`}>
              <span className="float-card__check">
                <IconCheck />
              </span>
              <span>
                <b>Date lue : 16/05</b>
                Yaourts nature × 12
              </span>
            </span>
            <span className={`float-tag ${stage >= 1 ? 'is-on' : ''}`}>−20 %</span>
            <span className={`float-card float-card--sold ${stage === 2 ? 'is-on' : ''}`}>
              <b>Vendu avant la date</b>
              Abricots, 1 cagette
            </span>
            <span className="hand-note hero__hand">la date est lue toute seule</span>
          </div>
          <p className="sr-only" aria-live="polite">
            {stage === 0 && 'L’appli Dalia photographie un pot de yaourt et lit sa date limite : 16 mai.'}
            {stage === 1 && 'Alerte Dalia : 12 yaourts expirent dans 2 jours, promo conseillée moins 20 %.'}
            {stage === 2 && 'Promo moins 20 % activée, étiquette envoyée à l’imprimante.'}
          </p>

          <ol className="hero__steps" aria-label="Étapes de la démonstration">
            {STEPS.map((label, i) => (
              <li key={label}>
                <button type="button" className={stage === i ? 'is-active' : ''} aria-current={stage === i ? 'step' : undefined} onClick={() => goToStage(i as Stage)}>
                  {stage === i && <motion.span layoutId="hero-step" className="hero__steps-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  {i + 1}. {label}
                </button>
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
