import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";
import Link from "next/link";

import { format } from "date-fns";
import { CollectionPage, ItemList } from "schema-dts";

import { CoverImage } from "@/components/CoverImage";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { surfaceClassNames } from "@/components/Surface";
import { Tag } from "@/components/Tag";
import { BASE_URL } from "@/constants";
import { getAllPosts } from "@/lib/blogApi";

const title = "Blog | Alex Leung";
const description =
  "Thoughts on software engineering, product development, and life as a developer.";
const url = `${BASE_URL}/blog/`;

export function generateMetadata(): Metadata {
  const posts = getAllPosts(["coverImage"]);
  const firstCoverImage = posts.find((post) => post.coverImage)?.coverImage;
  const image = firstCoverImage
    ? new URL(firstCoverImage, BASE_URL).toString()
    : undefined;
  const images = image ? [image] : undefined;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: url,
      siteName: "Alex Leung",
      locale: "en_CA",
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: title,
      description: description,
      images,
    },
  };
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
        item={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": url,
          url: url,
          name: title,
          description: description,
          inLanguage: "en-CA",
          isPartOf: {
            "@type": "WebSite",
            "@id": `${BASE_URL}/#website`,
          },
          mainEntity: {
            "@type": "Blog",
            "@id": `${BASE_URL}/blog/#blog`,
            name: "Alex Leung's Blog",
            description: description,
            publisher: {
              "@id": `${BASE_URL}/#person`,
            },
          },
        }}
      />
      <JsonLd<ItemList>
        item={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${BASE_URL}/blog/#itemlist`,
          itemListElement: allPosts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${BASE_URL}/blog/${post.slug}`,
            name: post.title,
          })),
          numberOfItems: allPosts.length,
        }}
      />
      <PageShell title="Blog">
        <ResponsiveContainer variant="wide">
          <div className="mb-32 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={surfaceClassNames({
                  interactive: true,
                  className: "group mb-8 block p-6",
                })}
                aria-label={post.title}
              >
                <div className="mb-5">
                  <CoverImage
                    src={post.coverImage}
                    alt={`Cover for ${post.title}`}
                    variant="card"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="mb-4"
                    imageClassName="transition-transform duration-200 group-hover:scale-105"
                  />
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
                      <Tag key={`${post.slug}-${tag}`}>{tag}</Tag>
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
        </ResponsiveContainer>
      </PageShell>
    </>
  );
}
