import {
  Branch,
  Bus,
  BusType,
  LoadFlowCase,
} from "@/features/load-flow/model/types";

export interface BusNode {
  id: string;
  name: string;
  baseKV: number;
  type: BusType;
  x: number;
  y: number;
}

export interface LineEdge {
  id: string;
  fromBusId: string;
  toBusId: string;
  r: number;
  x: number;
  bHalf: number;
}

export interface LoadFlowEditorState {
  baseMVA: number;
  busesById: Record<string, BusNode>;
  /**
   * Stable insertion/display order for buses independent of object key order.
   */
  busOrder: string[];
  branchesById: Record<string, LineEdge>;
  /**
   * Stable insertion/display order for branches independent of object key order.
   */
  branchOrder: string[];
  selectedElementId: string | null;
  selectedElementType: "BUS" | "BRANCH" | null;
}

const DEFAULT_BUS_BASE_KV = 230;

export const createInitialLoadFlowEditorState = (): LoadFlowEditorState => ({
  baseMVA: 100,
  busesById: {},
  busOrder: [],
  branchesById: {},
  branchOrder: [],
  selectedElementId: null,
  selectedElementType: null,
});

export const addBus = (
  state: LoadFlowEditorState,
  options?: { x?: number; y?: number }
): LoadFlowEditorState => {
  const id = `bus-${state.busOrder.length + 1}`;
  const name = `Bus ${state.busOrder.length + 1}`;

  return {
    ...state,
    busesById: {
      ...state.busesById,
      [id]: {
        id,
        name,
        baseKV: DEFAULT_BUS_BASE_KV,
        type: state.busOrder.length === 0 ? "SLACK" : "PQ",
        x: options?.x ?? 120 + state.busOrder.length * 120,
        y: options?.y ?? 120,
      },
    },
    busOrder: [...state.busOrder, id],
    selectedElementId: id,
    selectedElementType: "BUS",
  };
};

export const updateBus = (
  state: LoadFlowEditorState,
  busId: string,
  update: Partial<BusNode>
): LoadFlowEditorState => {
  const bus = state.busesById[busId];
  if (!bus) {
    return state;
  }

  return {
    ...state,
    busesById: {
      ...state.busesById,
      [busId]: {
        ...bus,
        ...update,
      },
    },
  };
};

export const addBranch = (
  state: LoadFlowEditorState,
  fromBusId: string,
  toBusId: string
): LoadFlowEditorState => {
  if (!state.busesById[fromBusId] || !state.busesById[toBusId]) {
    return state;
  }

  const id = `line-${state.branchOrder.length + 1}`;

  return {
    ...state,
    branchesById: {
      ...state.branchesById,
      [id]: {
        id,
        fromBusId,
        toBusId,
        r: 0.01,
        x: 0.1,
        bHalf: 0,
      },
    },
    branchOrder: [...state.branchOrder, id],
    selectedElementId: id,
    selectedElementType: "BRANCH",
  };
};

export const updateBranch = (
  state: LoadFlowEditorState,
  branchId: string,
  update: Partial<LineEdge>
): LoadFlowEditorState => {
  const branch = state.branchesById[branchId];
  if (!branch) {
    return state;
  }

  return {
    ...state,
    branchesById: {
      ...state.branchesById,
      [branchId]: {
        ...branch,
        ...update,
      },
    },
  };
};

export const selectElement = (
  state: LoadFlowEditorState,
  elementType: "BUS" | "BRANCH" | null,
  elementId: string | null
): LoadFlowEditorState => ({
  ...state,
  selectedElementType: elementType,
  selectedElementId: elementId,
});

export const toLoadFlowCase = (state: LoadFlowEditorState): LoadFlowCase => {
  const buses: Bus[] = state.busOrder.map((busId) => {
    const bus = state.busesById[busId];
    return {
      id: bus.id,
      name: bus.name,
      baseKV: bus.baseKV,
      type: bus.type,
    };
  });
  const branches: Branch[] = state.branchOrder.map((branchId) => {
    const branch = state.branchesById[branchId];
    return {
      id: branch.id,
      fromBusId: branch.fromBusId,
      toBusId: branch.toBusId,
      r: branch.r,
      x: branch.x,
      bHalf: branch.bHalf,
    };
  });

  return {
    baseMVA: state.baseMVA,
    buses,
    branches,
    generators: [],
    loads: [],
    shunts: [],
  };
};
