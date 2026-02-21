import { PropsWithChildren } from "react";
import { JsonLd } from "react-schemaorg";

import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";

import * as schemadts from "schema-dts";

import { AppBackground } from "@/components/AppBackground";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SocialLinks from "@/components/SocialLinks";
import { BASE_URL } from "@/constants";

import "./globals.css";

const title = "Alex Leung | Syntropy Engineer and Programmer, P.Eng.";
const description =
  "Personal website of Alex Leung, a Syntropy Engineer and Programmer, featuring writing on software, systems, and learning in public.";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords:
    "Alex Leung, Alexander Leung, Alexander Clayton Leung, Alex C Leung, Professional Engineer, P.Eng., PEO, Professional Engineers Ontario, licensed engineer, software engineer, product development, technical leadership, AI engineer, University of Waterloo, Georgia Tech, electrical engineering, distributed systems, embedded systems, full-stack developer, web development, artificial intelligence",
  authors: [{ name: "Alex Leung" }],
  creator: "Alex Leung",
  publisher: "Alex Leung",
  robots: "index, follow",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: title,
    description: description,
    type: "website",
    url: BASE_URL,
    siteName: "Alex Leung",
    locale: "en_CA",
    images: [
      {
        url: "/assets/alex_vibing.webp",
        width: 1536,
        height: 1024,
        alt: title,
      },
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
        url: "/assets/alex_vibing.webp",
        alt: title,
      },
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
    "@id": `${BASE_URL}/#person`,
    name: "Alex Leung",
    alternateName: [
      "Alexander Leung",
      "Alexander Clayton Leung",
      "Alex C Leung",
    ],
    url: BASE_URL,
    // Links the Person to the Webpage as the primary subject
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": BASE_URL,
    },
    image: [
      {
        "@type": "ImageObject",
        url: `${BASE_URL}/assets/about_portrait.webp`,
        caption: "Alex Leung",
      },
      {
        "@type": "ImageObject",
        url: `${BASE_URL}/assets/about_portrait_mountain.webp`,
        caption: "Alex Leung's portrait on a mountain",
      },
    ],
    jobTitle: "Software Engineer",
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

function buildWebSiteSchema(): schemadts.WithContext<schemadts.WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Alex Leung",
    description: description,
    publisher: {
      "@id": `${BASE_URL}/#person`,
    },
    inLanguage: "en-CA",
  };
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${lato.className} flex min-h-screen flex-col`}>
        <JsonLd item={buildPersonSchema()} />
        <JsonLd item={buildWebSiteSchema()} />
        <AppBackground />
        <Header />
        <SocialLinks />
        <main className="flex flex-grow flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
