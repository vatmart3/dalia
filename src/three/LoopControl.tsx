import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

/**
 * Met en pause le rendu quand la scène est hors écran.
 * (R3F ne relance pas sa boucle tout seul quand frameloop repasse à « always ».)
 */
export function LoopControl({ active }: { active: boolean }) {
  const setFrameloop = useThree((s) => s.setFrameloop)
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => {
    setFrameloop(active ? 'always' : 'never')
    if (active) invalidate()
  }, [active, setFrameloop, invalidate])
  return null
}
