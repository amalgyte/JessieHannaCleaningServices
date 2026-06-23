const themeSelect = document.querySelector("#themeSelect");
const savedTheme = localStorage.getItem("jessie-hanna-theme") || "mint";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("jessie-hanna-theme", theme);
}

themeSelect.value = savedTheme;
applyTheme(savedTheme);

themeSelect.addEventListener("change", (event) => {
  applyTheme(event.target.value);
});

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");

  if (!input.value.trim()) {
    input.focus();
    return;
  }

  event.currentTarget.reset();
});
