/**
 * SortMyScene — minimal JS for mobile menu and category tabs
 * No frameworks; vanilla only.
 */

(function () {
  'use strict';

  // ----- Mobile menu -----
  var menuToggle = document.querySelector('.navbar__menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isOpen);
      mobileMenu.classList.toggle('is-open');
      mobileMenu.setAttribute('aria-hidden', isOpen);
    });

    // Close menu when a link is clicked (for in-page anchors)
    mobileMenu.querySelectorAll('.navbar__mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
        mobileMenu.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // ----- Category tabs (visual state only; filtering would need backend) -----
  var tabs = document.querySelectorAll('.filters__tab');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    });

    tab.addEventListener('keydown', function (e) {
      var index = Array.prototype.indexOf.call(tabs, tab);
      var next = null;
      if (e.key === 'ArrowRight' && index < tabs.length - 1) {
        next = tabs[index + 1];
      } else if (e.key === 'ArrowLeft' && index > 0) {
        next = tabs[index - 1];
      }
      if (next) {
        e.preventDefault();
        next.focus();
        next.click();
      }
    });
  });
})();
