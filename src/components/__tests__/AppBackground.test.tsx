import { render } from "@testing-library/react";

import { AppBackground } from "../AppBackground";

describe("AppBackground", () => {
  it("renders responsive background sources and overlay treatment", () => {
    const { container } = render(<AppBackground />);

    expect(container.firstChild).toHaveClass("fixed");
    expect(container.querySelector("source")).toHaveAttribute(
      "srcset",
      "/assets/background-mobile.webp 768w, /assets/background-tablet.webp 1280w, /assets/background-desktop.webp 1600w"
    );
    expect(container.querySelector("img")).toHaveAttribute("sizes", "100vw");
  });
});
