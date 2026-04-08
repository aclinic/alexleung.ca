import { createFirstOrderPlant } from "@/features/pid-simulator/firstOrderPlant";
import { PidController } from "@/features/pid-simulator/pidController";
import {
  getPresetById,
  PID_SIMULATOR_PRESETS,
} from "@/features/pid-simulator/presets";
import {
  computeControlBehaviorMetrics,
  createInitialSimulationState,
  stepSimulation,
} from "@/features/pid-simulator/simulationEngine";

describe("PID presets", () => {
  const timeStepSeconds = 1 / 60;
  const maxTimeSeconds = 20;
  const plant = createFirstOrderPlant({
    gain: 1,
    timeConstantSeconds: 1.1,
    initialOutput: 0,
  });

  const simulatePreset = (presetId: string) => {
    const preset = getPresetById(presetId);
    if (!preset) {
      throw new Error(`Missing preset: ${presetId}`);
    }

    const controller = new PidController({
      gains: preset.gains,
      outputMin: -2,
      outputMax: 2,
      integralMin: -4,
      integralMax: 4,
    });

    let state = createInitialSimulationState(plant, {
      setpoint: preset.setpoint,
      timeStepSeconds,
      maxTimeSeconds,
    });

    for (let index = 0; index < maxTimeSeconds / timeStepSeconds; index += 1) {
      state = stepSimulation(state, plant, controller, {
        setpoint: preset.setpoint,
        timeStepSeconds,
        maxTimeSeconds,
      });
    }

    let zeroCrossings = 0;
    let previousError = state.samples[0].processVariable - preset.setpoint;

    for (const sample of state.samples.slice(1)) {
      const currentError = sample.processVariable - preset.setpoint;
      if (
        (previousError < 0 && currentError > 0) ||
        (previousError > 0 && currentError < 0)
      ) {
        zeroCrossings += 1;
      }
      if (Math.abs(currentError) > 1e-8) {
        previousError = currentError;
      }
    }

    const tail = state.samples
      .slice(-120)
      .map((sample) => sample.processVariable);
    const tailRange = Math.max(...tail) - Math.min(...tail);
    const metrics = computeControlBehaviorMetrics(
      state.samples,
      preset.setpoint
    );

    return {
      metrics,
      zeroCrossings,
      tailRange,
      finalValue: state.samples.at(-1)?.processVariable ?? 0,
    };
  };

  it("defines the required educational presets", () => {
    expect(PID_SIMULATOR_PRESETS.map((preset) => preset.id)).toEqual([
      "well-tuned",
      "underdamped",
      "overdamped",
      "oscillatory",
    ]);
  });

  it("resolves presets by id", () => {
    const preset = getPresetById("oscillatory");

    expect(preset).toBeDefined();
    expect(preset?.gains.kd).toBe(2);
  });

  it("matches the intended response families", () => {
    const wellTuned = simulatePreset("well-tuned");
    const underdamped = simulatePreset("underdamped");
    const overdamped = simulatePreset("overdamped");
    const oscillatory = simulatePreset("oscillatory");

    expect(wellTuned.metrics.overshootPercent).toBeLessThan(5);
    expect(wellTuned.metrics.settlingTimeSeconds).not.toBeNull();
    expect(wellTuned.metrics.settlingTimeSeconds).toBeLessThan(2);

    expect(underdamped.metrics.overshootPercent).toBeGreaterThan(8);
    expect(underdamped.zeroCrossings).toBeGreaterThanOrEqual(2);
    expect(underdamped.metrics.settlingTimeSeconds).not.toBeNull();

    expect(overdamped.zeroCrossings).toBe(0);
    expect(overdamped.metrics.overshootPercent).toBeLessThan(0);
    expect(overdamped.metrics.settlingTimeSeconds).toBeNull();
    expect(overdamped.finalValue).toBeLessThan(1);

    expect(oscillatory.zeroCrossings).toBeGreaterThanOrEqual(20);
    expect(oscillatory.tailRange).toBeGreaterThan(0.04);
    expect(oscillatory.metrics.settlingTimeSeconds).toBeNull();
  });
});
