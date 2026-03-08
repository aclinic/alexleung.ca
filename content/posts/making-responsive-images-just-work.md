---
title: "Making Responsive Images Just Work"
date: "2026-03-04"
excerpt: "Instead of manually managing `-sm`/`-md`/`-lg` assets, I moved to a manifest-driven workflow that reduced duplication and made performance outcomes more consistent."
coverImage: "/assets/blog/making-responsive-images-just-work/cover.webp"
tags:
  - "Web Performance"
  - "Architecture"
  - "Developer Workflow"
---

I started this as a performance task: downscale assets, add `srcSet`/`sizes`, and improve LCP. The bigger problem turned out to be maintainability.

Image behavior was spread across scripts and components with repeated conventions:

- variant naming assumptions,
- hardcoded `srcSet` strings,
- multiple script aliases and legacy paths.

That made drift easy, and small changes in one place could quietly break expectations elsewhere. I replaced that with a simpler pattern: generate one manifest at build time (`src/generated/imageVariantManifest.json`) and resolve variants from it at runtime.

## Simpler Operating Model

Three things became simpler. First, there is now one canonical workflow: `yarn image:variants`. Second, rendering logic is less duplicated because a shared `ResponsiveImage` component replaced repeated `<picture>` patterns. Third, static assets became data-driven, so background and portrait `srcSet` values now come from manifest-backed metadata rather than JSX literals.

## Authoring Constraint: It Should Just Work

This was an important constraint for me: I do not want to manually create `-sm`, `-md`, `-lg` files every time I add an image.

The workflow is now simple: add the source image, reference it in frontmatter or markdown, then run `yarn image:variants`. That keeps authoring lightweight while still making outputs consistent.

## Reliability and Performance as Outcomes

Once maintainability improved, reliability and performance improved with it. I also removed silent fallback for required profiles (`cover.card`, `cover.hero`, `inlineContent`). If a required variant is missing, it now fails fast instead of shipping a hidden regression.

## Durable Lesson

I started by chasing LCP. The durable fix was maintainability: fewer scattered conventions, one source of truth, and clearer build/runtime boundaries. For this site, performance improvements became much easier once the image system became easier to reason about.
