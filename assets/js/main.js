/* =========================================================
   main.js — Orquestación de arranque
   ========================================================= */
(function (Portfolio) {
  'use strict';

  document.documentElement.classList.remove('no-js');
  document.documentElement.classList.add('js');

  function hideLoader() {
    var loader = document.getElementById('loader');
    if (!loader) return;
    var bar = loader.querySelector('.loader__bar span');
    if (bar) bar.style.width = '100%';
    window.setTimeout(function () {
      loader.classList.add('is-hidden');
    }, 320);
  }

  function init() {
    Portfolio.initDeck();
    Portfolio.initReveal();
    Portfolio.initTilt();
    Portfolio.initParticles();
    Portfolio.initProjectModal();
    Portfolio.initContact();
    hideLoader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window.Portfolio = window.Portfolio || {});
