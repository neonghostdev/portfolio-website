// mobile-menu styles
const burgerMenu = document.querySelector("#burgerIcon");
const closeMenuIcon = document.querySelector("#closeMenuIcon");
const mobileMenu = document.querySelector("#mobileMenu");
const headerIconsContainer = document.querySelector(".header__icons-container");
const main = document.querySelector(".main");
const body = document.querySelector("body");

function toggleHidden(element, elementBEMName) {
  element.classList.toggle(elementBEMName);
}

burgerMenu.addEventListener("click", () => {
  toggleHidden(mobileMenu, "mobile-menu--hidden");
});

closeMenuIcon.addEventListener("click", () => {
  toggleHidden(mobileMenu, "mobile-menu--hidden");
});

main.addEventListener("click", () => {
  mobileMenu.classList.add("mobile-menu--hidden");
});

document.addEventListener("scroll", () => {
  if (window.scrollY === 0) {
    headerIconsContainer.classList.add(
      "header__icons-container--no-background"
    );
  } else {
    headerIconsContainer.classList.remove(
      "header__icons-container--no-background"
    );
  }
});
