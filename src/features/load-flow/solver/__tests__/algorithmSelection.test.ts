import { DEFAULT_LOAD_FLOW_CASE } from "@/features/load-flow/model/defaults";

import { selectSolverAlgorithm } from "../algorithmSelection";
import { DEFAULT_SOLVE_OPTIONS } from "../types";

describe("selectSolverAlgorithm", () => {
  it("keeps newton-raphson by default for small systems", () => {
    const loadFlowCase = JSON.parse(JSON.stringify(DEFAULT_LOAD_FLOW_CASE));

    const decision = selectSolverAlgorithm(loadFlowCase, DEFAULT_SOLVE_OPTIONS);
    expect(decision.selected).toBe("NEWTON_RAPHSON");
  });

  it("switches to fast-decoupled heuristic for large systems", () => {
    const loadFlowCase = JSON.parse(JSON.stringify(DEFAULT_LOAD_FLOW_CASE));
    loadFlowCase.buses = Array.from({ length: 120 }, (_, index) => ({
      id: `bus-${index + 1}`,
      name: `Bus ${index + 1}`,
      baseKV: 230,
      type: index === 0 ? "SLACK" : "PQ",
    }));

    const decision = selectSolverAlgorithm(loadFlowCase, DEFAULT_SOLVE_OPTIONS);
    expect(decision.selected).toBe("FAST_DECOUPLED");
  });
});
