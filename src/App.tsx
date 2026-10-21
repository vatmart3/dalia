import { MotionConfig } from 'framer-motion'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { WasteCounter } from './components/WasteCounter'
import { Problem } from './components/Problem'
import { Calculator } from './components/Calculator'
import { HowItWorks } from './components/HowItWorks'
import { Metiers } from './components/Metiers'
import { Features } from './components/Features'
import { Pilots } from './components/Pilots'
import { Founder } from './components/Founder'
import { Offer } from './components/Offer'
import { Faq } from './components/Faq'
import { FinalCta } from './components/FinalCta'
import { FloatingCta } from './components/FloatingCta'
import { Footer } from './components/Footer'
import { MetierPage } from './components/MetierPage'
import { Etal } from './components/etal/Etal'
import { LegalPage } from './components/LegalPage'
import { useReducedMotion } from './hooks/useReducedMotion'
import { EstimateProvider } from './lib/estimate'
import { href, useDocumentMeta, useView } from './lib/router'

const HOME_TITLE = 'Dalia — Fini les produits périmés en rayon | Appli anti-gaspi pour commerces'
const HOME_DESCRIPTION =
  'Dalia surveille les dates limites de vos produits, vous alerte avant péremption et vous dit quoi mettre en promo. Pour épiceries, boulangeries, boucheries et supérettes. 1 mois offert, installation sur place.'

function Home({ reducedMotion }: { reducedMotion: boolean }) {
  useDocumentMeta(import.meta.env.MODE === 'demo' ? 'Dalia' : HOME_TITLE, HOME_DESCRIPTION)
  return (
    <Etal>
      <Hero />
      <WasteCounter reducedMotion={reducedMotion} />
      <Problem />
      <Calculator reducedMotion={reducedMotion} />
      <HowItWorks />
      <Metiers />
      <Features reducedMotion={reducedMotion} />
      <Pilots />
      <Founder />
      <Offer />
      <Faq />
      <FinalCta reducedMotion={reducedMotion} />
    </Etal>
  )
}

export default function App() {
  const reducedMotion = useReducedMotion()
  const view = useView()
  const hasForm = view.kind !== 'legal'
  // Sur les pages légales (sans formulaire), l'essai renvoie vers l'accueil.
  const ctaHref = hasForm ? '#essai' : href('') === '/' ? '/#essai' : href('')

  return (
    <EstimateProvider>
      <MotionConfig reducedMotion="user">
        {hasForm && (
          <a className="skip-link" href="#essai">
            Aller au formulaire d’essai
          </a>
        )}
        <Header home={view.kind === 'home'} ctaHref={ctaHref} />
        <main key={view.kind === 'home' ? 'home' : `${view.kind}-${view.slug}`}>
          {view.kind === 'home' && <Home reducedMotion={reducedMotion} />}
          {view.kind === 'metier' && <MetierPage slug={view.slug} reducedMotion={reducedMotion} />}
          {view.kind === 'legal' && <LegalPage slug={view.slug} />}
        </main>
        <Footer />
        {hasForm && <FloatingCta key={view.kind === 'home' ? 'cta-home' : `cta-${view.slug}`} />}
      </MotionConfig>
    </EstimateProvider>
  )
}
