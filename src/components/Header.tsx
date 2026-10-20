import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { ButtonLink } from './Button'
import { CTA_TARGET } from '../lib/config'

export function Header() {
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
        <a className="logo" href="#top" aria-label="Dalia, retour en haut de page">
          <Logo />
        </a>
        <nav className="nav" aria-label="Navigation principale">
          <a href="#probleme">Le problème</a>
          <a href="#calculateur">Calculateur</a>
          <a href="#comment-ca-marche">Comment ça marche</a>
          <a href="#offre">Offre</a>
          <a href="#faq">FAQ</a>
        </nav>
        <ButtonLink href={CTA_TARGET} size="sm" arrow={false}>
          Essai gratuit
        </ButtonLink>
      </div>
    </header>
  )
}
