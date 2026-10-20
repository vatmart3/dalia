import { useEffect, useState, type RefObject } from 'react'

/** Vrai quand l'élément est (presque) visible — sert à démarrer/pauser les scènes 3D. */
export function useInViewport(ref: RefObject<Element | null>, rootMargin = '200px') {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])
  return inView
}
