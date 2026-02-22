# Technical Architecture Audit (2026-02-22)

## Executive Summary

The architecture is in a healthy state for a static, content-first personal site. Core resilience items that were previously open are now implemented:

- Markdown rendering includes explicit sanitization.
- Front matter is validated with a strict schema.
- Type checking is a first-class script.
- Shared SEO metadata and JSON-LD builders are in active use.

The primary opportunities are now operational (CI/performance monitoring) and content-model scale planning.

## Current Snapshot

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Deployment model**: Static export (`output: 'export'`) with GitHub Pages-compatible routing
- **Content model**: Markdown posts parsed at build time with zod front matter validation
- **Rendering model**: Static route generation for blog slugs
- **Quality gates (local)**: lint, typecheck, tests, and build scripts are available

## Completed Improvements

| Area | Status | Notes |
| --- | --- | --- |
| Markdown trust boundary | Done | `rehype-sanitize` is applied in the markdown pipeline with schema extensions for code highlighting output. |
| Front matter schema validation | Done | `zod` schema validates required/optional fields and fails with actionable errors. |
| Explicit typecheck script | Done | `yarn typecheck` runs `tsc --noEmit`. |
| SEO metadata abstraction | Done | Shared URL/metadata helpers are centralized in `src/lib/seo`. |
| JSON-LD abstraction | Done | Shared schema builders are centralized and reused by routes. |

## Open Opportunities

### 1) CI quality gate alignment

Current scripts support strong local checks, but this audit does not track a guaranteed remote pipeline policy for every PR.

**Recommendation**

- Ensure CI consistently runs: `yarn lint`, `yarn typecheck`, `yarn test`, and `yarn build`.
- Keep Yarn/Corepack setup explicit in workflow steps to avoid version drift.

### 2) Performance budget governance

The app is already lightweight, but no explicit non-regression budget is documented in repo tooling.

**Recommendation**

- Add a lightweight Lighthouse baseline process (manual or CI) for homepage and a representative blog post.
- Track score and key metrics changes after major UI/dependency updates.

### 3) Future content-domain expansion plan

The current blog pipeline is robust; future sections (e.g., resources/notes/projects) should avoid duplicated loaders.

**Recommendation**

- Introduce `src/lib/content/` conventions when a second content type is added.
- Reuse schema + loader patterns established in `blogApi`.

## Maintenance Notes

- Treat this file as the architecture status source inside `/docs`.
- Update after major framework upgrades, rendering model changes, or content pipeline changes.
