import { render, screen } from "@testing-library/react";

import LearningDynamicsPage from "../page";

describe("LearningDynamicsPage", () => {
  it("renders the optimizer visualizer page shell", () => {
    render(<LearningDynamicsPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Learning Dynamics Lab",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("Simulation controls")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Loss surface" })
    ).toBeInTheDocument();
  });
});
