# Technical Architecture & Pattern Audit (2026-02-14)

## Executive Summary

The site is in a good state for a personal content platform: modern stack (Next.js App Router + TypeScript), sensible static-export deployment, solid SEO/structured-data foundations, and CI checks for lint/test/build.

The highest-leverage improvements are:

1. **Strengthen content typing and validation** in the blog data layer to reduce runtime risk and improve maintainability.
2. **Tighten build/runtime consistency** between local and production static export behavior.
3. **Improve performance architecture** (image strategy, font loading, and route-level payload discipline).
4. **Expand quality gates** (type-check step, E2E smoke checks, and architecture guardrails).
5. **Reduce coupling between content/config and rendering** for cleaner long-term evolution.

## Current Architecture Snapshot

### Platform & Deployment

- Next.js 16 App Router with React 19 and TypeScript.
- Static export for production/GitHub Pages via `output: 'export'` and trailing slashes.
- CI runs lint, tests, and build on PRs and main pushes.

### App Structure

- Route-centric layout under `src/app/`.
- Shared components in `src/components/`.
- Content constants in `src/constants/`.
- Markdown posts in `content/posts/` parsed at build time.

### Data & Content Flow

- Blog post metadata/content is loaded from the filesystem.
- Markdown is converted to HTML and injected into article pages.
- Sitemap generation derives blog URLs from post metadata.

## What Is Working Well

1. **Static architecture is deployment-appropriate** for a content-first site and keeps operational complexity very low.
2. **SEO baseline is strong** with metadata + JSON-LD + sitemap in place.
3. **Codebase is clean and approachable** for a solo-maintained portfolio.
4. **Component modularity is generally good**, with route-specific and shared component separation.
5. **Testing culture exists** (unit/component tests and coverage threshold).

## Holistic Findings & Recommended Improvements

## 1) Reliability & Type Safety

### Finding

The blog data API uses loose types (`[key: string]: string`) and implicit assumptions around front matter values and date formats.

### Why this matters

- Runtime issues are more likely when metadata evolves (new fields, missing fields, malformed dates).
- Weak types make refactoring and feature expansion (tags, reading time, related posts) slower.

### Recommendation

- Introduce a strict post schema type (e.g., `PostFrontMatter`, `PostSummary`, `PostDetail`).
- Validate front matter with a schema library (e.g., Zod) during build.
- Parse and normalize dates once in the data layer.

### Priority

**High**

---

## 2) Build Environment Consistency

### Finding

`next.config.js` conditionally enables static export only in production mode.

### Why this matters

- Local `yarn build` behavior can diverge depending on environment variables.
- Subtle deployment regressions are easier to miss when local build semantics differ.

### Recommendation

- Prefer explicit, deterministic behavior for build outputs in all build contexts.
- Consider always setting `output: 'export'` (if no server-only features are needed).
- Add a CI assertion that `out/` generation contains expected critical routes.

### Priority

**High**

---

## 3) Performance Architecture (Core Web Vitals)

### Finding

- Blog and page images are rendered with raw `<img>` and limited intrinsic sizing strategy.
- Global font is imported via CSS `@import` from Google Fonts.

### Why this matters

- Can increase CLS/LCP risk and reduce caching/perf efficiency.
- CSS `@import` for fonts can delay font discovery and adds a third-party dependency on first paint.

### Recommendation

- Migrate to `next/image` where static-export-compatible, or enforce width/height and lazy-loading consistently for `<img>`.
- Move font loading to `next/font` for better preload/subsetting and privacy/perf gains.
- Add a lightweight Lighthouse budget in CI (at least for homepage + one blog post).

### Priority

**High**

---

## 4) Security Posture for Markdown Rendering

### Finding

Markdown is rendered into HTML and injected via `dangerouslySetInnerHTML`.

### Why this matters

- Even if source content is trusted today, future contributors or copied content can introduce unsafe HTML patterns.
- Defense-in-depth is useful for long-lived content pipelines.

### Recommendation

- Add explicit sanitation policy (`rehype-sanitize`) in the markdown pipeline.
- Define an allowlist for tags/attributes needed for code blocks, links, and typography.
- Add regression tests for script/style/event-handler stripping.

### Priority

**Medium-High**

---

## 5) Lint/Formatting Guardrail Coverage

### Finding

Prettier glob patterns in scripts target `{src,app,components}/...`, but `app` and `components` live under `src/`.

### Why this matters

- Intended files outside the matched set (if any) may not be checked/formatted consistently.
- Guardrails become less trustworthy over time.

### Recommendation

- Simplify to `prettier --check .` with explicit ignore file, or correct globs to match actual structure.
- Add dedicated `yarn typecheck` script and run it in CI.

### Priority

**Medium**

---

## 6) Content Model Evolution Readiness

### Finding

Post model is minimal (title/date/excerpt/cover/slug/content) and not yet structured for taxonomy-driven growth.

### Why this matters

- Upcoming features (tags, related posts, series pages, RSS enhancements) benefit from a richer normalized content schema.

### Recommendation

- Add optional front matter fields now: `updated`, `tags`, `readingTime`, `draft`, `canonicalUrl`.
- Centralize content transformations into one module that emits typed view models.
- Consider generating a build-time content index JSON for faster page generation.

### Priority

**Medium**

---

## 7) UI Architecture & Accessibility Patterns

### Finding

UI composition is mostly clean, but some behaviors (mobile menu, route hash scroll) are imperative and spread across components.

### Why this matters

- Harder to reason about interaction state as features grow.
- A11y regressions can creep in without centralized patterns.

### Recommendation

- Extract reusable hooks/utilities for common browser effects (`useLockBodyScroll`, `useSmoothHashScroll`).
- Add an accessibility check pass in CI (axe-based test for primary routes).
- Standardize semantic landmarks/headings checklist for each page template.

### Priority

**Medium**

---

## 8) Observability & Runtime Feedback

### Finding

Current architecture has strong build checks but little production telemetry.

### Why this matters

- Hard to prioritize improvements without real user/performance data.

### Recommendation

- Add privacy-friendly analytics and Web Vitals collection.
- Track simple KPIs: top pages, referrers, outbound clicks, 404s.
- Review monthly to guide content and performance investments.

### Priority

**Medium**

## Suggested Roadmap

### Phase 1 (Quick Wins: 1-2 days)

1. Fix lint/Prettier glob strategy and add `yarn typecheck`.
2. Define strict TypeScript types for blog front matter and returned post objects.
3. Add/standardize `updated` in post metadata and date normalization.

### Phase 2 (Hardening: 2-4 days)

1. Add markdown sanitization and tests.
2. Move fonts to `next/font`.
3. Improve image rendering strategy (intrinsic sizes/lazy-loading or `next/image`).

### Phase 3 (Scale Readiness: 1 week, incremental)

1. Introduce tags/series/related-post architecture.
2. Add E2E smoke tests for core routes.
3. Add lightweight analytics + Web Vitals pipeline.

## Architecture Principles to Preserve

- Keep static-first deployment and low-ops simplicity.
- Keep route-level ownership clear (App Router structure is good).
- Keep SEO/entity modeling as a first-class concern.
- Keep writing/content throughput high; avoid over-engineering.

## Final Assessment

Overall maturity is **strong for a personal publishing platform**: clear structure, modern stack, and good baseline quality practices. With targeted improvements to typing, performance, and guardrails, the project can become notably more resilient and easier to evolve without increasing operational burden.
