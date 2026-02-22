import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import { CollectionPage, ItemList } from "schema-dts";

import { BlogPostCard } from "@/components/BlogPostCard";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
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
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </ResponsiveContainer>
      </PageShell>
    </>
  );
}
