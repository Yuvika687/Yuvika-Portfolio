/* ==========================================
   ANIMATED COUNTER — CountUp + ring animation
   ========================================== */

(function () {
  const counters = document.querySelectorAll('.counter-card');
  if (!counters.length) return;

  let triggered = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          startCounting();
          animateRings();
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach((card) => observer.observe(card));

  function startCounting() {
    counters.forEach((card) => {
      const target = parseInt(card.dataset.target, 10);
      const valueEl = card.querySelector('.counter-value');
      if (!valueEl) return;

      let current = 0;
      const duration = 2000;
      const step = target / (duration / 16);

      function count() {
        current += step;
        if (current >= target) {
          valueEl.textContent = target;
          return;
        }
        valueEl.textContent = Math.floor(current);
        requestAnimationFrame(count);
      }
      count();
    });
  }

  function animateRings() {
    const rings = document.querySelectorAll('.counter-ring-fill');
    rings.forEach((ring) => {
      const percent = parseInt(ring.dataset.percent, 10) || 0;
      const circumference = 283; // 2 * PI * 45
      const offset = circumference - (percent / 100) * circumference;
      ring.style.strokeDashoffset = offset;
      ring.classList.add('animated');
    });
  }

  // --- CP Card Counters ---
  const cpCards = document.querySelectorAll('.cp-card');
  if (cpCards.length) {
    let cpTriggered = false;
    
    // Extract target and formats from HTML, then reset to 0
    cpCards.forEach((card) => {
      const valueEl = card.querySelector('.cp-number');
      if (!valueEl) return;
      
      const text = valueEl.textContent.trim();
      const match = text.match(/^([^\d]*)((?:[\d,.]+))([^\d]*)$/);
      if (match) {
        const prefix = match[1];
        const numStr = match[2];
        const suffix = match[3];
        
        card.dataset.cpTarget = numStr.replace(/,/g, '');
        card.dataset.cpPrefix = prefix;
        card.dataset.cpSuffix = suffix;
        card.dataset.cpIsDecimal = numStr.includes('.') ? "true" : "false";
        valueEl.textContent = prefix + "0" + suffix;
      }
    });

    const cpObserver = new IntersectionObserver((entries) => {
      let isAnyIntersecting = false;
      entries.forEach((entry) => {
        if (entry.isIntersecting) isAnyIntersecting = true;
      });
      
      if (isAnyIntersecting && !cpTriggered) {
        cpTriggered = true;
        startCpCounting();
      }
    }, { threshold: 0.2 });

    cpCards.forEach(card => cpObserver.observe(card));

    function startCpCounting() {
      cpCards.forEach((card) => {
        const valueEl = card.querySelector('.cp-number');
        if (!valueEl || !card.dataset.cpTarget) return;
        
        const target = parseFloat(card.dataset.cpTarget);
        const prefix = card.dataset.cpPrefix;
        const suffix = card.dataset.cpSuffix;
        const isDecimal = card.dataset.cpIsDecimal === "true";

        let current = 0;
        const duration = 2000;
        const step = target / (duration / 16);

        function count() {
          current += step;
          if (current >= target) {
            valueEl.textContent = prefix + (isDecimal ? target.toFixed(2) : target) + suffix;
            return;
          }
          const displayVal = isDecimal ? current.toFixed(2) : Math.floor(current);
          valueEl.textContent = prefix + displayVal + suffix;
          requestAnimationFrame(count);
        }
        
        count();
      });
    }
  }

})();
