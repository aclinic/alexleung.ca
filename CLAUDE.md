# CLAUDE.md - Portfolio Website Project

> **Note**: This file should be updated whenever significant changes are made to the website structure, content, or technical stack to ensure it remains accurate and useful for development work.

## Project Overview

This is a personal portfolio website - a clean, modern single-page application showcasing work as a Software Engineer and AI Engineer. The site features a minimalist design with dark/light mode toggle and smooth animations.

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

## Content Structure

The website is structured as a single-page application with the following sections:

- **Hero Section**: Professional introduction and title
- **About Section**: Personal background, interests, and technical skills showcase
- **Contact Section**: Email contact and social media links
- **Skills Data**: Technical competencies defined in `src/constants/skills.ts`
- **Social Links**: Platform links configured in `src/constants/socialLinks.tsx`

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

## Current Issues & Improvements

See README.md for current todos and improvements.

## Website Sections

1. **Hero/Home** - Name, title, and professional identity
2. **About** - Personal introduction with photos
3. **Skills** - Technical competencies in grid format
4. **Contact** - Email and social media links
5. **Footer** - Additional site information

This is a well-crafted, professional portfolio site demonstrating modern web development practices and showcasing technical expertise in software engineering and AI.
