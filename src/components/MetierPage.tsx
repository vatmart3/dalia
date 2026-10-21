import { ButtonLink } from './Button'
import { HowItWorks } from './HowItWorks'
import { FinalCta } from './FinalCta'
import { Founder } from './Founder'
import { Reveal } from './Reveal'
import { ProductThumb } from './ProductGlyph'
import { IconBell } from './Icons'
import { Sticker } from './Sticker'
import { Blobs } from './Blobs'
import { CTA_LABEL, CTA_TARGET, PILOT_AREA, PILOT_SEATS } from '../lib/config'
import { METIERS, metierBySlug } from '../lib/metiers'
import { href, useDocumentMeta, type MetierSlug } from '../lib/router'

export function MetierPage({ slug, reducedMotion }: { slug: MetierSlug; reducedMotion: boolean }) {
  const m = metierBySlug(slug)
  useDocumentMeta(m.seoTitle, m.seoDescription)
  const others = METIERS.filter((o) => o.slug !== slug)

  return (
    <>
      <section className="section metier-hero" aria-labelledby="metier-title">
        <Blobs
          items={[
            { color: 'var(--tomate)', size: '360px', top: '-80px', right: '-120px', opacity: 0.9 },
            { color: 'var(--menthe)', size: '160px', bottom: '10%', left: '-50px', opacity: 0.6 },
          ]}
        />
        <div className="wrap metier-hero__grid">
          <div>
            <a className="back-link" href={href('')}>
              ← Accueil
            </a>
            <p className="badge">Dalia pour les {m.plural}</p>
            <h1 id="metier-title" className="h1">
              {m.title}
            </h1>
            <p className="lead hero__sub">{m.intro}</p>
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

      <section className="section sheet sheet--abricot" aria-labelledby="cases-title">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Au quotidien</span>
            <h2 id="cases-title" className="h2">
              Ce que Dalia change dans votre {m.name.toLowerCase()}.
            </h2>
          </div>
          <ul className="cases">
            {m.cases.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.1} className="card case" rotate={i % 2 ? 1 : -1}>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <HowItWorks />
      <Founder />

      <section className="section sheet sheet--creme2" aria-label="Autres métiers">
        <div className="wrap other-metiers">
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
