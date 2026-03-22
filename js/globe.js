/* ==========================================
   3D GLOBE — Interactive globe using cobe
   ========================================== */

(function () {
  const canvas = document.getElementById('globe-canvas');
  if (!canvas) return;

  let phi = 0;
  let width = 0;
  let pointerInteracting = null;
  let pointerInteractionMovement = 0;

  const onResize = () => {
    width = canvas.offsetWidth;
  };
  window.addEventListener('resize', onResize);
  onResize();

  const globe = cobe.createGlobe(canvas, {
    devicePixelRatio: 2,
    width: width * 2,
    height: width * 2,
    phi: 0,
    theta: 0.3,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [0.1, 0.8, 1],
    glowColor: [1, 1, 1],
    markers: [
      // Example markers: [lat, lon]
      { location: [37.7595, -122.4367], size: 0.03 },
      { location: [40.7128, -74.006], size: 0.1 },
      { location: [19.076, 72.8777], size: 0.1 }, // Mumbai
      { location: [28.6139, 77.2090], size: 0.05 }, // Delhi
      { location: [51.5074, -0.1278], size: 0.05 }, // London
    ],
    onRender: (state) => {
      // Rotate globe
      if (!pointerInteracting) {
        phi += 0.005;
      }
      state.phi = phi + pointerInteractionMovement;
      state.width = width * 2;
      state.height = width * 2;
    },
  });

  canvas.style.opacity = '1';

  canvas.onpointerdown = (e) => {
    pointerInteracting = e.clientX - pointerInteractionMovement;
    canvas.style.cursor = 'grabbing';
  };

  canvas.onpointerup = () => {
    pointerInteracting = null;
    canvas.style.cursor = 'grab';
  };

  canvas.onpointerout = () => {
    pointerInteracting = null;
    canvas.style.cursor = 'grab';
  };

  canvas.onmousemove = (e) => {
    if (pointerInteracting !== null) {
      const delta = e.clientX - pointerInteracting;
      pointerInteractionMovement = delta / 200;
    }
  };

  canvas.ontouchmove = (e) => {
    if (pointerInteracting !== null && e.touches[0]) {
      const delta = e.touches[0].clientX - pointerInteracting;
      pointerInteractionMovement = delta / 200;
    }
  };
})();
