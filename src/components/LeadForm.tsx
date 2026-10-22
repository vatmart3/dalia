import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, type FormEvent } from 'react'
import { Button } from './Button'
import { useEstimate } from '../lib/estimate'
import { FRESCY_SAVINGS_RATE, eur } from '../lib/config'
import { href } from '../lib/router'
import { track } from '../lib/analytics'

type Fields = 'nom' | 'commerce' | 'ville' | 'telephone'
type Errors = Partial<Record<Fields, string>>

const FIELDS: { name: Fields; label: string; type: string; autoComplete: string; placeholder: string; inputMode?: 'tel' }[] = [
  { name: 'nom', label: 'Votre nom', type: 'text', autoComplete: 'name', placeholder: 'Prénom Nom' },
  { name: 'commerce', label: 'Votre commerce', type: 'text', autoComplete: 'organization', placeholder: 'Épicerie du port' },
  { name: 'ville', label: 'Ville', type: 'text', autoComplete: 'address-level2', placeholder: 'Sète' },
  { name: 'telephone', label: 'Téléphone', type: 'tel', autoComplete: 'tel', placeholder: '06 12 34 56 78', inputMode: 'tel' },
]

// Build « démo » (aperçu en ligne sans serveur) : l'envoi est simulé, rien n'est transmis.
const DEMO = import.meta.env.MODE === 'demo'

const PHONE_RE = /^(?:\+33|0033|0)[1-9]\d{8}$/

function validate(data: Record<Fields, string>): Errors {
  const e: Errors = {}
  if (data.nom.trim().length < 2) e.nom = 'Indiquez votre nom.'
  if (data.commerce.trim().length < 2) e.commerce = 'Indiquez le nom ou le type de votre commerce.'
  if (data.ville.trim().length < 2) e.ville = 'Indiquez votre ville.'
  if (!PHONE_RE.test(data.telephone.replace(/[\s.\-()]/g, ''))) e.telephone = 'Un numéro français, par exemple 06 12 34 56 78.'
  return e
}

function Success({ name }: { name: string }) {
  return (
    <motion.div
      className="success"
      role="status"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 160, damping: 20 }}
    >
      <svg className="success__check" viewBox="0 0 88 88" aria-hidden="true">
        <motion.circle
          cx="44"
          cy="44"
          r="40"
          fill="#E7F6EE"
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          style={{ originX: '50%', originY: '50%' }}
        />
        <motion.circle
          cx="44"
          cy="44"
          r="40"
          fill="none"
          stroke="#13804C"
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M28 45l11 11 21-23"
          fill="none"
          stroke="#13804C"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.45, ease: 'easeOut' }}
        />
      </svg>
      <h3>Merci{name ? ` ${name}` : ''}, c’est noté.</h3>
      <p>Votre demande d’essai est bien enregistrée.</p>
      <ol className="success__steps">
        <li>
          <b>1</b>On vous appelle sous 48 h
        </li>
        <li>
          <b>2</b>On fixe ensemble le jour de l’installation
        </li>
        <li>
          <b>3</b>Votre mois gratuit démarre
        </li>
      </ol>
    </motion.div>
  )
}

export function LeadForm({ reducedMotion, source = 'accueil' }: { reducedMotion: boolean; source?: string }) {
  const estimate = useEstimate()
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [serverError, setServerError] = useState('')
  const [firstName, setFirstName] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(FIELDS.map((f) => [f.name, String(fd.get(f.name) ?? '')])) as Record<Fields, string>
    const errs = validate(data)
    setErrors(errs)
    const firstInvalid = FIELDS.find((f) => errs[f.name])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLInputElement>(`[name="${firstInvalid.name}"]`)?.focus()
      return
    }
    setStatus('sending')
    setServerError('')
    if (DEMO) {
      await new Promise((r) => setTimeout(r, 600))
      setFirstName(data.nom.trim().split(/\s+/)[0])
      setStatus('done')
      return
    }
    const pertes = estimate.touched ? { pertesSemaine: estimate.weekly } : {}
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...pertes, site: String(fd.get('site') ?? ''), source }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (body.fields) setErrors(body.fields)
        throw new Error(body.error || 'Envoi impossible')
      }
      setFirstName(data.nom.trim().split(/\s+/)[0])
      setStatus('done')
      track('Demande d’essai envoyée', { source })
    } catch (err) {
      setStatus('error')
      setServerError(
        err instanceof Error && err.message !== 'Failed to fetch'
          ? `${err.message}. Réessayez dans un instant.`
          : 'La connexion a échoué. Vérifiez votre réseau et réessayez.',
      )
    }
  }

  return (
    <div className="form-card" id="essai">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'done' ? (
          <Success key="ok" name={firstName} />
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            aria-labelledby="form-title"
          >
            <h3 id="form-title">Demander mon essai gratuit</h3>
            {estimate.touched ? (
              <p className="form-card__intro">
                Vous estimez perdre <strong>{eur(estimate.weekly * 52)} par an</strong>. On regarde ensemble comment en récupérer environ{' '}
                {eur(Math.round(estimate.weekly * 52 * FRESCY_SAVINGS_RATE))}.
              </p>
            ) : (
              <p className="form-card__intro">4 champs, 20 secondes. On vous rappelle pour fixer l’installation.</p>
            )}
            {FIELDS.map((f) => (
              <div className="field" key={f.name}>
                <label htmlFor={`f-${f.name}`}>{f.label}</label>
                <motion.input
                  id={`f-${f.name}`}
                  name={f.name}
                  type={f.type}
                  inputMode={f.inputMode}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  required
                  aria-invalid={errors[f.name] ? true : undefined}
                  aria-describedby={errors[f.name] ? `e-${f.name}` : undefined}
                  animate={errors[f.name] && !reducedMotion ? { x: [0, -6, 6, -3, 3, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onChange={() => errors[f.name] && setErrors((prev) => ({ ...prev, [f.name]: undefined }))}
                />
                {errors[f.name] && (
                  <span className="field__error" id={`e-${f.name}`}>
                    {errors[f.name]}
                  </span>
                )}
              </div>
            ))}
            <div className="hp" aria-hidden="true">
              <label htmlFor="f-site">Site web</label>
              <input id="f-site" name="site" type="text" tabIndex={-1} autoComplete="off" />
            </div>
            <Button type="submit" block disabled={status === 'sending'} aria-busy={status === 'sending'}>
              {status === 'sending' ? 'Envoi…' : 'Je veux tester Frescy'}
            </Button>
            {status === 'error' && (
              <p className="form-card__error" role="alert">
                {serverError}
              </p>
            )}
            <p className="form-card__legal">
              {DEMO && <>Version de démonstration : aucune donnée n’est envoyée. </>}
              Vos coordonnées servent uniquement à vous recontacter au sujet de Frescy.{' '}
              <a href={href('confidentialite')}>Politique de confidentialité</a>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
