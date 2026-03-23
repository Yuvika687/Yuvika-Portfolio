/* ==========================================
   CURSOR LED GLOW EFFECT FOR CARDS
   ========================================== */

(function () {
  // Target all requested card types
  const cards = document.querySelectorAll(`
    .edu-card,
    .alt-timeline-card,
    .cert-card,
    .badge-card,
    .project-stack-card,
    .glass-card,
    .contact-card
  `);

  if (!cards.length) return;

  cards.forEach((card) => {
    // Add base class for CSS styling
    card.classList.add('cursor-glow-element');

    // Assign specific glow colors based on the card type
    let glowColor = 'rgba(6, 182, 212, 0.8)'; // default cyan

    if (card.classList.contains('project-stack-card')) {
      glowColor = 'rgba(124, 58, 237, 0.8)'; // Purple #7C3AED
    } else if (card.classList.contains('cert-card')) {
      glowColor = 'rgba(255, 255, 255, 0.6)'; // White/silver for certs
    } else if (card.classList.contains('badge-card')) {
      glowColor = 'rgba(6, 182, 212, 0.8)'; // Cyan
    } else if (card.classList.contains('edu-card')) {
      // Check parent for specific dot colors to match accent
      const parent = card.closest('.edu-timeline-item');
      if (parent) {
        if (parent.querySelector('.dot-purple')) {
          glowColor = 'rgba(124, 58, 237, 0.8)'; // Purple
        } else if (parent.querySelector('.dot-blue')) {
          glowColor = 'rgba(59, 130, 246, 0.8)'; // Blue
        } else {
          glowColor = 'rgba(6, 182, 212, 0.8)'; // Cyan
        }
      }
    } else if (card.classList.contains('alt-timeline-card')) {
      glowColor = 'rgba(6, 182, 212, 0.8)'; // Cyan
    }

    // Set internal CSS variable for color
    card.style.setProperty('--card-glow-color', glowColor);

    // Track mouse position natively relative to card bounding box
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
})();
