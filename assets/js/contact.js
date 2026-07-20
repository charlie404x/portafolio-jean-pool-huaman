/* =========================================================
   contact.js — Copiar correo, toast de confirmación, volver al inicio
   ========================================================= */
(function (Portfolio) {
  'use strict';

  function showToast(message) {
    var toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toast._hideTimeout);
    toast._hideTimeout = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2400);
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback para file:// o contextos no seguros
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus(); ta.select();
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        ok ? resolve() : reject();
      } catch (err) { reject(err); }
    });
  }

  Portfolio.initContact = function () {
    var copyBtn = document.querySelector('[data-copy-email]');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var email = copyBtn.getAttribute('data-copy-email');
        copyToClipboard(email).then(function () {
          showToast('Correo copiado: ' + email);
        }).catch(function () {
          showToast('No se pudo copiar. Correo: ' + email);
        });
      });
    }

    document.querySelectorAll('[data-goto-start]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (Portfolio.deck) Portfolio.deck.goTo(0);
      });
    });
  };

})(window.Portfolio = window.Portfolio || {});
