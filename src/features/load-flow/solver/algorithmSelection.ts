import { LoadFlowCase } from "@/features/load-flow/model/types";

import { AlgorithmSelectionDecision, SolveOptions } from "./types";

const LARGE_CASE_THRESHOLD = 120;

export const selectSolverAlgorithm = (
  loadFlowCase: LoadFlowCase,
  options: SolveOptions
): AlgorithmSelectionDecision => {
  if (options.algorithm !== "NEWTON_RAPHSON") {
    return {
      selected: options.algorithm,
      reason: "Explicit solver override from options.",
    };
  }

  if (loadFlowCase.buses.length >= LARGE_CASE_THRESHOLD) {
    return {
      selected: "FAST_DECOUPLED",
      reason:
        "Large network heuristic: prefer fast-decoupled as default baseline for iteration speed.",
    };
  }

  return {
    selected: "NEWTON_RAPHSON",
    reason:
      "Default for small/medium systems and robust mixed-bus convergence.",
  };
};
