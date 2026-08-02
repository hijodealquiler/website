// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  siteNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Subtle scroll reveal (respects reduced motion)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll(
    '.service-card, .step, .price-card, .mini-badge, .zone-list li'
  );

  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));
}

// Cookie consent banner
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');
const cookieReject = document.getElementById('cookieReject');
const COOKIE_CONSENT_KEY = 'hda_cookie_consent';

if (cookieBanner) {
  let stored = null;
  try { stored = localStorage.getItem(COOKIE_CONSENT_KEY); } catch (e) { stored = null; }
  if (!stored) cookieBanner.classList.add('show');

  const setConsent = (value) => {
    try { localStorage.setItem(COOKIE_CONSENT_KEY, value); } catch (e) {}
    cookieBanner.classList.remove('show');
  };

  if (cookieAccept) cookieAccept.addEventListener('click', () => setConsent('accepted'));
  if (cookieReject) cookieReject.addEventListener('click', () => setConsent('rejected'));
}
