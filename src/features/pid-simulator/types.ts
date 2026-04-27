export type SimulatorPresetId =
  | "well-tuned"
  | "underdamped"
  | "overdamped"
  | "oscillatory";

type PidGains = {
  kp: number;
  ki: number;
  kd: number;
};

export type PidControllerConfig = {
  gains: PidGains;
  outputMin: number;
  outputMax: number;
  integralMin: number;
  integralMax: number;
};

export type PlantState = {
  output: number;
};

export type PlantModel = {
  readonly id: string;
  readonly label: string;
  readonly description: string;
  initialState: () => PlantState;
  step: (
    state: PlantState,
    controlSignal: number,
    dtSeconds: number
  ) => PlantState;
};

export type SimulationSample = {
  timeSeconds: number;
  setpoint: number;
  processVariable: number;
  controllerOutput: number;
  error: number;
};

export type SimulationRuntimeConfig = {
  setpoint: number;
  timeStepSeconds: number;
  maxTimeSeconds: number;
};

export type SimulationState = {
  readonly timeSeconds: number;
  readonly plantState: PlantState;
  readonly controllerOutput: number;
  readonly error: number;
  readonly samples: SimulationSample[];
};

export type ControlBehaviorMetrics = {
  riseTimeSeconds: number | null;
  settlingTimeSeconds: number | null;
  overshootPercent: number | null;
  steadyStateError: number;
};

export type SimulatorPreset = {
  id: SimulatorPresetId;
  name: string;
  description: string;
  gains: PidGains;
  setpoint: number;
};
