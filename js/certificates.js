/* ==========================================
   CERTIFICATES & BADGES — Dynamic Loader
   ========================================== */
(function () {
  'use strict';

  // Certificate image filenames from the Certificates folder (images only, no PDFs)
  const certificates = [
    'CSE Pathshala.png',
    'FreeCodeCamp.png',
    'IMG_6149.PNG',
    'Infosys(Deep Learning for Developers).png',
    'Oracle.png',
    'Screenshot 2026-03-22 at 1.03.36 PM.png',
    'Screenshot 2026-03-22 at 1.50.19 PM.png',
    'Screenshot 2026-03-22 at 1.50.31 PM.png',
    'Symposium workshop certificate.png',
    'Unstop_updated.png',
    'Yuvika Malhotra_Infosys Internship.png',
    'Yuvika Malhotra_Internship_Certificate (1).png'
  ];

  // Badge image filenames from the Badges folder
  const badges = [
    '370270287_1401705290783240_4441420064204270093_n.png',
    'badge google.png',
    'badge n.png',
    'badge n2.png',
    'badge.png',
    'gssoc.png'
  ];

  const certCarousel = document.getElementById('cert-carousel');
  const badgesGrid = document.getElementById('badges-grid');

  // ---- Build Certificate Cards in a scroll track for auto-marquee ----
  var scrollTrack = document.createElement('div');
  scrollTrack.className = 'cert-scroll-track';

  // Build original cards
  certificates.forEach(function (filename) {
    var card = document.createElement('div');
    card.className = 'cert-card';
    var img = document.createElement('img');
    img.src = 'Certificates/' + filename;
    img.alt = 'Certificate';
    img.loading = 'lazy';
    img.addEventListener('click', function () { openCertModal(img.src); });
    card.appendChild(img);
    scrollTrack.appendChild(card);
  });

  // Duplicate cards for seamless loop
  certificates.forEach(function (filename) {
    var card = document.createElement('div');
    card.className = 'cert-card';
    var img = document.createElement('img');
    img.src = 'Certificates/' + filename;
    img.alt = 'Certificate';
    img.loading = 'lazy';
    img.addEventListener('click', function () { openCertModal(img.src); });
    card.appendChild(img);
    scrollTrack.appendChild(card);
  });

  certCarousel.appendChild(scrollTrack);

  // ---- Build Badge Cards for Marquee ----
  badges.forEach(function (filename) {
    var card = document.createElement('div');
    card.className = 'badge-card';
    var img = document.createElement('img');
    img.src = 'Badges/' + filename;
    img.alt = 'Badge';
    img.loading = 'lazy';
    card.appendChild(img);
    badgesGrid.appendChild(card);
  });

  // Duplicate for seamless loop
  badges.forEach(function (filename) {
    var card = document.createElement('div');
    card.className = 'badge-card';
    var img = document.createElement('img');
    img.src = 'Badges/' + filename;
    img.alt = 'Badge';
    img.loading = 'lazy';
    card.appendChild(img);
    badgesGrid.appendChild(card);
  });

  // ---- Fullscreen Modal ----
  var modal = document.createElement('div');
  modal.className = 'cert-modal';
  modal.innerHTML = '<button class="cert-modal-close">&times;</button><img src="" alt="Certificate Full View" />';
  document.body.appendChild(modal);

  var modalImg = modal.querySelector('img');
  var modalClose = modal.querySelector('.cert-modal-close');

  function openCertModal(src) {
    modalImg.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCertModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeCertModal);
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeCertModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeCertModal();
  });
})();
