import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";
import Link from "next/link";

import { CollectionPage } from "schema-dts";

import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { Surface } from "@/components/Surface";
import { EXPERIMENTS, EXPERIMENTS_HUB } from "@/constants/experiments";
import { buildCollectionPageSchema, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: EXPERIMENTS_HUB.title,
  description: EXPERIMENTS_HUB.description,
  path: EXPERIMENTS_HUB.path,
});

export default function ExperimentsPage() {
  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: "Home", item: "/" },
          { name: EXPERIMENTS_HUB.pageTitle, item: EXPERIMENTS_HUB.path },
        ]}
      />
      <JsonLd<CollectionPage>
        item={buildCollectionPageSchema({
          path: EXPERIMENTS_HUB.path,
          title: EXPERIMENTS_HUB.title,
          description: EXPERIMENTS_HUB.description,
        })}
      />

      <PageShell
        title={EXPERIMENTS_HUB.pageTitle}
        titleId="experiments"
        className="pb-12"
      >
        <ResponsiveContainer variant="wide" className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-body text-gray-300">
              These are small browser tools I built to make a few systems ideas
              easier to poke at. They are static, client-side pages with
              controls, visuals, and enough state to learn from the model
              directly.
            </p>
            <p className="text-body-sm text-gray-400">
              I wrote more about the pattern in{" "}
              <Link
                href="/blog/small-interactive-tools-with-a-coding-agent/"
                className="text-accent-link transition-colors hover:text-accent-link-hover"
              >
                Relearning Through Small Interactive Tools
              </Link>
              , but each experiment is usable on its own here.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {EXPERIMENTS.map((experiment) => (
              <Link
                key={experiment.id}
                href={experiment.path}
                className="block"
              >
                <Surface
                  className="flex h-full flex-col justify-between p-5 transition-colors hover:border-white/30"
                  interactive
                >
                  <div>
                    <h2 className="text-heading-sm text-white">
                      {experiment.pageTitle}
                    </h2>
                    <p className="text-body-sm mt-3 text-gray-300">
                      {experiment.description}
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-link">
                    Open experiment
                    <span aria-hidden="true">→</span>
                  </span>
                </Surface>
              </Link>
            ))}
          </div>
        </ResponsiveContainer>
      </PageShell>
    </>
  );
}
