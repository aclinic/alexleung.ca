import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { z } from "zod";

const postsDirectory = join(process.cwd(), "content/posts");

const POST_FIELDS = [
  "slug",
  "title",
  "date",
  "updated",
  "excerpt",
  "coverImage",
  "tags",
  "series",
  "seriesOrder",
  "related",
  "readingTimeMinutes",
  "draft",
  "content",
] as const;

type PostField = (typeof POST_FIELDS)[number];

type PostQueryOptions = {
  includeDrafts?: boolean;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  excerpt?: string;
  coverImage?: string;
  tags: string[];
  series?: string;
  seriesOrder?: number;
  related: string[];
  readingTimeMinutes?: number;
  draft: boolean;
  content: string;
};

const PostFrontMatterSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "title must be a non-empty string")
      .describe("Post title displayed in page heading and SEO metadata."),
    date: z
      .string()
      .trim()
      .min(1, "date must be a non-empty string")
      .describe("Publish date string parsed and normalized to ISO format."),
    updated: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe("Optional last-updated date string for sitemap and metadata."),
    excerpt: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe("Optional short description shown in previews and metadata."),
    coverImage: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe("Optional public path for the post cover image asset."),
    tags: z
      .array(z.string().trim().min(1))
      .default([])
      .describe("Optional list of taxonomy tags for post grouping."),
    series: z
      .string()
      .trim()
      .min(1)
      .optional()
      .describe("Optional series name for grouping related posts."),
    seriesOrder: z
      .number()
      .int()
      .positive()
      .optional()
      .describe("Optional order index for posts within a series."),
    related: z
      .array(z.string().trim().min(1))
      .default([])
      .describe("Optional manual related-post slug overrides."),
    readingTimeMinutes: z
      .number()
      .int()
      .positive()
      .optional()
      .describe("Optional whole-minute estimate for article reading time."),
    draft: z
      .boolean()
      .default(false)
      .describe("Optional draft flag; defaults to published (`false`)."),
  })
  .strict();

function isPostField(value: string): value is PostField {
  return POST_FIELDS.includes(value as PostField);
}

function isPostFieldSelection(value: unknown): value is readonly PostField[] {
  return Array.isArray(value);
}

function assertValidDate(date: string, slug: string, key: "date" | "updated") {
  if (Number.isNaN(Date.parse(date))) {
    throw new Error(`Invalid ${key} in post "${slug}": ${date}`);
  }
}

function parseFrontMatter(
  data: Record<string, unknown>,
  slug: string
): z.infer<typeof PostFrontMatterSchema> {
  const parsed = PostFrontMatterSchema.safeParse(data);

  if (!parsed.success) {
    const errors = parsed.error.issues
      .map((issue) => {
        const path =
          issue.path.length > 0 ? issue.path.join(".") : "front matter";

        return `${path}: ${issue.message}`;
      })
      .join("; ");

    throw new Error(`Invalid front matter in ${slug}.md: ${errors}`);
  }

  if (parsed.data.seriesOrder && !parsed.data.series) {
    throw new Error(
      `Invalid front matter in ${slug}.md: seriesOrder requires series`
    );
  }

  return parsed.data;
}

function parsePostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontMatter = parseFrontMatter(
    data as Record<string, unknown>,
    realSlug
  );

  assertValidDate(frontMatter.date, realSlug, "date");

  if (frontMatter.updated) {
    assertValidDate(frontMatter.updated, realSlug, "updated");
  }

  return {
    slug: realSlug,
    title: frontMatter.title,
    date: new Date(frontMatter.date).toISOString(),
    updated: frontMatter.updated
      ? new Date(frontMatter.updated).toISOString()
      : undefined,
    excerpt: frontMatter.excerpt,
    coverImage: frontMatter.coverImage,
    tags: frontMatter.tags,
    series: frontMatter.series,
    seriesOrder: frontMatter.seriesOrder,
    related: frontMatter.related,
    readingTimeMinutes: frontMatter.readingTimeMinutes,
    draft: frontMatter.draft,
    content,
  };
}

function assertUniqueSeriesOrder(posts: readonly Post[]) {
  const seen = new Map<string, Set<number>>();

  for (const post of posts) {
    if (!post.series || !post.seriesOrder) {
      continue;
    }

    const existing = seen.get(post.series) ?? new Set<number>();

    if (existing.has(post.seriesOrder)) {
      throw new Error(
        `Duplicate seriesOrder ${post.seriesOrder} in series "${post.series}"`
      );
    }

    existing.add(post.seriesOrder);
    seen.set(post.series, existing);
  }
}

function assertRelatedSlugsExist(posts: readonly Post[]) {
  const slugs = new Set(posts.map((post) => post.slug));

  for (const post of posts) {
    for (const relatedSlug of post.related) {
      if (relatedSlug === post.slug) {
        throw new Error(
          `Invalid related slug in "${post.slug}": post cannot relate to itself`
        );
      }

      if (!slugs.has(relatedSlug)) {
        throw new Error(
          `Invalid related slug in "${post.slug}": "${relatedSlug}" does not exist`
        );
      }
    }
  }
}

type RelatedPost = Pick<
  Post,
  "slug" | "title" | "date" | "excerpt" | "coverImage" | "tags"
