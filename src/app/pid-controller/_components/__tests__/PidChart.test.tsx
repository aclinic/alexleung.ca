import { render, screen } from "@testing-library/react";

import { PidChart } from "../PidChart";

describe("PidChart", () => {
  it("renders a styled legend with latest series values", () => {
    render(
      <PidChart
        samples={[
          {
            timeSeconds: 0,
            setpoint: 1,
            processVariable: 0,
            controllerOutput: 0,
            error: 1,
          },
          {
            timeSeconds: 1,
            setpoint: 1,
            processVariable: 0.82,
            controllerOutput: 0.37,
            error: 0.18,
          },
        ]}
      />
    );

    expect(screen.getByText("Setpoint")).toBeInTheDocument();
    expect(screen.getByText("Process variable")).toBeInTheDocument();
    expect(screen.getByText("Controller output")).toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();

    expect(screen.getAllByText("1.00")).toHaveLength(1);
    expect(screen.getByText("0.82")).toBeInTheDocument();
    expect(screen.getByText("0.37")).toBeInTheDocument();
    expect(screen.getByText("0.18")).toBeInTheDocument();
  });
});
