import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import * as schemadts from "schema-dts";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { EmailMe } from "./_components/EmailMe";
import { SocialMediaList } from "./_components/SocialMediaList";
import { Title } from "@/components/Title";
import { BASE_URL } from "@/constants";

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

      <div className="py-[var(--header-height)]">
        <Title title="Contact" id="contact" />
        <EmailMe />
        <SocialMediaList />
      </div>
    </>
  );
}
