const { randomUUID } = require("node:crypto");

const ESTADOS = ["PENDIENTE", "EN PROGRESO", "COMPLETADA"];
const PRIORIDADES = ["BAJA", "MEDIA", "ALTA"];
const tareas = [];

function estadosValidos() {
  return ESTADOS.slice();
}

function esEstado(valor) {
  return ESTADOS.includes(valor);
}

function esPrioridad(valor) {
  return PRIORIDADES.includes(valor);
}

function listar(filtroEstado) {
  if (filtroEstado && esEstado(filtroEstado)) {
    return tareas.filter((t) => t.estado === filtroEstado);
  }
  return tareas.slice();
}

function estadisticas() {
  const conteo = { PENDIENTE: 0, "EN PROGRESO": 0, COMPLETADA: 0 };
  for (const t of tareas) {
    conteo[t.estado] += 1;
  }
  return { total: tareas.length, porEstado: conteo };
}

function buscar(id) {
  return tareas.find((t) => t.id === id) || null;
}

function crear({ titulo, descripcion, estado, prioridad }) {
  const tarea = {
    id: randomUUID(),
    titulo: titulo.trim(),
    descripcion: String(descripcion || "").trim(),
    estado: estado || "PENDIENTE",
    prioridad: prioridad || "MEDIA",
    fechaCreacion: new Date().toISOString(),
  };
  tareas.push(tarea);
  return tarea;
}

function actualizar(id, cambios) {
  const tarea = buscar(id);
  if (!tarea) {
    return null;
  }
  if (typeof cambios.titulo === "string") {
    tarea.titulo = cambios.titulo.trim();
  }
  if (typeof cambios.descripcion === "string") {
    tarea.descripcion = cambios.descripcion.trim();
  }
  if (typeof cambios.estado === "string") {
    tarea.estado = cambios.estado;
  }
  if (typeof cambios.prioridad === "string") {
    tarea.prioridad = cambios.prioridad;
  }
  return tarea;
}

function eliminar(id) {
  const indice = tareas.findIndex((t) => t.id === id);
  if (indice === -1) {
    return false;
  }
  tareas.splice(indice, 1);
  return true;
}

module.exports = {
  estadosValidos,
  esEstado,
  esPrioridad,
  listar,
  estadisticas,
  buscar,
  crear,
  actualizar,
  eliminar,
};
