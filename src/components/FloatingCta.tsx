import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ButtonLink } from './Button'
import { CTA_LABEL, CTA_TARGET } from '../lib/config'

/** CTA flottant (mobile) : apparaît après le hero, s'efface quand le formulaire est visible. */
export function FloatingCta() {
  const [show, setShow] = useState(false)
  // Deux IntersectionObserver, aucun écouteur de scroll : « hero dépassé » et « formulaire visible ».
  useEffect(() => {
    let formVisible = false
    let pastHero = false
    const update = () => setShow(pastHero && !formVisible)
    const observers: IntersectionObserver[] = []
    // Hero dépassé : son bas est remonté au-dessus de 30 % de la hauteur de l'écran.
    const hero = document.getElementById('top') ?? document.querySelector('main > section')
    if (hero) {
      const io = new IntersectionObserver(
        ([e]) => {
          pastHero = !e.isIntersecting && e.boundingClientRect.top < 0
          update()
        },
        { rootMargin: '0px 0px -70% 0px' },
      )
      io.observe(hero)
      observers.push(io)
    }
    const form = document.querySelector('.final')
    if (form) {
      const io = new IntersectionObserver(
        ([e]) => {
          formVisible = e.isIntersecting
          update()
        },
        { threshold: 0.1 },
      )
      io.observe(form)
      observers.push(io)
    }
    return () => observers.forEach((io) => io.disconnect())
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="float-cta"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          <ButtonLink href={CTA_TARGET} block>
            {CTA_LABEL}
          </ButtonLink>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
