# Load Flow Tool (`/experimental/load-flow/`) – Implementation Status

## Goals

Build a fully client-side AC power flow analysis tool at `/experimental/load-flow/` that supports interactive one-line diagram modeling and robust load-flow solving for:

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

Status: **active feature note plus remaining-work plan**. The route, editor shell, single-line diagram, reference scenarios, Newton-Raphson solver path, IEEE case loading, and basic results table are implemented. Treat the remaining PR plan as a backlog, not as a full description of the current baseline.

---

## Implementation Status (April 2026)

Implemented baseline:

- ✅ Added `/experimental/load-flow/` route shell and workspace layout.
- ✅ Added initial domain model contracts under `src/features/load-flow/model/` (`types.ts`, `defaults.ts`, `validation.ts`).
- ✅ Added validator unit tests covering baseline pre-solve checks.
- ✅ Follow-up review hardening: added duplicate bus-ID validation and route coverage tests for the `/experimental/load-flow/` shell.
- ✅ PR #191 review follow-up: reject non-finite `baseMVA` values and non-finite branch impedance inputs.
- ✅ Implemented a first-pass canvas editor foundation with palette actions for bus/line creation.
- ✅ Added normalized editor store helpers under `src/features/load-flow/state/loadFlowStore.ts`.
- ✅ Added serialization path from editor graph state to `LoadFlowCase` shape (`toLoadFlowCase`).
- ✅ Added store unit tests for deterministic bus defaults and bus/line serialization behavior.
- ✅ Added an interactive SVG single-line diagram panel in `/experimental/load-flow/` with clickable buses/branches, selected-element highlighting, bus dragging, auto-layout, and result overlays.
- ✅ Added `src/features/load-flow/solver/` with algorithm selection, flat-start initialization, Newton-Raphson solving, diagnostics, and branch-flow outputs.
- ✅ Added built-in 2-bus and 3-bus scenarios plus IEEE 9/14/30/57/118-bus reference scenarios.
- ✅ Defaulted reference scenario selection to `IEEE 14-Bus` on initial load.
- ✅ Added solve result rendering for bus voltage angle/magnitude and net P/Q injections.

## Feedback Follow-ups (April 2, 2026)

- ✅ Updated the workspace layout so the SLD panel spans the full content width before the editor side panels.
- ✅ Defaulted reference scenario selection to `IEEE 14-Bus` on initial load.
- ✅ Switched branch rendering from direct segment lines to orthogonal right-angle polylines.
- ✅ Synchronized topology-list button highlight state with SLD click selection for both buses and lines.
- ✅ Kept IEEE 14-bus `baseKV` values aligned with MATPOWER case14 source data (0 kV placeholders in the published reference case).
- ✅ Expanded property editing coverage:
  - bus: name, base kV, type, voltage setpoint, angle setpoint, voltage min/max
  - branch: `R (pu)`, `X (pu)`, `B/2 (pu)`, thermal limit (MVA), and status
- ✅ Added a dedicated “Reset active reference case” action so edited reference scenarios can be restored from canonical source data.
- ✅ Reset now preserves the currently selected bus/branch when that element exists in the restored reference case.

Next recommended slice:

- Move from solver skeleton work to remaining user-facing gaps: generator/load/shunt editing, solver settings controls, branch-flow result tables, validation/diagnostics polish, and import/export.

---

## Assessment Snapshot (April 2026)

### 1) UI layer vs core engine separation

Current status: **mostly good for the current feature size**.

- Good: editor state is in `state/loadFlowStore.ts`, domain DTOs are in `model/types.ts`, and graph serialization lives in `graph/toLoadFlowCase.ts`.
- Remaining gap: generator/load/shunt editing exists in the data model but not as first-class editor UI.

### 2) Engine implementation plan quality

Current status: **solver facade and first Newton-Raphson path exist**.

- Newton-Raphson remains the primary path for correctness and mixed bus-type robustness.
- Algorithm selection is intentionally narrow: `NEWTON_RAPHSON` is the only implemented algorithm.
- Initialization is intentionally narrow: `FLAT_START` is the only implemented mode.
- Typed solver options and diagnostics are present, but the UI does not yet expose solver settings.

### 3) Planned directory structure

Current status: **represented in code, with a flatter solver layout than the original sketch**.

- `model/`, `graph/`, `solver/`, and `state/` exist under `src/features/load-flow/`.
- The original `solver/core` and `solver/io` subdirectories were not introduced; solver modules currently live directly under `solver/`.

## Non-Goals (Initial Scope)

- Real-time transient simulation
- Economic dispatch / OPF (future extension)
- Three-phase unbalanced analysis (future extension)
- Server-side solve services

---

## Architecture Overview

### Current module split

Current directory structure:

