import { LeadForm } from './LeadForm'
import { IconCheckCircle } from './Icons'
import { PILOT_AREA, PILOT_SEATS } from '../lib/config'

const TRUST = ['Installation sur place, par nous', '1 mois gratuit, sans carte bancaire', 'Sans engagement : vous arrêtez quand vous voulez']

/** Le commerçant, en silhouette simple (sans visage), le bras tendu. */
function Merchant() {
  return (
    <svg className="merchant__svg" viewBox="0 0 220 300" aria-hidden="true">
      {/* bras tendu vers l'étiquette */}
      <path d="M128 132c26-4 48-10 72-26" fill="none" stroke="#3B1F4A" strokeWidth="22" strokeLinecap="round" />
      <circle cx="202" cy="104" r="13" fill="#3B1F4A" />
      {/* corps */}
      <path d="M40 300c0-90 20-150 70-160 50 10 70 70 70 160z" fill="#3B1F4A" />
      {/* tablier */}
      <path d="M78 176h64l10 124H68z" fill="#FFF6E9" stroke="#3B1F4A" strokeWidth="4" strokeLinejoin="round" />
      <path d="M92 214h36" stroke="#FF5A3C" strokeWidth="5" strokeLinecap="round" />
      {/* tête et casquette */}
      <circle cx="110" cy="92" r="40" fill="#3B1F4A" />
      <path d="M66 82c4-30 26-44 48-44s40 12 44 34c-28-8-62-6-92 10z" fill="#FF5A3C" stroke="#3B1F4A" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  )
}

export function FinalCta({ reducedMotion, source }: { reducedMotion: boolean; source?: string }) {
  return (
    <section className="panel panel--final final" aria-labelledby="final-title">
      <div className="final__inner">
        <div className="final__copy">
          <h2 id="final-title" className="final__title">
            Dalia veille. <span>Et vous, vous vendez.</span>
          </h2>
          <p className="final__sub">
            {PILOT_SEATS} places pilotes à {PILOT_AREA}. Réservez la vôtre, on s’occupe du reste.
          </p>
          <ul className="final__trust">
            {TRUST.map((t) => (
              <li key={t}>
                <IconCheckCircle />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="merchant">
          <Merchant />
          <a className="merchant__tag" href="#essai">
            Essai gratuit
          </a>
        </div>
        <LeadForm reducedMotion={reducedMotion} source={source} />
      </div>
    </section>
  )
}
