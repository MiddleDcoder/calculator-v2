const themeToggler = document.querySelector(".theme-toggle");
const THEME_KEY = "website_theme";
const DARK_MODE = "dark_mode";
const DEFAULT_MODE = "default";
const checkbox = document.querySelector("#checkbox");

function setTheme(theme) {
  document.body.classList.remove(DARK_MODE, DEFAULT_MODE);
  document.body.classList.add(theme);
  localStorage.setItem(THEME_KEY, theme);
}

function retrieveTheme() {
  const theme = localStorage.getItem(THEME_KEY) || DEFAULT_MODE;
  setTheme(theme);
}

themeToggler.addEventListener("change", () => {
  const isDark = document.body.classList.toggle(DARK_MODE);
  setTheme(isDark ? DARK_MODE : DEFAULT_MODE);
  // Save state to localStorage when checkbox changes
  localStorage.setItem("checkboxChecked", checkbox.checked);
});

window.addEventListener("storage", retrieveTheme);

retrieveTheme();

// Load saved state from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const isChecked = localStorage.getItem("checkboxChecked") === "true";
  checkbox.checked = isChecked;
});
