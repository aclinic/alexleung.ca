import fs from "fs";
import os from "os";
import path from "path";

function setupTempPosts(markdownBySlug: Record<string, string>): string {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "blog-api-test-"));
  const postsDir = path.join(tempDir, "content", "posts");

  fs.mkdirSync(postsDir, { recursive: true });

  Object.entries(markdownBySlug).forEach(([slug, markdown]) => {
    fs.writeFileSync(path.join(postsDir, `${slug}.md`), markdown, "utf8");
  });

  return tempDir;
}

async function loadBlogApiAtCwd(cwd: string) {
  jest.resetModules();
  const cwdSpy = jest.spyOn(process, "cwd").mockReturnValue(cwd);
  const blogApi = await import("@/lib/blogApi");

  cwdSpy.mockRestore();

  return blogApi;
}

describe("blogApi front matter validation", () => {
  test("parses required front matter and applies defaults", async () => {
    const tempDir = setupTempPosts({
      "default-fields": `---\ntitle: "Hello"\ndate: "2026-02-16"\n---\nBody`,
    });

    const { getPostBySlug } = await loadBlogApiAtCwd(tempDir);
    const post = getPostBySlug("default-fields");

    expect(post).not.toBeNull();
    expect(post?.title).toBe("Hello");
    expect(post?.tags).toEqual([]);
    expect(post?.draft).toBe(false);
  });

  test("parses explicit tags and readingTimeMinutes", async () => {
    const tempDir = setupTempPosts({
      tagged: `---\ntitle: "Tagged"\ndate: "2026-02-16"\ntags:\n  - "AI"\n  - "Systems"\nreadingTimeMinutes: 7\n---\nBody`,
    });

    const { getPostBySlug } = await loadBlogApiAtCwd(tempDir);
    const post = getPostBySlug("tagged");

    expect(post?.tags).toEqual(["AI", "Systems"]);
    expect(post?.readingTimeMinutes).toBe(7);
  });

  test("throws when front matter contains invalid types", async () => {
    const tempDir = setupTempPosts({
      "bad-types": `---\ntitle: "Hello"\ndate: "2026-02-16"\ntags: test\n---\nBody`,
    });

    const { getPostBySlug } = await loadBlogApiAtCwd(tempDir);

    expect(() => getPostBySlug("bad-types")).toThrow(
      /Invalid front matter.*tags/
    );
  });

  test("throws when front matter contains unknown keys", async () => {
    const tempDir = setupTempPosts({
      "unknown-key": `---\ntitle: "Hello"\ndate: "2026-02-16"\nauthor: "Alex"\n---\nBody`,
    });

    const { getPostBySlug } = await loadBlogApiAtCwd(tempDir);

    expect(() => getPostBySlug("unknown-key")).toThrow(
      /Invalid front matter.*Unrecognized key/
    );
  });
});
