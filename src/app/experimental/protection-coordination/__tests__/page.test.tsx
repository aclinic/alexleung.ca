import { render, screen } from "@testing-library/react";

import { PROTECTION_COORDINATION_ACKNOWLEDGEMENT_STORAGE_KEY } from "@/features/protection-coordination/model/constants";

import ProtectionCoordinationPage from "../page";

describe("ProtectionCoordinationPage", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      PROTECTION_COORDINATION_ACKNOWLEDGEMENT_STORAGE_KEY,
      "accepted"
    );
  });

  it("renders the protection coordination workspace shell", () => {
    render(<ProtectionCoordinationPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Protection Coordination" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Time-current plot" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /standard inverse-time curves on a shared time-current plot/i
      )
    ).toBeInTheDocument();
  });
});
