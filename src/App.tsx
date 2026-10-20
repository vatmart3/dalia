import { MotionConfig } from 'framer-motion'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { WasteCounter } from './components/WasteCounter'
import { Problem } from './components/Problem'
import { Calculator } from './components/Calculator'
import { HowItWorks } from './components/HowItWorks'
import { Features } from './components/Features'
import { Testimonials } from './components/Testimonials'
import { Offer } from './components/Offer'
import { Faq } from './components/Faq'
import { FinalCta } from './components/FinalCta'
import { FloatingCta } from './components/FloatingCta'
import { Footer } from './components/Footer'
import { useReducedMotion } from './hooks/useReducedMotion'

export default function App() {
  const reducedMotion = useReducedMotion()
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#essai">
        Aller au formulaire d’essai
      </a>
      <Header />
      <main>
        <Hero reducedMotion={reducedMotion} />
        <WasteCounter reducedMotion={reducedMotion} />
        <Problem />
        <Calculator reducedMotion={reducedMotion} />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Offer />
        <Faq />
        <FinalCta reducedMotion={reducedMotion} />
      </main>
      <Footer />
      <FloatingCta />
    </MotionConfig>
  )
}
