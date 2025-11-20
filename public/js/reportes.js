// ===============================
// ELEMENTOS DEL DOM
// ===============================
const tabla = document.getElementById("tablaReportes");

const cardTotalAlertas = document.querySelector("#totalAlertas");
const cardOperadorMasAlertas = document.querySelector("#operadorMasAlertas");
const cardMaquinaActiva = document.querySelector("#maquinaActiva");
const cardPorcentajeCriticas = document.querySelector("#porcentajeCriticas");

const overlay = document.getElementById("modalOverlay");
const modalContent = document.getElementById("modalContent");
const modalFecha = document.getElementById("modalFecha");
const modalOperador = document.getElementById("modalOperador");
const modalMaquina = document.getElementById("modalMaquina");
const modalTipo = document.getElementById("modalTipo");
const closeModal = document.getElementById("closeModal");

// ===============================
// DATOS SIMULADOS
// ===============================
const operadores = ["Carlos M.", "José L.", "Ana R.", "María P.", "Luis G."];
const maquinas = ["Bulldozer #12", "Excavadora #5", "Grúa", "Cargador frontal", "Retroexcavadora"];
const tiposAlertas = ["critica", "leve", "inactividad", "somnolencia"];

let historial = [];

// Colores y nombres
const infoTipo = {
  critica: { nombre: "Crítica", color: "red" },
  leve: { nombre: "Leve", color: "orange" },
  inactividad: { nombre: "Inactividad", color: "yellow" },
  somnolencia: { nombre: "Somnolencia", color: "sky" }
};

// ===============================
// GRÁFICAS (Chart.js)
// ===============================
const ctxTipo = document.getElementById("chartTipoAlertas");
const ctxHoras = document.getElementById("chartHoras");

let dataTipos = { critica: 0, leve: 0, inactividad: 0, somnolencia: 0 };
let dataHoras = Array(24).fill(0);

const chartTipoAlertas = new Chart(ctxTipo, {
  type: "pie",
  data: {
    labels: ["Crítica", "Leve", "Inactividad", "Somnolencia"],
    datasets: [{
      data: Object.values(dataTipos),
      backgroundColor: ["#ef4444", "#fb923c", "#eab308", "#38bdf8"]
    }]
  },
  options: { responsive: true, plugins: { legend: { labels: { color: "#fff" } } } }
});

const chartHoras = new Chart(ctxHoras, {
  type: "bar",
  data: {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    datasets: [{ label: "Alertas", data: dataHoras, backgroundColor: "#38bdf8" }]
  },
  options: {
    responsive: true,
    scales: { x: { ticks: { color: "#fff" } }, y: { ticks: { color: "#fff" } } },
    plugins: { legend: { labels: { color: "#fff" } } }
  }
});

// ===============================
// FUNCIONES
// ===============================
function actualizarTarjetas() {
  const total = historial.length;
  cardTotalAlertas.textContent = total;

  const conteoOperadores = {};
  historial.forEach(r => {
    conteoOperadores[r.operador] = (conteoOperadores[r.operador] || 0) + 1;
  });
  const operadorTop = Object.entries(conteoOperadores).sort((a,b)=>b[1]-a[1])[0] || ["—",0];
  cardOperadorMasAlertas.textContent = operadorTop[0] === "—" ? "Sin datos" : `${operadorTop[0]} (${operadorTop[1]})`;

  const conteoMaquinas = {};
  historial.forEach(r => {
    conteoMaquinas[r.maquina] = (conteoMaquinas[r.maquina] || 0) + 1;
  });
  const maquinaTop = Object.entries(conteoMaquinas).sort((a,b)=>b[1]-a[1])[0] || ["—"];
  cardMaquinaActiva.textContent = maquinaTop[0];

  const pct = total > 0 ? ((dataTipos.critica / total) * 100).toFixed(1) : 0;
  cardPorcentajeCriticas.textContent = `${pct}%`;
}

function renderTabla() {
  tabla.innerHTML = "";
  historial.slice(-20).reverse().forEach((r, idx) => {
    const tr = document.createElement("tr");
    tr.className = "hover:bg-gray-800 transition-all cursor-pointer border-b border-gray-700";
    tr.innerHTML = `
      <td class="py-2 px-2">${r.fecha}</td>
      <td class="px-2">${r.operador}</td>
      <td class="px-2">${r.maquina}</td>
      <td class="px-2 font-semibold text-${r.color}-400">${r.tipoNombre}</td>
      <td class="px-2 text-blue-400 underline cursor-pointer">Ver detalles</td>
    `;

    // Evento para mostrar modal
    tr.querySelector("td:last-child").onclick = () => {
      modalFecha.textContent = r.fecha;
      modalOperador.textContent = r.operador;
      modalMaquina.textContent = r.maquina;
      modalTipo.textContent = r.tipoNombre;

      overlay.classList.remove("hidden");
      setTimeout(() => modalContent.classList.remove("scale-95","opacity-0"),10);
    };

    tabla.appendChild(tr);
  });
}

function simularAlerta() {
  const operador = operadores[Math.floor(Math.random()*operadores.length)];
  const maquina = maquinas[Math.floor(Math.random()*maquinas.length)];
  const tipo = tiposAlertas[Math.floor(Math.random()*tiposAlertas.length)];
  const fecha = new Date().toLocaleString();

  historial.push({ fecha, operador, maquina, tipo, tipoNombre: infoTipo[tipo].nombre, color: infoTipo[tipo].color });
  dataTipos[tipo]++;
  dataHoras[new Date().getHours()]++;

  renderTabla();
  actualizarTarjetas();

  chartTipoAlertas.data.datasets[0].data = Object.values(dataTipos);
  chartTipoAlertas.update();

  chartHoras.data.datasets[0].data = dataHoras;
  chartHoras.update();
}

// ===============================
// MODAL
// ===============================
closeModal.onclick = () => {
  modalContent.classList.add("scale-95","opacity-0");
  setTimeout(()=>overlay.classList.add("hidden"),150);
};

overlay.onclick = e => {
  if(e.target === overlay){
    modalContent.classList.add("scale-95","opacity-0");
    setTimeout(()=>overlay.classList.add("hidden"),150);
  }
};

// ===============================
// INICIO SIMULACIÓN
// ===============================
setInterval(simularAlerta, 4000);
simularAlerta();
