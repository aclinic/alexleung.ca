import {
  buildArticleSchema,
  buildBlogCollectionPageSchema,
  buildBlogItemListSchema,
  buildBlogPostingSchema,
  buildContactPageSchema,
  buildHomePageSchema,
  buildPersonSchema,
  buildProfessionalServiceSchema,
  buildProfilePageSchema,
  buildWebPageSchema,
  buildWebsiteSchema,
} from "@/lib/seo";

function expectSchemaArray<T>(value: unknown): readonly T[] {
  expect(Array.isArray(value)).toBe(true);
  return value as readonly T[];
}

function expectSchemaObject<T>(value: T): Exclude<T, string> {
  expect(typeof value).toBe("object");
  return value as Exclude<T, string>;
}

describe("seo jsonld builders", () => {
  it("builds profile/contact/web page schemas with canonical IDs", () => {
    const profile = buildProfilePageSchema({
      path: "/about",
      title: "About Alex Leung | Software Engineer",
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
    expect(profile.mainEntity).toMatchObject({
      "@id": "https://alexleung.ca/#person",
      name: "Alex Leung",
      url: "https://alexleung.ca/about/",
      image: "https://alexleung.ca/assets/about_portrait.webp",
    });
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

    const itemListElement = expectSchemaArray<{
      name?: string;
      position?: number;
      url?: string;
    }>(itemList.itemListElement);
    expect(itemList.numberOfItems).toBe(2);

    expect(itemListElement[0]).toMatchObject({
      name: "Post 1",
      position: 1,
      url: "https://alexleung.ca/blog/post-1/",
    });
  });

  it("builds enhanced home and website schemas", () => {
    const home = buildHomePageSchema({
      path: "/",
      title:
        "Alex Leung | Software Engineer for AI Systems, Product Engineering, and Distributed Systems",
      description: "Homepage description",
    });
    const website = buildWebsiteSchema({
      description: "Website description",
    });

    expect(home.primaryImageOfPage).toMatchObject({
      "@type": "ImageObject",
      url: "https://alexleung.ca/assets/alex_vibing.webp",
    });

    const hasPart = expectSchemaArray<{
      "@type"?: string;
      "@id"?: string;
    }>(website.hasPart);

    expect(hasPart).toHaveLength(4);
    expect(hasPart[0]).toEqual({
      "@type": "WebPage",
      "@id": "https://alexleung.ca/about/",
    });
  });

  it("builds person schema with richer identity metadata", () => {
    const person = expectSchemaObject(
      buildPersonSchema({
        description: "Person description",
      })
    );

    expect(person.givenName).toBe("Alex");
    expect(person.familyName).toBe("Leung");
    expect(person.honorificSuffix).toBe("P.Eng.");
    expect(person.memberOf).toMatchObject({
      "@type": "Organization",
      name: "Professional Engineers Ontario",
    });
    expect(person.knowsLanguage).toEqual(["en-CA"]);
    expect(person.sameAs).toContain("https://github.com/aclyx");
    expect(person.hasOccupation).toMatchObject({
      "@type": "Occupation",
      name: "Software Engineer",
      skills: expect.stringContaining("writing in public"),
    });
    expect(person.disambiguatingDescription).toBe(
      "Software engineer and writer sharing notes on systems, AI, and learning in public."
    );
    expect(person.knowsAbout).toEqual(
      expect.arrayContaining([
        "Applied AI",
        "Agentic Systems",
        "Machine Learning Systems",
        "Full-Stack Product Engineering",
        "Technical Leadership",
      ])
    );
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
    expect(person.worksFor).toBeUndefined();
  });

  it("builds professional service schema with service areas", () => {
    const service = expectSchemaObject(
      buildProfessionalServiceSchema({
        description: "Personal website of Alex Leung",
      })
    );

    expect(service["@type"]).toBe("Service");
    expect(service.name).toBe(
      "Software Engineering, AI Systems, and Product Engineering"
    );
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
    expect(posting.author).toMatchObject({
      "@id": "https://alexleung.ca/#person",
      name: "Alex Leung",
      url: "https://alexleung.ca/about/",
      image: "https://alexleung.ca/assets/about_portrait.webp",
    });
    expect(posting.mainEntityOfPage).toEqual({
      "@type": "WebPage",
      "@id": "https://alexleung.ca/blog/deep-dive/",
    });
  });

  it("builds article schema for blog posts", () => {
    const article = buildArticleSchema({
      slug: "deep-dive",
      title: "Deep Dive",
      description: "A deep dive post",
      coverImage: "/assets/blog/cover.webp",
      date: "2026-02-16",
      updated: "2026-02-18",
      tags: ["ai", "systems"],
    });

    expect(article["@id"]).toBe("https://alexleung.ca/blog/deep-dive/#article");
    expect(article.url).toBe("https://alexleung.ca/blog/deep-dive/");
  });
});
