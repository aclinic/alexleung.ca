# Tailwind CSS v4 Migration Plan

## Goal

Upgrade this site from Tailwind CSS v3 to v4 with minimal visual regressions, while preserving the current design system tokens, animation behavior, and typography styles.

## Current State Snapshot (Repo-Specific)

- Tailwind is now pinned to v4 (`tailwindcss: ^4`) with the dedicated v4 PostCSS plugin (`@tailwindcss/postcss`).
- The project still uses `tailwind.config.js` for custom tokens (colors, transitions, keyframes, animation, and max-width) in compatibility mode.
- Global styles use the v4 CSS entrypoint (`@import "tailwindcss"`) plus `@config` to load legacy JS config values.
- The site still depends on `@tailwindcss/typography` and uses `prose` classes in the blog post page.

## Migration Strategy

Use a **2-phase rollout**:

1. **Compatibility migration** (safe baseline): move to Tailwind v4 tooling/config with no intentional visual redesign.
2. **Optimization pass** (optional): simplify config/CSS and remove obsolete utilities once behavior is stable.

This avoids mixing a major framework migration with broad refactors.

## Scope and Risk Areas

### High-risk areas to verify first

- `src/app/globals.css`
  - Entry directives and layer structure (`@tailwind ...`, `@layer base/components`) must be updated for v4 style.
  - 30 `@apply` usages need validation after migration.
- `tailwind.config.js`
  - Custom theme extensions (`accent` palette, `maxWidth.content`, `showTopText`, typography overrides) may need syntax/placement updates.
- Blog content rendering (`prose`, `prose-invert`, prose element modifiers)
  - Must preserve text contrast and code block appearance.

### Medium-risk areas

- Any class references to custom theme tokens such as `max-w-content`, `animate-showTopText`, `ring-accent-link`, and `text-hover`.
- Dark mode overlay behavior (`.dark .bg-overlay::before`) should be checked manually because it is CSS-driven rather than utility-driven.

### Low-risk areas

- Most one-off utility classes in JSX should carry over directly.

## Detailed Plan

### Phase 0 — Preparation (0.5 day)

1. Create migration branch: `chore/tailwind-v4-migration`.
2. Capture visual baseline screenshots for:
   - Home
   - About
   - Blog index
   - Blog post detail
   - Contact
3. Record current build/lint/test status.

**Commands**

```bash
yarn lint
yarn test
yarn build
```

### Phase 1 — Tooling + Config Migration (0.5–1 day)

1. Upgrade packages:
   - `tailwindcss` -> latest v4
   - add/upgrade `@tailwindcss/postcss` (v4 postcss plugin)
   - keep `@tailwindcss/typography` on latest compatible version
2. Update `postcss.config.js` to v4 plugin wiring.
3. Update global CSS entrypoint to v4 syntax and ensure layers still compile.
4. Migrate/validate theme tokens from `tailwind.config.js` (or `@theme` where appropriate) so existing class names keep working.
5. Confirm typography plugin still styles blog content equivalently.

**Validation gates**

```bash
yarn lint
yarn test
yarn build
```

### Phase 2 — Regression Testing + Fixes (0.5 day)

1. Run the app and check all key pages at mobile + desktop breakpoints.
2. Compare against baseline screenshots and fix regressions.
3. Pay special attention to:
   - button/link hover states
   - heading/body text sizing utilities
   - card surfaces and focus rings
   - blog typography and code block styling

**Validation gates**

```bash
yarn dev
# manual QA

yarn lint
yarn test
yarn build
```

### Phase 3 — Cleanup (optional, 0.5 day)

1. Remove redundant config values that are now defaults or unused.
2. Consolidate repeated utility patterns if v4 enables cleaner expressions.
3. Re-run full checks and produce a concise migration note in `README.md`.

## Definition of Done

- All pages render without noticeable regressions in light/dark contexts.
- `yarn lint`, `yarn test`, and `yarn build` pass.
- Custom design tokens still resolve correctly:
  - `accent-*` colors
  - `max-w-content`
  - `animate-showTopText`
  - `ring-accent-link`
- Blog prose styling remains readable and visually consistent.

## Rollback Plan

If major regressions appear close to release:

1. Revert migration commit(s) and redeploy previous build.
2. Keep a short list of blocking issues discovered.
3. Re-attempt migration in a follow-up branch with narrowed scope (tooling first, token refactor second).

## Execution Checklist

- [x] Create branch and baseline screenshots
- [x] Upgrade Tailwind + PostCSS integration for v4
- [x] Update global CSS entry syntax
- [x] Verify/port custom theme tokens
- [x] Verify typography plugin output on blog pages
- [x] Run lint/tests/build
- [x] Perform manual responsive QA
- [x] Finalize docs and merge

## Remaining Optional Follow-up

- [ ] Migrate selected design tokens from `tailwind.config.js` to CSS-first `@theme` blocks if that improves maintainability.
- [ ] Remove redundant transition token declarations that mirror Tailwind defaults.
- [ ] Keep visual regression screenshots up to date as styles evolve.

