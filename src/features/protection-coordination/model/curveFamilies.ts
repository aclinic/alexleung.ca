import {
  CurveFamilyDefinition,
  CurveFamilyId,
} from "@/features/protection-coordination/model/types";

export const CURVE_FAMILIES: ReadonlyArray<CurveFamilyDefinition> = [
  {
    id: "iec-standard-inverse",
    label: "IEC Standard Inverse",
    shortLabel: "IEC SI",
    standardLabel: "IEC 60255 inverse-time family",
    coefficients: {
      a: 0.14,
      b: 0,
      c: 0.02,
    },
    recommendedCurrentMultiplierRange: {
      min: 1.05,
      max: 20,
    },
    description:
      "General-purpose IEC inverse-time curve. In this v1 tool it uses the published IEC coefficient form with a configurable time multiplier.",
  },
  {
    id: "iec-very-inverse",
    label: "IEC Very Inverse",
    shortLabel: "IEC VI",
    standardLabel: "IEC 60255 inverse-time family",
    coefficients: {
      a: 13.5,
      b: 0,
      c: 1,
    },
    recommendedCurrentMultiplierRange: {
      min: 1.05,
      max: 20,
    },
    description:
      "Steeper IEC inverse-time curve commonly used when fault current changes more significantly with location.",
  },
  {
    id: "iec-extremely-inverse",
    label: "IEC Extremely Inverse",
    shortLabel: "IEC EI",
    standardLabel: "IEC 60255 inverse-time family",
    coefficients: {
      a: 80,
      b: 0,
      c: 2,
    },
    recommendedCurrentMultiplierRange: {
      min: 1.05,
      max: 20,
    },
    description:
      "Steep IEC inverse-time curve that drops quickly at higher fault-current multiples and is often used for illustrative fuse or downstream-device coordination studies.",
  },
];

export function getCurveFamilyById(
  curveFamilyId: CurveFamilyId
): CurveFamilyDefinition {
  const family = CURVE_FAMILIES.find(
    (candidateFamily) => candidateFamily.id === curveFamilyId
  );

  if (!family) {
    throw new Error(`Unsupported curve family: ${curveFamilyId}`);
  }

  return family;
}
