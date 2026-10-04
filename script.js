// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}

// Header background once the hero is scrolled past
const header = document.getElementById('siteHeader');

if (header) {
    const toggleHeader = () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
    };
    toggleHeader();
    window.addEventListener('scroll', toggleHeader, { passive: true });
}

// Scroll reveal animations
const revealEls = document.querySelectorAll('.reveal');

if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
} else {
    // Fallback: show everything immediately if IntersectionObserver isn't available
    revealEls.forEach(el => el.classList.add('is-visible'));
}
