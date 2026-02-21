# UX/UI Audit and Component Primitive Refactor Plan

## Scope
This audit reviews the current site UX/UI with a focus on:
- Images
- Layout
- Background treatment
- Colours
- Responsive behavior

It also identifies UI primitives that should be refactored into reusable components.

---

## 1) Images

### What works
- The About page portrait uses `next/image`, includes a meaningful alt string, and ships with a blur placeholder to reduce perceived loading latency.
- Blog cards and blog article hero images use responsive `sizes` attributes and sensible object-fit behavior.
- Open Graph/Twitter metadata references share images across the site and blog pages.

### UX/UI risks and opportunities
- **Visual ratio inconsistency across image contexts.** Blog index cards use fixed `h-48` while post pages use `aspect-[21/9]`; this can produce inconsistent visual rhythm between listing and detail views.
- **Image framing is tightly coupled to each page.** Card image wrappers, radii, spacing, and shadows are repeated and manually tuned at each usage site.
- **No explicit fallback visual when a post has no cover image.** Empty visual slots reduce scanability and create uneven card heights.

### Suggested refactor primitives
1. **`ContentImage`**
   - Single primitive for rendering page-level images with shared radius, overflow, caption support, and optional aspect ratio.
   - Props: `src`, `alt`, `ratio`, `priority`, `sizes`, `caption`, `className`.
2. **`CoverImage`**
   - Purpose-built primitive for blog card and blog post cover use cases.
   - Props: `variant: 'card' | 'hero'`, `fallbackLabel`, `hoverZoom`, `sizes`.
3. **`AvatarOrPortrait`**
   - Small wrapper for profile/author image contexts with consistent shape, border, and loading behavior.

---

## 2) Layout

### What works
- The site has strong global structure: fixed header, central content width constraints, and consistent vertical spacing around page content.
- `section-center` and typography utility classes provide a solid baseline for content rhythm.
- Hero, about, blog, and contact pages follow a coherent top-padding strategy that respects fixed header height.

### UX/UI risks and opportunities
- **Container logic is split across conventions.** Some pages use `.section-center`, others use `container mx-auto px-5`, and others hand-roll nested spacing.
- **Section scaffolding is repeated.** Title + subtitle + content spacing patterns recur with small variations.
- **Card-like surfaces exist but wrappers differ per page.** `surface-static` and `surface-interactive` help, but their surrounding spacing/composition patterns are still duplicated.

### Suggested refactor primitives
1. **`PageShell`**
   - Wraps all route pages with shared top offset, max-width mode, and consistent vertical section gaps.
   - Props: `title`, `description?`, `breadcrumbs?`, `maxWidth: 'content' | 'wide' | 'prose'`.
2. **`SectionBlock`**
   - Canonical section wrapper with optional heading/subheading and spacing presets.
   - Props: `title`, `subtitle?`, `align: 'left' | 'center'`, `spacing: 'sm' | 'md' | 'lg'`.
3. **`Stack` and `Inline` layout primitives**
   - Utility components for semantic spacing without brittle utility-string repetition.
   - Props: `gap`, `align`, `justify`, `wrap`.
4. **`Surface`**
   - Unifies `surface-static` and `surface-interactive` classes into a single API.
   - Props: `interactive`, `padding`, `elevated`, `as`, `href?`.

---

## 3) Background

### What works
- The global background image with dark overlay provides strong brand texture.
- Overlay darkness generally supports white foreground text legibility.

### UX/UI risks and opportunities
- **Potential readability variance by viewport crop.** A full-screen image with `bg-cover` changes composition as viewport changes; critical text can land on high-contrast background zones.
- **Global visual treatment is fixed for all routes.** Content-dense areas (e.g., long blog post reading) may benefit from calmer/less textured background.
- **No explicit gradient layer tokenization.** Overlay decisions are encoded inline rather than via reusable theme tokens.

### Suggested refactor primitives
1. **`AppBackground`**
   - Centralizes image source, overlay opacity, optional route variants.
   - Props: `variant: 'default' | 'reading' | 'minimal'`, `overlay`, `imagePosition`.
