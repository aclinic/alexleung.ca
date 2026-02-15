# Technical Architecture Audit (2026-02-15)

## Executive Summary

The architecture is solid for a static personal publishing site: App Router structure is clean, static export is deterministic, and test/lint/build checks are in place. Most high-priority items from the previous audit are now resolved.

Current focus should move from baseline hardening to content model maturity and quality-of-life improvements.

## Current Snapshot

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Deployment model**: Static export (`output: 'export'`) with trailing slashes for GitHub Pages
- **Content model**: Markdown posts with front matter parsed at build time
- **Quality gates**: ESLint + Prettier checks, Jest test suite, CI build validation

## Findings Status

| Area | Status | Notes |
| --- | --- | --- |
| Static export consistency | Done | `next.config.js` always exports statically; no env-conditional behavior. |
| SEO/metadata baseline | Done | Layout metadata, per-route metadata, JSON-LD, and sitemap are implemented. |
| Crawler directives | Done | `robots.ts` exists and declares sitemap/crawl policy. |
| Markdown rendering safety | Open | Rendering pipeline should still add explicit sanitization (`rehype-sanitize`) for defense in depth. |
| Content typing strictness | Open | Blog front matter remains relatively loose for future taxonomy fields. |
| Performance architecture | Open | Font/image strategy can be tightened for better CWV resilience. |
| CI quality gates | In progress | Lint/test/build are present; adding explicit typecheck script would improve coverage. |

## Recommended Next Steps

### 1) Harden Markdown Rendering (High)

- Add `rehype-sanitize` to the markdown pipeline.
- Keep an explicit allowlist for code blocks, links, and typography tags.
- Add regression tests for unsafe HTML stripping.

### 2) Strengthen Content Schema (High)

- Introduce strict post front matter types (`title`, `date`, `updated`, `excerpt`, `tags`, `cover`).
- Validate front matter during build and fail early on malformed content.
- Normalize date parsing in one data-layer module.

### 3) Improve Build Guardrails (Medium)

- Add `yarn typecheck` and run it in CI.
- Simplify Prettier scope to avoid blind spots (e.g., check repo-wide with ignore rules).

### 4) Improve Performance Defaults (Medium)

- Continue enforcing explicit width/height and lazy-loading for images.
- Evaluate `next/font` usage for font loading and privacy/performance benefits.

## Audit Maintenance Notes

- Update this file after dependency upgrades that affect routing/rendering/build output.
- Close or remove findings once shipped to keep the document actionable.
