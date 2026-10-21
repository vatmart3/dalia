import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

function Burst({ color }: { color: string }) {
  const points = 14
  const pts: string[] = []
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 48 : 40
    const a = (Math.PI * i) / points - Math.PI / 2
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`)
  }
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <polygon points={pts.join(' ')} fill={color} stroke="#3B1F4A" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Sticker promo qui vient se coller avec un squash & stretch quand il entre à l'écran.
 * (Avec « mouvement réduit », Framer Motion l'affiche directement collé.)
 */
export function Sticker({
  children,
  color = '#FFB23E',
  rotate = -12,
  delay = 0.2,
  className = '',
  style,
}: {
  children: ReactNode
  color?: string
  rotate?: number
  delay?: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <motion.div
      className={`sticker ${className}`}
      style={style}
      aria-hidden="true"
      initial={{ opacity: 0, scaleX: 2.2, scaleY: 2.2, rotate: rotate - 35, y: -50 }}
      whileInView={{
        opacity: [0, 1, 1, 1, 1],
        scaleX: [2.2, 1.28, 0.9, 1.05, 1],
        scaleY: [2.2, 0.74, 1.12, 0.96, 1],
        rotate,
        y: 0,
      }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.75, times: [0, 0.45, 0.65, 0.85, 1], ease: 'easeOut', delay }}
    >
      <Burst color={color} />
      <span>{children}</span>
    </motion.div>
  )
}