```text
src/
  app/
    experimental/
      load-flow/
        page.tsx
        _components/
          LoadFlowWorkspace.tsx
          SingleLineDiagram.tsx
          __tests__/
  features/
    load-flow/
      graph/
        toLoadFlowCase.ts
      model/
        defaults.ts
        types.ts
        validation.ts
        __tests__/
      solver/
        algorithmSelection.ts
        complex.ts
        ieeeReferenceScenarios.ts
        initialization.ts
        newtonRaphsonSolver.ts
        referenceScenarios.ts
        runLoadFlow.ts
        types.ts
        __tests__/
      state/
        loadFlowStore.ts
        __tests__/
```

Earlier sketches included a deeper `solver/core` and `solver/io` split. The current flatter layout is acceptable while the engine is still small.

Possible future structure if solver size grows:

```text
src/
  features/
    load-flow/
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
```

### Solver extraction readiness

Keep the solver side-effect free and UI-agnostic:

- No React imports in solver modules
- Pass plain serializable DTOs into solver entrypoints
- Return structured result objects + diagnostics
- Keep editor concerns in `state/` and graph-to-case adaptation in `graph/`

Future extraction path:

1. Move solver modules + `model/types` subset to `packages/load-flow-engine`
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

### Target outputs

Current implementation returns bus solutions, branch-flow solutions, and solver diagnostics. Constraint summaries remain planned.

- Bus solved voltage magnitude/angle
- Net bus `P/Q` injections
- Branch sending/receiving end `P/Q`
- Branch losses
- Constraint violation summary

---

## UI/UX Plan for `/experimental/load-flow/`

### Current interactions

- Add buses from the palette
- Connect the first two buses with a line element
- Drag buses directly in the single-line diagram
- Select element to edit properties in right panel

### Remaining user controls

- Bus type selector (`Slack/PV/PQ`)
- Global base MVA editor
- Generator/load/shunt editing
- Solver settings (tolerance, max iterations, damping)
- Solve / Reset / Export actions

### Single-line diagram expectations (implemented baseline)

The workspace should include a dedicated **single-line diagram** visualization
rather than a plain topology list. The baseline implementation now renders:

- Bus nodes (name + type label) using their editor coordinates
- Orthogonal branch polylines between bus centers
- Selection highlighting for the currently selected bus/branch
- Click interactions on both buses and branches that sync with the properties panel
- Drag-to-reposition buses directly in the diagram
- Basic result overlays through solved bus/branch data

Planned follow-up upgrades:

- Device glyph overlays for generators/loads/shunts at each bus
- Zoom/pan controls for larger multi-bus systems
- Richer result overlays (voltage magnitude heatmap and branch flow labels)

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

## Remaining Implementation Slices

The original PR plan is retained as a status-aware backlog. Completed slices should not be treated as future work.

### MVP Track

#### PR 1 — Route shell + domain model contracts _(Completed March 31, 2026)_

- ✅ Add `/experimental/load-flow/` route with placeholder workspace layout
- ✅ Introduce `model/types.ts`, defaults, and validation scaffolding
- ✅ Add documentation for sign conventions and bus types

**Acceptance:** route renders; type contracts compile; unit tests for validators pass.

#### PR 2 — Canvas editor foundation _(Completed April 1, 2026)_

- ✅ Introduced first-pass graph editor UX (palette actions, bus list/canvas snapshot, line wiring via initial connect action).
- ✅ Added normalized state store and selection/edit panel basics.
- ✅ Added bus and line creation/editing foundation with serialized case preview.

**Acceptance:** users can create/edit buses and lines; state serializes correctly.

#### PR 3 — Core solver skeleton _(Implemented baseline)_

- ✅ Add case conversion (`graph/toLoadFlowCase.ts`)
- ✅ Add `Ybus` assembly, mismatch calculation, Jacobian construction, and Newton-Raphson loop
- ✅ Add initial solver unit tests on small deterministic cases
- Remaining: split solver internals only if module size or review pressure justifies it.

**Acceptance:** valid small systems converge and return voltages/angles.

#### PR 4 — Full bus behavior + P/Q results _(Partially implemented)_

- ✅ Add Slack/PV/PQ equation handling end-to-end
- ✅ Add bus P/Q injection outputs
- ✅ Add branch-flow output data from the solver
- Remaining: expose branch-flow results in the UI and finish PV `Q` limit switching behavior.

**Acceptance:** solver handles mixed bus types with accurate `P/Q` outputs.

#### PR 5 — Shunt devices (reactor, inductor, capacitor) _(Partially implemented)_

- ✅ Add model representation
- ✅ Stamp shunts into the solver
- Remaining: add shunt device UI and targeted tests for reactive behavior/sign conventions

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
