import {
  buildBlogCollectionPageJsonLd,
  buildBlogItemListJsonLd,
  buildBlogPostingJsonLd,
  buildContactPageJsonLd,
  buildProfilePageJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo";

describe("SEO JSON-LD schema builders", () => {
  it("builds profile/contact/web page schemas with shared defaults", () => {
    const profile = buildProfilePageJsonLd({
      title: "About Me | Alex Leung",
      description: "About Alex.",
      path: "/about",
    });

    const contact = buildContactPageJsonLd({
      title: "Contact | Alex Leung",
      description: "Contact Alex.",
      path: "/contact",
    });

    const webPage = buildWebPageJsonLd({
      title: "Now | Alex Leung",
      description: "What Alex is doing now.",
      path: "/now",
    });

    expect(profile["@type"]).toBe("ProfilePage");
    expect(contact["@type"]).toBe("ContactPage");
    expect(webPage["@type"]).toBe("WebPage");
    expect(profile.url).toBe("https://alexleung.ca/about/");
    expect(contact.mainEntity?.["@id"]).toBe("https://alexleung.ca/#person");
    expect(webPage.isPartOf?.["@id"]).toBe("https://alexleung.ca/#website");
  });

  it("builds blog collection and item list schemas", () => {
    const collection = buildBlogCollectionPageJsonLd({
      title: "Blog | Alex Leung",
      description: "Blog home.",
      path: "/blog",
      blogPath: "/blog",
      blogName: "Alex Leung's Blog",
      blogDescription: "Blog home.",
    });

    const list = buildBlogItemListJsonLd(
      [
        { slug: "post-a", title: "Post A" },
        { slug: "post-b", title: "Post B" },
      ],
      { blogPath: "/blog" }
    );

    expect(collection.mainEntity?.["@type"]).toBe("Blog");
    expect(collection.mainEntity?.["@id"]).toBe(
      "https://alexleung.ca/blog/#blog"
    );
    expect(collection.mainEntity?.publisher?.["@id"]).toBe(
      "https://alexleung.ca/#person"
    );
    expect(list.itemListElement?.[0]?.url).toBe(
      "https://alexleung.ca/blog/post-a/"
    );
    expect(list.numberOfItems).toBe(2);
  });

  it("builds blog posting schema from route-provided page concerns", () => {
    const posting = buildBlogPostingJsonLd({
      path: "/blog/deep-dive",
      blogPath: "/blog",
      blogName: "Blog | Alex Leung",
      authorName: "Alex Leung",
      title: "Deep Dive",
      description: "A deep dive post.",
      coverImage: "/assets/deep-dive.webp",
      date: "2026-02-01",
      updated: "2026-02-03",
      tags: ["architecture", "testing"],
    });

    expect(posting.url).toBe("https://alexleung.ca/blog/deep-dive/");
    expect(posting.isPartOf?.name).toBe("Blog | Alex Leung");
    expect(posting.author?.name).toBe("Alex Leung");
    expect(posting.image).toEqual([
      "https://alexleung.ca/assets/deep-dive.webp",
    ]);
    expect(posting.keywords).toBe("architecture, testing");
    expect(posting.datePublished).toBe("2026-02-01T00:00:00.000Z");
    expect(posting.dateModified).toBe("2026-02-03T00:00:00.000Z");
  });
});
