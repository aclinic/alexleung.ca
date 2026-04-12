import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import { WebPage } from "schema-dts";

import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

import { PidSimulatorWorkspace } from "./_components/PidSimulatorWorkspace";

const title = "PID Controller Simulator | Alex Leung";
const description =
  "Interactive fixed-step PID simulation that demonstrates rise time, overshoot, oscillation, and settling behavior.";
const path = "/experimental/pid-controller/";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path,
});

export default function PidControllerPage() {
  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: "Home", item: "/" },
          { name: "PID Controller", item: "/experimental/pid-controller/" },
        ]}
      />
      <JsonLd<WebPage>
        item={buildWebPageSchema({
          path,
          title,
          description,
        })}
      />

      <PageShell title="PID Controller" titleId="pid-controller">
        <ResponsiveContainer element="section" className="space-y-6">
          <PidSimulatorWorkspace />
        </ResponsiveContainer>
      </PageShell>
    </>
  );
}
