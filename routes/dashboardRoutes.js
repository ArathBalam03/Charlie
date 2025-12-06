import express from "express";
import {
  devices,
  incidents,
  journeys,
  roles,
  vehicles,
  reports
} from "../controllers/dashboardController.js";

const router = express.Router();


// Devices
router.get("/devices", devices); 

// Incidents
router.get("/incidents", incidents);

// Journeys
router.get("/journeys", journeys);

// Reports
router.get("/reports", reports);

// Roles
router.get("/roles", roles);

// Vehicles
router.get("/vehicles", vehicles); 

export default router;
