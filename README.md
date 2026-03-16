# TerraCode — Site web version finale

## Structure du projet

```
terracode/
├── index.html          ← Page principale (HTML commenté)
├── css/
│   └── style.css       ← Tous les styles (palette, typo, responsive, animations)
├── js/
│   └── main.js         ← Comportements (nav, scroll, formulaire, WhatsApp, étapes)
├── images/
│   └── favicon.png     ← À créer : logo TC simplifié 32×32 px
└── README.md
```

---

## Améliorations UI/UX incluses

| Amélioration | Détail |
|---|---|
| Hiérarchie typo 3 niveaux | Numéro · Titre · Description · Liste sur chaque carte |
| Bandeau de confiance hero | "5 services · JE certifiée INP-HB · Yamoussoukro" |
| Carte service phare | Cartographie en fond vert forêt avec badge "Service phare" |
| Étapes de progression | Dots 1/2/3 animés selon l'état de remplissage du formulaire |
| Ancre "À propos" | Dans la nav header et footer → section `#equipe` |
| Lien actif pill colorée | Fond doré, très visible, mis à jour au scroll via IntersectionObserver |
| WhatsApp différé | Apparaît après 3s ou au premier scroll (pas immédiatement) |
| CTA sur chaque carte | "Demander un devis" → scroll + pré-remplissage du message |
| width/height sur images | Élimine le layout shift (CLS) pour de meilleures Core Web Vitals |
| aria-current sur nav | Accessibilité lecteurs d'écran |

---

## Remplacer les images

Cherchez les commentaires `<!-- IMAGE :` dans `index.html` pour chaque section.

| Section | Fichier suggéré | Type |
|---|---|---|
| Hero | `images/hero-parcelle.webp` | Photo aérienne drone parcelle ivoirienne |
| Service 01 | `images/s01-collecte.webp` | Étudiant ITA + tablette en plantation |
| Service 02 | `images/s02-carto-qgis.webp` | Capture QGIS zonage agricole |
| Service 03 | `images/s03-web-mockup.webp` | Mockup site coopérative |
| Service 04 | `images/s04-app-mobile.webp` | Mockup app suivi cultures |
| Service 05 | `images/s05-logiciel.webp` | Capture logiciel gestion stock |
| À propos | `images/equipe-inphb.webp` | Photo équipe TerraCode terrain |

Syntaxe de remplacement :
```html
<img src="images/votre-photo.webp" alt="Description" width="800" height="400" loading="lazy" />
```

---

## Connecter le formulaire (Formspree — gratuit)

Dans `js/main.js`, section **9. VALIDATION ET ENVOI**, remplacez le bloc
"Simulation d'envoi" par :

```javascript
const formData = new FormData(form);
fetch('https://formspree.io/f/VOTRE_ID', {
  method: 'POST',
  body: formData,
  headers: { 'Accept': 'application/json' }
})
.then(r => {
  if (r.ok) {
    // afficher succès
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    form.reset();
    btn.disabled = false;
    btn.querySelector('.btn-send__text').textContent = 'Envoyer le message';
  }
});
```

---

## Palette de couleurs

| Variable CSS | Valeur | Usage |
|---|---|---|
| `--c-forest` | `#1C3A2A` | Fond header, footer, titre |
| `--c-forest-d` | `#122519` | Fond très sombre |
| `--c-sage` | `#4A7C59` | Accents secondaires |
| `--c-gold` | `#B8914A` | Or terreux — CTA principal |
| `--c-cream` | `#F5F0E8` | Fond pages clair |
| `--c-white` | `#FAFAF7` | Fond cartes |

---

## Polices Google Fonts

- **Cormorant Garamond** — titres, slogan, numéros de service
- **DM Sans** — tout le corps de texte, labels, boutons
