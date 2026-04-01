import { render, screen } from "@testing-library/react";

import LoadFlowPage from "../page";

describe("LoadFlowPage", () => {
  it("renders the load-flow workspace shell", () => {
    render(<LoadFlowPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Load Flow" })
    ).toBeInTheDocument();
    expect(screen.getByText("Workspace (MVP)")).toBeInTheDocument();
    expect(
      screen.getByText(/foundation for an in-browser AC power flow tool/i)
    ).toBeInTheDocument();
  });
});
