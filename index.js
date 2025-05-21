const theme_toggler = document.querySelector(".theme");

theme_toggler.addEventListener("click", () => {
  document.body.classList.toggle("dark_mode");
  // Saving the setting
  if (document.body.classList.contains("dark_mode")) {
    localStorage.setItem("website_theme", "dark_mode");
  } else {
    localStorage.setItem("website_theme", "default");
  }
});
