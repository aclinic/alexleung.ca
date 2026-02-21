import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import { WebPage } from "schema-dts";

import ExternalLink from "@/components/ExternalLink";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { Title } from "@/components/Title";
import { BASE_URL } from "@/constants";

export const NOW_PAGE_LAST_UPDATED_ISO = "2026-02-20";

const nowPageLastUpdatedDate = new Date(
  `${NOW_PAGE_LAST_UPDATED_ISO}T00:00:00Z`
);

export const NOW_PAGE_LAST_UPDATED_DISPLAY = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
}).format(nowPageLastUpdatedDate);

const title = "What I'm Doing Now | Alex Leung";
const description =
  "Current projects, books, and goals - a snapshot of what Alex Leung is focused on right now.";
const url = `${BASE_URL}/now/`;

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

export default function NowPage() {
  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: "Home", item: "/" },
          { name: "Now", item: "/now" },
        ]}
      />
      <JsonLd<WebPage>
        item={{
          "@context": "https://schema.org",
          "@type": "WebPage",
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
        <Title title="What I'm Doing Now" id="now" />
        <p className="mb-8 text-center text-sm">
          Last updated: {NOW_PAGE_LAST_UPDATED_DISPLAY}
        </p>

        <section className="section-center">
          <div className="text-body space-y-8 text-left leading-relaxed">
            {/* Top of mind */}
            <div className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-1 flex-shrink-0 text-xl">
                🚀
              </span>
              <div>
                <h3 className="text-heading-sm mb-2 font-semibold">
                  Top of Mind
                </h3>
                <div className="space-y-3 leading-relaxed">
                  <p>
                    I recently launched the blog section of this site. It&apos;s
                    been fun to build a "boring" but effective static
                    architecture for sharing technical ideas.
                  </p>
                  <p>
                    I&apos;ve also been using Codex more often for practical
                    tasks, especially quick site updates and small maintenance
                    workflows. I&apos;ve also started using{" "}
                    <ExternalLink href="https://www.conductor.build/">
                      Conductor
                    </ExternalLink>
                    ; I like the UI and how easy it is to spin up new worktrees.
                  </p>
                  <p>
                    Right now my priorities are simple: ship consistently on the
                    blog, use tooling pragmatically to move faster, and stay
                    curious about emerging AI-native products.
                  </p>
                </div>
              </div>
            </div>

            {/* Currently Reading */}
            <div className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-1 flex-shrink-0 text-xl">
                📚
              </span>
              <div>
                <h3 className="text-heading-sm mb-2 font-semibold">
                  Currently Reading
                </h3>
                <div className="space-y-3 leading-relaxed">
                  <p>
                    I&apos;m currently on Chapter 7 of{" "}
                    <ExternalLink href="https://www.deeplearningbook.org/">
                      <em>Deep Learning</em>
                    </ExternalLink>{" "}
                    by Goodfellow, Bengio, and Courville.
                  </p>
                  <p>
                    <ExternalLink href="https://www.domainlanguage.com/ddd/">
                      <em>Domain Driven Design</em>
                    </ExternalLink>{" "}
                    is on hold for now while I go deeper on AI.
                  </p>
                </div>
              </div>
            </div>

            {/* Current Goals */}
            <div className="flex items-start gap-3">
              <span aria-hidden="true" className="mt-1 flex-shrink-0 text-xl">
                🎯
              </span>
              <div>
                <h3 className="text-heading-sm mb-2 font-semibold">
                  Current Goals
                </h3>
                <ul className="mt-3 list-outside list-disc space-y-1 pl-6 leading-relaxed">
                  <li>Finish and understand the Deep Learning book</li>
                  <li>Leveling up my tennis game</li>
                  <li>Get to A2 proficiency in Chinese</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer note about Now pages */}
          <div className="mt-12 border-t border-gray-700 pt-8 text-sm leading-relaxed text-gray-300">
            <p>
              This is a{" "}
              <ExternalLink href="https://nownownow.com/about">
                now page
              </ExternalLink>
              , inspired by{" "}
              <ExternalLink href="https://sive.rs/nowff">
                Derek Sivers
              </ExternalLink>
              . It&apos;s a snapshot of what I&apos;m focused on at this point
              in my life.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
