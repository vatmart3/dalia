import { useEffect, useState, type RefObject } from 'react'

/**
 * Indice de l'élément le plus proche du centre de l'écran.
 * Marche que l'étal défile horizontalement (ordinateur) ou verticalement (mobile).
 */
export function useClosestToCenter(refs: RefObject<HTMLElement | null>[], enabled = true) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!enabled) return
    let raf = 0
    const measure = () => {
      raf = 0
      const cx = window.innerWidth / 2
      const cy = window.innerHeight * 0.55
      let best = 0
      let bestD = Infinity
      refs.forEach((r, i) => {
        const el = r.current
        if (!el) return
        const b = el.getBoundingClientRect()
        const d = Math.hypot(b.left + b.width / 2 - cx, b.top + b.height / 2 - cy)
        if (d < bestD) {
          bestD = d
          best = i
        }
      })
      setIndex(best)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [refs, enabled])
  return index
}
