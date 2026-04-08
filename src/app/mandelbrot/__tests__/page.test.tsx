import { render, screen } from "@testing-library/react";

import MandelbrotPage from "../page";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/mandelbrot/"),
}));

describe("MandelbrotPage", () => {
  it("renders the explorer shell and core controls", () => {
    render(<MandelbrotPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Mandelbrot Explorer",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/arbitrary-precision decimals/i)
    ).toBeInTheDocument();
    expect(screen.getByText("View state")).toBeInTheDocument();
  });
});
