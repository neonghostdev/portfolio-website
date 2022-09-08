// mobile-menu styles
const burgerMenu = document.querySelector("#burgerIcon");
const closeMenuIcon = document.querySelector("#closeMenuIcon");
const mobileMenu = document.querySelector("#mobileMenu");

function toggleHidden(element, elementBEMName) {
  element.classList.toggle(elementBEMName);
}

burgerMenu.addEventListener("click", () => {
  toggleHidden(mobileMenu, "mobile-menu--hidden");
});

closeMenuIcon.addEventListener("click", () => {
  toggleHidden(mobileMenu, "mobile-menu--hidden");
});
