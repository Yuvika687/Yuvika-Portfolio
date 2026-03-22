/* ==========================================
   FLIP WORDS — Cycling text animation
   Adapted from original-portfolio FlipWords.jsx
   ========================================== */

(function () {
  const el = document.getElementById('flip-word');
  if (!el) return;

  const words = ['Intelligent', 'Scalable', 'Data-Driven', 'Robust', 'Innovative'];
  let current = 0;

  setInterval(() => {
    el.classList.add('out');

    setTimeout(() => {
      current = (current + 1) % words.length;
      el.textContent = words[current];
      el.classList.remove('out');
    }, 500);
  }, 2500);
})();
