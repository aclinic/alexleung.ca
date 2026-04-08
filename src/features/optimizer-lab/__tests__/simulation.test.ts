import {
  classifyRunStatus,
  createRunSet,
  stepRun,
} from "@/features/optimizer-lab/simulation";
import { getSurfaceById } from "@/features/optimizer-lab/surfaces";
import { RunConfig } from "@/features/optimizer-lab/types";

const RUN_CONFIG: RunConfig = {
  id: "run-a",
  label: "Run A",
  color: "#22d3ee",
  enabled: true,
  optimizerId: "sgd",
  learningRate: 0.1,
  momentum: 0.9,
  beta1: 0.9,
  beta2: 0.99,
  epsilon: 0.000001,
};

describe("optimizer lab simulation", () => {
  it("builds deterministic initial run state from the surface and config", () => {
    const surface = getSurfaceById("quadratic-isotropic");
    const [run] = createRunSet(surface, [RUN_CONFIG], { x: 1, y: -2 });

    expect(run.loss).toBeCloseTo(2.5);
    expect(run.gradient).toEqual({ x: 1, y: -2 });
    expect(run.gradientMagnitude).toBeCloseTo(Math.sqrt(5));
  });

  it("advances a run by one optimizer step", () => {
    const surface = getSurfaceById("quadratic-isotropic");
    const [initialRun] = createRunSet(surface, [RUN_CONFIG], { x: 1, y: -2 });
    const nextRun = stepRun(surface, RUN_CONFIG, initialRun);

    expect(nextRun.step).toBe(1);
    expect(nextRun.position.x).toBeCloseTo(0.9);
    expect(nextRun.position.y).toBeCloseTo(-1.8);
    expect(nextRun.loss).toBeLessThan(initialRun.loss);
  });

  it("marks small gradients as converged", () => {
    const surface = getSurfaceById("quadratic-isotropic");

    expect(
      classifyRunStatus({
        surface,
        position: { x: 0.01, y: -0.02 },
        loss: surface.evaluate({ x: 0.01, y: -0.02 }),
        initialLoss: 1,
        gradientMagnitude: 0.022,
        recentLosses: [0.0003, 0.00025, 0.00024],
      })
    ).toBe("converged");
  });

  it("marks obviously unstable trajectories as diverging", () => {
    const surface = getSurfaceById("quadratic-elongated");

    expect(
      classifyRunStatus({
        surface,
        position: { x: 12, y: 0.5 },
        loss: 35,
        initialLoss: 2,
        gradientMagnitude: 4,
        recentLosses: [2, 6, 10, 18, 35],
      })
    ).toBe("diverging");
  });
});
