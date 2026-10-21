import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ButtonLink } from './Button'
import { Sticker } from './Sticker'
import { Hl } from './Highlight'
import { Awning } from './etal/Awning'
import { Apricots, Baguette, Cheese, Yogurt } from './etal/Products'
import { CTA_LABEL, CTA_TARGET, PILOT_AREA, PILOT_SEATS } from '../lib/config'

/** Petite étiquette de date suspendue à un produit. */
function DateTag({ children, tone = 'creme', style }: { children: ReactNode; tone?: 'creme' | 'menthe'; style?: CSSProperties }) {
  return (
    <span className={`date-tag date-tag--${tone}`} style={style}>
      {children}
    </span>
  )
}

export function Hero() {
  // Au premier scroll, Dalia colle « −20 % » sur les yaourts et ils partent.
  const [sold, setSold] = useState(false)
  useEffect(() => {
    if (sold) return
    const onScroll = () => {
      if (window.scrollY > 24) setSold(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sold])

  return (
    <section className="panel panel--hero hero" id="top" aria-labelledby="hero-title">
      <Awning className="hero__awning" />
      <div className="hero__layout">
        <motion.div
          className="slate hero__slate"
          initial={{ y: -40, rotate: -4, opacity: 0 }}
          animate={{ y: 0, rotate: -1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 11 }}
        >
          <p className="carton hero__badge">
            {PILOT_SEATS} places pilotes à {PILOT_AREA}
          </p>
          <h1 id="hero-title" className="h1 hero__title">
            <span className="line">Dalia veille,</span>
            <span className="line">
              et votre <Hl>marge</Hl>
            </span>
            <span className="line hero__punch">ne part pas.</span>
          </h1>
        </motion.div>

        <motion.div
          className="hero__aside"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 180, damping: 16, delay: 0.25 }}
        >
          <p className="lead">L’appli qui surveille vos dates limites et transforme vos invendus en ventes.</p>
          <div className="cta-row">
            <ButtonLink href={CTA_TARGET}>{CTA_LABEL}</ButtonLink>
            <ButtonLink href="#calculateur" variant="ghost" arrow={false}>
              Calculer mes pertes
            </ButtonLink>
          </div>
          <p className="cta-note">
            <strong>1 mois offert</strong>, installation faite par nous. Sans engagement.
          </p>
        </motion.div>
      </div>

      <div className="hero__products" aria-hidden="true">
        <div className="product product--yogurt">
          <div className="product__art">
            <Yogurt size={86} />
            <Yogurt size={86} />
          </div>
          <Sticker color="#FFB23E" rotate={-14} play={sold} className="product__sticker">
            −20%
          </Sticker>
          <AnimatePresence mode="wait" initial={false}>
            {sold ? (
              <motion.span key="vendu" initial={{ rotateY: 90 }} animate={{ rotateY: 0 }} transition={{ duration: 0.3, delay: 0.55 }} style={{ display: 'inline-block' }}>
                <DateTag tone="menthe">Vendu</DateTag>
              </motion.span>
            ) : (
              <motion.span key="j2" exit={{ rotateY: -90 }} transition={{ duration: 0.25, delay: 0.3 }} style={{ display: 'inline-block' }}>
                <DateTag>J-2</DateTag>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="product product--bread">
          <div className="product__art">
            <Baguette size={150} />
          </div>
          <DateTag>J-1</DateTag>
        </div>
        <div className="product product--cheese">
          <div className="product__art">
            <Cheese size={112} />
          </div>
          <DateTag>J-5</DateTag>
        </div>
        <div className="product product--apricots">
          <div className="product__art">
            <Apricots size={124} />
          </div>
          <DateTag>J-3</DateTag>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {sold ? 'Dalia a mis les yaourts à −20 % : ils sont vendus.' : ''}
      </p>
    </section>
  )
}
