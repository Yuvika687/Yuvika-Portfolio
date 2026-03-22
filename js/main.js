/* ==========================================
   MAIN — Preloader + contact form + init
   ========================================== */

(function () {
  // --- Preloader ---
  const preloader = document.getElementById('preloader');
  const preloaderFill = document.getElementById('preloader-fill');
  const preloaderPercent = document.getElementById('preloader-percent');

  let progress = 0;

  function advancePreloader() {
    progress += Math.random() * 15 + 5;
    if (progress > 100) progress = 100;

    if (preloaderFill) preloaderFill.style.width = progress + '%';
    if (preloaderPercent) preloaderPercent.textContent = Math.floor(progress) + '%';

    if (progress < 100) {
      setTimeout(advancePreloader, 100 + Math.random() * 200);
    } else {
      setTimeout(() => {
        if (preloader) preloader.classList.add('loaded');
      }, 400);
    }
  }

  // Start preloader
  advancePreloader();

  // --- Contact form (visual only) ---
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #059669 0%, #06b6d4 100%)';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }
})();
