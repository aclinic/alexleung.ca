import { getAllPosts } from "@/lib/blogApi";
import { buildRssFeedXml } from "@/lib/feed";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts([
    "title",
    "slug",
    "date",
    "updated",
    "excerpt",
    "tags",
  ]);
  const xml = buildRssFeedXml(posts);

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
