import { motion, type HTMLMotionProps } from 'framer-motion'

/** Apparition au scroll : fondu + légère montée, ressort amorti (sobre). */
export function Reveal({ delay = 0, y = 28, as = 'div', children, ...rest }: HTMLMotionProps<'div'> & { delay?: number; y?: number; as?: 'div' | 'li' }) {
  const Comp = (as === 'li' ? motion.li : motion.div) as typeof motion.div
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 140, damping: 20, mass: 0.9, delay }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
