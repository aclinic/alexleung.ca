import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import { CollectionPage, ItemList } from "schema-dts";

import { BlogPostCard } from "@/components/BlogPostCard";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { getAllPosts } from "@/lib/blogApi";
import {
  buildBlogCollectionPageSchema,
  buildBlogItemListSchema,
  buildPageMetadata,
  toAbsoluteUrl,
} from "@/lib/seo";
import { getAllTags, getTagBySlug, getTagPath } from "@/lib/tags";

export const dynamicParams = false;

type Props = {
  params: Promise<{
    tag: string;
  }>;
};

function getPostsForTag(tagName: string) {
  return getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "excerpt",
    "tags",
  ]).filter((post) => post.tags.includes(tagName));
}

export function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag: tag.slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const tag = getTagBySlug(params.tag);

  if (!tag) {
    return notFound();
  }

  const posts = getPostsForTag(tag.name);
  const firstCoverImage = posts.find((post) => post.coverImage)?.coverImage;
  const description = `Posts tagged ${tag.name} on Alex Leung's blog.`;

  return buildPageMetadata({
    title: `${tag.name} | Alex Leung`,
    description,
    path: getTagPath(tag.name),
    images: firstCoverImage
      ? [
          {
            url: toAbsoluteUrl(firstCoverImage),
          },
        ]
      : undefined,
  });
}

export default async function TagArchivePage({ params }: Props) {
  const awaitedParams = await params;
  const tag = getTagBySlug(awaitedParams.tag);

  if (!tag) {
    return notFound();
  }

  const posts = getPostsForTag(tag.name);
  const path = getTagPath(tag.name);
  const description = `Posts tagged ${tag.name} on Alex Leung's blog.`;

  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog/" },
          { name: tag.name, item: path },
        ]}
      />
      <JsonLd<CollectionPage>
        item={buildBlogCollectionPageSchema({
          path,
          title: `${tag.name} | Alex Leung`,
          description,
        })}
      />
      <JsonLd<ItemList>
        item={buildBlogItemListSchema(
          posts.map((post) => ({ slug: post.slug, title: post.title }))
        )}
      />

      <PageShell title={tag.name} titleId={`tag-${tag.slug}`}>
        <ResponsiveContainer variant="wide" className="space-y-8">
          <p className="text-body max-w-3xl text-gray-300">
            {tag.count} {tag.count === 1 ? "post" : "posts"} currently filed
            under <strong className="text-white">{tag.name}</strong>.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </ResponsiveContainer>
      </PageShell>
    </>
  );
}
