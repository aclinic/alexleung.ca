import {
  buildBasicPageSchema,
  getBlogId,
  getPersonId,
  getWebsiteId,
} from "@/lib/seo/jsonLd";

describe("seo json-ld helpers", () => {
  it("returns stable schema identifiers", () => {
    expect(getPersonId()).toBe("https://alexleung.ca/#person");
    expect(getWebsiteId()).toBe("https://alexleung.ca/#website");
    expect(getBlogId()).toBe("https://alexleung.ca/blog/#blog");
  });

  it("builds canonical page schema with shared references", () => {
    const schema = buildBasicPageSchema({
      type: "ContactPage",
      path: "/contact?utm_source=test#top",
      title: "Contact | Alex Leung",
      description: "Get in touch with Alex Leung.",
    });

    expect(schema["@type"]).toBe("ContactPage");
    expect(schema["@id"]).toBe("https://alexleung.ca/contact/");
    expect(schema.url).toBe("https://alexleung.ca/contact/");
    expect(schema.mainEntity).toEqual({
      "@type": "Person",
      "@id": "https://alexleung.ca/#person",
    });
    expect(schema.isPartOf).toEqual({
      "@type": "WebSite",
      "@id": "https://alexleung.ca/#website",
    });
  });
});
