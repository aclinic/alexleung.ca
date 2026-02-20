# alexleung.ca

Personal website and writing hub for Alex Leung. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS. The site focuses on high-level professional background, current interests, and long-form technical writing.

![Homepage screenshot](./public/assets/screenshot.png)

## :construction: Installation & Setup

1. Clone this repo

1. Use the correct Node.js version

   ```bash
   nvm use
   ```

1. Enable Corepack (required for Yarn 4)

   ```bash
   corepack enable
   corepack install
   ```

1. Install dependencies

   ```bash
   yarn install
   ```

1. Start the development server

   ```bash
   yarn dev
   ```

   The site will be available at `http://localhost:3000`

## :gear: Development Commands

- `yarn dev` - Start development server on port 3000
- `yarn build` - Build production static export
- `yarn lint` - Run ESLint and Prettier checks
- `yarn lint:fix` - Auto-fix lint and format issues
- `yarn test` - Run Jest test suite
- `yarn test:watch` - Run Jest in watch mode
- `yarn test:coverage` - Run tests with coverage report
- `yarn deploy` - Build and deploy to GitHub Pages

> Note: there is no separate `yarn start` script because this project targets static export deployment.

## :ship: Deployment

The site is automatically deployed to GitHub Pages using static export:

```bash
yarn deploy
```

This command builds the site and deploys it to GitHub Pages via the `gh-pages` package.

## :gear: Architecture

Modern Next.js application optimized for static deployment:

- **Framework**: Next.js 16 with React 19, TypeScript, and App Router
- **Styling**: Tailwind CSS v4 with custom themes and responsive design
- **Deployment**: Static export (`output: 'export'`) for GitHub Pages
- **SEO**: Metadata, Open Graph, Twitter cards, JSON-LD structured data
- **Content**: Markdown blog posts parsed with `gray-matter`, `remark`, and `rehype`
- **Build Output**: Static files generated in the `out/` directory

### Key Features

- **Clear top-level pages**: Home, About, Now, Blog, and Contact
- **Blog-first content depth**: Long-form posts with syntax highlighting and breadcrumbs
- **Professional context**: High-level credentials and technical interests
- **Comprehensive SEO**: Structured data for person and website schemas
- **Responsive design**: Mobile-first approach with Tailwind breakpoints
- **Social integration**: Links to LinkedIn, GitHub, Twitter/X, Bluesky, and Instagram

### GitHub Pages Configuration

The `.nojekyll` file in `public/` prevents Jekyll processing, allowing Next.js `_next/` assets to be served correctly.

## :clipboard: Project Structure

```bash
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with comprehensive SEO and JSON-LD
│   ├── page.tsx             # Main page component orchestration
│   ├── about/               # About route and route-specific components
│   ├── now/                 # Now page
│   ├── blog/                # Blog index and dynamic post route
│   ├── contact/             # Contact route and route-specific components
│   ├── not-found.tsx        # 404 page
│   └── sitemap.ts           # Dynamic sitemap generation
│
├── components/
│   ├── Hero.tsx             # Homepage hero section and primary CTAs
│   ├── Header.tsx           # Desktop/mobile navigation
│   ├── Footer.tsx           # Site footer
│   ├── SocialLinks.tsx      # Social media links sidebar
│   ├── CTAButton.tsx        # Reusable call-to-action button
│   ├── Card.tsx             # Shared card container
│   └── JsonLdBreadcrumbs.tsx # Blog breadcrumb structured data
│
├── lib/
│   ├── blogApi.ts           # Blog post loading and metadata extraction
│   └── markdownToHtml.ts    # Markdown-to-HTML pipeline
│
└── constants/
    ├── skills.ts            # Technical interests/skills data
    ├── socialLinks.tsx      # Social platform configurations
    └── index.ts             # Shared constants (e.g., base URL)
```

## :open_file_folder: Documentation Map

- `docs/README.md` - Documentation directory guide and document index
- `docs/technical-architecture-audit.md` - Architecture findings and current status
- `docs/seo-audit.md` - SEO findings and recommendations
- `docs/content-ideas.md` - Future content and page ideas

## :package: Dependencies

### Production

- `next`: ^16.1.1 - React framework with App Router
- `react`: ^19.2.3 - UI library
- `react-dom`: ^19.2.3 - React DOM bindings
- `react-icons`: ^5.3.0 - Icon library (FontAwesome 6)
- `react-schemaorg`: ^2.0.0 - JSON-LD structured data
- `schema-dts`: ^1.1.5 - Schema.org TypeScript definitions
- `gray-matter`: ^4.0.3 - Frontmatter parser for blog posts
- `remark` / `rehype`: Markdown processing and syntax highlighting pipeline

### Development

- `typescript`: ^5.6.3 - Type checking
- `tailwindcss`: ^4 - Utility-first CSS framework
- `@tailwindcss/postcss`: ^4 - Tailwind v4 PostCSS plugin
- `@tailwindcss/typography`: ^0.5.19 - Rich typographic defaults for blog content
- `eslint`: ^9.32.0 - Code linting
- `jest`: ^30.2.0 - Unit and component testing
- `gh-pages`: ^6.2.0 - GitHub Pages deployment


## :art: Tailwind CSS v4 Migration Notes

The codebase is now running on Tailwind CSS v4 with the dedicated PostCSS plugin and compatibility config loading from `src/app/globals.css`.

- v4 packages are installed and pinned via Yarn lockfile.
- PostCSS now uses `@tailwindcss/postcss`.
- Existing custom tokens and utilities are currently preserved through `tailwind.config.js` to minimize visual regressions.

Future optional cleanup: migrate design tokens from JS config into CSS-first `@theme` blocks where it provides a clear maintenance benefit.

## :memo: Maintenance Notes

- Keep long-form planning and audits in `docs/` rather than this root README.
- Update audit documents whenever significant architecture or SEO changes ship.

## :balance_scale: Licensing

This repository uses a split-license model:

- **Code and configuration** are licensed under the [MIT License](./LICENSE).
- **Content and media assets** (including writing, page copy, and images) are licensed under [CC BY-NC 4.0](./LICENSE-CONTENT).

If a file includes a different license notice, that notice takes precedence for that file.

