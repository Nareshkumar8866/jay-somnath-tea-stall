
document.addEventListener("DOMContentLoaded", () => {

    const preloader = document.getElementById("preloader");
    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    // Loader
    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader.classList.add("done");
        }, 400);
    });

    // Header scroll
    function handleScroll() {
        header.classList.toggle("scrolled", window.scrollY > 40);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    // Mobile menu
    function closeMenu() {
        nav.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    menuToggle.addEventListener("click", () => {
        const open = nav.classList.toggle("open");

        menuToggle.classList.toggle("active", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        document.body.style.overflow = open ? "hidden" : "";
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Scroll animations
    const elements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        elements.forEach(element => observer.observe(element));
    } else {
        elements.forEach(element => element.classList.add("visible"));
    }

    // Footer year
    document.getElementById("year").textContent =
        new Date().getFullYear();

    // Escape key
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

});
