import { JsonLd } from "react-schemaorg";

import type { Metadata } from "next";

import * as schemadts from "schema-dts";

import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { Title } from "@/components/Title";
import { buildBasicPageSchema, buildPageMetadata } from "@/lib/seo";

import { EmailMe } from "./_components/EmailMe";
import { SocialMediaList } from "./_components/SocialMediaList";

const title = "Contact | Alex Leung";
const description =
  "Get in touch with Alex Leung - Syntropy Engineer and Programmer. Available for collaboration, consulting, and professional inquiries.";
export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/contact",
  twitterCard: "summary_large_image",
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
        item={buildBasicPageSchema({
          type: "ContactPage",
          path: "/contact",
          title,
          description,
        })}
      />

      <div className="py-[var(--header-height)]">
        <Title title="Contact" id="contact" />
        <EmailMe />
        <SocialMediaList />
      </div>
    </>
  );
}
