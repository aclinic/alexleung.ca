import { PlantModel, PlantState } from "@/features/pid-simulator/types";

export type FirstOrderPlantConfig = {
  gain: number;
  timeConstantSeconds: number;
  initialOutput: number;
};

export const createFirstOrderPlant = (
  config: FirstOrderPlantConfig
): PlantModel => ({
  id: "first-order",
  label: "First-order process",
  description:
    "Model: dy/dt = (-y + K·u) / τ, integrated with fixed-step explicit Euler.",
  initialState: (): PlantState => ({
    output: config.initialOutput,
  }),
  step: (state, controlSignal, dtSeconds) => {
    const tau = Math.max(config.timeConstantSeconds, Number.EPSILON);
    const dydt = (-state.output + config.gain * controlSignal) / tau;

    return {
      output: state.output + dydt * dtSeconds,
    };
  },
});
