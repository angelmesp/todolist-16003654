const path = require("node:path");
const express = require("express");
const rutas = require("./rutas");

const app = express();
app.disable("x-powered-by");

const PORT = Number.parseInt(process.env.PORT, 10) || 8080;
const APP_VERSION = process.env.APP_VERSION || "1.0";

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", version: APP_VERSION });
});

app.get("/api/info", (_req, res) => {
  res.status(200).json({
    nombre: "TodoList",
    version: APP_VERSION,
    carnet: process.env.CARNET || "16003654",
  });
});

app.use("/api/tareas", rutas);

app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Error interno del servidor" });
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`TodoList v${APP_VERSION} en puerto ${PORT}`);
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
