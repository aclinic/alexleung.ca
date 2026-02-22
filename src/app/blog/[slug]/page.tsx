import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import { format } from "date-fns";
import { BlogPosting } from "schema-dts";

import { CoverImage } from "@/components/CoverImage";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { ProseContent } from "@/components/ProseContent";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { Surface } from "@/components/Surface";
import { Tag } from "@/components/Tag";
import { getAllPosts, getPostBySlug } from "@/lib/blogApi";
import markdownToHtml from "@/lib/markdownToHtml";
import {
  buildBlogPostingSchema,
  buildPageMetadata,
  toCanonical,
} from "@/lib/seo";

export const dynamicParams = false;

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params_awaited = await props.params;
  const post = getPostBySlug(params_awaited.slug, [
    "title",
    "excerpt",
    "coverImage",
    "date",
    "updated",
    "tags",
  ]);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Alex Leung`;
  const description =
    post.excerpt || `Read ${post.title} on Alex Leung's blog.`;
  const path = `/blog/${params_awaited.slug}`;

  const metadata = buildPageMetadata({
    title,
    description,
    path,
    type: "article",
    images: post.coverImage
      ? [
          {
            url: post.coverImage,
          },
        ]
      : undefined,
    keywords: post.tags.length > 0 ? post.tags : undefined,
  });

  return {
    ...metadata,
    openGraph: {
      type: "article",
      title,
      description,
      url: toCanonical(path),
      images: metadata.openGraph?.images,
      siteName: metadata.openGraph?.siteName,
      locale: metadata.openGraph?.locale,
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.updated || post.date).toISOString(),
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts(["slug"]);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Post({ params }: Props) {
  const params_awaited = await params;
  const post = getPostBySlug(params_awaited.slug, [
    "title",
    "date",
    "updated",
    "slug",
    "content",
    "coverImage",
    "excerpt",
    "tags",
  ]);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: "Home", item: "/" },
          { name: "Blog", item: "/blog" },
          { name: post.title, item: `/blog/${post.slug}` },
        ]}
      />
      <JsonLd<BlogPosting>
        item={buildBlogPostingSchema({
          slug: post.slug,
          title: post.title,
          description: post.excerpt,
          coverImage: post.coverImage,
          date: post.date,
          updated: post.updated,
          tags: post.tags,
        })}
      />
      <PageShell title={post.title}>
        <ResponsiveContainer
          element="article"
          variant="prose"
          className="mb-12"
        >
          <Surface className="mx-auto" padding="sm">
            <div className="mb-3 text-lg text-gray-300">
              {format(new Date(post.date), "MMMM d, yyyy")}
            </div>
            {post.tags.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Tag key={`${post.slug}-${tag}`}>{tag}</Tag>
                ))}
              </div>
            )}
            <CoverImage
              src={post.coverImage}
              alt={`Cover for ${post.title}`}
              variant="hero"
              sizes="(min-width: 1024px) 896px, 100vw"
              className="mb-6 sm:mx-0 md:mb-10"
            />
            <ProseContent html={content} />
          </Surface>
        </ResponsiveContainer>
      </PageShell>
    </>
  );
}
