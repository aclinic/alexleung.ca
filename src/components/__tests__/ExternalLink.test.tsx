import { render, screen } from "@testing-library/react";
import ExternalLink from "../ExternalLink";

describe("ExternalLink", () => {
  it("should render link with security attributes", () => {
    render(<ExternalLink href="https://example.com">Click me</ExternalLink>);

    const link = screen.getByText("Click me");
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should apply default styling when no className provided", () => {
    render(<ExternalLink href="https://example.com">Link</ExternalLink>);

    expect(screen.getByText("Link")).toHaveClass("text-accent-link");
  });

  it("should allow custom className override", () => {
    render(
      <ExternalLink href="https://example.com" className="custom-class">
        Link
      </ExternalLink>
    );

    const link = screen.getByText("Link");
    expect(link).toHaveClass("custom-class");
    expect(link).not.toHaveClass("text-accent-link");
  });
});
