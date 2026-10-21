import { createContext, useContext, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Awning } from './Awning'

gsap.registerPlugin(ScrollTrigger)

/*
 * « L'étal qui défile ».
 * Ordinateur (grand écran + souris) : la section est épinglée et le scroll vertical fait
 * défiler l'étal horizontalement, comme si on longeait le stand.
 * Mobile, petits écrans, mouvement réduit : défilement vertical classique, cagette par cagette.
 */
export const ETAL_QUERY = '(min-width: 1024px) and (min-height: 760px) and (hover: hover) and (pointer: fine)'

type Mode = 'vertical' | 'horizontal'
const EtalContext = createContext<Mode>('vertical')
export const useEtalMode = () => useContext(EtalContext)

/**
 * Défilement animé vers une position. Le « smooth » natif peut s'interrompre en route
 * sur une section épinglée (le trajet sur l'étal est long) : on anime nous-mêmes,
 * et la molette, le clavier ou le doigt de l'utilisateur reprennent la main.
 */
function glide(top: number) {
  const from = window.scrollY
  const delta = top - from
  if (Math.abs(delta) < 2) return
  const duration = Math.min(1400, 450 + Math.abs(delta) * 0.06)
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
  const start = performance.now()
  let frame = 0
  const stop = () => {
    cancelAnimationFrame(frame)
    for (const ev of ['wheel', 'touchstart', 'keydown', 'mousedown'] as const) window.removeEventListener(ev, stop)
  }
  for (const ev of ['wheel', 'touchstart', 'keydown', 'mousedown'] as const) window.addEventListener(ev, stop, { passive: true })
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    window.scrollTo({ top: from + delta * ease(t), behavior: 'instant' as ScrollBehavior })
    if (t < 1) frame = requestAnimationFrame(step)
    else stop()
  }
  frame = requestAnimationFrame(step)
}

export function Etal({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<Mode>('vertical')

  useLayoutEffect(() => {
    const wrap = wrapRef.current
    const track = trackRef.current
    if (!wrap || !track) return
    const mm = gsap.matchMedia()
    mm.add({ desktop: ETAL_QUERY, reduce: '(prefers-reduced-motion: reduce)' }, (ctx) => {
      const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean }
      if (!desktop || reduce) {
        wrap.dataset.mode = 'v'
        setMode('vertical')
        return
      }
      // L'attribut est posé hors React : un re-rendu ne l'efface pas.
      wrap.dataset.mode = 'h'
      setMode('horizontal')
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)
      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      const st = tween.scrollTrigger!

      // Ancres internes (#calculateur, #essai…) : on convertit la position de la cagette
      // sur l'étal en position de scroll.
      const onClick = (e: MouseEvent) => {
        const a = (e.target as Element | null)?.closest?.('a[href^="#"]')
        const id = a?.getAttribute('href')?.slice(1)
        if (!id) return
        const el = document.getElementById(id)
        if (!el || !track.contains(el)) return
        e.preventDefault()
        const panel = (el.closest('.panel') as HTMLElement | null) ?? el
        const d = distance()
        // la cagette visée arrive centrée à l'écran
        const centered = panel.offsetLeft - Math.max(0, (window.innerWidth - panel.offsetWidth) / 2)
        const x = Math.min(Math.max(0, centered), d)
        glide(st.start + (d ? x / d : 0) * (st.end - st.start))
        if (id === 'essai') window.setTimeout(() => document.getElementById('f-nom')?.focus({ preventScroll: true }), 1400)
      }
      document.addEventListener('click', onClick)
      requestAnimationFrame(() => ScrollTrigger.refresh())

      return () => {
        document.removeEventListener('click', onClick)
        tween.scrollTrigger?.kill()
        tween.kill()
        gsap.set(track, { clearProps: 'transform' })
      }
    })
    return () => mm.revert()
  }, [])

  return (
    <EtalContext.Provider value={mode}>
      <div ref={wrapRef} className="etal" data-mode="v">
        <div ref={trackRef} className="etal__track">
          <Awning className="etal__awning" />
          {children}
          <div className="etal__board" aria-hidden="true" />
        </div>
      </div>
    </EtalContext.Provider>
  )
}
