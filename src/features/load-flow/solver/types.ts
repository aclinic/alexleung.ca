import { LoadFlowCase } from "@/features/load-flow/model/types";

export type SolverAlgorithm = "NEWTON_RAPHSON" | "FAST_DECOUPLED";
export type InitializationMode = "FLAT_START" | "WARM_START" | "DC_ANGLE_SEED";

export interface SolveOptions {
  tolerance: number;
  maxIterations: number;
  damping: number;
  enforceReactiveLimits: boolean;
  algorithm: SolverAlgorithm;
  initialization: InitializationMode;
}

export interface SolverInitialization {
  voltageMagnitudeByBusId: Record<string, number>;
  voltageAngleDegByBusId: Record<string, number>;
  source: InitializationMode;
}

export interface AlgorithmSelectionDecision {
  selected: SolverAlgorithm;
  reason: string;
}

export interface LoadFlowDiagnostics {
  converged: boolean;
  algorithm: SolverAlgorithm;
  initialization: InitializationMode;
  message: string;
  iterationsCompleted: number;
}

export interface LoadFlowResult {
  diagnostics: LoadFlowDiagnostics;
}

export interface LoadFlowEngine {
  solve: (
    loadFlowCase: LoadFlowCase,
    options?: Partial<SolveOptions>
  ) => LoadFlowResult;
}

export const DEFAULT_SOLVE_OPTIONS: SolveOptions = {
  tolerance: 1e-6,
  maxIterations: 20,
  damping: 1,
  enforceReactiveLimits: true,
  algorithm: "NEWTON_RAPHSON",
  initialization: "FLAT_START",
};
