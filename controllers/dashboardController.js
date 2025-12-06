import axios from "axios";

// =====================
// REPORTS
// =====================
export const reports = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8081/reports");
    const reports = response.data;

    res.render("reports", {
      title: "Reports",
      active: "reports",
      reports
    });
  } catch (error) {
    console.error("Error al obtener reports:", error.message);
    res.render("reports", {
      title: "Reports",
      active: "reports",
      reports: [],
      error: "No se pudieron cargar los reportes"
    });
  }
};

// =====================
// DEVICES
// =====================
export const devices = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8081/devices");
    const devicesData = Array.isArray(response.data) ? response.data : [];

    res.render("devices", {
      title: "Dispositivos",
      active: "devices",
      devices: devicesData
    });
  } catch (error) {
    console.error("Error al obtener dispositivos:", error.message);
    res.render("devices", {
      title: "Dispositivos",
      active: "devices",
      devices: [],
      error: "No se pudieron cargar los dispositivos"
    });
  }
};

// =====================
// INCIDENTS (estático por ahora)
// =====================
export const incidents = (req, res) => {
  const incidentTypes = [
    { id: 1, name: "Colisión menor", description: "Colisión leve" },
    { id: 2, name: "Colisión mayor", description: "Colisión grave" },
  ];

  res.render("incidents", {
    title: "Tipos de Incidentes",
    active: "incidents",
    incidentTypes
  });
};

// =====================
// JOURNEYS
// =====================
export const journeys = async (req, res) => {
  try {
    const devicesResponse = await axios.get("http://localhost:8081/devices");
    const devicesData = devicesResponse.data;

    const journeysResponse = await axios.get("http://localhost:8081/journeys");
    const journeysData = journeysResponse.data;

    res.render("journeys", {
      title: "Viajes",
      active: "journeys",
      devices: devicesData,
      journeys: journeysData
    });
  } catch (error) {
    console.error("Error al cargar datos:", error.message);
    res.render("journeys", {
      title: "Viajes",
      active: "journeys",
      devices: [],
      journeys: [],
      error: "No se pudieron cargar los datos"
    });
  }
};

// =====================
// ROLES
// =====================
export const roles = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8081/roles");
    const rolesData = response.data;

    res.render("roles", {
      title: "Gestión de Roles",
      active: "roles",
      roles: rolesData
    });
  } catch (error) {
    console.error("Error al obtener roles:", error.message);
    res.render("roles", {
      title: "Gestión de Roles",
      active: "roles",
      roles: [],
      error: "No se pudieron cargar los roles"
    });
  }
};

// =====================
// VEHICLES
// =====================
export const vehicles = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8081/vehicles");
    const vehicles = response.data;

    res.render("vehicles", {
      title: "Vehículos",
      active: "vehicles",
      vehicles
    });
  } catch (error) {
    console.error("Error al obtener vehículos:", error.message);
    res.render("vehicles", {
      title: "Vehículos",
      active: "vehicles",
      vehicles: [],
      error: "No se pudieron cargar los vehículos"
    });
  }
};