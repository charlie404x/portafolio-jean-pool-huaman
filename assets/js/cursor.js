/* =========================================================
   cursor.js — Cursor personalizado (solo dispositivos con puntero fino)
   ========================================================= */
(function (Portfolio) {
  'use strict';

  Portfolio.initCursor = function () {
    var hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    document.documentElement.classList.add('has-custom-cursor');

    var cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);

    var x = 0, y = 0, cx = 0, cy = 0;
    var raf = null;

    function loop() {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      cursor.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY;
      if (!raf) loop();
    });

    var interactiveSelector = 'a, button, [data-goto], input, textarea, .tech-card, .project-card, .soft-skill-card, .gh-card, .contact-card';

    document.addEventListener('mouseover', function (e) {
      if (e.target.closest && e.target.closest(interactiveSelector)) {
        cursor.classList.add('is-active');
      }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest && e.target.closest(interactiveSelector)) {
        cursor.classList.remove('is-active');
      }
    });

    document.addEventListener('mouseleave', function () { cursor.style.opacity = '0'; });
    document.addEventListener('mouseenter', function () { cursor.style.opacity = '1'; });
  };

})(window.Portfolio = window.Portfolio || {});
