# TodoList — Actividad 6

Aplicación REST de tareas con interfaz web. Carné **16003654**.

- Repositorio: https://github.com/angelmesp/todolist-16003654
- Imágenes: `angelmesp/16003654:1.0` y `angelmesp/16003654:2.0`

## Funciones

v1.0: crear, listar, actualizar y eliminar. Campos: id, título, descripción, estado y fecha de creación. Estados: `PENDIENTE`, `EN PROGRESO`, `COMPLETADA`.

v2.0: prioridad (`BAJA`, `MEDIA`, `ALTA`), filtro por estado y estadísticas. La interfaz muestra **TodoList v2.0**.

## Variables de entorno

| Variable | Default | Uso |
|----------|---------|-----|
| `PORT` | `8080` | Puerto interno del contenedor |
| `APP_VERSION` | `1.0` / `2.0` | Versión mostrada |
| `CARNET` | `16003654` | Identificación del despliegue |
| `NODE_ENV` | `production` | Entorno |

No hay contraseñas ni claves en el código ni en Git.

## Ejecutar en local

```bash
npm install
npm start
```

http://localhost:8080

## Docker

```bash
docker build -t angelmesp/16003654:1.0 .
docker run -d --name todolist-16003654 -p 8080:8080 -e PORT=8080 -e APP_VERSION=1.0 angelmesp/16003654:1.0
```

Versión 2.0:

```bash
docker build -t angelmesp/16003654:2.0 .
docker stop todolist-16003654 && docker rm todolist-16003654
docker run -d --name todolist-16003654 -p 8080:8080 -e PORT=8080 -e APP_VERSION=2.0 angelmesp/16003654:2.0
```

## Endpoints

| Método | Ruta |
|--------|------|
| GET | `/` interfaz |
| GET | `/health` |
| GET | `/api/tareas` |
| GET | `/api/tareas?estado=PENDIENTE` |
| GET | `/api/tareas/stats` |
| POST | `/api/tareas` |
| PUT | `/api/tareas/:id` |
| DELETE | `/api/tareas/:id` |
