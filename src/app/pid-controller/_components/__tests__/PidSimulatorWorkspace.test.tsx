import { fireEvent, render, screen } from "@testing-library/react";

import { PidSimulatorWorkspace } from "../PidSimulatorWorkspace";

describe("PidSimulatorWorkspace", () => {
  it("renders controls and chart", () => {
    render(<PidSimulatorWorkspace />);

    expect(
      screen.getByRole("img", { name: /pid simulator response chart/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/preset response/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Kp$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/max time \(s\)/i)).toHaveValue("20");
    expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
  });

  it("toggles run state and resets simulation", () => {
    render(<PidSimulatorWorkspace />);

    fireEvent.click(screen.getByRole("button", { name: /pause/i }));
    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /reset simulation/i }));
    expect(screen.getByText(/steady-state error/i)).toBeInTheDocument();
  });

  it("applies selected preset values", () => {
    render(<PidSimulatorWorkspace />);

    fireEvent.change(screen.getByLabelText(/preset response/i), {
      target: { value: "oscillatory" },
    });

    expect(screen.getByLabelText("Ki")).toHaveValue("1");
    expect(screen.getByLabelText("Kd")).toHaveValue("2");
  });

  it("restarts the run when tuning changes", () => {
    render(<PidSimulatorWorkspace />);

    fireEvent.click(screen.getByRole("button", { name: /pause/i }));
    expect(screen.getByRole("button", { name: /play/i })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/^Kp$/i), {
      target: { value: "2.8" },
    });

    expect(screen.getByRole("button", { name: /pause/i })).toBeInTheDocument();
    expect(
      screen.getByText(/full step response stays in view/i)
    ).toBeInTheDocument();
  });
});
