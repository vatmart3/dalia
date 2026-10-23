import { Logo } from './Logo'
import { CITY, COMPANY, CONTACT_EMAIL, FOUNDER } from '../lib/config'
import { METIERS } from '../lib/metiers'
import { href } from '../lib/router'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <span className="footer__logo">
            <Logo />
          </span>
          <p>
            <strong>Avec Frescy, rien ne se perd.</strong> L’anti-gaspi des commerces de proximité, depuis Sète.
          </p>
        </div>
        <nav className="footer__col" aria-label="Métiers">
          <span className="footer__title">Métiers</span>
          {METIERS.map((m) => (
            <a key={m.slug} href={href(m.slug)}>
              {m.name}
            </a>
          ))}
        </nav>
        <div className="footer__col">
          <span className="footer__title">Contact</span>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <a href={`tel:${FOUNDER.tel}`}>{FOUNDER.phone}</a>
          <span>{CITY}</span>
        </div>
        <nav className="footer__col" aria-label="Informations">
          <span className="footer__title">Informations</span>
          <a href={href('mentions-legales')}>Mentions légales</a>
          <a href={href('confidentialite')}>Confidentialité</a>
          <a href={href('')}>Accueil</a>
        </nav>
      </div>
      <div className="wrap footer__bottom">
        © {new Date().getFullYear()} {COMPANY.brand} · {COMPANY.name}
      </div>
    </footer>
  )
}
