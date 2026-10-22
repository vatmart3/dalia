import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ButtonLink } from './Button'
import { CssPhone } from './AppScreen'
import { IconCheck, IconSkip } from './Icons'
import { CTA_LABEL, CTA_TARGET, PILOT_AREA, PILOT_SEATS } from '../lib/config'

gsap.registerPlugin(ScrollTrigger)

type Stage = 0 | 1 | 2
const STEPS = ['Photo', 'Alerte', 'Promo']
const stageOf = (p: number): Stage => (p < 0.3 ? 0 : p < 0.68 ? 1 : 2)
// Lecture automatique (mobile, tactile) : durée de chaque étape, et pause après un toucher sur un onglet.
const AUTO_MS = 3000
const RESUME_AFTER_TAP_MS = 6000
// Taille réelle de la maquette (écran 340 × 736 + verre + cadre), avant mise à l'échelle.
const PHONE_W = 364
const PHONE_H = 760
// Intro au scroll réservée aux écrans larges avec souris ; ailleurs elle joue toute seule.
const SCROLL_INTRO_QUERY = '(min-width: 900px) and (hover: hover) and (pointer: fine)'

type Mode = 'scroll' | 'auto' | 'static'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: 'spring' as const, stiffness: 120, damping: 20, delay },
})

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const [stage, setStage] = useState<Stage>(0)
  const [introDone, setIntroDone] = useState(false)
  const [mode, setMode] = useState<Mode>('auto')
  const [inView, setInView] = useState(false)
  // Après un toucher sur un onglet, la boucle attend 6 s avant de reprendre.
  const [holdMs, setHoldMs] = useState(0)
  const [loopKey, setLoopKey] = useState(0)

  // Ordinateur : la section est épinglée pendant le scroll, le temps que le téléphone se redresse et montre l'alerte.
  // Mobile / tactile : pas d'épinglage (saccadé avec la barre d'adresse), l'intro joue toute seule.
  useLayoutEffect(() => {
    if (!sectionRef.current) return
    const mm = gsap.matchMedia()
    mm.add({ desktop: SCROLL_INTRO_QUERY, reduce: '(prefers-reduced-motion: reduce)' }, (ctx) => {
      const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean }
      // Bureau + mouvement réduit : pas d'épinglage, écran final, onglets cliquables.
      if (desktop && reduce) {
        setMode('static')
        setStage(2)
        setIntroDone(true)
        return
      }
      // Mobile / tactile : boucle automatique, même en mouvement réduit (les étapes changent alors sans transition).
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

  // La boucle ne tourne que quand la maquette est à l'écran (pause hors écran).
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    // Démarre quand la maquette est visible à 30 %, pause dès qu'elle sort de l'écran.
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.3), {
      threshold: [0, 0.3],
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Lecture automatique : Photo → Alerte → Promo, 3 s par étape, en boucle.
  useEffect(() => {
    if (mode !== 'auto' || !inView) return
    const timer = window.setTimeout(() => {
      setHoldMs(0)
      setStage((s) => ((s + 1) % 3) as Stage)
    }, holdMs || AUTO_MS)
    return () => window.clearTimeout(timer)
  }, [mode, stage, inView, loopKey, holdMs])

  // Mobile : la maquette tient dans 75 % de la largeur et 70 % de la hauteur de l'écran.
  // (Ignoré sur grand écran : les règles CSS du bureau fixent la taille.)
  useEffect(() => {
    const el = phoneRef.current
    if (!el) return
    let lastWidth = 0
    const fit = () => {
      const w = window.innerWidth
      // La barre d'adresse d'iOS change la hauteur pendant le scroll : on ne recalcule qu'au changement de largeur.
      if (w === lastWidth) return
      lastWidth = w
      const h = document.documentElement.clientHeight
      const scale = Math.min(0.68, (0.75 * w) / PHONE_W, (0.7 * h) / PHONE_H)
      el.style.setProperty('--hero-phone-scale', scale.toFixed(4))
      el.style.setProperty('--hero-phone-h', `${Math.ceil(PHONE_H * scale)}px`)
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  const goToStage = (i: Stage) => {
    const st = triggerRef.current
    if (mode === 'scroll' && st) {
      const target = i === 0 ? 0.05 : i === 1 ? 0.5 : 0.92
      window.scrollTo({ top: st.start + (st.end - st.start) * target, behavior: 'smooth' })
      return
    }
    setStage(i)
    setHoldMs(RESUME_AFTER_TAP_MS)
    setLoopKey((k) => k + 1)
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
            Avec Frescy, <span className="nowrap">
              <em>rien ne se perd</em>.
            </span>
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
          <div ref={phoneRef} className={`hero__phone hero__phone--s${stage}`} aria-hidden="true">
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
            {stage === 0 && 'L’appli Frescy photographie un pot de yaourt et lit sa date limite : 16 mai.'}
            {stage === 1 && 'Alerte Frescy : 12 yaourts expirent dans 2 jours, promo conseillée moins 20 %.'}
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
