import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

// Squash & stretch : on écrase au survol, on aplatit au clic, retour en ressort.
const squash = {
  rest: { scaleX: 1, scaleY: 1, rotate: 0 },
  hover: { scaleX: 1.05, scaleY: 0.93, rotate: -1.5 },
  tap: { scaleX: 1.12, scaleY: 0.86, rotate: 0 },
}
const spring = { type: 'spring' as const, stiffness: 520, damping: 13, mass: 0.7 }

type Variant = 'primary' | 'ghost' | 'white' | 'dark'
type Common = { children: ReactNode; variant?: Variant; arrow?: boolean; size?: 'md' | 'sm'; block?: boolean; className?: string }

function cls({ variant = 'primary', size = 'md', block, className }: Omit<Common, 'children'>) {
  return ['btn', variant !== 'primary' && `btn--${variant}`, size === 'sm' && 'btn--sm', block && 'btn--block', className].filter(Boolean).join(' ')
}

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  )
}

export function ButtonLink({ children, variant, arrow = true, size, block, className, ...rest }: Common & HTMLMotionProps<'a'>) {
  return (
    <motion.a className={cls({ variant, size, block, className })} variants={squash} initial="rest" whileHover="hover" whileTap="tap" transition={spring} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </motion.a>
  )
}

export function Button({ children, variant, arrow = true, size, block, className, ...rest }: Common & HTMLMotionProps<'button'>) {
  return (
    <motion.button className={cls({ variant, size, block, className })} variants={squash} initial="rest" whileHover="hover" whileTap="tap" transition={spring} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </motion.button>
  )
}
