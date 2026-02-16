import { toAbsoluteUrl, toCanonical } from "@/lib/seo/url";

describe("seo url helpers", () => {
  it("builds absolute URLs from relative paths", () => {
    expect(toAbsoluteUrl("/blog/my-post")).toBe(
      "https://alexleung.ca/blog/my-post"
    );
    expect(toAbsoluteUrl("blog/my-post")).toBe(
      "https://alexleung.ca/blog/my-post"
    );
  });

  it("preserves absolute URLs", () => {
    expect(toAbsoluteUrl("https://example.com/docs/")).toBe(
      "https://example.com/docs/"
    );
  });

  it("normalizes canonical URLs to trailing-slash and strips query/hash", () => {
    expect(toCanonical("/contact")).toBe("https://alexleung.ca/contact/");
    expect(
      toCanonical("https://alexleung.ca/blog?utm_source=test#section")
    ).toBe("https://alexleung.ca/blog/");
  });
});
