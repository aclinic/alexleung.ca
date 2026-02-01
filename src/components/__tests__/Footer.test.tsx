import { render, screen } from "@testing-library/react";

import { data } from "@/constants/socialLinks";

import Footer from "../Footer";

describe("Footer", () => {
  it("should render social links with proper security attributes", () => {
    const { container } = render(<Footer />);

    const links = container.querySelectorAll("a");
    expect(links).toHaveLength(data.length);

    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "me noopener");
    });
  });

  it("should display copyright with current year", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(new RegExp(`${currentYear}.*Alex Leung`))
    ).toBeInTheDocument();
  });
});
