// Small interactive behaviors: mobile nav toggle, year, download CV placeholder
document.addEventListener('DOMContentLoaded', () => {
    // year
    const yearEl = document.getElementById('cur-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // mobile nav toggle
    const navToggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    navToggle && navToggle.addEventListener('click', () => {
        const expanded = nav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        // animate nav on small screens
        if (expanded) {
            nav.style.display = 'flex';
            nav.style.flexDirection = 'column';
            nav.style.background = 'rgba(12,12,12,0.96)';
            nav.style.padding = '12px';
            nav.style.borderRadius = '12px';
            nav.style.position = 'absolute';
            nav.style.right = '16px';
            nav.style.top = '70px';
        } else {
            nav.style.display = '';
            nav.style.background = '';
            nav.style.padding = '';
            nav.style.position = '';
        }
    });

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Download CV placeholder
    const downloadBtn = document.getElementById('download-cv');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Replace below with real CV url later
            alert('CV placeholder — replace the link with your real CV (PDF) or cloud link.');
        });
    }
});

// Fade-in on scroll for project cards
const projectCards = document.querySelectorAll('.project-card');

function handleScroll() {
    projectCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (cardTop < windowHeight - 100) {
            card.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);