# NeoDrive — Site vitrine

Site vitrine de **NeoDrive**, micro-entreprise artisanale spécialisée dans l'installation à domicile de **CarPlay / Android Auto**, autoradios, audio et caméras de recul en Loire-Atlantique (44).

🔗 **Site en ligne :** [neodrive.autos](https://neodrive.autos)

---

## À propos

Site statique (HTML / CSS / JavaScript), sans framework ni backend, hébergé sur Netlify.

## Structure du projet

```
.
├── index.html              # Accueil
├── services.html           # Prestations
├── gallery.html            # Galerie avant/après
├── pricing.html            # Tarifs (sur devis)
├── shop.html               # Boutique + sélecteur de compatibilité + panier
├── zones.html              # Zones desservies (SEO local)
├── contact.html            # Contact & devis
├── mentions-legales.html   # Mentions légales
├── 404.html                # Page d'erreur personnalisée
├── robots.txt              # Indexation moteurs de recherche
├── sitemap.xml             # Plan du site
├── site.webmanifest        # Manifeste PWA
└── assets/
    ├── css/
    │   └── style.css       # Feuille de style unique
    ├── js/
    │   ├── main.js         # Logique : menu, cookies, slider, panier, sélecteur
    │   └── compat-data.js  # Données de compatibilité véhicule (éditable)
    └── img/                # Images, icônes, favicons
```

## Fonctionnalités

- **Design responsive** (mobile, tablette, ordinateur)
- **Sélecteur de compatibilité** véhicule (Marque → Modèle → Année) sur la boutique
- **Panier** avec envoi du récapitulatif vers le formulaire de contact
- **Slider avant/après** sur la galerie
- **Bannière cookies** conforme RGPD (Google Analytics chargé après consentement)
- **SEO** : balises Open Graph, sitemap, robots.txt, page zones desservies
- **Formulaires** gérés par Netlify Forms (contact + liste d'attente)

## Développement local

Aucune dépendance à installer. Pour prévisualiser le site en local :

```bash
# Avec Python
python3 -m http.server 8000

# Puis ouvrir http://localhost:8000
```

## Déploiement

Le site se déploie sur **Netlify**.

### Déploiement manuel (glisser-déposer)
1. Compresser le contenu du dépôt (les fichiers à la racine, pas le dossier parent)
2. Sur Netlify → onglet **Deploys** → glisser-déposer le dossier

### Déploiement automatique (recommandé)
Connecter ce dépôt GitHub à Netlify : chaque `git push` sur la branche principale déclenche un déploiement automatique.

## Configuration à compléter

Certains éléments nécessitent une saisie manuelle :

- **Google Analytics** : remplacer `G-XXXXXXXXXX` par l'identifiant de mesure réel (dans le `<head>` de chaque page)
- **SIRET** : à renseigner dans `mentions-legales.html` une fois attribué
- **Liens de paiement** : remplacer les `href="#"` des boutons produits dans `shop.html`
- **Prix** : compléter les balises `.product-price` dans `shop.html`

## Personnaliser la base de compatibilité

Le fichier `assets/js/compat-data.js` contient la liste des véhicules compatibles. Un mode d'emploi en commentaire en tête de fichier explique comment ajouter une marque, un modèle ou une génération.

---

© 2026 NeoDrive — Tous droits réservés.
