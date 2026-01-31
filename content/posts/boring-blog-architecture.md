---
title: "The 'Boring' Architecture Behind This Blog"
date: "2026-01-31"
excerpt: "How I added a fully static, markdown-based blog to my Next.js portfolio."
coverImage: "/assets/blog/boring-blog-architecture/cover.jpg"
---

I recently finished implementing the blog section of this personal website. Rather than reaching for a complex CMS, I decided to build it directly into my existing Next.js application using standard tools.

## The Goal

I wanted a place to share technical thoughts without adding maintenance overhead. The requirements were simple:

1.  **Write in Markdown**: I want to write posts in VS Code.
2.  **Zero Runtime Cost**: The blog should be statically generated.
3.  **Fast**: It should feel instant.

## The Implementation

### 1. Filesystem as the Database

I created a simple utility, `blogApi.ts`, that reads directly from the file system. It uses `gray-matter` to parse the frontmatter and a `remark`/`rehype` pipeline—specifically `rehype-pretty-code`—to process the content.

### 2. Static Routing

Next.js makes it incredibly easy to turn a folder of markdown files into routes. I used `generateStaticParams` to tell Next.js which paths to build at compile time:

```typescript
export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
```

This ensures that `alexleung.ca/blog/boring-blog-architecture` is just a simple HTML file on the server, not a dynamic Node.js request.

### 3. The Polish

To make it feel professional, I spent time on the details:

- **Typography**: I used `@tailwindcss/typography` but customized it to remove the default backticks from inline code for a cleaner look.
- **Metadata**: Each post automatically generates its own SEO tags and JSON-LD structured data.
- **Syntax Highlighting**: I chose `rehype-pretty-code` (powered by Shiki). It uses the same TextMate grammars as VS Code, meaning the highlighting is extremely accurate. Because it generates inline styles, there's no brittle CSS to import from `node_modules`.
- **Sitemap**: A dynamic script crawls my posts directory to keep `sitemap.xml` up to date automatically.

This "boring" architecture allows me to focus entirely on writing, knowing the rendering is rock-solid and fast.
