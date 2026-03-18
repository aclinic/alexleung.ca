# AGENTS.md

This file provides unified guidance for all AI agents (Claude, Gemini, etc.) when working with code in this repository.

## Project Overview

Personal portfolio website for Alex Leung. Multi-page static-export site for GitHub Pages deployment. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Package Manager

**This project uses Yarn.** Do not use `npm` or `pnpm`.
Always use `yarn` for installing dependencies and running scripts.

### Yarn 4 / Corepack requirements

- The repo pins Yarn via `packageManager` in `package.json` (`yarn@4.13.0`).
- Run `corepack enable` once per machine to activate Corepack shims.
- Run `corepack install` in the repo to fetch the exact pinned Yarn version.
- In CI, enable Corepack before `yarn install` to avoid falling back to global Yarn 1.x.

## Development Commands

```bash
yarn dev              # Start development server (port 3000)
yarn prepare          # Configure repo Git hooks path (.githooks)
yarn image:variants   # Generate image variants and refresh image variant manifest
yarn image:variants:stage  # Generate variants for staged changes and git-add outputs
yarn build            # Build static export to out/ (runs prebuild)
yarn lint             # Run ESLint and Prettier checks
yarn lint:fix         # Auto-fix lint issues
yarn test             # Run Jest tests
yarn test:e2e         # Run Playwright smoke tests in Docker
yarn test:e2e:visual  # Run Playwright visual regression tests in Docker
yarn test:e2e:visual:update  # Regenerate Playwright visual snapshots in Docker
yarn typecheck        # Run TypeScript type checking (no emit)
yarn test:watch       # Run tests in watch mode
yarn test:coverage    # Run tests with coverage report
yarn perf:lighthouse  # Run Lighthouse CI assertions
yarn deploy           # Build and deploy to GitHub Pages
```

## Architecture

### Static Export Configuration

- `output: 'export'` in `next.config.mjs` generates static files to `out/`
- `trailingSlash: true` for GitHub Pages compatibility
- `.nojekyll` in public/ prevents Jekyll processing of `_next/` assets
- Images are unoptimized (required for static export)
- Internal site-route links should use trailing slashes to match the export shape and avoid unnecessary GitHub Pages redirects (for example, `/about/` and `/blog/post-slug/`, not `/about` or `/blog/post-slug`)
- Do not add trailing slashes to file-like endpoints or assets such as `/feed.xml`, `/robots.txt`, `/sitemap.xml`, or `/assets/...`

### Component Organization

- `src/app/` - Next.js App Router pages with route-specific `_components/` subdirectories
- `src/components/` - Shared components (Header, Footer, SocialLinks, etc.)
- `src/constants/` - Data files (skills.ts, socialLinks.tsx)

### Image Variant Workflow

- Build-time script `scripts/generate-image-variants.mjs` generates responsive variants and manifest metadata:
  - cover variants: `*-card-sm.webp`, `*-card.webp`, `*-hero-sm.webp`, `*-hero.webp`
  - inline markdown variants: `*-content-sm.webp`, `*-content.webp`
  - static asset variants for background and about portrait
  - manifest: `src/generated/imageVariantManifest.json` (profiles + variant paths + dimensions)
- `yarn build` runs `prebuild`, which runs `yarn image:variants`.
- `src/components/BlogPostCard.tsx` and `src/app/blog/[slug]/page.tsx` resolve cover variants from manifest profiles.
- `src/lib/markdownToHtml.ts` resolves inline image variants from manifest profiles.
- Pre-commit hook `.githooks/pre-commit` runs `yarn image:variants:stage` so generated variants and manifest stay in sync with staged content/image changes.
- Runtime has hard-failure checks for missing required manifest profiles (`profiles.cover.card`, `profiles.cover.hero`, `profiles.inlineContent`).

### Adding Images (Agent Guidance)

- Always add source images under `public/assets/...`.
- For blog covers: update frontmatter `coverImage` in `content/posts/*.md`.
- For inline blog images: add standard markdown image references.
- After any source image addition/update, run `yarn image:variants` (or `yarn image:variants:stage` when preparing a commit).
- Ensure commits include:
  - updated/generated files in `public/assets/...`
  - updated `src/generated/imageVariantManifest.json`

### SEO and Structured Data

- Comprehensive metadata defined in `src/app/layout.tsx`
- JSON-LD Person schema with `react-schemaorg` and `schema-dts`
- Open Graph and Twitter card metadata

### Testing

- Jest with React Testing Library
- Playwright E2E coverage runs in Docker via `docker compose`
- Jest tests live in `__tests__/` subdirectories alongside source files
- Playwright tests live under `playwright/tests/` with shared setup in `playwright.config.ts` and `playwright/fixtures/`
- `yarn test:e2e` covers smoke flows across desktop/mobile Chrome and Safari/WebKit
- `yarn test:e2e:visual` covers desktop and mobile Chromium visual baselines
- 70% coverage threshold enforced
- Module alias `@/` maps to `src/`

### Typography and Prose Guardrails (Agent Guidance)

- Reference audit: `docs/typography-audit.md`.
- Prefer semantic typography utilities for body/headline copy:
  - body: `text-body-sm`, `text-body`, `text-body-lg`
  - headings: `text-heading-sm`, `text-heading`
  - hero: `text-hero-subtitle`, `text-hero-title`, `text-hero-description`
- Do not use `text-md` (not a Tailwind default utility).
- `ProseContent` includes `md:prose-lg` by default. For small notes/footers, explicitly set both `prose-sm` and `md:prose-sm`.
- When editing typography classes, verify rendered size at both mobile and `md`+ breakpoints before finalizing.
