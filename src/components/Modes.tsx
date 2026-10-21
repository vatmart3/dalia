import { useEffect, useRef, useState } from 'react'
import { CssPhone, type AlertMode } from './AppScreen'
import { CtaRow } from './CtaRow'
import { Reveal } from './Reveal'
import { useInViewport } from '../hooks/useInViewport'

const MODES: { id: AlertMode; num: string; title: string; text: string }[] = [
  {
    id: 'promo',
    num: '1',
    title: 'Mode promo',
    text: 'À l’approche de la date limite, Dalia suggère une remise (ex. −20 %) et prépare l’étiquette.',
  },
  {
    id: 'rotation',
    num: '2',
    title: 'Mode rotation, sans promo',
    text: 'Dalia vous rappelle de mettre l’article en avant, devant en rayon, pour qu’il soit vendu en premier.',
  },
]

/** Deux façons d'écouler avant la date : remise ou simple mise en avant, au choix du commerçant. */
export function Modes({ reducedMotion }: { reducedMotion: boolean }) {
  const [mode, setMode] = useState<AlertMode>('promo')
  const [touched, setTouched] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const visible = useInViewport(stageRef, '0px')

  // Tant que le visiteur n'a rien choisi, le téléphone alterne entre les deux alertes.
  useEffect(() => {
    if (touched || reducedMotion || !visible) return
    const id = window.setTimeout(() => setMode((m) => (m === 'promo' ? 'rotation' : 'promo')), 4200)
    return () => window.clearTimeout(id)
  }, [mode, touched, reducedMotion, visible])

  return (
    <section className="section section--soft" id="modes" aria-labelledby="modes-title">
      <div className="wrap modes">
        <div>
          <span className="eyebrow">Deux modes, au choix</span>
          <h2 id="modes-title" className="h2">
            Avec ou sans promo, c’est vous qui <em>choisissez</em>.
          </h2>
          <p className="lead modes__lead">Selon votre commerce et vos habitudes, Dalia s’adapte à votre façon de vendre.</p>

          <div className="modes__list" role="group" aria-label="Choisir un mode pour voir l’alerte">
            {MODES.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.08} y={16}>
                <button
                  type="button"
                  className={`mode-card ${mode === m.id ? 'is-active' : ''}`}
                  aria-pressed={mode === m.id}
                  onClick={() => {
                    setTouched(true)
                    setMode(m.id)
                  }}
                >
                  <span className="mode-card__num" aria-hidden="true">
                    {m.num}
                  </span>
                  <span className="mode-card__body">
                    <span className="mode-card__title">
                      {m.title}
                      {m.id === 'promo' ? (
                        <span className="mode-card__tag mode-card__tag--promo">−20 %</span>
                      ) : (
                        <span className="mode-card__tag">Devant en rayon</span>
                      )}
                    </span>
                    <span className="mode-card__text">{m.text}</span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
          <p className="modes__note">Vous pouvez changer de mode quand vous voulez.</p>
          <CtaRow />
        </div>

        <Reveal className="modes__screen" y={40}>
          <div ref={stageRef} className="modes__stage" aria-hidden="true">
            <CssPhone stage={1} mode={mode} />
          </div>
          <p className="sr-only" aria-live="polite">
            {mode === 'promo'
              ? 'Alerte du mode promo : 12 yaourts expirent dans 2 jours, promo conseillée moins 20 %.'
              : 'Alerte du mode rotation : 8 yaourts nature expirent dans 3 jours, placez-les devant en rayon.'}
          </p>
          <p className="modes__caption">{mode === 'promo' ? 'Alerte en mode promo' : 'Alerte en mode rotation'}</p>
        </Reveal>
      </div>
    </section>
  )
}
