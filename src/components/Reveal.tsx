import { useEffect, useRef, type CSSProperties, type HTMLAttributes, type RefObject } from 'react'

// Un seul observateur pour tous les blocs : il pose la classe une fois, puis oublie l'élément.
let observer: IntersectionObserver | null = null
const getObserver = () =>
  (observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-revealed')
        observer?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  ))

/**
 * Apparition au scroll : fondu + légère montée. C'est une animation CSS (opacité + transform),
 * jouée par le compositeur : rien ne tourne en JavaScript pendant le défilement (fluide sur iPhone).
 */
export function Reveal({
  delay = 0,
  y = 28,
  as = 'div',
  className,
  style,
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & { delay?: number; y?: number; as?: 'div' | 'li' }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = getObserver()
    io.observe(el)
    return () => io.unobserve(el)
  }, [])
  const Tag = as as 'div'
  return (
    <Tag
      ref={ref as RefObject<HTMLDivElement>}
      className={className ? `reveal ${className}` : 'reveal'}
      style={{ '--reveal-y': `${y}px`, '--reveal-delay': `${delay}s`, ...style } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  )
}
