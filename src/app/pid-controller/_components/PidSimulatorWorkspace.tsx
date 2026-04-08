"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { PidChart } from "@/app/pid-controller/_components/PidChart";
import { PidControls } from "@/app/pid-controller/_components/PidControls";
import { createFirstOrderPlant } from "@/features/pid-simulator/firstOrderPlant";
import { PidController } from "@/features/pid-simulator/pidController";
import {
  getPresetById,
  PID_SIMULATOR_PRESETS,
} from "@/features/pid-simulator/presets";
import {
  computeControlBehaviorMetrics,
  createInitialSimulationState,
  stepSimulation,
} from "@/features/pid-simulator/simulationEngine";
import {
  PidControllerConfig,
  SimulatorPresetId,
} from "@/features/pid-simulator/types";
import { roundTo } from "@/features/pid-simulator/utils";

const FIXED_DT_SECONDS = 1 / 60;
const HISTORY_WINDOW_SECONDS = 18;

const firstPreset = PID_SIMULATOR_PRESETS[0];

const buildControllerConfig = (
  kp: number,
  ki: number,
  kd: number
): PidControllerConfig => ({
  gains: { kp, ki, kd },
  outputMin: -2,
  outputMax: 2,
  integralMin: -4,
  integralMax: 4,
});

export function PidSimulatorWorkspace() {
  const plant = useMemo(
    () =>
      createFirstOrderPlant({
        gain: 1,
        timeConstantSeconds: 1.1,
        initialOutput: 0,
      }),
    []
  );

  const [presetId, setPresetId] = useState<SimulatorPresetId>(firstPreset.id);
  const [kp, setKp] = useState(firstPreset.gains.kp);
  const [ki, setKi] = useState(firstPreset.gains.ki);
  const [kd, setKd] = useState(firstPreset.gains.kd);
  const [setpoint, setSetpoint] = useState(firstPreset.setpoint);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [isRunning, setIsRunning] = useState(true);

  const controllerRef = useRef(
    new PidController(buildControllerConfig(kp, ki, kd))
  );
  const [simulationState, setSimulationState] = useState(() =>
    createInitialSimulationState(plant, {
      setpoint,
      timeStepSeconds: FIXED_DT_SECONDS,
      historyWindowSeconds: HISTORY_WINDOW_SECONDS,
    })
  );

  useEffect(() => {
    controllerRef.current.setConfig(buildControllerConfig(kp, ki, kd));
  }, [kp, ki, kd]);

  const resetSimulation = () => {
    controllerRef.current.reset();
    setSimulationState(
      createInitialSimulationState(plant, {
        setpoint,
        timeStepSeconds: FIXED_DT_SECONDS,
        historyWindowSeconds: HISTORY_WINDOW_SECONDS,
      })
    );
  };

  useEffect(() => {
    let rafId: number;
    let lastFrame = performance.now();
    let accumulator = 0;

    const tick = (now: number) => {
      const elapsedSeconds = Math.max((now - lastFrame) / 1000, 0);
      lastFrame = now;

      if (isRunning) {
        accumulator += elapsedSeconds * simulationSpeed;

        while (accumulator >= FIXED_DT_SECONDS) {
          setSimulationState((current) =>
            stepSimulation(current, plant, controllerRef.current, {
              setpoint,
              timeStepSeconds: FIXED_DT_SECONDS,
              historyWindowSeconds: HISTORY_WINDOW_SECONDS,
            })
          );
          accumulator -= FIXED_DT_SECONDS;
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [isRunning, plant, setpoint, simulationSpeed]);

  const metrics = useMemo(
    () => computeControlBehaviorMetrics(simulationState.samples, setpoint),
    [setpoint, simulationState.samples]
  );

  return (
    <section className="space-y-6 rounded-xl border border-gray-700 bg-gray-900/60 p-6 shadow-sm">
      <div>
        <h2 className="text-heading-sm text-white">PID Controller Simulator</h2>
        <p className="text-body mt-2 text-gray-300">
          This model uses a first-order plant and a deterministic fixed timestep
          of {FIXED_DT_SECONDS.toFixed(4)}s. The PID control law is u(t) =
          Kp·e(t) + Ki·∫e(t)dt + Kd·de(t)/dt.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <PidChart samples={simulationState.samples} />

        <PidControls
          kp={kp}
          ki={ki}
          kd={kd}
          setpoint={setpoint}
          simulationSpeed={simulationSpeed}
          activePresetId={presetId}
          presets={PID_SIMULATOR_PRESETS}
          isRunning={isRunning}
          onPresetChange={(nextPresetId) => {
            const preset = getPresetById(nextPresetId);
            if (!preset) {
              return;
            }

            setPresetId(preset.id);
            setKp(preset.gains.kp);
            setKi(preset.gains.ki);
            setKd(preset.gains.kd);
            setSetpoint(preset.setpoint);

            controllerRef.current.setConfig(
              buildControllerConfig(
                preset.gains.kp,
                preset.gains.ki,
                preset.gains.kd
              )
            );
            controllerRef.current.reset();
            setSimulationState(
              createInitialSimulationState(plant, {
                setpoint: preset.setpoint,
                timeStepSeconds: FIXED_DT_SECONDS,
                historyWindowSeconds: HISTORY_WINDOW_SECONDS,
              })
            );
          }}
          onKpChange={(value) => {
            setPresetId("well-tuned");
            setKp(value);
          }}
          onKiChange={(value) => {
            setPresetId("well-tuned");
            setKi(value);
          }}
          onKdChange={(value) => {
            setPresetId("well-tuned");
            setKd(value);
          }}
          onSetpointChange={setSetpoint}
          onSimulationSpeedChange={setSimulationSpeed}
          onToggleRunning={() => setIsRunning((current) => !current)}
          onReset={resetSimulation}
        />
      </div>

      <section className="grid gap-3 rounded-lg border border-gray-700 bg-black/40 p-4 text-sm md:grid-cols-2 xl:grid-cols-4">
        <div>
          <p className="text-gray-400">Rise time (10%→90%)</p>
          <p className="text-lg text-white">
            {metrics.riseTimeSeconds === null
              ? "—"
              : `${roundTo(metrics.riseTimeSeconds, 2)} s`}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Settling time (±2%)</p>
          <p className="text-lg text-white">
            {metrics.settlingTimeSeconds === null
              ? "—"
              : `${roundTo(metrics.settlingTimeSeconds, 2)} s`}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Overshoot</p>
          <p className="text-lg text-white">
            {metrics.overshootPercent === null
              ? "—"
              : `${roundTo(Math.max(metrics.overshootPercent, 0), 1)} %`}
          </p>
        </div>
        <div>
          <p className="text-gray-400">Steady-state error</p>
          <p className="text-lg text-white">
            {roundTo(metrics.steadyStateError, 3)}
          </p>
        </div>
      </section>
    </section>
  );
}
