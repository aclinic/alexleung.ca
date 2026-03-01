# Engagement Audit: Content + Site Structure

Date: 2026-03-01

## Executive summary

Your site already has strong engagement foundations:

- A clear and credible positioning statement on the hero section.
- A consistent publishing rhythm in February 2026.
- Good topical coherence around AI engineering, software systems, and reflective technical writing.
- Static architecture + SEO/JSON-LD implementation that supports discoverability.

The largest engagement upside now is **not visual polish**; it is adding stronger **reader journey mechanics**:

1. Convert first-time visitors into repeat readers.
2. Increase page depth (one post → second post).
3. Give high-intent readers an explicit next step (contact/collab/subscribe).

---

## What the current structure is doing well

### 1) Home page positioning is clear and concise

The hero immediately communicates identity and topic focus, and has two direct CTAs (`Read My Blog`, `About Me`). This is excellent for first-impression clarity.

### 2) Information architecture is simple and easy to parse

Top-level nav (`Home`, `About`, `Now`, `Blog`, `Contact`) is straightforward and helps visitors self-select intent quickly.

### 3) Blog card design supports scanning

Cards include image, title, date, excerpt, and tags, which is a good default for discoverability and click-through.

### 4) Metadata/structured data is already mature

You are using page metadata and JSON-LD on home/blog/article pages, which gives you a strong SEO baseline.

### 5) Content quality and voice are differentiated

Your writing combines practical implementation details and reflective thinking. This balance is rare and can become a signature.

---

## Engagement opportunities (prioritized)

## P0 — High impact, low complexity

### A) Add a primary email capture or subscription CTA

Current CTAs send visitors to blog/about, but there is no explicit mechanism to retain readers over time. Add one persistent CTA:

- Header button: `Subscribe` (if newsletter exists) or `Get updates`.
- End-of-post CTA block: "If this was useful, get future posts by email."
- Home section: single-field email opt-in, or at minimum a "Follow on X/Bluesky + RSS" block.

**Why:** This directly improves return traffic and lifetime engagement.

### B) Add “Related posts” on blog post pages

Today post pages focus on single-article consumption. Add 2–4 related post links by shared tags (or recency fallback).

**Why:** This is usually the highest-leverage way to improve page depth and total session duration.

### C) Add a stronger contact intent split

On contact page, split intent into specific paths:

- Collaboration / consulting
- Speaking / podcast
- General hello

Optionally include a one-line expected response time.

**Why:** Reduces friction and increases conversion from interested visitors.

---

## P1 — Medium impact

### D) Surface “Start here” paths by reader type

Create a short section (home or blog index):

- New to my writing? Start here.
- AI Engineering posts
- Architecture posts
- Reflection/opinion posts

Curate 1–3 links per path.

**Why:** Helps first-time readers quickly find relevance and lowers bounce.

### E) Add reading-time metadata visibly on cards and posts

Your post model already supports `readingTimeMinutes`. Display it on cards and at top of posts.

**Why:** Time expectations increase click confidence and completion.

### F) Add “featured post” + “latest” separation on blog index

Instead of a flat grid only, make first slot a featured post (or latest long-form), then show rest in grid.

**Why:** Better editorial guidance increases CTR to strategically important content.

---

## P2 — Strategic / compounding

### G) Build a lightweight content series structure

Some posts naturally form tracks (e.g., deep learning notes, AI workflow evolution). Add optional frontmatter fields:

- `series`
- `seriesOrder`

Then render “Part X of Y” with prev/next links.

**Why:** Series design improves repeat visits and completion loops.

### H) Publish consistency cues + social proof

Add small indicators:

- "Published X posts this month"
- "Most read posts" (can be manual if no analytics yet)
- "Last updated" for selected evergreen pages (already done on Now page—extend pattern)

**Why:** Freshness and social proof reduce hesitation.

### I) Add lightweight on-site search or tag landing pages

If full search feels heavy, start with tag landing pages (`/blog/tags/[tag]`) and a tag directory.

**Why:** Better discoverability for returning readers with specific topic intent.

---

## Content strategy observations

## What’s resonating in your current direction

- Clear niche intersection: AI engineering + software architecture + reflective practice.
- Posts that combine implementation details and personal decision-making are especially brand-consistent.
- Recent cadence is strong; maintain it.

## Gaps to close

1. **No explicit “why follow” promise:** state what readers get and how often.
2. **No retention loop:** no capture mechanism (email/RSS emphasis) embedded in reading flow.
3. **No guided depth:** limited cross-linking and progression paths between posts.

## Suggested editorial mix (monthly)

