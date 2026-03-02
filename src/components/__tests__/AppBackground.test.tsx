import { render } from "@testing-library/react";

import { AppBackground } from "../AppBackground";

describe("AppBackground", () => {
  it("renders the default global background treatment", () => {
    const { container } = render(<AppBackground />);
    expect(container.firstChild).toHaveClass(
      "bg-[linear-gradient(rgba(47,54,64,0.5),rgba(47,54,64,0.5)),url('/assets/background.webp')]"
    );
    expect(container.firstChild).toHaveClass("bg-cover");
  });
});
