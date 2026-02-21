import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import * as schemadts from "schema-dts";

import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { Title } from "@/components/Title";
import { buildContactPageJsonLd, buildPageMetadata } from "@/lib/seo";

import { EmailMe } from "./_components/EmailMe";
import { SocialMediaList } from "./_components/SocialMediaList";

const title = "Contact | Alex Leung";
const description =
  "Get in touch with Alex Leung - Syntropy Engineer and Programmer. Available for collaboration, consulting, and professional inquiries.";
const path = "/contact";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path,
});

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
        item={buildContactPageJsonLd({ path, title, description })}
      />

      <div className="py-[var(--header-height)]">
        <Title title="Contact" id="contact" />
        <EmailMe />
        <SocialMediaList />
      </div>
    </>
  );
}
