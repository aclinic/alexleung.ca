# Playwright Testing Design

## Goals

- Run browser tests hermetically, with Docker as the default execution environment.
- Cover critical smoke flows that fail when core functionality regresses.
- Add visual regression (screenshot) coverage with a deterministic baseline update workflow.
- Support two targets with the same test suite:
  - Local app booted by Playwright (`baseURL` from a local web server)
  - Live deployed site (`baseURL` from environment variable)

## Proposed Test Topology

### Test categories

- **Smoke tests** (`tests/smoke/*.spec.ts`)
  - Fast, interaction-focused checks.
  - Assert key page availability, navigation, and basic user interactions.
- **Visual tests** (`tests/visual/*.spec.ts`)
  - Deterministic screenshots for high-value pages/sections.
  - Tuned for static export behavior and stable rendering.

### Projects in Playwright config

Use Playwright projects to separate risk profiles:

- `chromium-smoke`
  - Always run in CI (PR + main).
- `chromium-visual`
  - Run in CI for PRs touching UI and on `main` after deploy completes.
- Optional: `webkit-smoke`, `firefox-smoke`
  - Run only if needed for cross-browser confidence (not required for baseline rollout).

## Hermetic Execution Design

### Docker-first approach

Use the official Playwright image to lock browser and system dependency versions.

- Base image: `mcr.microsoft.com/playwright:v1.55.0-jammy` (pin to a specific version).
- Mount repo into container and run Yarn commands inside the container.
- Run as a fixed timezone/locale:
  - `TZ=UTC`
  - `LANG=C.UTF-8`

### Recommended scripts

Add scripts that are container-friendly and consistent between local and CI:

- `test:e2e`: run smoke tests against local app
- `test:e2e:visual`: run visual tests against local app
- `test:e2e:update`: regenerate visual snapshots
- `test:e2e:live`: run smoke tests against live URL

Command model (conceptual):

- Local target: Playwright `webServer` serves a production build (`yarn build` + static file server for `out/`) to keep runs deterministic.
- Live target: skip `webServer`; set `PLAYWRIGHT_BASE_URL=https://...`.

### Localhost UI cleanliness (no Next.js dev badge)

For localhost E2E runs, avoid `yarn dev` by default so the Next.js dev indicator does not appear in the bottom-left corner.

- Preferred: test the exported site by serving `out/` after `yarn build`.
- Fallback (if dev mode is ever required): set `devIndicators: false` in `next.config.mjs` for test-specific runs.

## Retargeting Strategy (local vs live)

### Configuration contract

In `playwright.config.ts`:

- `use.baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000'`
- Conditionally enable `webServer` only when `PLAYWRIGHT_BASE_URL` is unset.
- Set conservative defaults for deterministic rendering:
  - fixed viewport
  - reduced motion emulation
  - trace/video on retry only

This gives one command surface with environment-based targeting.

## Smoke Test Plan

Keep smoke suite intentionally small and reliable:

1. **Home page render + hero visibility**
   - Assert title/hero content visible.
2. **Primary nav routes work**
   - Click to `About`, `Blog`, `Contact` and assert headings.
3. **Blog list to blog detail navigation**
   - Open first post card, assert article title and date metadata rendered.
4. **Contact call-to-action interaction**
   - Validate email/social link visibility and expected hrefs.
5. **404 route behavior**
   - Navigate to non-existent route and assert not-found UI.

These tests should fail loudly on routing, rendering, or content wiring regressions.

## Visual Regression Plan

### What to snapshot

Focus on stable, high-signal UI:

- Home hero section
- Blog index top fold
- Single blog post header + prose container
- About page intro section

Avoid highly volatile regions (timestamps, feeds, third-party embeds).

### Stability guardrails

- Freeze animations via CSS override in tests.
- Wait for web fonts and key images before snapshot.
- Mask dynamic nodes if needed.
- Prefer element screenshots over full-page where possible.

### Baseline regeneration workflow

- Dev command: `yarn test:e2e:update` regenerates snapshots intentionally.
- Policy:
  - Snapshot changes must be reviewed in PR diffs.
  - Require short rationale in PR description for baseline updates.

## CI/CD Integration Design

### Pull requests

- Run `chromium-smoke` always.
- Run `chromium-visual` when files in `src/`, `public/assets/`, or `content/posts/` change.
- Upload Playwright HTML report + trace artifacts on failure.

### Main (post-deploy)

- Run smoke + visual against the live deployed URL once the production deploy job finishes.
- Keep this as a deploy-gated workflow rather than a scheduled nightly job.

## File Layout Proposal

```text
playwright.config.ts
playwright/
  global.setup.ts
  fixtures/
    stableRendering.ts
  tests/
    smoke/
      navigation.spec.ts
      blog-flow.spec.ts
    visual/
      home.visual.spec.ts
      blog.visual.spec.ts
```

## Rollout Plan

1. **Phase 1: Bootstrap**
   - Add Playwright deps/config and Docker run command.
   - Add 2-3 smoke tests.
2. **Phase 2: Visuals**
   - Add first snapshot set and update workflow.
3. **Phase 3: CI hardening**
   - Add conditional visual runs, artifact publishing, and post-deploy live checks.
4. **Phase 4: Live-site checks**
   - Enforce live smoke + visual checks after production deploy completes.

## Acceptance Criteria

- Tests run reproducibly in Docker on any machine.
- Same suite can target local or live URL without test code changes.
- Smoke tests catch route/interactions regressions in under 3 minutes.
- Visual tests provide intentional, reviewable snapshot updates.
