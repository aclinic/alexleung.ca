import { DEFAULT_LOAD_FLOW_CASE } from "@/features/load-flow/model/defaults";

import { runLoadFlow } from "../runLoadFlow";

describe("runLoadFlow", () => {
  it("returns structured diagnostics from solver skeleton", () => {
    const loadFlowCase = JSON.parse(JSON.stringify(DEFAULT_LOAD_FLOW_CASE));

    const result = runLoadFlow(loadFlowCase);

    expect(result.diagnostics.converged).toBe(false);
    expect(result.diagnostics.algorithm).toBe("NEWTON_RAPHSON");
    expect(result.diagnostics.initialization).toBe("FLAT_START");
  });
});
