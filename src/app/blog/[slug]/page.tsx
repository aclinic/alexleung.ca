import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";
import { notFound } from "next/navigation";

import { format } from "date-fns";
import { BlogPosting } from "schema-dts";

import { CoverImage } from "@/components/CoverImage";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { Surface } from "@/components/Surface";
import { BASE_URL } from "@/constants";
import { getAllPosts, getPostBySlug } from "@/lib/blogApi";
import markdownToHtml from "@/lib/markdownToHtml";

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
  const url = `${BASE_URL}/blog/${params_awaited.slug}`;
  const coverImageUrl = post.coverImage
    ? new URL(post.coverImage, BASE_URL).toString()
    : undefined;
  const images = coverImageUrl ? [coverImageUrl] : undefined;
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = new Date(post.updated || post.date).toISOString();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images,
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: coverImageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images,
    },
    keywords: post.tags.length > 0 ? post.tags : undefined,
    alternates: {
      canonical: url,
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
        item={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${BASE_URL}/blog/${post.slug}#blogposting`,
          url: `${BASE_URL}/blog/${post.slug}`,
          headline: post.title,
          description: post.excerpt,
          keywords: post.tags.length > 0 ? post.tags.join(", ") : undefined,
          image: post.coverImage
            ? [`${BASE_URL}${post.coverImage}`]
            : undefined,
          datePublished: new Date(post.date).toISOString(),
          dateModified: new Date(post.updated || post.date).toISOString(),
          author: {
            "@type": "Person",
            "@id": `${BASE_URL}/#person`,
            name: "Alex Leung",
          },
          publisher: {
            "@type": "Person",
            "@id": `${BASE_URL}/#person`,
          },
          inLanguage: "en-CA",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${BASE_URL}/blog/${post.slug}`,
          },
          isPartOf: {
            "@type": "Blog",
            "@id": `${BASE_URL}/blog/#blog`,
            name: "Blog | Alex Leung",
          },
        }}
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
                  <span
                    key={`${post.slug}-${tag}`}
                    className="rounded-full border border-white/20 px-2.5 py-1 text-xs font-semibold text-gray-200"
                  >
                    {tag}
                  </span>
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
            <div
              className="prose prose-invert max-w-none md:prose-lg prose-headings:text-white prose-p:text-gray-300 prose-a:text-accent-link prose-a:no-underline hover:prose-a:text-accent-link-hover hover:prose-a:underline prose-strong:text-white prose-pre:border prose-pre:border-white/10 prose-pre:bg-black/50"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </Surface>
        </ResponsiveContainer>
      </PageShell>
    </>
  );
}
