import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "content/posts");

const POST_FIELDS = [
  "slug",
  "title",
  "date",
  "updated",
  "excerpt",
  "coverImage",
  "content",
] as const;

type PostField = (typeof POST_FIELDS)[number];

export type Post = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  excerpt?: string;
  coverImage?: string;
  content: string;
};

function isPostField(value: string): value is PostField {
  return POST_FIELDS.includes(value as PostField);
}

function assertValidDate(date: string, slug: string, key: "date" | "updated") {
  if (Number.isNaN(Date.parse(date))) {
    throw new Error(`Invalid ${key} in post "${slug}": ${date}`);
  }
}

function readString(
  data: Record<string, unknown>,
  key: string,
  slug: string,
  required = false
): string | undefined {
  const value = data[key];

  if (typeof value === "string") {
    return value;
  }

  if (required) {
    throw new Error(`Missing required front matter key "${key}" in ${slug}.md`);
  }

  return undefined;
}

function parsePostBySlug(slug: string): Post | null {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const frontMatter = data as Record<string, unknown>;

  const title = readString(frontMatter, "title", realSlug, true);
  const date = readString(frontMatter, "date", realSlug, true);
  const updated = readString(frontMatter, "updated", realSlug);
  const excerpt = readString(frontMatter, "excerpt", realSlug);
  const coverImage = readString(frontMatter, "coverImage", realSlug);

  assertValidDate(date!, realSlug, "date");

  if (updated) {
    assertValidDate(updated, realSlug, "updated");
  }

  return {
    slug: realSlug,
    title: title!,
    date: new Date(date!).toISOString(),
    updated: updated ? new Date(updated).toISOString() : undefined,
    excerpt,
    coverImage,
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
  fields: readonly T[]
): Pick<Post, T> | null;
export function getPostBySlug<T extends PostField>(
  slug: string,
  fields?: readonly T[]
) {
  const post = parsePostBySlug(slug);

  if (!post) {
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
  fields: readonly T[]
): Array<Pick<Post, T>>;
export function getAllPosts<T extends PostField>(fields?: readonly T[]) {
  const posts = getPostSlugs()
    .map((slug) => parsePostBySlug(slug))
    .filter((post): post is Post => post !== null)
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
