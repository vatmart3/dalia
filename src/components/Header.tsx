import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { ButtonLink } from './Button'
import { CTA_TARGET } from '../lib/config'
import { href } from '../lib/router'

/**
 * En-tête fixe. Sur l'accueil : navigation par ancres.
 * Sur les autres pages : logo vers l'accueil, et bouton d'essai vers `ctaHref`.
 */
export function Header({ home = true, ctaHref = CTA_TARGET }: { home?: boolean; ctaHref?: string }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
        <ButtonLink href={ctaHref} size="sm" arrow={false}>
          Essai gratuit
        </ButtonLink>
      </div>
    </header>
  )
}
