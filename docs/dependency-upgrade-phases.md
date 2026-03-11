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

Status: Completed

## Phase 3: Deprecations and cleanup

Scope:

- Remove or replace unused/deprecated tooling
- Reduce remaining audit noise where practical without regressions
- Keep formatting, linting, and builds stable

Status: Completed

## Remaining audit noise after Phase 3

- `glob@10.5.0` and `minimatch@9.0.5` via `jest@30.3.0`
- `glob@13.0.3` and `minimatch@10.2.0` via transitive tooling
- `tmp@0.1.0` via `@lhci/cli@0.15.1`
- `tar@7.5.10` via `node-gyp@12.2.0`
- `whatwg-encoding@3.1.1` via `jsdom@26.1.0`

These are upstream transitive issues; the repo no longer depends directly on the previously flagged import-sorting plugin or unused `ts-node`.
