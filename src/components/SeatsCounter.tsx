import { PILOT_SEATS, PILOT_SEATS_LEFT } from '../lib/config'

/** « 7 places restantes sur 10 » : piloté par PILOT_SEATS_LEFT (src/lib/config.ts). */
export function SeatsCounter({ className = '' }: { className?: string }) {
  const left = Math.max(0, Math.min(PILOT_SEATS, PILOT_SEATS_LEFT))
  return (
    <p className={`seats ${className}`}>
      <span className="seats__bar" aria-hidden="true">
        {Array.from({ length: PILOT_SEATS }, (_, i) => (
          <i key={i} className={i < PILOT_SEATS - left ? 'is-taken' : undefined} />
        ))}
      </span>
      <span>
        <strong>
          {left} place{left > 1 ? 's' : ''} restante{left > 1 ? 's' : ''}
        </strong>{' '}
        sur {PILOT_SEATS}
      </span>
    </p>
  )
}
