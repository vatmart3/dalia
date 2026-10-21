import { motion } from 'framer-motion'
import { useCallback, type CSSProperties } from 'react'
import { AnimatedNumber } from './AnimatedNumber'
import { CtaRow } from './CtaRow'
import { Sticker } from './Sticker'
import { Crate } from './etal/Crate'
import { CALCULATOR, DALIA_SAVINGS_RATE, eur } from '../lib/config'
import { useEstimate } from '../lib/estimate'
import { track } from '../lib/analytics'

/** Balance de marché : le plateau penche et descend avec les pertes, l'aiguille tourne sur le cadran. */
function Scale({ share }: { share: number }) {
  const tilt = -2 - share * 12
  const sink = share * 16
  // l'aiguille reste dans la moitié haute du cadran : le texte est dessous
  const needle = -84 + share * 168
  // Plus on jette, plus il y a de produits sur le plateau.
  const pile = [
    [-44, 0, 13, '#FF5A3C'],
    [-16, 2, 14, '#FFB23E'],
    [14, 0, 13, '#2EC4A0'],
    [42, 2, 12, '#FF5A3C'],
    [-30, -18, 12, '#2EC4A0'],
    [0, -18, 13, '#FF5A3C'],
    [28, -17, 12, '#FFB23E'],
    [-14, -34, 12, '#FFB23E'],
    [14, -34, 11, '#2EC4A0'],
    [0, -50, 11, '#FF5A3C'],
  ] as const
  const shown = Math.max(1, Math.round(share * pile.length))
  return (
    <svg className="scale__svg" viewBox="0 0 320 330" aria-hidden="true">
      {/* plateau */}
      <g className="scale__move" style={{ transform: `translateY(${sink}px) rotate(${tilt}deg)`, transformOrigin: '160px 108px' }}>
        <rect x="152" y="70" width="16" height="40" rx="6" fill="#3B1F4A" />
        <path d="M70 70h180c0 14-40 26-90 26S70 84 70 70z" fill="#FFB23E" stroke="#3B1F4A" strokeWidth="3.5" strokeLinejoin="round" />
        <g transform="translate(160 56)">
          {pile.slice(0, shown).map(([x, y, r, c], i) => (
            <motion.circle key={i} cx={x} cy={y} r={r} fill={c} stroke="#3B1F4A" strokeWidth="3" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 12 }} />
          ))}
        </g>
      </g>
      {/* corps + cadran */}
      <path d="M86 118h148l22 170a14 14 0 0 1-14 16H78a14 14 0 0 1-14-16z" fill="#FF5A3C" stroke="#3B1F4A" strokeWidth="3.5" strokeLinejoin="round" />
      <circle cx="160" cy="206" r="78" fill="#FFF6E9" stroke="#3B1F4A" strokeWidth="3.5" />
      {Array.from({ length: 13 }, (_, i) => {
        const a = ((-84 + i * 14 - 90) * Math.PI) / 180
        return (
          <line key={i} x1={160 + Math.cos(a) * 64} y1={206 + Math.sin(a) * 64} x2={160 + Math.cos(a) * 72} y2={206 + Math.sin(a) * 72} stroke="#3B1F4A" strokeWidth={i % 3 ? 2 : 3.5} strokeLinecap="round" />
        )
      })}
      <g className="scale__move" style={{ transform: `rotate(${needle}deg)`, transformOrigin: '160px 206px' }}>
        <path d="M160 206 L156 156 L160 142 L164 156 Z" fill="#FF5A3C" stroke="#3B1F4A" strokeWidth="2.5" strokeLinejoin="round" />
      </g>
      <circle cx="160" cy="206" r="7" fill="#3B1F4A" />
      <rect x="50" y="300" width="220" height="22" rx="11" fill="#3B1F4A" />
    </svg>
  )
}

export function Calculator({ reducedMotion }: { reducedMotion: boolean }) {
  const { weekly, touched, setWeekly } = useEstimate()

  const yearly = weekly * 52
  const saved = Math.round(yearly * DALIA_SAVINGS_RATE)
  const pct = ((weekly - CALCULATOR.min) / (CALCULATOR.max - CALCULATOR.min)) * 100
  const share = (weekly - CALCULATOR.min) / (CALCULATOR.max - CALCULATOR.min)

  const fmt = useCallback((n: number) => eur(Math.round(n)), [])

  return (
    <Crate
      id="calculateur"
      titleId="calc-title"
      className="panel--calc"
      tone="menthe"
      eyebrow="Calculateur"
      title={<>Combien jetez-vous par semaine&nbsp;?</>}
      lead={<p>Faites glisser le curseur. Le chiffre annuel surprend souvent.</p>}
      aside={<CtaRow label="Mesurer mon vrai chiffre avec 1 mois gratuit" />}
    >
      <div className="calc">
        <div className="scale">
          <Scale share={share} />
          <div className="scale__dial">
            <span className="scale__dial-label">Perte sur un an</span>
            <span className="scale__dial-value">
              <AnimatedNumber value={yearly} format={fmt} reducedMotion={reducedMotion} />
            </span>
          </div>
        </div>

        <div className="calc__controls">
          <label htmlFor="weekly" className="calc__label">
            Produits jetés par semaine
          </label>
          <p className="calc__hint">Périmés, abîmés ou bradés trop tard.</p>
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

          <div className="save-tag">
            <Sticker color="#FFB23E" rotate={12}>
              −{Math.round(DALIA_SAVINGS_RATE * 100)}%<small>de pertes</small>
            </Sticker>
            <span className="save-tag__label">Récupérable avec Dalia</span>
            <span className="save-tag__value">
              <AnimatedNumber value={saved} format={fmt} reducedMotion={reducedMotion} />
            </span>
          </div>
          <p className="sr-only" aria-live="polite">
            Perte annuelle : {eur(yearly)}. Récupérable avec Dalia : {eur(saved)} par an.
          </p>
          <p className="calc__hyp">
            Hypothèse prudente : {Math.round(DALIA_SAVINGS_RATE * 100)} % des pertes évitées grâce aux alertes et aux promos au bon moment.
          </p>
        </div>
      </div>
    </Crate>
  )
}
