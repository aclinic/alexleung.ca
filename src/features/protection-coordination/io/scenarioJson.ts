import { z } from "zod";

import {
  PROTECTION_COORDINATION_DISCLAIMER,
  PROTECTION_COORDINATION_EXPORT_SCHEMA_VERSION,
  PROTECTION_COORDINATION_METHOD_VERSION,
  PROTECTION_COORDINATION_SCENARIO_SCHEMA_VERSION,
} from "@/features/protection-coordination/model/constants";
import { cloneScenario } from "@/features/protection-coordination/model/defaults";
import { ProtectionCoordinationScenario } from "@/features/protection-coordination/model/types";

const deviceSchema = z
  .object({
    id: z.string().min(1),
    label: z.string(),
    color: z.string().min(1),
    enabled: z.boolean(),
    curveFamilyId: z.enum([
      "iec-standard-inverse",
      "iec-very-inverse",
      "iec-extremely-inverse",
    ]),
    pickupCurrentAmps: z.number(),
    timeMultiplier: z.number(),
    instantaneousPickupAmps: z.number().nullable(),
    timeTolerancePercent: z.number(),
  })
  .strict();

const scenarioSchema = z
  .object({
    schemaVersion: z.literal(PROTECTION_COORDINATION_SCENARIO_SCHEMA_VERSION),
    title: z.string(),
    presetId: z.string().nullable(),
    notes: z.string(),
    devices: z.array(deviceSchema),
    studyCurrentsAmps: z.array(z.number()),
    assumptions: z
      .object({
        minimumCoordinationMarginSeconds: z.number(),
        instantaneousTripTimeSeconds: z.number(),
        currentMultiplierDomainMin: z.number(),
        currentMultiplierDomainMax: z.number(),
      })
      .strict(),
  })
  .strict();

const exportedScenarioSchema = z
  .object({
    schemaVersion: z.literal(PROTECTION_COORDINATION_EXPORT_SCHEMA_VERSION),
    tool: z.literal("protection-coordination"),
    methodVersion: z.string(),
    exportedAt: z.string(),
    disclaimer: z.string(),
    scenario: scenarioSchema,
  })
  .strict();

function normalizeImportedScenario(
  parsedValue: unknown
): ProtectionCoordinationScenario {
  const directScenario = scenarioSchema.safeParse(parsedValue);
  if (directScenario.success) {
    return cloneScenario(directScenario.data);
  }

  const exportedScenario = exportedScenarioSchema.safeParse(parsedValue);
  if (exportedScenario.success) {
    return cloneScenario(exportedScenario.data.scenario);
  }

  throw new Error("The JSON file does not match the expected scenario format.");
}

export function serializeScenarioJson(
  scenario: ProtectionCoordinationScenario,
  exportedAt = new Date().toISOString()
): string {
  return JSON.stringify(
    {
      schemaVersion: PROTECTION_COORDINATION_EXPORT_SCHEMA_VERSION,
      tool: "protection-coordination",
      methodVersion: PROTECTION_COORDINATION_METHOD_VERSION,
      exportedAt,
      disclaimer: PROTECTION_COORDINATION_DISCLAIMER,
      scenario,
    },
    null,
    2
  );
}

export function parseScenarioJson(
  text: string
): ProtectionCoordinationScenario {
  let parsedValue: unknown;

  try {
    parsedValue = JSON.parse(text);
  } catch {
    throw new Error("The selected file is not valid JSON.");
  }

  return normalizeImportedScenario(parsedValue);
}
