import { createFirstOrderPlant } from "@/features/pid-simulator/firstOrderPlant";
import { PidController } from "@/features/pid-simulator/pidController";
import {
  computeControlBehaviorMetrics,
  createInitialSimulationState,
  stepSimulation,
} from "@/features/pid-simulator/simulationEngine";

describe("simulationEngine", () => {
  const plant = createFirstOrderPlant({
    gain: 1,
    timeConstantSeconds: 1,
    initialOutput: 0,
  });

  it("creates deterministic state transitions for identical inputs", () => {
    const config = {
      setpoint: 1,
      timeStepSeconds: 0.1,
      historyWindowSeconds: 10,
    };

    const run = () => {
      const controller = new PidController({
        gains: { kp: 2, ki: 0.6, kd: 0.1 },
        outputMin: -10,
        outputMax: 10,
        integralMin: -10,
        integralMax: 10,
      });
      let state = createInitialSimulationState(plant, config);
      for (let index = 0; index < 25; index += 1) {
        state = stepSimulation(state, plant, controller, config);
      }
      return state;
    };

    expect(run()).toEqual(run());
  });

  it("resets back to initial conditions", () => {
    const config = {
      setpoint: 1,
      timeStepSeconds: 0.1,
      historyWindowSeconds: 10,
    };
    const controller = new PidController({
      gains: { kp: 2, ki: 0.6, kd: 0.1 },
      outputMin: -10,
      outputMax: 10,
      integralMin: -10,
      integralMax: 10,
    });

    let advanced = createInitialSimulationState(plant, config);
    for (let index = 0; index < 10; index += 1) {
      advanced = stepSimulation(advanced, plant, controller, config);
    }

    controller.reset();
    const resetState = createInitialSimulationState(plant, config);

    expect(advanced.timeSeconds).toBeGreaterThan(resetState.timeSeconds);
    expect(resetState.timeSeconds).toBe(0);
    expect(resetState.plantState.output).toBe(0);
    expect(resetState.samples).toHaveLength(1);
  });

  it("computes control behavior metrics from samples", () => {
    const samples = [
      {
        timeSeconds: 0,
        setpoint: 1,
        processVariable: 0,
        controllerOutput: 0,
        error: 1,
      },
      {
        timeSeconds: 1,
        setpoint: 1,
        processVariable: 0.4,
        controllerOutput: 0.6,
        error: 0.6,
      },
      {
        timeSeconds: 2,
        setpoint: 1,
        processVariable: 1.1,
        controllerOutput: 0.3,
        error: -0.1,
      },
      {
        timeSeconds: 3,
        setpoint: 1,
        processVariable: 1.01,
        controllerOutput: 0.2,
        error: -0.01,
      },
      {
        timeSeconds: 4,
        setpoint: 1,
        processVariable: 1.0,
        controllerOutput: 0.1,
        error: 0,
      },
    ];

    const metrics = computeControlBehaviorMetrics(samples, 1);

    expect(metrics.riseTimeSeconds).toBeCloseTo(1, 6);
    expect(metrics.overshootPercent).toBeCloseTo(10, 6);
    expect(metrics.settlingTimeSeconds).toBe(3);
    expect(metrics.steadyStateError).toBeCloseTo(0, 6);
  });
});
