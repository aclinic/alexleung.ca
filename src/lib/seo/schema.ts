import type {
  BlogPosting,
  CollectionPage,
  ContactPage,
  ItemList,
  ProfilePage,
  WebPage,
  WithContext,
} from "schema-dts";

import { toAbsoluteUrl, toCanonical } from "@/lib/seo/url";

const LANGUAGE = "en-CA";
const WEBSITE_ID = `${toAbsoluteUrl("/")}#website`;
const PERSON_ID = `${toAbsoluteUrl("/")}#person`;

type BasePageSchemaInput = {
  description: string;
  path: string;
  title: string;
};

function buildBasePageSchema(input: BasePageSchemaInput) {
  const canonicalUrl = toCanonical(input.path);

  return {
    "@id": canonicalUrl,
    url: canonicalUrl,
    name: input.title,
    description: input.description,
    mainEntity: {
      "@type": "Person" as const,
      "@id": PERSON_ID,
    },
    inLanguage: LANGUAGE,
    isPartOf: {
      "@type": "WebSite" as const,
      "@id": WEBSITE_ID,
    },
  };
}

export function buildProfilePageJsonLd(
  input: BasePageSchemaInput
): WithContext<ProfilePage> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    ...buildBasePageSchema(input),
  };
}

export function buildContactPageJsonLd(
  input: BasePageSchemaInput
): WithContext<ContactPage> {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    ...buildBasePageSchema(input),
  };
}

export function buildWebPageJsonLd(
  input: BasePageSchemaInput
): WithContext<WebPage> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    ...buildBasePageSchema(input),
  };
}

type BlogCollectionPageInput = BasePageSchemaInput & {
  blogDescription: string;
  blogName: string;
};

export function buildBlogCollectionPageJsonLd(
  input: BlogCollectionPageInput
): WithContext<CollectionPage> {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    ...buildBasePageSchema(input),
    mainEntity: {
      "@type": "Blog",
      "@id": `${toAbsoluteUrl("/blog/")}#blog`,
      name: input.blogName,
      description: input.blogDescription,
      publisher: {
        "@id": PERSON_ID,
      },
    },
  };
}

type BlogItem = {
  slug: string;
  title: string;
};

export function buildBlogItemListJsonLd(
  posts: BlogItem[]
): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${toAbsoluteUrl("/blog/")}#itemlist`,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: toCanonical(`/blog/${post.slug}`),
      name: post.title,
    })),
    numberOfItems: posts.length,
  };
}

type BlogPostingInput = {
  coverImage?: string;
  date: string;
  description?: string;
  slug: string;
  tags: string[];
  title: string;
  updated?: string;
};

export function buildBlogPostingJsonLd(
  input: BlogPostingInput
): WithContext<BlogPosting> {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${toCanonical(`/blog/${input.slug}`)}#blogposting`,
    url: toCanonical(`/blog/${input.slug}`),
    headline: input.title,
    description: input.description,
    keywords: input.tags.length > 0 ? input.tags.join(", ") : undefined,
    image: input.coverImage ? [toAbsoluteUrl(input.coverImage)] : undefined,
    datePublished: new Date(input.date).toISOString(),
    dateModified: new Date(input.updated || input.date).toISOString(),
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Alex Leung",
    },
    publisher: {
      "@type": "Person",
      "@id": PERSON_ID,
    },
    inLanguage: LANGUAGE,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": toCanonical(`/blog/${input.slug}`),
    },
    isPartOf: {
      "@type": "Blog",
      "@id": `${toAbsoluteUrl("/blog/")}#blog`,
      name: "Blog | Alex Leung",
    },
  };
}
