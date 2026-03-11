import { JsonLd } from "react-schemaorg";

import type { WebPage } from "schema-dts";

import { Hero } from "@/components/Hero";
import { LatestWritingSection } from "@/components/LatestWritingSection";
import { getAllPosts } from "@/lib/blogApi";
import { buildHomePageSchema } from "@/lib/seo";

const title = "Alex Leung | Syntropy Engineer and Programmer, P.Eng.";
const description =
  "Alex Leung is a Syntropy Engineer and Programmer writing about software systems, AI engineering, and learning in public.";
const path = "/";

export default function Page() {
  const latestPosts = getAllPosts(["slug", "title", "date", "excerpt"]).slice(
    0,
    3
  );

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
      <LatestWritingSection posts={latestPosts} />
    </>
  );
}
