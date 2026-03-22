/* =========================================================
   STAR FIELD — Inspired by space-portfolio's Three.js stars
   but reimagined as a rotating 2D canvas star field with
   depth layers, twinkling, and shooting stars
   ========================================================= */
(function () {
  const cvs = document.getElementById('star-canvas');
  if (!cvs) return;
  const ctx = cvs.getContext('2d');

  let W, H;
  const STAR_COUNT = 260;
  const DEPTH_LAYERS = 3;
  const stars = [];
  let shootingStars = [];
  let time = 0;

  function resize() {
    W = cvs.width = window.innerWidth;
    H = cvs.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Create stars with depth
  for (let i = 0; i < STAR_COUNT; i++) {
    const layer = Math.floor(Math.random() * DEPTH_LAYERS);
    stars.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: (0.3 + Math.random() * 1.2) * (1 + layer * 0.3),
      layer,
      speed: 0.02 + layer * 0.015,
      twinkleSpeed: 0.5 + Math.random() * 2,
      twinkleOffset: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.7 ? (Math.random() > 0.5 ? 270 : 190) : 0, // purple/cyan/white
    });
  }

  // Shooting star spawner
  function spawnShootingStar() {
    if (shootingStars.length > 2) return;
    shootingStars.push({
      x: Math.random() * W * 0.8,
      y: Math.random() * H * 0.4,
      len: 60 + Math.random() * 100,
      speed: 4 + Math.random() * 6,
      angle: (Math.PI / 6) + Math.random() * (Math.PI / 6),
      opacity: 1,
      life: 0,
      maxLife: 40 + Math.random() * 30,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    time += 0.016;

    // Slow global rotation
    const rotAngle = time * 0.003;

    // Draw stars
    for (const s of stars) {
      // Apply slow rotation around center
      const cx = W / 2, cy = H / 2;
      const dx = s.x - cx, dy = s.y - cy;
      const cos = Math.cos(rotAngle * s.speed);
      const sin = Math.sin(rotAngle * s.speed);
      const rx = cx + dx * cos - dy * sin;
      const ry = cy + dx * sin + dy * cos;

      // Twinkle
      const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time * s.twinkleSpeed + s.twinkleOffset));
      const alpha = twinkle * (0.3 + s.layer * 0.25);

      ctx.beginPath();
      if (s.hue > 0) {
        ctx.fillStyle = `hsla(${s.hue}, 80%, 75%, ${alpha})`;
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      }
      ctx.arc(rx, ry, s.r, 0, Math.PI * 2);
      ctx.fill();

      // Add glow for larger stars
      if (s.r > 1.2) {
        ctx.beginPath();
        const grd = ctx.createRadialGradient(rx, ry, 0, rx, ry, s.r * 3);
        if (s.hue > 0) {
          grd.addColorStop(0, `hsla(${s.hue}, 80%, 75%, ${alpha * 0.3})`);
        } else {
          grd.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.3})`);
        }
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.arc(rx, ry, s.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const ss = shootingStars[i];
      ss.life++;
      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;
      ss.opacity = 1 - (ss.life / ss.maxLife);

      if (ss.life > ss.maxLife) {
        shootingStars.splice(i, 1);
        continue;
      }

      const tailX = ss.x - Math.cos(ss.angle) * ss.len;
      const tailY = ss.y - Math.sin(ss.angle) * ss.len;

      const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      grad.addColorStop(0, `rgba(255, 255, 255, 0)`);
      grad.addColorStop(0.7, `rgba(180, 155, 255, ${ss.opacity * 0.5})`);
      grad.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity})`);

      ctx.beginPath();
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.stroke();

      // Star head glow
      ctx.beginPath();
      const headGlow = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 4);
      headGlow.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
      headGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = headGlow;
      ctx.arc(ss.x, ss.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Random shooting star spawn
    if (Math.random() < 0.005) spawnShootingStar();

    requestAnimationFrame(draw);
  }

  draw();
})();
