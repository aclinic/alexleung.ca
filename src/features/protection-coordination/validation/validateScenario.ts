import { getCurveFamilyById } from "@/features/protection-coordination/model/curveFamilies";
import {
  ProtectionCoordinationScenario,
  ProtectionDevice,
  ValidationIssue,
} from "@/features/protection-coordination/model/types";

function pushIssue(
  issues: ValidationIssue[],
  issue: ValidationIssue
): ValidationIssue[] {
  issues.push(issue);
  return issues;
}

function validateDevice(
  issues: ValidationIssue[],
  device: ProtectionDevice,
  index: number
) {
  const basePath = `devices.${index}`;

  if (device.label.trim().length === 0) {
    pushIssue(issues, {
      code: "device-label-required",
      severity: "error",
      fieldPath: `${basePath}.label`,
      message:
        "Each device needs a label so the curve legend and warnings stay readable.",
    });
  }

  if (!(device.pickupCurrentAmps > 0)) {
    pushIssue(issues, {
      code: "pickup-must-be-positive",
      severity: "error",
      fieldPath: `${basePath}.pickupCurrentAmps`,
      message: "Pickup current must be greater than 0 A.",
    });
  }

  if (!(device.timeMultiplier > 0)) {
    pushIssue(issues, {
      code: "time-multiplier-must-be-positive",
      severity: "error",
      fieldPath: `${basePath}.timeMultiplier`,
      message: "Time multiplier must be greater than 0.",
    });
  }

  if (device.timeTolerancePercent < 0 || device.timeTolerancePercent > 50) {
    pushIssue(issues, {
      code: "time-tolerance-out-of-range",
      severity: "error",
      fieldPath: `${basePath}.timeTolerancePercent`,
      message:
        "Time tolerance must stay between 0% and 50% in this v1 workspace.",
    });
  }

  if (
    device.instantaneousPickupAmps !== null &&
    device.instantaneousPickupAmps <= device.pickupCurrentAmps
  ) {
    pushIssue(issues, {
      code: "instantaneous-below-pickup",
      severity: "error",
      fieldPath: `${basePath}.instantaneousPickupAmps`,
      message:
        "Instantaneous pickup should be higher than the inverse-time pickup current.",
    });
  }

  const family = getCurveFamilyById(device.curveFamilyId);
  if (
    device.instantaneousPickupAmps !== null &&
    device.instantaneousPickupAmps <
      device.pickupCurrentAmps * family.recommendedCurrentMultiplierRange.min
  ) {
    pushIssue(issues, {
      code: "instantaneous-near-pickup",
      severity: "warning",
      fieldPath: `${basePath}.instantaneousPickupAmps`,
      message:
        "Instantaneous pickup is very close to the inverse pickup. Expect a sharp transition and review the setting carefully.",
    });
  }
}

export function validateScenario(
  scenario: ProtectionCoordinationScenario
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (scenario.title.trim().length === 0) {
    pushIssue(issues, {
      code: "title-required",
      severity: "warning",
      fieldPath: "title",
      message:
        "Adding a scenario title makes exports easier to identify later.",
    });
  }

  if (scenario.devices.length === 0) {
    pushIssue(issues, {
      code: "devices-required",
      severity: "error",
      fieldPath: "devices",
      message: "Add at least one device to draw a time-current curve.",
    });
  }

  scenario.devices.forEach((device, index) =>
    validateDevice(issues, device, index)
  );

  const enabledDevices = scenario.devices.filter((device) => device.enabled);
  if (enabledDevices.length < 2) {
    pushIssue(issues, {
      code: "two-devices-recommended",
      severity: "warning",
      fieldPath: "devices",
      message:
        "Pairwise coordination checks become much more useful once at least two devices are enabled.",
    });
  }

  if (!(scenario.assumptions.minimumCoordinationMarginSeconds > 0)) {
    pushIssue(issues, {
      code: "coordination-margin-must-be-positive",
      severity: "error",
      fieldPath: "assumptions.minimumCoordinationMarginSeconds",
      message: "Minimum coordination margin must be greater than 0 s.",
    });
  }

  if (!(scenario.assumptions.instantaneousTripTimeSeconds > 0)) {
    pushIssue(issues, {
      code: "instantaneous-time-must-be-positive",
      severity: "error",
      fieldPath: "assumptions.instantaneousTripTimeSeconds",
      message: "Instantaneous clearing time must be greater than 0 s.",
    });
  }

  if (
    !(scenario.assumptions.currentMultiplierDomainMin > 1) ||
    scenario.assumptions.currentMultiplierDomainMin >=
      scenario.assumptions.currentMultiplierDomainMax
  ) {
    pushIssue(issues, {
      code: "current-multiplier-range-invalid",
      severity: "error",
      fieldPath: "assumptions.currentMultiplierDomainMin",
      message:
        "The supported current-multiplier range must start above pickup and end at a larger value.",
    });
  }

  const invalidStudyCurrents = scenario.studyCurrentsAmps.filter(
    (currentAmps) => !(currentAmps > 0)
  );

  if (invalidStudyCurrents.length > 0) {
    pushIssue(issues, {
      code: "study-currents-must-be-positive",
      severity: "error",
      fieldPath: "studyCurrentsAmps",
      message: "Study current markers must all be greater than 0 A.",
    });
  }

  const duplicatedCurrentCount =
    scenario.studyCurrentsAmps.length -
    new Set(
      scenario.studyCurrentsAmps.map((currentAmps) => currentAmps.toFixed(6))
    ).size;
  if (duplicatedCurrentCount > 0) {
    pushIssue(issues, {
      code: "duplicate-study-currents",
      severity: "warning",
      fieldPath: "studyCurrentsAmps",
      message:
        "Duplicate study current markers are allowed, but they do not add new information to the results panel.",
    });
  }

  return issues;
}
