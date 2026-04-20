import {
  createDevice,
  DEFAULT_COORDINATION_ASSUMPTIONS,
} from "@/features/protection-coordination/model/defaults";
import {
  evaluateDeviceTimePoint,
  evaluateInverseTimeSeconds,
} from "@/features/protection-coordination/solver/evaluateCurve";

describe("protection coordination curve evaluation", () => {
  it("matches the expected IEC standard inverse operate time at 10x pickup", () => {
    const device = createDevice([], {
      curveFamilyId: "iec-standard-inverse",
      pickupCurrentAmps: 100,
      timeMultiplier: 1,
    });

    expect(evaluateInverseTimeSeconds(device, 1000)).toBeCloseTo(2.9706, 4);
  });

  it("matches the expected IEC very inverse operate time at 10x pickup", () => {
    const device = createDevice([], {
      curveFamilyId: "iec-very-inverse",
      pickupCurrentAmps: 100,
      timeMultiplier: 1,
    });

    expect(evaluateInverseTimeSeconds(device, 1000)).toBeCloseTo(1.5, 4);
  });

  it("matches the expected IEC extremely inverse operate time at 10x pickup", () => {
    const device = createDevice([], {
      curveFamilyId: "iec-extremely-inverse",
      pickupCurrentAmps: 100,
      timeMultiplier: 1,
    });

    expect(evaluateInverseTimeSeconds(device, 1000)).toBeCloseTo(0.8081, 4);
  });

  it("switches to the instantaneous element when it is faster than the inverse curve", () => {
    const device = createDevice([], {
      curveFamilyId: "iec-standard-inverse",
      pickupCurrentAmps: 100,
      timeMultiplier: 0.25,
      instantaneousPickupAmps: 600,
    });

    const evaluation = evaluateDeviceTimePoint(
      device,
      1200,
      DEFAULT_COORDINATION_ASSUMPTIONS
    );

    expect(evaluation?.activeElement).toBe("instantaneous");
    expect(evaluation?.timeSeconds).toBeCloseTo(0.08, 4);
  });

  it("flags an inverse point as extrapolated outside the recommended domain", () => {
    const device = createDevice([], {
      curveFamilyId: "iec-standard-inverse",
      pickupCurrentAmps: 100,
      timeMultiplier: 1,
    });

    const evaluation = evaluateDeviceTimePoint(device, 2500, {
      ...DEFAULT_COORDINATION_ASSUMPTIONS,
      currentMultiplierDomainMax: 20,
    });

    expect(evaluation?.supported).toBe(false);
    expect(evaluation?.extrapolated).toBe(true);
  });
});
