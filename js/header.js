/* js/header.js — Mobile nav toggle + sticky scroll class + scroll-spy */
(function () {
    'use strict';
    const header    = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu   = document.getElementById('nav-menu');
    const navLinks  = document.querySelectorAll('.nav-link');
    const sections  = document.querySelectorAll('section');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle && navMenu) {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
            }
        });
    });

    function onScroll() {
        header.classList.toggle('scrolled', window.scrollY > 50);

        let currentId = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top && window.scrollY < top + section.clientHeight) {
                currentId = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
})();
