import { JsonLd } from "react-schemaorg";

import { Metadata } from "next";

import { WebPage } from "schema-dts";

import { JsonLdBreadcrumbs } from "@/components/JsonLdBreadcrumbs";
import { PageShell } from "@/components/PageShell";
import { ResponsiveContainer } from "@/components/ResponsiveContainer";
import { buildExperimentBreadcrumbItems } from "@/constants/experiments";
import { buildPageMetadata, buildWebPageSchema } from "@/lib/seo";

import { EventLoopVisualizer } from "./_components/EventLoopVisualizer";

const title = "Event Loop Visualizer | Alex Leung";
const description =
  "A small event loop visualizer for call stack, microtasks, tasks, timers, and execution order.";
const path = "/experimental/event-loop/";

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path,
});

export default function EventLoopPage() {
  return (
    <>
      <JsonLdBreadcrumbs
        items={buildExperimentBreadcrumbItems("Event Loop Visualizer", path)}
      />
      <JsonLd<WebPage>
        item={buildWebPageSchema({
          path,
          title,
          description,
        })}
      />

      <PageShell title="Event Loop Visualizer" titleId="event-loop-visualizer">
        <ResponsiveContainer element="section" className="space-y-4">
          <div className="mx-auto max-w-4xl" data-testid="experiment-intro">
            <p className="text-body text-gray-300 md:text-center">
              This model shows a simplified JavaScript runtime: stack-first
              execution, then microtasks, then tasks. Use the examples to see
              why <code>Promise.then</code> callbacks run before{" "}
              <code>setTimeout(..., 0)</code> callbacks.
            </p>
          </div>
          <EventLoopVisualizer />
        </ResponsiveContainer>
      </PageShell>
    </>
  );
}
