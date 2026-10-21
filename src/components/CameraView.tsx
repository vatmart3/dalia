import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { IconCheck } from './Icons'
import { ProductThumb } from './ProductGlyph'

/*
 * Étape « Photo » : l'appareil photo de Dalia scanne un pot de yaourt.
 * Boucle : recherche de la date → date verrouillée → déclenchement + flash → fiche produit.
 */

type Phase = 0 | 1 | 2 | 3
const TIMELINE: { phase: Phase; ms: number }[] = [
  { phase: 0, ms: 1400 }, // cadrage, recherche de la date
  { phase: 1, ms: 800 }, // date verrouillée
  { phase: 2, ms: 350 }, // déclenchement + flash
  { phase: 3, ms: 2300 }, // fiche produit
]

// Cadre de visée (px, dans le viseur de 340 × 470)
const FRAME_SEARCH = { left: 38, top: 56, width: 264, height: 372 }
const FRAME_LOCK = { left: 96, top: 288, width: 148, height: 76 }

const spring = { type: 'spring' as const, stiffness: 260, damping: 26 }

function Product() {
  return (
    <svg className="cam__feed" viewBox="0 0 340 470" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="cam-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a2347" />
          <stop offset="1" stopColor="#1c0f24" />
        </linearGradient>
        <linearGradient id="cam-pot" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F3E6D3" />
          <stop offset="0.35" stopColor="#FFFAF2" />
          <stop offset="1" stopColor="#EAD9C2" />
        </linearGradient>
        <filter id="cam-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      {/* rayon flou en arrière-plan */}
      <rect width="340" height="470" fill="url(#cam-bg)" />
      <g filter="url(#cam-blur)" opacity="0.75">
        <rect x="-20" y="392" width="380" height="26" fill="#c9b48f" />
        <circle cx="30" cy="250" r="46" fill="#FF5A3C" />
        <circle cx="320" cy="210" r="52" fill="#FFB23E" />
        <circle cx="300" cy="380" r="40" fill="#2EC4A0" />
        <circle cx="40" cy="390" r="36" fill="#2EC4A0" />
      </g>
      {/* pot de yaourt */}
      <ellipse cx="170" cy="404" rx="96" ry="10" fill="#000" opacity="0.35" />
      <path d="M62 112 L278 112 L258 392 Q256 402 246 402 L94 402 Q84 402 82 392 Z" fill="url(#cam-pot)" />
      <rect x="54" y="88" width="232" height="30" rx="10" fill="#FF5A3C" />
      <rect x="54" y="88" width="232" height="9" rx="4" fill="#FF8A6E" />
      <text x="170" y="178" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="800" fontSize="30" letterSpacing="-1" fill="#FF5A3C">
        Yaourt
      </text>
      <text x="170" y="208" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontWeight="600" fontSize="17" fill="#573468">
        nature au lait entier
      </text>
      <text x="170" y="240" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="13" fill="#8A7590">
        4 × 125 g
      </text>
      {/* étiquette de date */}
      <rect x="104" y="296" width="132" height="60" rx="6" fill="#fff" stroke="#e8d6c0" />
      <text x="170" y="315" textAnchor="middle" fontFamily="'DM Sans', sans-serif" fontSize="9.5" fill="#6E5A78">
        À consommer jusqu’au
      </text>
      <text x="170" y="337" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontWeight="700" fontSize="19" fill="#3B1F4A">
        16/05/26
      </text>
      <text x="170" y="350" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="8.5" fill="#8A7590">
        L2611 08:42
      </text>
    </svg>
  )
}

