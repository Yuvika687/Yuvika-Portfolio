/* ==========================================
   CUSTOM CURSOR — Gradient trailing circles
   Adapted from ansh-portfolio CustomCursor.jsx
   ========================================== */

(function () {
  if (window.innerWidth <= 768) return;

  const container = document.getElementById('cursor-container');
  if (!container) return;

  const count = 20;
  const coords = { x: 0, y: 0 };

  const colors = [
    '#7c3aed', '#7e40e0', '#8046d4', '#824cc8', '#8452bc',
    '#8658b0', '#885ea4', '#8a6498', '#8c6a8c', '#8e7080',
    '#06b6d4', '#14b0cc', '#22aac4', '#30a4bc', '#3e9eb4',
    '#4c98ac', '#5a92a4', '#688c9c', '#768694', '#84808c',
  ];

  const circles = [];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'circle';
    el.style.backgroundColor = colors[i % colors.length];
    container.appendChild(el);
    circles.push({ el, x: 0, y: 0 });
  }

  // Hide default cursor
  const style = document.createElement('style');
  style.textContent = `
    @media (min-width: 769px) {
      *, *::before, *::after { cursor: none !important; }
    }
  `;
  document.head.appendChild(style);

  window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
  });

  function animateCursor() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
      circle.el.style.left = `${x - 12}px`;
      circle.el.style.top = `${y - 12}px`;
      circle.el.style.transform = `scale(${(count - index) / count})`;

      circle.x = x;
      circle.y = y;

      const next = circles[index + 1] || circles[0];
      x += (next.x - x) * 0.3;
      y += (next.y - y) * 0.3;
    });

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
})();
