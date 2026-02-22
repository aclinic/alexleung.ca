import type {
  BlogPosting,
  CollectionPage,
  ContactPage,
  ItemList,
  Person,
  ProfilePage,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";

import { toAbsoluteUrl, toCanonical } from "@/lib/seo/url";

const PERSON_ID = "/#person";
const WEBSITE_ID = "/#website";

function getSiteRoot(): string {
  return toAbsoluteUrl("/").replace(/\/$/, "");
}

function buildBasePageSchema<TPageType extends string>({
  description,
  pageType,
  path,
  title,
}: {
  description: string;
  pageType: TPageType;
  path: string;
  title: string;
}) {
  return {
    "@context": "https://schema.org" as const,
    "@type": pageType,
    "@id": toCanonical(path),
    url: toCanonical(path),
    name: title,
    description,
    inLanguage: "en-CA",
    isPartOf: {
      "@type": "WebSite" as const,
      "@id": toAbsoluteUrl(WEBSITE_ID),
    },
  };
}

export function buildProfilePageSchema(input: {
  description: string;
  path: string;
  title: string;
}): WithContext<ProfilePage> {
  return {
    ...buildBasePageSchema({ ...input, pageType: "ProfilePage" }),
    mainEntity: {
      "@type": "Person",
      "@id": toAbsoluteUrl(PERSON_ID),
    },
  };
}

export function buildContactPageSchema(input: {
  description: string;
  path: string;
  title: string;
}): WithContext<ContactPage> {
  return {
    ...buildBasePageSchema({ ...input, pageType: "ContactPage" }),
    mainEntity: {
      "@type": "Person",
      "@id": toAbsoluteUrl(PERSON_ID),
    },
  };
}

export function buildWebPageSchema(input: {
  description: string;
  path: string;
  title: string;
}): WithContext<WebPage> {
  return {
    ...buildBasePageSchema({ ...input, pageType: "WebPage" }),
    mainEntity: {
      "@type": "Person",
      "@id": toAbsoluteUrl(PERSON_ID),
    },
  };
}

export function buildBlogCollectionPageSchema(input: {
  description: string;
  path: string;
  title: string;
}): WithContext<CollectionPage> {
  return {
    ...buildBasePageSchema({ ...input, pageType: "CollectionPage" }),
    mainEntity: {
      "@type": "Blog",
      "@id": toAbsoluteUrl("/blog/#blog"),
      name: "Alex Leung's Blog",
      description: input.description,
      publisher: {
        "@id": toAbsoluteUrl(PERSON_ID),
      },
    },
  };
}

export function buildBlogItemListSchema(
  posts: Array<{ slug: string; title: string }>
): WithContext<ItemList> {
  return {
    "@context": "https://schema.org" as const,
    "@type": "ItemList",
    "@id": toAbsoluteUrl("/blog/#itemlist"),
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: toAbsoluteUrl(`/blog/${post.slug}`),
      name: post.title,
    })),
    numberOfItems: posts.length,
  };
}

export function buildBlogPostingSchema(input: {
  coverImage?: string;
  date: string;
  description?: string;
  slug: string;
  tags: string[];
  title: string;
  updated?: string;
}): WithContext<BlogPosting> {
  const canonicalPostUrl = toCanonical(`/blog/${input.slug}`);

  return {
    "@context": "https://schema.org" as const,
    "@type": "BlogPosting",
    "@id": `${canonicalPostUrl}#blogposting`,
    url: canonicalPostUrl,
    headline: input.title,
    description: input.description,
    keywords: input.tags.length > 0 ? input.tags.join(", ") : undefined,
    image: input.coverImage ? [toAbsoluteUrl(input.coverImage)] : undefined,
    datePublished: new Date(input.date).toISOString(),
    dateModified: new Date(input.updated || input.date).toISOString(),
    author: {
      "@type": "Person",
      "@id": toAbsoluteUrl(PERSON_ID),
      name: "Alex Leung",
    },
    publisher: {
      "@type": "Person",
      "@id": toAbsoluteUrl(PERSON_ID),
    },
    inLanguage: "en-CA",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalPostUrl,
    },
    isPartOf: {
      "@type": "Blog",
      "@id": toAbsoluteUrl("/blog/#blog"),
      name: "Blog | Alex Leung",
    },
  };
}

export function buildPersonSchema(input: {
  description: string;
}): WithContext<Person> {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Person",
    "@id": toAbsoluteUrl(PERSON_ID),
    name: "Alex Leung",
    alternateName: [
      "Alexander Leung",
      "Alexander Clayton Leung",
      "Alex C Leung",
    ],
    url: getSiteRoot(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getSiteRoot(),
    },
    image: [
      {
        "@type": "ImageObject",
        url: toAbsoluteUrl("/assets/about_portrait.webp"),
        caption: "Alex Leung",
      },
      {
        "@type": "ImageObject",
        url: toAbsoluteUrl("/assets/about_portrait_mountain.webp"),
        caption: "Alex Leung's portrait on a mountain",
      },
    ],
    jobTitle: "Software Engineer",
    description: input.description,
    sameAs: [
      "https://www.linkedin.com/in/aclinic",
      "https://www.github.com/aclinic",
      "https://www.x.com/aclyxpse",
      "https://bsky.app/profile/aclinic.bsky.social",
      "https://www.instagram.com/rootpanda",
      "https://scholar.google.ca/citations?user=NcOOsPIAAAAJ",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Waterloo",
      addressRegion: "Ontario",
      addressCountry: "Canada",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Waterloo",
        sameAs: "https://en.wikipedia.org/wiki/University_of_Waterloo",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Georgia Institute of Technology",
        sameAs: "https://en.wikipedia.org/wiki/Georgia_Institute_of_Technology",
      },
    ],
    knowsAbout: [
      "Product Development",
      "Technical Leadership",
      "Software Engineering",
      "AI Engineering",
      "Distributed Systems",
      "Embedded Systems",
      "Web Development",
      "Systems Design",
      "Electrical Engineering",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Jetson",
      url: "https://jetsonhome.com",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Professional Engineer (P.Eng.)",
        credentialCategory: "Professional License",
        recognizedBy: {
          "@type": "Organization",
          name: "Professional Engineers Ontario",
          url: "https://www.peo.on.ca",
          sameAs:
            "https://en.wikipedia.org/wiki/Professional_Engineers_Ontario",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Master of Science in Electrical and Computer Engineering",
        credentialCategory: "Degree",
        educationalLevel: "Master's Degree",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "Georgia Institute of Technology",
          sameAs:
            "https://en.wikipedia.org/wiki/Georgia_Institute_of_Technology",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "Bachelor of Applied Science in Electrical Engineering",
        credentialCategory: "Degree",
        educationalLevel: "Bachelor's Degree",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "University of Waterloo",
          sameAs: "https://en.wikipedia.org/wiki/University_of_Waterloo",
        },
      },
    ],
  };
}

export function buildWebsiteSchema(input: {
  description: string;
}): WithContext<WebSite> {
  return {
    "@context": "https://schema.org" as const,
    "@type": "WebSite",
    "@id": toAbsoluteUrl(WEBSITE_ID),
    url: getSiteRoot(),
    name: "Alex Leung",
    description: input.description,
    publisher: {
      "@id": toAbsoluteUrl(PERSON_ID),
    },
    inLanguage: "en-CA",
  };
}

export function getPersonId() {
  return toAbsoluteUrl(PERSON_ID);
}
