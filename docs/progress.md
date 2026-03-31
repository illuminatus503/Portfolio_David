# Progress

## Status as of 2026-04-01

The repo is on a rebuilt stack and `dev` is the active integration branch.

Completed PRs merged to `dev`:

- `#9` initial rebuild toward ports and adapters
- `#11` migrations and local development docs
- `#12` reduce admin discoverability in public UI
- `#13` remove remaining public admin hint
- `#14` harden private workspace entrypoint
- `#15` smoke tests for the rebuilt web app
- `#16` remove obsolete legacy stack
- `#17` add ESLint tooling across workspaces
- `#18` modularize HTTP routes and validate admin sessions
- `#19` adopt `react-query` for frontend server state
- `#20` share form schemas across web and domain

## GitHub issues

Closed:

- `#4` admin/API delete mismatch
- `#5` fake-success contact flow
- `#6` broken environment and encoding legacy issues
- `#7` SQL bootstrap replaced by migrations
- `#8` local tooling baseline

Still open:

- `#1` epic: rebuild architecture to ports and adapters
- `#2` epic: rebuild frontend on compiled React
- `#3` epic: rebuild API for admin/public workflows

## Current product state

- local dev is stable on `npm run dev`
- public site served from `http://localhost:4173`
- private workspace served from the configured hidden route
- API health reachable through Vite proxy
- form validation shared between frontend and domain
- API routes split into bounded HTTP modules

## Known next steps

- move project and blog admin forms onto shared schema + standard form handling
- improve field-level error handling for CRUD workflows
- continue closing the remaining surface of epics `#2` and `#3`
- expand adapter and integration tests
