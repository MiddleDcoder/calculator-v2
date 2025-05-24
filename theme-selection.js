const themeToggler = document.querySelector(".theme-toggle");
const THEME_KEY = "website_theme";
const DARK_MODE = "dark_mode";
const DEFAULT_MODE = "default";
const checkbox = document.querySelector("#checkbox");
const CHECKBOX_KEY = "checkboxChecked";

function setTheme(theme, isChecked) {
  document.body.classList.remove(DARK_MODE, DEFAULT_MODE);
  document.body.classList.add(theme);
  checkbox.checked = isChecked;
  localStorage.setItem(THEME_KEY, theme);
  localStorage.setItem(CHECKBOX_KEY, String(isChecked));
}

function retrieveTheme() {
  const theme = localStorage.getItem(THEME_KEY) || DEFAULT_MODE;
  const isChecked = localStorage.getItem(CHECKBOX_KEY) === "true";
  setTheme(theme, isChecked);
}

themeToggler.addEventListener("change", () => {
  const isDark = document.body.classList.toggle(DARK_MODE);
  const isChecked = checkbox.checked;
  setTheme(isDark ? DARK_MODE : DEFAULT_MODE, isChecked);
});

window.addEventListener("storage", retrieveTheme);

retrieveTheme();
