/* =========================================================
   reveal.js — Entradas escalonadas y observación real de
   visibilidad para las filas con scroll horizontal en mobile.
   ========================================================= */
(function (Portfolio) {
  'use strict';

  function revealActiveSlide(slide) {
    if (!slide) return;
    var items = slide.querySelectorAll('[data-reveal]');
    items.forEach(function (el, i) {
      el.classList.remove('is-visible');
      // fuerza reflow para poder re-disparar la transición si se vuelve a la misma slide
      void el.offsetWidth;
      window.setTimeout(function () {
        el.classList.add('is-visible');
      }, 40 + i * 70);
    });
  }

  function observeHorizontalCarousels() {
    var containers = document.querySelectorAll('.tech-grid, .project-grid, .gh-grid');
    containers.forEach(function (container) {
      var items = Array.prototype.slice.call(container.children);
      if (!items.length) return;

      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      }, { root: container, threshold: 0.55 });

      items.forEach(function (item) { io.observe(item); });
    });
  }

  function initSkillBars() {
    var bars = document.querySelectorAll('.skill-bar__fill');
    bars.forEach(function (bar) {
      var value = bar.getAttribute('data-value') || '0';
      bar.style.width = '0%';
      Portfolio._skillBarTargets = Portfolio._skillBarTargets || new WeakMap();
      Portfolio._skillBarTargets.set(bar, value);
    });
  }

  function playSkillBars(slide) {
    if (!slide) return;
    var bars = slide.querySelectorAll('.skill-bar__fill');
    bars.forEach(function (bar) {
      var value = bar.getAttribute('data-value') || '0';
      bar.style.width = '0%';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          bar.style.width = value + '%';
        });
      });
    });
  }

  Portfolio.initReveal = function () {
    initSkillBars();
    observeHorizontalCarousels();

    window.addEventListener('deck:change', function (e) {
      var slide = e.detail && e.detail.slide;
      revealActiveSlide(slide);
      playSkillBars(slide);
    });

    // primera slide activa al cargar
    var firstActive = document.querySelector('.slide.is-active');
    revealActiveSlide(firstActive);
    playSkillBars(firstActive);
  };

})(window.Portfolio = window.Portfolio || {});
