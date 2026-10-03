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
