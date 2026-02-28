import {
  buildBlogCollectionPageSchema,
  buildBlogItemListSchema,
  buildBlogPostingSchema,
  buildContactPageSchema,
  buildPersonSchema,
  buildProfessionalServiceSchema,
  buildProfilePageSchema,
  buildWebPageSchema,
} from "@/lib/seo";

describe("seo jsonld builders", () => {
  it("builds profile/contact/web page schemas with canonical IDs", () => {
    const profile = buildProfilePageSchema({
      path: "/about",
      title: "About Me | Alex Leung",
      description: "About page description",
    });
    const contact = buildContactPageSchema({
      path: "/contact",
      title: "Contact | Alex Leung",
      description: "Contact page description",
    });
    const now = buildWebPageSchema({
      path: "/now",
      title: "What I'm Doing Now | Alex Leung",
      description: "Now page description",
    });

    expect(profile["@id"]).toBe("https://alexleung.ca/about/");
    expect(contact["@id"]).toBe("https://alexleung.ca/contact/");
    expect(now["@id"]).toBe("https://alexleung.ca/now/");
  });

  it("builds blog collection and item list schemas", () => {
    const collection = buildBlogCollectionPageSchema({
      path: "/blog",
      title: "Blog | Alex Leung",
      description: "Blog index description",
    });
    const itemList = buildBlogItemListSchema([
      { slug: "post-1", title: "Post 1" },
      { slug: "post-2", title: "Post 2" },
    ]);

    expect(collection.mainEntity).toBeDefined();

    const itemListElement = itemList.itemListElement;
    expect(Array.isArray(itemListElement)).toBe(true);
    expect(itemList.numberOfItems).toBe(2);

    if (!Array.isArray(itemListElement)) {
      throw new Error("Expected itemListElement to be an array");
    }

    expect(itemListElement[0]).toMatchObject({
      name: "Post 1",
      position: 1,
      url: "https://alexleung.ca/blog/post-1",
    });
  });

  it("builds person schema with aliases", () => {
    const person = buildPersonSchema({
      description: "Personal website of Alex Leung",
    });

    if (typeof person === "string") {
      throw new Error("Expected person schema to be an object");
    }

    expect(person.alternateName).toEqual(
      expect.arrayContaining([
        "aclinic",
        "acl",
        "aclyxpse",
        "aclyx",
        "yattaro",
        "rootpanda",
      ])
    );
  });

  it("builds professional service schema with service areas", () => {
    const service = buildProfessionalServiceSchema({
      description: "Personal website of Alex Leung",
    });

    if (typeof service === "string") {
      throw new Error("Expected service schema to be an object");
    }

    expect(service["@type"]).toBe("Service");
    expect(service.areaServed).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Ontario" }),
        expect.objectContaining({ name: "California" }),
        expect.objectContaining({ name: "Waterloo" }),
        expect.objectContaining({ name: "Toronto" }),
        expect.objectContaining({ name: "Canada" }),
        expect.objectContaining({ name: "United States" }),
        expect.objectContaining({ name: "San Francisco" }),
      ])
    );
  });

  it("builds blog posting schema with normalized urls and keywords", () => {
    const posting = buildBlogPostingSchema({
      slug: "deep-dive",
      title: "Deep Dive",
      description: "A deep dive post",
      coverImage: "/assets/blog/cover.webp",
      date: "2026-02-16",
      updated: "2026-02-18",
      tags: ["ai", "systems"],
    });

    expect(posting.url).toBe("https://alexleung.ca/blog/deep-dive/");
    expect(posting["@id"]).toBe(
      "https://alexleung.ca/blog/deep-dive/#blogposting"
    );
    expect(posting.image).toEqual([
      "https://alexleung.ca/assets/blog/cover.webp",
    ]);
    expect(posting.keywords).toBe("ai, systems");
    expect(posting.datePublished).toBe("2026-02-16T00:00:00.000Z");
    expect(posting.dateModified).toBe("2026-02-18T00:00:00.000Z");
    expect(posting.mainEntityOfPage).toEqual({
      "@type": "WebPage",
      "@id": "https://alexleung.ca/blog/deep-dive/",
    });
  });
});
