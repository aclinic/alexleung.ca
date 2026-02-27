import {
  buildBlogCollectionPageSchema,
  buildBlogItemListSchema,
  buildBlogPostingSchema,
  buildContactPageSchema,
  buildHomePageSchema,
  buildPersonSchema,
  buildProfilePageSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
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

  it("builds enhanced home and website schemas", () => {
    const home = buildHomePageSchema({
      path: "/",
      title: "Alex Leung | Syntropy Engineer and Programmer, P.Eng.",
      description: "Homepage description",
    });
    const website = buildWebsiteSchema({
      description: "Website description",
    });

    expect(home.primaryImageOfPage).toMatchObject({
      "@type": "ImageObject",
      url: "https://alexleung.ca/assets/alex_vibing.webp",
    });

    const hasPart = website.hasPart;
    expect(Array.isArray(hasPart)).toBe(true);

    if (!Array.isArray(hasPart)) {
      throw new Error("Expected hasPart to be an array");
    }

    expect(hasPart).toHaveLength(4);
    expect(hasPart[0]).toEqual({
      "@type": "WebPage",
      "@id": "https://alexleung.ca/about/",
    });
  });

  it("builds person schema with richer identity metadata", () => {
    const person = buildPersonSchema({
      description: "Person description",
    });

    if (typeof person === "string") {
      throw new Error("Expected person schema object");
    }

    expect(person.givenName).toBe("Alex");
    expect(person.familyName).toBe("Leung");
    expect(person.honorificSuffix).toBe("P.Eng.");
    expect(person.memberOf).toMatchObject({
      "@type": "Organization",
      name: "Professional Engineers Ontario",
    });
    expect(person.knowsLanguage).toEqual(["en-CA"]);
    expect(person.sameAs).toContain("https://github.com/aclinic");
    expect(person.hasOccupation).toMatchObject({
      "@type": "Occupation",
      name: "Software Engineer",
    });
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
