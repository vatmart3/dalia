import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'
import { IconBell, IconChart, IconCheck, IconHome, IconList, IconTag, IconCamera } from './Icons'
import { CameraView } from './CameraView'
import { ProductThumb } from './ProductGlyph'

export type AlertMode = 'promo' | 'rotation'

/**
 * Écran de l'appli Frescy (DOM réel : net et lisible).
 * stage 0 : photo d'un produit · 1 : alerte reçue · 2 : action faite
 * mode promo : remise conseillée · mode rotation : produit à mettre devant en rayon, sans promo
 */
export function AppScreen({ stage = 2, mode = 'promo' }: { stage?: 0 | 1 | 2; mode?: AlertMode }) {
  const applied = stage === 2
  const rotation = mode === 'rotation'
  // Mouvement réduit : l'étape change quand même, mais d'un coup, sans transition.
  const reduced = useReducedMotion()
  const tr = <T,>(t: T) => (reduced ? { duration: 0 } : t)
  return (
    <div className="app">
      <div className="app__island" />
      <div className="app__status">
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
            <rect x="24" y="4" width="1.6" height="4" rx="0.8" fill="currentColor" opacity=".4" />
          </svg>
        </span>
      </div>

      <div className="app__head">
        <div className="app__date">Mardi 14 mai</div>
        <div className="app__title">Épicerie du Port</div>
      </div>

      <div className="app__kpis">
        <div className="app__kpi">
          <span>À surveiller</span>
          <b>{applied ? 6 : 7}</b>
        </div>
        <div className="app__kpi">
          <span>Sauvé ce mois</span>
          <b className="is-green">{applied ? '412 €' : '394 €'}</b>
        </div>
      </div>

      <div className="app__section">Expire bientôt</div>
      <div className="app__list">
        <div className="app__item">
          <ProductThumb kind="yaourt" />
          <div>
            <div className="app__name">Yaourts nature × {rotation ? 8 : 12}</div>
            <div className="app__meta">Rayon frais · {rotation ? '17/05' : '16/05'}</div>
          </div>
          {rotation ? (
            applied ? (
              <span className="app__pill app__pill--blue">Devant ✓</span>
            ) : (
              <span className="app__pill app__pill--red">J-3</span>
            )
          ) : applied ? (
            <span className="app__pill app__pill--promo">−20 % actif</span>
          ) : (
            <span className="app__pill app__pill--red">J-2</span>
          )}
        </div>
        <div className="app__item">
          <ProductThumb kind="brioche" />
          <div>
            <div className="app__name">Brioches tranchées</div>
            <div className="app__meta">Rayon 2 · 17/05</div>
          </div>
          <span className="app__pill app__pill--amber">J-3</span>
        </div>
        <div className="app__item">
          <ProductThumb kind="fromage" />
          <div>
            <div className="app__name">Tomme de brebis</div>
            <div className="app__meta">Vitrine · 19/05</div>
          </div>
          <span className="app__pill app__pill--amber">J-5</span>
        </div>
        <div className="app__item">
          <ProductThumb kind="fruit" />
          <div>
            <div className="app__name">Abricots, 1 cagette</div>
            <div className="app__meta">Étal · promo d'hier</div>
          </div>
          <span className="app__pill app__pill--green">Vendu</span>
        </div>
      </div>

      <div className="app__tabbar">
        <span className="app__tab is-active">
          <IconHome />
          Accueil
        </span>
        <span className="app__tab">
          <IconList />
          Stock
        </span>
        <span className="app__tab">
          <IconCamera />
          Photo
        </span>
        <span className="app__tab">
          <IconTag />
          Promos
        </span>
        <span className="app__tab">
          <IconChart />
          Bilan
        </span>
      </div>

      <AnimatePresence>
        {stage === 0 && (
          <motion.div
            key="camera"
            className="app__camera"
            initial={reduced ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={tr({ duration: 0.35, ease: [0.22, 1, 0.36, 1] })}
          >
            <CameraView />
          </motion.div>
        )}
        {stage === 1 && rotation && (
          <motion.div
            key="notif-rotation"
            className="app__notif"
            initial={{ y: -140, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.96 }}
            transition={tr({ type: 'spring', stiffness: 380, damping: 30 })}
          >
            <div className="app__notif-top">
              <span className="app__notif-icon">
                <IconBell />
              </span>
              FRESCY
              <span className="app__notif-time">maintenant</span>
            </div>
            <div className="app__notif-title">8 yaourts nature expirent dans 3 jours</div>
            <div className="app__notif-body">Placez-les devant en rayon, pour qu’ils partent en premier.</div>
            <div className="app__notif-actions">
              <span className="app__notif-btn">Plus tard</span>
              <span className="app__notif-btn app__notif-btn--primary">C’est fait</span>
            </div>
          </motion.div>
        )}
        {stage === 1 && !rotation && (
          <motion.div
            key="notif"
            className="app__notif"
            initial={{ y: -140, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -40, opacity: 0, scale: 0.96 }}
            transition={tr({ type: 'spring', stiffness: 380, damping: 30 })}
          >
            <div className="app__notif-top">
              <span className="app__notif-icon">
                <IconBell />
              </span>
              FRESCY
              <span className="app__notif-time">maintenant</span>
            </div>
            <div className="app__notif-title">12 yaourts expirent dans 2 jours</div>
            <div className="app__notif-body">
              Promo conseillée : <b>−20 %</b> dès aujourd’hui.
            </div>
            <div className="app__notif-actions">
              <span className="app__notif-btn">Plus tard</span>
              <span className="app__notif-btn app__notif-btn--primary">Appliquer −20 %</span>
            </div>
          </motion.div>
        )}
        {stage === 2 && rotation && (
          <motion.div
            key="toast-rotation"
            className="app__toast"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={tr({ type: 'spring', stiffness: 380, damping: 30 })}
          >
            <span className="app__toast-check">
              <IconCheck />
            </span>
            <span>
              Yaourts mis en avant
              <small>Devant en rayon, sans promo</small>
            </span>
          </motion.div>
        )}
        {stage === 2 && !rotation && (
          <motion.div
            key="toast"
            className="app__toast"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={tr({ type: 'spring', stiffness: 380, damping: 30 })}
          >
            <span className="app__toast-check">
              <IconCheck />
            </span>
            <span>
              Promo −20 % activée
              <small>Étiquette envoyée à l’imprimante</small>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Téléphone en CSS 3D (fallback sans WebGL, et visuel secondaire). */
export function CssPhone({ stage = 2, mode, style }: { stage?: 0 | 1 | 2; mode?: AlertMode; style?: CSSProperties }) {
  return (
    <div className="phone-css" style={style}>
      <div className="phone-css__body">
        <div className="phone-css__glass">
          <AppScreen stage={stage} mode={mode} />
        </div>
      </div>
    </div>
  )
}
