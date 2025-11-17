# Fuentes de datos y endpoints (actualizado)

Nota: el backend es un servicio Java (Spring) y devuelve colecciones con el formato HAL (Spring HATEOAS). El frontend se integrará con las rutas en español y mapeará los campos del backend.

Base URL (usar en env):

VITE_API_BASE_URL=http://localhost:8080

Endpoints principales (usar exactamente estos paths desde el frontend):

- Productos
  - GET /productos       -> lista (HAL: _embedded.productoModelList)
  - GET /productos/{id}  -> detalle (objeto)
  - POST /productos      -> crear
  - PUT /productos/{id}  -> actualizar
  - DELETE /productos/{id} -> eliminar

- Usuarios
  - GET /usuarios        -> lista (HAL: _embedded.usuarioModelList)
  - GET /usuarios/{id}
  - POST /usuarios
  - PUT /usuarios/{id}
  - DELETE /usuarios/{id}

Formato y notas importantes:

- Las entidades usan nombres en español: `nombre`, `precio`, `stock`, `correo`, `contrasena`, `rol`.
- `precio` es un entero en CLP (pesos chilenos). No hay centavos; formatear en UI con Intl.NumberFormat('es-CL', { currency: 'CLP' }).
- Las respuestas de lista vienen envueltas en `_embedded` (ej. `_embedded.productoModelList`). El servicio frontend debe extraer ese array y devolver `[]` si no existe.
- Evitar exponer o mostrar `contrasena` en la UI. El frontend filtrará ese campo al mapear usuarios.
- Los objetos pueden traer `_links` (HAL); el frontend puede ignorarlos o usarlos para debug.

Recomendaciones para el frontend (qué ya implementa `src/services/api.js`):

- Usar `import.meta.env.VITE_API_BASE_URL` para configurar la `baseURL` de axios.
- Implementar funciones que extraigan el array de `_embedded` con seguridad y retornen `[]` si no existe.
- Mapear los campos del backend tal cual (`nombre`, `precio`, `stock`) para no tocar el backend.
- Añadir utilitario `formatPriceCLP(value)` que formatea enteros CLP a string legible en la UI.

Ejemplo breve de payloads esperados (crear producto):

POST /productos
{
  "nombre": "Nuevo Producto",
  "precio": 12000,
  "stock": 10
}

POST /usuarios
{
  "nombre": "Nombre",
  "correo": "correo@example.com",
  "contrasena": "plaintextPassword", // backend aplicará hashing
  "rol": "USER"
}

Cors (backend):

El backend permite orígenes locales en desarrollo; asegúrate de apuntar `VITE_API_BASE_URL` a la raíz (por ejemplo `http://localhost:8080`) y no al path del Swagger UI (`/doc/swagger-ui/...`).

Siguientes pasos recomendados antes de integrar en componentes:

1. Confirmar `VITE_API_BASE_URL` en tu `.env` y reiniciar el dev server si lo cambias.
2. Revisar componentes que usan arrays locales y decidir si se renombrarán campos o se usarán mappers en el servicio API (recomendado: usar mappers y mantener nombres del backend).
3. Implementar llamadas GET primero en la lista de productos y probar que la UI muestra los datos correctamente (manejar loading y empty states).
4. Luego implementar POST/PUT/DELETE en el backoffice.

Si quieres, puedo ahora:
- Actualizar `src/services/api.js` (ya lo hice) y
- Buscar en el frontend las variables/arrays locales y proponerte los cambios concretos en cada componente para consumir el servicio.

