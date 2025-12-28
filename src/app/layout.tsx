import type { Metadata, Viewport } from "next";
import { JsonLd } from "react-schemaorg";
import * as schemadts from "schema-dts";
import "./globals.css";
import { PropsWithChildren } from "react";

const title = "Alex Leung | Staff Engineer & Engineering Lead, P.Eng.";
const description =
  "Alex Leung - Staff Software Engineer, Engineering Lead, and Professional Engineer. Architecting distributed systems and AI solutions. Proven leader of cross-functional teams.";

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords:
    "Alex Leung, Alexander Leung, Alexander Clayton Leung, Alex C Leung, Professional Engineer, P.Eng., PEO, Professional Engineers Ontario, licensed engineer, software engineer, AI engineer, University of Waterloo, Georgia Tech, electrical engineering, distributed systems, embedded systems, full-stack developer, web development, artificial intelligence",
  authors: [{ name: "Alex Leung" }],
  creator: "Alex Leung",
  publisher: "Alex Leung",
  robots: "index, follow",
  metadataBase: new URL("https://alexleung.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: title,
    description: description,
    type: "website",
    url: "https://alexleung.ca",
    siteName: "Alex Leung",
    locale: "en_CA",
    images: [
      {
        url: "/assets/screenshot.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [
      {
        url: "/assets/screenshot.png",
        alt: title,
      },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    title: "Alex Leung",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

function buildPersonSchema(): schemadts.WithContext<schemadts.Person> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    // This ID is the "Digital Fingerprint" that tells Google this is an ENTITY, not just a page
    "@id": "https://alexleung.ca/#person",
    name: "Alex Leung",
    alternateName: [
      "Alexander Leung",
      "Alexander Clayton Leung",
      "Alex C Leung",
    ],
    url: "https://alexleung.ca",
    // Links the Person to the Webpage as the primary subject
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://alexleung.ca",
    },
    image: [
      {
        "@type": "ImageObject",
        url: "https://alexleung.ca/assets/about_portrait.webp",
        caption: "Alex Leung",
      },
      {
        "@type": "ImageObject",
        url: "https://alexleung.ca/assets/about_portrait_mountain.webp",
        caption: "Alex Leung's portrait on a mountain",
      },
    ],
    jobTitle: "Staff Engineer & Engineering Lead",
    description: description,
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
      "Software Engineering",
      "Distributed Systems",
      "Embedded Systems",
      "AI Engineering",
      "Web Development",
      "Systems Design",
      "Electrical Engineering",
      "Technical Leadership",
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

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <body>
        <JsonLd item={buildPersonSchema()} />
        {children}
      </body>
    </html>
  );
}
