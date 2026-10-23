import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { ButtonLink } from './Button'
import { APP_URL, CTA_LABEL, CTA_TARGET } from '../lib/config'
import { href } from '../lib/router'

/**
 * En-tête fixe. Sur l'accueil : navigation par ancres.
 * Sur les autres pages : logo vers l'accueil, et bouton principal vers `ctaHref`.
 * À droite : « Connexion » (discret, vers l'appli) puis le bouton principal.
 */
export function Header({ home = true, ctaHref = CTA_TARGET }: { home?: boolean; ctaHref?: string }) {
  const [scrolled, setScrolled] = useState(false)
  // Repère invisible de 8 px en haut de page : dès qu'il sort de l'écran, le header prend sa bordure.
  // (IntersectionObserver plutôt qu'un écouteur de scroll : rien ne tourne pendant le défilement.)
  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.setAttribute('aria-hidden', 'true')
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none'
    document.body.prepend(sentinel)
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting))
    io.observe(sentinel)
    return () => {
      io.disconnect()
      sentinel.remove()
    }
  }, [])
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="wrap">
        <a className="logo" href={home ? '#top' : href('')} aria-label={home ? 'Frescy, retour en haut de page' : 'Frescy, accueil'}>
          <Logo />
        </a>
        {home && (
          <nav className="nav" aria-label="Navigation principale">
            <a href="#probleme">Le problème</a>
            <a href="#calculateur">Calculateur</a>
            <a href="#comment-ca-marche">Comment ça marche</a>
            <a href="#metiers">Métiers</a>
            <a href="#offre">Offre</a>
            <a href="#faq">FAQ</a>
          </nav>
        )}
        <div className="site-header__actions">
          <a className="header-login" href={APP_URL} aria-label="Connexion à l’appli Frescy">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="8.5" r="3.5" />
              <path d="M5 19.5c1.2-3.3 3.8-5 7-5s5.8 1.7 7 5" />
            </svg>
            <span>Connexion</span>
          </a>
          <ButtonLink href={ctaHref} size="sm" arrow={false} className="header-cta">
            {CTA_LABEL}
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
