import { render } from "@testing-library/react";

import { AppBackground } from "../AppBackground";

describe("AppBackground", () => {
  it("renders the default global background treatment", () => {
    const { container } = render(<AppBackground />);
    expect(container.firstChild).toHaveClass("after:bg-black/50");
    expect(container.firstChild).toHaveClass("bg-cover");
  });
});
