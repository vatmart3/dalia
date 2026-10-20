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
