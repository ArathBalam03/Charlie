// controllers/dashboardController.js

export const mostrarDashboard = (req, res) => {
  res.render("dashboard", {
    title: "Fleet Monitor Dashboard",
    active: "dashboard"
  });
};

export const reportes = (req, res) => {
  res.render("reportes", {
    title: "Reportes - Gráficas",
    active: "reportes" 
  });
};

export const reports = (req, res) => {
  res.render("reports", {
    title: "Reports",
    active: "reports"
  });
};

export const operadores = (req, res) => {
  res.render("operadores", {
    title: "Operadores",
    active: "operadores"
  });
};

export const configuracion = (req, res) => {
  res.render("configuracion", {
    title: "Configuración",
    active: "configuracion"
  });
};

// NUEVAS SECCIONES

export const devices = (req, res) => {
  res.render("devices", {
  // res.render("layout/index", {
    title: "Dispositivos",
    active: "devices",
  });
};


export const incidents = (req, res) => {
  res.render("incidents", {
    title: "Incidentes",
    active: "incidents"
  });
};

export const journeys = (req, res) => {
  res.render("journeys", {
    title: "Viajes",
    active: "journeys"
  });
};

export const roles = (req, res) => {
  res.render("roles", {
    title: "Roles",
    active: "roles"
  });
};

export const vehicles = (req, res) => {
  res.render("vehicles", {
    title: "Vehículos",
    active: "vehicles"
  });
};