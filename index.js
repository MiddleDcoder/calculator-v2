const theme_toggler = document.querySelector(".theme");
let bodyClassList = document.body.classList;

theme_toggler.addEventListener("click", () => {
  bodyClassList.toggle("dark_mode");
  // Saving the setting
  if (bodyClassList.contains("dark_mode")) {
    localStorage.setItem("website_theme", "dark_mode");
  } else {
    localStorage.setItem("website_theme", "default");
  }
});

// Retrieving the class
function retrieve_theme() {
  const theme = localStorage.getItem("website_theme");
  if (theme != null) {
    bodyClassList.remove("default", "dark_mode");
    bodyClassList.add(theme);
  }
}
retrieve_theme(); // retrieve when reload

// Synchronize for all tabs
window.addEventListener("storage", () => {
  retrieve_theme();
});
