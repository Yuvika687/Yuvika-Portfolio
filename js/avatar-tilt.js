/* ==========================================
   AVATAR 3D CURSOR TRACKING + PARALLAX DEPTH
   Lerp-based smooth following with layered parallax
   ========================================== */

(function () {
  const area = document.getElementById('avatar-tilt');
  const frame = document.getElementById('avatar-frame');
  const glow = document.getElementById('avatar-glow');
  if (!area || !frame) return;

  const bgLayer = frame.querySelector('.avatar-layer-bg');
  const fgLayer = frame.querySelector('.avatar-layer-fg');

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  const maxTilt = 12;
  const lerpFactor = 0.05; // Lower = lazier/smoother

  function onMouseMove(e) {
    const rect = area.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normalize cursor position relative to avatar center
    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));

    targetX = normX;
    targetY = normY;

    // Intensify glow when cursor is near the avatar
    if (glow) {
      const dist = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      const proximity = Math.max(0, 1 - dist / 500);
      glow.style.opacity = 0.7 + proximity * 0.6;
      glow.style.transform = `scale(${1 + proximity * 0.15})`;
    }
  }

  function onMouseLeave() {
    targetX = 0;
    targetY = 0;
    if (glow) {
      glow.style.opacity = '';
      glow.style.transform = '';
    }
  }

  function animate() {
    // Lerp toward target
    currentX += (targetX - currentX) * lerpFactor;
    currentY += (targetY - currentY) * lerpFactor;

    const rotateY = currentX * maxTilt;
    const rotateX = -currentY * maxTilt;

    // Apply 3D tilt to the whole area
    area.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Parallax depth layers — fg moves more than bg
    if (bgLayer) {
      bgLayer.style.transform = `scale(1.08) translate(${currentX * 3}px, ${currentY * 3}px)`;
    }
    if (fgLayer) {
      fgLayer.style.transform = `translate(${currentX * 10}px, ${currentY * 10}px)`;
    }

    requestAnimationFrame(animate);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseleave', onMouseLeave);
  animate();
})();
