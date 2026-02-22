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
- `yarn build` — build static export (`out/`)
- `yarn lint` — run ESLint + Prettier checks
- `yarn lint:fix` — auto-fix lint/format issues
- `yarn test` — run Jest tests
- `yarn typecheck` — run TypeScript check (`tsc --noEmit`)
- `yarn test:watch` — run tests in watch mode
- `yarn test:coverage` — run tests with coverage
- `yarn deploy` — build and deploy `out/` to GitHub Pages

> This project targets static export deployment, so there is no runtime Next.js production server command.

## Architecture Snapshot

- **Framework**: Next.js App Router + React + TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: static export (`output: 'export'`) for GitHub Pages
- **SEO**: centralized metadata + JSON-LD helpers in `src/lib/seo`
- **Content**: Markdown posts parsed and validated at build time

### High-level Structure

```bash
src/
├── app/         # Route entrypoints and route-scoped components
├── components/  # Shared UI components
├── constants/   # Static content/config constants
└── lib/         # Blog/content loading + SEO + markdown pipeline
```

## Documentation Map

- `docs/README.md` — docs directory guide
- `docs/technical-architecture-audit.md` — current architecture status
- `docs/seo-audit.md` — current SEO status and backlog
- `docs/content-ideas.md` — content/page idea backlog

## Licensing

Split-license model:

- Code and configuration: [MIT License](./LICENSE)
- Content and media assets: [CC BY-NC 4.0](./LICENSE-CONTENT)

If a file contains a different license notice, that notice takes precedence.
