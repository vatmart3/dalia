import type { ReactNode } from 'react'
import { CTA_LABEL, CTA_TARGET } from '../lib/config'
import { ButtonLink } from './Button'

/** CTA répété à chaque section. */
export function CtaRow({
  note,
  variant = 'primary',
  label = CTA_LABEL,
  center,
}: {
  note?: ReactNode
  variant?: 'primary' | 'ghost' | 'white'
  label?: string
  center?: boolean
}) {
  return (
    <div className={`cta-row ${center ? 'cta-row--center' : ''}`}>
      <ButtonLink href={CTA_TARGET} variant={variant}>
        {label}
      </ButtonLink>
      {note && <p className="cta-note">{note}</p>}
    </div>
  )
}
