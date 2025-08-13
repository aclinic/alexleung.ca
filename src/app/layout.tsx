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
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "256x256 128x128 64x64 48x48 32x32 16x16",
        type: "image/x-icon",
      },
      { url: "/assets/icons/ios/16.png", sizes: "16x16", type: "image/png" },
      { url: "/assets/icons/ios/32.png", sizes: "32x32", type: "image/png" },
      {
        url: "/assets/icons/windows11/Square44x44Logo.targetsize-96.png",
        sizes: "96x96",
        type: "image/png",
      },
      { url: "/assets/icons/ios/192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/icons/ios/512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/assets/icons/ios/180.png", sizes: "180x180", type: "image/png" },
      { url: "/assets/icons/ios/152.png", sizes: "152x152", type: "image/png" },
      { url: "/assets/icons/ios/144.png", sizes: "144x144", type: "image/png" },
      { url: "/assets/icons/ios/120.png", sizes: "120x120", type: "image/png" },
      { url: "/assets/icons/ios/114.png", sizes: "114x114", type: "image/png" },
      { url: "/assets/icons/ios/76.png", sizes: "76x76", type: "image/png" },
      { url: "/assets/icons/ios/72.png", sizes: "72x72", type: "image/png" },
      { url: "/assets/icons/ios/60.png", sizes: "60x60", type: "image/png" },
      { url: "/assets/icons/ios/57.png", sizes: "57x57", type: "image/png" },
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

function buildProfilePageSchema(): schemadts.WithContext<schemadts.ProfilePage> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: title,
    url: "https://alexleung.ca",
    description: description,
    mainEntity: {
      "@type": "Person",
      name: "Alex Leung",
      alternateName: [
        "Alexander Leung",
        "Alexander Clayton Leung",
        "Alex C Leung",
      ],
      image: [
        {
          "@type": "ImageObject",
          url: "https://alexleung.ca/assets/about_portrait.webp",
          caption: "Alex Leung in nature",
        },
        {
          "@type": "ImageObject",
          url: "https://alexleung.ca/assets/about_portrait_mountain.webp",
          caption: "Alex Leung's portrait on a mountain",
        },
      ],
      jobTitle: "Staff Engineer & Engineering Lead, P.Eng.",
      description: description,
      url: "https://alexleung.ca",
      sameAs: [
        "https://www.linkedin.com/in/aclinic",
        "https://www.github.com/aclinic",
        "https://www.x.com/acl1n1c",
        "https://bsky.app/profile/aclinic.bsky.social",
        "https://www.instagram.com/rootpanda",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kitchener",
        addressRegion: "Ontario",
        addressCountry: "Canada",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "University of Waterloo",
          description: "Electrical Engineering",
        },
        {
          "@type": "EducationalOrganization",
          name: "Georgia Institute of Technology",
          description: "Electrical Engineering",
        },
      ],
      knowsAbout: [
        "Software Engineering",
        "Distributed Systems",
        "Embedded Systems",
        "AI Engineering",
        "Web Development",
        "Full-stack Development",
        "Systems Design",
        "Electrical Engineering",
        "Technical Leadership",
        "Cross-functional Team Management",
        "Product Development",
      ],
      worksFor: [
        {
          "@type": "Organization",
          name: "Jetson",
          url: "https://jetsonhome.com",
        },
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Staff Engineer & Engineering Lead",
        occupationLocation: {
          "@type": "Country",
          name: "Canada",
        },
      },
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "Professional Engineer (P.Eng.)",
          description: "Licensed Professional Engineer in Ontario, Canada",
          credentialCategory: "Professional License",
          recognizedBy: {
            "@type": "Organization",
            name: "Professional Engineers Ontario",
            url: "https://www.peo.on.ca",
            description:
              "Professional Engineers Ontario (PEO) is the licensing body for professional engineers in Ontario, Canada",
          },
          about: [
            "Professional Engineering",
            "Engineering Ethics",
            "Engineering Practice",
          ],
        },
      ],
    },
  };
}

export default function RootLayout({ children }: PropsWithChildren<{}>) {
  return (
    <html lang="en">
      <body>
        <JsonLd item={buildProfilePageSchema()} />
        {children}
      </body>
    </html>
  );
}
