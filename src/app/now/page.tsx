import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import { WebPage } from "schema-dts";

import ExternalLink from "@/components/ExternalLink";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { Title } from "@/components/Title";
import { buildPageMetadata, buildWebPageJsonLd } from "@/lib/seo";

const title = "What I'm Doing Now | Alex Leung";
const description =
  "Current projects, books, and goals - a snapshot of what Alex Leung is focused on right now.";
const path = "/now";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path,
});

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
        item={buildWebPageJsonLd({ path, title, description })}
      />

      <div className="py-[var(--header-height)]">
        <Title title="What I'm Doing Now" id="now" />
        <div className="container mx-auto mb-32 max-w-3xl px-5">
          <div className="surface-static p-8 md:p-10">
            <p className="mb-8 text-lg leading-relaxed text-gray-200">
              Inspired by Derek Sivers&apos;
              <ExternalLink href="https://nownownow.com/about">
                {" "}
                now page movement
              </ExternalLink>
              , this page captures what I&apos;m focused on right now.
            </p>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Current Focus
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent-link"></span>
                  <span>
                    Working as{" "}
                    <strong className="text-white">Syntropy Engineer</strong> at
                    Jetson, designing home electrification systems and tools to
                    accelerate decarbonization.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent-link"></span>
                  <span>
                    Building a{" "}
                    <strong className="text-white">personal AI stack</strong>{" "}
                    integrating local models, workflows, and tools for software
                    development and experimentation.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent-link"></span>
                  <span>
                    Exploring robust software architecture patterns for
                    <strong className="text-white">
                      {" "}
                      AI-assisted engineering systems
                    </strong>
                    .
                  </span>
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Learning & Growth
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent-link"></span>
                  <span>
                    Reading books on systems design, leadership, and personal
                    growth to level up both technically and personally.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent-link"></span>
                  <span>
                    Continuing to refine clean architecture and testing
                    practices in frontend and backend projects.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent-link"></span>
                  <span>
                    Tracking emerging AI tooling and evaluating practical
                    adoption strategies for product teams.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-semibold text-white">
                Outside of Work
              </h2>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent-link"></span>
                  <span>
                    Staying active through hiking and strength training to
                    maintain energy and focus.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent-link"></span>
                  <span>
                    Spending quality time with friends and family while
                    balancing ambitious technical goals.
                  </span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
