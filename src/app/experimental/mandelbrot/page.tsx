import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import { WebPage } from "schema-dts";

import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { buildExperimentBreadcrumbItems } from "@/constants/experiments";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

import { MandelbrotExplorer } from "./_components/MandelbrotExplorer";

const title = "Mandelbrot Explorer | Alex Leung";
const description =
  "An in-browser Mandelbrot explorer with arbitrary-precision viewport math, progressive rendering, and shareable zoom state.";
const path = "/experimental/mandelbrot/";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path,
});

export default function MandelbrotPage() {
  return (
    <>
      <JsonLdBreadcrumbs
        items={buildExperimentBreadcrumbItems("Mandelbrot Explorer", path)}
      />
      <JsonLd<WebPage>
        item={buildWebPageSchema({
          path,
          title,
          description,
        })}
      />

      <PageShell title="Mandelbrot Explorer" titleId="mandelbrot-explorer">
        <MandelbrotExplorer />
      </PageShell>
    </>
  );
}
