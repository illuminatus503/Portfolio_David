# Portfolio_David

Rebuild del portfolio de David sobre una estructura con `apps/web`, `apps/api` y paquetes compartidos para dominio y configuración. El objetivo es tener un flujo local estable con `npm dev`, una API coherente para el panel admin y una base clara para seguir separando frontend, backend e infraestructura.

## Stack actual

- `apps/web`: React + Vite
- `apps/api`: Express modular
- `packages/domain`: casos de uso y validación
- `packages/shared`: seed data y configuración local compartida

## Desarrollo local

```bash
npm install
npm run dev
```

URLs locales:

- web: `http://localhost:4173`
- api health: `http://localhost:4173/api/health`

Credenciales locales por defecto:

- usuario: `admin`
- contraseña: `admin123`

## Base de datos

La inicialización nueva está en `apps/api/migrations`.

```bash
npm run db:migrate -w @portfolio/api
```

Si `DATABASE_URL` no está definida, la API usa adapters en memoria para que el producto siga siendo navegable y administrable en local.

## Estado del backlog

Issues creadas en GitHub:

- `#1` arquitectura ports and adapters
- `#2` rebuild frontend React compilado
- `#3` rebuild API admin/public
- `#4` mismatch admin/API en delete
- `#5` contacto con fake-success
- `#6` environment + encoding
- `#7` migraciones SQL
- `#8` tooling local
