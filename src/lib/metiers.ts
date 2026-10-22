import type { MetierSlug } from './router'

export type Metier = {
  slug: MetierSlug
  name: string
  /** Pour « Frescy pour les … » */
  plural: string
  title: string
  /** Mot du titre mis en italique. */
  keyword: string
  /** Ce que doit montrer la vraie photo du commerce. */
  photoHint: string
  intro: string
  cases: { title: string; text: string }[]
  alert: { title: string; body: string; product: 'yaourt' | 'brioche' | 'fromage' | 'fruit' }
  seoTitle: string
  seoDescription: string
}

export const METIERS: Metier[] = [
  {
    slug: 'boulangerie',
    name: 'Boulangerie',
    plural: 'boulangeries',
    title: 'Moins d’invendus en fin de journée.',
    keyword: 'invendus',
    photoHint: 'Votre vitrine en fin de journée, viennoiseries et sandwichs',
    intro: 'Viennoiseries, sandwichs, desserts en vitrine : Frescy suit ce qui doit partir aujourd’hui et vous dit quand baisser le prix.',
    cases: [
      { title: 'Les produits du jour', text: 'Indiquez la durée de vente une fois. Frescy vous prévient en fin d’après-midi de ce qui reste à écouler.' },
      { title: 'La bonne remise à la bonne heure', text: 'Fini les promos au feeling : Frescy propose la remise selon ce qui reste et l’heure de fermeture.' },
      { title: 'Le frais emballé', text: 'Sandwichs, flans, desserts en pot : chaque date limite est suivie automatiquement, photo à l’appui.' },
    ],
    alert: { title: '8 sandwichs à vendre avant ce soir', body: 'Promo conseillée : −30 % à partir de 17 h', product: 'brioche' },
    seoTitle: 'Frescy pour les boulangeries · Moins d’invendus en fin de journée',
    seoDescription: 'Frescy suit les produits du jour et le frais emballé de votre boulangerie, et vous dit quand et de combien baisser le prix. 1 mois offert, installation à Sète et alentours.',
  },
  {
    slug: 'boucherie',
    name: 'Boucherie',
    plural: 'boucheries',
    title: 'Chaque barquette vendue avant sa date.',
    keyword: 'vendue',
    photoHint: 'Le comptoir de la boucherie et ses barquettes',
    intro: 'Les dates limites sont courtes et la marge est serrée. Frescy surveille vos barquettes, votre charcuterie et votre traiteur.',
    cases: [
      { title: 'Barquettes et sous-vide', text: 'Une photo à la mise en rayon : Frescy lit la date limite et vous alerte un jour avant, pas le jour même.' },
      { title: 'Charcuterie entamée', text: 'Notez la date d’ouverture d’une pièce, Frescy vous rappelle quand il faut la mettre en avant.' },
      { title: 'Plats traiteur', text: 'Les préparations du jour sont suivies comme le reste, avec une remise conseillée avant la fermeture.' },
    ],
    alert: { title: '6 barquettes de haché expirent demain', body: 'Promo conseillée : −25 % dès ce matin', product: 'fromage' },
    seoTitle: 'Frescy pour les boucheries · Chaque barquette vendue avant sa date',
    seoDescription: 'Frescy surveille les dates limites de vos barquettes, de votre charcuterie et de votre traiteur, et vous dit quoi mettre en promo. 1 mois offert, installation à Sète et alentours.',
  },
  {
    slug: 'epicerie',
    name: 'Épicerie',
    plural: 'épiceries',
    title: 'Des centaines de références, aucune date oubliée.',
    keyword: 'oubliée',
    photoHint: 'Les rayons de l’épicerie, côté frais',
    intro: 'Rayon frais, épicerie fine, fruits et légumes : Frescy garde l’œil sur tout ce que vous n’avez pas le temps de vérifier.',
    cases: [
      { title: 'Le rayon frais', text: 'Yaourts, fromages, jambon en libre-service : les dates courtes remontent en haut de l’écran.' },
      { title: 'L’épicerie fine', text: 'Pour les dates longues, Frescy vous prévient des semaines à l’avance, le temps de faire une animation.' },
      { title: 'Les arrivages', text: 'Une photo de la cagette à la livraison, et Frescy vous rappelle quand la mettre en promo.' },
    ],
    alert: { title: '12 yaourts expirent dans 2 jours', body: 'Promo conseillée : −20 % dès aujourd’hui', product: 'yaourt' },
    seoTitle: 'Frescy pour les épiceries · Aucune date limite oubliée',
    seoDescription: 'Frescy suit les dates limites de votre rayon frais, de l’épicerie fine et des arrivages, et vous dit quoi mettre en promo. 1 mois offert, installation à Sète et alentours.',
  },
  {
    slug: 'superette',
    name: 'Supérette',
    plural: 'supérettes',
    title: 'Tout le rayon frais sous contrôle.',
    keyword: 'frais',
    photoHint: 'Le rayon frais de la supérette',
    intro: 'Plusieurs livraisons par semaine, des produits qui tournent vite : Frescy vous dit chaque matin ce qu’il faut traiter en premier.',
    cases: [
      { title: 'Plusieurs livraisons par semaine', text: 'Chaque arrivage est photographié en quelques secondes, sans saisie ni tableur.' },
      { title: 'La liste du matin', text: 'En ouvrant l’appli, vous voyez les produits à traiter aujourd’hui, rayon par rayon.' },
      { title: 'Des promos bien visibles', text: 'L’étiquette promo est prête à imprimer : le client la voit, le produit part.' },
    ],
    alert: { title: '15 salades composées expirent demain', body: 'Promo conseillée : −30 % dès aujourd’hui', product: 'fruit' },
    seoTitle: 'Frescy pour les supérettes · Tout le rayon frais sous contrôle',
    seoDescription: 'Frescy suit les dates limites de votre rayon frais et de vos arrivages, et vous dit chaque matin quoi mettre en promo. 1 mois offert, installation à Sète et alentours.',
  },
]

export const metierBySlug = (slug: MetierSlug) => METIERS.find((m) => m.slug === slug)!

/** Découpe un titre autour de son mot clé, pour le mettre en italique. */
export function splitKeyword(text: string, keyword: string): [string, string, string] {
  const i = text.indexOf(keyword)
  if (i < 0) return [text, '', '']
  return [text.slice(0, i), keyword, text.slice(i + keyword.length)]
}