export function CameraView() {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(reduced ? 3 : 0)
  const [shots, setShots] = useState(reduced ? 1 : 0)

  useEffect(() => {
    if (reduced) {
      setPhase(3)
      return
    }
    let i = 0
    let timer = 0
    const next = () => {
      i = (i + 1) % TIMELINE.length
      setPhase(TIMELINE[i].phase)
      if (TIMELINE[i].phase === 2) setShots((n) => n + 1)
      timer = window.setTimeout(next, TIMELINE[i].ms)
    }
    setPhase(0)
    timer = window.setTimeout(next, TIMELINE[0].ms)
    return () => window.clearTimeout(timer)
  }, [reduced])

  const locked = phase >= 1
  const frame = locked ? FRAME_LOCK : FRAME_SEARCH

  return (
    <div className="cam">
      <div className="app__status cam__status" aria-hidden="true">
        <span>8:42</span>
        <span className="app__status-icons">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
            <rect x="0" y="8" width="3" height="4" rx="1" />
            <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
            <rect x="10" y="3" width="3" height="9" rx="1" />
            <rect x="15" y="0" width="3" height="12" rx="1" />
          </svg>
          <svg width="26" height="12" viewBox="0 0 26 12" fill="none">
            <rect x="0.5" y="0.5" width="22" height="11" rx="3.5" stroke="currentColor" opacity=".4" />
            <rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor" />
          </svg>
        </span>
      </div>
      <div className="cam__top">
        <span className="cam__close" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M7 7l10 10M17 7 7 17" />
          </svg>
        </span>
        <span className="cam__title">Scanner un produit</span>
        <span className="cam__flash-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
            <path d="M13 3 5.5 13.5H11L10 21l7.5-10.5H12z" />
          </svg>
        </span>
      </div>

      <div className="cam__viewfinder">
        <motion.div
          className="cam__feed-wrap"
          animate={phase === 0 && !reduced ? { x: [0, 3, -2, 2, 0], y: [0, -2, 3, -1, 0], rotate: [0, 0.6, -0.4, 0.3, 0] } : { x: 0, y: 0, rotate: 0 }}
          transition={phase === 0 ? { duration: 1.4, ease: 'easeInOut' } : { duration: 0.3 }}
        >
          <Product />
        </motion.div>

        <motion.div className={`cam__frame ${locked ? 'is-locked' : ''}`} initial={false} animate={frame} transition={spring}>
          <i />
          <i />
          <i />
          <i />
          {phase === 0 && !reduced && (
            <motion.span className="cam__scan" initial={{ top: '8%' }} animate={{ top: ['8%', '92%', '8%'] }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
          )}
        </motion.div>

        <div className="cam__chip-wrap">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={locked ? 'ok' : 'search'}
              className={`cam__chip ${locked ? 'is-ok' : ''}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
            >
              {locked ? (
                <>
                  <IconCheck /> DLC détectée : 16/05
                </>
              ) : (
                'Cadrez la date limite'
              )}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="cam__controls">
        <div className="cam__modes" aria-hidden="true">
          <span>Code-barres</span>
          <span className="is-active">Date</span>
          <span>Lot</span>
        </div>
        <div className="cam__row">
          <span className="cam__thumb">
            <AnimatePresence>
              {shots > 0 && (
                <motion.span key={shots} initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={spring}>
                  <ProductThumb kind="yaourt" />
                </motion.span>
              )}
            </AnimatePresence>
          </span>
          <motion.span className="cam__shutter" animate={{ scale: phase === 2 ? 0.86 : 1 }} transition={{ type: 'spring', stiffness: 600, damping: 18 }}>
            <i />
          </motion.span>
          <span className="cam__qty">× 12</span>
        </div>
      </div>

      <AnimatePresence>
        {phase === 2 && (
          <motion.span
            key="flash"
            className="cam__flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.95, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, times: [0, 0.25, 1] }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === 3 && (
          <motion.div
            key="sheet"
            className="cam__sheet"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            exit={{ y: '105%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <span className="cam__handle" />
            <div className="cam__sheet-head">
              <span className="cam__ok">
                <IconCheck />
              </span>
              Produit ajouté
            </div>
            <div className="cam__item">
              <ProductThumb kind="yaourt" />
              <div>
                <div className="app__name">Yaourts nature × 12</div>
                <div className="app__meta">DLC 16/05 · Rayon frais</div>
              </div>
              <span className="app__pill app__pill--red">J-2</span>
            </div>
            <span className="cam__next">Scanner le produit suivant</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
