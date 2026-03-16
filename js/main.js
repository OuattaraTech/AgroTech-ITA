/* =====================================================
   AgroTech ITA — Script principal
   Version finale avec toutes les améliorations UI/UX
   Vanilla JS, aucune dépendance externe
===================================================== */

'use strict';

/* ─────────────────────────────────────────────────
   1. HEADER — ombre au défilement
───────────────────────────────────────────────── */
(function () {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });
})();

/* ─────────────────────────────────────────────────
   2. NAVIGATION MOBILE — menu hamburger
───────────────────────────────────────────────── */
(function () {
  const toggle = document.getElementById('navToggle');
  const nav    = document.getElementById('mainNav');
  if (!toggle || !nav) return;

  function openMenu() {
  nav.classList.add('nav--open');
  toggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  const header = document.getElementById('header');
  if (header) header.style.zIndex = '150';
}
function closeMenu() {
  nav.classList.remove('nav--open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  const header = document.getElementById('header');
  if (header) header.style.zIndex = '';
}

  toggle.addEventListener('click', () => {
    toggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  nav.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
})();

/* ─────────────────────────────────────────────────
   3. LIEN ACTIF — pill colorée mise à jour au scroll
   Utilise aria-current pour l'accessibilité
───────────────────────────────────────────────── */
(function () {
  const links    = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');
  if (!links.length || !sections.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => {
          const isActive = l.getAttribute('href') === '#' + e.target.id;
          l.classList.toggle('active', isActive);
          if (isActive) l.setAttribute('aria-current', 'true');
          else l.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-35% 0px -60% 0px' });

  sections.forEach(s => obs.observe(s));
})();

/* ─────────────────────────────────────────────────
   4. WHATSAPP — apparition différée
   Révélé après 3 secondes OU au premier scroll,
   pour ne pas gêner la lecture immédiate de la page
───────────────────────────────────────────────── */
(function () {
  const btn = document.getElementById('whatsappBtn');
  if (!btn) return;
  let shown = false;

  function show() {
    if (shown) return;
    shown = true;
    btn.classList.add('visible');
  }

  setTimeout(show, 3000);
  window.addEventListener('scroll', show, { once: true, passive: true });
})();

/* ─────────────────────────────────────────────────
   5. RÉVÉLATION AU DÉFILEMENT (Intersection Observer)
───────────────────────────────────────────────── */
(function () {
  const targets = [
    '.section-header',
    '.service-card',
    '.about-band__text',
    '.about-band__visual',
    '.contact__panel',
    '.contact__form-wrap',
    '.footer__brand',
    '.footer__nav',
    '.footer__contact',
  ].join(', ');

  const els = document.querySelectorAll(targets);
  els.forEach(el => {
    el.classList.add('reveal');
    if (el.classList.contains('service-card')) {
      const idx = Array.from(el.parentElement.children).indexOf(el);
      if (idx % 3 === 1) el.classList.add('reveal--delay-1');
      if (idx % 3 === 2) el.classList.add('reveal--delay-2');
    }
  });

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: .08 });

  els.forEach(el => obs.observe(el));
})();

/* ─────────────────────────────────────────────────
   6. ANNÉE EN COURS — footer
───────────────────────────────────────────────── */
(function () {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ─────────────────────────────────────────────────
   7. CTA CARTES → pré-remplissage du formulaire
   Cliquer sur "Demander un devis" d'une carte :
   - scrolle vers le formulaire
   - pré-remplit le champ message avec le service concerné
   - met le focus sur le premier champ vide
───────────────────────────────────────────────── */
(function () {
  const ctaLinks = document.querySelectorAll('.service-card__cta[data-service]');
  const msgField = document.getElementById('message');
  if (!ctaLinks.length || !msgField) return;

  ctaLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const service = this.dataset.service;

      // Pré-remplir le message
      msgField.value = 'Bonjour, je souhaite un devis pour le service : ' + service + '.';
      // Déclencher l'animation du label flottant
      msgField.dispatchEvent(new Event('input'));

      // Scroll vers la section contact
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });

      // Focus sur le premier champ vide après le scroll
      setTimeout(() => {
        const nom = document.getElementById('nom');
        if (nom && !nom.value) nom.focus();
        else {
          const tel = document.getElementById('telephone');
          if (tel && !tel.value) tel.focus();
        }
      }, 600);
    });
  });
})();

