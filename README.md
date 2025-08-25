
# Link Shield

Link Shield es una API desarrollada con [NestJS](https://nestjs.com/) y TypeScript para la gestión y seguimiento de enlaces. Permite crear, consultar y registrar clics en enlaces, almacenando información relevante como la IP y la fecha del clic.

## Características principales

- **Gestión de enlaces**: Crear, listar y eliminar enlaces.
- **Registro de clics**: Almacena cada clic realizado sobre un enlace, incluyendo IP y timestamp.
- **Modularidad**: Arquitectura basada en módulos (`app`, `links`).
- **Persistencia**: Uso de TypeORM y SQLite para almacenamiento.

## Estructura de carpetas

```
src/
  app.controller.ts        // Controlador principal
  app.service.ts           // Lógica principal
  app.module.ts            // Módulo raíz
  main.ts                  // Bootstrap de la app
  links/
    links.controller.ts    // Endpoints para enlaces y clics
    links.service.ts       // Lógica de negocio de enlaces y clics
    entities/
      link.entity.ts       // Entidad Link
      click.entity.ts      // Entidad Click
```

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/jaimeirazabal1/link-shield
   cd link-shield
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Librerías principales

- **@nestjs/core**: Framework principal.
- **@nestjs/typeorm**: Integración con TypeORM.
- **typeorm**: ORM para TypeScript/Node.js.
- **sqlite3**: Motor de base de datos local.
- **@nestjs/testing**: Utilidades para pruebas.

## Scripts útiles

```bash
# Ejecutar en desarrollo
npm run start:dev

# Ejecutar en producción
npm run start:prod

# Ejecutar pruebas unitarias
npm run test

# Ejecutar pruebas e2e
npm run test:e2e
```

## Módulos y explicación breve

- **AppModule**: Módulo raíz que importa y configura los demás módulos.
- **LinksModule**: Encapsula la lógica y endpoints para la gestión de enlaces y registro de clics.
- **Entities**:
  - `Link`: Representa un enlace, con atributos como URL y relación con los clics.
  - `Click`: Representa un clic sobre un enlace, almacena IP, fecha y relación con el enlace.

## Ejemplo de uso


### Ejemplos de peticiones REST

#### 1. Crear un enlace

```http
POST /links
Content-Type: application/json

{
  "url": "https://ejemplo.com"
}
```
**Respuesta:**
```json
{
  "id": 1,
  "url": "https://ejemplo.com"
}
```

#### 2. Listar todos los enlaces

```http
GET /links
```
**Respuesta:**
```json
[
  { "id": 1, "url": "https://ejemplo.com" },
  { "id": 2, "url": "https://otro.com" }
]
```

#### 3. Registrar un clic en un enlace

```http
POST /links/1/click
Content-Type: application/json

{
  "ipAddress": "192.168.1.1"
}
```
**Respuesta:**
```json
{
  "id": 1,
  "timestamp": "2025-08-25T12:34:56.000Z",
  "ipAddress": "192.168.1.1",
  "link": 1
}
```

#### 4. Listar clics de un enlace

```http
GET /links/1/clicks
```
**Respuesta:**
```json
[
  {
    "id": 1,
    "timestamp": "2025-08-25T12:34:56.000Z",
    "ipAddress": "192.168.1.1",
    "link": 1
  }
]
```

#### 5. Eliminar un enlace

```http
DELETE /links/1
```
**Respuesta:**
```json
{
  "message": "Enlace eliminado"
}
```
Puedes probar estos endpoints usando herramientas como [Postman](https://www.postman.com/) o [curl](https://curl.se/).

## Pruebas

Incluye pruebas unitarias y e2e en la carpeta `test/` y archivos `*.spec.ts`.

## Recursos

- [NestJS Docs](https://docs.nestjs.com/)
- [TypeORM Docs](https://typeorm.io/)

## Licencia

MIT
