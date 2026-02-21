import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { format } from "date-fns";
import { BlogPosting } from "schema-dts";

import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { Title } from "@/components/Title";
import { getAllPosts, getPostBySlug } from "@/lib/blogApi";
import markdownToHtml from "@/lib/markdownToHtml";
import {
  buildBlogPostingJsonLd,
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

  const metadata = buildPageMetadata({
    title,
    description,
    path: `/blog/${params_awaited.slug}`,
    type: "article",
    images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    keywords: post.tags.length > 0 ? post.tags : undefined,
  });

  return {
    ...metadata,
    openGraph: {
      type: "article",
      title,
      description,
      url: toCanonical(`/blog/${params_awaited.slug}`),
      siteName: metadata.openGraph?.siteName,
      locale: metadata.openGraph?.locale,
      images: metadata.openGraph?.images,
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
        item={buildBlogPostingJsonLd({
          slug: post.slug,
          title: post.title,
          description: post.excerpt,
          coverImage: post.coverImage,
          date: post.date,
          updated: post.updated,
          tags: post.tags,
        })}
      />
      <div className="py-[var(--header-height)]">
        <Title title={post.title} />
        <article className="container mx-auto mb-12 px-5">
          <div className="surface-static mx-auto max-w-3xl p-4 md:p-8">
            <div className="mb-3 text-lg text-gray-300">
              {format(new Date(post.date), "MMMM d, yyyy")}
            </div>
            {post.tags.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
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
            {post.coverImage && (
              <div className="mb-6 sm:mx-0 md:mb-10">
                <Image
                  src={post.coverImage}
                  alt={`Cover for ${post.title}`}
                  width={1200}
                  height={630}
                  sizes="(min-width: 1024px) 896px, 100vw"
                  className="aspect-[21/9] w-full rounded-lg object-cover shadow-sm"
                />
              </div>
            )}
            <div
              className="prose prose-invert max-w-none md:prose-lg prose-headings:text-white prose-p:text-gray-300 prose-a:text-accent-link prose-a:no-underline hover:prose-a:text-accent-link-hover hover:prose-a:underline prose-strong:text-white prose-pre:border prose-pre:border-white/10 prose-pre:bg-black/50"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </article>
      </div>
    </>
  );
}
