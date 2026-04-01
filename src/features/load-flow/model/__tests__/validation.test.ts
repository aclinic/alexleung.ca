import { DEFAULT_LOAD_FLOW_CASE } from "@/features/load-flow/model/defaults";
import { LoadFlowCase } from "@/features/load-flow/model/types";
import { validateLoadFlowCase } from "@/features/load-flow/model/validation";

const createCase = (overrides: Partial<LoadFlowCase>): LoadFlowCase => ({
  ...DEFAULT_LOAD_FLOW_CASE,
  ...overrides,
});

describe("validateLoadFlowCase", () => {
  it("accepts a minimal valid case", () => {
    const result = validateLoadFlowCase(DEFAULT_LOAD_FLOW_CASE);

    expect(result.errors).toEqual([]);
  });

  it("requires exactly one slack bus", () => {
    const result = validateLoadFlowCase(
      createCase({
        buses: [
          {
            id: "bus-1",
            name: "Bus 1",
            baseKV: 230,
            type: "PQ",
          },
        ],
      })
    );

    expect(result.errors).toContain("Exactly one slack bus is required.");
  });

  it("rejects non-finite base MVA values", () => {
    const nanResult = validateLoadFlowCase(
      createCase({
        baseMVA: Number.NaN,
      })
    );
    const infinityResult = validateLoadFlowCase(
      createCase({
        baseMVA: Number.POSITIVE_INFINITY,
      })
    );

    expect(nanResult.errors).toContain(
      "Base MVA must be a finite number greater than zero."
    );
    expect(infinityResult.errors).toContain(
      "Base MVA must be a finite number greater than zero."
    );
  });

  it("flags branches that reference missing buses", () => {
    const result = validateLoadFlowCase(
      createCase({
        branches: [
          {
            id: "branch-1",
            fromBusId: "bus-1",
            toBusId: "bus-2",
            r: 0.01,
            x: 0.03,
          },
        ],
      })
    );

    expect(result.errors).toContain(
      "Branch branch-1 references a bus that does not exist in the case."
    );
  });

  it("flags branches with zero impedance", () => {
    const result = validateLoadFlowCase(
      createCase({
        branches: [
          {
            id: "branch-1",
            fromBusId: "bus-1",
            toBusId: "bus-1",
            r: 0,
            x: 0,
          },
        ],
      })
    );

    expect(result.errors).toContain(
      "Branch branch-1 has invalid impedance (r and x cannot both be zero)."
    );
  });

  it("flags branches with non-finite impedance values", () => {
    const result = validateLoadFlowCase(
      createCase({
        branches: [
          {
            id: "branch-1",
            fromBusId: "bus-1",
            toBusId: "bus-1",
            r: Number.NaN,
            x: 0.03,
          },
        ],
      })
    );

    expect(result.errors).toContain(
      "Branch branch-1 has invalid impedance (r and x must be finite numbers)."
    );
  });

  it("flags duplicate bus identifiers", () => {
    const result = validateLoadFlowCase(
      createCase({
        buses: [
          {
            id: "bus-1",
            name: "Bus 1",
            baseKV: 230,
            type: "SLACK",
          },
          {
            id: "bus-1",
            name: "Bus 1 Duplicate",
            baseKV: 230,
            type: "PQ",
          },
        ],
      })
    );

    expect(result.errors).toContain("Duplicate bus id detected: bus-1.");
  });

  it("requires PV buses to have online generator associations", () => {
    const result = validateLoadFlowCase(
      createCase({
        buses: [
          {
            id: "bus-1",
            name: "Bus 1",
            baseKV: 230,
            type: "SLACK",
          },
          {
            id: "bus-2",
            name: "Bus 2",
            baseKV: 230,
            type: "PV",
          },
        ],
        generators: [
          {
            id: "gen-1",
            busId: "bus-2",
            pSet: 1,
            vSet: 1,
            qMin: -0.5,
            qMax: 0.5,
            status: "OFF",
          },
        ],
      })
    );

    expect(result.errors).toContain(
      "PV bus bus-2 must be associated with an online generator."
    );
  });
});
