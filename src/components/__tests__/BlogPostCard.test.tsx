import { render, screen } from "@testing-library/react";

import { BlogPostCard } from "../BlogPostCard";

describe("BlogPostCard", () => {
  it("renders title, excerpt, and link", () => {
    render(
      <BlogPostCard
        post={{
          slug: "test-post",
          title: "Test Post",
          date: "2026-01-01T00:00:00.000Z",
          coverImage: undefined,
          excerpt: "A short summary",
          tags: ["ai"],
        }}
      />
    );

    expect(screen.getByRole("link", { name: "Test Post" })).toHaveAttribute(
      "href",
      "/blog/test-post"
    );
    expect(screen.getByText("A short summary")).toBeInTheDocument();
    expect(screen.getByText("ai")).toBeInTheDocument();
  });
});
