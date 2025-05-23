const themeToggler = document.querySelector(".theme");
const THEME_KEY = "website_theme";
const DARK_MODE = "dark_mode";
const DEFAULT_MODE = "default";

function setTheme(theme) {
  document.body.classList.remove(DARK_MODE, DEFAULT_MODE);
  document.body.classList.add(theme);
  localStorage.setItem(THEME_KEY, theme);
}

function retrieveTheme() {
  const theme = localStorage.getItem(THEME_KEY) || DEFAULT_MODE;
  setTheme(theme);
}

themeToggler.addEventListener("click", () => {
  const isDark = document.body.classList.toggle(DARK_MODE);

  setTheme(isDark ? DARK_MODE : DEFAULT_MODE);
});

window.addEventListener("storage", retrieveTheme);

retrieveTheme();
