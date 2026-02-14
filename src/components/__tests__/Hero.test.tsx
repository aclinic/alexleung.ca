import { render, screen } from "@testing-library/react";

import { Hero } from "../Hero";

describe("Hero", () => {
  it("should render name and professional title", () => {
    render(<Hero />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Alex Leung"
    );
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /Syntropy Engineer \| Programmer \| P\.Eng\./i,
      })
    ).toBeInTheDocument();
  });

  it("should render blog-first supporting copy", () => {
    render(<Hero />);

    expect(
      screen.getByText(
        "Engineer writing about software, systems, and learning in public."
      )
    ).toBeInTheDocument();
  });

  it("should render blog and about CTA links", () => {
    render(<Hero />);

    expect(screen.getByRole("link", { name: /read my blog/i })).toHaveAttribute(
      "href",
      "/blog"
    );
    expect(screen.getByRole("link", { name: /about me/i })).toHaveAttribute(
      "href",
      "/about"
    );
  });

  it('should have id="home" for anchor navigation', () => {
    const { container } = render(<Hero />);

    expect(container.querySelector("section")).toHaveAttribute("id", "home");
  });
});
