# AgroTech — Site web version finale

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
