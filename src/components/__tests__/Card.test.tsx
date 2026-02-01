import { render, screen } from "@testing-library/react";

import { Card } from "../Card";

describe("Card", () => {
  it("should render children with base styles", () => {
    const { container } = render(<Card>Test content</Card>);

    expect(screen.getByText("Test content")).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("p-6", "rounded-lg", "border");
  });

  it("should merge custom className with base styles", () => {
    const { container } = render(<Card className="custom-class">Content</Card>);

    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("p-6", "custom-class");
  });
});
