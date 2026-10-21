import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Arrivée directe sur /#essai, /#faq… : le navigateur cherche l'ancre avant que React ait
 * affiché la page, ne la trouve pas et reste en haut. On y va une fois la page prête
 * (polices chargées, intro épinglée du hero en place).
 */
export function useScrollToHashOnLoad() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    let cancelled = false
    const go = () => {
      const el = document.getElementById(id)
      if (cancelled || !el) return
      ScrollTrigger.refresh()
      el.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior })
    }
    document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(go)))
    return () => {
      cancelled = true
    }
  }, [])
}
