import { render, screen } from "@testing-library/react";

import { LinkText } from "../LinkText";

describe("LinkText", () => {
  it("renders external links with security attributes", () => {
    render(
      <LinkText href="https://example.com" external>
        External
      </LinkText>
    );

    const link = screen.getByText("External");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders internal links", () => {
    render(<LinkText href="/blog">Blog</LinkText>);

    expect(screen.getByText("Blog")).toHaveAttribute("href", "/blog");
  });
});
