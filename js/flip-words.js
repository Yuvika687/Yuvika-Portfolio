/* ==========================================
   TYPEWRITER — Letter-by-letter type & delete
   ========================================== */

(function () {
  const el = document.getElementById('hero-typewriter');
  if (!el) return;

  const phrases = [
    'AI/ML Enthusiast',
    'Smart Solution Builder',
    'ML Engineer in Making',
    'Data & Innovation Driven'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIndex];

    if (!isDeleting) {
      // Typing
      charIndex++;
      el.textContent = current.substring(0, charIndex);

      if (charIndex === current.length) {
        // Finished typing — pause before deleting
        isDeleting = true;
        setTimeout(type, 2000);
        return;
      }
      // Typing speed: slight random variation for natural feel
      setTimeout(type, 80 + Math.random() * 40);
    } else {
      // Deleting
      charIndex--;
      el.textContent = current.substring(0, charIndex);

      if (charIndex === 0) {
        // Move to next phrase
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      // Deleting speed: faster than typing
      setTimeout(type, 40 + Math.random() * 20);
    }
  }

  // Start after a brief delay
  setTimeout(type, 600);
})();
