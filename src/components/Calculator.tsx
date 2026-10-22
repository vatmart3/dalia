import { motion } from 'framer-motion'
import { useCallback, type CSSProperties } from 'react'
import { AnimatedNumber } from './AnimatedNumber'
import { CtaRow } from './CtaRow'
import { CALCULATOR, FRESCY_SAVINGS_RATE, eur } from '../lib/config'
import { useEstimate } from '../lib/estimate'
import { track } from '../lib/analytics'

const barSpring = { type: 'spring' as const, stiffness: 120, damping: 22 }

export function Calculator({ reducedMotion }: { reducedMotion: boolean }) {
  const { weekly, touched, setWeekly } = useEstimate()

  const yearly = weekly * 52
  const saved = Math.round(yearly * FRESCY_SAVINGS_RATE)
  const pct = ((weekly - CALCULATOR.min) / (CALCULATOR.max - CALCULATOR.min)) * 100
  const lossShare = weekly / CALCULATOR.max

  const fmt = useCallback((n: number) => eur(Math.round(n)), [])

  return (
    <section className="section section--soft" id="calculateur" aria-labelledby="calc-title">
      <div className="wrap">
        <div className="section-head section-head--split">
          <div>
            <span className="eyebrow">Calculateur</span>
            <h2 id="calc-title" className="h2">
              Combien <em>jetez</em>-vous par semaine&nbsp;?
            </h2>
          </div>
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
              onChange={(e) => {
                if (!touched) track('Calculateur utilisé')
                setWeekly(Number(e.target.value))
              }}
              aria-valuetext={`${weekly} euros par semaine`}
              style={{ '--p': `${pct}%` } as CSSProperties}
            />
            <div className="range__scale" aria-hidden="true">
              <span>{eur(CALCULATOR.min)}</span>
              <span>{eur(CALCULATOR.max)}</span>
            </div>
          </div>

          <div className="calc__result">
            <p className="hand-note calc__hand" aria-hidden="true">
              sur un an, ça chiffre vite ↓
            </p>
            <div className="calc__row">
              <div className="calc__row-head">
                <span className="calc__row-label">Perte sur un an</span>
                <span className="calc__row-value is-loss">
                  <AnimatedNumber value={yearly} format={fmt} reducedMotion={reducedMotion} />
                </span>
              </div>
              <div className="calc__bar" aria-hidden="true">
                <motion.span style={{ background: 'var(--ink)' }} animate={{ scaleX: Math.max(0.04, lossShare) }} transition={barSpring} />
              </div>
            </div>

            <div className="calc__row">
              <div className="calc__row-head">
                <span className="calc__row-label">Récupérable avec Frescy</span>
                <span className="calc__row-value is-save">
                  <AnimatedNumber value={saved} format={fmt} reducedMotion={reducedMotion} />
                </span>
              </div>
              <div className="calc__bar" aria-hidden="true">
                <motion.span
                  style={{ background: 'var(--blue)' }}
                  animate={{ scaleX: Math.max(0.02, lossShare * FRESCY_SAVINGS_RATE) }}
                  transition={barSpring}
                />
              </div>
            </div>

            <p className="sr-only" aria-live="polite">
              Perte annuelle : {eur(yearly)}. Récupérable avec Frescy : {eur(saved)} par an.
            </p>
            <p className="calc__hyp">
              Hypothèse prudente : {Math.round(FRESCY_SAVINGS_RATE * 100)} % des pertes évitées grâce aux alertes et aux promos au bon moment.
            </p>
          </div>
        </div>

        <CtaRow label="Mesurer mon vrai chiffre avec 1 mois gratuit" />
      </div>
    </section>
  )
}
