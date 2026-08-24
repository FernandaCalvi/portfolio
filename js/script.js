const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");
const themeButton = document.querySelector("#theme-button");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const currentYear = document.querySelector("#current-year");

/* Menu responsivo */
function closeMenu() {
  navigation.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.textContent = "Menu";
}

menuButton.addEventListener("click", () => {
  const menuIsOpen = navigation.classList.toggle("open");

  document.body.classList.toggle("menu-open", menuIsOpen);
  menuButton.setAttribute("aria-expanded", menuIsOpen);
  menuButton.textContent = menuIsOpen ? "Fechar" : "Menu";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("click", (event) => {
  const clickedOutside =
    !navigation.contains(event.target) &&
    !menuButton.contains(event.target);

  if (clickedOutside) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

/* Tema claro e escuro */
function updateThemeButton() {
  const darkThemeIsActive =
    document.body.classList.contains("dark-theme");

  const sunIcon = `
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"></path>
    </svg>
  `;

  const moonIcon = `
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"></path>
    </svg>
  `;

  themeButton.innerHTML = darkThemeIsActive ? sunIcon : moonIcon;

  const label = darkThemeIsActive
    ? "Ativar tema claro"
    : "Ativar tema escuro";

  themeButton.setAttribute("aria-label", label);
  themeButton.setAttribute("title", label);
}

/* Recupera o tema salvo no navegador */
const savedTheme = localStorage.getItem("portfolio-theme");
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
  document.body.classList.add("dark-theme");
}

updateThemeButton();

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  const selectedTheme =
    document.body.classList.contains("dark-theme")
      ? "dark"
      : "light";

  localStorage.setItem("portfolio-theme", selectedTheme);
  updateThemeButton();
});

/* Validação e simulação de envio do formulário */
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const formFields = [nameInput, emailInput, messageInput];

function showFormMessage(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
}

function markInvalid(field) {
  field.classList.add("error");
}

formFields.forEach((field) => {
  field.addEventListener("input", () => {
    field.classList.remove("error");
    formStatus.textContent = "";
    formStatus.className = "form-status";
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formFields.forEach((field) => {
    field.classList.remove("error");
  });

  if (!name || !email || !message) {
    if (!name) markInvalid(nameInput);
    if (!email) markInvalid(emailInput);
    if (!message) markInvalid(messageInput);

    showFormMessage("Preencha todos os campos.", "error");
    return;
  }

  if (!validEmail.test(email)) {
    markInvalid(emailInput);
    showFormMessage("Digite um endereço de e-mail válido.", "error");
    return;
  }

  showFormMessage("Mensagem enviada com sucesso!", "success");
  form.reset();
});

/* Ano atualizado automaticamente */
currentYear.textContent = new Date().getFullYear();
