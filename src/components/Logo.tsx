/** Logo Frescy : le mot « frescy », avec une feuille abricot qui pousse sur le « y » (même feuille que l'icône). */
export function Logo({ color = '#0E1A3A' }: { color?: string }) {
  return (
    <svg viewBox="0 0 94 36" role="img" aria-label="Frescy">
      <text x="0" y="27" fontFamily="Inter, -apple-system, sans-serif" fontWeight="800" fontSize="30" letterSpacing="-1.4" fill={color}>
        frescy
      </text>
      <path transform="translate(85.6 9.2) rotate(-52)" d="M0 0 C2.3 -4.8 8.4 -4.6 11 0 C8.2 4.1 2.5 4.3 0 0 Z" fill="#F2A541" />
    </svg>
  )
}
