# CLAUDE.md - Alex Leung Portfolio Website

> **Note**: This file should be updated whenever significant changes are made to the website structure, content, or technical stack to ensure it remains accurate and useful for development work.

## Website Overview

This is Alex Leung's personal portfolio website - a clean, modern single-page application showcasing his work as a Software Engineer and AI Engineer. The site features a minimalist design with dark/light mode toggle and smooth animations.

## Technical Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom themes and Lato font
- **Deployment**: Static export to GitHub Pages via `gh-pages`
- **Icons**: React Icons (FontAwesome, FcEngineering)
- **Images**: Next.js Image component with WebP optimization

## Architecture & Structure

### Key Components

- `src/app/page.tsx` - Main page with theme management and component orchestration
- `src/app/layout.tsx` - Root layout with comprehensive SEO metadata and structured data
- `src/components/Home.tsx` - Hero section with animated name and title
- `src/components/About.tsx` - About section with personal info and skills
- `src/components/Skills.tsx` - Technical skills grid display
- `src/components/Contact.tsx` - Contact section with obfuscated email
- `src/components/colour-theme/` - Dark/light mode toggle system

### Key Features

1. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
2. **Dark/Light Mode**: Custom hook-based theme system with smooth transitions
3. **SEO Optimized**: Comprehensive metadata, Open Graph, Twitter cards, JSON-LD structured data
4. **Performance**: Next.js Image optimization, WebP images, static export
5. **Animations**: CSS-based animations for text reveals and transitions

## Personal Information (Alex Leung)

- **Role**: Software Engineer & AI Engineer
- **Education**: University of Waterloo & Georgia Tech (Electrical Engineering)
- **Location**: Kitchener, Ontario, Canada
- **Contact**: mail [at] alexleung.ca
- **Interests**: Tennis, reading, hiking, rock climbing, cats ("furmily")

### Technical Expertise

Alex specializes in:

- AI & Agentic Applications
- Distributed Systems Architecture
- System Design & Clean Architecture
- Python & Machine Learning
- TypeScript/JavaScript, React/Next.js
- Java/Kotlin, Modern C++
- AWS & Cloud Infrastructure
- Docker & Containerization
- Database Design & Optimization
- Embedded Systems Development

### Social Presence

- LinkedIn: https://www.linkedin.com/in/aclinic
- GitHub: https://www.github.com/aclinic
- Twitter/X: https://www.x.com/acl1n1c
- Bluesky: https://bsky.app/profile/aclinic.bsky.social
- Instagram: https://www.instagram.com/rootpanda

## Development Commands

- `yarn dev` - Start development server (port 3000)
- `yarn build` - Build for production
- `yarn deploy` - Build and deploy to GitHub Pages
- `yarn lint` - Run ESLint

## Development Notes

- Uses client-side rendering for theme management
- Static export configured for GitHub Pages compatibility
- `.nojekyll` file prevents Jekyll processing of `_next/` directory
- Images stored in `public/assets/` with WebP format for optimization
- Email obfuscation used in contact section for spam protection

## Current Issues & Improvements (from README)

### High Priority

- Fix viewport metadata warning (move to viewport export)
- Update browserslist data
- Improve contact section (replace email obfuscation)

### Medium Priority

- Performance optimizations (lazy loading, service worker)
- Accessibility enhancements
- Analytics integration

### Low Priority

- Code organization improvements
- SEO enhancements (blog/portfolio sections)

## Website Sections

1. **Hero/Home** - Name, title, and professional identity
2. **About** - Personal introduction with photos of Alex and his cat Galactica
3. **Skills** - Technical competencies in grid format
4. **Contact** - Email and social media links
5. **Footer** - Additional site information

This is a well-crafted, professional portfolio site demonstrating modern web development practices and showcasing Alex's technical expertise in software engineering and AI.
