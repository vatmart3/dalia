/** Wordmark Dalia : lettres rondes posées sur un blob tomate, feuille menthe sur le i. */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  const ink = inverted ? '#FFF6E9' : '#3B1F4A'
  return (
    <svg viewBox="0 0 220 80" role="img" aria-label="Dalia">
      <path
        d="M22 14C46 2 96 4 140 6c34 2 62 6 70 26 8 22-10 38-44 42-40 5-96 6-128-2C12 68 2 52 4 38 6 26 12 19 22 14Z"
        fill="#FF5A3C"
        stroke={ink}
        strokeWidth="3"
      />
      <text x="110" y="54" textAnchor="middle" fontFamily="'DM Sans', system-ui, sans-serif" fontWeight="900" fontSize="46" letterSpacing="-2.5" fill="#3B1F4A">
        dalia
      </text>
      <path d="M128 21c2-9 9-14 19-14-2 10-9 15-19 14Z" fill="#2EC4A0" stroke="#3B1F4A" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  )
}
