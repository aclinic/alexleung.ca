# alexleung.ca

Personal website and writing hub for Alex Leung. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

![Homepage screenshot](./public/assets/screenshot.png)

## Installation & Setup

1. Clone the repo.
2. Use the correct Node.js version:

   ```bash
   nvm use
   ```

3. Enable Corepack and install the pinned Yarn version:

   ```bash
   corepack enable
   corepack install
   ```

4. Install dependencies:

   ```bash
   yarn install
   ```

5. Start the development server:

   ```bash
   yarn dev
   ```

   App runs at `http://localhost:3000`.

## Development Commands

- `yarn dev` — start development server
- `yarn prepare` — configure repo Git hooks path (`.githooks`)
- `yarn image:variants` — generate image variants and refresh image variant manifest
- `yarn image:variants:stage` — generate and stage variants for staged post/image changes
- `yarn build` — build static export (`out/`) with analytics disabled by default (runs `prebuild`)
- `yarn build:prod` — build static export (`out/`) with analytics enabled for a production deploy
- `yarn lint` — run ESLint + Prettier checks
- `yarn lint:fix` — auto-fix lint/format issues
- `yarn test` — run Jest tests
- `yarn test:e2e` — run Playwright smoke tests in Docker against the exported site
- `yarn test:e2e:visual` — run Playwright visual regression tests in Docker
- `yarn test:e2e:visual:update` — regenerate Playwright visual snapshots in Docker
- `yarn typecheck` — run TypeScript check (`tsc --noEmit`)
- `yarn test:watch` — run tests in watch mode
- `yarn test:coverage` — run tests with coverage
- `yarn perf:lighthouse` — run Lighthouse CI against static export (`out/`)
- `yarn deploy` — build and deploy `out/` to GitHub Pages

> This project targets static export deployment, so there is no runtime Next.js production server command.

Google Analytics is gated behind `NEXT_PUBLIC_ENABLE_ANALYTICS=true`, so analytics stays off for ordinary `yarn build`, CI verification builds, and Lighthouse runs unless a production deploy explicitly opts in. Both the GitHub Actions deploy workflow and the manual `yarn deploy` flow enable analytics via `yarn build:prod`. Playwright does not rely on this flag because its shared fixture aborts requests to Google Tag Manager and Google Analytics even when tests target the live site.

## End-to-End Testing

Playwright runs in the official Playwright Docker image by default via `docker compose`, and the suite targets the static export rather than `yarn dev`. That keeps browser/system dependencies pinned and matches the GitHub Pages deployment model without the Next.js dev indicator.

The smoke suite currently runs across desktop Chrome, desktop Safari/WebKit, Android Chrome, and Mobile Safari. The visual suite runs on desktop Chromium plus a single mobile Chromium lane so mobile layout regressions are covered without exploding the snapshot matrix.

1. Run smoke tests against a locally built export:

   ```bash
   yarn test:e2e
   ```

2. Run visual regression tests or intentionally refresh their snapshots:

   ```bash
   yarn test:e2e:visual
   yarn test:e2e:visual:update
   ```

3. To retarget the same smoke suite at a deployed site, provide `PLAYWRIGHT_BASE_URL`:

   ```bash
   PLAYWRIGHT_BASE_URL=https://alexleung.ca yarn test:e2e
   ```

## Codespaces: Lighthouse Setup

In GitHub Codespaces, `yarn perf:lighthouse` may fail by default because:

- no Chrome binary is preinstalled in the container
- required shared libraries for headless Chrome are missing

Use this one-time setup:

```bash
sudo apt-get install -y --no-install-recommends \
  libatk1.0-0t64 libatk-bridge2.0-0t64 libcups2t64 libxkbcommon0 \
  libatspi2.0-0t64 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 \
  libgbm1 libasound2t64

yarn dlx @puppeteer/browsers install chrome@stable --path ./.cache/puppeteer-browsers
export CHROME_PATH="$(ls -1d .cache/puppeteer-browsers/chrome/linux-*/chrome-linux64/chrome | tail -n1)"
```

Then run:

```bash
yarn build
yarn perf:lighthouse
```

If you want `CHROME_PATH` to persist across terminals in Codespaces, add the export line to `~/.bashrc`.

## Image Variant Automation

- Variant generator script:
  - `scripts/generate-image-variants.mjs`
- Generated output:
  - responsive cover variants: `*-card-sm.webp`, `*-card.webp`, `*-hero-sm.webp`, `*-hero.webp`
  - responsive inline markdown image variants: `*-content-sm.webp`, `*-content.webp`
  - static asset variants for global background and about portrait
  - manifest: `src/generated/imageVariantManifest.json` (profiles + variant paths + dimensions)
- Build integration:
  - `yarn build` runs `prebuild`, which runs `yarn image:variants`
- Commit integration:
  - `.githooks/pre-commit` runs `yarn image:variants:stage` to keep variants in sync with staged changes
- Runtime usage:
  - `src/components/BlogPostCard.tsx` and `src/app/blog/[slug]/page.tsx` read cover profiles from the manifest
  - `src/lib/markdownToHtml.ts` reads inline image profiles from the manifest

### Adding Images (Human Workflow)

1. Add the source image under `public/assets/...`.
2. If it is a blog post cover, set `coverImage` in that post frontmatter.
3. If it is an inline blog image, reference it in markdown using a normal image link.
4. Run `yarn image:variants` (or rely on pre-commit: `yarn image:variants:stage`).
5. Commit both the source image and generated outputs:
   - variant files under `public/assets/...`
   - `src/generated/imageVariantManifest.json`

If `profiles.cover` or `profiles.inlineContent` is missing in the manifest, runtime now fails fast by design.

## Architecture Snapshot

- **Framework**: Next.js App Router + React + TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: static export (`output: 'export'`) for GitHub Pages
- **SEO**: centralized metadata + JSON-LD helpers in `src/lib/seo`
- **Content**: Markdown posts parsed and validated at build time

### URL Convention

- Site routes use trailing slashes to match `trailingSlash: true` and the GitHub Pages static export shape.
- Prefer `/about/` and `/blog/post-slug/` over slashless internal links.
- Keep internal links, canonical URLs, sitemap entries, and tests aligned with that convention.
- Do not add trailing slashes to file-like endpoints or assets such as `/feed.xml`, `/robots.txt`, `/sitemap.xml`, or `/assets/...`.

### High-level Structure

```bash
src/
├── app/         # Route entrypoints and route-scoped components
├── components/  # Shared UI components
├── constants/   # Static content/config constants
└── lib/         # Blog/content loading + SEO + markdown pipeline
```

## Documentation Map

- `docs/README.md` — docs directory guide and consolidation notes
- `docs/architecture-seo-status.md` — canonical architecture + SEO status snapshot
- `docs/codespaces.md` — detailed Codespaces troubleshooting for Lighthouse prerequisites
- `docs/playwright-testing-design.md` — current Playwright E2E and visual testing setup
- `docs/typography-audit.md` — typography findings and implementation guardrails

## Licensing

Split-license model:

- Code and configuration: [MIT License](./LICENSE)
- Content and media assets: [CC BY-NC 4.0](./LICENSE-CONTENT)

If a file contains a different license notice, that notice takes precedence.
