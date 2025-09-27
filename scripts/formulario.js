export function initContactForm(SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY) {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const btnText = document.getElementById("btn-text");
  const spinner = document.getElementById("spinner");
  const toastContainer = document.getElementById("toast-container");

  if (!form) return;

  // 🔑 Inicializar EmailJS
  emailjs.init(PUBLIC_KEY);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    btnText.textContent = "Enviando...";
    spinner.classList.remove("hidden");
    submitBtn.disabled = true;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this)
      .then(() => {
        btnText.textContent = "Enviado ✅";
        spinner.classList.add("hidden");
        this.reset();

        showToast("Mensaje enviado con éxito", "success");

        setTimeout(() => {
          btnText.textContent = "Enviar";
          submitBtn.disabled = false;
        }, 3000);
      })
      .catch((err) => {
        console.error("❌ Error:", err);
        btnText.textContent = "Error ❌";
        spinner.classList.add("hidden");

        showToast("Error al enviar el mensaje", "error");

        setTimeout(() => {
          btnText.textContent = "Enviar";
          submitBtn.disabled = false;
        }, 3000);
      });
  });

  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `flex items-center gap-2 px-4 py-2 rounded shadow-lg text-white animate-fadeInDown 
      ${type === "success" ? "bg-green-500" : "bg-red-500"}`;

    // 👇 Icono SVG según el tipo
    const icon = document.createElement("span");
    icon.innerHTML =
      type === "success"
        ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
           </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
           </svg>`;

    const text = document.createElement("span");
    text.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(text);

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("animate-fadeOutUp");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }
}