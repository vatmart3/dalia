import type { ReactNode } from 'react'
import { CTA_TARGET } from '../lib/config'

/** Rappel d'appel à l'action en fin de section : un lien sobre, pas un gros bouton. */
export function CtaRow({ note, label = 'Essayer Dalia gratuitement', center }: { note?: ReactNode; label?: string; center?: boolean }) {
  return (
    <div className={`cta-link-row ${center ? 'cta-link-row--center' : ''}`}>
      <a className="text-link" href={CTA_TARGET}>
        {label}
        <span aria-hidden="true"> →</span>
      </a>
      {note && <p className="cta-note">{note}</p>}
    </div>
  )
}
