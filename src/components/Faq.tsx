import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState } from 'react'
import { CtaRow } from './CtaRow'
import { IconPhone } from './Icons'
import { FOUNDER, PRICE } from '../lib/config'

const FAQ = [
  {
    q: 'Je ne suis pas à l’aise avec la technologie. C’est compliqué ?',
    a: 'Non. Si vous savez prendre une photo avec votre téléphone, vous savez utiliser Frescy. On vient l’installer chez vous et on vous montre, sur vos propres produits.',
  },
  {
    q: 'Faut-il prendre tous mes produits en photo un par un ?',
    a: 'Une photo par lot suffit, en général à la réception de la livraison : Frescy lit la date limite et la quantité. Quelques secondes par produit, pas de saisie.',
  },
  {
    q: 'Il me faut un ordinateur ou une caisse spéciale ?',
    a: 'Non, un smartphone suffit (Android ou iPhone). Frescy fonctionne à côté de votre caisse actuelle, sans rien changer.',
  },
  {
    q: 'Ça marche pour une boulangerie ou une boucherie ?',
    a: 'Oui. Frescy gère aussi les produits du jour et à la coupe : vous indiquez la durée de vente, elle vous prévient au bon moment et suggère la remise de fin de journée.',
  },
  {
    q: 'Combien ça coûte après le mois gratuit ?',
    a: `${PRICE.monthly} ${PRICE.unit}, sans engagement, installation comprise. Si Frescy ne vous fait pas économiser plus qu’elle ne coûte, vous arrêtez, sans frais.`,
  },
  {
    q: 'Et si je ne veux pas faire de promos ?',
    a: 'Pas de problème : Frescy peut simplement vous rappeler de mettre les produits en avant pour qu’ils partent en premier.',
  },
  {
    q: 'Et si un produit ne se vend toujours pas ?',
    a: 'Frescy vous le signale assez tôt pour le donner à une association locale plutôt que de le jeter. Les dons alimentaires des entreprises peuvent ouvrir droit à une réduction d’impôt : votre expert-comptable vous dira ce qui s’applique à votre commerce.',
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

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId()
  return (
    <div className={`faq__item ${open ? 'is-open' : ''}`}>
      <h3 style={{ margin: 0 }}>
        <button className="faq__q" aria-expanded={open} aria-controls={`${id}-a`} id={`${id}-q`} onClick={onToggle}>
          {q}
          <span className="faq__icon" aria-hidden="true" />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            className="faq__a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
          >
            <p>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="section section--soft" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq">
        <div className="faq__head">
          <span className="eyebrow">Questions fréquentes</span>
          <h2 id="faq-title" className="h2">
            Vos questions, nos <em>réponses</em>.
          </h2>
          <CtaRow label="Une autre question ? Demandez à être rappelé" />
          <div className="faq__contact">
            <p className="faq__contact-title">Plutôt en parler de vive voix&nbsp;?</p>
            <p className="faq__contact-text">
              {FOUNDER.firstName} décroche lui-même, pas de standard.
            </p>
            <a className="btn btn--ghost btn--sm" href={`tel:${FOUNDER.tel}`}>
              <IconPhone />
              <span>{FOUNDER.phone}</span>
            </a>
          </div>
        </div>
        <div className="faq__list">
          {FAQ.map((item, i) => (
            <Item key={item.q} {...item} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  )
}
