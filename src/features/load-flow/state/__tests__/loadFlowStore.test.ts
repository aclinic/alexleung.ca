import {
  addBranch,
  addBus,
  createInitialLoadFlowEditorState,
  toLoadFlowCase,
  updateBus,
} from "@/features/load-flow/state/loadFlowStore";

describe("loadFlowStore", () => {
  it("adds buses with deterministic defaults", () => {
    const initial = createInitialLoadFlowEditorState();
    const next = addBus(initial);

    expect(next.busOrder).toEqual(["bus-1"]);
    expect(next.busesById["bus-1"]).toEqual(
      expect.objectContaining({
        id: "bus-1",
        name: "Bus 1",
        type: "SLACK",
        baseKV: 230,
      })
    );

    const withSecondBus = addBus(next);
    expect(withSecondBus.busesById["bus-2"].type).toBe("PQ");
  });

  it("creates a line between existing buses and serializes graph state", () => {
    let state = createInitialLoadFlowEditorState();
    state = addBus(state);
    state = addBus(state);
    state = updateBus(state, "bus-2", { type: "PV" });

    state = addBranch(state, "bus-1", "bus-2");

    const snapshot = toLoadFlowCase(state);
    expect(snapshot.buses).toHaveLength(2);
    expect(snapshot.branches).toHaveLength(1);
    expect(snapshot.buses[1].type).toBe("PV");
    expect(snapshot.branches[0]).toEqual(
      expect.objectContaining({
        fromBusId: "bus-1",
        toBusId: "bus-2",
      })
    );
  });
});
