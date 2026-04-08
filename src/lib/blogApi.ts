import fs from "fs";
import { join, relative, resolve } from "path";

import matter from "gray-matter";
import { z } from "zod";

const postsDirectory = join(process.cwd(), "content/posts");
const postBySlugCache = new Map<string, Post | null>();
const postSlugPattern = /^[a-z0-9-]+$/i;
const usePersistentCache = process.env.NODE_ENV !== "development";

let allPostsCache: Post[] | null = null;

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
  readingTimeMinutes?: number;
  draft: boolean;
  content: string;
};

const PostFrontMatterSchema = z
  .object({
    title: z.string().trim().min(1, "title must be a non-empty string"),
    date: z.string().trim().min(1, "date must be a non-empty string"),
    updated: z.string().trim().min(1).optional(),
    excerpt: z.string().trim().min(1).optional(),
    coverImage: z.string().trim().min(1).optional(),
    tags: z.array(z.string().trim().min(1)).default([]),
    series: z.string().trim().min(1).optional(),
    seriesOrder: z.number().int().positive().optional(),
    readingTimeMinutes: z.number().int().positive().optional(),
    draft: z.boolean().default(false),
  })
  .strict();

function assertValidDate(date: string, slug: string, key: "date" | "updated") {
  if (Number.isNaN(Date.parse(date))) {
    throw new Error(`Invalid ${key} in post "${slug}": ${date}`);
  }
}

function resolvePostQuery<T extends PostField>(
  fieldsOrOptions?: readonly T[] | PostQueryOptions,
  maybeOptions?: PostQueryOptions
): {
  fields: readonly T[] | undefined;
  options: PostQueryOptions | undefined;
} {
  if (!Array.isArray(fieldsOrOptions)) {
    return {
      fields: undefined,
      options: fieldsOrOptions as PostQueryOptions | undefined,
    };
  }

  const invalidField = fieldsOrOptions.find(
    (field) => !POST_FIELDS.includes(field as PostField)
  );

  if (invalidField) {
    throw new Error(`Unsupported post field requested: ${invalidField}`);
  }

  return {
    fields: fieldsOrOptions,
    options: maybeOptions,
  };
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
  if (!postSlugPattern.test(realSlug)) {
    return null;
  }

  const fullPath = resolve(postsDirectory, `${realSlug}.md`);
  const relativePath = relative(postsDirectory, fullPath);

  if (relativePath.startsWith("..") || /[\\/]/.test(relativePath)) {
    return null;
  }

  let stat: fs.Stats;

  try {
    stat = fs.statSync(fullPath);
  } catch {
    return null;
  }

  if (!stat.isFile()) {
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
    readingTimeMinutes: frontMatter.readingTimeMinutes,
    draft: frontMatter.draft,
    content,
  };
}

function getCachedPostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.md$/, "");

  if (!usePersistentCache) {
    return parsePostBySlug(realSlug);
  }

  if (postBySlugCache.has(realSlug)) {
    return postBySlugCache.get(realSlug) ?? null;
  }

  const post = parsePostBySlug(realSlug);

  postBySlugCache.set(realSlug, post);

  return post;
}

function getCachedAllPosts(): Post[] {
  if (!usePersistentCache) {
    const posts = getPostSlugs()
      .map((slug) => parsePostBySlug(slug))
      .filter((post): post is Post => post !== null)
      .sort(
        (post1, post2) =>
          new Date(post2.date).getTime() - new Date(post1.date).getTime()
      );

    assertUniqueSeriesOrder(posts);

    return posts;
  }

  if (allPostsCache) {
    return allPostsCache;
  }

  const posts = getPostSlugs()
    .map((slug) => getCachedPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort(
      (post1, post2) =>
        new Date(post2.date).getTime() - new Date(post1.date).getTime()
    );

  assertUniqueSeriesOrder(posts);

  allPostsCache = posts;

  return allPostsCache;
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

type RelatedPost = Pick<
  Post,
  "slug" | "title" | "date" | "excerpt" | "coverImage" | "tags"
>;

type GetRelatedPostsOptions = {
  limit?: number;
  includeDrafts?: boolean;
};

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

function getPostSlugs() {
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
  const post = getCachedPostBySlug(slug);
  const { fields, options } = resolvePostQuery(fieldsOrOptions, maybeOptions);

  const includeDrafts = options?.includeDrafts ?? false;

  if (!post || (!includeDrafts && post.draft)) {
    return null;
  }

  if (!fields || fields.length === 0) {
    return post;
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
  const { fields, options } = resolvePostQuery(fieldsOrOptions, maybeOptions);
  const includeDrafts = options?.includeDrafts ?? false;
  const posts = getCachedAllPosts().filter(
    (post) => includeDrafts || !post.draft
  );

  if (!fields || fields.length === 0) {
    return posts;
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

  const scored = allPosts
    .filter((post) => post.slug !== slug)
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

  return ranked.slice(0, limit).map(({ post }) => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    tags: post.tags,
  }));
}
