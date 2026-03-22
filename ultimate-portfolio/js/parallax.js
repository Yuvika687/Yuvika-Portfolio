/* ==========================================
   PARALLAX — Multi-layer background depth
   ========================================== */

(function () {
  const layers = document.querySelectorAll('.parallax-layer');
  if (!layers.length) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        layers.forEach((layer) => {
          const speed = parseFloat(layer.dataset.speed) || 0;
          layer.style.transform = `translateY(${scrollY * speed}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });

  // Mouse-based parallax for hero
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

    layers.forEach((layer, i) => {
      const depth = (i + 1) * 10;
      layer.style.transform += ` translate(${x * depth}px, ${y * depth}px)`;
    });
  });
})();
