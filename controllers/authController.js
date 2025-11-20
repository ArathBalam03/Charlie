// controllers/authController.js

export const formularioLogin = (req, res) => {
  res.render("auth/login", {
    title: "Iniciar sesión",
    error: null,
    active: ""
  });
};

export const autenticarUsuario = (req, res) => {
  const { usuario, password } = req.body;

  // Usuario temporal
  const USER = "admin@gmail.com";
  const PASS = "1234";

  // Validación básica
  if (!usuario || !password) {
    return res.render("auth/login", {
      title: "Iniciar sesión",
      error: "Todos los campos son obligatorios",
      active: ""
    });
  }

  // Validación de credenciales
  if (usuario !== USER || password !== PASS) {
    return res.render("auth/login", {
      title: "Iniciar sesión",
      error: "Credenciales incorrectas",
      active: ""
    });
  }

  // Si coincide → dashboard
  return res.redirect("/dashboard");
};
