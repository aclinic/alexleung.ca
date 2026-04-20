import {
  DEVICE_COLOR_PALETTE,
  PROTECTION_COORDINATION_SCENARIO_SCHEMA_VERSION,
} from "@/features/protection-coordination/model/constants";
import {
  CoordinationAssumptions,
  ProtectionCoordinationScenario,
  ProtectionDevice,
} from "@/features/protection-coordination/model/types";

export const DEFAULT_COORDINATION_ASSUMPTIONS: CoordinationAssumptions = {
  minimumCoordinationMarginSeconds: 0.3,
  instantaneousTripTimeSeconds: 0.08,
  currentMultiplierDomainMin: 1.05,
  currentMultiplierDomainMax: 20,
};

function nextDeviceNumericSuffix(existingIds: string[]): number {
  return (
    existingIds.reduce((highestValue, id) => {
      const match = id.match(/(\d+)$/);

      if (!match) {
        return highestValue;
      }

      return Math.max(highestValue, Number.parseInt(match[1], 10));
    }, 0) + 1
  );
}

export function allocateDeviceId(existingDevices: ProtectionDevice[]): string {
  return `device-${nextDeviceNumericSuffix(existingDevices.map((device) => device.id))}`;
}

export function colorForDeviceIndex(index: number): string {
  return DEVICE_COLOR_PALETTE[index % DEVICE_COLOR_PALETTE.length];
}

export function createDevice(
  existingDevices: ProtectionDevice[],
  overrides: Partial<ProtectionDevice> = {}
): ProtectionDevice {
  const index = existingDevices.length;

  return {
    id: overrides.id ?? allocateDeviceId(existingDevices),
    label: overrides.label ?? `Device ${index + 1}`,
    color: overrides.color ?? colorForDeviceIndex(index),
    enabled: overrides.enabled ?? true,
    curveFamilyId: overrides.curveFamilyId ?? "iec-standard-inverse",
    pickupCurrentAmps: overrides.pickupCurrentAmps ?? 200,
    timeMultiplier: overrides.timeMultiplier ?? 0.2,
    instantaneousPickupAmps: overrides.instantaneousPickupAmps ?? null,
    timeTolerancePercent: overrides.timeTolerancePercent ?? 10,
  };
}

export function createDefaultScenario(): ProtectionCoordinationScenario {
  const devices: ProtectionDevice[] = [];

  const downstreamDevice = createDevice(devices, {
    id: "device-1",
    label: "Feeder relay",
    curveFamilyId: "iec-very-inverse",
    pickupCurrentAmps: 180,
    timeMultiplier: 0.1,
    instantaneousPickupAmps: 1800,
  });
  devices.push(downstreamDevice);

  const upstreamDevice = createDevice(devices, {
    id: "device-2",
    label: "Main relay",
    curveFamilyId: "iec-standard-inverse",
    pickupCurrentAmps: 260,
    timeMultiplier: 0.32,
    instantaneousPickupAmps: 3600,
  });

  return {
    schemaVersion: PROTECTION_COORDINATION_SCENARIO_SCHEMA_VERSION,
    title: "Feeder/Main Pair",
    presetId: null,
    notes:
      "Device list order is interpreted as downstream to upstream for pairwise coordination checks.",
    devices: [downstreamDevice, upstreamDevice],
    studyCurrentsAmps: [400, 800, 1600, 3200],
    assumptions: { ...DEFAULT_COORDINATION_ASSUMPTIONS },
  };
}

export function cloneScenario(
  scenario: ProtectionCoordinationScenario
): ProtectionCoordinationScenario {
  return {
    ...scenario,
    assumptions: { ...scenario.assumptions },
    studyCurrentsAmps: [...scenario.studyCurrentsAmps],
    devices: scenario.devices.map((device) => ({ ...device })),
  };
}
