/** Logo Dalia : pastille bleue (œil / feuille) + wordmark. */
export function Logo({ color = '#0E1A3A' }: { color?: string }) {
  return (
    <svg viewBox="0 0 118 32" role="img" aria-label="Dalia">
      <rect width="32" height="32" rx="9" fill="#1D3FBF" />
      <path d="M7 16c2.6-4.6 5.6-6.8 9-6.8s6.4 2.2 9 6.8c-2.6 4.6-5.6 6.8-9 6.8S9.6 20.6 7 16z" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="3" fill="#fff" />
      <text x="40" y="23.5" fontFamily="Inter, -apple-system, sans-serif" fontWeight="700" fontSize="22" letterSpacing="-0.8" fill={color}>
        dalia
      </text>
    </svg>
  )
}
