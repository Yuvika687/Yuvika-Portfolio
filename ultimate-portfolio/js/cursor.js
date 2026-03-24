/* ==========================================
   CUSTOM CURSOR — Gradient trailing circles
   Adapted from original-portfolio CustomCursor.jsx
   ========================================== */

(function () {
  if (window.innerWidth <= 768) return;

  const container = document.getElementById('cursor-container');
  if (!container) return;

  const coords = { x: 0, y: 0 };

  const el = document.createElement('div');
  el.className = 'single-cursor-glow';
  container.appendChild(el);

  // Hide default cursor
  const style = document.createElement('style');
  style.textContent = `
    @media (min-width: 769px) {
      *, *::before, *::after { cursor: none !important; }
    }
    .single-cursor-glow {
      position: fixed;
      pointer-events: none;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 0 15px 4px #06b6d4, 0 0 25px 8px #7c3aed;
      z-index: 10005;
      transform: translate(-50%, -50%);
      transition: transform 0.1s ease;
    }
    .single-cursor-glow.clicking {
      transform: translate(-50%, -50%) scale(0.6);
      box-shadow: 0 0 20px 6px #06b6d4, 0 0 40px 12px #7c3aed;
    }
  `;
  document.head.appendChild(style);

  window.addEventListener('mousemove', (e) => {
    el.style.left = `${e.clientX}px`;
    el.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mousedown', () => {
    el.classList.add('clicking');
  });
  document.addEventListener('mouseup', () => {
    el.classList.remove('clicking');
  });
})();
