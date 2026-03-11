# Dependency Upgrade Phases

Execution tracker for the dependency and framework refresh.

## Validation required after each phase

- Remove `node_modules/`
- Run `yarn install --immutable`
- Run `yarn lint`
- Run `yarn typecheck`
- Run `yarn test --runInBand`
- Run `yarn build`

## Phase 1: Low-risk dependency refresh

Scope:

- Patch and minor upgrades for direct dependencies and devDependencies
- No intentional framework-major migrations
- No behavioral changes beyond compatibility fixes

Status: Completed

## Phase 2: Major upgrades

Scope:

- Node version bump required for ESLint 10
- ESLint 10 migration and config validation
- Shiki 4 migration and markdown highlighting validation

Status: In progress

## Phase 3: Deprecations and cleanup

Scope:

- Remove or replace unused/deprecated tooling
- Reduce remaining audit noise where practical without regressions
- Keep formatting, linting, and builds stable

Status: Pending
