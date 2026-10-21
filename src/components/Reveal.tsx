import { motion, type HTMLMotionProps } from 'framer-motion'

/** Apparition au scroll en rebond élastique. */
export function Reveal({
  delay = 0,
  y = 60,
  rotate = 0,
  as = 'div',
  children,
  ...rest
}: HTMLMotionProps<'div'> & { delay?: number; y?: number; rotate?: number; as?: 'div' | 'li' }) {
  const Comp = (as === 'li' ? motion.li : motion.div) as typeof motion.div
  return (
    <Comp
      initial={{ opacity: 0, y, scale: 0.86, rotate: rotate - 5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 260, damping: 11, mass: 0.9, delay, opacity: { duration: 0.3, delay } }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
