# Architecture

## Repo shape

```text
apps/
  api/
  web/
packages/
  domain/
  shared/
```

## Current runtime boundaries

### `apps/web`

- React application served by Vite in local development
- public home page
- private workspace route for admin tasks
- `react-query` for server state
- `react-hook-form` + shared `zod` schemas for validated forms

### `apps/api`

- Express HTTP surface
- modular routers for:
  - auth
  - projects
  - blog
  - contact
- reusable HTTP helpers for response shape and rate limiting
- container-based adapter wiring

### `packages/domain`

- use cases:
  - projects CRUD
  - blog CRUD
  - admin authentication
  - contact submission
  - token verification
- no direct knowledge of Express or React
- consumes schemas exported by `@portfolio/shared`

### `packages/shared`

- shared `zod` schemas
- seed data for local/in-memory mode
- runtime config used across apps

## Ports and adapters direction

The target dependency flow is:

```text
web -> shared
api -> domain + shared
domain -> shared
shared -> no app dependencies
```

Infrastructure-specific code lives under `apps/api/src/adapters` and is injected through `apps/api/src/infrastructure/container.js`.

## API design

Current routes:

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/auth/session`
- `GET /api/projects`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`
- `GET /api/blog`
- `POST /api/blog`
- `PUT /api/blog/:id`
- `DELETE /api/blog/:id`
- `POST /api/contact`

Response contract:

- success: `{ "data": ... }`
- failure: `{ "error": { "code": string, "message": string, "details"?: unknown } }`

## Persistence modes

### In-memory

Used when `DATABASE_URL` is missing.

- fast local startup
- safe for UI iteration
- non-persistent data

### PostgreSQL

Enabled when `DATABASE_URL` is defined.

- repositories switch to postgres adapters
- migrations live in `apps/api/migrations`

## Near-term architectural work

- keep moving validation contracts out of app-specific layers and into `shared`
- reduce remaining ad hoc admin form state for project and blog CRUD
- continue isolating auth, persistence and mail concerns behind explicit ports
- add deeper test coverage around adapters and error contracts
