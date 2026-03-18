import { render, screen } from "@testing-library/react";

import { LatestWritingSection } from "../LatestWritingSection";

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

describe("LatestWritingSection", () => {
  it("renders post links with trailing slashes", () => {
    render(
      <LatestWritingSection
        posts={[
          {
            slug: "test-post",
            title: "Test Post",
            date: "2026-01-01T00:00:00.000Z",
            excerpt: "A short summary",
          },
        ]}
      />
    );

    expect(screen.getByRole("link", { name: /test post/i })).toHaveAttribute(
      "href",
      "/blog/test-post/"
    );
    expect(
      screen.getByRole("link", { name: /see all posts/i })
    ).toHaveAttribute("href", "/blog/");
  });
});
