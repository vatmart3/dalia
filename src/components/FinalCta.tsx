import { motion } from 'framer-motion'
import { LeadForm } from './LeadForm'
import { IconCheckCircle } from './Icons'
import { PILOT_AREA, PILOT_SEATS } from '../lib/config'

const TRUST = ['Installation sur place, par nous', '1 mois gratuit, sans carte bancaire', 'Sans engagement : vous arrêtez quand vous voulez']

export function FinalCta({ reducedMotion, source }: { reducedMotion: boolean; source?: string }) {
  return (
    <section className="final" aria-labelledby="final-title">
      <div className="wrap final__grid">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 110, damping: 20 }}
        >
          <h2 id="final-title" className="final__title display">
            Frescy veille. <span>Et vous, vous <em>vendez</em>.</span>
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
        </motion.div>
        <LeadForm reducedMotion={reducedMotion} source={source} />
      </div>
    </section>
  )
}
