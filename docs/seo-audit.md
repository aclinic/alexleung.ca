# SEO Audit & Recommendations (2026-02-14)

## Executive Summary

The site has a solid SEO foundation: page-level metadata, canonical URLs, Open Graph/Twitter cards, JSON-LD structured data, and a generated XML sitemap.

The highest-impact improvements are:

1. Add a dedicated `robots.ts` for explicit crawl directives and sitemap declaration.
2. Add `dateModified` to blog front matter so `lastModified` and article schema reflect real update time.
3. Add `Blog`/`ItemList` structured data on the blog index for better post discovery context.
4. Strengthen internal linking from evergreen pages (home/about/now) to specific blog posts.
5. Add Organization/Person profile enhancements (sameAs consistency + optional `knowsLanguage`, `email` if desired).

## What is Already Strong

- Global metadata is implemented with title, description, keywords, canonical base, robots, Open Graph, Twitter cards, and manifest in `layout.tsx`.
- Structured data includes `Person` and `WebSite` JSON-LD globally.
- Route-level metadata exists for `about`, `contact`, `now`, blog index, and blog post pages.
- Blog post pages include `BlogPosting` JSON-LD and canonical URLs.
- Sitemap generation includes all major routes and blog posts.

## Findings and Recommendations

### 1) Robots policy should be explicit via metadata route

**Finding:** The site sets robots in metadata (`"index, follow"`) but does not expose a `robots.ts` route for explicit crawler directives and sitemap declaration.

**Recommendation:** Add `src/app/robots.ts` to define:
- `User-agent: *`
- `Allow: /`
- `Sitemap: https://alexleung.ca/sitemap.xml`

**Impact:** Medium. Improves crawler clarity and avoids ambiguity during static export deployment.

---

### 2) `lastModified` uses build time for top-level pages

**Finding:** In `sitemap.ts`, top-level pages use `new Date()` for `lastModified`, which changes every build rather than reflecting actual content edits.

**Recommendation:** Track meaningful update timestamps (e.g., constants per page, or front-matter-like source of truth) so `lastModified` reflects true content freshness.

**Impact:** Medium. Better trust signal for crawl scheduling.

---

### 3) Blog posts should support true modified dates

**Finding:** Blog post metadata and JSON-LD set `dateModified` equal to `datePublished`.

**Recommendation:** Add `updated` (or `lastModified`) in post front matter and use it in:
- `generateMetadata` for article data
- `BlogPosting.dateModified`
- sitemap post `lastModified`

**Impact:** High for content SEO if posts are revised over time.

---

### 4) Homepage metadata could be made more intent-specific

**Finding:** Homepage relies on root layout metadata, which is good, but there is no dedicated `src/app/page.tsx` metadata export to tune home-page-specific search intent and social preview copy independently.

**Recommendation:** Add home `metadata` export to sharpen the primary value proposition and include homepage-specific OG image alt text/copy if needed.

**Impact:** Medium. Improves SERP relevance and social CTR.

---

### 5) Blog index schema can be expanded

**Finding:** Blog index has `CollectionPage` schema with a nested `Blog` entity, but does not enumerate posts as an `ItemList`.

**Recommendation:** Emit an `ItemList` with `ListItem` entries for recent posts (name + URL + position).

**Impact:** Medium. Improves machine understanding of content hierarchy.

---

### 6) Internal linking can be improved for crawl depth

**Finding:** Main navigation is good, but there are limited contextual links from high-authority pages (home/about/now) into specific blog posts.

**Recommendation:** Add sections like:
- “Featured posts” on home
- “Read next” on about/now
- Link related posts from each article

**Impact:** High. Internal link graph improvements often yield strong SEO gains.

---

### 7) Media optimization opportunities

**Finding:** The site uses static-export-safe image config (`unoptimized: true`) and some `<img>` tags for blog covers.

**Recommendation:**
- Keep static export compatibility, but ensure modern formats (`webp/avif`) and explicit width/height where possible to reduce CLS and improve performance.
- Compress OG image and verify dimensions remain 1200x630.

**Impact:** Medium. Better Core Web Vitals supports SEO.

---

### 8) Optional E-E-A-T reinforcement

**Finding:** Person schema is already strong (credentials, alumni, sameAs).

**Recommendation:** Optionally add:
- `knowsLanguage`
- `email` or `contactPoint` (if you want it public)
- `award`/`memberOf` (if applicable)

**Impact:** Low-Medium. Helps entity understanding and credibility.

## Priority Roadmap

### Quick wins (1-2 hours)
- Add `robots.ts` metadata route.
- Replace sitemap page `new Date()` values with meaningful fixed/maintained dates.
- Add homepage-specific metadata export.

### Next sprint (half day)
- Add `updated` date support in blog front matter and pipeline.
- Add `ItemList` schema on blog index.
- Add “Featured posts” links from homepage.

### Ongoing
- Update `updated` dates when revising posts.
- Monitor Search Console indexing coverage + query CTR.

## Suggested Measurement Plan

Track before/after for:
- Indexed pages count
- Average position for branded + topic terms
- CTR for homepage + top 5 posts
- Crawl stats and discovered URLs

Use Google Search Console + Bing Webmaster Tools, then review monthly.
