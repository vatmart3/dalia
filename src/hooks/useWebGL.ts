import { useState } from 'react'

let cached: boolean | null = null

export function hasWebGL(): boolean {
  if (cached !== null) return cached
  try {
    const canvas = document.createElement('canvas')
    cached = !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')))
  } catch {
    cached = false
  }
  return cached
}

export function useWebGL() {
  const [ok] = useState(() => (typeof window === 'undefined' ? false : hasWebGL()))
  return ok
}
