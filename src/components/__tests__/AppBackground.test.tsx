import { usePathname } from "next/navigation";

import { render } from "@testing-library/react";

import { AppBackground } from "../AppBackground";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("AppBackground", () => {
  it("uses default overlay for most routes", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    const { container } = render(<AppBackground />);
    expect(container.firstChild).toHaveClass("after:bg-black/50");
  });

  it("uses reading overlay on blog post routes", () => {
    (usePathname as jest.Mock).mockReturnValue("/blog/my-post");
    const { container } = render(<AppBackground />);
    expect(container.firstChild).toHaveClass("after:bg-black/68");
  });
});
