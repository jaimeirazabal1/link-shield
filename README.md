
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
   git clone <url-del-repo>
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

Puedes crear un enlace y registrar clics mediante los endpoints REST definidos en `links.controller.ts`.

## Pruebas

Incluye pruebas unitarias y e2e en la carpeta `test/` y archivos `*.spec.ts`.

## Recursos

- [NestJS Docs](https://docs.nestjs.com/)
- [TypeORM Docs](https://typeorm.io/)

## Licencia

MIT
