# Load Flow Tool (`/load-flow`) – Concrete Implementation Plan

## Goals

Build a fully client-side AC power flow analysis tool at `/load-flow` that supports interactive one-line diagram modeling and robust load-flow solving for:

- Bus voltages (`|V|`) and voltage angles (`θ`)
- Active and reactive power (`P`, `Q`) injections and branch flows
- Bus type assignment (`Slack`, `PV`, `PQ`)
- Drag-and-drop network editing for:
  - Buses
  - Lines
  - Generators
  - Loads
  - Reactors / Inductors
  - Capacitors

This plan is intentionally modular so the solver can be extracted into a separate library later with minimal refactoring.

---

## Progress Update (April 1, 2026)

Completed across the first two slices (PR 1 + PR 2 scope):

- ✅ Added `/load-flow` route shell and initial workspace layout.
- ✅ Added initial domain model contracts under `src/features/load-flow/model/` (`types.ts`, `defaults.ts`, `validation.ts`).
- ✅ Added validator unit tests covering baseline pre-solve checks.
- ✅ Follow-up review hardening: added duplicate bus-ID validation and route coverage tests for the `/load-flow/` shell.
- ✅ PR #191 review follow-up: reject non-finite `baseMVA` values and non-finite branch impedance inputs.
- ✅ Implemented a first-pass canvas editor foundation with palette actions for bus/line creation.
- ✅ Added normalized editor store helpers under `src/features/load-flow/state/loadFlowStore.ts`.
- ✅ Added serialization path from editor graph state to `LoadFlowCase` shape (`toLoadFlowCase`).
- ✅ Added store unit tests for deterministic bus defaults and bus/line serialization behavior.
- ✅ Added an interactive SVG single-line diagram panel in `/load-flow` with clickable buses/branches and selected-element highlighting.

Next recommended slice:

- Build PR 3 solver skeleton: add `graphToCase.ts`, Ybus assembly, and first Newton-Raphson solve loop with deterministic mini-case tests.

---

## Assessment Snapshot (April 1, 2026)

### 1) UI layer vs core engine separation

Current status: **partially good, but not complete**.

- Good: the editor state is already in a pure store module (`state/loadFlowStore.ts`), and domain DTOs are in `model/types.ts`.
- Gap: graph serialization was previously colocated in the UI/editor state module, which couples editor concerns to solve-case DTO concerns.
- Remediation in this slice: move serialization to `graph/toLoadFlowCase.ts` and keep `state/` focused on editor interactions only.

### 2) Engine implementation plan quality

Current status: **high-level plan existed; algorithm and initialization decisions were under-specified**.

- Newton-Raphson remains the primary path for correctness and mixed bus-type robustness.
- Add explicit strategy for optional algorithm fallback and deterministic initialization policy.
- Add typed solver options and diagnostics interfaces now so solver internals can evolve without breaking UI contracts.

### 3) Planned directory structure

Current status: **planned in prose, not represented in code yet**.

- Remediation in this slice: introduce `graph/` and `solver/` scaffolding directories with typed entrypoints for algorithm selection, initialization, and execution facade.

## Non-Goals (Initial Scope)

- Real-time transient simulation
- Economic dispatch / OPF (future extension)
- Three-phase unbalanced analysis (future extension)
- Server-side solve services

---

## Architecture Overview

### High-level module split

Proposed directory structure:

```text
src/
  app/
    load-flow/
      page.tsx
      _components/
        LoadFlowWorkspace.tsx
        CanvasPanel.tsx
        PalettePanel.tsx
        PropertiesPanel.tsx
        SolvePanel.tsx
        ResultsPanel.tsx
  features/
    load-flow/
      model/
        types.ts
        validation.ts
        defaults.ts
      graph/
        toLoadFlowCase.ts
      solver/
        core/
          newtonRaphson.ts
          mismatch.ts
          jacobian.ts
          ybus.ts
          limits.ts
          convergence.ts
        io/
          resultTypes.ts
          runLoadFlow.ts
      state/
        loadFlowStore.ts
      workers/
        loadFlow.worker.ts
      ui/
        nodeRenderers.tsx
        edgeRenderers.tsx
      __tests__/
        ...
```

### Solver extraction readiness

From day one, keep the solver side-effect free and UI-agnostic:

- No React imports in solver modules
- Pass plain serializable DTOs into solver entrypoints
- Return structured result objects + diagnostics
- Keep solver in `src/features/load-flow/solver/core/*`

Future extraction path:

1. Move `solver/core` + `model/types` subset to `packages/load-flow-engine`
2. Keep existing `runLoadFlow` wrapper as adapter layer
3. Preserve API contract (`LoadFlowCase -> LoadFlowResult`)

---

## Data Model (TypeScript Contracts)

