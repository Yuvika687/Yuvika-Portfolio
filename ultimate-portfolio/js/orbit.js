/* ==========================================
   ORBITING CIRCLES — Skills interactive effect
   ========================================== */

(function () {
  const container = document.getElementById('orbit-container');
  if (!container) return;

  const skills = [
    { icon: '🐍', name: 'Python', radius: 150, duration: 20, delay: 0 },
    { icon: '🔥', name: 'PyTorch', radius: 150, duration: 20, delay: -5 },
    { icon: '🧠', name: 'TensorFlow', radius: 150, duration: 20, delay: -10 },
    { icon: '🐳', name: 'Docker', radius: 150, duration: 20, delay: -15 },
    { icon: '☁️', name: 'AWS', radius: 225, duration: 30, delay: 0 },
    { icon: '⚛️', name: 'React', radius: 225, duration: 30, delay: -10 },
    { icon: '📝', name: 'NLP', radius: 225, duration: 30, delay: -20 },
  ];

  skills.forEach((skill) => {
    const item = document.createElement('div');
    item.className = 'orbit-item';
    item.innerHTML = skill.icon;
    item.setAttribute('data-tooltip', skill.name);
    
    // Set custom properties for CSS animation
    item.style.setProperty('--radius', `${skill.radius}px`);
    item.style.setProperty('--duration', `${skill.duration}s`);
    item.style.setProperty('--delay', `${skill.delay}s`);
    
    container.appendChild(item);
  });
})();
