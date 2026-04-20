import { render, screen } from "@testing-library/react";

import EventLoopPage from "../page";

function getJsonLdEntries(container: HTMLElement) {
  return [
    ...container.querySelectorAll('script[type="application/ld+json"]'),
  ].map((script) => JSON.parse(script.textContent || "{}"));
}

describe("EventLoopPage", () => {
  it("renders visualizer shell and controls", () => {
    render(<EventLoopPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Event Loop Visualizer" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Runnable examples")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Step forward" })
    ).toBeInTheDocument();
    expect(screen.getByText("Execution timeline")).toBeInTheDocument();
  });

  it("includes the experiments hub in breadcrumb schema", () => {
    const { container } = render(<EventLoopPage />);
    const schemas = getJsonLdEntries(container);
    const breadcrumbSchema = schemas.find(
      (schema) => schema["@type"] === "BreadcrumbList"
    );

    expect(breadcrumbSchema.itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://alexleung.ca/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Experiments",
        item: "https://alexleung.ca/experimental/",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Event Loop Visualizer",
        item: "https://alexleung.ca/experimental/event-loop/",
      },
    ]);
  });
});
