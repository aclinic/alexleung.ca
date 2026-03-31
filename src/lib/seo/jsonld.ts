import type {
  Article,
  BlogPosting,
  CollectionPage,
  ContactPage,
  ItemList,
  Occupation,
  Person,
  ProfilePage,
  Service,
  SiteNavigationElement,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";

import { NAV_LINKS } from "@/constants/navigation";
import { toAbsoluteUrl, toCanonical } from "@/lib/seo/url";

const PERSON_ID = "/#person";
const WEBSITE_ID = "/#website";
const SITE_NAVIGATION_ID = "/#site-navigation";
const ABOUT_PATH = "/about";
const SITE_ROOT = toAbsoluteUrl("/").replace(/\/$/, "");
const SOCIAL_PROFILES = [
  "https://www.linkedin.com/in/aclyx",
  "https://github.com/aclyx",
  "https://www.x.com/aclyxpse",
  "https://bsky.app/profile/alexleung.ca",
  "https://www.instagram.com/rootpanda",
  "https://scholar.google.ca/citations?user=NcOOsPIAAAAJ",
];
const PERSON_REFERENCE = {
  "@type": "Person" as const,
  "@id": toAbsoluteUrl(PERSON_ID),
  name: "Alex Leung",
  url: toCanonical(ABOUT_PATH),
  image: toAbsoluteUrl("/assets/about_portrait.webp"),
  sameAs: SOCIAL_PROFILES,
};

const GEO_SERVICE_AREAS = [
  {
    "@type": "AdministrativeArea" as const,
    name: "Ontario",
    sameAs: "https://en.wikipedia.org/wiki/Ontario",
  },
  {
    "@type": "Country" as const,
    name: "Canada",
    sameAs: "https://en.wikipedia.org/wiki/Canada",
  },
  {
    "@type": "Country" as const,
    name: "United States",
    sameAs: "https://en.wikipedia.org/wiki/United_States",
  },
  {
    "@type": "AdministrativeArea" as const,
    name: "California",
    sameAs: "https://en.wikipedia.org/wiki/California",
  },
  {
    "@type": "City" as const,
    name: "Waterloo",
    sameAs: "https://en.wikipedia.org/wiki/Waterloo,_Ontario",
  },
  {
    "@type": "City" as const,
    name: "Toronto",
    sameAs: "https://en.wikipedia.org/wiki/Toronto",
  },
  {
    "@type": "City" as const,
    name: "San Francisco",
    sameAs: "https://en.wikipedia.org/wiki/San_Francisco",
  },
];

type PostSchemaInput = {
  coverImage?: string;
  date: string;
  description?: string;
  slug: string;
  tags: string[];
  title: string;
  updated?: string;
};

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

function buildBasePostSchema(input: PostSchemaInput) {
  const canonicalPostUrl = toCanonical(`/blog/${input.slug}`);

  return {
    canonicalPostUrl,
    schema: {
      url: canonicalPostUrl,
      headline: input.title,
      description: input.description,
      keywords: input.tags.length > 0 ? input.tags.join(", ") : undefined,
      image: input.coverImage ? [toAbsoluteUrl(input.coverImage)] : undefined,
      datePublished: new Date(input.date).toISOString(),
      dateModified: new Date(input.updated ?? input.date).toISOString(),
      author: PERSON_REFERENCE,
      publisher: PERSON_REFERENCE,
      inLanguage: "en-CA",
      mainEntityOfPage: {
        "@type": "WebPage" as const,
        "@id": canonicalPostUrl,
      },
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
      ...PERSON_REFERENCE,
      description: input.description,
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

export function buildHomePageSchema(input: {
  description: string;
  path: string;
  title: string;
}): WithContext<WebPage> {
  return {
    ...buildBasePageSchema({ ...input, pageType: "WebPage" }),
    about: {
      "@id": toAbsoluteUrl(PERSON_ID),
    },
    mainEntity: {
      "@type": "Person",
      "@id": toAbsoluteUrl(PERSON_ID),
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: toAbsoluteUrl("/assets/alex_vibing.webp"),
      caption: "Alex Leung",
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
      url: toCanonical(`/blog/${post.slug}`),
      name: post.title,
    })),
    numberOfItems: posts.length,
  };
}

export function buildBlogPostingSchema(
  input: PostSchemaInput
): WithContext<BlogPosting> {
  const { canonicalPostUrl, schema } = buildBasePostSchema(input);

  return {
    "@context": "https://schema.org" as const,
    "@type": "BlogPosting",
    "@id": `${canonicalPostUrl}#blogposting`,
    ...schema,
    isPartOf: {
      "@type": "Blog",
      "@id": toAbsoluteUrl("/blog/#blog"),
      name: "Blog | Alex Leung",
    },
  };
}

export function buildArticleSchema(
  input: PostSchemaInput
): WithContext<Article> {
  const { canonicalPostUrl, schema } = buildBasePostSchema(input);

  return {
    "@context": "https://schema.org" as const,
    "@type": "Article",
    "@id": `${canonicalPostUrl}#article`,
    ...schema,
  };
}

export function buildPersonSchema(input: {
  description: string;
}): WithContext<Person> {
  const currentOccupation: Occupation = {
    "@type": "Occupation",
    name: "Software Engineer",
    occupationLocation: {
      "@type": "City",
      name: "Waterloo, Ontario, Canada",
    },
    skills:
      "Software engineering, systems design, AI systems, distributed systems, product engineering, and writing in public",
  };

  return {
    "@context": "https://schema.org" as const,
    "@type": "Person",
    "@id": toAbsoluteUrl(PERSON_ID),
    name: "Alex Leung",
    givenName: "Alex",
    familyName: "Leung",
    honorificSuffix: "P.Eng.",
    alternateName: [
      "Alexander Leung",
      "Alexander Clayton Leung",
      "Alex C Leung",
      "aclinic",
      "acl",
      "aclyxpse",
      "aclyx",
      "yattaro",
      "rootpanda",
    ],
    url: SITE_ROOT,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": SITE_ROOT,
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
    hasOccupation: currentOccupation,
    description: input.description,
    disambiguatingDescription:
      "Software engineer and writer sharing notes on systems, AI, and learning in public.",
    knowsLanguage: ["en-CA"],
    sameAs: SOCIAL_PROFILES,
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
      "Software Engineering",
      "AI Systems",
      "Applied AI",
      "AI Products",
      "Machine Learning Systems",
      "Agentic Systems",
      "Evaluation",
      "Distributed Systems",
      "Backend Architecture",
      "Full-Stack Product Engineering",
      "Technical Leadership",
      "Systems Design",
      "Embedded Systems",
      "Electrical Engineering",
    ],
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
    memberOf: {
      "@type": "Organization",
      name: "Professional Engineers Ontario",
      url: "https://www.peo.on.ca",
    },
  };
}

export function buildProfessionalServiceSchema(input: {
  description: string;
}): WithContext<Service> {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Service",
    "@id": toAbsoluteUrl("/#service"),
    name: "Software Engineering, AI Systems, and Product Engineering",
    description: input.description,
    provider: {
      "@id": toAbsoluteUrl(PERSON_ID),
    },
    areaServed: GEO_SERVICE_AREAS,
  };
}

