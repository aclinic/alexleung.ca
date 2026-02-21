import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import * as schemadts from "schema-dts";

import { Credentials } from "@/app/about/_components/Credentials";
import { Journey } from "@/app/about/_components/MyBackground";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { BASE_URL } from "@/constants";

import { Skills } from "./_components/TechnicalInterests";

const title = "About Me | Alex Leung";
const description =
  "Learn about Alex Leung's journey - from University of Waterloo and Georgia Tech to end-to-end product development.";
const url = `${BASE_URL}/about/`;

export const metadata: Metadata = {
  title: title,
  description: description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: title,
    description: description,
    type: "website",
    url: url,
    siteName: "Alex Leung",
    locale: "en_CA",
    images: [
      {
        url: "/assets/about_portrait.webp",
        width: 5712,
        height: 4284,
        alt: "Alex Leung sitting on a mountain trail during a hiking adventure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [
      {
        url: "/assets/about_portrait.webp",
        alt: "Alex Leung sitting on a mountain trail during a hiking adventure",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: "Home", item: "/" },
          { name: "About Me", item: "/about" },
        ]}
      />
      <JsonLd<schemadts.ProfilePage>
        item={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": url,
          url: url,
          name: title,
          description: description,
          mainEntity: {
            "@type": "Person",
            "@id": `${BASE_URL}/#person`,
          },
          inLanguage: "en-CA",
          isPartOf: {
            "@type": "WebSite",
            "@id": `${BASE_URL}/#website`,
          },
        }}
      />

      <PageShell title="About Me" titleId="about">
        <Journey />
        <Skills className="mt-12" />
        <Credentials />
      </PageShell>
    </>
  );
}