2. **`BackdropLayer`**
   - Reusable overlay primitive to apply predictable contrast over media backgrounds.

---

## 4) Colours

### What works
- Palette is mostly cohesive: dark surfaces + white text + blue accent links and CTAs.
- Interactive elements (links, hover states, active nav states) are visually differentiated.

### UX/UI risks and opportunities
- **Token usage is mixed between semantic and raw utility colors.** e.g., `text-gray-200/300`, `white/5`, `border-white/10` alongside custom `accent.*` tokens.
- **Contrast confidence is hard to reason about globally.** Since many text tones are ad hoc, consistency and AA contrast are difficult to guarantee over a textured background.
- **Status colors are defined but underused semantically.** `accent.success/warning/info` exist but are not yet represented as clear feedback primitives.

### Suggested refactor primitives
1. **`Text` primitive with tone scale**
   - Props: `tone: 'primary' | 'secondary' | 'muted' | 'accent' | 'inverse'`, `size`, `weight`.
2. **`Badge` and `Tag` primitives**
   - Standardize border/background/text combinations for topic tags and metadata chips.
3. **`LinkText` primitive**
   - Consolidates external/internal link visual styles and hover/focus behavior.

---

## 5) Responsive Design

### What works
- Mobile nav includes overlay, body-scroll lock, and animated transitions.
- Typography includes many responsive size ramps.
- Grid behavior on blog index and about sections adapts across breakpoints.

### UX/UI risks and opportunities
- **Breakpoint strategy is partly custom and partly framework defaults.** (`500px`, `768px`, `992px`, `lg`) can create subtle jumps and maintenance complexity.
- **Long-form text blocks rely on manual class composition.** This can drift in readability (line length, line height, spacing) between pages.
- **Fixed social sidebar appears only at large screens.** Good for decluttering mobile, but a cohesive tablet treatment may be missing.

### Suggested refactor primitives
1. **`ResponsiveContainer`**
   - Canonical width behavior with named variants for prose, content, and wide grids.
2. **`NavMenu` primitives**
   - `DesktopNav`, `MobileNavDrawer`, and shared `NavItem` for state styling consistency.
3. **`ProseContent` wrapper**
   - Reusable long-form readability wrapper (measure, heading rhythm, link styling).
4. **`IconTextRow`**
   - For repeated emoji/icon + heading + paragraph rows used in about/now sections.

---

## Priority Refactor Roadmap

### Phase 1 (highest leverage)
1. `PageShell`
2. `ResponsiveContainer`
3. `Surface`
4. `CoverImage`

### Phase 2 (implemented)
5. ✅ `SectionBlock`
6. ✅ `Tag` / `Badge`
7. ✅ `LinkText`
8. ✅ `ProseContent`

#### Phase 2 implementation notes
- Added reusable `SectionBlock` scaffolding and applied it to About and Now route content sections.
- Introduced `Tag`/`Badge` primitives to standardize metadata and status chips across blog and now-page UI.
- Added `LinkText` as the canonical link-style primitive and routed `ExternalLink` through it for style consistency.
- Added `ProseContent` wrapper and migrated blog-post body rendering and now-page footer prose to shared typography defaults.

### Phase 3 (implemented)
9. ✅ `AppBackground`
10. ✅ `IconTextRow`
11. ✅ `NavMenu` split primitives

#### Phase 3 implementation notes
- Added `AppBackground` to centralize global background styling while preserving the existing global overlay behavior.
- Introduced `IconTextRow` and replaced duplicated emoji/title/content row markup in About and Now sections with a shared primitive.
- Split header navigation into `DesktopNav` and `MobileNavDrawer` via a shared `NavItem`, preserving interaction behavior while reducing duplicated link-state styling logic.

---

## Expected Outcomes
- Faster page implementation with fewer repeated utility class strings.
- More consistent visual hierarchy and spacing between routes.
- Better readability control over textured backgrounds.
- Cleaner responsive behavior with fewer breakpoint edge cases.
- Easier design-system evolution (palette, spacing, and interaction updates in one place).
