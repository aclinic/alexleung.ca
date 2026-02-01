import { render, screen } from "@testing-library/react";

import { Subtitle } from "../Subtitle";

describe("Subtitle", () => {
  it("should render as h2 with title text", () => {
    render(<Subtitle title="Test Subtitle" />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Test Subtitle");
  });

  it("should support id for anchor linking", () => {
    render(<Subtitle title="Section Subtitle" id="section-anchor" />);

    const heading = screen.getByText("Section Subtitle");
    expect(heading).toHaveAttribute("id", "section-anchor");
  });
});