>;

type GetRelatedPostsOptions = {
  limit?: number;
  includeDrafts?: boolean;
};

function toRelatedPost(post: Post): RelatedPost {
  return {
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    tags: post.tags,
  };
}

function getRelatedScore(target: Post, candidate: Post): number {
  const targetTags = new Set(target.tags);
  const sharedTagCount = candidate.tags.filter((tag) =>
    targetTags.has(tag)
  ).length;
  const tagScore = sharedTagCount * 4;
  const seriesScore =
    target.series && candidate.series && target.series === candidate.series
      ? 2
      : 0;
  const daysDiff =
    Math.abs(
      new Date(target.date).getTime() - new Date(candidate.date).getTime()
    ) /
    (1000 * 60 * 60 * 24);
  const recencyScore = daysDiff <= 90 ? 1 : 0;

  return tagScore + seriesScore + recencyScore;
}

function pickPostFields<T extends PostField>(
  post: Post,
  fields: readonly T[]
): Pick<Post, T> {
  return fields.reduce(
    (acc, field) => {
      acc[field] = post[field] as Pick<Post, T>[T];

      return acc;
    },
    {} as Pick<Post, T>
  );
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(
  slug: string,
  options?: PostQueryOptions
): Post | null;
export function getPostBySlug<T extends PostField>(
  slug: string,
  fields: readonly T[],
  options?: PostQueryOptions
): Pick<Post, T> | null;
export function getPostBySlug<T extends PostField>(
  slug: string,
  fieldsOrOptions?: readonly T[] | PostQueryOptions,
  maybeOptions?: PostQueryOptions
) {
  const post = parsePostBySlug(slug);
  const fields = isPostFieldSelection(fieldsOrOptions)
    ? (fieldsOrOptions as readonly T[])
    : undefined;
  const options = isPostFieldSelection(fieldsOrOptions)
    ? maybeOptions
    : fieldsOrOptions;

  const includeDrafts = options?.includeDrafts ?? false;

  if (!post || (!includeDrafts && post.draft)) {
    return null;
  }

  if (!fields || fields.length === 0) {
    return post;
  }

  const invalidField = fields.find((field) => !isPostField(field));

  if (invalidField) {
    throw new Error(`Unsupported post field requested: ${invalidField}`);
  }

  return pickPostFields(post, fields);
}

export function getAllPosts(options?: PostQueryOptions): Post[];
export function getAllPosts<T extends PostField>(
  fields: readonly T[],
  options?: PostQueryOptions
): Array<Pick<Post, T>>;
export function getAllPosts<T extends PostField>(
  fieldsOrOptions?: readonly T[] | PostQueryOptions,
  maybeOptions?: PostQueryOptions
) {
  const fields = isPostFieldSelection(fieldsOrOptions)
    ? (fieldsOrOptions as readonly T[])
    : undefined;
  const options = isPostFieldSelection(fieldsOrOptions)
    ? maybeOptions
    : fieldsOrOptions;

  const includeDrafts = options?.includeDrafts ?? false;
  const allPosts = getPostSlugs()
    .map((slug) => parsePostBySlug(slug))
    .filter((post): post is Post => post !== null);

  assertUniqueSeriesOrder(allPosts);
  assertRelatedSlugsExist(allPosts);

  const posts = allPosts
    .filter((post) => includeDrafts || !post.draft)
    .sort(
      (post1, post2) =>
        new Date(post2.date).getTime() - new Date(post1.date).getTime()
    );

  if (!fields || fields.length === 0) {
    return posts;
  }

  const invalidField = fields.find((field) => !isPostField(field));

  if (invalidField) {
    throw new Error(`Unsupported post field requested: ${invalidField}`);
  }

  return posts.map((post) => pickPostFields(post, fields));
}

export function getRelatedPosts(
  slug: string,
  options?: GetRelatedPostsOptions
): RelatedPost[] {
  const limit = options?.limit ?? 3;

  if (limit <= 0) {
    return [];
  }

  const allPosts = getAllPosts({
    includeDrafts: options?.includeDrafts ?? false,
  });
  const target = allPosts.find((post) => post.slug === slug);

  if (!target) {
    return [];
  }

  const candidates = allPosts.filter((post) => post.slug !== slug);

  if (target.related.length > 0) {
    const relatedBySlug = new Map(candidates.map((post) => [post.slug, post]));

    return target.related
      .map((relatedSlug) => relatedBySlug.get(relatedSlug))
      .filter((post): post is Post => Boolean(post))
      .slice(0, limit)
      .map(toRelatedPost);
  }

  const scored = candidates
    .map((candidate) => ({
      post: candidate,
      score: getRelatedScore(target, candidate),
    }))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      const dateDelta =
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime();

      if (dateDelta !== 0) {
        return dateDelta;
      }

      return a.post.slug.localeCompare(b.post.slug);
    });

  const hasNonZeroScore = scored.some((entry) => entry.score > 0);
  const ranked = hasNonZeroScore
    ? scored
    : scored.sort(
        (a, b) =>
          new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
      );

  return ranked.slice(0, limit).map((entry) => toRelatedPost(entry.post));
}
