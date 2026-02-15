# UX/UI Audit Report — alexleung.ca

Date: 2026-02-15

## Scope

This review focuses on:
- Images
- Layout and spacing
- Background treatment
- Color and contrast
- Responsive behavior
- UI primitives and interaction consistency
- Overall design language consistency

Method:
- Static code review of core layout/components/pages.
- Visual checks of desktop and mobile renders for Home, About, and Blog.

---

## Executive Summary

The site has a strong, recognizable visual identity: dark, atmospheric, and personal. The background image + glassmorphism card treatment creates a cohesive “signature look,” and typography hierarchy is generally clear.

The biggest UX risk is **interaction ambiguity**: several components share near-identical visual styles while only some are clickable. Blog cards are interactable (entire card links), but similarly styled cards in About/Credentials and Contact can appear equally “actionable” even when they are static content.

Most important recommendation: establish a simple interaction language where interactive surfaces are visually distinct from static containers across the site.

---

## Detailed Findings

## 1) Images

### What works well
- Blog cards use strong, high-contrast cover art that improves scannability and visual rhythm.
- About page portrait images feel authentic and reinforce personal brand.
- Blog card image containers preserve shape and avoid layout jump through fixed heights.

### Risks / opportunities
- Home hero has no subject image, only background + text; this can reduce immediate personal connection versus showing a face near fold.
- Some card images vary in illustration style and color temperature, making the blog grid feel less unified editorially.
- There is a global `img { width: 100% }` rule which can unintentionally stretch inline content/images in rich text or future components.

### Recommendations
1. Add a compact personal portrait thumbnail near hero intro (optional A/B test).
2. Define a simple editorial image guideline for blog covers (tone/palette/composition).
3. Replace broad global `img` reset with more scoped image utility classes.

---

## 2) Layout & Spacing

### What works well
- The site consistently uses a centered content column and clear section title/subtitle rhythm.
- Major pages follow a similar scaffold (`Title` then content sections), which aids orientation.
- Blog grid scales from 1 to 2 to 3 columns cleanly.

### Risks / opportunities
- Vertical spacing feels inconsistent between pages:
  - Home is a near-full-screen hero composition.
  - About is long-form with dense text blocks and multiple visual modules.
  - Blog uses card-heavy spacing with larger gutters.
- Left fixed social rail introduces a strong vertical anchor that can visually compete with content at some desktop widths.

### Recommendations
1. Create a page spacing scale (e.g., `page-top`, `section-gap`, `module-gap`) and apply uniformly.
2. Consider reducing visual weight/opacity of desktop social rail or offsetting it farther from content.

---

## 3) Background Treatment

### What works well
- Full-screen mountain background with dark overlay is visually distinctive and consistent site-wide.
- Overlay keeps text readable while preserving image atmosphere.

### Risks / opportunities
- The same detailed background remains behind dense long-form pages; this can introduce subtle visual noise and lower readability over long reading sessions.
- Footer dark band can feel like a hard visual cut on some pages where background still dominates above.

### Recommendations
1. Introduce contextual background intensity:
   - Home/About: current overlay strength.
   - Blog post reading view: slightly stronger overlay or solid article backdrop.
2. Use a smoother transition into footer (gradient or matching container treatment).

---

## 4) Colors & Contrast

### What works well
- Palette is coherent: navy/slate base, white text, blue accent links/actions.
- CTA button treatment on hero provides clear focal points.

### Risks / opportunities
- Some secondary text (`gray-300` / `gray-400`) over textured backgrounds may be borderline for comfortable readability, especially on mobile.
- Link color and non-link “highlighted” text can look visually similar depending on context.
- Icon treatments vary (muted sidebar icons vs brighter inline icons), which can fragment perceived hierarchy.

### Recommendations
1. Run a contrast pass for text on all backdrop contexts, especially metadata/date text on cards.
2. Reserve accent blue primarily for interactive text.
3. Define icon tone rules (decorative vs actionable) and apply consistently.

---

## 5) Responsive Design

### What works well
- Navigation collapses to mobile menu cleanly.
- Blog cards stack well on narrow screens and preserve readability.
- Footer social links appear on mobile while desktop uses fixed left rail.

### Risks / opportunities
- Mobile card heights become long with image + excerpt + spacing, causing heavy scroll depth before secondary actions.
- On mobile, dense text sections (About/Now) may read as wall-of-text due to limited visual chunking.
- Fixed header + full-bleed background may create perceived cramped top spacing on smaller devices.

### Recommendations
1. Offer shorter excerpt length on mobile blog cards.
2. Add stronger mobile content chunking (sub-card blocks or subtle separators) for long narrative sections.
3. Verify touch target spacing in mobile menu and social icons remains >= 44px.

---

## 6) Primitives & Interaction Semantics (Most Important)

### Core issue
Interactive and non-interactive surfaces often share nearly identical visual treatment (rounded corners, border, translucent fill, blur). This can create false affordances.

### Where it appears
- Blog list: full cards are clickable links.
- About Credentials: cards are mostly informational; only specific text links are clickable.
- Contact social blocks: clickable rows look like cards.
- Hero “What you'll find here” panel looks card-like but static.

### UX impact
Users may attempt to click non-interactive cards based on learned behavior from blog cards.

### Recommendations
1. Define two explicit primitives:
   - `SurfaceCard` (static content container)
   - `ActionCard` (fully clickable)
2. Give `ActionCard` distinct cues:
   - stronger hover elevation/shadow,
   - explicit arrow/icon or “Read more,”
   - focus-visible ring,
   - consistent cursor treatment.
3. Reduce hover affordance on static cards (or no hover style).
4. Optionally wrap static cards with a heading-level link only if truly navigational.

---

## 7) Design Language Consistency

### Consistent
- Strong dark/glass visual motif.
- Shared typography scale helpers and section heading conventions.
- Repeated border radius + backdrop blur aesthetic.

### Inconsistent
- Interaction semantics are not visually consistent (clickable vs static cards).
- Mixed icon styles and emphasis levels.
- Variation in spacing density between pages reduces perceived system discipline.

### Recommendation
Create a lightweight design token + primitive contract:
- `surface-static`, `surface-interactive`, `surface-reading`
- standard spacing scale for page/section/module
- action hierarchy (primary button, secondary button, inline link, card action)

---

## Prioritized Action Plan

### Quick wins (1–2 sessions)
1. Differentiate interactive vs static cards visually.
2. Improve low-contrast secondary text on translucent backgrounds.
3. Standardize hover/focus behavior for all actionable elements.

### Medium impact (3–5 sessions)
1. Introduce per-page background intensity strategy.
2. Normalize vertical rhythm across About/Now/Blog.
3. Create mobile-specific text chunking and shorter card excerpts.

### Strategic (ongoing)
1. Define and enforce primitive taxonomy (`Card`, `ActionCard`, `Panel`, `ReadingContainer`).
2. Add UX linting checklist for new pages/components (affordance, contrast, responsive behavior).

---

## Overall Assessment

- Visual identity: **Strong**
- Readability: **Good**, with contrast tuning opportunities
- Responsive behavior: **Good**, with mobile density improvements recommended
- Interaction clarity: **Needs improvement** (primary UX concern)
- Design system consistency: **Moderate**, close to strong with primitive semantics cleanup

