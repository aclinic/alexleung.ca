import { PidController } from "@/features/pid-simulator/pidController";

const createController = (kp: number, ki: number, kd: number) =>
  new PidController({
    gains: { kp, ki, kd },
    outputMin: -10,
    outputMax: 10,
    integralMin: -10,
    integralMax: 10,
  });

describe("PidController", () => {
  it("applies proportional term", () => {
    const controller = createController(2, 0, 0);

    const result = controller.step(1, 0.2, 0.1);

    expect(result.terms.proportional).toBeCloseTo(1.6, 6);
    expect(result.output).toBeCloseTo(1.6, 6);
  });

  it("accumulates integral term across steps", () => {
    const controller = createController(0, 3, 0);

    const first = controller.step(1, 0, 0.5);
    const second = controller.step(1, 0, 0.5);

    expect(first.output).toBeCloseTo(1.5, 6);
    expect(second.output).toBeCloseTo(3, 6);
  });

  it("applies derivative action from error rate of change", () => {
    const controller = createController(0, 0, 2);

    controller.step(1, 0, 0.1);
    const next = controller.step(1, 0.5, 0.1);

    expect(next.terms.derivative).toBeCloseTo(-10, 6);
    expect(next.output).toBeCloseTo(-10, 6);
  });

  it("combines all terms and supports reset", () => {
    const controller = createController(1, 0.5, 0.1);

    controller.step(1, 0, 0.2);
    controller.reset();
    const afterReset = controller.step(1, 0.5, 0.2);

    expect(afterReset.terms.integral).toBeCloseTo(0.05, 6);
    expect(afterReset.terms.derivative).toBeCloseTo(0, 6);
    expect(afterReset.output).toBeCloseTo(0.55, 6);
  });
});
