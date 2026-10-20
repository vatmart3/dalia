import { useEffect, useRef } from 'react'
import { RETAIL_WASTE_EUR_PER_SECOND, eur } from '../lib/config'

/** « Pendant que vous lisez ceci… » — compteur en temps réel depuis l'arrivée sur la page. */
export function WasteCounter({ reducedMotion }: { reducedMotion: boolean }) {
  const valueRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const start = performance.now()
    const render = () => {
      if (valueRef.current) valueRef.current.textContent = eur(((performance.now() - start) / 1000) * RETAIL_WASTE_EUR_PER_SECOND)
    }
    if (reducedMotion) {
      render()
      const id = window.setInterval(render, 1000)
      return () => window.clearInterval(id)
    }
    let raf = 0
    const loop = () => {
      render()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion])

  const perSecond = Math.round(RETAIL_WASTE_EUR_PER_SECOND)
  return (
    <section className="counter" aria-labelledby="counter-title">
      <div className="wrap">
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
    </section>
  )
}
