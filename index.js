import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import expressLayouts from "express-ejs-layouts";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --- Configuración de express-ejs-layouts ---
app.use(expressLayouts);
app.set('layout', 'layout/index');

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/", dashboardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));


// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import dashboardRoutes from "./routes/dashboardRoutes.js";
// import authRoutes from "./routes/authRoutes.js";

// const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Configuración de vistas
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

// // Middleware
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Rutas
// app.use("/auth", authRoutes);
// app.use("/", dashboardRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
