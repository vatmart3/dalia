# Dalia — landing page

Landing page one-page de **Dalia**, l'appli anti-gaspillage pour les petits commerces alimentaires
(épiceries, boulangeries, boucheries, supérettes).

> Dalia veille, et votre marge ne part pas.

## Stack

- **Vite + React 19 + TypeScript**
- **Three.js / React Three Fiber** : iPhone 3D du hero. L'écran est un vrai élément DOM projeté en 3D (`CSS3DRenderer`), donc net et lisible.
- **GSAP ScrollTrigger** : intro au scroll (le téléphone se redresse, l'alerte arrive, la promo s'applique), avec un bouton **« Passer l'intro »**.
- **Framer Motion** : apparitions au scroll, micro-interactions des boutons, accordéons, confirmation du formulaire.
- API de leads en Node pur, sans dépendance (`server/`).

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173 (l'API /api/leads est branchée dans Vite)
npm run build      # typecheck + build dans dist/
npm start          # sert dist/ + l'API sur http://localhost:3000 (PORT configurable)
```

## Leads

Le formulaire final envoie `POST /api/leads` (nom, commerce, ville, téléphone).
Validation côté client **et** serveur (numéro français), champ pot de miel anti-spam et limite de 5 envois / 10 min par IP.

| Variable            | Rôle                                                                      |
| ------------------- | ------------------------------------------------------------------------- |
| `LEADS_DIR`         | Dossier de stockage (par défaut `data/`, fichier `leads.jsonl`)           |
| `LEADS_WEBHOOK_URL` | Transfère aussi chaque lead en JSON (Zapier, Make, Google Sheets, Slack…) |
| `ADMIN_TOKEN`       | Active l'export CSV : `GET /api/leads.csv?token=…`                        |

Sur un hébergement sans disque persistant (Vercel, Netlify…), utilisez `LEADS_WEBHOOK_URL`.

## Pages

| Page                    | Adresse (site)        | Adresse (aperçu démo)  |
| ----------------------- | --------------------- | ---------------------- |
| Accueil                 | `/`                   | `#accueil`             |
| Boulangerie, boucherie… | `/boulangerie`, etc.  | `#boulangerie`, etc.   |
| Mentions légales        | `/mentions-legales`   | `#mentions-legales`    |
| Confidentialité         | `/confidentialite`    | `#confidentialite`     |

Les textes des pages métier sont dans `src/lib/metiers.ts`.

## Être prévenu de chaque demande

`docs/google-sheets-leads.gs` : script Google Apps Script prêt à coller. Chaque demande
s'ajoute à une feuille Google Sheets et vous recevez un e-mail. Collez l'URL du script
dans `LEADS_WEBHOOK_URL`. Les demandes incluent l'estimation de pertes du calculateur
(`pertesSemaine`) quand le visiteur l'a utilisé.

## Mesure d'audience (sans cookies)

Plausible, désactivé par défaut. Pour l'activer : `VITE_PLAUSIBLE_DOMAIN=dalia.fr npm run build`.
Événements suivis : « Clic essai » (avec la section), « Calculateur utilisé »,
« Demande d'essai envoyée » (avec la page d'origine).

## Accessibilité et performance

- Mobile-first, bouton CTA flottant sur mobile, cibles tactiles ≥ 44 px, champs à 16 px (pas de zoom iOS).
- `prefers-reduced-motion` respecté : pas d'épinglage ni de rotation, état final affiché directement, compteur mis à jour à la seconde.
- Repli sans WebGL : téléphone en CSS 3D avec le même écran. La 3D est chargée à la demande et son rendu est mis en pause hors écran.
- SEO : title, meta description, Open Graph / Twitter (`public/og-image.png`), JSON-LD, robots.txt, sitemap.

## À personnaliser avant la mise en ligne

Tout ce qui est marqué « VALEURS D'EXEMPLE » dans `src/lib/config.ts` :

- `PRICE` : tarif après le mois gratuit (**39 € HT/mois est un exemple**, affiché dans l'offre et la FAQ).
- `FOUNDER` : nom, prénom, photo (`public/…`), téléphone, WhatsApp, e-mail.
- `COMPANY` : forme juridique, adresse, SIRET, RCS, TVA, directeur de la publication, hébergeur (page Mentions légales).
- `LEAD_RETENTION` : durée de conservation des prospects (3 ans, recommandation CNIL).

Et aussi :

- `src/lib/config.ts` : nombre de places pilotes, zone, hypothèse d'économie du calculateur, base du compteur (ADEME).
- `src/components/Testimonials.tsx` : **témoignages d'exemple** à remplacer par de vrais commerçants (avec leur accord) ; ajoutez `photo: '/…jpg'` pour afficher leur photo.
- `src/components/Problem.tsx` et `Faq.tsx` : chiffres et réponses à valider avec le produit réel (tarif, fonctionnalités).
- `index.html` : domaine (`https://dalia.fr/` utilisé comme exemple dans les balises canonical / Open Graph).
- `src/components/Faq.tsx` : la réponse sur les dons aux associations est à faire valider (réduction d'impôt selon la situation du commerce).