- 2× practical engineering posts (implementation, architecture, workflow).
- 1× conceptual/learning note (deep learning, systems reasoning).
- 1× reflective career/creator post.

This protects breadth while preserving your core identity.

---

## Recommended implementation sequence (4 weeks)

### Week 1 (quick wins)

1. Add end-of-post CTA block (subscribe/follow/contact).
2. Add related posts module under each article.
3. Show reading time in blog cards and post headers.

### Week 2

4. Add "Start here" section on blog index.
5. Add intent-based contact options.

### Week 3

6. Introduce featured post on blog index.
7. Add simple tag pages.

### Week 4

8. Add series metadata support + prev/next series nav.
9. Add one recurring conversion block on home.

---

## Metrics to watch (engagement KPI set)

Track these before/after each change:

- Blog index click-through rate to post pages.
- Average pages per session.
- Percentage of sessions with 2+ post views.
- Contact conversion rate.
- Returning visitor rate (7-day and 30-day).
- Email/RSS follower growth (if introduced).

If you only track one KPI first, pick **% sessions with 2+ post views**.

---

## Bottom line

Your foundation is strong: good writing, clear identity, and clean architecture. The next 20% effort should focus on **reader flow and retention systems** (subscribe, related posts, guided paths), because those changes most directly compound audience growth.

---

## Related posts: classification and maintenance design (markdown-first, no CMS)

This section answers the implementation choices directly.

### 1) Relationship model: use **directional (one-way) links generated from a symmetric similarity score**

Recommendation:

- Compute a similarity score between the current post and every other post.
- For each post, publish only its top `N` results as outgoing related links.

Why this model:

- Similarity itself is naturally two-way (A is similar to B), but display should be one-way per page.
- Requiring strict reciprocal links (A→B and B→A always) creates editorial coupling and brittle behavior as new posts are added.
- One-way output is easier to maintain and still gives good user journeys.

### 2) Time direction: **do not force backward-only links**

Recommendation:

- Default to both older and newer posts.
- Optionally guarantee at least one older post when available (helps archive depth).

Why:

- Backward-only avoids stale old posts linking to future content, but it lowers quality for newer-post discovery.
- For static rebuilds, old posts can safely point to newer posts after each build with no CMS complexity.
- Bidirectional-in-time recommendations generally improve engagement better than backward-only.

### 3) Upper limit: cap related links at **3** (hard max 4)

Recommendation:

- Render 3 related posts by default.
- Use 4 only if you later add clear visual hierarchy or larger desktop layouts.

Why:

- 2 can feel sparse; 5+ creates decision fatigue.
- 3 is a reliable sweet spot for click-through without clutter.

### 4) Ranking heuristic (simple + maintainable)

Use deterministic scoring from frontmatter you already have:

- +4 for each shared tag.
- +2 if same optional `series`.
- +1 if publish dates are within 90 days.
- -small penalty if candidate is same day and much shorter (optional tie-break).

Then sort by score desc, then by date desc.

If score is zero for all candidates, fallback to latest non-current posts.

### 5) Frontmatter design (still markdown-only)

Keep authoring in markdown with optional fields (no CMS):

```yaml
# optional
series: "deep-learning-notes"
seriesOrder: 2
related:
  - "from-coder-to-orchestrator" # manual override, optional
  - "boring-blog-architecture"
```

Behavior:

- `related` (if present) is a curated override list.
- Otherwise use automatic tag/series/date scoring.
- This hybrid approach preserves automation while allowing occasional editorial curation.

### 6) Maintainability policy for future posts

Recommended policy:

1. **Default automation first** (tags + optional series).
2. **Curate only cornerstone posts** with explicit `related` overrides.
3. Keep tags normalized (singular/plural and naming consistency) to preserve recommendation quality.
4. Add a small validation step in build/test:
   - `related` slugs must exist.
   - `seriesOrder` must be unique within a series.

This keeps ongoing maintenance low while preserving quality as the archive grows.

### 7) Practical implementation path in this codebase

1. Extend frontmatter schema in `src/lib/blogApi.ts` with optional `series`, `seriesOrder`, and `related`.
2. Add `getRelatedPosts(slug, limit = 3)` utility in `src/lib/blogApi.ts`.
3. Render a related-posts block in `src/app/blog/[slug]/page.tsx` below article content.
4. Add tests in `src/lib/__tests__/blogApi.test.ts` for:
   - scoring,
   - cap behavior,
   - manual override,
   - fallback when no tags match.

This remains fully static and markdown-managed.

### Recommendation summary (direct answers)

