# alexleung.ca

Personal portfolio website showcasing technical expertise as a Staff Engineer and AI Engineer. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Features professional credentials, educational background, and comprehensive SEO optimization.

> CI validation test: this repository intentionally includes occasional small documentation-only PRs to verify automated checks and branch protections.

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
- **SEO**: Comprehensive metadata, Open Graph, Twitter cards, JSON-LD structured data
- **Icons**: React Icons (FontAwesome 6)
- **Images**: WebP optimized assets with Next.js Image component
- **Build Output**: Static files generated in the `out/` directory

### Key Features

- **Professional Credentials**: P.Eng. licensing and educational achievements display
- **Comprehensive SEO**: Structured data for person/profile schemas
- **Performance Optimized**: Static export with optimized images and assets
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Social Integration**: Links to LinkedIn, GitHub, Twitter/X, Bluesky, Instagram

### GitHub Pages Configuration

The `.nojekyll` file in `public/` prevents Jekyll processing, allowing Next.js `_next/` assets to be served correctly.

## :clipboard: Project Structure

```bash
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with comprehensive SEO and JSON-LD
│   ├── page.tsx             # Main page component orchestration
│   ├── not-found.tsx        # 404 page
│   └── sitemap.ts           # Dynamic sitemap generation
│
├── components/
│   ├── About.tsx            # About section with personal background
│   ├── Contact.tsx          # Contact section with obfuscated email
│   ├── Credentials.tsx      # P.Eng. and educational credentials
│   ├── ExternalLink.tsx     # External link component with security
│   ├── Footer.tsx           # Site footer
│   ├── Home.tsx             # Hero section with professional title
│   ├── Skills.tsx           # Technical skills grid (removed in current version)
│   ├── SocialLinks.tsx      # Social media links sidebar
│   └── Title.tsx            # Section title component
│
└── constants/
    ├── skills.ts            # Technical skills data
    └── socialLinks.tsx      # Social platform configurations
```

## :memo: Current Status & Improvements

### Completed Features

- ✅ Professional credentials section with P.Eng. licensing
- ✅ Educational background (Georgia Tech MSECE, Waterloo BASc)
- ✅ Comprehensive SEO with structured data
- ✅ Social media integration (LinkedIn, GitHub, Twitter/X, Bluesky, Instagram)
- ✅ Responsive design with professional styling
- ✅ Static export optimized for GitHub Pages

### Planned Improvements

#### High Priority (Professional Impact)

- [ ] **Expand professional context with specific software engineering/AI experience**
  - Critical for showcasing actual expertise beyond credentials
- [ ] **Add brief career journey or key milestones**
  - Establishes credibility and experience progression

#### Medium Priority (Content & UX)

- [ ] Balance text-image ratio in About section
- [ ] Include technical philosophy/approach statement
- [ ] Organize content into subsections (Professional, Personal, Technical)
- [ ] Add subheadings or visual separators

#### Low Priority (Enhancements)

- [ ] Add subtle image captions for context
- [ ] Optimize mobile text-to-image ratio
- [ ] Implement staggered animations for text/images
- [ ] Consider hover effects or expandable sections
- [ ] Add privacy-friendly analytics integration
- [ ] Consider service worker for offline functionality

## :package: Dependencies

### Production

- `next`: ^16.1.1 - React framework with App Router
- `react`: ^19.2.3 - UI library
- `react-dom`: ^19.2.3 - React DOM bindings
- `react-icons`: ^5.3.0 - Icon library (FontAwesome 6)
- `react-schemaorg`: ^2.0.0 - JSON-LD structured data
- `schema-dts`: ^1.1.5 - Schema.org TypeScript definitions

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
- `yarn lint` - Run ESLint code linting
- `yarn deploy` - Build and deploy to GitHub Pages
