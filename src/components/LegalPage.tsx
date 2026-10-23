import { COMPANY, CONTACT_EMAIL, FOUNDER, LEAD_RETENTION } from '../lib/config'
import { href, useDocumentMeta, type LegalSlug } from '../lib/router'

const Mail = () => <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
const Phone = () => <a href={`tel:${FOUNDER.tel}`}>{FOUNDER.phone}</a>

function MentionsLegales() {
  return (
    <>
      <h1 className="h2">Mentions légales</h1>
      <h2>Éditeur du site</h2>
      <p>
        Le site {COMPANY.brand} est édité par <strong>{COMPANY.name}</strong>, {COMPANY.owner}.
        <br />
        {COMPANY.street}, {COMPANY.city}
        <br />
        SIRET : {COMPANY.siret}
        <br />
        {COMPANY.vat}
        <br />
        E-mail : <Mail />
        <br />
        Téléphone : <Phone />
      </p>
      <h2>Directeur de la publication</h2>
      <p>{COMPANY.owner}</p>
      <h2>Hébergement</h2>
      <p>
        {COMPANY.host.name}
        <br />
        {COMPANY.host.address}
        <br />
        <a href={COMPANY.host.url} target="_blank" rel="noopener noreferrer">
          vercel.com
        </a>
      </p>
      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes, visuels et le logo {COMPANY.brand} appartiennent à {COMPANY.name}. Toute reproduction sans autorisation écrite est interdite.
      </p>
      <h2>Données personnelles</h2>
      <p>
        Le traitement des informations envoyées par le formulaire est décrit dans la <a href={href('confidentialite')}>politique de confidentialité</a>.
      </p>
    </>
  )
}

function Confidentialite() {
  return (
    <>
      <h1 className="h2">Politique de confidentialité</h1>
      <p className="legal__intro">
        Nous collectons le strict nécessaire pour vous rappeler. Rien de plus, et vos données ne sont jamais revendues.
      </p>
      <h2>Responsable du traitement</h2>
      <p>
        {COMPANY.name}, {COMPANY.owner}, {COMPANY.street}, {COMPANY.city}. Contact : <Mail />.
      </p>
      <h2>Données collectées</h2>
      <p>Par le formulaire « Devenir commerce pilote » :</p>
      <ul>
        <li>le nom de votre commerce ;</li>
        <li>votre prénom ;</li>
        <li>votre numéro de téléphone ;</li>
        <li>le type de votre commerce (boulangerie, boucherie, épicerie, autre).</li>
      </ul>
      <p>
        S’y ajoutent la date de la demande, la page d’où elle a été envoyée et, si vous avez utilisé le calculateur, le montant de pertes que vous y avez
        estimé.
      </p>
      <h2>Pourquoi</h2>
      <p>
        Uniquement pour vous recontacter au sujet de Frescy (programme pilote, installation, essai). Base légale : les mesures précontractuelles prises à votre
        demande (article 6.1.b du RGPD).
      </p>
      <h2>Qui y a accès</h2>
      <p>
        {COMPANY.owner} uniquement. Vos données ne sont jamais vendues, louées ni cédées. Pour fonctionner, le site s’appuie sur des prestataires qui ne les
        utilisent que pour nous rendre ce service : l’hébergeur du site (Vercel), le service qui nous transmet votre demande par e-mail (Resend) et Google
        (Google Forms), où une copie de la demande est enregistrée.
      </p>
      <h2>Combien de temps</h2>
      <p>Vos données sont conservées {LEAD_RETENTION} après notre dernier échange, puis supprimées.</p>
      <h2>Vos droits</h2>
      <p>
        Vous pouvez à tout moment demander l’accès à vos données, leur rectification ou leur suppression, ou vous opposer à leur traitement, en écrivant à{' '}
        <Mail />. Nous répondons sous un mois. Vous pouvez aussi adresser une réclamation à la CNIL (cnil.fr).
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
    slug === 'mentions-legales' ? 'Mentions légales du site Frescy.' : 'Comment Frescy traite les informations envoyées par le formulaire « Devenir commerce pilote ».',
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
