# PID Controller Simulator Architecture

This simulator is implemented as a client-only feature for static export compatibility.

## Module layout

- `src/features/pid-simulator/types.ts` defines plant, controller, runtime, and preset contracts.
- `src/features/pid-simulator/pidController.ts` implements PID math and state (`integralState`, `previousError`).
- `src/features/pid-simulator/firstOrderPlant.ts` provides a first-order plant model.
- `src/features/pid-simulator/simulationEngine.ts` manages deterministic fixed-step simulation and behavior metrics.
- `src/features/pid-simulator/presets.ts` provides educational tuning presets matched to the current plant and actuator limits.
- `src/app/experimental/pid-controller/_components/*` contains UI composition, chart rendering, and controls.

## Mathematical model

### Plant

The simulator uses a first-order process:

`dy/dt = (-y + K·u) / τ`

- `y`: process variable
- `u`: controller output
- `K`: plant gain
- `τ`: time constant

Integration is explicit Euler with fixed timestep `dt = 1/60 s`.

### PID controller

The controller output is:

`u(t) = Kp·e(t) + Ki·∫e(t)dt + Kd·de(t)/dt`

where `e(t) = setpoint - processVariable`.

Implementation details:

- Integral state is accumulated and clamped to reduce windup.
- Output is clamped to configured actuator limits.
- Derivative term uses discrete error slope `(e[k] - e[k-1]) / dt`.

## Numerical update approach

Rendering uses `requestAnimationFrame`, but simulation stepping is deterministic:

1. Accumulate elapsed wall-clock time scaled by user speed.
2. Step the engine with constant `dt` while `accumulator >= dt`.
3. Append samples until a configurable max simulation time is reached, then pause.
4. Reset the sampled response when gains or setpoint change so the new step response fills the chart again.

This keeps simulation behavior stable across frame rate differences.

## Extension points

- Additional plants can implement the `PlantModel` contract.
- Alternate controllers can reuse `simulationEngine.ts` with the same stepping interface.
- Preset definitions are data-only and can be expanded without UI rewrites.
