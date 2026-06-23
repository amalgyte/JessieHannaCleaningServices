const themeSelect = document.querySelector("#themeSelect");
const savedTheme = localStorage.getItem("sweeping-beauty-theme") || "rose";

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("sweeping-beauty-theme", theme);
}

themeSelect.value = savedTheme;
applyTheme(savedTheme);

themeSelect.addEventListener("change", (event) => {
  applyTheme(event.target.value);
});

const contactForm = document.querySelector(".contact-form");
const bookingForm = document.querySelector(".booking-form");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.currentTarget.querySelector("input");

  if (input.value.trim()) {
    event.currentTarget.reset();
  } else {
    input.focus();
  }
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector(".form-status");

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  form.reset();
  status.textContent = "Thanks. Your booking details are ready to send.";
});
