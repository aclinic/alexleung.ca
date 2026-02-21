import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import * as schemadts from "schema-dts";

import { Credentials } from "@/app/about/_components/Credentials";
import { Journey } from "@/app/about/_components/MyBackground";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { Title } from "@/components/Title";
import { buildPageMetadata, buildProfilePageJsonLd } from "@/lib/seo";

import { Skills } from "./_components/TechnicalInterests";

const title = "About Me | Alex Leung";
const description =
  "Learn about Alex Leung's journey - from University of Waterloo and Georgia Tech to end-to-end product development.";
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
        item={buildProfilePageJsonLd({ path, title, description })}
      />

      <div className="py-[var(--header-height)]">
        <Title title="About Me" id="about" />
        <Journey />
        <Skills className="mt-12" />
        <Credentials />
      </div>
    </>
  );
}
