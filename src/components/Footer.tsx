import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span className="footer__logo">
          <Logo />
        </span>
        <p>© {new Date().getFullYear()} Dalia · L’anti-gaspi des commerces de proximité, depuis Sète.</p>
        <nav className="footer__links" aria-label="Liens de pied de page">
          <a href="#comment-ca-marche">Comment ça marche</a>
          <a href="#faq">FAQ</a>
          <a href="#essai">Essai gratuit</a>
          <a href="/mentions-legales">Mentions légales</a>
        </nav>
      </div>
    </footer>
  )
}
