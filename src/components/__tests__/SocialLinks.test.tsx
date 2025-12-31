import { render } from "@testing-library/react";
import SocialLinks from "../SocialLinks";
import { data } from "@/constants/socialLinks";

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
