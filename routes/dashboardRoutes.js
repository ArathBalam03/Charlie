// routes/dashboardRoutes.js

import express from "express";
import {
  mostrarDashboard,
  reportes,
  operadores,
  configuracion,
  devices,
  incidents,
  journeys,
  roles,
  vehicles,
  reports
} from "../controllers/dashboardController.js";

const router = express.Router();

// Dashboard
router.get("/dashboard", mostrarDashboard);

// Reportes de gráficas
router.get("/reportes", reportes);

// Reports (documentos)
router.get("/reports", reports);

// Operadores
router.get("/operadores", operadores);

// Configuración
router.get("/configuracion", configuracion);

// Devices
router.get("/devices", devices);

// Incidents
router.get("/incidents", incidents);

// Journeys
router.get("/journeys", journeys);

// Roles
router.get("/roles", roles);

// Vehicles
router.get("/vehicles", vehicles);

export default router;