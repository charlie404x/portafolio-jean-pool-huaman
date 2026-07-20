/* =========================================================
   projectModal.js — Modal accesible de detalle de proyecto
   ========================================================= */
(function (Portfolio) {
  'use strict';

  var DATA = {
    petcare: {
      title: 'PetCare',
      tag: 'Plataforma inteligente para clínicas veterinarias',
      problem: 'Las clínicas veterinarias pequeñas y medianas gestionan citas, historiales médicos y pagos de forma manual o con herramientas desconectadas entre sí, lo que genera pérdida de información y tiempos de espera innecesarios.',
      role: 'Diseñé y desarrollé la plataforma completa: modelado de datos, API REST en Spring Boot y la interfaz en Angular, incluyendo el dashboard administrativo.',
      architecture: 'Arquitectura cliente-servidor con separación clara de responsabilidades: Angular consume una API REST documentada con Swagger, expuesta por un backend en Spring Boot sobre una base de datos relacional MySQL.',
      impact: 'La plataforma centraliza gestión de mascotas, historial médico, reserva de citas, pagos y un dashboard administrativo, además de una integración IoT para monitoreo remoto de mascotas.',
      stack: ['Angular', 'Spring Boot', 'Java', 'MySQL', 'REST API', 'Git', 'GitHub']
    },
    neurozen: {
      title: 'NeuroZen',
      tag: 'Aplicación móvil para salud mental',
      problem: 'Acceder a apoyo psicológico profesional suele ser complicado por la falta de plataformas simples que conecten pacientes con profesionales disponibles y con una comunidad de acompañamiento.',
      role: 'Desarrollé la aplicación móvil en Flutter y el backend en Spring Boot, incluyendo autenticación, disponibilidad de profesionales y reserva de citas.',
      architecture: 'Aplicación móvil en Flutter que consume una API REST construida con Spring Boot, con persistencia en PostgreSQL, siguiendo el patrón MVC en el backend.',
      impact: 'Se implementaron los módulos de autenticación, gestión de profesionales y disponibilidad, reserva de citas, comunidad y recursos educativos.',
      stack: ['Flutter', 'Spring Boot', 'Java', 'PostgreSQL', 'REST API']
    },
    agrosmart: {
      title: 'AgroSMART',
      tag: 'Aplicación móvil de agricultura inteligente',
      problem: 'Pequeños productores agrícolas suelen tomar decisiones de cultivo sin herramientas de apoyo basadas en datos, lo que reduce la eficiencia y el rendimiento de sus tierras.',
      role: 'Construí el backend con FastAPI que integra un modelo de Machine Learning para recomendación de cultivos, y diseñé la API REST consumida por la aplicación móvil.',
      architecture: 'Backend en Python con FastAPI que expone un modelo de Machine Learning entrenado para recomendación de cultivos, consumido por una aplicación móvil desarrollada en Flutter.',
      impact: 'Los usuarios acceden a recomendaciones de cultivo personalizadas según condiciones agrícolas e información relevante para la toma de decisiones.',
      stack: ['Flutter', 'Python', 'FastAPI', 'REST API', 'Machine Learning']
    }
  };

  var overlay, modalEl, lastFocused;

  function buildModal() {
    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'presentation');

    overlay.innerHTML =
      '<div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">' +
        '<button class="btn btn--icon modal__close" data-modal-close aria-label="Cerrar detalle del proyecto">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
        '</button>' +
        '<div class="eyebrow modal__eyebrow" data-modal-tag></div>' +
        '<h3 class="modal__title" id="modal-title" data-modal-title></h3>' +
        '<div class="modal__section"><h4>Problema que resuelve</h4><p data-modal-problem></p></div>' +
        '<div class="modal__section"><h4>Mi participación</h4><p data-modal-role></p></div>' +
        '<div class="modal__section"><h4>Arquitectura</h4><p data-modal-architecture></p></div>' +
        '<div class="modal__section"><h4>Impacto y funcionalidades</h4><p data-modal-impact></p></div>' +
        '<div class="modal__stack" data-modal-stack></div>' +
      '</div>';

    document.body.appendChild(overlay);
    modalEl = overlay.querySelector('.modal');

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });
    overlay.querySelector('[data-modal-close]').addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'Tab') trapFocus(e);
    });
  }

  function trapFocus(e) {
    var focusables = modalEl.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    var first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function openModal(key) {
    var data = DATA[key];
    if (!data) return;
    lastFocused = document.activeElement;

    overlay.querySelector('[data-modal-tag]').textContent = data.tag;
    overlay.querySelector('[data-modal-title]').textContent = data.title;
    overlay.querySelector('[data-modal-problem]').textContent = data.problem;
    overlay.querySelector('[data-modal-role]').textContent = data.role;
    overlay.querySelector('[data-modal-architecture]').textContent = data.architecture;
    overlay.querySelector('[data-modal-impact]').textContent = data.impact;

    var stackEl = overlay.querySelector('[data-modal-stack]');
    stackEl.innerHTML = '';
    data.stack.forEach(function (t) {
      var chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = t;
      stackEl.appendChild(chip);
    });

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    window.setTimeout(function () { overlay.querySelector('[data-modal-close]').focus(); }, 60);
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  Portfolio.initProjectModal = function () {
    buildModal();
    document.querySelectorAll('[data-project]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        openModal(btn.getAttribute('data-project'));
      });
    });
  };

})(window.Portfolio = window.Portfolio || {});
