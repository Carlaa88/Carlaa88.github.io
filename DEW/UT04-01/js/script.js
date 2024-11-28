document.addEventListener("DOMContentLoaded", () => {
  // Selecciona todos los inputs y textareas que necesitan contador
  const inputs = document.querySelectorAll('input[type="text"], textarea');

  inputs.forEach(input => {
    const counter = document.querySelector(`#counter-${input.id}`);

    // Actualiza el contador en tiempo real
    input.addEventListener("input", () => {
      const maxLength = input.getAttribute("maxlength");
      const currentLength = input.value.length;

      counter.textContent = `${currentLength}/${maxLength}`;
    });
  });
});
