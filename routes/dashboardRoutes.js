// routes/dashboardRoutes.js
import express from "express";
import { mostrarDashboard, reportes, login } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/login", login);
router.get("/dashboard", mostrarDashboard);
router.get("/", (req, res) => res.redirect("/dashboard"));

router.get('/reportes', reportes);

export default router;
  