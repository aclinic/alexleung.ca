import { render, screen } from "@testing-library/react";

import PidControllerPage from "../page";

describe("PidControllerPage", () => {
  it("renders the PID simulator page shell", () => {
    render(<PidControllerPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "PID Controller" })
    ).toBeInTheDocument();
    expect(screen.getByText(/control systems sandbox/i)).toBeInTheDocument();
    expect(screen.getByText(/u\(t\) = kp·e\(t\)/i)).toBeInTheDocument();
  });
});
