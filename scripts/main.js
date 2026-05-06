// Axe to Grind — site interactions
(() => {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // ---- Touch-only scroll-driven activation ----
  // On (hover: none) devices, mimic :hover effects by toggling .is-active
  // when an element passes through the middle band of the viewport.
  const noHover = window.matchMedia && window.matchMedia('(hover: none)').matches;
  if (noHover && 'IntersectionObserver' in window) {
    // Cards: wider band (middle 40%) — they're feature surfaces meant to dwell
    const cardTargets = document.querySelectorAll('.card, .lounge-card, .guitar-card, .poster-card');
    if (cardTargets.length) {
      const cardObs = new IntersectionObserver((entries) => {
        entries.forEach(e => e.target.classList.toggle('is-active', e.isIntersecting));
      }, { rootMargin: '-30% 0px -30% 0px', threshold: 0 });
      cardTargets.forEach(el => cardObs.observe(el));
    }

    // Menu rows: narrower band (middle 16%) — list items, keep visual noise low
    const rowTargets = document.querySelectorAll('.menu-row');
    if (rowTargets.length) {
      const rowObs = new IntersectionObserver((entries) => {
        entries.forEach(e => e.target.classList.toggle('is-active', e.isIntersecting));
      }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
      rowTargets.forEach(el => rowObs.observe(el));
    }
  }

  // Year stamp
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
})();
