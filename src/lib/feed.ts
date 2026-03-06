import { Feed } from "feed";

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

  const feed = new Feed({
    title: FEED_TITLE,
    description: FEED_DESCRIPTION,
    id: toCanonical("/blog"),
    link: toCanonical("/blog"),
    language: "en-CA",
    feedLinks: {
      rss: `${BASE_URL}/feed.xml`,
    },
    updated: new Date(lastUpdated),
  });

  for (const post of posts) {
    const url = toCanonical(`/blog/${post.slug}`);
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      date: new Date(post.date),
      category: (post.tags || []).map((tag) => ({ name: tag })),
      ...(post.excerpt ? { description: post.excerpt } : {}),
    });
  }

  return feed.rss2();
}
