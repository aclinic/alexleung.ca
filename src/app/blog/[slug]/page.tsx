import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blogApi";
import markdownToHtml from "@/lib/markdownToHtml";
import { format } from "date-fns";
import { Title } from "@/components/Title";
import { JsonLd } from "react-schemaorg";
import { BlogPosting } from "schema-dts";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params_awaited = await props.params;
  const post = getPostBySlug(params_awaited.slug, [
    "title",
    "excerpt",
    "coverImage",
  ]);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Alex Leung`;
  const description =
    post.excerpt || `Read ${post.title} on Alex Leung's blog.`;
  const url = `https://alexleung.ca/blog/${params_awaited.slug}`;
  const images = post.coverImage ? [post.coverImage] : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
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
    "slug",
    "content",
    "coverImage",
  ]);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <>
      <JsonLd<BlogPosting>
        item={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `https://alexleung.ca/blog/${post.slug}`,
          url: `https://alexleung.ca/blog/${post.slug}`,
          headline: post.title,
          description: post.excerpt,
          image: post.coverImage ? [post.coverImage] : undefined,
          datePublished: new Date(post.date).toISOString(),
          author: {
            "@type": "Person",
            "@id": "https://alexleung.ca/#person",
            name: "Alex Leung",
          },
          inLanguage: "en-CA",
          isPartOf: {
            "@type": "Blog",
            "@id": "https://alexleung.ca/blog/#blog",
            name: "Blog | Alex Leung",
          },
        }}
      />
      <div className="py-[var(--header-height)]">
        <Title title={post.title} />
        <article className="container mx-auto mb-12 px-5">
          <div className="mx-auto max-w-3xl rounded-xl border border-white/10 bg-black/40 p-8 backdrop-blur-sm">
            <div className="mb-6 text-lg text-gray-300">
              {format(new Date(post.date), "MMMM d, yyyy")}
            </div>
            {post.coverImage && (
              <div className="mb-6 sm:mx-0 md:mb-10">
                <img
                  src={post.coverImage}
                  alt={`Cover for ${post.title}`}
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
