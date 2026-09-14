const express = require("express");
const store = require("./store");

const router = express.Router();

function texto(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

router.get("/", (_req, res) => {
  res.status(200).json(store.listar());
});

router.get("/:id", (req, res) => {
  const tarea = store.buscar(req.params.id);
  if (!tarea) {
    res.status(404).json({ error: "Tarea no encontrada" });
    return;
  }
  res.status(200).json(tarea);
});

router.post("/", (req, res) => {
  const cuerpo = req.body || {};
  if (!texto(cuerpo.titulo)) {
    res.status(400).json({ error: "El titulo es obligatorio" });
    return;
  }
  if (cuerpo.estado !== undefined && !store.esEstado(cuerpo.estado)) {
    res.status(400).json({
      error: "Estado invalido. Use PENDIENTE, EN PROGRESO o COMPLETADA",
    });
    return;
  }
  const tarea = store.crear({
    titulo: cuerpo.titulo,
    descripcion: cuerpo.descripcion,
    estado: cuerpo.estado,
  });
  res.status(201).json(tarea);
});

router.put("/:id", (req, res) => {
  const cuerpo = req.body || {};
  if (cuerpo.titulo !== undefined && !texto(cuerpo.titulo)) {
    res.status(400).json({ error: "El titulo no puede quedar vacio" });
    return;
  }
  if (cuerpo.estado !== undefined && !store.esEstado(cuerpo.estado)) {
    res.status(400).json({
      error: "Estado invalido. Use PENDIENTE, EN PROGRESO o COMPLETADA",
    });
    return;
  }
  if (
    cuerpo.titulo === undefined &&
    cuerpo.descripcion === undefined &&
    cuerpo.estado === undefined
  ) {
    res.status(400).json({ error: "Debe enviar titulo, descripcion o estado" });
    return;
  }
  const actualizada = store.actualizar(req.params.id, cuerpo);
  if (!actualizada) {
    res.status(404).json({ error: "Tarea no encontrada" });
    return;
  }
  res.status(200).json(actualizada);
});

router.delete("/:id", (req, res) => {
  const ok = store.eliminar(req.params.id);
  if (!ok) {
    res.status(404).json({ error: "Tarea no encontrada" });
    return;
  }
  res.status(204).send();
});

module.exports = router;
