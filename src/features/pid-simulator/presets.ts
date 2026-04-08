import { SimulatorPreset } from "@/features/pid-simulator/types";

export const PID_SIMULATOR_DEFAULT_SETPOINT = 1;

export const PID_SIMULATOR_PRESETS: readonly SimulatorPreset[] = [
  {
    id: "well-tuned",
    name: "Well-tuned",
    description: "Fast rise with slight overshoot and quick settling.",
    gains: { kp: 4, ki: 3, kd: 0 },
    setpoint: PID_SIMULATOR_DEFAULT_SETPOINT,
  },
  {
    id: "underdamped",
    name: "Underdamped",
    description: "Overshoots the target and rings down before settling.",
    gains: { kp: 0.6, ki: 1, kd: 0.8 },
    setpoint: PID_SIMULATOR_DEFAULT_SETPOINT,
  },
  {
    id: "overdamped",
    name: "Overdamped",
    description: "Avoids overshoot but approaches the target slowly.",
    gains: { kp: 1.5, ki: 0.25, kd: 0 },
    setpoint: PID_SIMULATOR_DEFAULT_SETPOINT,
  },
  {
    id: "oscillatory",
    name: "Oscillatory",
    description:
      "Aggressive corrections and saturation keep the response oscillating.",
    gains: { kp: 0.6, ki: 1, kd: 2 },
    setpoint: PID_SIMULATOR_DEFAULT_SETPOINT,
  },
] as const;

export const getPresetById = (presetId: string): SimulatorPreset | undefined =>
  PID_SIMULATOR_PRESETS.find((preset) => preset.id === presetId);
