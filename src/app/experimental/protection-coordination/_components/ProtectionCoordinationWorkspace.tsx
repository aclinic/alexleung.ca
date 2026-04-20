"use client";

import {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

import { Badge } from "@/components/Badge";
import {
  parseScenarioJson,
  serializeScenarioJson,
} from "@/features/protection-coordination/io/scenarioJson";
import {
  PROTECTION_COORDINATION_ACKNOWLEDGEMENT_STORAGE_KEY,
  PROTECTION_COORDINATION_DISCLAIMER,
  PROTECTION_COORDINATION_METHOD_VERSION,
} from "@/features/protection-coordination/model/constants";
import {
  createDefaultScenario,
  createDevice,
} from "@/features/protection-coordination/model/defaults";
import {
  createScenarioFromPreset,
  PROTECTION_COORDINATION_PRESETS,
} from "@/features/protection-coordination/model/presets";
import {
  ProtectionCoordinationScenario,
  ProtectionDevice,
} from "@/features/protection-coordination/model/types";
import { analyzeCoordination } from "@/features/protection-coordination/solver/analyzeCoordination";
import { validateScenario } from "@/features/protection-coordination/validation/validateScenario";

import { DeviceEditorCard } from "./DeviceEditorCard";
import { ResultsPanel } from "./ResultsPanel";
import { SafetyAcknowledgementModal } from "./SafetyAcknowledgementModal";
import { TccPlot } from "./TccPlot";

type StatusTone = "info" | "success" | "warning";

function formatStudyCurrents(studyCurrentsAmps: number[]): string {
  return studyCurrentsAmps.join(", ");
}

function parseStudyCurrentsInput(value: string) {
  const tokens = value
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);

  if (tokens.length === 0) {
    return { currents: [] as number[], error: null as string | null };
  }

  const currents = tokens.map((token) => Number(token));

  if (
    currents.some(
      (currentAmps) => !Number.isFinite(currentAmps) || currentAmps <= 0
    )
  ) {
    return {
      currents: [] as number[],
      error: "Study currents must be positive numbers separated by commas.",
    };
  }

  return {
    currents: Array.from(new Set(currents)).sort((left, right) => left - right),
    error: null as string | null,
  };
}

function cloneDevices(devices: ProtectionDevice[]) {
  return devices.map((device) => ({ ...device }));
}

