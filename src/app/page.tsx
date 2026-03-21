import { JsonLd } from "react-schemaorg";

import type { WebPage } from "schema-dts";

import { Hero } from "@/components/Hero";
import { LatestWritingSection } from "@/components/LatestWritingSection";
import { getAllPosts } from "@/lib/blogApi";
import { buildHomePageSchema } from "@/lib/seo";

const title =
  "Alex Leung | Software Engineer for AI Systems, Product Engineering, and Distributed Systems";
const description =
  "Alex Leung is a software engineer writing about AI systems, machine learning systems, distributed systems, and thoughtful product engineering.";
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
