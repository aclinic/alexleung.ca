import {
  createOptimizerMemory,
  stepOptimizer,
} from "@/features/optimizer-lab/optimizers";
import {
  RunConfig,
  RunSnapshot,
  RunStatus,
  SurfaceDefinition,
  Vector2,
} from "@/features/optimizer-lab/types";
import {
  magnitude,
  maxAbsComponent,
  ZERO_VECTOR,
} from "@/features/optimizer-lab/vector";

const CONVERGENCE_GRADIENT_THRESHOLD = 0.035;
const PLATEAU_GRADIENT_THRESHOLD = 0.08;
const STALLED_LOSS_DELTA_THRESHOLD = 1e-4;
const TRAIL_LIMIT = 120;
const RECENT_LOSS_LIMIT = 8;

function trimVectorTrail(trail: Vector2[], nextPoint: Vector2): Vector2[] {
  return [...trail.slice(-(TRAIL_LIMIT - 1)), nextPoint];
}

function trimRecentLosses(recentLosses: number[], nextLoss: number): number[] {
  return [...recentLosses.slice(-(RECENT_LOSS_LIMIT - 1)), nextLoss];
}

export function classifyRunStatus({
  surface,
  position,
  loss,
  initialLoss,
  gradientMagnitude,
  recentLosses,
}: {
  surface: SurfaceDefinition;
  position: Vector2;
  loss: number;
  initialLoss: number;
  gradientMagnitude: number;
  recentLosses: number[];
}): RunStatus {
  const domainRadius = Math.max(
    Math.abs(surface.domain.xMin),
    Math.abs(surface.domain.xMax),
    Math.abs(surface.domain.yMin),
    Math.abs(surface.domain.yMax)
  );

  if (!Number.isFinite(loss) || !Number.isFinite(gradientMagnitude)) {
    return "diverging";
  }

  if (maxAbsComponent(position) > domainRadius * 1.8) {
    return "diverging";
  }

  if (recentLosses.length >= 5) {
    const oldestLoss = recentLosses[0];
    const newestLoss = recentLosses[recentLosses.length - 1];
    if (newestLoss > Math.max(initialLoss * 5, oldestLoss * 3)) {
      return "diverging";
    }
  }

  if (gradientMagnitude <= CONVERGENCE_GRADIENT_THRESHOLD) {
    return "converged";
  }

  if (recentLosses.length >= 6) {
    const minLoss = Math.min(...recentLosses);
    const maxLoss = Math.max(...recentLosses);
    if (
      maxLoss - minLoss <= STALLED_LOSS_DELTA_THRESHOLD &&
      gradientMagnitude <= PLATEAU_GRADIENT_THRESHOLD
    ) {
      return "converged";
    }
  }

  return "optimizing";
}

export function createRunSnapshot(
  surface: SurfaceDefinition,
  config: RunConfig,
  startPoint: Vector2
): RunSnapshot {
  const loss = surface.evaluate(startPoint);
  const gradient = surface.gradient(startPoint);
  const gradientMagnitude = magnitude(gradient);

  return {
    id: config.id,
    label: config.label,
    color: config.color,
    enabled: config.enabled,
    optimizerId: config.optimizerId,
    step: 0,
    position: startPoint,
    gradient,
    gradientMagnitude,
    loss,
    initialLoss: loss,
    status: classifyRunStatus({
      surface,
      position: startPoint,
      loss,
      initialLoss: loss,
      gradientMagnitude,
      recentLosses: [loss],
    }),
    memory: createOptimizerMemory(),
    trail: [startPoint],
    recentLosses: [loss],
  };
}

export function createRunSet(
  surface: SurfaceDefinition,
  configs: RunConfig[],
  startPoint: Vector2
): RunSnapshot[] {
  return configs.map((config) =>
    createRunSnapshot(surface, config, startPoint)
  );
}

export function stepRun(
  surface: SurfaceDefinition,
  config: RunConfig,
  run: RunSnapshot
): RunSnapshot {
  if (!config.enabled || run.status !== "optimizing") {
    return {
      ...run,
      enabled: config.enabled,
      optimizerId: config.optimizerId,
    };
  }

  const stepResult = stepOptimizer(config.optimizerId, {
    theta: run.position,
    gradient: run.gradient,
    tuning: config,
    memory: run.memory,
  });
  const position = stepResult.theta;
  const loss = surface.evaluate(position);
  const gradient = surface.gradient(position);
  const gradientMagnitude = magnitude(gradient);
  const recentLosses = trimRecentLosses(run.recentLosses, loss);

  return {
    ...run,
    enabled: config.enabled,
    optimizerId: config.optimizerId,
    step: run.step + 1,
    position,
    gradient,
    gradientMagnitude,
    loss,
    status: classifyRunStatus({
      surface,
      position,
      loss,
      initialLoss: run.initialLoss,
      gradientMagnitude,
      recentLosses,
    }),
    memory: stepResult.memory,
    trail: trimVectorTrail(run.trail, position),
    recentLosses,
  };
}

export function hasAnyActiveRun(
  runs: RunSnapshot[],
  configs: RunConfig[]
): boolean {
  return runs.some((run) => {
    const matchingConfig = configs.find((config) => config.id === run.id);
    return matchingConfig?.enabled && run.status === "optimizing";
  });
}

export function createEmptyRunSnapshot(config: RunConfig): RunSnapshot {
  return {
    id: config.id,
    label: config.label,
    color: config.color,
    enabled: config.enabled,
    optimizerId: config.optimizerId,
    step: 0,
    position: ZERO_VECTOR,
    gradient: ZERO_VECTOR,
    gradientMagnitude: 0,
    loss: 0,
    initialLoss: 0,
    status: "optimizing",
    memory: createOptimizerMemory(),
    trail: [ZERO_VECTOR],
    recentLosses: [0],
  };
}
