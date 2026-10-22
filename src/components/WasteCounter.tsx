import { useEffect, useRef } from 'react'
import { RETAIL_WASTE_EUR_PER_SECOND, eur } from '../lib/config'

const RATES = [
  { label: 'par minute', seconds: 60 },
  { label: 'par heure', seconds: 3600 },
  { label: 'par jour', seconds: 86400 },
]

/** 6 100 000 → « 6,1 M€ » */
const short = (n: number) => (n >= 1e6 ? `${(n / 1e6).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} M€` : eur(n))

/** « Pendant que vous lisez ceci… » — compteur en temps réel depuis l'arrivée sur la page. */
export function WasteCounter({ reducedMotion }: { reducedMotion: boolean }) {
  const valueRef = useRef<HTMLSpanElement>(null)

  // Mis à jour 10 fois par seconde (pas à chaque image), et seulement quand le compteur est à l'écran.
  useEffect(() => {
    const el = valueRef.current
    if (!el) return
    const start = performance.now()
    const render = () => {
      el.textContent = eur(((performance.now() - start) / 1000) * RETAIL_WASTE_EUR_PER_SECOND)
    }
    render()
    let timer = 0
    const io = new IntersectionObserver(([entry]) => {
      window.clearInterval(timer)
      if (entry.isIntersecting) timer = window.setInterval(render, reducedMotion ? 1000 : 100)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      window.clearInterval(timer)
    }
  }, [reducedMotion])

  const perSecond = Math.round(RETAIL_WASTE_EUR_PER_SECOND)
  return (
    <section className="counter" aria-labelledby="counter-title">
      <div className="wrap counter__grid">
        <div className="counter__main">
          <p id="counter-title" className="counter__label">
            Pendant que vous lisez ceci, les commerces français ont jeté
          </p>
          <span ref={valueRef} className="counter__value" aria-hidden="true">
            0 €
          </span>
          <p className="counter__label">de produits alimentaires.</p>
          <p className="sr-only">Soit environ {perSecond} euros de produits jetés chaque seconde.</p>
          <p className="counter__source">
            Estimation : ≈ 16 Md€ de gaspillage alimentaire par an en France, dont ≈ 14 % au stade de la distribution (ADEME), soit ≈ {perSecond} € par seconde.
          </p>
        </div>
        <ul className="counter__rates" aria-label="Au même rythme">
          {RATES.map(({ label, seconds }) => (
            <li key={label}>
              <b>{short(RETAIL_WASTE_EUR_PER_SECOND * seconds)}</b>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
