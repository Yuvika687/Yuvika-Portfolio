/* ==========================================
   PARTICLES — Canvas particles with mouse magnetism
   Adapted from ansh-portfolio Particles.jsx
   ========================================== */

(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const mouse = { x: 0, y: 0 };
  let particles = [];
  let animId;

  const config = {
    quantity: window.innerWidth < 768 ? 80 : 160,
    color: [255, 255, 255],
    size: 0.6,
    staticity: 30,
    ease: 40,
    vx: 0.15,
    vy: 0.15,
  };

  function resize() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(dpr, dpr);
    particles = [];
    for (let i = 0; i < config.quantity; i++) {
      particles.push(createParticle());
    }
  }

  function createParticle() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      tx: 0,
      ty: 0,
      size: Math.random() * 2 + config.size,
      alpha: 0,
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.1,
      dy: (Math.random() - 0.5) * 0.1,
      magnetism: 0.1 + Math.random() * 4,
    };
  }

  function animate() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((p, i) => {
      // Edge fade
      const edges = [
        p.x + p.tx - p.size,
        window.innerWidth - p.x - p.tx - p.size,
        p.y + p.ty - p.size,
        window.innerHeight - p.y - p.ty - p.size,
      ];
      const closest = Math.min(...edges);
      const remap = Math.min(Math.max(closest / 20, 0), 1);

      if (remap > 1) {
        p.alpha = Math.min(p.alpha + 0.02, p.targetAlpha);
      } else {
        p.alpha = p.targetAlpha * remap;
      }

      // Movement
      p.x += p.dx + config.vx;
      p.y += p.dy + config.vy;

      // Mouse magnetism
      p.tx += (mouse.x / (config.staticity / p.magnetism) - p.tx) / config.ease;
      p.ty += (mouse.y / (config.staticity / p.magnetism) - p.ty) / config.ease;

      // Draw
      ctx.beginPath();
      ctx.arc(p.x + p.tx, p.y + p.ty, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${config.color.join(',')}, ${p.alpha})`;
      ctx.fill();

      // Reset if offscreen
      if (
        p.x < -p.size || p.x > window.innerWidth + p.size ||
        p.y < -p.size || p.y > window.innerHeight + p.size
      ) {
        particles[i] = createParticle();
      }
    });

    animId = requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX - window.innerWidth / 2;
    mouse.y = e.clientY - window.innerHeight / 2;
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });

  resize();
  animate();
})();
