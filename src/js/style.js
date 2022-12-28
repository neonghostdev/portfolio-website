// utility functions
function toggleHidden(element, elementBEMName) {
  element.classList.toggle(elementBEMName);
}

/// ELEMENTS ///

// mobile-menu elements
const burgerMenu = document.querySelector("#burgerIcon");
const closeMenuIcon = document.querySelector("#closeMenuIcon");
const mobileMenu = document.querySelector("#mobileMenu");
const headerIconsContainer = document.querySelector(".header__icons-container");
const mobileMenuLink = document.querySelectorAll(".mobile-menu__link");
const mobileMenuButton = document.querySelector(".mobile-menu__button");

// body elements
const body = document.querySelector("body");
const main = document.querySelector(".main");

/// EVENTS ///

// mobile menu events //

// open the mobile menu
burgerMenu.addEventListener("click", () => {
  toggleHidden(mobileMenu, "mobile-menu--hidden");
});

//close the mobile menu
closeMenuIcon.addEventListener("click", () => {
  toggleHidden(mobileMenu, "mobile-menu--hidden");
});

// close the mobile menu by clicking outside
main.addEventListener("click", () => {
  mobileMenu.classList.add("mobile-menu--hidden");
});

// toogling the navigation bar blurred background
// when the page is scrolled
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

// Close the mobile menu after clicking a link or button of the navbar
mobileMenuLink.forEach((linkElement) => {
  linkElement.addEventListener("click", () => {
    mobileMenu.classList.add("mobile-menu--hidden");
  });
});

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.add("mobile-menu--hidden");
});
