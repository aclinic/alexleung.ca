# SEO Audit & Recommendations (2026-02-15)

## Executive Summary

The site has a strong SEO baseline for a static personal site: route-level metadata, canonical URLs, JSON-LD, sitemap generation, and a dedicated `robots.ts` route are all in place.

Remaining opportunities are primarily about depth: richer article freshness signals, stronger internal linking, and expanded list schema for the blog index.

## Implemented Baseline

- Global metadata covers title templates, descriptions, Open Graph, Twitter cards, and canonical base.
- Structured data includes `Person` and `WebSite` entities.
- Blog post pages emit article metadata and structured data.
- `sitemap.ts` provides route discovery for top-level pages and posts.
- `robots.ts` provides explicit crawl directives and sitemap declaration.

## Findings Status

| Finding | Status | Recommendation |
| --- | --- | --- |
| Explicit robots route | Done | Keep `robots.ts` updated if host/domain changes. |
| Canonical + sitemap coverage | Done | Keep aligned with any new routes. |
| Blog `dateModified` fidelity | Open | Add `updated` in front matter and propagate to metadata/schema/sitemap. |
| Blog index schema depth | Open | Add `ItemList` with post URLs and positions to strengthen list context. |
| Internal linking graph | Open | Add featured/related links from Home/About/Now into articles. |
| Media performance alignment | In progress | Continue modern formats + dimensions; track LCP/CLS in periodic audits. |

## Priority Backlog

### High

1. Add `updated` front matter support and wire to:
   - article metadata
   - `BlogPosting.dateModified`
   - sitemap `lastModified` for posts

2. Improve internal linking:
   - featured posts on homepage
   - contextual links from About/Now
   - related posts module on article pages

### Medium

1. Add blog index `ItemList` schema.
2. Add lightweight SEO monitoring checklist (Search Console indexing + CTR review monthly).

## Measurement Plan

Track before/after changes for:

- Indexed URL count
- Homepage and top-post CTR
- Average ranking position for branded and topical terms
- Crawl/discovery consistency in Search Console

## Audit Hygiene

- Re-run this audit after major metadata/schema/content model changes.
- Keep recommendations tied to concrete implementation tasks.
