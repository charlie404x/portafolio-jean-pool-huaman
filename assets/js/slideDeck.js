/* =========================================================
   slideDeck.js — Motor de navegación de diapositivas a pantalla completa
   Namespace: window.Portfolio.deck
   Sin dependencias externas. Sin módulos ES (compatibilidad file://).
   ========================================================= */
(function (Portfolio) {
  'use strict';

  function createDeck(root) {
    var slides = Array.prototype.slice.call(root.querySelectorAll('.slide'));
    var total = slides.length;
    var current = 0;
    var isAnimating = false;
    var ANIM_LOCK_MS = 720;

    var progressLine = document.querySelector('.progress-line');
    var btnPrev = document.querySelector('[data-deck-prev]');
    var btnNext = document.querySelector('[data-deck-next]');

    var listeners = [];

    function clamp(n) {
      return Math.max(0, Math.min(total - 1, n));
    }

    function applyStates() {
      slides.forEach(function (slide, i) {
        slide.classList.remove('is-active', 'is-prev', 'is-next');
        if (i === current) {
          slide.classList.add('is-active');
          slide.removeAttribute('aria-hidden');
          slide.setAttribute('tabindex', '-1');
        } else if (i < current) {
          slide.classList.add('is-prev');
          slide.setAttribute('aria-hidden', 'true');
        } else {
          slide.classList.add('is-next');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      if (progressLine) progressLine.style.width = ((current + 1) / total) * 100 + '%';
      if (btnPrev) btnPrev.disabled = current === 0;
      if (btnNext) btnNext.disabled = current === total - 1;

      document.body.setAttribute('data-slide', String(current));

      window.dispatchEvent(new CustomEvent('deck:change', { detail: { index: current, slide: slides[current] } }));
    }

    function goTo(index, opts) {
      var target = clamp(index);
      if (target === current && !(opts && opts.force)) return;
      if (isAnimating) return;
      current = target;
      isAnimating = true;
      applyStates();
      window.setTimeout(function () { isAnimating = false; }, ANIM_LOCK_MS);
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    /* ---------------- Rueda del mouse ---------------- */
    var wheelCooldown = false;
    var wheelAccum = 0;
    var WHEEL_THRESHOLD = 48;

    root.addEventListener('wheel', function (e) {
      e.preventDefault();
      if (wheelCooldown) return;
      // admite tanto rueda vertical (mouse) como gesto horizontal (trackpad),
      // ya que la transición visual del deck ahora es horizontal
      var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      wheelAccum += delta;
      if (Math.abs(wheelAccum) > WHEEL_THRESHOLD) {
        if (wheelAccum > 0) next(); else prev();
        wheelAccum = 0;
        wheelCooldown = true;
        window.setTimeout(function () { wheelCooldown = false; }, ANIM_LOCK_MS);
      }
    }, { passive: false });

    /* ---------------- Touch / swipe ---------------- */
    var touchStartY = null;
    var touchStartX = null;

    root.addEventListener('touchstart', function (e) {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    root.addEventListener('touchend', function (e) {
      if (touchStartY === null) return;
      var dy = touchStartY - e.changedTouches[0].clientY;
      var dx = touchStartX - e.changedTouches[0].clientX;
      // ignora swipes predominantemente horizontales (para no interferir con carruseles internos en mobile)
      if (Math.abs(dx) > Math.abs(dy)) { touchStartY = null; return; }
      if (Math.abs(dy) > 56) {
        if (dy > 0) next(); else prev();
      }
      touchStartY = null; touchStartX = null;
    }, { passive: true });

    /* ---------------- Teclado ---------------- */
    document.addEventListener('keydown', function (e) {
      // no interceptar si el foco está dentro de un modal abierto o un input
      var activeModal = document.querySelector('.modal-overlay.is-open');
      if (activeModal) return;
      var tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      switch (e.key) {
        case 'PageDown':
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault(); next(); break;
        case 'PageUp':
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault(); prev(); break;
        case 'Home':
          e.preventDefault(); goTo(0); break;
        case 'End':
          e.preventDefault(); goTo(total - 1); break;
        default: break;
      }
    });

    /* ---------------- Botones flecha ---------------- */
    if (btnPrev) btnPrev.addEventListener('click', prev);
    if (btnNext) btnNext.addEventListener('click', next);

    /* ---------------- Enlaces internos data-goto ---------------- */
    document.querySelectorAll('[data-goto]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        goTo(parseInt(el.getAttribute('data-goto'), 10));
      });
    });

    applyStates();

    return { goTo: goTo, next: next, prev: prev, getCurrent: function () { return current; }, getTotal: function () { return total; } };
  }

  Portfolio.initDeck = function () {
    var root = document.getElementById('deck');
    if (!root) return null;
    Portfolio.deck = createDeck(root);
    return Portfolio.deck;
  };

})(window.Portfolio = window.Portfolio || {});
