import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

// Micro-interaction sobre : léger soulèvement au survol, pression au clic.
const press = {
  rest: { y: 0, scale: 1 },
  hover: { y: -1, scale: 1.015 },
  tap: { y: 0, scale: 0.97 },
}
const spring = { type: 'spring' as const, stiffness: 600, damping: 30 }

type Variant = 'primary' | 'ghost' | 'white'
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
    <motion.a className={cls({ variant, size, block, className })} variants={press} initial="rest" whileHover="hover" whileTap="tap" transition={spring} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </motion.a>
  )
}

export function Button({ children, variant, arrow = true, size, block, className, ...rest }: Common & HTMLMotionProps<'button'>) {
  return (
    <motion.button className={cls({ variant, size, block, className })} variants={press} initial="rest" whileHover="hover" whileTap="tap" transition={spring} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </motion.button>
  )
}
