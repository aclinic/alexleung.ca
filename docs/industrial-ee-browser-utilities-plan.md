# Industrial Electrical Engineering Browser Utilities – Implementation Plan

Status: **parked planning reference**. This document captures a possible future product direction, not an active implementation plan for the current site. Revisit and revalidate the research, safety, and legal assumptions before using it to drive work.

## Purpose and Scope

Create four browser-hosted industrial electrical engineering utilities with a shared architecture, validation model, and testing strategy:

1. Arc Flash Incident Energy Calculator
2. Protection Coordination / Time-Current Curve (TCC) Tool
3. Motor Starting Analysis Tool
4. Cable Ampacity + Voltage Drop Tool

The plan emphasizes:

- Deterministic client-side calculations with transparent assumptions
- Comprehensive, literature-grounded verification and validation
- Explicit disclaimers and safe-use messaging ("use at your own risk")
- Extensible solver modules that can be reused across utilities

---

## Cross-Cutting Product Requirements

### 1) Safety and Disclaimer Requirements (Mandatory)

Each tool must include, at minimum:

- A persistent disclaimer banner near primary actions (calculate/export):
  - "Engineering aid only. Use at your own risk. Results must be reviewed and approved by a qualified engineer before field use."
- A first-use acknowledgement modal with explicit acceptance checkbox.
- Exported reports (PDF/CSV/JSON) must embed the same disclaimer text.
- "Assumptions & Limits" section listing model boundaries and unsupported conditions.
- Versioned calculation method identifier and timestamp in outputs for traceability.

### 2) Shared Architecture

Implement a common package/module layout for all four tools:

- `model/` – data contracts, units, defaults, schema validation
- `solver/` – side-effect-free calculation core
- `validation/` – input guards + pre-solve blocking checks
- `io/` – report serialization and import/export adapters
- `ui/` – forms, plots, tables, warnings, and result explainers
- `__tests__/` – unit, integration, and regression fixtures

### 3) Units and Data Integrity

- Support SI and imperial where practical with explicit conversion library.
- Require explicit unit labels in every input and output field.
- Prevent silent coercions (e.g., Hz, kV, mm², AWG ambiguities).
- Include uncertainty notes for inputs known to be estimated (e.g., fault current).

### 4) Explainability and Auditability

- Every output metric should be traceable to equations and intermediate values.
- Provide expandable "calculation trace" panes.
- Include assumptions and standard references (method-level, not full-text reproductions).

---

## Research Program (Foundational Work Before Finalizing Solvers)

To ensure comprehensive and grounded tests, perform a formal research phase before implementation freeze.

### Research Deliverables

For each utility, produce:

1. **Standards and references matrix**
   - Governing standards, reputable handbooks, manufacturer guides, utility practices.
2. **Equation inventory**
   - Primary formulas, variable definitions, applicability limits, edge-case notes.
3. **Benchmark case catalog**
   - Hand-calculated cases, textbook/reference examples, and realistic industrial scenarios.
4. **Tolerance policy**
   - Numeric tolerance targets for each output and rationale.
5. **Known disagreement map**
   - Where references diverge (methods, constants, correction factors).

### Research Acceptance Criteria

- At least 3 independent high-quality references per major calculation path.
- At least 10 benchmark cases per utility, spanning nominal, edge, and failure modes.
- Documented rationale for chosen defaults and method variants.
- Explicitly documented "not supported" scenarios.

---

## Utility 1: Arc Flash Incident Energy Calculator

## Objective

Estimate incident energy at working distance, arc flash boundary, and sensitivity to protection clearing time.

## MVP Features

- Input panels for system voltage class, bolted fault current, clearing time, working distance, and enclosure/electrode assumptions.
- Output: incident energy, boundary distance, and scenario comparison table.
- "What-if" sweep: clearing time and fault current sensitivity plots.

## Validation Rules

- Block unsupported voltage/configuration combinations.
- Require explicit clearing-time source (manual, relay estimate, imported curve point).
- Enforce physically plausible ranges for distances and current values.

## Research and Test Plan

- Build method comparison tests across recognized arc-flash methodologies where applicable.
- Reproduce published example cases from literature and training references.
- Add property-based tests for monotonic behavior (e.g., increased clearing time should not reduce energy under same assumptions).
- Add boundary tests for low and high fault currents and extreme working distances.

## Risk and Safety Messaging

- Mandatory warning that arc-flash labels and PPE decisions require professional review and site-specific study.
- Highlight that protective device actual operating behavior may differ from nominal settings.

---

## Utility 2: Protection Coordination / TCC Tool

## Objective

Visualize and evaluate selective coordination among fuses, breakers, and protective relays using TCC overlays.

## MVP Features

- Device library support for common curve families.
- Plot multiple devices on log-log axes with pickup/time dial editing.
- Auto-detect overlap/conflict windows and coordination margins.
- Export coordination report with annotated plots.

## Validation Rules

- Require complete device metadata (curve family, pickup basis, tolerance assumptions).
- Validate current-axis domains and extrapolation limits.
- Flag when curve interpolation/extrapolation goes beyond published manufacturer data.

## Research and Test Plan

- Collect manufacturer curve datasets and normalize into consistent internal schema.
- Build golden-image visual regression suite for plotted curves.
- Create benchmark scenarios (radial feeder, main-tie-main, motor branch circuits).
- Validate interpolation engine against reference points from published curves.
- Include tests for nuisance cases: CT ratio mismatch, pickup mis-entry, dial boundary values.

