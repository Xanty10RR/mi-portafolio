document.addEventListener("DOMContentLoaded", () => {
  const barra = document.getElementById("barra");

  window.addEventListener("scroll", () => {
    if (barra) {
      const altura = document.documentElement.scrollHeight - window.innerHeight;

      const progreso = (window.scrollY / altura) * 100;
      barra.style.width = progreso + "%";
    }
  });
});
