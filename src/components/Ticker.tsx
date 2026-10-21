/** Bandeau d'étiquettes produits qui défile (décoratif, figé si le mouvement est réduit). */
const ITEMS: { label: string; tag: string; kind?: 'promo' | 'sold' }[] = [
  { label: 'Yaourts nature × 12', tag: 'J-2' },
  { label: 'Brioches tranchées', tag: '−30 %', kind: 'promo' },
  { label: 'Tomme de brebis', tag: 'J-5' },
  { label: 'Sandwichs jambon-beurre', tag: 'ce soir' },
  { label: 'Abricots, 1 cagette', tag: 'Vendu', kind: 'sold' },
  { label: 'Barquettes de bœuf haché', tag: 'J-1' },
  { label: 'Flans pâtissiers', tag: '−20 %', kind: 'promo' },
  { label: 'Salade de riz', tag: 'J-2' },
  { label: 'Jambon blanc à la coupe', tag: 'Vendu', kind: 'sold' },
  { label: 'Crème fraîche 20 cl', tag: 'J-3' },
]

export function Ticker() {
  // La liste est doublée pour boucler sans à-coup (translateX de −50 %).
  const items = [...ITEMS, ...ITEMS]
  return (
    <div className="ticker" aria-hidden="true">
      <ul className="ticker__track">
        {items.map((it, i) => (
          <li key={i} className="ticker__item">
            {it.label}
            <span className={`ticker__tag ${it.kind ? `ticker__tag--${it.kind}` : ''}`}>{it.tag}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
