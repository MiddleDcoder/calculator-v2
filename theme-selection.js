const THEME_KEY = "website_theme";
const DARK_MODE = "dark_mode";
const DEFAULT_MODE = "default";
const CHECKBOX_KEY = "checkboxChecked";
const checkbox = document.querySelector("#checkbox");

/**
 * Applies the specified theme to the document body and updates the checkbox state.
 *
 * Removes existing theme classes, adds the new theme class, and sets the checkbox to reflect the current theme selection.
 *
 * @param {string} theme - The theme class to apply (e.g., DARK_MODE or DEFAULT_MODE).
 * @param {boolean} isChecked - Whether the checkbox should be checked.
 */
function applyTheme(theme, isChecked) {
  document.body.classList.remove(DARK_MODE, DEFAULT_MODE);
  document.body.classList.add(theme);
  checkbox.checked = isChecked;
}

/**
 * Retrieves the user's theme and checkbox state from localStorage,
 * then applies the theme using applyTheme.
 */
function retrieveTheme() {
  const theme = localStorage.getItem(THEME_KEY) ?? DEFAULT_MODE;
  const isChecked = localStorage.getItem(CHECKBOX_KEY) === "true";
  applyTheme(theme, isChecked);
}

// Set the initial theme based on localStorage or default to DEFAULT_MODE
checkbox.addEventListener("change", () => {
  const isChecked = checkbox.checked;
  const theme = isChecked ? DARK_MODE : DEFAULT_MODE;

  localStorage.setItem(THEME_KEY, theme);
  localStorage.setItem(CHECKBOX_KEY, String(isChecked));
  applyTheme(theme, isChecked);
});

// Listen for storage changes to update the theme if it changes in another tab
window.addEventListener("storage", retrieveTheme);

retrieveTheme();
