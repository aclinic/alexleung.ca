import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import { WebPage } from "schema-dts";

import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { buildExperimentBreadcrumbItems } from "@/constants/experiments";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

import { LoadFlowWorkspace } from "./_components/LoadFlowWorkspace";

const title = "Load Flow | Alex Leung";
const description =
  "A browser-based AC load flow workspace for building one-line models and solving bus voltages and power flows.";
const path = "/experimental/load-flow/";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path,
});

export default function LoadFlowPage() {
  return (
    <>
      <JsonLdBreadcrumbs
        items={buildExperimentBreadcrumbItems("Load Flow", path)}
      />
      <JsonLd<WebPage>
        item={buildWebPageSchema({
          path,
          title,
          description,
        })}
      />

      <PageShell title="Load Flow" titleId="load-flow">
        <ResponsiveContainer element="section" className="space-y-6">
          <p className="text-body text-gray-300">
            This workspace now includes a Newton-Raphson AC load flow engine
            with reference scenarios, bus-voltage results, and branch-flow
            outputs. You can start from a standard benchmark case or build and
            tune a custom one-line model directly in the browser.
          </p>
          <LoadFlowWorkspace />
        </ResponsiveContainer>
      </PageShell>
    </>
  );
}
