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

## Audit follow-up after Phase 3

Applied follow-up transitive resolutions in `package.json`:

- `minimatch@^9.0.4 -> 9.0.9`
- `minimatch@^10.2.0 -> 10.2.4`
- `glob@^13.0.0 -> 13.0.6`
- `tar@^7.5.4 -> 7.5.11`

This removed the previously reported high-severity `minimatch` and `tar` findings.

## Remaining audit noise after follow-up

- `glob@10.5.0` via `jest@30.3.0`
- `tmp@0.1.0` via `@lhci/cli@0.15.1`
- `tmp@0.0.33` via `external-editor@3.1.0`
- `rimraf@2.7.1` and `inflight@1.0.6` under the `tmp`/legacy `glob` chain
- `whatwg-encoding@3.1.1` via `jsdom@26.1.0`

These are upstream transitive issues. The remaining work would require replacing or patching Jest/jsdom and Lighthouse CI rather than simply refreshing direct dependencies.
