import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import type { WebPage } from "schema-dts";

import { LearningDynamicsLab } from "@/app/experimental/learning-dynamics/_components/LearningDynamicsLab";
import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

const title = "Learning Dynamics Lab | Alex Leung";
const description =
  "A client-side optimizer visualizer for comparing SGD, Momentum, RMSProp, and Adam on 2D loss surfaces.";
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
        items={[
          { name: "Home", item: "/" },
          { name: "Learning Dynamics Lab", item: path },
        ]}
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
          <div className="max-w-3xl space-y-3">
            <p className="text-body text-slate-300">
              This lab compares how a few standard optimizers move across the
              same 2D loss surface. It is fully client-side and built for quick
              experimentation: change the surface, nudge the start point, and
              see the trajectories update immediately.
            </p>
            <p className="text-body-sm text-slate-400">
              The math layer is implemented as deterministic pure functions, and
              the UI keeps playback, controls, and rendering separate so the
              feature stays easy to extend.
            </p>
          </div>

          <LearningDynamicsLab />
        </ResponsiveContainer>
      </PageShell>
    </>
  );
}
