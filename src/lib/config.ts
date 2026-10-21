// Réglages marketing centralisés : modifiez ici sans toucher aux composants.

export const PILOT_SEATS = 10
export const PILOT_AREA = 'Sète et alentours'

/**
 * Compteur « pendant que vous lisez ceci ».
 * Base : ADEME (2016) — 10 Mt de gaspillage alimentaire/an en France pour
 * ≈ 16 Md€, dont ≈ 14 % au stade de la distribution (commerces).
 * 16 Md€ × 14 % ≈ 2,24 Md€/an ≈ 71 €/seconde.
 */
export const RETAIL_WASTE_EUR_PER_YEAR = 2_240_000_000
export const RETAIL_WASTE_EUR_PER_SECOND = RETAIL_WASTE_EUR_PER_YEAR / (365 * 24 * 3600)

/** Part des pertes qu'on estime évitable avec Dalia (hypothèse prudente du calculateur). */
export const DALIA_SAVINGS_RATE = 0.4

export const CALCULATOR = { min: 20, max: 800, step: 10, initial: 150 }

export const CTA_LABEL = 'Je veux tester Dalia'
export const CTA_TARGET = '#essai'

export const eur = (n: number, digits = 0) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n)

export const num = (n: number) => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n)

/* --------------------------------------------------------------------------
 * ⚠️ VALEURS D'EXEMPLE À REMPLACER AVANT LA MISE EN LIGNE (voir README)
 * ------------------------------------------------------------------------ */

/** Tarif après le mois gratuit (affiché dans l'offre et la FAQ). */
export const PRICE = { monthly: 39, unit: '€ HT / mois' }

/** La personne derrière Dalia (section « Qui est derrière Dalia »). */
export const FOUNDER = {
  name: 'Jérémy',
  firstName: 'Jérémy',
  role: 'Fondateur de Dalia, basé à Sète',
  /** Chemin d'une photo carrée dans public/ (ex. '/jeremy.jpg'), ou null pour l'initiale. */
  photo: null as string | null,
  phone: '06 11 71 83 68',
  tel: '+33611718368',
  whatsapp: '33611718368',
}

/** Informations légales (page « Mentions légales »). */
export const COMPANY = {
  name: 'Dalia',
  legalForm: '[Forme juridique et capital, ex. SAS au capital de 1 000 €]',
  address: '[Adresse du siège], 34200 Sète',
  siret: '[Numéro SIRET]',
  rcs: '[RCS de rattachement, ex. RCS Montpellier 000 000 000]',
  vat: '[Numéro de TVA intracommunautaire]',
  director: '[Prénom Nom du directeur de la publication]',
  host: '[Hébergeur : nom, adresse, téléphone]',
}

/** Durée de conservation des demandes d'essai sans suite (prospects). */
export const LEAD_RETENTION = '3 ans à compter du dernier contact'
