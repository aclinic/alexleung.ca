import { render, screen } from "@testing-library/react";

import { ProseContent } from "../ProseContent";

describe("ProseContent", () => {
  it("renders children content", () => {
    render(
      <ProseContent>
        <p>Hello prose</p>
      </ProseContent>
    );

    expect(screen.getByText("Hello prose")).toBeInTheDocument();
  });

  it("renders html content", () => {
    render(<ProseContent html="<p>Rendered HTML</p>" />);

    expect(screen.getByText("Rendered HTML")).toBeInTheDocument();
  });
});
