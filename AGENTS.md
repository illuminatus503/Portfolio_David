# AGENTS.md

## Purpose

This repository is maintained through small, mergeable slices. Future agents should optimize for incremental progress, clear boundaries and a stable local dev workflow.

## Non-negotiables

- branch from `dev`
- open a PR for each coherent change set
- merge back into `dev`
- keep `npm run dev` working locally
- do not introduce `npm build` as a required validation step

## Repo map

- `apps/web`: React app
- `apps/api`: Express app
- `packages/domain`: use cases
- `packages/shared`: shared contracts and config
- `docs/`: architecture, progress and workflow notes

## Preferred patterns

- frontend server state: `@tanstack/react-query`
- validated forms: `react-hook-form` + shared `zod` schemas
- API route composition: modular routers under `apps/api/src/http/routes`
- shared request/validation contracts: `packages/shared`
- domain logic should stay independent from React and Express

## Current constraints

- the private workspace must remain non-obvious in the public UI
- route is environment-driven through `VITE_ADMIN_PATH`
- local runtime may use in-memory repositories when `DATABASE_URL` is absent
- PostgreSQL mode must continue to work through the existing migration entrypoint

## Before finishing a work block

Run the relevant checks:

- `npm run lint`
- `npm run test -w @portfolio/web`
- `npm run test -w @portfolio/api`

If the change is isolated, still prefer targeted tests over broad no-op churn.

## After finishing a work block

- update documentation if the architecture or workflow changed
- push the branch
- open a PR against `dev`
- merge it
- ensure local `dev` is aligned with `origin/dev`
