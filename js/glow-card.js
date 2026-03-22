/* ==========================================
   GLOW CARD — Mouse-angle glow + spotlight
   ========================================== */

(function () {
  const cards = document.querySelectorAll('.glow-card');
  if (!cards.length) return;

  cards.forEach((card) => {
    const spotlight = card.querySelector('.project-spotlight');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Glow border angle
      let angle = Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);
      angle = (angle + 360) % 360;
      card.style.setProperty('--start', angle + 60);

      // Spotlight follower
      if (spotlight) {
        spotlight.style.left = (mouseX - 125) + 'px';
        spotlight.style.top = (mouseY - 125) + 'px';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--start', 0);
    });
  });

  // Skill card spotlight
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach((card) => {
    const spot = card.querySelector('.skill-card-spotlight');
    if (!spot) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      spot.style.left = (e.clientX - rect.left - 60) + 'px';
      spot.style.top = (e.clientY - rect.top - 60) + 'px';
    });
  });
})();
