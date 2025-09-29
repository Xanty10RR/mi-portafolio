  const form = document.getElementById("contact-form");
  const btnText = document.getElementById("btn-text");
  const spinner = document.getElementById("spinner");
  const toastContainer = document.getElementById("toast-container");

  // 👇 obtenemos las claves desde los atributos del form
  const EMAILJS_SERVICE_ID = form.dataset.serviceId;
  const EMAILJS_TEMPLATE_ID = form.dataset.templateId;
  const EMAILJS_PUBLIC_KEY = form.dataset.publicKey;

  emailjs.init(EMAILJS_PUBLIC_KEY);

  const toastClasses = {
    base: "flex items-center gap-2 px-4 py-2 rounded shadow-lg text-white animate-fadeInDown",
    success: "bg-green-500",
    error: "bg-red-500",
  };

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      btnText.textContent = "Enviando...";
      spinner.classList.remove("hidden");

      try {
        await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);

        showToast("Mensaje enviado con éxito 🎉", toastClasses.success);
        form.reset();
      } catch (error) {
        console.error("EmailJS error:", error);
        showToast("Hubo un error al enviar el mensaje.", toastClasses.error);
      } finally {
        btnText.textContent = "Enviar";
        spinner.classList.add("hidden");
      }
    });
  }

  function showToast(msg, type) {
    const toast = document.createElement("div");
    toast.className = `${toastClasses.base} ${type}`;
    toast.textContent = msg;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("animate-fadeInDown");
      toast.classList.add("animate-fadeOutUp");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }