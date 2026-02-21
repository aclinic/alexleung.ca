import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import * as schemadts from "schema-dts";

import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { BASE_URL } from "@/constants";

import { EmailMe } from "./_components/EmailMe";
import { SocialMediaList } from "./_components/SocialMediaList";

const title = "Contact | Alex Leung";
const description =
  "Get in touch with Alex Leung - Syntropy Engineer and Programmer. Available for collaboration, consulting, and professional inquiries.";
const url = `${BASE_URL}/contact/`;

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
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: "Home", item: "/" },
          { name: "Contact", item: "/contact" },
        ]}
      />
      <JsonLd<schemadts.ContactPage>
        item={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
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

      <PageShell title="Contact" titleId="contact">
        <EmailMe />
        <SocialMediaList />
      </PageShell>
    </>
  );
}
