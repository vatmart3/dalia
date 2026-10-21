/*
 * Mesure d'audience sans cookies (Plausible), désactivée par défaut.
 * Pour l'activer : VITE_PLAUSIBLE_DOMAIN=votre-domaine.fr npm run build
 * Rien n'est chargé dans l'aperçu « démo » ni sans cette variable.
 */

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void
  }
}

const DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined
const ENABLED = !!DOMAIN && import.meta.env.MODE !== 'demo'

export function initAnalytics() {
  if (!ENABLED) return
  const s = document.createElement('script')
  s.defer = true
  s.dataset.domain = DOMAIN
  s.src = 'https://plausible.io/js/script.js'
  document.head.appendChild(s)
  // Clics sur les appels à l'essai, avec la section d'origine.
  document.addEventListener('click', (e) => {
    const a = (e.target as Element | null)?.closest?.('a[href$="#essai"]')
    if (a) track('Clic essai', { section: a.closest('section, header')?.id || 'en-tete' })
  })
  // File d'attente tant que le script n'est pas chargé.
  window.plausible =
    window.plausible ||
    function (...args: unknown[]) {
      ;((window.plausible as unknown as { q?: unknown[] }).q ||= []).push(args)
    }
}

export function track(event: string, props?: Record<string, string | number>) {
  if (!ENABLED) return
  window.plausible?.(event, props ? { props } : undefined)
}
