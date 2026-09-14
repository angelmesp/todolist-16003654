const { randomUUID } = require("node:crypto");

const ESTADOS = ["PENDIENTE", "EN PROGRESO", "COMPLETADA"];
const tareas = [];

function estadosValidos() {
  return ESTADOS.slice();
}

function esEstado(valor) {
  return ESTADOS.includes(valor);
}

function listar() {
  return tareas.slice();
}

function buscar(id) {
  return tareas.find((t) => t.id === id) || null;
}

function crear({ titulo, descripcion, estado }) {
  const tarea = {
    id: randomUUID(),
    titulo: titulo.trim(),
    descripcion: String(descripcion || "").trim(),
    estado: estado || "PENDIENTE",
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
  listar,
  buscar,
  crear,
  actualizar,
  eliminar,
};
