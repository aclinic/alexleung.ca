import { getCurveFamilyById } from "@/features/protection-coordination/model/curveFamilies";
import {
  CoordinationAssumptions,
  DeviceTimePoint,
  ProtectionDevice,
} from "@/features/protection-coordination/model/types";

export function createLogSpace(
  minimumValue: number,
  maximumValue: number,
  count: number
): number[] {
  if (count <= 1 || minimumValue === maximumValue) {
    return [minimumValue];
  }

  const minimumExponent = Math.log10(minimumValue);
  const maximumExponent = Math.log10(maximumValue);
  const step = (maximumExponent - minimumExponent) / (count - 1);

  return Array.from(
    { length: count },
    (_, index) => 10 ** (minimumExponent + step * index)
  );
}

export function evaluateInverseTimeSeconds(
  device: ProtectionDevice,
  currentAmps: number
): number | null {
  const currentMultiple = currentAmps / device.pickupCurrentAmps;

  if (!(currentMultiple > 1)) {
    return null;
  }

  const family = getCurveFamilyById(device.curveFamilyId);
  const denominator = Math.pow(currentMultiple, family.coefficients.c) - 1;

  if (!(denominator > 0)) {
    return null;
  }

  return (
    device.timeMultiplier *
    (family.coefficients.a / denominator + family.coefficients.b)
  );
}

export function evaluateDeviceTimePoint(
  device: ProtectionDevice,
  currentAmps: number,
  assumptions: CoordinationAssumptions
): DeviceTimePoint | null {
  const inverseTimeSeconds = evaluateInverseTimeSeconds(device, currentAmps);

  if (inverseTimeSeconds === null) {
    return null;
  }

  const family = getCurveFamilyById(device.curveFamilyId);
  const currentMultiple = currentAmps / device.pickupCurrentAmps;
  const isWithinRecommendedDomain =
    currentMultiple >= family.recommendedCurrentMultiplierRange.min &&
    currentMultiple <= family.recommendedCurrentMultiplierRange.max &&
    currentMultiple >= assumptions.currentMultiplierDomainMin &&
    currentMultiple <= assumptions.currentMultiplierDomainMax;
  const instantaneousIsActive =
    device.instantaneousPickupAmps !== null &&
    currentAmps >= device.instantaneousPickupAmps &&
    assumptions.instantaneousTripTimeSeconds < inverseTimeSeconds;

  return {
    currentAmps,
    currentMultiple,
    inverseTimeSeconds,
    timeSeconds: instantaneousIsActive
      ? assumptions.instantaneousTripTimeSeconds
      : inverseTimeSeconds,
    activeElement: instantaneousIsActive ? "instantaneous" : "inverse",
    supported: instantaneousIsActive ? true : isWithinRecommendedDomain,
    extrapolated: instantaneousIsActive ? false : !isWithinRecommendedDomain,
  };
}
