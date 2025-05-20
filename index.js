const theme_toggler = document.querySelector(".light");

theme_toggler.addEventListener("click", () => {
  document.body.classList.toggle("dark_mode");
});
