/* =========================================================
   particles.js — Red de nodos ambiental, muy sutil.
   Referencia a la identidad "de ingeniero/sistemas": no son
   partículas decorativas genéricas, sino un grafo disperso
   que evoca arquitectura/red — coherente con el resto del deck.
   ========================================================= */
(function (Portfolio) {
  'use strict';

  Portfolio.initParticles = function () {
    var canvas = document.getElementById('bg-field');
    if (!canvas) return;

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var ctx = canvas.getContext('2d');
    var w, h, dpr;
    var nodes = [];
    var raf = null;
    var running = true;

    function sizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function nodeCount() {
      var area = w * h;
      return Math.round(Math.min(70, Math.max(24, area / 22000)));
    }

    function buildNodes() {
      var count = nodeCount();
      nodes = new Array(count).fill(0).map(function () {
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.4 + 0.6
        };
      });
    }

    var mouse = { x: -9999, y: -9999 };
    window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });

    function step() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(124,168,255,0.55)';

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // atracción muy sutil hacia el cursor
        var dxm = mouse.x - n.x, dym = mouse.y - n.y;
        var distm = Math.sqrt(dxm * dxm + dym * dym);
        if (distm < 160) {
          n.x += dxm * 0.0018;
          n.y += dym * 0.0018;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        for (var j = i + 1; j < nodes.length; j++) {
          var m = nodes[j];
          var dx = n.x - m.x, dy = n.y - m.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.strokeStyle = 'rgba(62,123,250,' + (0.16 * (1 - dist / 140)) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }
      }

      if (running) raf = requestAnimationFrame(step);
    }

    sizeCanvas();
    buildNodes();

    if (!reducedMotion) {
      raf = requestAnimationFrame(step);
    } else {
      step(); // un solo frame estático
    }

    document.addEventListener('visibilitychange', function () {
      running = !document.hidden && !reducedMotion;
      if (running && !raf) raf = requestAnimationFrame(step);
      if (!running && raf) { cancelAnimationFrame(raf); raf = null; }
    });

    var resizeTimeout;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function () {
        sizeCanvas();
        buildNodes();
      }, 200);
    });
  };

})(window.Portfolio = window.Portfolio || {});
