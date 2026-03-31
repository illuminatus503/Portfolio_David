# Portfolio_David

Portfolio rebuild for David on top of a split `web` and `api` architecture with shared contracts and domain logic.

The active codebase is the rebuilt stack under `apps/` and `packages/`. The old `frontend/`, `api/` and `shared/` runtime was removed from the repository and is no longer part of local development or deployment.

## Current stack

- `apps/web`: React + Vite
- `apps/api`: Express + modular HTTP routes
- `packages/domain`: use cases and domain-facing orchestration
- `packages/shared`: shared schemas, seed data and runtime config

## Local development

```bash
npm install
npm run dev
```

Local URLs:

- web: `http://localhost:4173`
- API health through Vite proxy: `http://localhost:4173/api/health`
- private workspace route: `http://localhost:4173/studio-503`

Default local admin credentials:

- username: `admin`
- password: `admin123`

## Environment

Copy the base environment file before running local services:

```bash
cp .env.example .env
```

Important variables:

- `API_PORT`
- `VITE_ADMIN_PATH`
- `JWT_SECRET`
- `DATABASE_URL` (optional, enables PostgreSQL adapters)
- `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `RECIPIENT_EMAIL` (optional, enables email delivery)

## Database

Run migrations for PostgreSQL-backed local development:

```bash
npm run db:migrate -w @portfolio/api
```

If `DATABASE_URL` is not defined, the API falls back to in-memory adapters so the product remains usable in local development.

## Quality checks

```bash
npm run lint
npm run test
```

`npm build` is intentionally not part of the current workflow. The local reference workflow is the stable `npm run dev` environment.

## Documentation

- [Architecture](./docs/architecture.md)
- [Progress](./docs/progress.md)
- [Workflow](./docs/workflow.md)
- [Agents guide](./AGENTS.md)
