import type { Metadata } from "next";

import { toAbsoluteUrl, toCanonical } from "@/lib/seo/url";

import type { SeoImage, SeoInput } from "./types";

const SITE_NAME = "Alex Leung";
const DEFAULT_LOCALE = "en_CA";

function normalizeImages(images: SeoImage[] | undefined): SeoImage[] {
  if (!images || images.length === 0) {
    return [];
  }

  return images.map((image) => ({
    ...image,
    url: toAbsoluteUrl(image.url),
  }));
}

export function buildPageMetadata(input: SeoInput): Metadata {
  const canonicalUrl = toCanonical(input.path);
  const normalizedImages = normalizeImages(input.images);
  const hasImages = normalizedImages.length > 0;
  const twitterCard =
    input.twitterCard || (hasImages ? "summary_large_image" : "summary");

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      type: input.type || "website",
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      images: hasImages ? normalizedImages : undefined,
    },
    twitter: {
      card: twitterCard,
      title: input.title,
      description: input.description,
      images: hasImages ? normalizedImages : undefined,
    },
  };
}
