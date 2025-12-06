import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import axios from "axios";

// Rutas propias
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- VIEWS & LAYOUTS ---
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout/index");

// --- MIDDLEWARE ---
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- RUTAS ---
app.use("/auth", authRoutes);

// DASHBOARD: aquí consumimos la API de tu amigo
app.get("/", async (req, res) => {
  try {
    // URL base del backend de tu amigo
    const API_BASE = "http://localhost:8081";

    // Traer datos desde su API
    const [usersRes, reportsRes, devicesRes, incidentsRes] = await Promise.all([
      axios.get(`${API_BASE}/users`),
      axios.get(`${API_BASE}/reports`),
      axios.get(`${API_BASE}/devices`),
      axios.get(`${API_BASE}/incident/types`)
    ]);

    const users = usersRes.data;
    const reports = reportsRes.data;
    const devices = devicesRes.data;
    const incidentTypes = incidentsRes.data;

    // Renderizamos el dashboard con los datos de la API
    res.render("dashboard", { users, reports, devices, incidentTypes });
  } catch (error) {
    console.error("Error al consumir la API:", error.message);
    res.status(500).send("Error al cargar el dashboard");
  }
});

// Otras rutas de tu proyecto
app.use("/", dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Frontend corriendo en http://localhost:${PORT}`));
 