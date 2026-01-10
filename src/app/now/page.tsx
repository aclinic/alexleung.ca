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
          Last updated: January 10, 2026
        </p>

        <section className="section-center">
          <div className="text-body space-y-8 text-left leading-relaxed">
            {/* Top of mind */}
            <div className="flex items-start gap-3">
              <span className="mt-1 flex-shrink-0 text-xl">🚀</span>
              <div className="min-w-0 flex-1">
                <h3 className="text-heading-sm mb-2 font-semibold">
                  Top of Mind
                </h3>
                <div className="space-y-3 leading-relaxed">
                  <p>
                    I've been experimenting with the{" "}
                    <ExternalLink href="https://github.com/anthropics/claude-code/tree/main/plugins/ralph-wiggum">
                      ralph-wiggum plugin
                    </ExternalLink>{" "}
                    for Claude Code. So far I've had some good success with
                    prompts like:
                  </p>
                  <div className="w-full overflow-x-auto text-center">
                    <pre className="mx-auto inline-block max-w-max rounded bg-gray-800 p-3 text-left text-xs leading-relaxed">
                      <code className="whitespace-pre">
                        {`
                          |/ralph-wiggum:ralph-loop Implement design-plan.md. \\
                          |   Commit as you complete work, following conventions in commit history. \\
                          |   At each commit, ensure that the code builds and passes tests." \\
                          |  --max-iterations 25 --completion-promise DONE
                        `
                          .split("\n")
                          .map((line) => line.trim().replace(/^\|/, ""))
                          .join("\n")
                          .trim()}
                      </code>
                    </pre>
                  </div>
                  <p>
                    I've also been absorbing a ton of AI and ML content recently
                    by trading social media time for reading time. Makes me
                    wonder what eliminating those apps completely would unlock.
                  </p>
                </div>
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
                  Rereading sections of <em>AI Engineering</em> by Chip Huyen
                  and <em>Designing Machine Learning Systems</em> by Chip Huyen.{" "}
                  <em>Domain Driven Design</em> is on hold for a while, but I
                  still want to finish it by February.
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
                  <li>Figuring out a good way to do AI evals</li>
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
