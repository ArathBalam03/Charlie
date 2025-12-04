// controllers/authController.js

export const formularioLogin = (req, res) => {
  res.render("auth/login", {
    title: "Iniciar sesión",
    error: null,
    layout: false
  });
};

export const autenticarUsuario = (req, res) => {
  const { usuario, password } = req.body;

  const USER = "admin@gmail.com";
  const PASS = "1234";

  if (!usuario || !password) {
    return res.render("auth/login", {
      title: "Iniciar sesión",
      error: "Todos los campos son obligatorios",
      layout: false
    });
  }

  if (usuario !== USER || password !== PASS) {
    return res.render("auth/login", {
      title: "Iniciar sesión",
      error: "Credenciales incorrectas",
      layout: false
    });
  }

  return res.redirect("/devices");
};
