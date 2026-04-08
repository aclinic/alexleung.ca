import { SimulatorPreset } from "@/features/pid-simulator/types";

export const PID_SIMULATOR_DEFAULT_SETPOINT = 1;

export const PID_SIMULATOR_PRESETS: readonly SimulatorPreset[] = [
  {
    id: "well-tuned",
    name: "Well-tuned",
    description: "Fast rise with mild overshoot and quick settling.",
    gains: { kp: 2.4, ki: 0.9, kd: 0.45 },
    setpoint: PID_SIMULATOR_DEFAULT_SETPOINT,
  },
  {
    id: "underdamped",
    name: "Underdamped",
    description: "Aggressive proportional gain produces overshoot.",
    gains: { kp: 3.4, ki: 0.7, kd: 0.05 },
    setpoint: PID_SIMULATOR_DEFAULT_SETPOINT,
  },
  {
    id: "overdamped",
    name: "Overdamped",
    description: "Conservative gains prioritize stability over speed.",
    gains: { kp: 1.1, ki: 0.25, kd: 0.85 },
    setpoint: PID_SIMULATOR_DEFAULT_SETPOINT,
  },
  {
    id: "oscillatory",
    name: "Oscillatory",
    description: "Strong integral action drives sustained oscillation.",
    gains: { kp: 2.8, ki: 1.7, kd: 0.02 },
    setpoint: PID_SIMULATOR_DEFAULT_SETPOINT,
  },
] as const;

export const getPresetById = (presetId: string): SimulatorPreset | undefined =>
  PID_SIMULATOR_PRESETS.find((preset) => preset.id === presetId);
