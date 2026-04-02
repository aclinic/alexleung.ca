import { fireEvent, render, screen } from "@testing-library/react";

import { LoadFlowWorkspace } from "../LoadFlowWorkspace";

describe("LoadFlowWorkspace", () => {
  it("loads IEEE 14-Bus by default", () => {
    render(<LoadFlowWorkspace />);

    expect(
      screen.getByText(/Active solve case: IEEE 14-Bus/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/converged in/i)).toBeInTheDocument();
  });

  it("solves the selected reference scenario using full scenario data", () => {
    render(<LoadFlowWorkspace />);

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

  it("shows and edits branch reactance in the properties panel", () => {
    render(<LoadFlowWorkspace />);

    fireEvent.click(screen.getByRole("button", { name: /line-1-2-1/i }));

    const xInput = screen.getByLabelText(/X \(pu\)/i);
    expect(xInput).toHaveValue(0.05917);

    fireEvent.change(xInput, { target: { value: "0.07" } });

    expect(xInput).toHaveValue(0.07);
  });

  it("can reset an edited reference scenario back to source values", () => {
    render(<LoadFlowWorkspace />);

    fireEvent.click(screen.getByRole("button", { name: /Bus 1 • SLACK/i }));
    const baseKVInput = screen.getByLabelText(/Base kV/i);
    expect(baseKVInput).toHaveValue(0);

    fireEvent.change(baseKVInput, { target: { value: "11" } });
    expect(baseKVInput).toHaveValue(11);

    fireEvent.click(
      screen.getByRole("button", { name: /Reset active reference case/i })
    );

    expect(screen.getByLabelText(/Base kV/i)).toHaveValue(0);
  });

  it("preserves branch selection when resetting the active reference case", () => {
    render(<LoadFlowWorkspace />);

    fireEvent.click(screen.getByRole("button", { name: /line-1-2-1/i }));
    const xInput = screen.getByLabelText(/X \(pu\)/i);
    expect(xInput).toHaveValue(0.05917);

    fireEvent.change(xInput, { target: { value: "0.09" } });
    expect(screen.getByLabelText(/X \(pu\)/i)).toHaveValue(0.09);

    fireEvent.click(
      screen.getByRole("button", { name: /Reset active reference case/i })
    );

    expect(screen.getByLabelText(/X \(pu\)/i)).toHaveValue(0.05917);
  });

  it("shows additional branch fields for editing", () => {
    render(<LoadFlowWorkspace />);

    fireEvent.click(screen.getByRole("button", { name: /line-1-2-1/i }));

    expect(screen.getByLabelText(/B\/2 \(pu\)/i)).toHaveValue(0.0264);
    expect(screen.getByLabelText(/Thermal limit \(MVA\)/i)).toHaveValue(null);
    expect(screen.getByLabelText(/Status/i)).toHaveValue("IN_SERVICE");
  });
});