function sanitizeTitleForFilename(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function ProtectionCoordinationWorkspace() {
  const [scenario, setScenario] = useState<ProtectionCoordinationScenario>(
    createDefaultScenario()
  );
  const [studyCurrentsText, setStudyCurrentsText] = useState(() =>
    formatStudyCurrents(createDefaultScenario().studyCurrentsAmps)
  );
  const [studyCurrentsInputError, setStudyCurrentsInputError] = useState<
    string | null
  >(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<StatusTone>("info");
  const [hasAcknowledgedSafety, setHasAcknowledgedSafety] = useState<
    boolean | null
  >(null);
  const [acknowledgementChecked, setAcknowledgementChecked] = useState(false);
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(
      PROTECTION_COORDINATION_ACKNOWLEDGEMENT_STORAGE_KEY
    );

    setHasAcknowledgedSafety(storedValue === "accepted");
  }, []);

  const validationIssues = useMemo(
    () => validateScenario(scenario),
    [scenario]
  );
  const hasBlockingIssues = validationIssues.some(
    (issue) => issue.severity === "error"
  );
  const analysis = useMemo(() => analyzeCoordination(scenario), [scenario]);

  const updateScenario = (
    producer: (
      previousScenario: ProtectionCoordinationScenario
    ) => ProtectionCoordinationScenario
  ) => {
    setScenario((previousScenario) => producer(previousScenario));
    setStatusMessage(null);
  };

  const applyScenario = (nextScenario: ProtectionCoordinationScenario) => {
    setScenario(nextScenario);
    setStudyCurrentsText(formatStudyCurrents(nextScenario.studyCurrentsAmps));
    setStudyCurrentsInputError(null);
    setStatusMessage(null);
  };

  const updateDevice = (deviceId: string, patch: Partial<ProtectionDevice>) => {
    updateScenario((previousScenario) => ({
      ...previousScenario,
      devices: previousScenario.devices.map((device) =>
        device.id === deviceId ? { ...device, ...patch } : device
      ),
    }));
  };

  const moveDevice = (deviceId: string, direction: -1 | 1) => {
    updateScenario((previousScenario) => {
      const deviceIndex = previousScenario.devices.findIndex(
        (device) => device.id === deviceId
      );

      if (deviceIndex < 0) {
        return previousScenario;
      }

      const nextIndex = deviceIndex + direction;
      if (nextIndex < 0 || nextIndex >= previousScenario.devices.length) {
        return previousScenario;
      }

      const nextDevices = cloneDevices(previousScenario.devices);
      const [movedDevice] = nextDevices.splice(deviceIndex, 1);
      nextDevices.splice(nextIndex, 0, movedDevice);

      return {
        ...previousScenario,
        devices: nextDevices,
      };
    });
  };

  const removeDevice = (deviceId: string) => {
    updateScenario((previousScenario) => ({
      ...previousScenario,
      devices: previousScenario.devices.filter(
        (device) => device.id !== deviceId
      ),
    }));
  };

  const handleStudyCurrentsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;

    setStudyCurrentsText(nextValue);

    const parsedResult = parseStudyCurrentsInput(nextValue);
    setStudyCurrentsInputError(parsedResult.error);

    if (parsedResult.error) {
      return;
    }

    updateScenario((previousScenario) => ({
      ...previousScenario,
      studyCurrentsAmps: parsedResult.currents,
    }));
  };

  const handlePresetApply = (presetId: string) => {
    startTransition(() => {
      applyScenario(createScenarioFromPreset(presetId));
    });
  };

  const handleImportButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFileChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const fileContents = await file.text();
      const importedScenario = parseScenarioJson(fileContents);

      startTransition(() => {
        applyScenario(importedScenario);
      });
      setStatusTone("success");
      setStatusMessage(`Imported scenario from ${file.name}.`);
    } catch (error) {
      setStatusTone("warning");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Unable to import that JSON file."
      );
    } finally {
      event.target.value = "";
    }
  };

  const handleExportJson = () => {
    if (hasBlockingIssues) {
      setStatusTone("warning");
      setStatusMessage(
        "Fix the blocking validation issues before exporting a scenario."
      );
      return;
    }

    const json = serializeScenarioJson(scenario);
    const blob = new Blob([json], { type: "application/json" });
    const objectUrl = URL.createObjectURL(blob);
    const fileName = sanitizeTitleForFilename(scenario.title);
    const anchor = document.createElement("a");

    anchor.href = objectUrl;
    anchor.download = `${fileName || "protection-coordination"}-scenario.json`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(objectUrl);

    setStatusTone("success");
    setStatusMessage("Exported the current scenario as JSON.");
  };

  const handleAcknowledgeSafety = () => {
    window.localStorage.setItem(
      PROTECTION_COORDINATION_ACKNOWLEDGEMENT_STORAGE_KEY,
      "accepted"
    );
    setHasAcknowledgedSafety(true);
    setAcknowledgementChecked(false);
  };

  return (
    <div className="space-y-6">
      {hasAcknowledgedSafety === false ? (
        <SafetyAcknowledgementModal
          accepted={acknowledgementChecked}
          onAcceptedChange={setAcknowledgementChecked}
          onContinue={handleAcknowledgeSafety}
        />
      ) : null}

      <section className="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <h2 className="text-heading text-amber-50">Safety posture</h2>
            <p className="mt-2 text-body text-amber-50/95">
              {PROTECTION_COORDINATION_DISCLAIMER}
            </p>
            <p className="mt-2 text-body-sm text-amber-100/80">
              This MVP uses a fixed-time instantaneous element and a small IEC
              curve-family subset. It is meant for inspection and discussion,
              not field-ready relay settings.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="warning">
              Method: {PROTECTION_COORDINATION_METHOD_VERSION}
            </Badge>
            <Badge>Browser-only</Badge>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-heading text-white">Scenario controls</h2>
            <p className="mt-1 text-sm text-slate-400">
              Start from a preset, tweak the devices, then export the study as
              local JSON.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-md border border-cyan-300/35 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition-colors hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={isPending}
              onClick={() =>
                startTransition(() => {
                  applyScenario(createDefaultScenario());
                })
              }
            >
              Reset workspace
            </button>
            <button
              type="button"
              className="rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
              onClick={handleImportButtonClick}
            >
              Import JSON
            </button>
            <button
              type="button"
              className="rounded-md border border-emerald-300/35 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-100 transition-colors hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40"
              disabled={hasBlockingIssues}
              onClick={handleExportJson}
            >
              Export JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={handleImportFileChange}
            />
          </div>
        </div>

        <div className="mt-5 grid gap-3 xl:grid-cols-3">
          {PROTECTION_COORDINATION_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
              onClick={() => handlePresetApply(preset.id)}
            >
              <p className="text-heading-sm text-white">{preset.name}</p>
              <p className="mt-2 text-sm text-slate-400">
                {preset.description}
              </p>
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-4">
            <label className="flex flex-col gap-1 text-sm text-slate-200">
              <span>Scenario title</span>
              <input
                type="text"
                value={scenario.title}
                className="rounded-md border border-white/12 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-300"
                onChange={(event) =>
                  updateScenario((previousScenario) => ({
                    ...previousScenario,
                    title: event.target.value,
                  }))
                }
              />
            </label>

            <label className="flex flex-col gap-1 text-sm text-slate-200">
              <span>Study current markers (A, comma-separated)</span>
              <input
                type="text"
                value={studyCurrentsText}
                className="rounded-md border border-white/12 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-300"
                onChange={handleStudyCurrentsChange}
              />
              <span className="text-xs text-slate-400">
                Example: 400, 800, 1600, 3200
              </span>
              {studyCurrentsInputError ? (
                <span className="text-xs text-amber-200">
                  {studyCurrentsInputError}
                </span>
              ) : null}
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <label className="flex flex-col gap-1 text-sm text-slate-200">
              <span>Minimum margin target (s)</span>
              <input
                type="number"
                min={0.01}
                step={0.01}
                value={scenario.assumptions.minimumCoordinationMarginSeconds}
                className="rounded-md border border-white/12 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-300"
                onChange={(event) =>
                  updateScenario((previousScenario) => ({
                    ...previousScenario,
                    assumptions: {
                      ...previousScenario.assumptions,
                      minimumCoordinationMarginSeconds: Number(
                        event.target.value
                      ),
                    },
                  }))
                }
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-slate-200">
              <span>Instantaneous clearing time (s)</span>
              <input
                type="number"
                min={0.01}
                step={0.01}
                value={scenario.assumptions.instantaneousTripTimeSeconds}
                className="rounded-md border border-white/12 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-300"
                onChange={(event) =>
                  updateScenario((previousScenario) => ({
                    ...previousScenario,
                    assumptions: {
                      ...previousScenario.assumptions,
                      instantaneousTripTimeSeconds: Number(event.target.value),
                    },
                  }))
                }
              />
            </label>
          </div>
        </div>

        {statusMessage ? (
          <p
            className={`mt-4 text-sm ${
              statusTone === "success"
                ? "text-emerald-200"
                : statusTone === "warning"
                  ? "text-amber-200"
                  : "text-slate-300"
            }`}
          >
            {statusMessage}
          </p>
        ) : null}
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(20rem,1fr)]">
        <div className="space-y-6">
          <TccPlot
            analysis={analysis}
            studyCurrentsAmps={scenario.studyCurrentsAmps}
          />
          <ResultsPanel
            analysis={analysis}
            minimumCoordinationMarginSeconds={
              scenario.assumptions.minimumCoordinationMarginSeconds
            }
          />
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-heading text-white">Devices</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Order these from downstream to upstream so the pair checks
                  mean what you expect them to mean.
                </p>
              </div>
              <button
                type="button"
                className="rounded-md border border-cyan-300/35 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition-colors hover:bg-cyan-400/20"
                onClick={() =>
                  updateScenario((previousScenario) => ({
                    ...previousScenario,
                    devices: [
                      ...previousScenario.devices,
                      createDevice(previousScenario.devices),
                    ],
                  }))
                }
              >
                Add device
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {scenario.devices.map((device, index) => (
                <DeviceEditorCard
                  key={device.id}
                  device={device}
                  index={index}
                  disableRemove={scenario.devices.length <= 1}
                  canMoveDownstream={index > 0}
                  canMoveUpstream={index < scenario.devices.length - 1}
                  onChange={(patch) => updateDevice(device.id, patch)}
                  onMoveDownstream={() => moveDevice(device.id, -1)}
                  onMoveUpstream={() => moveDevice(device.id, 1)}
                  onRemove={() => removeDevice(device.id)}
                />
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <h2 className="text-heading text-white">Assumptions and limits</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>
                Implemented families: IEC Standard Inverse, IEC Very Inverse,
                and IEC Extremely Inverse, using published coefficient forms and
                a configurable time multiplier.
              </p>
              <p>
                The instantaneous element is represented as a fixed
                clearing-time plateau above the selected pickup. That keeps the
                behavior easy to inspect, but it is not a breaker-specific trip
                model.
              </p>
              <p>
                Pairwise coordination checks only compare adjacent enabled
                devices in list order. They do not infer topology, breaker
                interlocks, CT ratios, fuse curves, or directional logic.
              </p>
              <p>
                Curves are plotted through the supported v1 inverse-time domain
                and warnings appear when a study marker or chart extent pushes
                beyond that boundary.
              </p>
              <p>
                Exported JSON embeds the method version and timestamp so a saved
                scenario carries its own context with it.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
