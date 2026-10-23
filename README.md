# Frescy — landing page

Landing page one-page de **Frescy**, l'appli anti-gaspillage pour les petits commerces alimentaires
(épiceries, boulangeries, boucheries, supérettes).

> Avec Frescy, rien ne se perd.

## Stack

- **Vite + React 19 + TypeScript**
- **Design** : bleu profond #1D3FBF, marine #0E1A3A pour le texte, fonds blanc et crème #FBFAF7, un seul accent abricot #F2A541 réservé aux promos (étiquettes « −20 % », mois offert, flèche du bouton principal). Titres en Anton avec un mot clé penché en bleu, texte en Inter, signature manuscrite en Caveat. Bordures fines plutôt qu'ombres, mises en page asymétriques, léger grain de papier.
- **Hero** : titre à gauche, maquette de téléphone en CSS (inspirée de l'iPhone 17 Pro Max) à droite, avec la démo Photo → Alerte → Promo. Aucune 3D.
- **GSAP ScrollTrigger** : sur ordinateur, le hero est épinglé le temps de la démo (bouton « Passer l'intro ») ; sur mobile (< 900 px), pas d'épinglage : la démo joue en boucle (3 s par étape) quand le téléphone est à l'écran, se met en pause hors écran, et un appui sur un onglet relance la boucle. Le header couvre la zone de l'encoche iPhone (fond opaque).
- **Framer Motion** : apparitions douces au scroll, accordéons, confirmation du formulaire.
- API de leads en Node pur, sans dépendance (`server/`).

## Démarrer

```bash
npm install
npm run dev        # http://localhost:5173 (l'API /api/leads est branchée dans Vite)
npm run build      # typecheck + build dans dist/
npm start          # sert dist/ + l'API sur http://localhost:3000 (PORT configurable)
```

## Réglages rapides (`src/lib/config.ts`)

- **Places pilotes restantes** : `PILOT_SEATS_LEFT = 7` → tous les compteurs « 7 places restantes sur 10 » suivent.
- **Bouton principal** : `CTA_LABEL` (« Devenir commerce pilote »), il mène au formulaire `#essai`.
- **Connexion** : `APP_URL` (https://app.frescy.fr).
- **Témoignages** : `showTemoignages = false` → passez à `true` et remplissez `TEMOIGNAGES` après les premiers pilotes.
- **Photos** : déposez `portrait.webp`, `commerce-1.webp` … `commerce-4.webp`, `temoignage-1.webp` dans `src/assets/photos/`
  (voir `LISEZMOI.txt`). Tant qu'une photo manque, un visuel aux couleurs de Frescy s'affiche.

## Formulaire « Devenir commerce pilote »

Le formulaire envoie `POST /api/leads` (nom du commerce, prénom, téléphone, type de commerce).
Validation côté client **et** serveur (numéro français), champ pot de miel anti-spam et limite de 5 envois / 10 min par IP.

Chaque demande est transmise :
1. **par e-mail à contact@frescy.fr, via [Resend](https://resend.com)** (gratuit jusqu'à 3 000 e-mails/mois) ;
2. en copie dans le **Google Forms** déjà relié à votre feuille (`DEFAULT_GOOGLE_FORM_URL`, `server/leads.mjs`).

Si aucune transmission n'aboutit, le visiteur voit une erreur avec le numéro de Jérémy (pas de faux « Merci »),
et la demande complète reste lisible dans les logs Vercel.

**Activer l'e-mail (5 minutes) :**
1. Créez un compte sur resend.com **avec l'adresse contact@frescy.fr** (l'expéditeur de test de Resend n'écrit qu'à l'adresse du compte).
2. Resend → **API Keys → Create API Key** (permission « Sending access »), copiez la clé (`re_…`).
3. Vercel → projet → **Settings → Environment Variables** : ajoutez `RESEND_API_KEY` = la clé, pour Production.
4. Vercel → **Deployments** → ⋯ sur le dernier déploiement → **Redeploy**.
5. Envoyez une demande test depuis le site : l'e-mail « Nouveau commerce pilote : … » arrive sur contact@frescy.fr.

Optionnel, pour un expéditeur à votre nom : Resend → **Domains** → ajoutez frescy.fr, copiez les enregistrements DNS
chez votre registrar, puis ajoutez la variable `LEADS_EMAIL_FROM` = `Frescy <site@frescy.fr>`.

| Variable            | Rôle                                                                           |
| ------------------- | ------------------------------------------------------------------------------ |
| `RESEND_API_KEY`    | Active l'envoi des e-mails                                                     |
| `LEADS_EMAIL_TO`    | Destinataire (par défaut `contact@frescy.fr`)                                  |
| `LEADS_EMAIL_FROM`  | Expéditeur (par défaut `Frescy <onboarding@resend.dev>`)                       |
| `GOOGLE_FORM_URL`   | Autre Google Forms (vide = désactivé)                                          |
| `LEADS_WEBHOOK_URL` | Transfère aussi chaque demande en JSON (Zapier, Make, Slack…)                  |
| `LEADS_DIR`         | Dossier de stockage local (par défaut `data/`, fichier `leads.jsonl`)          |
| `ADMIN_TOKEN`       | Active l'export CSV : `GET /api/leads.csv?token=…` (serveur Node uniquement)   |

## Mise en ligne sur Vercel

Le dépôt est prêt (`vercel.json` + fonction `api/leads.mjs`) : chaque push sur la branche déployée met le site à jour.
Les pages métier (`/boulangerie`, etc.) et les pages légales fonctionnent grâce à la réécriture vers `index.html`.

## Pages

| Page                    | Adresse (site)        | Adresse (aperçu démo)  |
| ----------------------- | --------------------- | ---------------------- |
| Accueil                 | `/`                   | `#accueil`             |
| Boulangerie, boucherie… | `/boulangerie`, etc.  | `#boulangerie`, etc.   |
| Mentions légales        | `/mentions-legales`   | `#mentions-legales`    |
| Confidentialité         | `/confidentialite`    | `#confidentialite`     |

Les textes des pages métier sont dans `src/lib/metiers.ts`.

## Mesure d'audience (sans cookies)

Plausible, désactivé par défaut. Pour l'activer : `VITE_PLAUSIBLE_DOMAIN=votre-domaine.fr npm run build`.
Événements suivis : « Clic essai » (avec la section), « Calculateur utilisé »,
« Demande d'essai envoyée » (avec la page d'origine).

## Accessibilité et performance

- Mobile-first, bouton CTA flottant sur mobile, cibles tactiles ≥ 44 px, champs à 16 px (pas de zoom iOS).
- `prefers-reduced-motion` respecté : pas d'épinglage, démo affichée directement sur l'écran final, animations coupées.
- Aucune 3D : téléphone en HTML/CSS, démo en pause hors écran.
- SEO : title, meta description, Open Graph / Twitter (`public/og-image.png`), JSON-LD, robots.txt, sitemap.xml, canonical sur https://frescy.fr.

## À personnaliser avant la mise en ligne

Tout ce qui est marqué « VALEURS D'EXEMPLE » dans `src/lib/config.ts` :

- `PRICE` : tarif après le mois gratuit (**39 € HT/mois est un exemple**, affiché dans l'offre et la FAQ).
- `FOUNDER` : Jérémy, 06 11 71 83 68 (appel et WhatsApp) ; `photo` : un vrai portrait (format 4:5) dans `public/photos/`, sinon un cadre « Photo à remplacer » s'affiche.
- `SHOP_PHOTOS` : vraies photos des commerces pilotes (boulangerie, boucherie, épicerie, supérette), avec leur accord. Pas d'images générées : tant qu'une photo manque, un cadre « Photo à remplacer » indique ce qu'il faut photographier.
- `COMPANY` : forme juridique, adresse, SIRET, RCS, TVA, directeur de la publication, hébergeur (page Mentions légales).
- `LEAD_RETENTION` : durée de conservation des prospects (3 ans, recommandation CNIL).

Et aussi :

- `src/lib/config.ts` : nombre de places pilotes, zone, hypothèse d'économie du calculateur, base du compteur (ADEME).
- `src/components/Pilots.tsx` : bloc « commerces pilotes » ; quand vous aurez de vrais retours, une section témoignages pourra s'ajouter à côté.
- `src/components/Problem.tsx` et `Faq.tsx` : chiffres et réponses à valider avec le produit réel (tarif, fonctionnalités).
- `index.html` : une fois le domaine choisi, rendre l'URL de `og:image` absolue et ajouter canonical, `og:url` et un sitemap.
- `src/components/Faq.tsx` : la réponse sur les dons aux associations est à faire valider (réduction d'impôt selon la situation du commerce).
