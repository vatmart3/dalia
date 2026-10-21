import { useEffect, useState } from 'react'

/*
 * Navigation très simple entre l'accueil, les pages métier et les pages légales.
 * - Site en production : vraies adresses (/boulangerie, /mentions-legales…),
 *   le serveur renvoie index.html pour chacune.
 * - Aperçu « démo » (artefact) : seules les ancres #… sont disponibles,
 *   on utilise donc #boulangerie, #mentions-legales…
 */

export const METIER_SLUGS = ['boulangerie', 'boucherie', 'epicerie', 'superette'] as const
export type MetierSlug = (typeof METIER_SLUGS)[number]
export const LEGAL_SLUGS = ['mentions-legales', 'confidentialite'] as const
export type LegalSlug = (typeof LEGAL_SLUGS)[number]

export type View = { kind: 'home' } | { kind: 'metier'; slug: MetierSlug } | { kind: 'legal'; slug: LegalSlug }

const DEMO = import.meta.env.MODE === 'demo'

/** Lien vers une page : `href('boulangerie')`, `href('')` pour l'accueil. */
export function href(slug: string) {
  if (DEMO) return slug ? `#${slug}` : '#accueil'
  return `/${slug}`
}

function viewFromSlug(slug: string): View | null {
  if (slug === '' || slug === 'accueil') return { kind: 'home' }
  if ((METIER_SLUGS as readonly string[]).includes(slug)) return { kind: 'metier', slug: slug as MetierSlug }
  if ((LEGAL_SLUGS as readonly string[]).includes(slug)) return { kind: 'legal', slug: slug as LegalSlug }
  return null
}

function initialView(): View {
  const fromHash = viewFromSlug(location.hash.replace(/^#/, ''))
  if (fromHash && location.hash) return fromHash
  return viewFromSlug(location.pathname.replace(/^\/|\/$/g, '')) ?? { kind: 'home' }
}

export function useView() {
  const [view, setView] = useState<View>(initialView)
  useEffect(() => {
    // Les ancres internes (#essai, #faq…) ne changent pas de page : seules les ancres de page comptent.
    const onHash = () => {
      const v = viewFromSlug(location.hash.replace(/^#/, ''))
      if (v && location.hash) {
        setView(v)
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return view
}

/** Titre et description de la page courante (SEO). */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
