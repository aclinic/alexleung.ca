import { HiOutlineArrowRight } from "react-icons/hi";
import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import { format } from "date-fns";
import { CollectionPage, ItemList } from "schema-dts";

import { ActionCard } from "@/components/ActionCard";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { Title } from "@/components/Title";
import { BASE_URL } from "@/constants";
import { getAllPosts } from "@/lib/blogApi";

const title = "Blog | Alex Leung";
const description =
  "Thoughts on software engineering, product development, and life as a developer.";
const url = `${BASE_URL}/blog/`;

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
  },
};

export default function BlogIndex() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
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
      <div className="page-shell">
        <Title title="Blog" />
        <div className="container mx-auto px-5">
          <div className="mb-24 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
              <ActionCard
                key={post.slug}
                href={`/blog/${post.slug}`}
                ariaLabel={post.title}
              >
                <div className="mb-5">
                  {post.coverImage && (
                    <div className="mb-4 h-48 w-full overflow-hidden rounded-lg bg-gray-800/80">
                      <img
                        src={post.coverImage}
                        alt={`Cover for ${post.title}`}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>
                <h3 className="mb-3 text-2xl font-bold leading-snug text-white transition-colors group-hover:text-blue-300">
                  {post.title}
                </h3>
                <div className="mb-4 text-sm text-gray-300">
                  {format(new Date(post.date), "MMMM d, yyyy")}
                </div>
                <p className="mb-5 text-base leading-relaxed text-gray-100 [display:-webkit-box] overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:4] md:[display:block] md:[-webkit-line-clamp:unset]">
                  {post.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-300 transition-colors group-hover:text-blue-200">
                  Read article <HiOutlineArrowRight className="text-base" />
                </span>
              </ActionCard>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
