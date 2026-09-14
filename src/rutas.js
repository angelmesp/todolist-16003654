const express = require("express");
const store = require("./store");

const router = express.Router();

function texto(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

router.get("/", (req, res) => {
  res.status(200).json(store.listar(req.query.estado));
});

router.get("/stats", (_req, res) => {
  res.status(200).json(store.estadisticas());
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
  if (cuerpo.prioridad !== undefined && !store.esPrioridad(cuerpo.prioridad)) {
    res.status(400).json({ error: "Prioridad invalida. Use BAJA, MEDIA o ALTA" });
    return;
  }
  const tarea = store.crear({
    titulo: cuerpo.titulo,
    descripcion: cuerpo.descripcion,
    estado: cuerpo.estado,
    prioridad: cuerpo.prioridad,
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
  if (cuerpo.prioridad !== undefined && !store.esPrioridad(cuerpo.prioridad)) {
    res.status(400).json({ error: "Prioridad invalida. Use BAJA, MEDIA o ALTA" });
    return;
  }
  if (
    cuerpo.titulo === undefined &&
    cuerpo.descripcion === undefined &&
    cuerpo.estado === undefined &&
    cuerpo.prioridad === undefined
  ) {
    res.status(400).json({ error: "Debe enviar al menos un campo para actualizar" });
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
