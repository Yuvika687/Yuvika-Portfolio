/* ==========================================
   PARALLAX — Multi-layer background depth
   ========================================== */

(function () {
  const layers = document.querySelectorAll('.parallax-layer');
  if (!layers.length) return;

  let ticking = false;
  let mouseX = 0;
  let mouseY = 0;

  function updateParallax() {
    const scrollY = window.scrollY;
    layers.forEach((layer, i) => {
      const speed = parseFloat(layer.dataset.speed) || 0;
      const depth = (i + 1) * 10;
      layer.style.transform = `translate3d(${mouseX * depth}px, calc(${scrollY * speed}px + ${mouseY * depth}px), 0)`;
    });
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Mouse-based parallax for hero
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    updateParallax();
  });
})();
