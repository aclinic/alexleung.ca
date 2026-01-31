# AGENTS.md

This file provides unified guidance for all AI agents (Claude, Gemini, etc.) when working with code in this repository.

## Project Overview

Personal portfolio website for Alex Leung. Single-page application with static export for GitHub Pages deployment. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Development Commands

```bash
yarn dev              # Start development server (port 3000)
yarn build            # Build static export to out/
yarn start            # Serve production build locally
yarn lint             # Run ESLint and Prettier checks
yarn lint:fix         # Auto-fix lint issues
yarn test             # Run Jest tests
yarn test:watch       # Run tests in watch mode
yarn test:coverage    # Run tests with coverage report
yarn deploy           # Build and deploy to GitHub Pages
```

## Architecture

### Static Export Configuration

- `output: 'export'` in next.config.js generates static files to `out/`
- `trailingSlash: true` for GitHub Pages compatibility
- `.nojekyll` in public/ prevents Jekyll processing of `_next/` assets
- Images are unoptimized (required for static export)

### Component Organization

- `src/app/` - Next.js App Router pages with route-specific `_components/` subdirectories
- `src/components/` - Shared components (Header, Footer, SocialLinks, etc.)
- `src/constants/` - Data files (skills.ts, socialLinks.tsx)

### SEO and Structured Data

- Comprehensive metadata defined in `src/app/layout.tsx`
- JSON-LD Person schema with `react-schemaorg` and `schema-dts`
- Open Graph and Twitter card metadata

### Testing

- Jest with React Testing Library
- Tests located in `__tests__/` subdirectories alongside source files
- 70% coverage threshold enforced
- Module alias `@/` maps to `src/`
