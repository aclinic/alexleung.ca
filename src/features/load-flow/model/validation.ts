import { LoadFlowCase } from "@/features/load-flow/model/types";

export interface LoadFlowValidationResult {
  errors: string[];
}

const hasInvalidBranchImpedance = (r: number, x: number): boolean =>
  Math.abs(r) < Number.EPSILON && Math.abs(x) < Number.EPSILON;

const getDuplicateIds = (ids: string[]): string[] => [
  ...new Set(ids.filter((id, index) => ids.indexOf(id) !== index)),
];

export const validateLoadFlowCase = (
  loadFlowCase: LoadFlowCase
): LoadFlowValidationResult => {
  const errors: string[] = [];

  if (loadFlowCase.baseMVA <= 0) {
    errors.push("Base MVA must be greater than zero.");
  }

  const slackBuses = loadFlowCase.buses.filter((bus) => bus.type === "SLACK");

  if (slackBuses.length !== 1) {
    errors.push("Exactly one slack bus is required.");
  }

  const busIds = new Set(loadFlowCase.buses.map((bus) => bus.id));
  const duplicateBusIds = getDuplicateIds(
    loadFlowCase.buses.map((bus) => bus.id)
  );

  for (const duplicateBusId of duplicateBusIds) {
    errors.push(`Duplicate bus id detected: ${duplicateBusId}.`);
  }

  for (const branch of loadFlowCase.branches) {
    if (!busIds.has(branch.fromBusId) || !busIds.has(branch.toBusId)) {
      errors.push(
        `Branch ${branch.id} references a bus that does not exist in the case.`
      );
    }

    if (hasInvalidBranchImpedance(branch.r, branch.x)) {
      errors.push(
        `Branch ${branch.id} has invalid impedance (r and x cannot both be zero).`
      );
    }
  }

  for (const generator of loadFlowCase.generators) {
    if (!busIds.has(generator.busId)) {
      errors.push(
        `Generator ${generator.id} references a bus that does not exist in the case.`
      );
    }
  }

  const generatorBusIds = new Set(
    loadFlowCase.generators
      .filter((generator) => generator.status === "ON")
      .map((generator) => generator.busId)
  );

  for (const bus of loadFlowCase.buses) {
    if (bus.type === "PV" && !generatorBusIds.has(bus.id)) {
      errors.push(
        `PV bus ${bus.id} must be associated with an online generator.`
      );
    }
  }

  for (const load of loadFlowCase.loads) {
    if (!busIds.has(load.busId)) {
      errors.push(
        `Load ${load.id} references a bus that does not exist in the case.`
      );
    }
  }

  for (const shunt of loadFlowCase.shunts) {
    if (!busIds.has(shunt.busId)) {
      errors.push(
        `Shunt ${shunt.id} references a bus that does not exist in the case.`
      );
    }
  }

  return { errors };
};
