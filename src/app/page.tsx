import { JsonLd } from "react-schemaorg";

import type { Metadata } from "next";

import type { WebPage } from "schema-dts";

import { Hero } from "@/components/Hero";
import { buildHomePageSchema } from "@/lib/seo";

const title = "Alex Leung | Syntropy Engineer and Programmer, P.Eng.";
const description =
  "Alex Leung is a Syntropy Engineer and Programmer writing about software systems, AI engineering, and learning in public.";
const path = "/";

export const metadata: Metadata = {
  other: {
    "follow.it-verification-code": "qQRuRCQt2ltelEDXU602",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd<WebPage>
        item={buildHomePageSchema({
          path,
          title,
          description,
        })}
      />
      <Hero />
    </>
  );
}
