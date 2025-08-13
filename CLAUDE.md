# CLAUDE.md - Portfolio Website Project

> **Note**: This file should be updated whenever significant changes are made to the website structure, content, or technical stack to ensure it remains accurate and useful for development work.

## Project Overview

This is a personal portfolio website - a clean, modern single-page application showcasing professional expertise as a Staff Engineer and AI Engineer. The site features a minimalist design with comprehensive professional credentials, educational background, and optimized SEO. Built as a static export for GitHub Pages deployment.

## Technical Stack

- **Framework**: Next.js 15 with TypeScript and App Router
- **Styling**: Tailwind CSS with custom themes and responsive design
- **Deployment**: Static export to GitHub Pages via `gh-pages`
- **Icons**: React Icons (FontAwesome 6)
- **Images**: WebP optimized assets with Next.js Image component
- **SEO**: React Schema.org for JSON-LD structured data
- **Performance**: Static export optimized for GitHub Pages

## Architecture & Structure

### Key Components

- `src/app/page.tsx` - Main page component orchestration with fixed background
- `src/app/layout.tsx` - Root layout with comprehensive SEO metadata and JSON-LD structured data
- `src/components/Home.tsx` - Hero section with professional title and name
- `src/components/About.tsx` - About section with personal background and photos
- `src/components/Credentials.tsx` - P.Eng. licensing and educational credentials display
- `src/components/Contact.tsx` - Contact section with obfuscated email
- `src/components/SocialLinks.tsx` - Social media links sidebar (LinkedIn, GitHub, Twitter/X, Bluesky, Instagram)
- `src/components/ExternalLink.tsx` - Reusable external link component with security attributes

### Key Features

1. **Professional Credentials**: P.Eng. licensing and educational achievements prominently displayed
2. **Comprehensive SEO**: Metadata, Open Graph, Twitter cards, JSON-LD structured data with Person schema
3. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
4. **Performance Optimized**: Static export with WebP images and optimized assets
5. **Social Integration**: Links to LinkedIn, GitHub, Twitter/X, Bluesky, Instagram
6. **Professional Branding**: Staff Engineer & Engineering Lead, P.Eng. positioning

## Content Structure

The website is structured as a single-page application with the following sections:

- **Hero Section**: Professional introduction with Staff Engineer & Engineering Lead, P.Eng. title
- **About Section**: Personal background with professional photos and interests
- **Credentials Section**: P.Eng. licensing and educational achievements (Georgia Tech MSECE, Waterloo BASc)
- **Contact Section**: Obfuscated email contact information
- **Social Links Sidebar**: Fixed position links to LinkedIn, GitHub, Twitter/X, Bluesky, Instagram
- **Skills Data**: Technical competencies defined in `src/constants/skills.ts` (currently not displayed)
- **Footer**: Additional site information

## Development Commands

- `yarn dev` - Start development server (port 3000)
- `yarn build` - Build for production
- `yarn deploy` - Build and deploy to GitHub Pages
- `yarn lint` - Run ESLint

## Development Notes

- Static export configured for GitHub Pages compatibility (`output: 'export'`)
- `.nojekyll` file prevents Jekyll processing of `_next/` directory
- Images stored in `public/assets/` with WebP format for optimization
- Email obfuscation used in contact section for spam protection
- Comprehensive JSON-LD structured data for SEO (Person/ProfilePage schema)
- Background image with fixed positioning and overlay
- Professional credentials prominently featured

## Current Status

### Completed Features

- ✅ Professional credentials section with P.Eng. licensing
- ✅ Educational background (Georgia Tech MSECE, Waterloo BASc) with academic achievements
- ✅ Comprehensive SEO with structured data and Person schema
- ✅ Social media integration across 5 platforms
- ✅ Responsive design with professional styling
- ✅ Static export optimized for GitHub Pages

### Planned Improvements

See README.md and TODO.txt for detailed improvement plans, including:

- Content expansion with professional experience details
- About section layout improvements
- Enhanced UX with animations and interactions
- Accessibility improvements

## Website Sections

1. **Hero/Home** - Professional name and Staff Engineer & Engineering Lead, P.Eng. title
2. **About** - Personal introduction with professional photos and background
3. **Credentials** - P.Eng. licensing and educational achievements with academic honors
4. **Contact** - Obfuscated email contact
5. **Social Links** - Fixed sidebar with LinkedIn, GitHub, Twitter/X, Bluesky, Instagram
6. **Footer** - Additional site information

This is a professional portfolio site demonstrating modern web development practices while showcasing credentials as a licensed Professional Engineer with technical expertise in software engineering and AI. The site emphasizes professional credibility and technical competence through structured data, comprehensive SEO, and prominent display of engineering credentials.
