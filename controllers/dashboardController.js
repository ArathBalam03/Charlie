export const mostrarDashboard = (req, res) => {
  res.render("dashboard", {
    title: "Fleet Monitor Dashboard",
    active: "dashboard"
  });
};

export const reportes = (req, res) => {
  res.render("reportes", {
    title: "Reportes - Fleet Monitor",
    active: "reportes"
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
