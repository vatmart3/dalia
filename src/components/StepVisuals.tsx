// Visuels sobres des 3 étapes (SVG, bleu + abricot pour la promo).

const BLUE = '#1D3FBF'
const INK = '#0E1A3A'
const APRICOT = '#F2A541'
const LINE = '#E4E1D8'

export function PhotoVisual() {
  return (
    <svg viewBox="0 0 320 176" aria-hidden="true">
      <rect x="112" y="18" width="96" height="176" rx="18" fill="#fff" stroke={LINE} />
      <rect x="124" y="34" width="72" height="72" rx="10" fill="#EEF1FB" />
      <path d="M134 44h12M134 44v12M186 44h-12M186 44v12M134 96h12M134 96v-12M186 96h-12M186 96v-12" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
      <rect x="140" y="62" width="40" height="16" rx="4" fill="#fff" stroke={LINE} />
      <text x="160" y="74" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="10" fontWeight="700" fill={INK}>
        16/05
      </text>
      <rect x="124" y="118" width="72" height="9" rx="4.5" fill="#ECE9E1" />
      <rect x="124" y="133" width="48" height="9" rx="4.5" fill="#ECE9E1" />
      <circle cx="160" cy="162" r="11" fill={BLUE} />
      <g transform="translate(222 52)">
        <rect width="72" height="30" rx="15" fill="#fff" stroke={LINE} />
        <circle cx="16" cy="15" r="7" fill="#EEF1FB" />
        <path d="M12.5 15l2.5 2.5 4.5-5" stroke={BLUE} strokeWidth="2" fill="none" strokeLinecap="round" />
        <text x="30" y="19" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill={INK}>
          Lu !
        </text>
      </g>
    </svg>
  )
}

export function AlertVisual() {
  return (
    <svg viewBox="0 0 320 176" aria-hidden="true">
      <rect x="40" y="40" width="240" height="96" rx="20" fill="#fff" stroke={LINE} />
      <rect x="58" y="58" width="24" height="24" rx="7" fill={BLUE} />
      <path d="M64.5 74v-4a5.5 5.5 0 0 1 11 0v4l1.3 1.6h-13.6zM68 78.5a2 2 0 0 0 4 0" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinejoin="round" />
      <text x="92" y="74" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#5A6478">
        DALIA · maintenant
      </text>
      <text x="58" y="104" fontFamily="Inter,sans-serif" fontSize="14" fontWeight="700" fill={INK}>
        12 yaourts expirent dans 2 jours
      </text>
      <text x="58" y="122" fontFamily="Inter,sans-serif" fontSize="12" fill="#5A6478">
        Rayon frais · DLC 16/05
      </text>
      <rect x="226.5" y="58.5" width="35" height="19" rx="9.5" fill="#fff" stroke={INK} />
      <text x="244" y="72" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="700" fill={INK}>
        J-2
      </text>
    </svg>
  )
}

export function PromoVisual() {
  return (
    <svg viewBox="0 0 320 176" aria-hidden="true">
      <rect x="40" y="30" width="240" height="116" rx="20" fill="#fff" stroke={LINE} />
      <text x="60" y="60" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#5A6478">
        PROMO CONSEILLÉE
      </text>
      {/* Étiquette promo abricot, légèrement de travers comme une vraie étiquette collée */}
      <g transform="rotate(-4 98 86)">
        <path d="M58 70h70l14 16-14 16H58a4 4 0 0 1-4-4V74a4 4 0 0 1 4-4z" fill={APRICOT} />
        <circle cx="130" cy="86" r="3" fill="#fff" />
        <text x="62" y="95" fontFamily="Anton,Impact,sans-serif" fontSize="22" fill={INK}>
          −20 %
        </text>
      </g>
      <text x="166" y="80" fontFamily="Inter,sans-serif" fontSize="11" fill="#5A6478">
        Prix : 2,40 € → 1,92 €
      </text>
      <text x="166" y="98" fontFamily="Inter,sans-serif" fontSize="11" fill="#5A6478">
        Vente estimée : 11 / 12
      </text>
      <rect x="60" y="112" width="200" height="22" rx="11" fill={BLUE} />
      <text x="160" y="127" textAnchor="middle" fontFamily="Inter,sans-serif" fontSize="11" fontWeight="600" fill="#fff">
        Appliquer et imprimer l’étiquette
      </text>
    </svg>
  )
}
