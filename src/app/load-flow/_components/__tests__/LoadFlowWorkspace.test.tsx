import { fireEvent, render, screen } from "@testing-library/react";

import { LoadFlowWorkspace } from "../LoadFlowWorkspace";

describe("LoadFlowWorkspace", () => {
  it("solves the selected reference scenario using full scenario data", () => {
    render(<LoadFlowWorkspace />);

    expect(
      screen.getByText(/exactly one slack bus is required/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "2-Bus Radial" }));

    expect(screen.getByText(/converged in/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Active solve case: 2-Bus Radial/i)
    ).toBeInTheDocument();
  });
});
