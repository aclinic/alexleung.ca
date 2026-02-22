import { buildPageMetadata } from "@/lib/seo/metadata";

describe("buildPageMetadata", () => {
  it("builds canonical, Open Graph, and Twitter metadata with defaults", () => {
    const metadata = buildPageMetadata({
      title: "About Me | Alex Leung",
      description: "Learn more about Alex Leung.",
      path: "/about",
    });

    const openGraph = metadata.openGraph;
    const twitter = metadata.twitter;

    expect(metadata.alternates?.canonical).toBe("https://alexleung.ca/about/");
    expect(openGraph?.url).toBe("https://alexleung.ca/about/");

    if (openGraph && "type" in openGraph) {
      expect(openGraph.type).toBe("website");
    }

    expect(openGraph?.siteName).toBe("Alex Leung");

    if (twitter && "card" in twitter) {
      expect(twitter.card).toBe("summary");
    }
  });

  it("normalizes image URLs and uses large-image twitter card when images exist", () => {
    const metadata = buildPageMetadata({
      title: "Blog | Alex Leung",
      description: "Latest writing.",
      path: "/blog",
      images: [
        {
          url: "/assets/screenshot.png",
          alt: "Blog screenshot",
          width: 1200,
          height: 630,
        },
      ],
    });

    const twitter = metadata.twitter;

    expect(metadata.openGraph?.images).toEqual([
      {
        url: "https://alexleung.ca/assets/screenshot.png",
        alt: "Blog screenshot",
        width: 1200,
        height: 630,
      },
    ]);
    expect(twitter?.images).toEqual([
      {
        url: "https://alexleung.ca/assets/screenshot.png",
        alt: "Blog screenshot",
        width: 1200,
        height: 630,
      },
    ]);

    if (twitter && "card" in twitter) {
      expect(twitter.card).toBe("summary_large_image");
    }
  });

  it("supports overriding metadata type and twitter card", () => {
    const metadata = buildPageMetadata({
      title: "A post | Alex Leung",
      description: "A deep dive post.",
      path: "/blog/deep-dive",
      type: "article",
      twitterCard: "summary",
    });

    const openGraph = metadata.openGraph;
    const twitter = metadata.twitter;

    if (openGraph && "type" in openGraph) {
      expect(openGraph.type).toBe("article");
    }

    if (twitter && "card" in twitter) {
      expect(twitter.card).toBe("summary");
    }
  });
});
