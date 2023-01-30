const navToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-nav");
const body = document.querySelector('body');

navToggle.addEventListener("click", () => {
  primaryNav.hasAttribute("data-visible")
    ? navToggle.setAttribute("aria-expanded", true)
    : navToggle.setAttribute("aria-expanded", false);
  primaryNav.toggleAttribute("data-visible")
});