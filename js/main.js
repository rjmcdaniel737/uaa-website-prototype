/* =============================================
   UAA Website Prototype — Main JS v2
   ============================================= */

(function () {
  'use strict';

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById('navToggle');
  var nav    = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      this.setAttribute('aria-expanded', open);
    });
  }

  /* ---- Close mobile nav on outside click ---- */
  document.addEventListener('click', function (e) {
    if (nav && nav.classList.contains('open') && !nav.contains(e.target) && e.target !== toggle) {
      nav.classList.remove('open');
    }
  });

  /* ---- Sticky header shadow on scroll ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.style.boxShadow = window.scrollY > 10
        ? '0 3px 20px rgba(0,0,0,0.35)'
        : '0 2px 8px rgba(0,0,0,0.25)';
    }, { passive: true });
  }

  /* ---- Program Finder: College filter buttons ---- */
  var collegeButtons = document.querySelectorAll('.college-btn');
  var programItems   = document.querySelectorAll('#programList li');

  collegeButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      collegeButtons.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      var college = this.dataset.college;
      programItems.forEach(function (item) {
        if (college === 'all' || item.dataset.college === college) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ---- Program Finder: Text search ---- */
  var searchInput = document.getElementById('programSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var query = this.value.toLowerCase().trim();
      var activeCollege = document.querySelector('.college-btn.active');
      var college = activeCollege ? activeCollege.dataset.college : 'all';

      programItems.forEach(function (item) {
        var name = item.querySelector('a').textContent.toLowerCase();
        var collegeMatch = college === 'all' || item.dataset.college === college;
        var textMatch    = name.includes(query);
        item.classList.toggle('hidden', !(collegeMatch && textMatch));
      });
    });
  }

  /* ---- Program Finder: Click to highlight + show detail ---- */
  programItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') return; // let links navigate normally
      programItems.forEach(function (i) { i.classList.remove('active-program'); });
      this.classList.add('active-program');
    });
  });

  /* ---- Scroll-reveal animations ---- */
  var style = document.createElement('style');
  style.textContent =
    '.reveal-init{opacity:0;transform:translateY(20px);transition:opacity .5s ease,transform .5s ease}' +
    '.revealed{opacity:1!important;transform:none!important}';
  document.head.appendChild(style);

  var revealTargets = document.querySelectorAll(
    '.news-card, .event-card, .iam-stat, .research-card, .campus-card'
  );

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealTargets.forEach(function (el) {
      el.classList.add('reveal-init');
      revealObserver.observe(el);
    });
  }

  /* ---- Hero tab switching ---- */
  var heroTabs = document.querySelectorAll('.hero-tab');
  heroTabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      heroTabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
    });
  });

})();
