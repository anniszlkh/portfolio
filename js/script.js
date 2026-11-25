const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");
const backToTop = document.querySelector(".back-to-top");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const year = document.querySelector("#year");

if (year) {
    year.textContent = new Date().getFullYear();
}

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll("main section[id]");
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 500);
}, { passive: true });



document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".shiftin-slider");

    if (!slider) {
        console.log("Slider not found!");
        return;
    }

    const slides = slider.querySelectorAll(".slide");
    const prev = slider.querySelector(".prev");
    const next = slider.querySelector(".next");

    const dotsContainer = document.querySelector(".slider-dots");
    const dots = dotsContainer
        ? dotsContainer.querySelectorAll(".dot")
        : [];

    let index = 0;

    function showSlide(number) {

        index = (number + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

        console.log("Current slide:", index + 1);
    }

    next.addEventListener("click", function () {
        showSlide(index + 1);
    });

    prev.addEventListener("click", function () {
        showSlide(index - 1);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", function () {
            showSlide(i);
        });
    });

    console.log("Slider initialized. Total images:", slides.length);

});
