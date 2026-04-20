import { createScenarioFromPreset } from "@/features/protection-coordination/model/presets";
import { analyzeCoordination } from "@/features/protection-coordination/solver/analyzeCoordination";

describe("analyzeCoordination", () => {
  it("finds a clean pair summary for the feeder/main preset", () => {
    const analysis = analyzeCoordination(
      createScenarioFromPreset("feeder-main-pair")
    );

    expect(analysis.plotSeries).toHaveLength(2);
    expect(analysis.pairSummaries).toHaveLength(1);
    expect(analysis.chartDomain.currentMaxAmps).toBeGreaterThan(3000);
  });

  it("surfaces coordination warnings for the tight-margin preset", () => {
    const analysis = analyzeCoordination(
      createScenarioFromPreset("tight-margin-conflict")
    );

    expect(
      analysis.findings.some(
        (finding) =>
          finding.kind === "overlap-window" ||
          finding.kind === "insufficient-margin-window"
      )
    ).toBe(true);
  });

  it("tracks study point statuses for a three-device preset", () => {
    const analysis = analyzeCoordination(
      createScenarioFromPreset("motor-branch-example")
    );

    expect(analysis.pairSummaries).toHaveLength(2);
    expect(analysis.pairSummaries[0].studyPointResults).toHaveLength(4);
  });
});
