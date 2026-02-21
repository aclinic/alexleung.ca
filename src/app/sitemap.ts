import { MetadataRoute } from "next";

import { NOW_PAGE_LAST_UPDATED_ISO } from "@/app/now/page";
import { getAllPosts } from "@/lib/blogApi";

export const dynamic = "force-static";

const PAGE_LAST_MODIFIED: Record<string, string> = {
  home: "2026-02-14",
  about: "2026-02-14",
  now: NOW_PAGE_LAST_UPDATED_ISO,
  contact: "2026-02-14",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts(["slug", "date", "updated"]);

  const blogPosts = posts.map((post) => ({
    url: `https://alexleung.ca/blog/${post.slug}`,
    lastModified: new Date(
      post.updated || post.date || PAGE_LAST_MODIFIED.home
    ),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const latestPostUpdate =
    posts.length > 0
      ? new Date(
          posts
            .map((post) => post.updated || post.date)
            .filter((date): date is string => Boolean(date))
            .sort()
            .at(-1) || PAGE_LAST_MODIFIED.home
        )
      : new Date(PAGE_LAST_MODIFIED.home);

  return [
    {
      url: "https://alexleung.ca",
      lastModified: new Date(PAGE_LAST_MODIFIED.home),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://alexleung.ca/about/",
      lastModified: new Date(PAGE_LAST_MODIFIED.about),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://alexleung.ca/now/",
      lastModified: new Date(PAGE_LAST_MODIFIED.now),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://alexleung.ca/blog/",
      lastModified: latestPostUpdate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://alexleung.ca/contact/",
      lastModified: new Date(PAGE_LAST_MODIFIED.contact),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...blogPosts,
  ];
}
