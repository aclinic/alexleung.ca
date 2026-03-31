import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import { WebPage } from "schema-dts";

import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

import { LoadFlowWorkspace } from "./_components/LoadFlowWorkspace";

const title = "Load Flow | Alex Leung";
const description =
  "A browser-based AC load flow workspace for building one-line models and solving bus voltages and power flows.";
const path = "/load-flow/";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path,
});

export default function LoadFlowPage() {
  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: "Home", item: "/" },
          { name: "Load Flow", item: "/load-flow/" },
        ]}
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
            This page is the foundation for an in-browser AC power flow tool.
            The current milestone establishes route structure and domain
            contracts, with graph editing and Newton-Raphson solving coming in
            subsequent slices.
          </p>
          <LoadFlowWorkspace />
        </ResponsiveContainer>
      </PageShell>
    </>
  );
}
