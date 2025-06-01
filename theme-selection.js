const THEME_KEY = "website_theme";
const DARK_MODE = "dark_mode";
const DEFAULT_MODE = "default";
const CHECKBOX_KEY = "checkboxChecked";
const checkbox = document.querySelector("#checkbox");

function applyTheme(theme, isChecked) {
  document.body.classList.remove(DARK_MODE, DEFAULT_MODE);
  document.body.classList.add(theme);
  checkbox.checked = isChecked;
}

function retrieveTheme() {
  const theme = localStorage.getItem(THEME_KEY) || DEFAULT_MODE;
  const isChecked = localStorage.getItem(CHECKBOX_KEY) === "true";
  applyTheme(theme, isChecked);
}

checkbox.addEventListener("change", () => {
  const isChecked = checkbox.checked;
  const theme = isChecked ? DARK_MODE : DEFAULT_MODE;
  
  localStorage.setItem(THEME_KEY, theme);
  localStorage.setItem(CHECKBOX_KEY, String(isChecked));
  applyTheme(theme, isChecked);
});

window.addEventListener("storage", retrieveTheme);

retrieveTheme();
