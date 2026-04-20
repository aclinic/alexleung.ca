import {
  parseScenarioJson,
  serializeScenarioJson,
} from "@/features/protection-coordination/io/scenarioJson";
import { createDefaultScenario } from "@/features/protection-coordination/model/defaults";

describe("scenario JSON IO", () => {
  it("embeds method metadata in exported JSON", () => {
    const json = serializeScenarioJson(
      createDefaultScenario(),
      "2026-04-20T00:00:00.000Z"
    );

    expect(json).toContain('"methodVersion": "iec-idmt-v1"');
    expect(json).toContain('"exportedAt": "2026-04-20T00:00:00.000Z"');
    expect(json).toContain('"disclaimer":');
  });

  it("round-trips a scenario export", () => {
    const scenario = createDefaultScenario();
    const json = serializeScenarioJson(scenario, "2026-04-20T00:00:00.000Z");

    expect(parseScenarioJson(json)).toEqual(scenario);
  });
});
