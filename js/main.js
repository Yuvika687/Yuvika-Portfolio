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

  // --- Remove Spline Watermark via Shadow DOM ---
  function removeSplineWatermark() {
    const splines = document.querySelectorAll('spline-viewer');
    splines.forEach(spline => {
      // Access shadow root if available
      if (spline.shadowRoot) {
        const logo = spline.shadowRoot.querySelector('#logo');
        if (logo) logo.remove();
      }
    });
  }

  // Run immediately and also set up an observer in case it loads late
  removeSplineWatermark();
  setInterval(removeSplineWatermark, 1000); // Check periodically for late-loading Spline models

  // --- GitHub Heatmap Generation ---
  const heatmapGrid = document.getElementById('heatmap-grid');
  if (heatmapGrid) {
    // 53 columns * 7 days = 371 cells
    const totalCells = 371;
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      
      // Random generation heavily biased to level 0 and 1, with few 2,3,4
      // To simulate realistic active contribution graph based on user's theme
      const rand = Math.random();
      let level = 0;
      if (rand > 0.95) level = 4;
      else if (rand > 0.88) level = 3;
      else if (rand > 0.70) level = 2;
      else if (rand > 0.40) level = 1;
      
      cell.className = `heatmap-cell level-${level}`;
      // Add tooltip showing hypothetical contributions
      const date = new Date();
      date.setDate(date.getDate() - (totalCells - i));
      const contribs = level === 0 ? 0 : Math.floor(Math.random() * 10 * level) + 1;
      cell.title = `${contribs} contributions on ${date.toDateString()}`;
      
      heatmapGrid.appendChild(cell);
    }
  }
})();
