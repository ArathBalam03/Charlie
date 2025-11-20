document.addEventListener("DOMContentLoaded", () => {

  const overlay = document.getElementById("modalOverlay");
  const content = document.getElementById("modalContent");
  const alertContainer = document.getElementById("alertContainer");

  const cardOperadores = document.getElementById("tarjetaOperadores");
  const cardMaquinas = document.getElementById("tarjetaMaquinas");
  const cardAlertas = document.getElementById("tarjetaAlertas");

  const operadores = ["Carlos Ruiz", "Ana López", "Pedro García", "Lucía Martínez"];
  const estados = ["Distracción severa", "Atención baja", "Actividad normal"];
  const maquinas = ["Excavadora #12", "Camión #3", "Grúa #5", "Retroexcavadora #8"];
  const descripciones = [
    "Desviación de mirada detectada más de 4 segundos.",
    "Oscilaciones en patrón de atención, posible cansancio.",
    "Sin anomalías detectadas. Atención estable.",
    "Movimiento irregular detectado, revisar supervisión."
  ];

  const colorClass = {
    "Distracción severa": "bg-red-500/10 border-red-500/20 text-red-400",
    "Atención baja": "bg-yellow-500/10 border-yellow-500/20 text-yellow-400",
    "Actividad normal": "bg-blue-500/10 border-blue-500/20 text-blue-400"
  };

  const iconos = {
    "Distracción severa": "warning",
    "Atención baja": "priority_high",
    "Actividad normal": "check_circle"
  };

  const severidad = {
    "Distracción severa": 3,
    "Atención baja": 2,
    "Actividad normal": 1
  };

  const ctx = document.getElementById("chartAlertas");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [{
        label: "Severidad de Alertas",
        data: [],
        borderWidth: 2,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 3,
          ticks: { color: "#ccc", stepSize: 1 },
        },
        x: { ticks: { color: "#ccc" } }
      },
      plugins: { legend: { labels: { color: "#ddd" } } }
    }
  });

  function actualizarGrafica(alertaSev) {
    const hora = new Date().toLocaleTimeString([], { minute: "2-digit", second: "2-digit" });
    chart.data.labels.push(hora);
    chart.data.datasets[0].data.push(alertaSev);

    if (chart.data.labels.length > 10) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }

    chart.update();
  }

  function generarAlerta() {
    const nombre = operadores[Math.floor(Math.random() * operadores.length)];
    const estado = estados[Math.floor(Math.random() * estados.length)];
    const maquina = maquinas[Math.floor(Math.random() * maquinas.length)];
    const desc = descripciones[Math.floor(Math.random() * descripciones.length)];
    const hora = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const edad = Math.floor(Math.random() * 20) + 25;
    const exp = Math.floor(Math.random() * 10) + 1;

    const div = document.createElement("div");
    div.className = `flex items-center gap-2 p-3 rounded-lg cursor-pointer hover:opacity-80 transition border ${colorClass[estado]}`;
    div.dataset.name = nombre;
    div.dataset.status = estado;
    div.dataset.machine = maquina;
    div.dataset.time = hora;
    div.dataset.age = edad;
    div.dataset.exp = `${exp} años`;
    div.dataset.desc = desc;

    div.innerHTML = `
      <span class="material-symbols-outlined">${iconos[estado]}</span>
      <span><b>${estado}</b> detectada en ${nombre}</span>
    `;

    alertContainer.prepend(div);

    // ===========================
    // TARJETAS
    // ===========================
    cardAlertas.innerText = [...alertContainer.children].filter(a => estados.includes(a.dataset.status)).length;
    if (cardOperadores) cardOperadores.innerText = operadores.length;
    if (cardMaquinas) cardMaquinas.innerText = 3;

    // ===========================
    // MODAL
    // ===========================
    div.onclick = () => {
      document.getElementById("modalNombre").innerText = div.dataset.name;
      document.getElementById("modalEstado").innerText = div.dataset.status;
      document.getElementById("modalMaquina").innerText = div.dataset.machine;
      document.getElementById("modalFecha").innerText = div.dataset.time;
      document.getElementById("modalEdad").innerText = div.dataset.age;
      document.getElementById("modalExp").innerText = div.dataset.exp;
      document.getElementById("modalDescripcion").innerText = div.dataset.desc;

      overlay.classList.remove("hidden");
      setTimeout(() => content.classList.remove("scale-95", "opacity-0"), 10);
    };

    actualizarGrafica(severidad[estado]);
  }

  setInterval(generarAlerta, 3000);

  document.getElementById("closeModal").onclick = () => {
    content.classList.add("scale-95", "opacity-0");
    setTimeout(() => overlay.classList.add("hidden"), 150);
  };

  overlay.onclick = e => {
    if (e.target === overlay) {
      content.classList.add("scale-95", "opacity-0");
      setTimeout(() => overlay.classList.add("hidden"), 150);
    }
  };

});
