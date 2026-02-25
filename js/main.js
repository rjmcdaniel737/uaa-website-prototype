/* =============================================
   UAA Website Prototype — Main JS
   ============================================= */

(function () {
  'use strict';

  // ---- Mobile nav toggle ----
  var toggle = document.getElementById('navToggle');
  var nav    = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      this.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // ---- Close mobile nav on link click & update active state ----
  document.querySelectorAll('.main-nav a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (nav) nav.classList.remove('open');
      document.querySelectorAll('.main-nav a').forEach(function (l) {
        l.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

  // ---- Sticky header enhanced shadow on scroll ----
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10
        ? '0 2px 16px rgba(0,0,0,0.3)'
        : '0 2px 8px rgba(0,0,0,0.20)';
    });
  }

  // ---- Scroll-reveal animation ----
  var revealEls = document.querySelectorAll('.card, .research-card, .feature-item, .stat');

  // Inject reveal styles dynamically
  var style = document.createElement('style');
  style.textContent =
    '.reveal-init { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }' +
    '.revealed    { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) {
      el.classList.add('reveal-init');
      observer.observe(el);
    });
  } else {
    // Fallback: just show everything
    revealEls.forEach(function (el) { el.style.opacity = '1'; });
  }

  // ---- Smooth active nav highlighting on scroll ----
  var sections = document.querySelectorAll('section[id]');
  var navLinks  = document.querySelectorAll('.main-nav a[href^="#"]');

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY + 100;
    sections.forEach(function (section) {
      if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  });

})();
