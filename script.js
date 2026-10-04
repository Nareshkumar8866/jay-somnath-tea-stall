/* Jay Somnath Tea Store — polished interactions */
(() => {
  "use strict";

  const menuBtn = document.getElementById("menuBtn");
  const navMenu = document.getElementById("navMenu");
  const header = document.getElementById("siteHeader");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Header state
  const updateHeader = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 24);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Accessible mobile navigation
  const closeMenu = () => {
    if (!menuBtn || !navMenu) return;
    navMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open navigation menu");
  };

  if (menuBtn && navMenu) {
    menuBtn.setAttribute("aria-label", "Open navigation menu");
    menuBtn.addEventListener("click", () => {
      const open = navMenu.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (!navMenu.contains(event.target) && !menuBtn.contains(event.target)) closeMenu();
    });
  }

  // Reveal sections as they enter the viewport
  const revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });
    revealEls.forEach((el) => observer.observe(el));
  }

  // Keep the copyright year current if a year element is present
  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = new Date().getFullYear();

  // Prevent broken video controls from affecting the page when media is missing
  document.querySelectorAll("video").forEach((video) => {
    video.addEventListener("error", () => video.classList.add("media-unavailable"));
  });
})();
