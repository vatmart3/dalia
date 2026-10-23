// Réglages marketing centralisés : modifiez ici sans toucher aux composants.

export const PILOT_SEATS = 10
/** 👉 Places pilotes encore libres : changez ce seul chiffre, tous les compteurs de la page suivent. */
export const PILOT_SEATS_LEFT = 7
export const PILOT_AREA = 'Sète et alentours'

/**
 * Compteur « pendant que vous lisez ceci ».
 * Base : ADEME (2016) — 10 Mt de gaspillage alimentaire/an en France pour
 * ≈ 16 Md€, dont ≈ 14 % au stade de la distribution (commerces).
 * 16 Md€ × 14 % ≈ 2,24 Md€/an ≈ 71 €/seconde.
 */
export const RETAIL_WASTE_EUR_PER_YEAR = 2_240_000_000
export const RETAIL_WASTE_EUR_PER_SECOND = RETAIL_WASTE_EUR_PER_YEAR / (365 * 24 * 3600)

/** Part des pertes qu'on estime évitable avec Frescy (hypothèse prudente du calculateur). */
export const FRESCY_SAVINGS_RATE = 0.4

export const CALCULATOR = { min: 20, max: 800, step: 10, initial: 150 }

/** Bouton principal, le même partout (header, hero, milieu, fin) : il mène au formulaire en bas de page. */
export const CTA_LABEL = 'Devenir commerce pilote'
export const CTA_TARGET = '#essai'

/** Bouton « Connexion » du header : l'appli des commerçants. */
export const APP_URL = 'https://app.frescy.fr'

export const CONTACT_EMAIL = 'contact@frescy.fr'
export const CITY = 'Sète'

export const eur = (n: number, digits = 0) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n)

export const num = (n: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n)

/* --------------------------------------------------------------------------
 * ⚠️ VALEURS D'EXEMPLE À REMPLACER AVANT LA MISE EN LIGNE (voir README)
 * ------------------------------------------------------------------------ */

/** Tarif après le mois gratuit (affiché dans l'offre et la FAQ). */
export const PRICE = { monthly: 39, unit: '€ HT / mois' }

/** La personne derrière Frescy (section « Qui est derrière Frescy »). */
export const FOUNDER = {
  name: 'Jérémy',
  firstName: 'Jérémy',
  role: 'Fondateur de Frescy, basé à Sète',
  phone: '06 11 71 83 68',
  tel: '+33611718368',
  whatsapp: '33611718368',
}

/*
 * Photos : déposez les fichiers WebP dans src/assets/photos/ avec ces noms, elles s'affichent toutes seules.
 * - portrait.webp       → section « Qui est derrière Frescy » (carré, 800 × 800)
 * - commerce-1.webp …   → boulangerie, boucherie, épicerie, supérette (1200 × 750)
 * Tant qu'un fichier manque, un visuel aux couleurs de Frescy le remplace (pas de cadre vide).
 */
const PHOTO_FILES = import.meta.glob<string>('../assets/photos/*.webp', { eager: true, query: '?url', import: 'default' })
const photo = (name: string): string | null => PHOTO_FILES[`../assets/photos/${name}.webp`] ?? null

export const PORTRAIT = { src: photo('portrait'), width: 800, height: 800 }

/** Photos de vrais commerces, avec l'accord des commerçants. Pas d'images générées. */
export const SHOP_PHOTOS: Record<'boulangerie' | 'boucherie' | 'epicerie' | 'superette', string | null> = {
  boulangerie: photo('commerce-1'),
  boucherie: photo('commerce-2'),
  epicerie: photo('commerce-3'),
  superette: photo('commerce-4'),
}
export const SHOP_PHOTO_SIZE = { width: 1200, height: 750 }

/**
 * Section « Ils ont déjà économisé » : prête, mais masquée.
 * Passez showTemoignages à true quand vous aurez vos premiers retours (vrais chiffres, vraies citations, avec accord).
 */
export const showTemoignages = false
export const TEMOIGNAGES: { amount: string; shop: string; city: string; quote: string; photo: string | null }[] = [
  {
    amount: '180 € sauvés en un mois',
    shop: 'Nom du commerce',
    city: 'Sète',
    quote: 'Citation courte du commerçant, avec son accord.',
    photo: photo('temoignage-1'),
  },
]

/** Informations légales (page « Mentions légales »). */
export const COMPANY = {
  brand: 'Frescy',
  name: 'MJAGENCY',
  owner: 'Jérémy Vatuone',
  street: '54 rue Marceau',
  city: '34200 Sète',
  siret: '992 328 120 00017',
  vat: 'TVA non applicable, art. 293 B du CGI',
  host: { name: 'Vercel Inc.', address: '440 N Barranca Ave #4133, Covina, CA 91723, USA', url: 'https://vercel.com' },
}

/** Durée de conservation des demandes envoyées par le formulaire. */
export const LEAD_RETENTION = '3 ans maximum'
