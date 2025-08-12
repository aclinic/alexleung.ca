import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Leung | Staff Engineer & Engineering Lead, P.Eng.",
  description:
    "Alex Leung - Staff Software Engineer with technical leadership experience at Google and Cash App. Specializes in distributed systems, AI engineering, and leading cross-functional teams. Professional Engineer (P.Eng.) with Professional Engineers Ontario and Electrical Engineering graduate from University of Waterloo and Georgia Tech.",
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
    title: "Alex Leung | Staff Engineer & Engineering Lead, P.Eng.",
    description:
      "Alex Leung - Staff Software Engineer with technical leadership experience at Google and Cash App. Specializes in distributed systems, AI engineering, and leading cross-functional teams. Professional Engineer (P.Eng.) with Professional Engineers Ontario and Electrical Engineering graduate from University of Waterloo and Georgia Tech.",
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
    card: "summary_large_image",
    title: "Alex Leung | Staff Engineer & Engineering Lead, P.Eng.",
    description:
      "Alex Leung - Staff Software Engineer with technical leadership experience at Google and Cash App. Specializes in distributed systems, AI engineering, and leading cross-functional teams. Professional Engineer (P.Eng.) with Professional Engineers Ontario and Electrical Engineering graduate from University of Waterloo and Georgia Tech.",
    images: [
      {
        url: "/assets/screenshot.png",
        alt: "Alex Leung - Software Engineer and AI Engineer",
      },
    ],
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
        url: "https://alexleung.ca",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Alex Leung",
      alternateName: [
        "Alexander Leung",
        "Alexander Clayton Leung",
        "Alex C Leung",
      ],
      jobTitle: "Staff Engineer & Engineering Lead, P.Eng.",
      description:
        "Staff Software Engineer with experience architecting distributed systems and leading cross-functional teams at Google and Cash App. Licensed Professional Engineer (P.Eng.) with Professional Engineers Ontario.",
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
          "@type": "Place",
          name: "Remote",
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
