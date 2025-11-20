// ===========================
// DATOS SIMULADOS
// ===========================
const operadores = [
  { nombre: "Carlos M.", rol: "Operador", estado: "Activo", ultimaConexion: "2025-11-17 09:30", email: "carlos.m@example.com", telefono: "555-1234" },
  { nombre: "José L.", rol: "Operador", estado: "Inactivo", ultimaConexion: "2025-11-17 08:50", email: "jose.l@example.com", telefono: "555-5678" },
  { nombre: "Ana R.", rol: "Supervisor", estado: "Activo", ultimaConexion: "2025-11-17 10:00", email: "ana.r@example.com", telefono: "555-9876" },
  { nombre: "María P.", rol: "Operador", estado: "Activo", ultimaConexion: "2025-11-17 09:15", email: "maria.p@example.com", telefono: "555-4321" },
  { nombre: "Luis G.", rol: "Supervisor", estado: "Inactivo", ultimaConexion: "2025-11-17 07:45", email: "luis.g@example.com", telefono: "555-2468" },
];

// ===========================
// ELEMENTOS DEL DOM
// ===========================
const tabla = document.getElementById("tablaOperadores");

// Modal
const overlay = document.createElement("div");
overlay.id = "modalOverlay";
overlay.className = "hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50";
document.body.appendChild(overlay);

const modal = document.createElement("div");
modal.className = "bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl relative transform scale-95 opacity-0 transition-all duration-200";
overlay.appendChild(modal);

modal.innerHTML = `
  <button id="closeModal" class="absolute top-3 right-3 text-white/60 hover:text-white text-2xl">×</button>
  <h3 class="text-xl font-bold text-white mb-4">Información del operador</h3>
  <div class="space-y-2 text-gray-300">
    <p><b>Nombre:</b> <span id="modalNombre"></span></p>
    <p><b>Rol:</b> <span id="modalRol"></span></p>
    <p><b>Estado:</b> <span id="modalEstado"></span></p>
    <p><b>Última conexión:</b> <span id="modalConexion"></span></p>
    <p><b>Email:</b> <span id="modalEmail"></span></p>
    <p><b>Teléfono:</b> <span id="modalTelefono"></span></p>
  </div>
`;

// ===========================
// FUNCIONES
// ===========================
function renderOperadores(filtros = {}) {
  tabla.innerHTML = "";

  let dataFiltrada = operadores;

  // Aplicar filtros
  if (filtros.nombre) {
    dataFiltrada = dataFiltrada.filter(op => op.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()));
  }
  if (filtros.rol && filtros.rol !== "all") {
    dataFiltrada = dataFiltrada.filter(op => op.rol.toLowerCase() === filtros.rol);
  }
  if (filtros.estado && filtros.estado !== "all") {
    dataFiltrada = dataFiltrada.filter(op => op.estado.toLowerCase() === filtros.estado);
  }

  dataFiltrada.forEach(op => {
    const tr = document.createElement("tr");
    tr.className = "hover:bg-gray-800 transition-all cursor-pointer";

    const estadoColor = op.estado === "Activo" ? "green-400" : "red-400";

    tr.innerHTML = `
      <td class="py-2">${op.nombre}</td>
      <td>${op.rol}</td>
      <td class="text-${estadoColor}">${op.estado}</td>
      <td>${op.ultimaConexion}</td>
      <td class="underline text-blue-400 cursor-pointer">Ver detalles</td>
    `;

    // Click en "Ver detalles"
    tr.querySelector("td:last-child").onclick = () => {
      document.getElementById("modalNombre").innerText = op.nombre;
      document.getElementById("modalRol").innerText = op.rol;
      document.getElementById("modalEstado").innerText = op.estado;
      document.getElementById("modalConexion").innerText = op.ultimaConexion;
      document.getElementById("modalEmail").innerText = op.email;
      document.getElementById("modalTelefono").innerText = op.telefono;

      overlay.classList.remove("hidden");
      setTimeout(() => modal.classList.remove("scale-95", "opacity-0"), 10);
    };

    tabla.appendChild(tr);
  });
}

// ===========================
// FILTROS
// ===========================
const formFiltros = document.querySelector("form");
formFiltros.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = formFiltros.querySelector("input[type=text]").value;
  const rol = formFiltros.querySelector("select:nth-of-type(1)").value;
  const estado = formFiltros.querySelector("select:nth-of-type(2)").value;

  renderOperadores({ nombre, rol, estado });
});

// ===========================
// MODAL
// ===========================
document.getElementById("closeModal").onclick = () => {
  modal.classList.add("scale-95", "opacity-0");
  setTimeout(() => overlay.classList.add("hidden"), 150);
};

overlay.onclick = e => {
  if (e.target === overlay) {
    modal.classList.add("scale-95", "opacity-0");
    setTimeout(() => overlay.classList.add("hidden"), 150);
  }
};

// ===========================
// INICIALIZAR
// ===========================
renderOperadores();
