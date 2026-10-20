import { animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

/** Nombre qui « roule » vers sa nouvelle valeur (texte mis à jour sans re-render). */
export function AnimatedNumber({ value, format, reducedMotion }: { value: number; format: (n: number) => string; reducedMotion: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  const current = useRef(value)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reducedMotion) {
      current.current = value
      el.textContent = format(value)
      return
    }
    const controls = animate(current.current, value, {
      duration: 0.7,
      ease: [0.22, 1.4, 0.36, 1],
      onUpdate: (v) => {
        current.current = v
        el.textContent = format(v)
      },
    })
    return () => controls.stop()
  }, [value, format, reducedMotion])
  return <span ref={ref}>{format(value)}</span>
}
