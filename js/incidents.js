// Ruta del backend de tu amigo
const API_URL = 'http://localhost:8081/incident/types';

async function cargarIncidentes() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const tabla = document.getElementById('tabla-incidentes');
    tabla.innerHTML = '';

    data.forEach(incidente => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td class="px-6 py-4">${incidente.name || 'Sin nombre'}</td>
        <td class="px-6 py-4">${incidente.description}</td>
        <td class="px-6 py-4 text-right">
          <button class="text-blue-500">Editar</button>
          <button class="text-red-500">Eliminar</button>
        </td>
      `;
      tabla.appendChild(fila);
    });

  } catch (error) {
    console.error('Error al cargar incidentes:', error);
  }
}

cargarIncidentes();
