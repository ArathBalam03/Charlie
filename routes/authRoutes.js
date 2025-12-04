// routes/authRoutes.js

import express from "express";
import { formularioLogin, autenticarUsuario } from "../controllers/authController.js";

const router = express.Router();

router.get("/login", formularioLogin);
router.post("/login", autenticarUsuario);

export default router;
