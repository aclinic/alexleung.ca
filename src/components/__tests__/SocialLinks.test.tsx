import { render } from "@testing-library/react";

import { data } from "@/constants/socialLinks";

import SocialLinks from "../SocialLinks";

describe("SocialLinks", () => {
  it("should render all social links with proper security attributes", () => {
    const { container } = render(<SocialLinks />);

    const links = container.querySelectorAll("a");
    expect(links).toHaveLength(data.length);

    links.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "me noopener");
      expect(link).toHaveAttribute("aria-label");
    });
  });
});
