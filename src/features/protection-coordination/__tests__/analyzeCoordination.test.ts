import { createDefaultScenario } from "@/features/protection-coordination/model/defaults";
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

  it("keeps plotting the inverse curve above instantaneous pickup when the instantaneous time is slower", () => {
    const scenario = createDefaultScenario();

    scenario.devices = [
      {
        ...scenario.devices[0],
        curveFamilyId: "iec-standard-inverse",
        pickupCurrentAmps: 100,
        timeMultiplier: 0.05,
        instantaneousPickupAmps: 600,
      },
    ];
    scenario.assumptions.instantaneousTripTimeSeconds = 0.3;

    const analysis = analyzeCoordination(scenario);
    const plotSeries = analysis.plotSeries[0];
    const finalPoint = plotSeries.points.at(-1);

    expect(finalPoint?.currentAmps).toBeCloseTo(2000, 5);
    expect(finalPoint?.timeSeconds).toBeGreaterThan(0.1);
  });

  it("keeps plotting beyond instantaneous pickup when the instantaneous plateau is active", () => {
    const scenario = createDefaultScenario();

    scenario.devices = [
      {
        ...scenario.devices[0],
        curveFamilyId: "iec-standard-inverse",
        pickupCurrentAmps: 100,
        timeMultiplier: 0.25,
        instantaneousPickupAmps: 600,
      },
    ];
    scenario.assumptions.instantaneousTripTimeSeconds = 0.08;

    const analysis = analyzeCoordination(scenario);
    const plotSeries = analysis.plotSeries[0];
    const pointBeyondThreshold = plotSeries.points.find(
      (point) => point.currentAmps > 600
    );

    expect(pointBeyondThreshold).toBeDefined();
    expect(pointBeyondThreshold?.timeSeconds).toBeCloseTo(0.08, 4);
  });
});
