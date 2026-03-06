import { render } from "@testing-library/react";

import { AppBackground } from "../AppBackground";

describe("AppBackground", () => {
  it("renders CSS background container and overlay treatment", () => {
    const { container } = render(<AppBackground />);

    expect(container.firstChild).toHaveClass("fixed");
    expect(
      container.querySelector(".app-background-image")
    ).toBeInTheDocument();
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.querySelector("source")).not.toBeInTheDocument();
  });
});
