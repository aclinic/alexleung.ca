import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import type { WebPage } from "schema-dts";

import { LearningDynamicsLab } from "@/app/experimental/learning-dynamics/_components/LearningDynamicsLab";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { buildExperimentBreadcrumbItems } from "@/constants/experiments";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const title = "Learning Dynamics Lab | Alex Leung";
const description =
  "A client-side optimizer visualizer for comparing SGD, Momentum, RMSProp, and Adam on simple 2D loss surfaces.";
const path = "/experimental/learning-dynamics/";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path,
});

export default function LearningDynamicsPage() {
  return (
    <>
      <JsonLdBreadcrumbs
        items={buildExperimentBreadcrumbItems("Learning Dynamics Lab", path)}
      />
      <JsonLd<WebPage>
        item={buildWebPageSchema({
          title,
          description,
          path,
        })}
      />

      <PageShell title="Learning Dynamics Lab" titleId="learning-dynamics">
        <ResponsiveContainer element="section" className="space-y-6">
          <div className="mx-auto max-w-4xl" data-testid="experiment-intro">
            <p className="text-body text-slate-300 md:text-center">
              This lab compares how a few standard optimizers move across the
              same 2D loss surface. It runs entirely in the browser: change the
              surface, move the start point, and watch the trajectories update.
            </p>
          </div>

          <LearningDynamicsLab />
        </ResponsiveContainer>
      </PageShell>
    </>
  );
}
