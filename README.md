# AgroLab — Site web

## Structure du projet

```
agrolab/
├── index.html              ← Page principale (HTML commenté)
├── mentions-legales.html   ← Mentions légales
├── confidentialite.html    ← Politique de confidentialité
├── 404.html                ← Page d'erreur
├── robots.txt              ← Indexation moteurs de recherche
├── sitemap.xml             ← Plan du site
├── css/
│   └── style.css           ← Tous les styles (palette, typo, responsive, animations)
├── js/
│   └── main.js             ← Comportements (nav, scroll, formulaire, WhatsApp, étapes)
├── images/
│   ├── favicon.svg         ← Favicon (feuille + lettre A)
│   └── …                   ← Photos et logo
└── README.md
```

---

## Améliorations UI/UX incluses

| Amélioration | Détail |
|---|---|
| Hiérarchie typo 3 niveaux | Numéro · Titre · Description · Liste sur chaque carte |
| Bandeau de confiance hero | "5 services · Junior Entreprise ITA · ESA/INP-HB · Yamoussoukro" |
| Carte service phare | Cartographie en fond vert forêt avec badge "Service phare" |
| Étapes de progression | Dots 1/2/3 animés selon l'état de remplissage du formulaire |
| Ancre "À propos" | Dans la nav header et footer → section `#equipe` |
| Lien actif pill colorée | Fond doré, très visible, mis à jour au scroll via IntersectionObserver |
| WhatsApp différé | Apparaît après 3s ou au premier scroll (pas immédiatement) |
| CTA sur chaque carte | "Demander un devis" → scroll + pré-remplissage du message |
| width/height sur images | Élimine le layout shift (CLS) pour de meilleures Core Web Vitals |
| aria-current sur nav | Accessibilité lecteurs d'écran |

---




## ⚠️ Activer le formulaire de contact (1 seule étape)

Le formulaire est déjà branché sur **Web3Forms** (gratuit, sans compte). Il reste
à renseigner votre clé d'accès :

1. Allez sur **https://web3forms.com**
2. Entrez l'email qui doit **recevoir** les messages → vous recevez une *Access Key* par email.
3. Dans `index.html`, remplacez `VOTRE_CLE_WEB3FORMS` par cette clé :

```html
<input type="hidden" name="access_key" value="VOTRE_CLE_WEB3FORMS" />
```

Tant que cette clé n'est pas renseignée, le formulaire affiche un message d'erreur
invitant à écrire directement à `contact@agrolab-ita.tech`.

---

## Avant la mise en ligne — à vérifier

- **Email** : `contact@agrolab-ita.tech` doit exister (ou changer l'adresse dans `index.html` + pages légales).
- **Domaine** : le `CNAME` pointe sur `agrolab-ita.tech` (utilisé dans le SEO, le sitemap et les URLs canoniques).
- **Images** : optionnel — compresser les photos (WebP/AVIF) pour accélérer le chargement.
