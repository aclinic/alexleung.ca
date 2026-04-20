import { render, screen } from "@testing-library/react";

import ExperimentsPage from "../page";

describe("ExperimentsPage", () => {
  it("renders the hub title and experiment links", () => {
    render(<ExperimentsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Experiments" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /event loop visualizer/i })
    ).toHaveAttribute(
      "href",
      expect.stringMatching(/^\/experimental\/event-loop\/?$/)
    );
    expect(
      screen.getByRole("link", { name: /pid controller simulator/i })
    ).toHaveAttribute(
      "href",
      expect.stringMatching(/^\/experimental\/pid-controller\/?$/)
    );
  });
});
