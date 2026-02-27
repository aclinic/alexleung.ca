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
    readingTimeMinutes: frontMatter.readingTimeMinutes,
    draft: frontMatter.draft,
    content,
  };
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

export function getPostBySlug(slug: string): Post | null;
export function getPostBySlug<T extends PostField>(
  slug: string,
  fields: readonly T[],
  options?: PostQueryOptions
): Pick<Post, T> | null;
export function getPostBySlug<T extends PostField>(
  slug: string,
  fields?: readonly T[],
  options?: PostQueryOptions
) {
  const post = parsePostBySlug(slug);
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

export function getAllPosts(): Post[];
export function getAllPosts<T extends PostField>(
  fields: readonly T[],
  options?: PostQueryOptions
): Array<Pick<Post, T>>;
export function getAllPosts<T extends PostField>(
  fields?: readonly T[],
  options?: PostQueryOptions
) {
  const includeDrafts = options?.includeDrafts ?? false;
  const posts = getPostSlugs()
    .map((slug) => parsePostBySlug(slug))
    .filter((post): post is Post => post !== null)
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
