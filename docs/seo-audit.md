# SEO Audit & Recommendations (2026-02-22)

## Executive Summary

The site has a strong and coherent SEO baseline for a static personal website:

- centralized metadata helpers,
- canonical URL handling,
- route-level metadata generation,
- structured data for person, website, pages, blog collection, and blog posts,
- sitemap and robots routes.

Remaining work is incremental and focused on editorial freshness and internal linking depth.

## Implemented Baseline

| Capability | Status | Notes |
| --- | --- | --- |
| Canonical URL + metadata defaults | Done | Shared helpers in `src/lib/seo` keep route metadata consistent. |
| Structured data coverage | Done | JSON-LD builders include page-level and blog-level schemas, including blog index item list. |
| Sitemap + robots | Done | `src/app/sitemap.ts` and `src/app/robots.ts` are in place. |
| Blog index list schema | Done | Blog index includes `ItemList` JSON-LD. |

## Open Recommendations

### 1) Improve article freshness signals

**Recommendation**

- Continue using/expanding `updated` front matter across posts.
- Ensure `dateModified` and sitemap `lastModified` stay aligned when updates are made.

### 2) Strengthen internal linking graph

**Recommendation**

- Add contextual links between evergreen pages (About/Now/Home) and relevant blog posts.
- Consider related-post links on post pages for deeper crawl paths.

### 3) Add lightweight ongoing SEO operations

**Recommendation**

- Maintain a periodic checklist (e.g., monthly or quarterly):
  - Search Console indexing health
  - CTR and impression trends
  - broken-link scan

## Maintenance Notes

- Keep this audit concise and status-driven.
- Update after schema/metadata model changes or major IA/content updates.
