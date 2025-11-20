// ===========================
// ELEMENTOS DEL DOM
// ===========================
const btnGuardar = document.querySelectorAll("button.bg-primary");
const inputs = document.querySelectorAll("input[type=text], input[type=number], select");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const btnAgregar = document.querySelector("button.bg-green-600");
const btnEliminar = document.querySelectorAll("button.text-red-400");

// ===========================
// FUNCIONES DE LOCALSTORAGE
// ===========================
function guardarConfiguracion() {
  const config = {};

  inputs.forEach(input => {
    config[input.name || input.placeholder || input.id] = input.value;
  });

  checkboxes.forEach(cb => {
    config[cb.id || cb.name || cb.previousElementSibling.innerText] = cb.checked;
  });

  localStorage.setItem("configuracion", JSON.stringify(config));
  mostrarToast("Configuración guardada correctamente ✅");
}

function cargarConfiguracion() {
  const config = JSON.parse(localStorage.getItem("configuracion") || "{}");

  inputs.forEach(input => {
    const key = input.name || input.placeholder || input.id;
    if (config[key] !== undefined) input.value = config[key];
  });

  checkboxes.forEach(cb => {
    const key = cb.id || cb.name || cb.previousElementSibling.innerText;
    if (config[key] !== undefined) cb.checked = config[key];
  });
}

// ===========================
// TOAST SIMPLES
// ===========================
function mostrarToast(msg) {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.className = "fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg opacity-0 transition-opacity duration-300 z-50";
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("opacity-100"), 10);
  setTimeout(() => {
    toast.classList.remove("opacity-100");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// ===========================
// EVENTOS
// ===========================
btnGuardar.forEach(btn => btn.addEventListener("click", guardarConfiguracion));

if (btnAgregar) {
  btnAgregar.addEventListener("click", () => {
    if (confirm("¿Deseas agregar un nuevo usuario?")) {
      mostrarToast("Usuario agregado (simulado)");
    }
  });
}

btnEliminar.forEach(btn => {
  btn.addEventListener("click", e => {
    if (confirm("¿Deseas eliminar este usuario?")) {
      const tr = e.target.closest("tr");
      tr.remove();
      mostrarToast("Usuario eliminado (simulado)");
    }
  });
});

// ===========================
// INICIALIZAR
// ===========================
cargarConfiguracion();
