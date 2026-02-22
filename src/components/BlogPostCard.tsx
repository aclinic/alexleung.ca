import Link from "next/link";

import { CoverImage } from "@/components/CoverImage";
import { surfaceClassNames } from "@/components/Surface";
import { Tag } from "@/components/Tag";
import { Post } from "@/lib/blogApi";
import { formatIsoDateForDisplay } from "@/lib/date";

type BlogPostCardProps = {
  post: Pick<
    Post,
    "slug" | "title" | "date" | "coverImage" | "excerpt" | "tags"
  >;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link
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
        {formatIsoDateForDisplay(post.date)}
      </div>
      {post.excerpt ? (
        <p className="mb-4 text-base leading-relaxed text-gray-200 md:text-gray-300">
          {post.excerpt}
        </p>
      ) : null}
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
  );
}