Define stable core interfaces first:

- `LoadFlowCase`
  - `baseMVA`
  - `buses: Bus[]`
  - `branches: Branch[]`
  - `generators: Generator[]`
  - `loads: Load[]`
  - `shunts: ShuntDevice[]` (reactors, inductors, capacitors)

- `Bus`
  - `id`, `name`, `baseKV`
  - `type: 'SLACK' | 'PV' | 'PQ'`
  - voltage constraints and setpoints

- `Branch`
  - `fromBusId`, `toBusId`, `r`, `x`, `bHalf`, optional thermal limits

- `Generator`
  - `busId`, `pSet`, `vSet`, `qMin`, `qMax`, `status`

- `Load`
  - `busId`, `p`, `q`, `status`

- `ShuntDevice`
  - `busId`
  - `kind: 'REACTOR' | 'INDUCTOR' | 'CAPACITOR'`
  - parameterization via susceptance/admittance (per-unit base conversion helper)

### Device sign conventions

Document and enforce conventions in one place:

- Loads consume positive `P`, `Q` and are applied as negative injections
- Capacitors inject reactive power (positive `Q` injection at bus)
- Reactors/inductors absorb reactive power (negative `Q` injection at bus)

---

## Solver Design (Newton-Raphson AC Load Flow)

### Unknown vector

- Angles for all non-slack buses
- Voltage magnitudes for PQ buses

### Equation set

- `ΔP` equations for PV and PQ buses
- `ΔQ` equations for PQ buses

### Iterative flow

1. Validate case topology and data completeness
2. Assemble sparse `Ybus`
3. Initialize state (flat start or warm start)
4. Compute mismatch vector
5. Build Jacobian block matrix (`J1`, `J2`, `J3`, `J4`)
6. Solve linear system for state update
7. Apply damping/step limiting as needed
8. Enforce `Q` limits on PV buses with PV→PQ switching
9. Stop on tolerance or max iterations

### Algorithm decision policy (v1)

Current implementation phase decision:

1. Use **Newton-Raphson only** until the core kernels (`Ybus`, mismatch, Jacobian, solve/update loop) are complete and benchmarked.
2. Evaluate **Fast-Decoupled** only after Newton-Raphson parity is validated on the benchmark fixture set (3/5/14 bus + internal stress cases).
3. Keep Gauss-Seidel out of the primary path (possible educational mode only).

Rationale:

- A single production path keeps correctness/debug diagnostics focused while the first engine kernel is maturing.
- Alternate algorithm work should be gated behind parity benchmarks rather than heuristics in a skeleton phase.

### Initialization policy (v1)

Current implementation phase decision:

- `FLAT_START` only (`|V|=1.0 pu`, `θ=0°` for all buses).

Follow-up expansion criteria:

- Add warm start only when solve results are persisted in a stable state model.
- Add DC angle seed only when a dedicated DC pre-solve path and regression benchmarks exist.

### Robustness requirements

- Island detection with explicit diagnostic
- Singular Jacobian handling with user-readable error
- Deterministic convergence report (iteration log + max mismatch per iteration)

### Outputs

- Bus solved voltage magnitude/angle
- Net bus `P/Q` injections
- Branch sending/receiving end `P/Q`
- Branch losses
- Constraint violation summary

---

## UI/UX Plan for `/load-flow`

### Canvas interactions

- Drag from palette to create nodes/devices
- Connect buses with line edges
- Attach generators/loads/shunts to buses
- Select element to edit properties in right panel

### Required user controls

- Bus type selector (`Slack/PV/PQ`)
- Global base MVA
- Solver settings (tolerance, max iterations, damping)
- Solve / Reset / Export actions

### Single-line diagram expectations (implemented baseline)

The workspace should include a dedicated **single-line diagram** visualization
rather than a plain topology list. The baseline implementation now renders:

- Bus nodes (name + type label) using their editor coordinates
- Branch segments between bus centers
- Selection highlighting for the currently selected bus/branch
- Click interactions on both buses and branches that sync with the properties panel

Planned follow-up upgrades:

- Drag-to-reposition buses directly in the diagram (persisting `x`,`y`)
- Device glyph overlays for generators/loads/shunts at each bus
- Zoom/pan controls for larger multi-bus systems
- Optional result overlays (voltage magnitude heatmap and branch flow labels)

### Validation UX

Pre-solve checks with blocking errors:

- Exactly one slack bus
- All referenced buses exist
- No invalid branch impedances
- PV buses must have generator association
- Connected/island-aware topology

---

## Testing Strategy (Comprehensive Coverage)

### 1) Solver unit tests (highest priority)

