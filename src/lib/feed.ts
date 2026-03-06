import { BASE_URL } from "@/constants";
import { toCanonical } from "@/lib/seo";

type FeedPost = {
  title: string;
  slug: string;
  date: string;
  updated?: string;
  excerpt?: string;
  tags?: string[];
};

const FEED_TITLE = "Alex Leung's Blog";
const FEED_DESCRIPTION =
  "Notes on software engineering, distributed systems, AI engineering, and practical product development.";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function toRssDate(value: string): string {
  return new Date(value).toUTCString();
}

export function buildRssFeedXml(posts: readonly FeedPost[]): string {
  const lastUpdated =
    posts.length > 0
      ? posts.reduce((latest, post) => {
          const candidate = post.updated || post.date;
          return new Date(candidate).getTime() > new Date(latest).getTime()
            ? candidate
            : latest;
        }, posts[0].updated || posts[0].date)
      : new Date().toISOString();

  const items = posts
    .map((post) => {
      const url = toCanonical(`/blog/${post.slug}`);
      const lines = [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${toRssDate(post.date)}</pubDate>`,
      ];

      if (post.excerpt) {
        lines.push(
          `      <description>${escapeXml(post.excerpt)}</description>`
        );
      }

      for (const tag of post.tags || []) {
        lines.push(`      <category>${escapeXml(tag)}</category>`);
      }

      lines.push("    </item>");

      return lines.join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(FEED_TITLE)}</title>`,
    `    <link>${toCanonical("/blog")}</link>`,
    `    <description>${escapeXml(FEED_DESCRIPTION)}</description>`,
    "    <language>en-CA</language>",
    `    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />`,
    `    <lastBuildDate>${toRssDate(lastUpdated)}</lastBuildDate>`,
    items,
    "  </channel>",
    "</rss>",
  ].join("\n");
}
