import { LoadFlowCase } from "@/features/load-flow/model/types";

/**
 * Keep the public surface area intentionally narrow until the first
 * numerical kernel is production-ready.
 */
export type SolverAlgorithm = "NEWTON_RAPHSON";
export type InitializationMode = "FLAT_START";

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