- `Ybus` assembly correctness on canonical mini-cases
- Mismatch function correctness against hand-computed values
- Jacobian numerical sanity (finite-difference spot checks)
- PV `Q`-limit switching behavior
- Capacitor/reactor/inductor shunt impact on bus `Q`
- Non-convergence, singular, and islanded-case diagnostics

### 2) Regression benchmark tests

- IEEE-style benchmark fixtures (3-bus, 5-bus, 14-bus)
- Expected voltage and angle tolerances
- Stable snapshot of diagnostic metadata

### 3) UI interaction tests

- Drag-drop create/edit/connect flow
- Property edits reflected in normalized state
- Solve disabled for invalid topology and enabled for valid case
- Result tables render expected fields

### 4) Optional worker integration tests

- Request/response contract across `loadFlow.worker.ts`
- Proper error propagation without UI lock-up

### Coverage targets

- Maintain strong solver coverage (goal: 90%+ for solver modules)
- Preserve repository-level coverage requirements

---

## Concrete Implementation Plan (Stacked or Independent PR-Friendly)

Below are bite-sized slices designed for clean review. They can be run as stacked PRs or independent PRs against `main`.

### MVP Track

#### PR 1 — Route shell + domain model contracts _(Completed March 31, 2026)_

- ✅ Add `/load-flow` route with placeholder workspace layout
- ✅ Introduce `model/types.ts`, defaults, and validation scaffolding
- ✅ Add documentation for sign conventions and bus types

**Acceptance:** route renders; type contracts compile; unit tests for validators pass.

#### PR 2 — Canvas editor foundation _(Completed April 1, 2026)_

- ✅ Introduced first-pass graph editor UX (palette actions, bus list/canvas snapshot, line wiring via initial connect action).
- ✅ Added normalized state store and selection/edit panel basics.
- ✅ Added bus and line creation/editing foundation with serialized case preview.

**Acceptance:** users can create/edit buses and lines; state serializes correctly.

#### PR 3 — Core solver skeleton

- Add case conversion (`graphToCase.ts`)
- Add `Ybus` builder + mismatch + Newton-Raphson loop (no PV limit switching yet)
- Add initial solver unit tests on small deterministic cases

**Acceptance:** valid small systems converge and return voltages/angles.

#### PR 4 — Full bus behavior + P/Q results

- Add Slack/PV/PQ equation handling end-to-end
- Add PV `Q` limits and PV→PQ switching
- Add result tables for bus/branch `P/Q`

**Acceptance:** solver handles mixed bus types with accurate `P/Q` outputs.

#### PR 5 — Shunt devices (reactor, inductor, capacitor)

- Add shunt device UI + model representation
- Stamp shunts into case and solver
- Add targeted unit tests for reactive behavior/sign conventions

**Acceptance:** capacitor and reactor/inductor effects appear correctly in `Q` balances and voltages.

#### PR 6 — Validation + diagnostics polish

- Add full pre-solve validation UX
- Add convergence logs and clearer failure messages
- Add import/export JSON baseline

**Acceptance:** invalid cases are blocked with actionable errors; diagnostics are inspectable.

### V1+ Track

#### PR 7 — Workerization + performance pass

- Move solver execution to Web Worker
- Add cancellation and stale-result guards
- Add larger-network performance tests

#### PR 8 — Benchmark/template library

- Add sample cases (3/5/14 bus)
- One-click template load from UI
- Add regression tests against template expected outputs

#### PR 9 — Advanced UX and analysis

- Voltage heatmap and branch loading visuals
- Iteration plot / mismatch trend chart
- Undo/redo and improved editing ergonomics

#### PR 10 — Engine extraction prep

- Harden adapter boundaries and remove UI assumptions from solver modules
- Add package-ready API docs and extraction checklist
- Optional: create `packages/load-flow-engine` in-repo workspace

---

## API Contract Sketch (for Stability)

```ts
export interface SolveOptions {
  tolerance: number;
  maxIterations: number;
  damping?: number;
  enforceReactiveLimits: boolean;
}

export interface LoadFlowEngine {
  solve(input: LoadFlowCase, options?: SolveOptions): LoadFlowResult;
}
```

Keep this contract stable so migration to a separate package remains low risk.

---

## Risks and Mitigations

- **Convergence edge cases:** include damping and robust diagnostics early.
- **Modeling ambiguity for shunts:** centralize sign and unit conversion helpers.
- **UI/solver coupling risk:** strict DTO boundary + adapter pattern.
- **Large-case responsiveness:** workerize before V1 expansion.

---

## Definition of Done (Per PR)

Each PR should include:

- Focused scope (single logical increment)
- Updated/added tests for new behavior
- Passing lint/typecheck/unit/build gates
- Concise docs update for any changed user-facing behavior

For stacked PRs, each layer must be mergeable and testable independently.
