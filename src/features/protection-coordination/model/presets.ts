import { PROTECTION_COORDINATION_SCENARIO_SCHEMA_VERSION } from "@/features/protection-coordination/model/constants";
import {
  cloneScenario,
  DEFAULT_COORDINATION_ASSUMPTIONS,
} from "@/features/protection-coordination/model/defaults";
import {
  ProtectionCoordinationPreset,
  ProtectionCoordinationScenario,
} from "@/features/protection-coordination/model/types";

const PRESET_SCENARIOS: ReadonlyArray<ProtectionCoordinationPreset> = [
  {
    id: "feeder-main-pair",
    name: "Feeder/Main Pair",
    description:
      "Two relays with a visible grading interval and instantaneous elements at higher currents.",
    scenario: {
      schemaVersion: PROTECTION_COORDINATION_SCENARIO_SCHEMA_VERSION,
      title: "Feeder/Main Pair",
      presetId: "feeder-main-pair",
      notes:
        "A compact two-device study for checking how pickup, time multiplier, and instantaneous thresholds separate the curves.",
      devices: [
        {
          id: "device-1",
          label: "Feeder relay",
          color: "#22d3ee",
          enabled: true,
          curveFamilyId: "iec-very-inverse",
          pickupCurrentAmps: 180,
          timeMultiplier: 0.1,
          instantaneousPickupAmps: 1800,
          timeTolerancePercent: 10,
        },
        {
          id: "device-2",
          label: "Main relay",
          color: "#f59e0b",
          enabled: true,
          curveFamilyId: "iec-standard-inverse",
          pickupCurrentAmps: 260,
          timeMultiplier: 0.32,
          instantaneousPickupAmps: 3600,
          timeTolerancePercent: 10,
        },
      ],
      studyCurrentsAmps: [400, 800, 1600, 3200],
      assumptions: { ...DEFAULT_COORDINATION_ASSUMPTIONS },
    },
  },
  {
    id: "tight-margin-conflict",
    name: "Tight Margin Conflict",
    description:
      "A deliberately tight pair that should surface insufficient-margin warnings in the results panel.",
    scenario: {
      schemaVersion: PROTECTION_COORDINATION_SCENARIO_SCHEMA_VERSION,
      title: "Tight Margin Conflict",
      presetId: "tight-margin-conflict",
      notes:
        "This preset intentionally crowds the upstream curve close to the downstream curve so the warning logic has something real to show.",
      devices: [
        {
          id: "device-1",
          label: "Branch relay",
          color: "#22d3ee",
          enabled: true,
          curveFamilyId: "iec-very-inverse",
          pickupCurrentAmps: 120,
          timeMultiplier: 0.12,
          instantaneousPickupAmps: 1500,
          timeTolerancePercent: 10,
        },
        {
          id: "device-2",
          label: "Feeder relay",
          color: "#fb7185",
          enabled: true,
          curveFamilyId: "iec-standard-inverse",
          pickupCurrentAmps: 140,
          timeMultiplier: 0.14,
          instantaneousPickupAmps: 1800,
          timeTolerancePercent: 10,
        },
      ],
      studyCurrentsAmps: [240, 600, 1200, 2000],
      assumptions: { ...DEFAULT_COORDINATION_ASSUMPTIONS },
    },
  },
  {
    id: "motor-branch-example",
    name: "Motor Branch Example",
    description:
      "Three devices ordered downstream to upstream, with a slower branch element and higher-current study markers.",
    scenario: {
      schemaVersion: PROTECTION_COORDINATION_SCENARIO_SCHEMA_VERSION,
      title: "Motor Branch Example",
      presetId: "motor-branch-example",
      notes:
        "This educational example is still a relay-only view. It does not model motor acceleration, thermal memory, or an actual motor-start current envelope.",
      devices: [
        {
          id: "device-1",
          label: "Motor branch relay",
          color: "#22d3ee",
          enabled: true,
          curveFamilyId: "iec-extremely-inverse",
          pickupCurrentAmps: 220,
          timeMultiplier: 0.16,
          instantaneousPickupAmps: null,
          timeTolerancePercent: 12,
        },
        {
          id: "device-2",
          label: "Feeder relay",
          color: "#34d399",
          enabled: true,
          curveFamilyId: "iec-very-inverse",
          pickupCurrentAmps: 320,
          timeMultiplier: 0.24,
          instantaneousPickupAmps: 3200,
          timeTolerancePercent: 10,
        },
        {
          id: "device-3",
          label: "Main relay",
          color: "#f59e0b",
          enabled: true,
          curveFamilyId: "iec-standard-inverse",
          pickupCurrentAmps: 420,
          timeMultiplier: 0.38,
          instantaneousPickupAmps: 5200,
          timeTolerancePercent: 10,
        },
      ],
      studyCurrentsAmps: [500, 1200, 2500, 5000],
      assumptions: {
        ...DEFAULT_COORDINATION_ASSUMPTIONS,
        minimumCoordinationMarginSeconds: 0.35,
      },
    },
  },
];

export const PROTECTION_COORDINATION_PRESETS = PRESET_SCENARIOS;

export function getProtectionCoordinationPresetById(
  presetId: string
): ProtectionCoordinationPreset | undefined {
  return PROTECTION_COORDINATION_PRESETS.find(
    (preset) => preset.id === presetId
  );
}

export function createScenarioFromPreset(
  presetId: string
): ProtectionCoordinationScenario {
  const preset = getProtectionCoordinationPresetById(presetId);

  if (!preset) {
    throw new Error(`Unknown protection coordination preset: ${presetId}`);
  }

  return cloneScenario(preset.scenario);
}
