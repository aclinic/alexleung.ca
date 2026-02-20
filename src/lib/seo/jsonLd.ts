import { BASE_URL } from "@/constants";
import { toCanonical } from "@/lib/seo/url";

type BasicPageSchemaInput = {
  description: string;
  path: string;
  title: string;
  type: string;
};

export function getPersonId(): string {
  return `${BASE_URL}/#person`;
}

export function getWebsiteId(): string {
  return `${BASE_URL}/#website`;
}

export function getBlogId(): string {
  return `${BASE_URL}/blog/#blog`;
}

export function buildBasicPageSchema(input: BasicPageSchemaInput) {
  const canonicalUrl = toCanonical(input.path);

  return {
    "@context": "https://schema.org",
    "@type": input.type,
    "@id": canonicalUrl,
    url: canonicalUrl,
    name: input.title,
    description: input.description,
    mainEntity: {
      "@type": "Person",
      "@id": getPersonId(),
    },
    inLanguage: "en-CA",
    isPartOf: {
      "@type": "WebSite",
      "@id": getWebsiteId(),
    },
  };
}
