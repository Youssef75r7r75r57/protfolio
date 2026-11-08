document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('cur-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');

    if (navToggle && nav) {
        const closeNav = () => {
            nav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        };

        navToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                closeNav();
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && nav.classList.contains('open')) closeNav();
        });

        document.addEventListener('click', (event) => {
            if (nav.classList.contains('open') && !nav.contains(event.target) && !navToggle.contains(event.target)) {
                closeNav();
            }
        });
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;

            event.preventDefault();
            if (prefersReducedMotion) {
                target.scrollIntoView();
            } else {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const revealItems = document.querySelectorAll('.reveal, .section-head, .about-card, .service-card, .contact-card, .site-footer');
    const revealGroups = new Map();

    revealItems.forEach((item) => {
        item.classList.add('reveal');
        const group = item.parentElement;
        const groupIndex = revealGroups.get(group) || 0;
        item.style.setProperty('--reveal-delay', `${Math.min(groupIndex * 90, 360)}ms`);
        revealGroups.set(group, groupIndex + 1);
    });

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -35px 0px' }
        );

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add('in-view'));
    }
});
