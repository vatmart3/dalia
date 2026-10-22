import { COMPANY, FOUNDER, LEAD_RETENTION } from '../lib/config'
import { href, useDocumentMeta, type LegalSlug } from '../lib/router'

function MentionsLegales() {
  return (
    <>
      <h1 className="h2">Mentions légales</h1>
      <h2>Éditeur du site</h2>
      <p>
        {COMPANY.name}, {COMPANY.legalForm}
        <br />
        Siège : {COMPANY.address}
        <br />
        SIRET : {COMPANY.siret} · {COMPANY.rcs}
        <br />
        TVA intracommunautaire : {COMPANY.vat}
        <br />
        Contact : {FOUNDER.name}, {FOUNDER.phone} (appel ou WhatsApp)
      </p>
      <h2>Directeur de la publication</h2>
      <p>{COMPANY.director}</p>
      <h2>Hébergement</h2>
      <p>{COMPANY.host}</p>
      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, visuels et le logo Frescy sont la propriété de {COMPANY.name}. Toute reproduction sans autorisation écrite est interdite.
      </p>
      <h2>Données personnelles</h2>
      <p>
        Le traitement des informations envoyées par le formulaire est décrit dans notre <a href={href('confidentialite')}>politique de confidentialité</a>.
      </p>
    </>
  )
}

function Confidentialite() {
  return (
    <>
      <h1 className="h2">Politique de confidentialité</h1>
      <p className="legal__intro">
        Nous collectons le strict nécessaire pour vous rappeler au sujet de l’essai de Frescy. Rien de plus, et rien n’est revendu.
      </p>
      <h2>Responsable du traitement</h2>
      <p>
        {COMPANY.name}, {COMPANY.address}. Contact : {FOUNDER.phone}.
      </p>
      <h2>Données collectées</h2>
      <ul>
        <li>Votre nom, le nom de votre commerce, votre ville et votre numéro de téléphone, saisis dans le formulaire.</li>
        <li>Si vous avez utilisé le calculateur : le montant de pertes hebdomadaires estimé.</li>
        <li>La date de votre demande et la page d’où elle a été envoyée.</li>
      </ul>
      <h2>Pourquoi</h2>
      <p>
        Uniquement pour vous recontacter, organiser l’installation et l’essai gratuit de Frescy. Base légale : les mesures précontractuelles prises à votre demande
        (article 6.1.b du RGPD).
      </p>
      <h2>Qui y a accès</h2>
      <p>
        L’équipe Frescy uniquement, ainsi que notre hébergeur et, le cas échéant, l’outil qui nous notifie des nouvelles demandes (par exemple un tableur en
        ligne), dans la limite de ce qui est nécessaire à leur service.
      </p>
      <h2>Combien de temps</h2>
      <p>
        Si vous devenez client, vos données sont conservées pendant la durée du contrat. Sinon, elles sont supprimées au bout de {LEAD_RETENTION}.
      </p>
      <h2>Vos droits</h2>
      <p>
        Vous pouvez demander l’accès, la rectification ou la suppression de vos données, ou vous opposer à leur traitement, en appelant ou en écrivant sur WhatsApp au {FOUNDER.phone}. Nous
        répondons sous un mois. Vous pouvez aussi adresser une réclamation à la CNIL (cnil.fr).
      </p>
      <h2>Cookies et mesure d’audience</h2>
      <p>
        Ce site ne dépose aucun cookie publicitaire ni de suivi. S’il est activé, l’outil de mesure d’audience utilisé (Plausible) ne dépose pas de cookie et
        ne collecte aucune donnée personnelle : il compte les visites de façon anonyme.
      </p>
    </>
  )
}

export function LegalPage({ slug }: { slug: LegalSlug }) {
  useDocumentMeta(
    slug === 'mentions-legales' ? 'Mentions légales · Frescy' : 'Politique de confidentialité · Frescy',
    slug === 'mentions-legales' ? 'Mentions légales du site Frescy.' : 'Comment Frescy traite les informations envoyées par le formulaire d’essai.',
  )
  return (
    <section className="section legal">
      <div className="wrap legal__wrap">
        <a className="back-link" href={href('')}>
          ← Accueil
        </a>
        <article className="legal__body">{slug === 'mentions-legales' ? <MentionsLegales /> : <Confidentialite />}</article>
      </div>
    </section>
  )
}
