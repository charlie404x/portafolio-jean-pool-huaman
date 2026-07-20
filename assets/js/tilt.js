/* =========================================================
   tilt.js — Inclinación 3D sutil + brillo que sigue al cursor
   sobre las tarjetas [data-tilt]. Solo puntero fino; respeta
   prefers-reduced-motion.
   ========================================================= */
(function (Portfolio) {
  'use strict';

  Portfolio.initTilt = function () {
    var hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!hasFinePointer || reduceMotion) return;

    var cards = Array.prototype.slice.call(document.querySelectorAll('[data-tilt]'));
    if (!cards.length) return;

    var MAX_TILT = 7;

    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var px = (e.clientX - rect.left) / rect.width;
        var py = (e.clientY - rect.top) / rect.height;
        var ry = (px - 0.5) * MAX_TILT * 2;
        var rx = (0.5 - py) * MAX_TILT * 2;
        card.style.transform = 'perspective(900px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-6px)';
        card.style.setProperty('--glow-x', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--glow-y', (py * 100).toFixed(1) + '%');
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
      });
    });
  };

})(window.Portfolio = window.Portfolio || {});
