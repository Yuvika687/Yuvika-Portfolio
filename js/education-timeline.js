document.addEventListener('DOMContentLoaded', () => {
  const line = document.getElementById('edu-timeline-line');
  const items = document.querySelectorAll('.edu-timeline-item');
  const container = document.querySelector('.education-container');

  if (!line || !items.length || !container) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When the container comes into view, draw the line
      if (entry.isIntersecting && entry.target === container) {
        line.classList.add('draw-line');
      }

      // When individual cards come into view, pop their dots
      if (entry.isIntersecting && entry.target.classList.contains('edu-timeline-item')) {
        entry.target.classList.add('revealed');
        // also trigger the slide reveal (which uses .active in scroll.js)
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, observerOptions);

  observer.observe(container);
  items.forEach(item => observer.observe(item));
});
