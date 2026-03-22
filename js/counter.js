/* ==========================================
   ANIMATED COUNTER — CountUp + ring animation
   ========================================== */

(function () {
  const counters = document.querySelectorAll('.counter-card, .about-stat-card');
  if (!counters.length) return;

  let triggered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          startCounting();
          animateRings();
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach((card) => observer.observe(card));

  function startCounting() {
    counters.forEach((card) => {
      const target = parseInt(card.dataset.target, 10);
      const valueEl = card.querySelector('.counter-value');
      if (!valueEl) return;

      let current = 0;
      const duration = 2000;
      const step = target / (duration / 16);

      function count() {
        current += step;
        if (current >= target) {
          valueEl.textContent = target;
          return;
        }
        valueEl.textContent = Math.floor(current);
        requestAnimationFrame(count);
      }
      count();
    });
  }

  function animateRings() {
    const rings = document.querySelectorAll('.counter-ring-fill');
    rings.forEach((ring) => {
      const percent = parseInt(ring.dataset.percent, 10) || 0;
      const circumference = 283; // 2 * PI * 45
      const offset = circumference - (percent / 100) * circumference;
      ring.style.strokeDashoffset = offset;
      ring.classList.add('animated');
    });
  }
})();
