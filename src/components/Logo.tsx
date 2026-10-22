/** Logo Frescy : monogramme « f » + feuille, puis le nom. */
export function Logo({ color = '#0E1A3A' }: { color?: string }) {
  return (
    <svg viewBox="0 0 118 32" role="img" aria-label="Frescy">
      {/* Monogramme : « f » éditorial + feuille abricot (même dessin que l'icône d'application) */}
      <svg x="0" y="0" width="32" height="32" viewBox="0 0 1024 1024">
        <rect width="1024" height="1024" rx="288" fill="#1D3FBF" />
        <g transform="translate(-30 0)">
          <path d="M504 740 V440 C504 330 560 280 646 280" fill="none" stroke="#fff" strokeWidth="104" strokeLinecap="round" />
          <rect x="380" y="452" width="268" height="64" rx="4" fill="#fff" />
          <rect x="392" y="742" width="230" height="54" rx="6" fill="#fff" />
          <path transform="translate(716 226) rotate(-40)" d="M0 0 C30 -50 96 -58 142 -30 C112 16 48 36 0 0 Z" fill="#F2A541" />
        </g>
      </svg>
      <text x="40" y="23.5" fontFamily="Inter, -apple-system, sans-serif" fontWeight="700" fontSize="22" letterSpacing="-0.8" fill={color}>
        frescy
      </text>
    </svg>
  )
}