export function buildWebsiteSchema(input: {
  description: string;
}): WithContext<WebSite> {
  return {
    "@context": "https://schema.org" as const,
    "@type": "WebSite",
    "@id": toAbsoluteUrl(WEBSITE_ID),
    url: SITE_ROOT,
    name: "Alex Leung",
    description: input.description,
    about: {
      "@id": toAbsoluteUrl(PERSON_ID),
    },
    publisher: {
      "@id": toAbsoluteUrl(PERSON_ID),
    },
    hasPart: [
      {
        "@type": "WebPage",
        "@id": toCanonical("/about"),
      },
      {
        "@type": "CollectionPage",
        "@id": toCanonical("/blog"),
      },
      {
        "@type": "ContactPage",
        "@id": toCanonical("/contact"),
      },
      {
        "@type": "WebPage",
        "@id": toCanonical("/now"),
      },
    ],
    inLanguage: "en-CA",
  };
}

export function buildSiteNavigationSchema(): WithContext<SiteNavigationElement> {
  return {
    "@context": "https://schema.org" as const,
    "@type": "SiteNavigationElement",
    "@id": toAbsoluteUrl(SITE_NAVIGATION_ID),
    name: "Main navigation",
    url: SITE_ROOT,
    isPartOf: {
      "@type": "WebSite",
      "@id": toAbsoluteUrl(WEBSITE_ID),
    },
    hasPart: NAV_LINKS.map((item) => ({
      "@type": "SiteNavigationElement" as const,
      "@id": toAbsoluteUrl(`/#site-navigation-${item.id}`),
      name: item.label,
      url: toCanonical(item.canonicalPath),
    })),
    inLanguage: "en-CA",
  };
}
