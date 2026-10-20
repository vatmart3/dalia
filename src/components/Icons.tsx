// Icônes au trait (24 × 24, stroke 1.8) — cohérentes sur toute la page.
import type { SVGProps } from 'react'

const base = { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
type P = SVGProps<SVGSVGElement>

export const IconCamera = (p: P) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.2l1.2-1.8h6.2L16.3 6h1.2A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5z" />
    <circle cx="12" cy="12.5" r="3.5" />
  </svg>
)
export const IconBell = (p: P) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15z" />
    <path d="M10 20.5a2 2 0 0 0 4 0" />
  </svg>
)
export const IconTag = (p: P) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M3.5 12.2V5a1.5 1.5 0 0 1 1.5-1.5h7.2a1.5 1.5 0 0 1 1 .44l7.4 7.4a1.5 1.5 0 0 1 0 2.12l-7.2 7.2a1.5 1.5 0 0 1-2.12 0l-7.4-7.4a1.5 1.5 0 0 1-.38-1.06z" />
    <circle cx="8.5" cy="8.5" r="1.4" />
  </svg>
)
export const IconEuro = (p: P) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M17.5 6.5A7 7 0 1 0 17.5 17.5" />
    <path d="M4.5 10.5h9M4.5 13.5h9" />
  </svg>
)
export const IconClock = (p: P) => (
  <svg {...base} {...p} aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
)
export const IconAlert = (p: P) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M10.3 4.3 2.8 17.5A2 2 0 0 0 4.5 20.5h15a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z" />
    <path d="M12 9.5v4M12 17h.01" />
  </svg>
)
export const IconCheck = (p: P) => (
  <svg {...base} strokeWidth={2.2} {...p} aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)
export const IconCheckCircle = (p: P) => (
  <svg {...base} {...p} aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.3l2.8 2.8L16.2 9.6" />
  </svg>
)
export const IconPrinter = (p: P) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M7 9V4h10v5" />
    <rect x="4" y="9" width="16" height="7" rx="2" />
    <path d="M7 14h10v6H7z" />
  </svg>
)
export const IconPhone = (p: P) => (
  <svg {...base} {...p} aria-hidden="true">
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="M11 18.5h2" />
  </svg>
)
export const IconShield = (p: P) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z" />
    <path d="M9 12l2.2 2.2L15.5 10" />
  </svg>
)
export const IconHome = (p: P) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M4 10.5 12 4l8 6.5V19a1.5 1.5 0 0 1-1.5 1.5H15v-6H9v6H5.5A1.5 1.5 0 0 1 4 19z" />
  </svg>
)
export const IconList = (p: P) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01" />
  </svg>
)
export const IconChart = (p: P) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M4 20V4M4 20h16" />
    <path d="M8 16v-4M12 16V8M16 16v-6" />
  </svg>
)
export const IconSkip = (p: P) => (
  <svg {...base} {...p} aria-hidden="true">
    <path d="M6 6l7 6-7 6zM16 6v12" />
  </svg>
)
export const IconStar = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p} aria-hidden="true">
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
  </svg>
)
