import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'

// Intro au scroll réservée aux écrans larges avec souris ; ailleurs elle joue toute seule.
export const SCROLL_INTRO_QUERY = '(min-width: 900px) and (hover: hover) and (pointer: fine)'

export const wantsScrollIntro = () =>
  window.matchMedia(SCROLL_INTRO_QUERY).matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

let loading: Promise<typeof ScrollTriggerType> | null = null

/**
 * GSAP n'est chargé que sur ordinateur, quand l'intro épinglée sert vraiment : dès qu'il est enregistré,
 * ScrollTrigger écoute le scroll et le redimensionnement de la page, ce qui ralentit le défilement sur iPhone.
 */
export function loadScrollTrigger() {
  loading ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
    gsap.registerPlugin(ScrollTrigger)
    return ScrollTrigger
  })
  return loading
}