## Risk and Safety Messaging

- Disclaimer that plotted coordination is advisory and must be validated against latest manufacturer and site settings.
- Warn users when they are using approximated or interpolated points.

---

## Utility 3: Motor Starting Analysis Tool

## Objective

Estimate starting current profile, terminal voltage dip, and acceleration-time viability for common starting methods.

## MVP Features

- Support DOL, star-delta, soft starter, and VFD starting abstractions.
- Inputs for motor rating, locked-rotor characteristics, source impedance, feeder parameters, and load torque class.
- Outputs: inrush/current envelope, bus voltage dip profile, estimated acceleration time/pass-fail.

## Validation Rules

- Require explicit source model (stiff source vs finite Thevenin equivalent).
- Validate torque-speed assumptions and reject contradictory parameter combinations.
- Warn when user relies on defaulted motor constants without nameplate/test data.

## Research and Test Plan

- Gather benchmark starting studies from textbooks, vendor application notes, and utility interconnection guidance.
- Build parameter-sweep tests over source strength and load inertia.
- Validate against published examples for each starting method.
- Add sensitivity tests to show effect of impedance estimation uncertainty.
- Include non-convergence or infeasible-start detection tests.

## Risk and Safety Messaging

- Warning that thermal, protection, and mechanical constraints must be checked separately.
- Advisory that field performance may differ due to motor condition and process loading.

---

## Utility 4: Cable Ampacity + Voltage Drop Tool

## Objective

Recommend conductor sizing based on ampacity, installation derating factors, and voltage-drop constraints.

## MVP Features

- Inputs for conductor material/type, insulation/temp rating, installation method, ambient conditions, grouping, run length, and load profile.
- Outputs: candidate conductor sizes, derated ampacity, percent voltage drop, and estimated losses.
- Comparison mode for multiple conductor options.

## Validation Rules

- Enforce required installation context for derating calculations.
- Prevent mixed-unit mistakes (one-way vs round-trip length, line-to-line vs line-to-neutral voltage basis).
- Require explicit demand assumptions (continuous/non-continuous load treatment).

## Research and Test Plan

- Map calculation pathways to applicable code/standard tables and correction factors.
- Create fixture sets for common industrial installation scenarios (tray, conduit, bundled runs, elevated ambient).
- Cross-check outputs against handbook examples and engineering calculators with documented assumptions.
- Add tests for edge conditions: long runs, high ambient, severe grouping derates.

## Risk and Safety Messaging

- Disclaimer that local electrical code and AHJ requirements govern final design.
- Warning that installation details materially affect allowable ampacity and must be verified in field context.

---

## Unified Testing Strategy (All Four Utilities)

### Test Layers

1. **Unit tests**
   - Equation correctness, conversion correctness, and validation guards.
2. **Reference regression tests**
   - Compare solver outputs to curated literature/standard benchmark fixtures.
3. **Property-based tests**
   - Monotonic and invariance properties (where physically expected).
4. **UI integration tests**
   - Input-to-output workflows, error states, and disclaimer visibility checks.
5. **Visual regression tests**
   - Plot consistency for TCC and sensitivity charts.
6. **Export contract tests**
   - Ensure disclaimers, assumptions, method version, and timestamps are present.

### Coverage and Quality Gates

- High coverage targets for solver and validation modules.
- Mandatory benchmark fixture pass before release.
- Snapshot updates require explicit review note describing why plot/render changes are expected.

### Research Traceability in Tests

Each benchmark fixture must include metadata:

- source reference ID
- scenario category
- selected method variant
- expected tolerance band
- known limitations

---

## Delivery Phasing

### Phase 0 – Discovery and Research Baseline

- Compile literature/reference matrix and benchmark catalogs.
- Finalize disclaimer language with legal/safety review.
- Define shared units, model contracts, and plotting conventions.

### Phase 1 – Shared Platform Foundation

- Build common model/validation/solver scaffolding.
- Implement report export framework and disclaimer injection.
- Create benchmark fixture format and test harness.

### Phase 2 – Utility MVPs (Sequential)

Recommended order:

1. Cable Ampacity + Voltage Drop (fastest practical utility)
2. Motor Starting
3. Arc Flash
4. Protection Coordination/TCC

Rationale: establish core math/validation patterns first, then expand into higher-ambiguity curve and coordination workflows.

### Phase 3 – Cross-Utility Hardening

- Usability pass on warnings and assumptions clarity.
- Performance optimization for large scenario sweeps and dense curves.
- Expand benchmark library with additional literature-backed fixtures.

### Phase 4 – Public Beta Readiness

- Final disclaimer checks across UI and exports.
- Documentation package: methods, limitations, validation summary.
- Release checklist signoff with explicit "use at your own risk" language.

---

## Documentation Requirements

For each utility, publish:

- Method note (equations, references, assumptions)
- Validation note (benchmark sources, tolerance policy, known discrepancies)
- User guide with interpretation cautions
- Changelog with method-version impacts

---

## Non-Negotiable Release Criteria

A utility cannot be marked production-ready unless:

- Disclaimer requirements are implemented in UI and exported artifacts.
- Research matrix and benchmark fixtures are complete and reviewed.
- Comprehensive test suite passes (unit + reference + integration + visual where applicable).
- Known limitations and unsupported scenarios are documented.
