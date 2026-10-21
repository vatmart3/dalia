import { ButtonLink } from './Button'
import { HowItWorks } from './HowItWorks'
import { FinalCta } from './FinalCta'
import { Founder } from './Founder'
import { Reveal } from './Reveal'
import { ProductThumb } from './ProductGlyph'
import { IconBell } from './Icons'
import { Sticker } from './Sticker'
import { Awning } from './etal/Awning'
import { Crate } from './etal/Crate'
import { CTA_LABEL, CTA_TARGET, PILOT_AREA, PILOT_SEATS } from '../lib/config'
import { METIERS, metierBySlug } from '../lib/metiers'
import { href, useDocumentMeta, type MetierSlug } from '../lib/router'

export function MetierPage({ slug, reducedMotion }: { slug: MetierSlug; reducedMotion: boolean }) {
  const m = metierBySlug(slug)
  useDocumentMeta(m.seoTitle, m.seoDescription)
  const others = METIERS.filter((o) => o.slug !== slug)

  return (
    <>
      <section className="panel metier-hero" aria-labelledby="metier-title">
        <Awning className="hero__awning" />
        <div className="metier-hero__grid">
          <div>
            <a className="back-link" href={href('')}>
              ← Accueil
            </a>
            <div className="slate">
              <p className="carton hero__badge">Dalia pour les {m.plural}</p>
              <h1 id="metier-title" className="h1">
                {m.title}
              </h1>
            </div>
            <p className="lead metier-hero__intro">{m.intro}</p>
            <div className="cta-row">
              <ButtonLink href={CTA_TARGET}>{CTA_LABEL}</ButtonLink>
            </div>
            <p className="cta-note" style={{ marginTop: '1rem' }}>
              <strong>1 mois offert</strong>, installation faite par nous. {PILOT_SEATS} places pilotes à {PILOT_AREA}.
            </p>
          </div>
          <Reveal className="metier-alert" y={40}>
            <Sticker color="#FFB23E" rotate={14}>
              {m.alert.body.match(/−\d+ %/)?.[0].replace(' ', '') ?? '−20%'}
            </Sticker>
            <div className="metier-alert__card">
              <div className="app__notif-top">
                <span className="app__notif-icon">
                  <IconBell />
                </span>
                DALIA
                <span className="app__notif-time">maintenant</span>
              </div>
              <div className="metier-alert__row">
                <ProductThumb kind={m.alert.product} />
                <div>
                  <div className="app__notif-title">{m.alert.title}</div>
                  <div className="app__notif-body">{m.alert.body}</div>
                </div>
              </div>
              <div className="app__notif-actions">
                <span className="app__notif-btn">Plus tard</span>
                <span className="app__notif-btn app__notif-btn--primary">Appliquer</span>
              </div>
            </div>
            <p className="metier-alert__caption">Exemple d’alerte pour une {m.name.toLowerCase()}</p>
          </Reveal>
        </div>
      </section>

      <Crate titleId="cases-title" tone="abricot" eyebrow="Au quotidien" title={<>Ce que Dalia change dans votre {m.name.toLowerCase()}.</>}>
        <ul className="pilots__list cases">
          {m.cases.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.1} className="kraft" rotate={[-2, 1.5, -1][i % 3]}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </ul>
      </Crate>

      <HowItWorks />
      <Founder />

      <section className="panel" aria-label="Autres métiers">
        <div className="other-metiers">
          <span>Dalia existe aussi pour les</span>
          {others.map((o) => (
            <a key={o.slug} className="text-link" href={href(o.slug)}>
              {o.plural}
            </a>
          ))}
        </div>
      </section>

      <FinalCta reducedMotion={reducedMotion} source={`page-${slug}`} />
    </>
  )
}
