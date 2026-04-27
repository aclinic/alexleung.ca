export type Vector2 = {
  x: number;
  y: number;
};

export type SurfaceId =
  | "quadratic-isotropic"
  | "quadratic-elongated"
  | "saddle"
  | "multimodal";

export type OptimizerId = "sgd" | "momentum" | "rmsprop" | "adam";

export type SurfaceDefinition = {
  id: SurfaceId;
  name: string;
  description: string;
  defaultStart: Vector2;
  domain: {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
  };
  evaluate: (point: Vector2) => number;
  gradient: (point: Vector2) => Vector2;
};

type OptimizerTuning = {
  learningRate: number;
  momentum: number;
  beta1: number;
  beta2: number;
  epsilon: number;
};

export type RunId = "run-a" | "run-b";

export type RunConfig = OptimizerTuning & {
  id: RunId;
  label: string;
  color: string;
  enabled: boolean;
  optimizerId: OptimizerId;
};

export type OptimizerMemory = {
  velocity: Vector2;
  squaredGradient: Vector2;
  firstMoment: Vector2;
  secondMoment: Vector2;
  timestep: number;
};

export type OptimizerStepInput = {
  theta: Vector2;
  gradient: Vector2;
  tuning: OptimizerTuning;
  memory: OptimizerMemory;
};

export type OptimizerStepResult = {
  theta: Vector2;
  delta: Vector2;
  memory: OptimizerMemory;
};

export type RunStatus = "optimizing" | "converged" | "diverging";

export type RunSnapshot = {
  id: RunId;
  label: string;
  color: string;
  enabled: boolean;
  optimizerId: OptimizerId;
  step: number;
  position: Vector2;
  gradient: Vector2;
  gradientMagnitude: number;
  loss: number;
  initialLoss: number;
  status: RunStatus;
  memory: OptimizerMemory;
  trail: Vector2[];
  recentLosses: number[];
};

export type SurfaceSample = {
  cells: Array<{
    x: number;
    y: number;
    width: number;
    height: number;
    value: number;
  }>;
  contours: Array<{
    level: number;
    from: Vector2;
    to: Vector2;
  }>;
  minValue: number;
  maxValue: number;
};
