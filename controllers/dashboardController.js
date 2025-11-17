// controllers/dashboardController.js

export const mostrarDashboard = (req, res) => {
  res.render("dashboard", {
    title: "Fleet Monitor Dashboard",
  });
};

export const reportes = (req, res) => {
  res.render("reportes", {
    title: "Reportes - Fleet Monitor",
  });
};

export const login = (req, res) => {
  res.render("login", {
    title: "Inicio de sesión",
  })
};

export const configuracion = (req, res) =>{
  res.render("settings", {
    title: "⚙️Configuración⚙️",
  })
};