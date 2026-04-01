import { LoadFlowCase } from "@/features/load-flow/model/types";

import { selectSolverAlgorithm } from "./algorithmSelection";
import { buildInitialization } from "./initialization";
import {
  DEFAULT_SOLVE_OPTIONS,
  LoadFlowEngine,
  LoadFlowResult,
  SolveOptions,
} from "./types";

export const runLoadFlow = (
  loadFlowCase: LoadFlowCase,
  options?: Partial<SolveOptions>
): LoadFlowResult => {
  const resolvedOptions: SolveOptions = {
    ...DEFAULT_SOLVE_OPTIONS,
    ...options,
  };

  const algorithmDecision = selectSolverAlgorithm(
    loadFlowCase,
    resolvedOptions
  );
  const initialization = buildInitialization(
    loadFlowCase,
    resolvedOptions.initialization
  );

  return {
    diagnostics: {
      converged: false,
      algorithm: algorithmDecision.selected,
      initialization: initialization.source,
      message:
        "Solver skeleton is configured. Newton-Raphson and fast-decoupled iteration kernels are not yet implemented.",
      iterationsCompleted: 0,
    },
  };
};

export const loadFlowEngine: LoadFlowEngine = {
  solve: runLoadFlow,
};
