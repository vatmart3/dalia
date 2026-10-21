import { useId, useState, type CSSProperties } from 'react'
import { Crate } from './etal/Crate'
import { CtaRow } from './CtaRow'
import { PRICE } from '../lib/config'

const FAQ = [
  {
    q: 'Je ne suis pas à l’aise avec la technologie. C’est compliqué ?',
    a: 'Non. Si vous savez prendre une photo avec votre téléphone, vous savez utiliser Dalia. On vient l’installer chez vous et on vous montre, sur vos propres produits.',
  },
  {
    q: 'Faut-il prendre tous mes produits en photo un par un ?',
    a: 'Une photo par lot suffit, en général à la réception de la livraison : Dalia lit la date limite et la quantité. Quelques secondes par produit, pas de saisie.',
  },
  {
    q: 'Il me faut un ordinateur ou une caisse spéciale ?',
    a: 'Non, un smartphone suffit (Android ou iPhone). Dalia fonctionne à côté de votre caisse actuelle, sans rien changer.',
  },
  {
    q: 'Ça marche pour une boulangerie ou une boucherie ?',
    a: 'Oui. Dalia gère aussi les produits du jour et à la coupe : vous indiquez la durée de vente, elle vous prévient au bon moment et suggère la remise de fin de journée.',
  },
  {
    q: 'Combien ça coûte après le mois gratuit ?',
    a: `${PRICE.monthly} ${PRICE.unit}, sans engagement, installation comprise. Si Dalia ne vous fait pas économiser plus qu’elle ne coûte, vous arrêtez, sans frais.`,
  },
  {
    q: 'Et si un produit ne se vend toujours pas ?',
    a: 'Dalia vous le signale assez tôt pour le donner à une association locale plutôt que de le jeter. Les dons alimentaires des entreprises peuvent ouvrir droit à une réduction d’impôt : votre expert-comptable vous dira ce qui s’applique à votre commerce.',
  },
  {
    q: 'Je m’engage sur combien de temps ?',
    a: 'Aucun engagement. Pas de carte bancaire pour l’essai, et vous pouvez arrêter quand vous voulez.',
  },
  {
    q: 'Et mes données ?',
    a: 'Vos données restent les vôtres. Elles servent uniquement à vous envoyer vos alertes et ne sont jamais revendues.',
  },
]

/** Étiquette kraft : la question au recto, la réponse au verso (on la retourne). */
function Tag({ q, a, open, onToggle, index }: { q: string; a: string; open: boolean; onToggle: () => void; index: number }) {
  const id = useId()
  return (
    <li className={`flip ${open ? 'is-open' : ''}`} style={{ '--tilt': `${[-2, 1.5, -1, 2, -1.5, 1, -2.5, 1.5][index % 8]}deg` } as CSSProperties}>
      <button type="button" className="flip__btn" aria-expanded={open} aria-controls={`${id}-a`} onClick={onToggle}>
        <span className="flip__card">
          <span className="flip__face flip__face--front" aria-hidden={open}>
            <span className="flip__q">{q}</span>
            <span className="flip__hint">Retourner</span>
          </span>
          <span className="flip__face flip__face--back" id={`${id}-a`} aria-hidden={!open}>
            <span className="flip__q flip__q--small">{q}</span>
            <span className="flip__a">{a}</span>
          </span>
        </span>
      </button>
    </li>
  )
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <Crate
      id="faq"
      titleId="faq-title"
      className="panel--faq"
      tone="creme"
      label="carton"
      eyebrow="Questions fréquentes"
      title={<>Vos questions, nos réponses.</>}
      aside={<CtaRow label="Une autre question ? Demandez à être rappelé" />}
    >
      <ul className="flips">
        {FAQ.map((item, i) => (
          <Tag key={item.q} {...item} index={i} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
        ))}
      </ul>
    </Crate>
  )
}
