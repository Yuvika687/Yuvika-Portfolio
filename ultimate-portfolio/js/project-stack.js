document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-stack-card');
  const numberIndicators = document.querySelectorAll('.project-number-indicator');
  const leftDecor = document.querySelector('.project-side-left');
  if (!cards.length) return;

  // Sticky top offsets: Card 1 = 80px, Card 2 = 95px, Card 3 = 110px
  const BASE_TOP = 80;
  const TOP_INCREMENT = 15;

  // Set sticky positions on cards
  cards.forEach((card, index) => {
    const topVal = BASE_TOP + index * TOP_INCREMENT;
    card.style.top = `${topVal}px`;
    card.style.zIndex = index + 1;
  });

  // Position the number indicators next to each card
  function positionNumbers() {
    if (!leftDecor || !numberIndicators.length) return;
    const containerRect = leftDecor.getBoundingClientRect();
    const containerTop = leftDecor.offsetTop;

    cards.forEach((card, index) => {
      if (numberIndicators[index]) {
        // Place each number at the same vertical offset as its card
        const cardTop = card.offsetTop;
        // Center it roughly at the card's middle (offset by about 40px from top of card)
        numberIndicators[index].style.top = `${cardTop + 40}px`;
      }
    });
  }

  function updateStack() {
    // Track which card is the topmost stuck card
    let topStuckCard = -1;

    cards.forEach((card, index) => {
      const stickyTop = BASE_TOP + index * TOP_INCREMENT;
      const rect = card.getBoundingClientRect();

      // Is this card in its sticky state?
      if (rect.top <= stickyTop + 2) {
        topStuckCard = index;
        let depth = 0;

        // Calculate depth: how many cards are stacked ON TOP of this one
        for (let j = index + 1; j < cards.length; j++) {
          const nextStickyTop = BASE_TOP + j * TOP_INCREMENT;
          const nextRect = cards[j].getBoundingClientRect();
          const distance = nextRect.top - nextStickyTop;

          if (distance <= 1) {
            depth += 1;
          } else {
            const transitionWindow = window.innerHeight * 0.6;
            if (distance < transitionWindow) {
              depth += 1 - (distance / transitionWindow);
            }
          }
        }

        // Each card behind scales down more — gives the card-collecting feel
        // depth 0 = top card, depth 1 = one card on top, etc.
        const scale = Math.max(0.82, 1 - (0.05 * depth) - (0.02 * Math.max(0, depth - 1)));
        const opacity = Math.max(0.5, 1 - (0.15 * depth));
        const translateY = -20 * depth;
        const shadowOp = Math.min(0.85, 0.35 + (0.15 * depth));
        const blurSize = 60 + 30 * depth;

        card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        card.style.opacity = opacity;
        card.style.boxShadow = `0 ${20 + 12 * depth}px ${blurSize}px rgba(0,0,0,${shadowOp})`;
      } else {
        // Card hasn't stuck yet — reset
        card.style.transform = 'scale(1) translateY(0)';
        card.style.opacity = 1;
        card.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)';
      }
    });

    // Update number indicators: the topmost stuck card (last one to stick) glows
    // Find which card is the TOPMOST card on the stack (highest z-index that has stuck)
    let activeCard = -1;
    for (let i = cards.length - 1; i >= 0; i--) {
      const stickyTop = BASE_TOP + i * TOP_INCREMENT;
      const rect = cards[i].getBoundingClientRect();
      if (rect.top <= stickyTop + 2) {
        activeCard = i;
        break;
      }
    }

    // If no card stuck, find the closest card to viewport center
    if (activeCard === -1) {
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.getBoundingClientRect().top - window.innerHeight * 0.4);
        if (dist < minDist) { minDist = dist; activeCard = i; }
      });
    }

    // Glow ALL numbers that have been "passed" (their card is stuck or above)
    // The active card and all before it glow
    numberIndicators.forEach((indicator, i) => {
      if (i <= activeCard) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  // Initial positioning
  positionNumbers();

  // Reposition on resize
  window.addEventListener('resize', positionNumbers, { passive: true });

  // Update stacking on scroll
  window.addEventListener('scroll', updateStack, { passive: true });

  // Initialize
  updateStack();
});
