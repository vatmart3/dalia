import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ButtonLink } from './Button'
import { CTA_LABEL, CTA_TARGET } from '../lib/config'

/** CTA flottant (mobile) : apparaît après le hero, s'efface quand le formulaire est visible. */
export function FloatingCta() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    let formVisible = false
    let pastHero = false
    const update = () => setShow(pastHero && !formVisible)
    const onScroll = () => {
      const hero = document.getElementById('top')
      pastHero = hero ? hero.getBoundingClientRect().bottom < window.innerHeight * 0.3 : window.scrollY > window.innerHeight * 0.6
      update()
    }
    const target = document.querySelector('.final')
    const io = target
      ? new IntersectionObserver(
          ([e]) => {
            formVisible = e.isIntersecting
            update()
          },
          { threshold: 0.1 },
        )
      : null
    if (target && io) io.observe(target)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io?.disconnect()
    }
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
