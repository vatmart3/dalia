/** Mots surlignés un à un (petites étiquettes colorées), sans débordement sur la ligne voisine. */
export function Hl({ children }: { children: string }) {
  const words = children.split(' ')
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="hl">{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}
