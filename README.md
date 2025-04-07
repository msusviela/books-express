## BookApp 📚

**Descripción:**  
API básica para realizar operaciones de CRUD sobre una colección de libros. Cuenta con una integración con la API de Google Books para poder consultar libros asociados a un autor.

**Tecnologías:**  
TypeScript, Express

**IMPORTANTE:**  
Setear las variables de entorno necesarias en un archivo `.env`

- Para compilar y ejecutar la aplicación utilizar el siguiente comando:  
  `npm run app`

> En el archivo `Books.postman_collection.json` se encuentra una colección de Postman que se puede importar para ejecutar las operaciones básicas.

---

## Documentación de Endpoints

### `GET /`

**Descripción:**  
Endpoint base para verificar que la API está corriendo.

**Respuesta:**
- `200 OK` con mensaje `"Hello World :)!"`

---

### `GET /books`

**Descripción:**  
Obtiene todos los libros almacenados en el repositorio local.

**Respuesta:**
- `200 OK` con la lista de libros.
- `200 OK` con mensaje `"No books available :("` si no hay libros.

---

### `GET /books/:id`

**Descripción:**  
Obtiene un libro por su ID.

**Parámetros:**
- `id` (number): ID del libro a buscar.

**Respuesta:**
- `200 OK` con el libro.
- `404 Not Found` si no existe un libro con ese ID.

---
### `POST /books`

**Descripción:**  
Crea un nuevo libro.

**Cuerpo de la solicitud (JSON):**

`
{
  "title": "string",
  "author": "string",
  "publishingYear": 2020,
  "pages": 300
}`

**Respuesta:**
- `201 Created` con el libro creado.
- `400 Bad Request` si faltan campos requeridos.

---

### `PUT /books/:id`

**Descripción:**  
Actualiza un libro existente por su ID. Solo se actualizan los campos enviados.

**Parámetros:**
- `id` (number): ID del libro a actualizar.

**Cuerpo de la solicitud (JSON):**

`
{
  "title": "Nuevo título (opcional)",
  "author": "Nuevo autor (opcional)",
  "publishingYear": 2021,
  "pages": 350
}
`

**Respuesta:**
- `200 OK` con el libro actualizado.
- `404 Not Found` si el libro no existe.

---

### `DELETE /books/:id`

**Descripción:**  
Elimina un libro por su ID.

**Parámetros:**
- `id` (number): ID del libro a eliminar.

**Respuesta:**
- `204 No Content` con mensaje de confirmación.
- `404 Not Found` si no existe un libro con ese ID.

---

### `GET /books/authors/:author`

**Descripción:**  
Busca libros del autor especificado usando la API de Google Books.

**Parámetros:**
- `author` (string): Nombre del autor.

**Respuesta:**
- `200 OK` con los resultados de la búsqueda.
- `401 Unauthorized` si no se cuenta con autorización
- `404 Not Found` si no se encontraron libros.
- `500 Internal Server Error` si ocurre un error durante la búsqueda.

---

### `GET /books/transform/:id`

**Descripción:**  
Transforma el título del libro a mayúsculas y sin espacios usando un pipeline de filtros personalizados.

**Parámetros:**
- `id` (number): ID del libro.

**Respuesta:**
- `200 OK` con el título transformado.
- `404 Not Found` si no existe el libro.

**Ejemplo de respuesta:**

`
{
  "result": "TITULOENMAYUSCULASSINESPACIOS"
}
`

---