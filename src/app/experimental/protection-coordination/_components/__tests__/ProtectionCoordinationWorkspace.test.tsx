import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { PROTECTION_COORDINATION_ACKNOWLEDGEMENT_STORAGE_KEY } from "@/features/protection-coordination/model/constants";

import { ProtectionCoordinationWorkspace } from "../ProtectionCoordinationWorkspace";

describe("ProtectionCoordinationWorkspace", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("shows the first-use acknowledgement modal until accepted", async () => {
    render(<ProtectionCoordinationWorkspace />);

    expect(
      await screen.findByRole("dialog", {
        name: /read this before using the tcc explorer/i,
      })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("checkbox", {
        name: /i understand that this is an engineering aid only/i,
      })
    );
    fireEvent.click(screen.getByRole("button", { name: /open workspace/i }));

    await waitFor(() =>
      expect(
        screen.queryByRole("dialog", {
          name: /read this before using the tcc explorer/i,
        })
      ).not.toBeInTheDocument()
    );

    expect(
      window.localStorage.getItem(
        PROTECTION_COORDINATION_ACKNOWLEDGEMENT_STORAGE_KEY
      )
    ).toBe("accepted");
  });

  it("renders multiple curves once the workspace is acknowledged", () => {
    window.localStorage.setItem(
      PROTECTION_COORDINATION_ACKNOWLEDGEMENT_STORAGE_KEY,
      "accepted"
    );

    const { container } = render(<ProtectionCoordinationWorkspace />);

    expect(
      container.querySelectorAll('[data-testid^="tcc-curve-"]')
    ).toHaveLength(2);
    expect(
      screen.getByRole("heading", { level: 3, name: "Feeder relay" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Main relay" })
    ).toBeInTheDocument();
  });

  it("surfaces warnings when the tight-margin preset is selected", async () => {
    window.localStorage.setItem(
      PROTECTION_COORDINATION_ACKNOWLEDGEMENT_STORAGE_KEY,
      "accepted"
    );

    render(<ProtectionCoordinationWorkspace />);

    fireEvent.click(
      screen.getByRole("button", { name: /tight margin conflict/i })
    );

    expect(await screen.findByText(/active warning/i)).toBeInTheDocument();
    expect(
      screen.getAllByText(/worst-case margin is below the 0.30 s study target/i)
        .length
    ).toBeGreaterThan(0);
  });
});
