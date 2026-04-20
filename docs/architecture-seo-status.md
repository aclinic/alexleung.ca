# Architecture & SEO Status (2026-03-04)

This is the canonical status document for technical architecture and SEO.

## Executive Summary

The site is in a healthy state for a static, content-first portfolio:

- Next.js static export architecture is stable and well-suited to GitHub Pages.
- Markdown rendering and front matter validation enforce stronger content safety and consistency.
- SEO fundamentals (canonical handling, metadata helpers, JSON-LD, sitemap, robots) are implemented.
- Discoverability now extends beyond the core pages through experimental hub routing and crawlable tag archives.
- Remaining work is primarily editorial operations and internal-link quality.

## Architecture Status

### Current Baseline

- **Framework**: Next.js 16 + React 19 + TypeScript
- **Deployment model**: static export (`output: 'export'`) with GitHub Pages-compatible routing
- **Content model**: Markdown posts parsed at build time with zod front matter validation
- **Quality gates**: lint, tests, typecheck, build, image variant generation in CI and local scripts

### Completed Improvements

- Markdown pipeline applies sanitization.
- Front matter is validated through a strict schema.
- TypeScript checking is first-class (`yarn typecheck`).
- Shared SEO/URL and JSON-LD builders are centralized and reused by routes.
- Lighthouse CI assertions run against static export routes.

### Next Opportunities

1. **Future content-domain expansion plan**
   - When introducing another content type (e.g., resources/projects), extract shared conventions into `src/lib/content/`.
2. **Operational consistency**
   - Keep architecture snapshots short and update only when meaningful framework or pipeline changes land.

## SEO Status

### Implemented Baseline

- Consistent metadata defaults and canonical URL generation.
- Route-level metadata generation.
- Structured data coverage for person/site/pages/blog surfaces.
- `sitemap` and `robots` routes for crawler discoverability.
- Crawlable `/experimental/` hub plus sitemap coverage for experimental tools.
- Crawlable blog tag archives, with tag links that now contribute to internal linking.

### Next Opportunities

1. **Editorial freshness process**
   - Add or refresh high-intent posts and periodically update evergreen pages.
2. **Internal link depth**
   - Add contextual links between semantically related posts/pages.
3. **Lightweight SEO operations**
   - Periodically review indexing, CTR/impression trends, and broken links.
4. **Page-specific social preview images**
   - Create dedicated OG/Twitter images for experimental pages and other high-value landing pages that still fall back to text-only share cards.

## Maintenance Rules

- Keep this file concise and status-driven.
- Update after major architecture, metadata/schema, or information-architecture changes.
- Avoid speculative long-range planning here; capture only active, decision-relevant items.
