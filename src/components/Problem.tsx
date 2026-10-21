import { Reveal } from './Reveal'
import { CtaRow } from './CtaRow'
import { Blobs } from './Blobs'
import type { CSSProperties } from 'react'

const STATS = [
  { value: '150', unit: '€', label: 'de produits jetés chaque semaine, en moyenne, dans un petit commerce alimentaire.' },
  { value: '3', unit: 'h', label: 'par semaine passées à vérifier les dates dans les rayons, à la main.' },
  { value: '1 sur 5', unit: '', label: 'des produits périmés découverts trop tard pour être encore vendus.' },
]

export function Problem() {
  return (
    <section className="section sheet sheet--abricot problem" id="probleme" aria-labelledby="problem-title">
      <Blobs
        items={[
          { color: 'var(--creme)', size: '300px', top: '-80px', right: '-90px', opacity: 0.45 },
          { color: 'var(--tomate)', size: '160px', bottom: '12%', left: '-60px', opacity: 0.5 },
        ]}
      />
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Le problème</span>
          <h2 id="problem-title" className="h2">
            Chaque date ratée, c’est de la marge <span className="blobword">à la poubelle</span>.
          </h2>
          <p className="lead">Entre la caisse, les livraisons et les clients, personne n’a le temps de surveiller chaque produit.</p>
        </div>

        <ul className="stats">
          {STATS.map(({ value, unit, label }, i) => (
            <Reveal as="li" key={value} className="stat" delay={i * 0.12} y={90}>
              <div className="tag" style={{ '--tilt': ['-5deg', '4deg', '-2deg'][i] } as CSSProperties}>
                <span className="stat__value">
                  {value}
                  {unit && <small>{unit}</small>}
                </span>
                <span className="stat__label">{label}</span>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="stats__note">Ordres de grandeur pour un commerce alimentaire de proximité.</p>

        <CtaRow note={<>Dalia fait le tour des dates à votre place.</>} />
      </div>
    </section>
  )
}
