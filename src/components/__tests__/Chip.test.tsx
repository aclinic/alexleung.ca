import { render, screen } from "@testing-library/react";

import { Chip, chipClassName } from "../Chip";

describe("Chip", () => {
  it("applies shared base class names", () => {
    render(<Chip>Label</Chip>);

    expect(screen.getByText("Label")).toHaveClass(
      "inline-flex",
      "rounded-full",
      "text-xs"
    );
  });

  it("returns composed class names", () => {
    expect(chipClassName("text-white")).toContain("text-white");
  });
});
