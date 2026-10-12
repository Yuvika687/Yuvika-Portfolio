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
    // Messages are delivered to my inbox through FormSubmit (no backend needed).
    // If that fails, fall back to the visitor's own mail app so nothing is lost.
    const CONTACT_EMAIL = 'yuvikamalhotra1414@gmail.com';
    const status = form.querySelector('.form-status');
    const setStatus = (text, tone) => {
      if (!status) return;
      status.textContent = text;
      status.dataset.tone = tone || '';
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      const data = Object.fromEntries(new FormData(form));
      if (data._honey) return; // bot filled the hidden field

      btn.disabled = true;
      btn.innerHTML = 'Sending…';
      setStatus('', '');

      const restore = () => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.background = '';
      };

      try {
        const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
            _replyto: data.email,
            _subject: `Portfolio message from ${data.name}`,
            _template: 'table',
            _captcha: 'false',
          }),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok || String(body.success) !== 'true') throw new Error(body.message || 'send failed');

        btn.innerHTML = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #059669 0%, #06b6d4 100%)';
        setStatus("Thanks! I'll get back to you soon.", 'ok');
        form.reset();
        setTimeout(restore, 3500);
      } catch (err) {
        restore();
        const subject = encodeURIComponent(`Portfolio message from ${data.name}`);
        const mailBody = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`);
        setStatus(`Couldn't send from here — opening your email app instead. You can also write to ${CONTACT_EMAIL}.`, 'warn');
        window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${mailBody}`;
      }
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
