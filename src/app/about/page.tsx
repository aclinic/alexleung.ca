import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import * as schemadts from "schema-dts";

import { Credentials } from "@/app/about/_components/Credentials";
import { Journey } from "@/app/about/_components/MyBackground";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { buildPageMetadata, buildProfilePageSchema } from "@/lib/seo";

import { Skills } from "./_components/TechnicalInterests";

const title = "About | Alex Leung";
const description =
  "Learn about Alex Leung's background, credentials, and approach to building software products end to end.";
const path = "/about";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path,
  images: [
    {
      url: "/assets/about_portrait.webp",
      width: 5712,
      height: 4284,
      alt: "Alex Leung sitting on a mountain trail during a hiking adventure",
    },
  ],
});

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
        item={buildProfilePageSchema({
          path,
          title,
          description,
        })}
      />

      <PageShell title="About Me" titleId="about">
        <Journey />
        <Skills className="mt-12" />
        <Credentials />
      </PageShell>
    </>
  );
}
