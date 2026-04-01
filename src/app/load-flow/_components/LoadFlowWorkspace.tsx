"use client";

import { useMemo, useState } from "react";

import { BusType } from "@/features/load-flow/model/types";
import {
  addBranch,
  addBus,
  createInitialLoadFlowEditorState,
  selectElement,
  toLoadFlowCase,
  updateBranch,
  updateBus,
} from "@/features/load-flow/state/loadFlowStore";

const BUS_TYPE_OPTIONS: BusType[] = ["SLACK", "PV", "PQ"];

const parseFiniteNumber = (value: string): number | null => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const isBusType = (value: string): value is BusType =>
  BUS_TYPE_OPTIONS.some((type) => type === value);

export function LoadFlowWorkspace() {
  const [editorState, setEditorState] = useState(
    createInitialLoadFlowEditorState
  );

  const selectedBus =
    editorState.selectedElementType === "BUS" && editorState.selectedElementId
      ? editorState.busesById[editorState.selectedElementId]
      : null;
  const selectedBranch =
    editorState.selectedElementType === "BRANCH" &&
    editorState.selectedElementId
      ? editorState.branchesById[editorState.selectedElementId]
      : null;

  const serializedCase = useMemo(
    () => toLoadFlowCase(editorState),
    [editorState]
  );

  return (
    <section className="rounded-xl border border-gray-700 bg-gray-900/60 p-6 shadow-sm">
      <h2 className="text-heading-sm text-white">Workspace</h2>
      <p className="text-body mt-2 text-gray-300">
        Foundation editor for buses and lines with normalized state
        serialization.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-700 p-4">
          <h3 className="font-semibold text-white">Palette</h3>
          <p className="mt-1 text-sm text-gray-300">
            Add buses, then connect them with line elements.
          </p>
          <button
            type="button"
            className="mt-3 rounded-md border border-gray-500 px-3 py-2 text-sm text-white hover:bg-gray-800"
            onClick={() => setEditorState((prev) => addBus(prev))}
          >
            Add bus
          </button>

          <div className="mt-3 space-y-2 text-sm text-gray-200">
            {editorState.busOrder.length < 2 ? (
              <p>Add at least two buses to create a line.</p>
            ) : (
              <button
                type="button"
                className="rounded-md border border-gray-500 px-3 py-2 text-sm text-white hover:bg-gray-800"
                onClick={() => {
                  const [fromBusId, toBusId] = editorState.busOrder;
                  setEditorState((prev) => addBranch(prev, fromBusId, toBusId));
                }}
              >
                Connect first two buses
              </button>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-gray-700 p-4">
          <h3 className="font-semibold text-white">Canvas Snapshot</h3>
          <div className="mt-3 space-y-2 text-sm text-gray-200">
            {editorState.busOrder.map((busId) => {
              const bus = editorState.busesById[busId];
              return (
                <button
                  key={bus.id}
                  type="button"
                  className="block w-full rounded-md border border-gray-600 px-3 py-2 text-left hover:bg-gray-800"
                  onClick={() =>
                    setEditorState((prev) => selectElement(prev, "BUS", bus.id))
                  }
                >
                  {bus.name} • {bus.type} • {bus.baseKV} kV
                </button>
              );
            })}

            {editorState.branchOrder.map((branchId) => {
              const branch = editorState.branchesById[branchId];
              return (
                <button
                  key={branch.id}
                  type="button"
                  className="block w-full rounded-md border border-blue-800 px-3 py-2 text-left text-blue-200 hover:bg-gray-800"
                  onClick={() =>
                    setEditorState((prev) =>
                      selectElement(prev, "BRANCH", branch.id)
                    )
                  }
                >
                  {branch.id}: {branch.fromBusId} → {branch.toBusId}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-gray-700 p-4">
          <h3 className="font-semibold text-white">Properties</h3>
          {selectedBus ? (
            <div className="mt-3 space-y-2 text-sm text-gray-200">
              <label className="block">
                <span>Name</span>
                <input
                  value={selectedBus.name}
                  className="mt-1 w-full rounded border border-gray-600 bg-gray-950 px-2 py-1"
                  onChange={(event) =>
                    setEditorState((prev) =>
                      updateBus(prev, selectedBus.id, {
                        name: event.target.value,
                      })
                    )
                  }
                />
              </label>

              <label className="block">
                <span>Type</span>
                <select
                  value={selectedBus.type}
                  className="mt-1 w-full rounded border border-gray-600 bg-gray-950 px-2 py-1"
                  onChange={(event) => {
                    const nextType = event.target.value;
                    if (!isBusType(nextType)) {
                      return;
                    }

                    setEditorState((prev) =>
                      updateBus(prev, selectedBus.id, {
                        type: nextType,
                      })
                    );
                  }}
                >
                  {BUS_TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ) : null}

          {selectedBranch ? (
            <div className="mt-3 space-y-2 text-sm text-gray-200">
              <label className="block">
                <span>R (pu)</span>
                <input
                  type="number"
                  value={selectedBranch.r}
                  className="mt-1 w-full rounded border border-gray-600 bg-gray-950 px-2 py-1"
                  onChange={(event) => {
                    const parsedResistance = parseFiniteNumber(
                      event.target.value
                    );
                    if (parsedResistance === null) {
                      return;
                    }

                    setEditorState((prev) =>
                      updateBranch(prev, selectedBranch.id, {
                        r: parsedResistance,
                      })
                    );
                  }}
                />
              </label>
            </div>
          ) : null}

          {!selectedBus && !selectedBranch ? (
            <p className="mt-3 text-sm text-gray-300">
              Select a bus or line to edit properties.
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-gray-700 p-4">
        <h3 className="font-semibold text-white">Serialized case preview</h3>
        <pre className="mt-2 overflow-auto text-xs text-gray-300">
          {JSON.stringify(serializedCase, null, 2)}
        </pre>
      </div>
    </section>
  );
}
