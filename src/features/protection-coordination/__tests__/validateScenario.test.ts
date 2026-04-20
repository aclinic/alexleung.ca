import { createDefaultScenario } from "@/features/protection-coordination/model/defaults";
import { validateScenario } from "@/features/protection-coordination/validation/validateScenario";

describe("validateScenario", () => {
  it("accepts the default scenario without blocking errors", () => {
    const issues = validateScenario(createDefaultScenario());

    expect(issues.some((issue) => issue.severity === "error")).toBe(false);
  });

  it("flags an instantaneous pickup below the inverse pickup", () => {
    const scenario = createDefaultScenario();
    scenario.devices[0].instantaneousPickupAmps = 100;

    const issues = validateScenario(scenario);

    expect(
      issues.some((issue) => issue.code === "instantaneous-below-pickup")
    ).toBe(true);
  });

  it("flags negative study current markers", () => {
    const scenario = createDefaultScenario();
    scenario.studyCurrentsAmps = [400, -1];

    const issues = validateScenario(scenario);

    expect(
      issues.some((issue) => issue.code === "study-currents-must-be-positive")
    ).toBe(true);
  });
});
