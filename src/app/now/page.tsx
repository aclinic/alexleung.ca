import { Metadata } from "next";
import { JsonLd } from "react-schemaorg";
import { WebPage } from "schema-dts";
import { Title } from "@/components/Title";
import ExternalLink from "@/components/ExternalLink";

const title = "What I'm Doing Now | Alex Leung";
const description =
  "Current projects, books, location, and goals - a snapshot of what Alex Leung is focused on right now.";
const url = "https://alexleung.ca/now/";

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
            "@id": "https://alexleung.ca/#person",
          },
          inLanguage: "en-CA",
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://alexleung.ca/#website",
          },
        }}
      />

      <div className="py-[var(--header-height)]">
        <Title title="What I'm Doing Now" id="now" />
        <p className="mb-8 text-center text-sm">
          Last updated: December 30, 2025
        </p>

        <section className="section-center">
          <div className="text-body space-y-8 text-left leading-relaxed">
            {/* Top of mind */}
            <div className="flex items-start gap-3">
              <span className="mt-1 flex-shrink-0 text-xl">🚀</span>
              <div>
                <h3 className="text-heading-sm mb-2 font-semibold">
                  Top of Mind
                </h3>
                <p className="leading-relaxed">
                  I've been absorbing a ton of AI and ML content recently by
                  trading social media time for reading time. Makes me wonder
                  what eliminating those apps completely would unlock.
                </p>
              </div>
            </div>

            {/* Currently Reading */}
            <div className="flex items-start gap-3">
              <span className="mt-1 flex-shrink-0 text-xl">📚</span>
              <div>
                <h3 className="text-heading-sm mb-2 font-semibold">
                  Currently Reading
                </h3>
                <p className="leading-relaxed">
                  <em>Domain Driven Design</em> by Eric Evans - Finally diving
                  into this classic. Wish I'd read it years ago when grappling
                  with complex system boundaries.
                </p>
              </div>
            </div>

            {/* Current Goals */}
            <div className="flex items-start gap-3">
              <span className="mt-1 flex-shrink-0 text-xl">🎯</span>
              <div>
                <h3 className="text-heading-sm mb-2 font-semibold">
                  Current Goals
                </h3>
                <ul className="list-inside list-disc space-y-2 leading-relaxed">
                  <li>
                    Developing practical intuition for applying agentic AI
                    systems
                  </li>
                  <li>Leveling up my tennis game</li>
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
