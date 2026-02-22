# Technical Architecture Audit (2026-02-16)

## Executive Summary

The site architecture is in a strong position for a static, content-first personal website. The current stack (Next.js App Router + static export + Markdown pipeline) is appropriately simple, low-ops, and maintainable.

The best next improvements are no longer foundational setup tasks; they are **resilience, maintainability, and measured performance improvements**:

1. Harden and type the content pipeline end-to-end (front matter schema + sanitized Markdown rendering).
2. Tighten quality gates (dedicated typecheck script and CI caching strategies).
3. Introduce architecture boundaries for long-term growth (content model, route modules, and metadata utilities).
4. Add runtime and build observability appropriate to static deployments.

## Current Snapshot

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Deployment model**: Static export (`output: 'export'`) with trailing slashes for GitHub Pages
- **Content model**: Markdown posts with front matter parsed at build time
- **Rendering model**: Static route generation for dynamic blog slugs
- **Quality gates**: ESLint + Prettier checks, Jest test suite, CI build validation

## Architectural Strengths

### 1) Deployment Simplicity and Determinism

- `output: 'export'` and `trailingSlash: true` align with GitHub Pages behavior.
- Unoptimized Next image setting avoids incompatible runtime image optimization requirements for static hosting.

### 2) Clean Route-Scoped Organization

- App Router pages are organized by route (`about`, `blog`, `contact`, `now`) with local `_components` where useful.
- Shared components remain centralized in `src/components`, which keeps cross-route reuse straightforward.

### 3) SEO Baseline Is Strong

- Root layout metadata is comprehensive (Open Graph, Twitter, canonical, manifest).
- Structured data is implemented for both Person and Website entities.
- Blog posts include metadata generation and article JSON-LD.
- `robots.ts` and `sitemap.ts` are present and static-friendly.

### 4) Solid Test Foundation

- Jest + React Testing Library coverage is in place with global thresholds.
- Alias mapping keeps test imports maintainable.

## Architecture Risks and Improvement Opportunities

### A) Markdown Rendering Trust Boundary (High)

Current Markdown rendering transforms to HTML and injects it with `dangerouslySetInnerHTML` at render time. This is normal for Markdown blogs, but should include explicit sanitization to guard against unsafe HTML if content origin changes.

**Recommendation**

- Add `rehype-sanitize` with an explicit schema allowlist for:
  - headings, paragraphs, emphasis, lists
  - links with safe protocols
  - code/pre blocks needed for syntax highlighting
- Add tests for malicious payload stripping and allowed-code rendering parity.

### B) Front Matter Schema Drift Risk (High)

The blog data layer validates key strings and dates, but schema evolution (tags, categories, canonical URL, reading time, draft flag) could become brittle without a first-class validator.

**Recommendation**

- Introduce `zod` (or similar) schema validation in `blogApi`.
- Validate fields during static build and fail with actionable messages.
- Add optional fields now with stable defaults (`tags`, `readingTimeMinutes`, `draft`).

### C) Tooling Guardrail Gap: No Explicit Typecheck Script (Medium)

TypeScript strict mode is enabled, but there is no dedicated `yarn typecheck` script to enforce static type health in CI as a first-class step.

**Recommendation**

- Add `"typecheck": "tsc --noEmit"`.
- Run `lint`, `typecheck`, `test`, and `build` in CI with cached Yarn dependencies.

### D) Metadata/SEO Duplication Pressure (Medium)

Metadata and JSON-LD are robust, but they are currently authored across route files and can drift as content scale grows.

**Recommendation**

- Extract reusable metadata builders into `src/lib/seo/*`.
- Centralize canonical URL and image derivation logic.
- Keep route files focused on content composition.

**Status (2026-02-16 update)**

- ✅ **Phase 0 complete**: shared SEO model contract (`SeoInput`, `SeoImage`) is defined in `src/lib/seo/types.ts`.
- ✅ **Phase 1 complete**: reusable URL + metadata builders are in place:
  - `src/lib/seo/url.ts` for canonical and absolute URL derivation
  - `src/lib/seo/metadata.ts` for standardized `Metadata` generation
  - tests added for URL normalization and metadata defaults/overrides
- ✅ **Phase 2 metadata migration complete**: `about`, `contact`, `now`, `blog`, and `blog/[slug]` now use shared SEO helpers for metadata generation.
- ✅ **JSON-LD extraction complete**: reusable schema builders now live in `src/lib/seo/jsonld.ts`, including profile/contact/web page, blog collection/item list, blog posting, person, and website schema builders.

### E) Performance Budget Not Yet Explicit (Medium)

The site has good baseline choices, but no explicit performance budget or regression checks (Lighthouse CI / bundle checks).

**Recommendation**

- Add a lightweight Lighthouse CI check on homepage + one blog page.
- Define thresholds for LCP/TBT/CLS and enforce in PR CI.
- Optionally add `@next/bundle-analyzer` for periodic dependency/bundle review.

## Proposed Improvement Roadmap

### Phase 1 (1–2 days): Security + Correctness

1. Add sanitized Markdown pipeline + tests.
2. Add strict front matter schema validation with clear build errors.
3. Add `yarn typecheck` and include in CI.

### Phase 2 (2–4 days): Maintainability

1. Migrate route-level metadata to use `src/lib/seo` helpers (`about`, `contact`, `now`, `blog`, and `blog/[slug]`).
2. Extract shared JSON-LD builders so route files retain only page-specific schema fields.
3. Formalize blog post model with extensible fields.
4. Add content authoring lint checks (required front matter fields).

### Phase 3 (half day): Performance Governance

1. Add Lighthouse CI for two representative pages.
2. Capture current baseline and enforce non-regression thresholds.
3. Add optional bundle-size reporting for major dependency changes.

## Suggested Success Metrics

- Zero unsanitized HTML vectors in markdown regression tests.
- 100% of posts validated against typed schema during build.
- CI pipeline includes `lint + typecheck + test + build` and passes on default branch.
- Lighthouse performance score >= 95 on homepage and latest blog post.

## Audit Maintenance Notes

- Update this file after framework upgrades or content-model changes.
- Track roadmap items by moving completed items into a short changelog section.


## Progress Log

- **2026-02-16**: Recommendation D has completed foundational work (Phase 0 + Phase 1 utilities and tests). Remaining scope is route migration + JSON-LD extraction under Phase 2.

- **2026-02-22**: Recommendation D route migration + JSON-LD extraction completed with shared builders in `src/lib/seo/jsonld.ts` and route adoption across key pages.
