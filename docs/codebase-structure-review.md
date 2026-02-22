# Codebase Structure Review (2026-02-21)

## Scope

This review focuses on repository organization, architectural boundaries, maintainability, and quality gates.

## What is working well

- **Clear high-level separation of concerns**: route entrypoints under `src/app`, shared UI primitives under `src/components`, reusable logic under `src/lib`, and static/config data in `src/constants`.
- **Route-scoped composition is mostly clean**: feature-specific components live close to routes (e.g., `src/app/about/_components`), while broadly reused components are centralized.
- **Static-export-friendly setup is explicit**: Next config and deployment workflows are aligned with GitHub Pages.
- **Testing baseline is healthy**: Jest + RTL are configured with explicit coverage thresholds and a practical test file layout.

## Structural weaknesses and risks

### 1) Metadata and structured-data patterns are still partially duplicated

Although shared SEO helpers exist in `src/lib/seo`, route files still define repeated metadata and JSON-LD scaffolding directly. As more pages/content types are added, this increases drift risk and makes changes harder to apply consistently.

**Impact**

- Inconsistent canonical URL/open graph behavior over time.
- Harder maintenance when shared SEO requirements change.

**Recommendation**

- Complete route migration to `src/lib/seo/metadata.ts` builders.
- Extract shared JSON-LD builders (`ProfilePage`, `ContactPage`, `BlogPosting`) into `src/lib/seo` and keep route files focused on page composition.

### 2) Markdown rendering trust boundary remains under-specified

`markdownToHtml` transforms Markdown into HTML for rendering, but there is no explicit sanitization stage in the pipeline.

**Impact**

- Current risk is low if content is fully trusted, but this becomes a security liability if content sources ever expand (guest posts, CMS, automation, etc.).

**Recommendation**

- Add `rehype-sanitize` with an explicit allowlist schema compatible with syntax highlighting.
- Add tests for disallowed HTML/script payload stripping.

### 3) No first-class typecheck command in package scripts or CI

The repo uses TypeScript, but scripts/workflows run lint, tests, and build without an explicit `tsc --noEmit` stage.

**Impact**

- Type regressions can surface later than necessary, especially if build settings evolve.

**Recommendation**

- Add `"typecheck": "tsc --noEmit"` to `package.json`.
- Run `yarn typecheck` in PR checks and deployment workflow.

### 4) Documentation of architecture status is split across multiple files

Architecture guidance exists in `README.md` and `docs/technical-architecture-audit.md`, but status and next steps can diverge without a single source of truth.

**Impact**

- Higher onboarding cost and potential confusion about what is current vs. aspirational.

**Recommendation**

- Keep `README.md` concise and stable.
- Treat architecture audit docs as authoritative for roadmap/status, with a small changelog section updated alongside major merges.

### 5) Growth boundary for content model is not yet formalized

The content model in `blogApi` is stronger than before (schema-based front matter), but there is still no explicit pattern for future content types (projects/case studies/notes) beyond blog posts.

**Impact**

- Future expansion may duplicate parsing/validation patterns and create parallel implementations.

**Recommendation**

- Define a common content-domain boundary in `src/lib/content` (schema, loader, and mapping conventions) before introducing new content sections.

## Priority order

1. **Security + correctness first**: sanitize markdown pipeline.
2. **Quality gate**: add and enforce `typecheck` in CI.
3. **Maintainability**: finish SEO helper migration and JSON-LD extraction.
4. **Scale readiness**: introduce shared content-domain conventions for future content types.

## Summary

The project structure is solid for a static personal site. The main weaknesses are less about fundamental architecture and more about **future-proofing boundaries** (SEO abstraction completion, markdown sanitization, and stronger CI typing guarantees).