/* ─────────────────────────────────────────────────
   8. ÉTAPES DE PROGRESSION DU FORMULAIRE
   Les dots 1/2/3 se colorent dynamiquement
   selon l'état de remplissage des champs
───────────────────────────────────────────────── */
(function () {
  const steps = {
    step1: document.getElementById('step1'),
    step2: document.getElementById('step2'),
    step3: document.getElementById('step3'),
  };
  if (!steps.step1) return;

  function updateSteps() {
    const nomFilled   = (document.getElementById('nom')?.value.trim().length  >= 2);
    const telFilled   = /^[\d\s\+\-\(\)]{8,}$/.test(document.getElementById('telephone')?.value || '');
    const emailFilled = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email')?.value || '');
    const msgFilled   = (document.getElementById('message')?.value.trim().length > 0);

    // Étape 1 — Identité (nom)
    steps.step1.classList.toggle('done',   nomFilled);
    steps.step1.classList.toggle('active', !nomFilled);

    // Étape 2 — Contact (téléphone + email)
    const step2done = telFilled && emailFilled;
    steps.step2.classList.toggle('done',   step2done);
    steps.step2.classList.toggle('active', !step2done && nomFilled);

    // Étape 3 — Projet (message)
    const step3done = msgFilled && step2done && nomFilled;
    steps.step3.classList.toggle('done',   step3done);
    steps.step3.classList.toggle('active', !step3done && step2done);
  }

  ['nom', 'prenom', 'telephone', 'email', 'message'].forEach(name => {
    const el = document.getElementById(name);
    if (el) el.addEventListener('input', updateSteps);
  });
})();

/* ─────────────────────────────────────────────────
   9. VALIDATION ET ENVOI DU FORMULAIRE
   NOTE : pour connecter à un vrai service,
   remplacez le bloc "Simulation d'envoi" par :
   fetch('https://formspree.io/f/VOTRE_ID', {
     method: 'POST', body: new FormData(form),
     headers: { 'Accept': 'application/json' }
   }).then(r => r.ok && afficherSucces());
───────────────────────────────────────────────── */
(function () {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form || !success) return;

  const rules = {
    nom:       { validate: v => v.trim().length >= 2,                          message: 'Nom requis (min. 2 caractères).' },
    telephone: { validate: v => /^[\d\s\+\-\(\)]{8,}$/.test(v.trim()),        message: 'Numéro de téléphone invalide.'   },
    email:     { validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),  message: 'Adresse email invalide.'         },
  };

  function validateField(input) {
    const rule = rules[input.name];
    if (!rule) return true;
    const isValid = rule.validate(input.value);
    const errEl   = input.parentElement.querySelector('.form-field__error');
    input.classList.toggle('invalid', !isValid);
    if (errEl) errEl.textContent = isValid ? '' : rule.message;
    return isValid;
  }

  // Validation au blur et correction en temps réel
  Object.keys(rules).forEach(name => {
    const input = form.querySelector('[name="' + name + '"]');
    if (input) {
      input.addEventListener('blur',  () => validateField(input));
      input.addEventListener('input', () => { if (input.classList.contains('invalid')) validateField(input); });
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    // Vérification honeypot anti-spam
    const honeypot = form.querySelector('[name="website"]');
    if (honeypot && honeypot.value) return;

    // Valider tous les champs requis
    const allValid = ['nom', 'telephone', 'email'].every(name => {
      const input = form.querySelector('[name="' + name + '"]');
      return input ? validateField(input) : true;
    });
    if (!allValid) {
      const firstInvalid = form.querySelector('.form-field__input.invalid');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // ── Simulation d'envoi ────────────────────────
    // TODO : remplacer par un vrai fetch() vers Formspree ou votre API
    const btn = form.querySelector('.btn-send');
    btn.disabled = true;
    btn.querySelector('.btn-send__text').textContent = 'Envoi en cours…';

    setTimeout(() => {
      // Réinitialiser le formulaire
      form.reset();
      form.querySelectorAll('.form-field__input').forEach(i => i.classList.remove('invalid'));
      form.querySelectorAll('.form-field__error').forEach(e => (e.textContent = ''));

      // Réinitialiser les étapes de progression
      ['step1', 'step2', 'step3'].forEach(id => {
        const step = document.getElementById(id);
        if (step) {
          step.classList.remove('done', 'active');
          if (id === 'step1') step.classList.add('active');
        }
      });

      // Afficher le message de succès
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Réactiver le bouton
      btn.disabled = false;
      btn.querySelector('.btn-send__text').textContent = 'Envoyer le message';

      // Masquer le succès après 6 secondes
      setTimeout(() => { success.hidden = true; }, 6000);
    }, 800);
    // ─────────────────────────────────────────────
  });
})();
