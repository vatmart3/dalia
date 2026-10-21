import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RETAIL_WASTE_EUR_PER_SECOND, eur } from '../lib/config'

// Lignes d'exemple imprimées sur le ticket (produits typiques d'un commerce de proximité).
const ITEMS = [
  ['Yaourts nature × 12', 7.2],
  ['Brioches tranchées', 3.9],
  ['Tomme de brebis', 11.4],
  ['Barquette de haché', 6.8],
  ['Salades composées × 3', 10.5],
  ['Abricots, 1 cagette', 14.0],
  ['Sandwichs × 4', 15.6],
  ['Jambon blanc', 5.2],
] as const

const MAX_LINES = 6

/** « Pendant que vous lisez ceci… » — un ticket de caisse qui s'imprime en temps réel. */
export function WasteCounter({ reducedMotion }: { reducedMotion: boolean }) {
  const valueRef = useRef<HTMLSpanElement>(null)
  const [lines, setLines] = useState<number[]>(() => (reducedMotion ? [0, 1, 2, 3] : [0, 1]))

  // Total : euros jetés en France depuis l'arrivée sur la page.
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

  // Une nouvelle ligne s'imprime régulièrement : le ticket s'allonge.
  useEffect(() => {
    if (reducedMotion) return
    let n = lines.length
    const id = window.setInterval(() => {
      setLines((prev) => [...prev, n++].slice(-MAX_LINES))
    }, 1300)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  const perSecond = Math.round(RETAIL_WASTE_EUR_PER_SECOND)
  return (
    <section className="panel panel--ticket" aria-labelledby="counter-title">
      <div className="till">
        <div className="till__printer" aria-hidden="true">
          <span className="till__slot" />
        </div>
        <motion.div className="receipt" layout transition={{ type: 'spring', stiffness: 200, damping: 26 }}>
          <p id="counter-title" className="receipt__label">
            Pendant que vous lisez ceci, les commerces français ont jeté
          </p>
          <ul className="receipt__lines" aria-hidden="true">
            <AnimatePresence initial={false}>
              {lines.map((n) => {
                const [name, price] = ITEMS[n % ITEMS.length]
                return (
                  <motion.li
                    key={n}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span>{name}</span>
                    <span>{eur(price, 2)}</span>
                  </motion.li>
                )
              })}
            </AnimatePresence>
          </ul>
          <div className="receipt__total">
            <span ref={valueRef} className="receipt__value" aria-hidden="true">
              0 €
            </span>
            <p className="receipt__label">de produits alimentaires.</p>
          </div>
          <p className="sr-only">Soit environ {perSecond} euros de produits jetés chaque seconde.</p>
          <p className="receipt__source">
            Estimation : ≈ 16 Md€ de gaspillage alimentaire par an en France, dont ≈ 14 % au stade de la distribution (ADEME), soit ≈ {perSecond} € par seconde.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
