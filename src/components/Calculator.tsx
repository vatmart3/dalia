import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useRef, useState, type CSSProperties } from 'react'
import { AnimatedNumber } from './AnimatedNumber'
import { CtaRow } from './CtaRow'
import { CALCULATOR, DALIA_SAVINGS_RATE, eur } from '../lib/config'

type Coin = { id: number; x: number; size: number; spin: number; drop: number }
let coinId = 0

function CoinSvg() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="#F2B632" />
      <circle cx="20" cy="20" r="14.5" fill="none" stroke="#C98E12" strokeWidth="1.6" />
      <text x="20" y="26" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="16" fill="#8A5E00">
        €
      </text>
    </svg>
  )
}

const barSpring = { type: 'spring' as const, stiffness: 120, damping: 22 }

export function Calculator({ reducedMotion }: { reducedMotion: boolean }) {
  const [weekly, setWeekly] = useState(CALCULATOR.initial)
  const [coins, setCoins] = useState<Coin[]>([])
  const resultRef = useRef<HTMLDivElement>(null)
  const lastValue = useRef(CALCULATOR.initial)

  const yearly = weekly * 52
  const saved = Math.round(yearly * DALIA_SAVINGS_RATE)
  const pct = ((weekly - CALCULATOR.min) / (CALCULATOR.max - CALCULATOR.min)) * 100
  const lossShare = weekly / CALCULATOR.max

  // Pièces qui tombent quand la perte augmente.
  const spawn = useCallback(
    (n: number) => {
      if (reducedMotion) return
      const drop = (resultRef.current?.offsetHeight ?? 360) - 30
      const fresh = Array.from({ length: n }, () => ({
        id: ++coinId,
        x: 6 + Math.random() * 86,
        size: 18 + Math.random() * 10,
        spin: (Math.random() - 0.5) * 540,
        drop,
      }))
      setCoins((c) => [...c.slice(-18), ...fresh])
    },
    [reducedMotion],
  )

  const onChange = (v: number) => {
    const delta = v - lastValue.current
    lastValue.current = v
    setWeekly(v)
    if (delta > 0) spawn(Math.min(4, Math.max(1, Math.round(delta / 30))))
  }

  const fmt = useCallback((n: number) => eur(Math.round(n)), [])

  return (
    <section className="section section--soft" id="calculateur" aria-labelledby="calc-title">
      <div className="wrap">
        <div className="section-head section-head--center">
          <span className="eyebrow">Calculateur</span>
          <h2 id="calc-title" className="h2">
            Combien jetez-vous par semaine&nbsp;?
          </h2>
          <p className="lead">Faites glisser le curseur. Le chiffre annuel surprend souvent.</p>
        </div>

        <div className="card calc__panel">
          <div className="calc__input">
            <label htmlFor="weekly">Produits jetés par semaine</label>
            <p className="calc__input-hint">Périmés, abîmés ou bradés trop tard.</p>
            <div className="calc__weekly" aria-hidden="true">
              {eur(weekly)}
              <small>/ semaine</small>
            </div>
            <input
              id="weekly"
              className="range"
              type="range"
              min={CALCULATOR.min}
              max={CALCULATOR.max}
              step={CALCULATOR.step}
              value={weekly}
              onChange={(e) => onChange(Number(e.target.value))}
              aria-valuetext={`${weekly} euros par semaine`}
              style={{ '--p': `${pct}%` } as CSSProperties}
            />
            <div className="range__scale" aria-hidden="true">
              <span>{eur(CALCULATOR.min)}</span>
              <span>{eur(CALCULATOR.max)}</span>
            </div>
          </div>

          <div ref={resultRef} className="calc__result">
            <div className="coins" aria-hidden="true">
              <AnimatePresence>
                {coins.map((c) => (
                  <motion.div
                    key={c.id}
                    className="coin"
                    style={{ left: `${c.x}%`, width: c.size, height: c.size }}
                    initial={{ y: -40, rotate: 0, opacity: 0 }}
                    animate={{ y: [-40, c.drop, c.drop - 26, c.drop], rotate: c.spin, opacity: [0, 0.9, 0.9, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.3, times: [0, 0.55, 0.75, 1], ease: ['easeIn', 'easeOut', 'easeIn'] }}
                    onAnimationComplete={() => setCoins((all) => all.filter((x) => x.id !== c.id))}
                  >
                    <CoinSvg />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="calc__row">
              <div className="calc__row-head">
                <span className="calc__row-label">Perte sur un an</span>
                <span className="calc__row-value is-loss">
                  <AnimatedNumber value={yearly} format={fmt} reducedMotion={reducedMotion} />
                </span>
              </div>
              <div className="calc__bar" aria-hidden="true">
                <motion.span style={{ background: 'var(--red)' }} animate={{ scaleX: Math.max(0.04, lossShare) }} transition={barSpring} />
              </div>
            </div>

            <div className="calc__row">
              <div className="calc__row-head">
                <span className="calc__row-label">Récupérable avec Dalia</span>
                <span className="calc__row-value is-save">
                  <AnimatedNumber value={saved} format={fmt} reducedMotion={reducedMotion} />
                </span>
              </div>
              <div className="calc__bar" aria-hidden="true">
                <motion.span
                  style={{ background: 'var(--green)' }}
                  animate={{ scaleX: Math.max(0.02, lossShare * DALIA_SAVINGS_RATE) }}
                  transition={barSpring}
                />
              </div>
            </div>

            <p className="sr-only" aria-live="polite">
              Perte annuelle : {eur(yearly)}. Récupérable avec Dalia : {eur(saved)} par an.
            </p>
            <p className="calc__hyp">
              Hypothèse prudente : {Math.round(DALIA_SAVINGS_RATE * 100)} % des pertes évitées grâce aux alertes et aux promos au bon moment.
            </p>
          </div>
        </div>

        <CtaRow center note={<>Testez 1 mois gratuitement et mesurez <strong>votre vrai chiffre</strong>.</>} />
      </div>
    </section>
  )
}
