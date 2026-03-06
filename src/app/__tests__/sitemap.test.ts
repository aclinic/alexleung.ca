import sitemap from "@/app/sitemap";

jest.mock("@/app/now/page", () => ({
  NOW_PAGE_LAST_UPDATED_ISO: "2026-01-15",
}));

jest.mock("@/lib/blogApi", () => ({
  getAllPosts: jest.fn(() => [
    {
      slug: "my-post",
      date: "2026-01-10T00:00:00.000Z",
      updated: "2026-01-20T00:00:00.000Z",
    },
  ]),
}));

describe("sitemap", () => {
  it("emits canonical trailing-slash blog post URLs", () => {
    const entries = sitemap();
    const blogPostEntry = entries.find(
      (entry) => entry.url === "https://alexleung.ca/blog/my-post/"
    );

    expect(blogPostEntry).toBeDefined();
  });
});
