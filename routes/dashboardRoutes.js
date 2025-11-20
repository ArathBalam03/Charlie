import express from "express";
import { mostrarDashboard, reportes, operadores, configuracion } from "../controllers/dashboardController.js";

const router = express.Router();


router.get("/configuracion", configuracion);
router.get("/dashboard", mostrarDashboard);
// router.get("/", (req, res) => res.redirect("/dashboard"));

router.get('/reportes', reportes);
router.get('/operadores', operadores);

export default router;  
