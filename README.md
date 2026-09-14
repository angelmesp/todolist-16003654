# TodoList — Actividad 6

Aplicación REST de tareas con interfaz web. Carné **16003654**.

- Repositorio: (se publica en GitHub)
- Imagen: `angelmesp/16003654:1.0` y `angelmesp/16003654:2.0`

## Funciones (v1.0)

- Crear tarea: id, título, descripción, estado y fecha de creación
- Listar, actualizar y eliminar
- Estados: `PENDIENTE`, `EN PROGRESO`, `COMPLETADA`

## Variables de entorno

| Variable | Default | Uso |
|----------|---------|-----|
| `PORT` | `8080` | Puerto interno |
| `APP_VERSION` | `1.0` | Versión mostrada |
| `CARNET` | `16003654` | Identificación del despliegue |
| `NODE_ENV` | `production` | Entorno |

No hay contraseñas en el código. La conexión SSH al servidor del curso no se guarda en este repositorio.

## Ejecutar en local

```bash
npm install
npm start
```

Abrir http://localhost:8080

## Docker

```bash
docker build -t angelmesp/16003654:1.0 .
docker run -d --name todolist-16003654 -p 8080:8080 -e PORT=8080 angelmesp/16003654:1.0
```

## Endpoints

| Método | Ruta |
|--------|------|
| GET | `/` interfaz |
| GET | `/health` |
| GET | `/api/tareas` |
| POST | `/api/tareas` |
| PUT | `/api/tareas/:id` |
| DELETE | `/api/tareas/:id` |
