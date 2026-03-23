/* ==========================================
   ALTERNATING TIMELINE — Scroll Animations
   ========================================== */
(function () {
  'use strict';

  var progress = document.getElementById('timeline-progress');
  var timeline = document.getElementById('alt-timeline');
  var items = document.querySelectorAll('.alt-timeline-item');

  if (!timeline || !progress) return;

  // Scroll-driven line progress
  function updateProgress() {
    var rect = timeline.getBoundingClientRect();
    var timelineTop = rect.top + window.scrollY;
    var timelineHeight = rect.height;
    var scrollY = window.scrollY + window.innerHeight * 0.6;
    var traveled = scrollY - timelineTop;
    var pct = Math.max(0, Math.min(1, traveled / timelineHeight)) * 100;
    progress.style.height = pct + '%';
  }

  // Reveal cards when they enter viewport
  function revealCards() {
    items.forEach(function (item) {
      var rect = item.getBoundingClientRect();
      var threshold = window.innerHeight * 0.85;
      if (rect.top < threshold) {
        item.classList.add('visible');
      }
    });
  }

  function onScroll() {
    updateProgress();
    revealCards();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // Initial check
  onScroll();
})();
