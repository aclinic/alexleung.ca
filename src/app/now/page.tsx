import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import { WebPage } from "schema-dts";

import { Badge } from "@/components/Badge";
import ExternalLink from "@/components/ExternalLink";
import { IconTextRow } from "@/components/IconTextRow";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { LatestWritingSection } from "@/components/LatestWritingSection";
import { PageShell } from "@/components/PageShell";
import { ProseContent } from "@/components/ProseContent";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { SectionBlock } from "@/components/SectionBlock";
import { getAllPosts } from "@/lib/blogApi";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

export const NOW_PAGE_LAST_UPDATED_ISO = "2026-03-13";

const nowPageLastUpdatedDate = new Date(
  `${NOW_PAGE_LAST_UPDATED_ISO}T00:00:00Z`
);

export const NOW_PAGE_LAST_UPDATED_DISPLAY = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
}).format(nowPageLastUpdatedDate);

const title = "Now | Alex Leung";
const description =
  "A living snapshot of Alex Leung's current focus across systems, AI, reading, and experiments.";
const path = "/now";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path,
});

export default function NowPage() {
  const latestPosts = getAllPosts(["slug", "title", "date", "excerpt"]).slice(
    0,
    3
  );

  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: "Home", item: "/" },
          { name: "Now", item: "/now" },
        ]}
      />
      <JsonLd<WebPage>
        item={buildWebPageSchema({
          path,
          title,
          description,
        })}
      />

      <PageShell title="What I'm Doing Now" titleId="now">
        <div className="mb-8 text-center">
          <Badge tone="info">
            Last updated: {NOW_PAGE_LAST_UPDATED_DISPLAY}
          </Badge>
        </div>

        <ResponsiveContainer element="section">
          <SectionBlock spacing="lg">
            <div className="text-body space-y-8 text-left leading-relaxed">
              <IconTextRow icon="🚀" title="Top of Mind" headingLevel="h2">
                <p>
                  I started playing with OpenClaw a bit. On Windows in WSL, I
                  added some basic orchestration commands to manipulate a Docker
                  container.
                </p>
                <p>
                  I started the container with OpenClaw, ran{" "}
                  <code>openclaw onboard</code>, and set things up with Gemini
                  3.1 Pro Preview plus a WhatsApp connection.
                </p>
                <p>
                  I&apos;ve only chatted with it briefly so far, and I
                  haven&apos;t gone much further yet.
                </p>
              </IconTextRow>

              <IconTextRow
                icon="📚"
                title="Currently Reading"
                headingLevel="h2"
              >
                <p>
                  I&apos;m currently on Chapter 8 of{" "}
                  <ExternalLink href="https://www.deeplearningbook.org/">
                    <em>Deep Learning</em>
                  </ExternalLink>{" "}
                  by Goodfellow, Bengio, and Courville.
                </p>
                <p>
                  I also started reading <em>Children of Time</em>{" "}
                  {"on a colleague's recommendation."} The hook in Chapter 1.1
                  pulled me in right away.
                </p>
                <p>
                  <ExternalLink href="https://www.domainlanguage.com/ddd/">
                    <em>Domain Driven Design</em>
                  </ExternalLink>{" "}
                  is on hold for a while I tackle Deep Learning.
                </p>
              </IconTextRow>

              <IconTextRow icon="🎯" title="Current Goals" headingLevel="h2">
                <ul className="list-outside list-disc space-y-1 pl-6">
                  <li>Finish and understand the Deep Learning book</li>
                  <li>Leveling up my tennis game</li>
                  <li>Get to A2 proficiency in Chinese</li>
                </ul>
              </IconTextRow>
            </div>

            <ProseContent size="sm" className="border-t border-gray-700 pt-8">
              <p>
                This is a{" "}
                <ExternalLink href="https://nownownow.com/about">
                  now page
                </ExternalLink>
                . You can read more about the format{" "}
                <ExternalLink href="https://sive.rs/nowff">
                  in Derek Sivers&apos; now page explainer
                </ExternalLink>
                . It&apos;s a snapshot of what I&apos;m focused on at this point
                in my life.
              </p>
            </ProseContent>
          </SectionBlock>
        </ResponsiveContainer>
      </PageShell>
      <LatestWritingSection posts={latestPosts} />
    </>
  );
}
