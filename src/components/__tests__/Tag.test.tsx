import { render, screen } from "@testing-library/react";

import { Tag } from "../Tag";

jest.mock("next/link", () => {
  return function MockLink({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe("Tag", () => {
  it("renders content with base classes", () => {
    render(<Tag>TypeScript</Tag>);

    const tag = screen.getByText("TypeScript");
    expect(tag).toHaveClass("rounded-full", "border", "text-xs");
    expect(
      tag.className
        .split(/\s+/)
        .filter((className) => className === "inline-flex")
    ).toHaveLength(1);
  });

  it("renders a link when an href is provided", () => {
    render(<Tag href="/blog/tags/typescript/">TypeScript</Tag>);

    expect(screen.getByRole("link", { name: "TypeScript" })).toHaveAttribute(
      "href",
      "/blog/tags/typescript/"
    );
  });
});
