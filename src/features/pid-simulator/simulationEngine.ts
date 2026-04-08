import {
  ControlBehaviorMetrics,
  PlantModel,
  SimulationRuntimeConfig,
  SimulationSample,
  SimulationState,
} from "@/features/pid-simulator/types";

import { PidController } from "./pidController";

const appendSample = (
  samples: SimulationSample[],
  sample: SimulationSample
): SimulationSample[] => [...samples, sample];

export const createInitialSimulationState = (
  plant: PlantModel,
  config: SimulationRuntimeConfig
): SimulationState => {
  const plantState = plant.initialState();
  const error = config.setpoint - plantState.output;

  return {
    timeSeconds: 0,
    plantState,
    controllerOutput: 0,
    error,
    samples: [
      {
        timeSeconds: 0,
        setpoint: config.setpoint,
        processVariable: plantState.output,
        controllerOutput: 0,
        error,
      },
    ],
  };
};

export const stepSimulation = (
  state: SimulationState,
  plant: PlantModel,
  controller: PidController,
  config: SimulationRuntimeConfig
): SimulationState => {
  const control = controller.step(
    config.setpoint,
    state.plantState.output,
    config.timeStepSeconds
  );
  const nextPlantState = plant.step(
    state.plantState,
    control.output,
    config.timeStepSeconds
  );
  const nextTimeSeconds = state.timeSeconds + config.timeStepSeconds;

  const sample: SimulationSample = {
    timeSeconds: nextTimeSeconds,
    setpoint: config.setpoint,
    processVariable: nextPlantState.output,
    controllerOutput: control.output,
    error: control.error,
  };

  return {
    timeSeconds: nextTimeSeconds,
    plantState: nextPlantState,
    controllerOutput: control.output,
    error: control.error,
    samples: appendSample(state.samples, sample),
  };
};

export const computeControlBehaviorMetrics = (
  samples: SimulationSample[],
  setpoint: number
): ControlBehaviorMetrics => {
  const lastSample = samples.at(-1);
  const steadyStateError = lastSample
    ? setpoint - lastSample.processVariable
    : setpoint;

  if (samples.length < 2 || Math.abs(setpoint) < Number.EPSILON) {
    return {
      riseTimeSeconds: null,
      settlingTimeSeconds: null,
      overshootPercent: null,
      steadyStateError,
    };
  }

  const tenPercent = setpoint * 0.1;
  const ninetyPercent = setpoint * 0.9;

  const firstAboveTen = samples.find(
    (sample) => sample.processVariable >= tenPercent
  );
  const firstAboveNinety = samples.find(
    (sample) => sample.processVariable >= ninetyPercent
  );

  const riseTimeSeconds =
    firstAboveTen && firstAboveNinety
      ? firstAboveNinety.timeSeconds - firstAboveTen.timeSeconds
      : null;

  const peak = samples.reduce(
    (maxValue, sample) => Math.max(maxValue, sample.processVariable),
    Number.NEGATIVE_INFINITY
  );
  const overshootPercent = ((peak - setpoint) / Math.abs(setpoint)) * 100;

  const tolerance = Math.abs(setpoint) * 0.02;
  let settlingTimeSeconds: number | null = null;

  for (let index = 0; index < samples.length; index += 1) {
    const tail = samples.slice(index);
    const settled = tail.every(
      (sample) => Math.abs(sample.processVariable - setpoint) <= tolerance
    );
    if (settled) {
      settlingTimeSeconds = samples[index].timeSeconds;
      break;
    }
  }

  return {
    riseTimeSeconds,
    settlingTimeSeconds,
    overshootPercent,
    steadyStateError,
  };
};
