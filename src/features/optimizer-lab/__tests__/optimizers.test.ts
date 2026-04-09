import {
  createOptimizerMemory,
  stepAdam,
  stepMomentum,
  stepRMSProp,
  stepSGD,
} from "@/features/optimizer-lab/optimizers";

const tuning = {
  learningRate: 0.1,
  momentum: 0.9,
  beta1: 0.9,
  beta2: 0.9,
  epsilon: 0.000001,
};

describe("optimizer step functions", () => {
  it("updates SGD using the raw gradient", () => {
    const result = stepSGD({
      theta: { x: 1, y: -2 },
      gradient: { x: 0.5, y: -1 },
      tuning,
      memory: createOptimizerMemory(),
    });

    expect(result.theta.x).toBeCloseTo(0.95);
    expect(result.theta.y).toBeCloseTo(-1.9);
  });

  it("updates Momentum using a velocity term", () => {
    const result = stepMomentum({
      theta: { x: 1, y: -2 },
      gradient: { x: 0.5, y: -1 },
      tuning,
      memory: createOptimizerMemory(),
    });

    expect(result.theta.x).toBeCloseTo(0.95);
    expect(result.theta.y).toBeCloseTo(-1.9);
    expect(result.memory.velocity).toEqual({ x: -0.05, y: 0.1 });
  });

  it("updates RMSProp using a running squared-gradient scale", () => {
    const result = stepRMSProp({
      theta: { x: 1, y: -2 },
      gradient: { x: 2, y: -1 },
      tuning,
      memory: createOptimizerMemory(),
    });

    expect(result.theta.x).toBeCloseTo(0.6837727);
    expect(result.theta.y).toBeCloseTo(-1.6837737);
    expect(result.memory.squaredGradient.x).toBeCloseTo(0.4);
    expect(result.memory.squaredGradient.y).toBeCloseTo(0.1);
  });

  it("updates Adam using bias-corrected first and second moments", () => {
    const result = stepAdam({
      theta: { x: 1, y: -2 },
      gradient: { x: 2, y: -1 },
      tuning,
      memory: createOptimizerMemory(),
    });

    expect(result.theta.x).toBeCloseTo(0.9);
    expect(result.theta.y).toBeCloseTo(-1.9);
    expect(result.memory.firstMoment.x).toBeCloseTo(0.2);
    expect(result.memory.firstMoment.y).toBeCloseTo(-0.1);
    expect(result.memory.secondMoment.x).toBeCloseTo(0.4);
    expect(result.memory.secondMoment.y).toBeCloseTo(0.1);
    expect(result.memory.timestep).toBe(1);
  });

  it("does not move when the gradient is zero", () => {
    const zeroGradient = { x: 0, y: 0 };
    const theta = { x: -1.2, y: 3.4 };

    const results = [
      stepSGD({
        theta,
        gradient: zeroGradient,
        tuning,
        memory: createOptimizerMemory(),
      }),
      stepMomentum({
        theta,
        gradient: zeroGradient,
        tuning,
        memory: createOptimizerMemory(),
      }),
      stepRMSProp({
        theta,
        gradient: zeroGradient,
        tuning,
        memory: createOptimizerMemory(),
      }),
      stepAdam({
        theta,
        gradient: zeroGradient,
        tuning,
        memory: createOptimizerMemory(),
      }),
    ];

    results.forEach((result) => {
      expect(result.theta).toEqual(theta);
    });
  });
});
