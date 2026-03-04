import Link from "next/link";

import { CoverImage } from "@/components/CoverImage";
import { surfaceClassNames } from "@/components/Surface";
import { Tag } from "@/components/Tag";
import { Post } from "@/lib/blogApi";
import {
  getCoverVariantPath,
  getCoverVariantSourceSet,
} from "@/lib/coverVariants";
import { formatIsoDateForDisplay } from "@/lib/date";

type BlogPostCardProps = {
  post: Pick<
    Post,
    "slug" | "title" | "date" | "coverImage" | "excerpt" | "tags"
  >;
  coverPriority?: boolean;
  className?: string;
};

export function BlogPostCard({
  post,
  coverPriority = false,
  className = "",
}: BlogPostCardProps) {
  const cardCoverImage = getCoverVariantPath(post.coverImage, "card");
  const cardCoverSrcSet = getCoverVariantSourceSet(post.coverImage, "card");

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={surfaceClassNames({
        interactive: true,
        className: `group mb-8 block p-6 ${className}`.trim(),
      })}
      aria-label={post.title}
    >
      <div className="mb-5">
        <CoverImage
          src={cardCoverImage || post.coverImage}
          srcSet={cardCoverSrcSet}
          alt={`Cover for ${post.title}`}
          variant="card"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={coverPriority}
          className="mb-4"
          imageClassName="transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <h2 className="mb-3 text-2xl font-bold leading-snug text-white transition-colors group-hover:text-accent-link">
        {post.title}
      </h2>
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
