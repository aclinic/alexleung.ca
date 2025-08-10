import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Leung | Staff Software Engineer | AI Lead",
  description:
    "Alex Leung - Staff Software Engineer and AI Lead with technical leadership experience at Google and Cash App. Specializes in distributed systems, AI engineering, and leading cross-functional teams. Electrical Engineering graduate from University of Waterloo and Georgia Tech.",
  keywords:
    "Alex Leung, software engineer, AI engineer, University of Waterloo, Georgia Tech, electrical engineering, distributed systems, embedded systems, full-stack developer, web development, artificial intelligence",
  authors: [{ name: "Alex Leung" }],
  creator: "Alex Leung",
  publisher: "Alex Leung",
  robots: "index, follow",
  metadataBase: new URL("https://alexleung.ca"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Alex Leung | Staff Software Engineer | AI Lead",
    description:
      "Alex Leung - Staff Software Engineer and AI Lead with technical leadership experience at Google and Cash App. Specializes in distributed systems, AI engineering, and leading cross-functional teams. Electrical Engineering graduate from University of Waterloo and Georgia Tech.",
    type: "website",
    url: "https://alexleung.ca",
    siteName: "Alex Leung",
    locale: "en_CA",
    images: [
      {
        url: "/assets/screenshot.png",
        width: 1200,
        height: 630,
        alt: "Alex Leung - Software Engineer and AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Alex Leung | Staff Software Engineer | AI Lead",
    description:
      "Alex Leung - Staff Software Engineer and AI Lead with technical leadership experience at Google and Cash App. Specializes in distributed systems, AI engineering, and leading cross-functional teams. Electrical Engineering graduate from University of Waterloo and Georgia Tech.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Alex Leung",
      url: "https://alexleung.ca",
      description:
        "Personal website of Alex Leung, Software Engineer and AI Engineer",
      author: {
        "@type": "Person",
        name: "Alex Leung",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Alex Leung",
      jobTitle: "Staff Software Engineer",
      description:
        "Staff Software Engineer and AI Lead with experience architecting distributed systems and leading cross-functional teams at Google and Cash App",
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
      ],
    },
  ];

  return (
    <html lang="en">
      <body>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(structuredData)}
        </Script>
        {children}
      </body>
    </html>
  );
}
