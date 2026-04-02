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
    expect(screen.getByText(/Grid • SLACK • 230 kV/i)).toBeInTheDocument();
    expect(screen.getByText(/\"id\": \"load-1\"/i)).toBeInTheDocument();
  });

  it("keeps reference-bus setpoints when loading a scenario", () => {
    render(<LoadFlowWorkspace />);

    fireEvent.click(screen.getByRole("button", { name: "3-Bus PV + PQ" }));

    expect(
      screen.getByText(/"voltageMagnitudeSetpoint": 1.04/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/"voltageAngleSetpointDeg": 0/i)
    ).toBeInTheDocument();
  });
});
