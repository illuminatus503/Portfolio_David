# Workflow

## Branching

- integration branch: `dev`
- feature work goes on short-lived branches from `dev`
- each meaningful block should ship in its own PR

## Expected implementation flow

1. branch from `dev`
2. implement one coherent slice
3. run:
   - `npm run lint`
   - targeted workspace tests
4. push branch
5. open PR against `dev`
6. merge PR into `dev`
7. update local `dev`

## Local development rules

- keep `npm run dev` stable
- do not rely on `npm build` for progress
- prefer additive refactors over large unverified rewrites
- keep the hidden workspace route configurable through environment

## Quality bar

- shared contracts should not diverge between web and domain
- API routes should expose stable success/error shapes
- new frontend data-fetching should prefer `react-query`
- new validated forms should prefer `react-hook-form` + shared `zod` schemas

## Documentation rule

Whenever the architecture or workflow materially changes:

- update `README.md`
- update `docs/architecture.md`
- update `docs/progress.md` if issue/PR state changed
