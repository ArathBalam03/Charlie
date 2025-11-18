import express from "express";
import { mostrarDashboard, reportes, operadores, login, configuracion } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/login", login);
router.get("/configuracion", configuracion);
router.get("/dashboard", mostrarDashboard);
router.get("/", (req, res) => res.redirect("/dashboard"));

router.get('/reportes', reportes);
router.get('/operadores', operadores);

export default router;
