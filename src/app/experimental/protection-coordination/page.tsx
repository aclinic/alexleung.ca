import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import type { WebPage } from "schema-dts";

import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

import { ProtectionCoordinationWorkspace } from "./_components/ProtectionCoordinationWorkspace";

const title = "Protection Coordination | Alex Leung";
const description =
  "A browser-based protection coordination and time-current curve explorer for inspecting simplified IEC inverse-time relay studies.";
const path = "/experimental/protection-coordination/";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path,
});

export default function ProtectionCoordinationPage() {
  return (
    <>
      <JsonLdBreadcrumbs
        items={[
          { name: "Home", item: "/" },
          { name: "Protection Coordination", item: path },
        ]}
      />
      <JsonLd<WebPage>
        item={buildWebPageSchema({
          title,
          description,
          path,
        })}
      />

      <PageShell
        title="Protection Coordination"
        titleId="protection-coordination"
      >
        <ResponsiveContainer element="section" className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-body text-slate-300">
              This experimental workspace overlays a small library of standard
              inverse-time curves on a shared time-current plot, then highlights
              places where coordination margins look thin under the stated
              assumptions.
            </p>
            <p className="text-body-sm text-slate-400">
              It is intentionally inspectable: the curve math is deterministic
              and separated from the React UI, the safety posture is explicit,
              and the import/export path stays local to the browser.
            </p>
          </div>

          <ProtectionCoordinationWorkspace />
        </ResponsiveContainer>
      </PageShell>
    </>
  );
}
