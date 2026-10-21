import { CssPhone } from './AppScreen'
import { Hl } from './Highlight'
import { CtaRow } from './CtaRow'
import { Sticker } from './Sticker'
import { Reveal } from './Reveal'
import { IconBell, IconPhone, IconPrinter, IconTag } from './Icons'

const FEATURES = [
  { Icon: IconBell, title: 'Ce qui expire, en premier', text: 'Les produits à traiter aujourd’hui, en haut de l’écran. Rien d’autre.' },
  { Icon: IconTag, title: 'La remise déjà calculée', text: 'Dalia propose le bon pourcentage selon le produit et le délai restant.' },
  { Icon: IconPrinter, title: 'L’étiquette prête à imprimer', text: 'Un geste et l’étiquette promo part à l’imprimante du magasin.' },
  { Icon: IconPhone, title: 'Aussi simple que vos SMS', text: 'Fonctionne sur n’importe quel smartphone, sans ordinateur.' },
]

export function Features() {
  return (
    <section className="section sheet sheet--aubergine" aria-labelledby="features-title">
      <div className="wrap features">
        <Reveal className="features__screen" y={40}>
          <CssPhone stage={1} />
          <Sticker color="#2EC4A0" rotate={-14}>
            −20%
          </Sticker>
        </Reveal>
        <div>
          <span className="eyebrow">L’appli</span>
          <h2 id="features-title" className="h2">
            Une alerte claire. <Hl>Au bon moment.</Hl>
          </h2>
          <ul className="features__list">
            {FEATURES.map(({ Icon, title, text }, i) => (
              <Reveal as="li" key={title} className="feature" delay={i * 0.06} y={16}>
                <span className="feature__icon">
                  <Icon />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <CtaRow />
        </div>
      </div>
    </section>
  )
}
