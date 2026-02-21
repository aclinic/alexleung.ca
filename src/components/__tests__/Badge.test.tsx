import { render, screen } from "@testing-library/react";

import { Badge } from "../Badge";

describe("Badge", () => {
  it("uses default info tone", () => {
    render(<Badge>Status</Badge>);

    expect(screen.getByText("Status")).toHaveClass("text-accent-link");
  });

  it("supports success tone", () => {
    render(<Badge tone="success">Done</Badge>);

    expect(screen.getByText("Done")).toHaveClass("text-accent-success");
  });
});
