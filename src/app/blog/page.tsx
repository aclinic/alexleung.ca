import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { format } from "date-fns";
import { CollectionPage, ItemList } from "schema-dts";

import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { Title } from "@/components/Title";
import { getAllPosts } from "@/lib/blogApi";
import {
  buildBlogCollectionPageJsonLd,
  buildBlogItemListJsonLd,
  buildPageMetadata,
} from "@/lib/seo";

const title = "Blog | Alex Leung";
const description =
  "Thoughts on software engineering, product development, and life as a developer.";
const path = "/blog";
const blogName = "Alex Leung's Blog";

export function generateMetadata(): Metadata {
  const posts = getAllPosts(["coverImage"]);
  const firstCoverImage = posts.find((post) => post.coverImage)?.coverImage;

  return buildPageMetadata({
    title,
    description,
    path,
    images: firstCoverImage ? [{ url: firstCoverImage }] : undefined,
  });
}

export default function BlogIndex() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
    "tags",
  ]);

  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
        ]}
      />
      <JsonLd<CollectionPage>
        item={buildBlogCollectionPageJsonLd({
          path,
          title,
          description,
          blogPath: path,
          blogName,
          blogDescription: description,
        })}
      />
      <JsonLd<ItemList>
        item={buildBlogItemListJsonLd(allPosts, { blogPath: path })}
      />
      <div className="py-[var(--header-height)]">
        <Title title="Blog" />
        <div className="container mx-auto px-5">
          <div className="mb-32 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="surface-interactive group mb-8 block p-6"
                aria-label={post.title}
              >
                <div className="mb-5">
                  {post.coverImage && (
                    <div className="mb-4 h-48 w-full overflow-hidden rounded-lg bg-gray-800">
                      <Image
                        src={post.coverImage}
                        alt={`Cover for ${post.title}`}
                        width={1200}
                        height={630}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>
                <h3 className="mb-3 text-2xl font-bold leading-snug text-white transition-colors group-hover:text-accent-link">
                  {post.title}
                </h3>
                <div className="mb-4 text-sm text-gray-300">
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </div>
                <p className="mb-4 text-base leading-relaxed text-gray-200 md:text-gray-300">
                  {post.excerpt}
                </p>
                {post.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={`${post.slug}-${tag}`}
                        className="rounded-full border border-white/20 px-2.5 py-1 text-xs font-semibold text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent-link transition-colors group-hover:text-accent-link-hover">
                  Read article
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
