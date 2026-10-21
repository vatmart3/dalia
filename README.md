# Dalia — landing page

Landing page one-page de **Dalia**, l'appli anti-gaspillage pour les petits commerces alimentaires
(épiceries, boulangeries, boucheries, supérettes).

> Dalia veille, et votre marge ne part pas.

## Stack

- **Vite + React 19 + TypeScript**
- **Direction artistique « marché frais pop »** : tomate, abricot, menthe, aubergine sur fond crème ; titres Anton, texte DM Sans.
- **Concept « L'étal qui défile »** : la page est un stand de marché. Chaque section est une cagette en bois avec son étiquette (ardoise ou carton) ; auvent rayé, produits avec leur date (J-2 → « Vendu »), ticket de caisse, étiquettes suspendues, balance du calculateur, stands métiers, étiquettes kraft de la FAQ.
- **GSAP ScrollTrigger** (`src/components/etal/Etal.tsx`) : sur ordinateur (≥ 1024 × 760 px, souris), la section est épinglée et le scroll vertical fait défiler l'étal horizontalement ; les liens du menu amènent la cagette au centre de l'écran. Sur mobile et tablette : défilement vertical, cagette par cagette.
- **Framer Motion** : stickers « −20 % » qui se collent (squash & stretch), étiquettes qui se retournent, démo du téléphone, confirmation du formulaire.
- Décors en SVG et CSS uniquement (aucune image lourde, aucune 3D).
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

Plausible, désactivé par défaut. Pour l'activer : `VITE_PLAUSIBLE_DOMAIN=votre-domaine.fr npm run build`.
Événements suivis : « Clic essai » (avec la section), « Calculateur utilisé »,
« Demande d'essai envoyée » (avec la page d'origine).

## Accessibilité et performance

- Mobile-first, bouton CTA flottant sur mobile, cibles tactiles ≥ 44 px, champs à 16 px (pas de zoom iOS).
- `prefers-reduced-motion` respecté : défilement vertical simple (pas d'étal horizontal), ni balancement ni auvent animé, état final affiché directement.
- Aucune 3D : décors en SVG/CSS, démo du téléphone en HTML animé, en pause hors écran.
- SEO : title, meta description, Open Graph / Twitter (`public/og-image.png`), JSON-LD, robots.txt. Le sitemap et les balises canonical / og:url seront à ajouter quand le nom de domaine existera.

## À personnaliser avant la mise en ligne

Tout ce qui est marqué « VALEURS D'EXEMPLE » dans `src/lib/config.ts` :

- `PRICE` : tarif après le mois gratuit (**39 € HT/mois est un exemple**, affiché dans l'offre et la FAQ).
- `FOUNDER` : Jérémy, 06 11 71 83 68 (appel et WhatsApp) ; ajoutez une photo carrée dans `public/` pour remplacer l'initiale.
- `COMPANY` : forme juridique, adresse, SIRET, RCS, TVA, directeur de la publication, hébergeur (page Mentions légales).
- `LEAD_RETENTION` : durée de conservation des prospects (3 ans, recommandation CNIL).

Et aussi :

- `src/lib/config.ts` : nombre de places pilotes, zone, hypothèse d'économie du calculateur, base du compteur (ADEME).
- `src/components/Pilots.tsx` : bloc « commerces pilotes » ; quand vous aurez de vrais retours, une section témoignages pourra s'ajouter à côté.
- `src/components/Problem.tsx` et `Faq.tsx` : chiffres et réponses à valider avec le produit réel (tarif, fonctionnalités).
- `index.html` : une fois le domaine choisi, rendre l'URL de `og:image` absolue et ajouter canonical, `og:url` et un sitemap.
- `src/components/Faq.tsx` : la réponse sur les dons aux associations est à faire valider (réduction d'impôt selon la situation du commerce).
