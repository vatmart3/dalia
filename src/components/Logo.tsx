import icon from '../assets/frescy-icon.png'

/** Logo Frescy : l'icône de l'appli (image fournie, telle quelle), puis le nom. */
export function Logo({ color = '#0E1A3A' }: { color?: string }) {
  return (
    <>
      <img src={icon} width={128} height={128} alt="" decoding="async" />
      <svg viewBox="0 0 88 36" role="img" aria-label="Frescy">
        <text x="0" y="27" fontFamily="Inter, -apple-system, sans-serif" fontWeight="800" fontSize="30" letterSpacing="-1.4" fill={color}>
          frescy
        </text>
      </svg>
    </>
  )
}
