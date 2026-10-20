import { Reveal } from './Reveal'
import { CtaRow } from './CtaRow'
import { IconAlert, IconClock, IconEuro } from './Icons'

const STATS = [
  { value: '150', unit: '€', label: 'de produits jetés chaque semaine, en moyenne, dans un petit commerce alimentaire.', Icon: IconEuro, color: 'var(--red)', bg: 'var(--red-50)' },
  { value: '3', unit: 'h', label: 'par semaine passées à vérifier les dates dans les rayons, à la main.', Icon: IconClock, color: 'var(--amber)', bg: 'var(--amber-50)' },
  { value: '1 sur 5', unit: '', label: 'des produits périmés découverts trop tard pour être encore vendus.', Icon: IconAlert, color: 'var(--blue)', bg: 'var(--blue-50)' },
]

export function Problem() {
  return (
    <section className="section" id="probleme" aria-labelledby="problem-title">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Le problème</span>
          <h2 id="problem-title" className="h2">
            Chaque date ratée, c’est de la marge <em>à la poubelle</em>.
          </h2>
          <p className="lead">Entre la caisse, les livraisons et les clients, personne n’a le temps de surveiller chaque produit.</p>
        </div>

        <ul className="stats">
          {STATS.map(({ value, unit, label, Icon, color, bg }, i) => (
            <Reveal as="li" key={value} delay={i * 0.08}>
              <div className="card stat">
                <span className="stat__icon" style={{ color, background: bg }}>
                  <Icon />
                </span>
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

        <CtaRow note={<>Dalia fait le tour des dates <strong>à votre place</strong>.</>} />
      </div>
    </section>
  )
}
