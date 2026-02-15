# UX/UI Audit Report

## Scope
This audit reviews the current portfolio site experience across desktop and mobile, with specific focus on:
- images
- layout
- background treatment
- colour usage and contrast
- responsive design
- primitive patterns (especially card affordances/clickability)
- overall consistency of design language

Pages reviewed: Home, About, Blog index, and key cross-site primitives (header, footer, section titles, card patterns).

---

## Executive Summary
The site has a cohesive **moody, glassmorphism-over-photo** aesthetic and a generally strong baseline for readability and brand tone. The strongest qualities are:
- consistent typography and spacing rhythm
- clear hierarchy in hero and section headings
- good mobile adaptation of layout stacks
- polished nav/header behavior

The biggest UX risks are:
1. **Affordance inconsistency for cards** (some cards are clickable and some are static, but styles are very similar).
2. **Background image competition with content** on content-heavy pages.
3. **Visual weight accumulation** (many translucent panels over a detailed full-screen image), which can reduce scanability.
4. **Link discoverability variance** (some links are obvious buttons; others are plain text links inside dense copy).

---

## Findings by Area

### 1) Images

#### What works
- About page portrait images feel personal and support trust/credibility.
- Blog covers are high quality and create strong visual anchors for each post card.
- Hero background image establishes a consistent emotional tone.

#### UX risks
- The same full-screen mountain background is used behind all routes, including dense text pages. This can make long-form reading more tiring than a flatter background would.
- About page mixes content and portraits in a way that works on desktop, but on mobile the image insertion between narrative blocks and technical lists can feel abrupt.
- Blog cover cards rely heavily on image + title hierarchy, but card body text lengths vary and create inconsistent card heights/scan rhythm.

#### Recommendations
- Keep image-led style, but reduce background detail impact for reading-heavy routes (Blog post pages, About sections) via stronger route-specific overlays or neutralized background mode.
- Standardize blog excerpt length (e.g., clamp to 2–3 lines) for tighter visual rhythm.
- Consider route-level background variants: high-drama image for Home, subtler treatment for content routes.

---

### 2) Layout

#### What works
- Header is persistent and predictable.
- Section title/subtitle system creates clear structure.
- About desktop split layout (text + images) communicates story + identity well.
- Blog grid scales appropriately across breakpoints.

#### UX risks
- Home page leaves a large amount of unused vertical space on some viewport combinations; the value proposition appears lower in the fold than it could.
- About page contains many dense sections without a sticky local table of contents or quick-jump navigation.
- Footer and fixed social rail overlap with visually busy image regions; icons are sometimes less discoverable than intended.

#### Recommendations
- Tighten vertical rhythm on Home so key actions and positioning statement appear earlier, especially on medium-height laptops.
- Add optional in-page anchor chips on About (Background, Technical Interests, Credentials) to improve scanning.
- Increase minimum contrast/visibility of fixed social icons (or move them into a clearer container).

---

### 3) Background treatment

#### What works
- Single background theme creates strong identity and continuity.
- Dark overlay generally keeps white text legible.

#### UX risks
- Detailed scenic textures can reduce text legibility in lighter areas despite overlay.
- Combined effect of background + blur cards + translucent borders can create a "foggy" look on long pages.
- Footer area can appear disconnected due to darker solid band vs translucent content above.

#### Recommendations
- Introduce route-level backdrop intensity tokens, e.g.:
  - Home: overlay 50%
  - About/Blog index: overlay 60–65%
  - Blog post detail: overlay 70% or near-solid reading canvas
- Consider subtle vertical gradient overlays behind long sections for better readability progression.

---

### 4) Colours and contrast

#### What works
- White text on dark overlays is generally readable.
- Blue accent colour usage for primary actions and links is recognizable.
- Active/inactive navigation states are clear enough on desktop.

#### UX risks
- Some body copy appears gray-on-gray over variable image luminance, which can dip below comfortable contrast in practice.
- Link styling inside paragraphs depends heavily on hue only, with limited non-colour affordance.
- Multiple grays across nav, content, and metadata can flatten hierarchy.

#### Recommendations
- Increase baseline body text luminance slightly on image-heavy pages.
- Add stronger underlines on inline links by default (or on hover + focus with higher distinction).
- Use a tighter semantic color scale (e.g., text-primary, text-secondary, text-muted) mapped consistently across components.

---

### 5) Responsive design

#### What works
- Mobile menu behavior is solid (overlay, transitions, lock-scroll).
- Blog cards stack cleanly on small screens.
- About page sections collapse predictably and remain readable.

#### UX risks
- Home hero can feel vertically imbalanced on mobile due to large top visual area before content appears.
- Touch target consistency varies (e.g., large CTA buttons vs smaller text links inside content blocks).
- On small screens, very long content sections (Now/About) could benefit from stronger subsection separation and quick navigation aids.

#### Recommendations
- Reduce top padding in hero on narrow viewports to bring headline and CTA up.
- Ensure all interactive text links in dense content have adequate touch spacing.
- Add sticky “Back to top” or mini anchor nav for long pages.

---

### 6) Primitive and affordance consistency (important)

#### Core issue
The site uses a strong **card-like visual language** (rounded corners, border, blur, translucent background) for many elements:
- Blog post teasers (clickable cards)
- Credentials cards (non-clickable containers, with links inside)
- Hero “What you’ll find here” panel (non-clickable)
- Social connection pills (clickable)

Because visual treatments are similar, users may infer clickability inconsistently.

#### Why this matters
When a visual primitive maps to mixed interaction behavior, users expend cognitive effort testing what is interactive. This slows navigation and lowers confidence.

#### Recommendations (high priority)
- Define two explicit primitives:
  1. **Interactive Card** (hover elevation/scale, pointer cursor, focus ring, subtle movement)
  2. **Content Panel** (no hover affordance, default cursor)
- Apply these consistently so “looks clickable” reliably means “is clickable.”
- For static cards that contain internal links, make links visually explicit and avoid full-card hover styles.
- Add keyboard-visible focus states to all interactive card-like components.

---

## Design Language Consistency Assessment

### Consistent
- Typographic tone (bold uppercase identity + clean sans body)
- Dark cinematic mood
- Section heading pattern
- Rounded/translucent surfaces

### Inconsistent / needs refinement
- Interaction semantics of card-like surfaces
- Readability baseline between route types (hero vs reading pages)
- Link treatment consistency (button-like CTAs are strong; inline link affordance weaker)

Overall: **the visual language is coherent, but interaction language is not fully systematized yet.**

---

## Prioritized Action Plan

### P0 (Do first)
1. Split card primitives into explicit interactive vs static variants and apply consistently.
2. Improve text readability on dense pages with stronger route-specific backdrop treatment.
3. Standardize inline link affordance (underline/focus/hover behavior).

### P1
1. Normalize blog card content heights (excerpt clamping).
2. Improve social icon contrast and discoverability against variable backgrounds.
3. Tighten home hero vertical spacing for medium and mobile viewports.

### P2
1. Add local anchor navigation on long pages (About/Now).
2. Introduce a semantic design token scale for text and surfaces to reduce one-off class variation.

---

## Success Metrics to Validate Improvements
- Increased blog click-through rate from index page.
- Reduced bounce on About page (better scanability).
- Better interaction confidence in session recordings (fewer hover/tap probes on non-interactive cards).
- Accessibility checks: improved contrast compliance and visible focus indicators across components.

---

## Closing Notes
The site already has a strong identity and thoughtful information architecture. With a relatively small set of system-level refinements—especially around **interactive primitives and readability modulation by route**—it can feel significantly more polished and intuitive without losing its current visual character.
