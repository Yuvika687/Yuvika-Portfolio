document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-stack-card');
  if (!cards.length) return;
  
  // Set explicit sticky offsets
  cards.forEach((card, index) => {
    card.style.top = `${80 + (index * 15)}px`;
    card.style.zIndex = index + 1; // ensure proper stacking order physically
  });

  window.addEventListener('scroll', () => {
    cards.forEach((card, index) => {
      const stickyTop = 80 + (index * 15);
      const rect = card.getBoundingClientRect();
      
      // Is current card strictly sticky?
      if (rect.top <= stickyTop + 1) {
        
        let depth = 0;
        // Check all cards BELOW this one to see how much they have scrolled up
        for(let j = index + 1; j < cards.length; j++) {
            const nextCard = cards[j];
            const nextStickyTop = 80 + (j * 15);
            const nextRect = nextCard.getBoundingClientRect();
            
            const distance = nextRect.top - nextStickyTop;
            
            // If the next card is already in its sticky position, it contributes a full "1" to depth
            if (distance <= 0) {
               depth += 1;
            } else {
               // We calculate the overlap as the card scrolls up within the viewport
               // Use window.innerHeight as a rough transition window length
               const transitionWindow = window.innerHeight * 0.8;
               if (distance < transitionWindow) {
                 depth += 1 - (distance / transitionWindow);
               }
            }
        }
        
        // Depth is fully continuous. 
        // depth=0 -> top card. depth=1 -> 1 card on top. depth=2 -> 2 cards on top.
        const scale = Math.max(0.8, 1 - (0.05 * depth));
        const opacity = Math.max(0.4, 1 - (0.15 * depth));
        const translateY = -20 * depth; // Move up 20px per depth level
        const shadowOp = Math.min(0.8, 0.4 + (0.1 * depth));
        
        card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
        card.style.opacity = opacity;
        card.style.boxShadow = `0 ${20 + 10*depth}px ${60 + 20*depth}px rgba(0,0,0,${shadowOp})`;
        
      } else {
        // Reset styles when un-sticked
        card.style.transform = `scale(1) translateY(0)`;
        card.style.opacity = 1;
        card.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4)`;
      }
    });
  }, { passive: true });
  
  // Trigger once to initialize
  window.dispatchEvent(new Event('scroll'));
});
