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
  it("emits canonical trailing-slash URLs", () => {
    const entries = sitemap();
    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ url: "https://alexleung.ca/" }),
        expect.objectContaining({ url: "https://alexleung.ca/about/" }),
        expect.objectContaining({ url: "https://alexleung.ca/now/" }),
        expect.objectContaining({ url: "https://alexleung.ca/blog/" }),
        expect.objectContaining({ url: "https://alexleung.ca/contact/" }),
      ])
    );

    const blogPostEntry = entries.find(
      (entry) => entry.url === "https://alexleung.ca/blog/my-post/"
    );
    const pidControllerEntry = entries.find(
      (entry) =>
        entry.url === "https://alexleung.ca/experimental/pid-controller/"
    );

    expect(blogPostEntry).toBeDefined();
    expect(pidControllerEntry).toBeUndefined();
  });

  it("does not include the event loop page", () => {
    const entries = sitemap();
    expect(
      entries.some((entry) => entry.url.includes("/experimental/event-loop/"))
    ).toBe(false);
  });
});
