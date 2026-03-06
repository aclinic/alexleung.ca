import { buildRssFeedXml } from "@/lib/feed";

describe("buildRssFeedXml", () => {
  it("builds an RSS feed with canonical post links", () => {
    const xml = buildRssFeedXml([
      {
        title: "Test Post",
        slug: "test-post",
        date: "2026-03-01T00:00:00.000Z",
        excerpt: "Short description",
        tags: ["AI", "Systems"],
      },
    ]);

    expect(xml).toContain('<rss version="2.0"');
    expect(xml).toContain("<title>Alex Leung&apos;s Blog</title>");
    expect(xml).toContain("<link>https://alexleung.ca/blog/</link>");
    expect(xml).toContain(
      '<guid isPermaLink="true">https://alexleung.ca/blog/test-post/</guid>'
    );
    expect(xml).toContain("<category>AI</category>");
    expect(xml).toContain("<category>Systems</category>");
  });

  it("escapes XML-sensitive characters in title and excerpt", () => {
    const xml = buildRssFeedXml([
      {
        title: `A&B <title> "quote"`,
        slug: "escape-test",
        date: "2026-03-02T00:00:00.000Z",
        excerpt: "5 > 3 & 2 < 4",
      },
    ]);

    expect(xml).toContain(
      "<title>A&amp;B &lt;title&gt; &quot;quote&quot;</title>"
    );
    expect(xml).toContain("<description>5 &gt; 3 &amp; 2 &lt; 4</description>");
  });
});
