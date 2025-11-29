// controllers/authController.js

import { loginUser } from "../services/user.js";

export const formularioLogin = (req, res) => {
  res.render("auth/login", {
    title: "Iniciar sesión",
    error: null,
    active: ""
  });
};

export const autenticarUsuario = async (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request for user:',  username, password);
  try {
    
    // Validación básica
    if (!username  || !password) {
      return res.render("auth/login", {
        title: "Iniciar sesión",
        error: "Todos los campos son obligatorios",
        active: ""
      });
    }

    const result = await loginUser({username, password});

    // Validación de credenciales: `loginUser` devuelve `false` si falla
    if (!result) {
      return res.render("auth/login", {
        title: "Iniciar sesión",
        error: "Credenciales incorrectas o error de conexión",
        active: ""
      });
    }

    // Si todo está bien, redirigir al dashboard
    return res.redirect("/dashboard");
 
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.render("auth/login", {
      title: "Iniciar sesión",
      error: "Error del servidor. Inténtalo de nuevo más tarde.",
      active: ""
    });
  }
};
