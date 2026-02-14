import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import { WebPage } from "schema-dts";

import ExternalLink from "@/components/ExternalLink";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { Title } from "@/components/Title";
import { BASE_URL } from "@/constants";

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
          Last updated: February 14, 2026
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
                    I recently launched the blog section of this site! It's been
                    a fun project to build a "boring" but effective static
                    architecture to share my technical thoughts.
                  </p>
                  <p>
                    I&apos;m also using Codex more often lately for practical
                    tasks like polishing quick updates to this site and speeding
                    up little maintenance workflows.
                  </p>
                  <p>
                    I'm also deeply intrigued by the recent viral rise of{" "}
                    <ExternalLink href="https://moltbook.com">
                      Moltbook
                    </ExternalLink>{" "}
                    and the underlying{" "}
                    <ExternalLink href="https://github.com/openclaw/moltbot">
                      Moltbot
                    </ExternalLink>{" "}
                    framework. The idea of autonomous agents having their own
                    social network is both fascinating and a bit terrifying. I'm
                    not willing to give it a try just yet.
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
                <p className="leading-relaxed">
                  I&apos;m currently on Chapter 7 of the{" "}
                  <ExternalLink href="https://www.deeplearningbook.org/">
                    <em>Deep Learning</em>
                  </ExternalLink>{" "}
                  book by Goodfellow, Bengio, and Courville. It&apos;s been
                  refreshing to revisit many math concepts I haven&apos;t used
                  in years, and I&apos;m thinking about writing up some of my
                  thoughts on Chapter 6 soon.{" "}
                  <ExternalLink href="https://www.domainlanguage.com/ddd/">
                    <em>Domain Driven Design</em>
                  </ExternalLink>{" "}
                  has been put on hold indefinitely—I&apos;m too enthralled by
                  AI these days.
                </p>
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
                <ul className="list-inside list-disc space-y-2 leading-relaxed">
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
