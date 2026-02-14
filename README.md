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

## :ship: Deployment

The site is automatically deployed to GitHub Pages using static export:

```bash
yarn deploy
```

This command builds the site and deploys it to GitHub Pages via the `gh-pages` package.

## :gear: Architecture

Modern Next.js application optimized for static deployment:

- **Framework**: Next.js 16 with React 19, TypeScript, and App Router
- **Styling**: Tailwind CSS with custom themes and responsive design
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

## :memo: Current Status & Roadmap

### Completed Features

- ✅ Blog index and dynamic post pages from Markdown content
- ✅ Homepage with writing-oriented call-to-actions
- ✅ About / Now / Contact routes with high-level professional context
- ✅ Comprehensive SEO with metadata and structured data
- ✅ Static export optimized for GitHub Pages

### Planned Improvements

- [ ] Add a “Start Here” module on the homepage
- [ ] Add topic tags/categories for blog posts
- [ ] Add related-post links and reading-time on articles
- [ ] Expand internal linking between About/Now and relevant blog posts
- [ ] Add privacy-friendly analytics for lightweight content insights

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
- `tailwindcss`: ^3.4.0 - Utility-first CSS framework
- `eslint`: ^9.32.0 - Code linting
- `jest`: ^30.2.0 - Unit and component testing
- `gh-pages`: ^6.2.0 - GitHub Pages deployment

## :hammer: Development Commands

- `yarn dev` - Start development server on port 3000
- `yarn build` - Build production static export
- `yarn start` - Serve production build locally (after build)
- `yarn lint` - Run ESLint and Prettier checks
- `yarn test` - Run Jest test suite
- `yarn deploy` - Build and deploy to GitHub Pages
