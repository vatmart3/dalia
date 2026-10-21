import type { CSSProperties } from 'react'
import { Crate } from './etal/Crate'
import { CtaRow } from './CtaRow'
import { Hl } from './Highlight'

const STATS = [
  { value: '150', unit: '€', label: 'de produits jetés chaque semaine, en moyenne, dans un petit commerce alimentaire.' },
  { value: '3', unit: 'h', label: 'par semaine passées à vérifier les dates dans les rayons, à la main.' },
  { value: '1 sur 5', unit: '', label: 'des produits périmés découverts trop tard pour être encore vendus.' },
]

export function Problem() {
  return (
    <Crate
      id="probleme"
      titleId="problem-title"
      className="panel--problem"
      tone="abricot"
      eyebrow="Le problème"
      title={
        <>
          Chaque date ratée, c’est de la marge <Hl>à la poubelle</Hl>.
        </>
      }
      lead={<p>Entre la caisse, les livraisons et les clients, personne n’a le temps de surveiller chaque produit.</p>}
      aside={<CtaRow note={<>Dalia fait le tour des dates à votre place.</>} />}
    >
      <div className="rail">
        <div className="rail__bar" aria-hidden="true" />
        <ul className="rail__tags">
          {STATS.map(({ value, unit, label }, i) => (
            <li key={value} className="hang" style={{ '--sway': `${4.2 + i * 0.7}s`, '--string': `${46 + i * 22}px` } as CSSProperties}>
              <div className="price-tag">
                <span className="price-tag__value">
                  {value}
                  {unit && <small>{unit}</small>}
                </span>
                <span className="price-tag__label">{label}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="rail__note">Ordres de grandeur pour un commerce alimentaire de proximité.</p>
      </div>
    </Crate>
  )
}
