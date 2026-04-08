import { render, screen } from "@testing-library/react";

import EventLoopPage from "../page";

describe("EventLoopPage", () => {
  it("renders visualizer shell and controls", () => {
    render(<EventLoopPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Event Loop Visualizer" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Runnable examples")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Step forward" })
    ).toBeInTheDocument();
    expect(screen.getByText("Execution timeline")).toBeInTheDocument();
  });
});