- Two-way or one-way? **One-way display generated from symmetric similarity scores**.
- Backwards-only? **No**; allow both directions in time for better discovery.
- Upper limit? **3 related posts** (optionally 4 later).
- CMS needed? **No**; use markdown frontmatter + deterministic generation at build time.

---

## Implementation proposal (concrete, code-first)

This proposal translates the strategy above into an incremental implementation plan that preserves your current static + markdown workflow.

### Scope

In scope:

- Add optional post metadata (`series`, `seriesOrder`, `related`) in markdown frontmatter.
- Implement deterministic related-post selection in `src/lib/blogApi.ts`.
- Render a "Related posts" module on post pages.
- Add tests and validations to keep long-term maintenance low.

Out of scope (for phase 1):

- Any CMS integration.
- Personalized recommendations.
- Runtime analytics-based ranking.

### Data model changes

Extend `PostFrontMatterSchema` and `Post` in `src/lib/blogApi.ts` with:

- `series?: string`
- `seriesOrder?: number`
- `related?: string[]`

Validation rules:

1. `seriesOrder` requires `series`.
2. `seriesOrder` must be a positive integer.
3. `related` cannot include current post slug.
4. `related` slugs must exist in `content/posts`.
5. Within a given series, `seriesOrder` must be unique.

### Proposed API additions

Add to `src/lib/blogApi.ts`:

```ts
type GetRelatedPostsOptions = {
  limit?: number; // default 3
};

export function getRelatedPosts(
  slug: string,
  options?: GetRelatedPostsOptions
): Array<Pick<Post, "slug" | "title" | "date" | "excerpt" | "coverImage" | "tags">>;
```

Implementation behavior:

1. Load target post.
2. If target has `related`, return those (filtered to valid + existing slugs), capped by `limit`.
3. Else score all candidates using deterministic heuristic.
4. If all candidate scores are 0, fallback to newest non-current posts.
5. Return top `limit` items.

### Scoring spec (v1)

Given `target` and `candidate`:

- `tagScore = sharedTagCount * 4`
- `seriesScore = +2` if both have same non-empty `series`
- `recencyScore = +1` if abs(date diff) <= 90 days
- `total = tagScore + seriesScore + recencyScore`

Tie-break order:

1. Higher `total`
2. Newer `date`
3. Lexicographic slug (stable deterministic output)

### UI integration

In `src/app/blog/[slug]/page.tsx`:

- Fetch `relatedPosts = getRelatedPosts(post.slug, { limit: 3 })`.
- Render below the article body in a dedicated section:
  - Heading: `Related posts`
  - 3 compact cards (title, date, optional excerpt)
  - Link target: `/blog/${slug}`

Accessibility/content details:

- Use semantic heading level following the page structure.
- Keep module hidden when no related posts exist.
- Preserve current page performance by using existing static data path.

### Tests

Add/extend tests in `src/lib/__tests__/blogApi.test.ts`:

1. Returns manual override when `related` is present.
2. Ignores non-existent override slugs and still returns valid ones.
3. Applies score ordering for shared tags/series/date window.
4. Enforces cap (`limit`, default 3).
5. Falls back to newest posts when all scores are zero.
6. Throws on invalid schema combinations (`seriesOrder` without `series`, duplicate order in series).

Add route-level rendering test(s) if desired in `src/app/.../__tests__` later, but keep phase 1 focused on `blogApi` correctness.

### Rollout plan

#### Phase 1 (core backend logic)

- Update schema + types.
- Implement `getRelatedPosts` + tests.
- No UI change yet (safe backend merge).

#### Phase 2 (UI)

- Add related-posts module to post page.
- Add component tests for rendering + empty state.

#### Phase 3 (editorial polish)

- Add `series` metadata to selected existing posts.
- Add manual `related` only for cornerstone posts.

### Acceptance criteria

- Build succeeds with no CMS dependency.
- Existing posts without new fields continue to work.
- For any published post, `getRelatedPosts` returns deterministic output.
- Default related count is 3 and never exceeds limit.
- `yarn lint`, `yarn test`, and `yarn typecheck` pass after implementation.

### Risks and mitigations

- **Risk:** Tag taxonomy drift reduces recommendation quality.
  - **Mitigation:** Normalize tag naming conventions and optionally add a lightweight tag lint rule.

- **Risk:** Manual overrides become stale.
  - **Mitigation:** Validate override slugs in tests/build checks.

- **Risk:** Over-linking to very recent posts only.
  - **Mitigation:** Keep tag weight dominant over recency in scoring.

### Why this is maintainable long-term

- Authoring remains markdown-only in `content/posts/*.md`.
- Ranking is deterministic and testable.
- Manual curation is optional and limited to high-value posts.
- No external service or CMS integration is required.
