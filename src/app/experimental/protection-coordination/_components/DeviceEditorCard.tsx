"use client";

import { CURVE_FAMILIES } from "@/features/protection-coordination/model/curveFamilies";
import { ProtectionDevice } from "@/features/protection-coordination/model/types";

type NumberFieldProps = {
  label: string;
  value: number;
  step: number;
  min?: number;
  onChange: (value: number) => void;
};

type DeviceEditorCardProps = {
  device: ProtectionDevice;
  index: number;
  disableRemove: boolean;
  canMoveDownstream: boolean;
  canMoveUpstream: boolean;
  onChange: (patch: Partial<ProtectionDevice>) => void;
  onMoveDownstream: () => void;
  onMoveUpstream: () => void;
  onRemove: () => void;
};

function NumberField({ label, value, step, min, onChange }: NumberFieldProps) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-200">
      <span>{label}</span>
      <input
        type="number"
        value={value}
        step={step}
        min={min}
        className="rounded-md border border-white/12 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-300"
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

export function DeviceEditorCard({
  device,
  index,
  disableRemove,
  canMoveDownstream,
  canMoveUpstream,
  onChange,
  onMoveDownstream,
  onMoveUpstream,
  onRemove,
}: DeviceEditorCardProps) {
  const selectedFamily =
    CURVE_FAMILIES.find((family) => family.id === device.curveFamilyId) ??
    CURVE_FAMILIES[0];

  return (
    <section className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="mt-1 h-3 w-3 rounded-full"
            style={{ backgroundColor: device.color }}
          />
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
              Device {index + 1}
            </p>
            <h3 className="text-heading-sm text-white">{device.label}</h3>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-200">
          <input
            type="checkbox"
            checked={device.enabled}
            onChange={(event) => onChange({ enabled: event.target.checked })}
          />
          Enabled
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-md border border-white/15 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!canMoveDownstream}
          onClick={onMoveDownstream}
        >
          Move downstream
        </button>
        <button
          type="button"
          className="rounded-md border border-white/15 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={!canMoveUpstream}
          onClick={onMoveUpstream}
        >
          Move upstream
        </button>
        <button
          type="button"
          className="rounded-md border border-rose-300/30 px-3 py-2 text-xs font-medium text-rose-200 transition-colors hover:bg-rose-400/10 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={disableRemove}
          onClick={onRemove}
        >
          Remove
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <label className="flex flex-col gap-1 text-sm text-slate-200">
          <span>Device label</span>
          <input
            type="text"
            value={device.label}
            className="rounded-md border border-white/12 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-300"
            onChange={(event) => onChange({ label: event.target.value })}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-200">
          <span>Curve family</span>
          <select
            value={device.curveFamilyId}
            className="rounded-md border border-white/12 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-300"
            onChange={(event) =>
              onChange({
                curveFamilyId: event.target
                  .value as ProtectionDevice["curveFamilyId"],
              })
            }
          >
            {CURVE_FAMILIES.map((family) => (
              <option key={family.id} value={family.id}>
                {family.label}
              </option>
            ))}
          </select>
          <span className="text-xs text-slate-400">
            {selectedFamily.description}
          </span>
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            label="Pickup current (A)"
            value={device.pickupCurrentAmps}
            step={5}
            min={1}
            onChange={(pickupCurrentAmps) => onChange({ pickupCurrentAmps })}
          />
          <NumberField
            label="Time multiplier"
            value={device.timeMultiplier}
            step={0.01}
            min={0.01}
            onChange={(timeMultiplier) => onChange({ timeMultiplier })}
          />
          <label className="flex flex-col gap-1 text-sm text-slate-200">
            <span>Instantaneous pickup (A)</span>
            <input
              type="number"
              value={device.instantaneousPickupAmps ?? ""}
              min={1}
              step={25}
              className="rounded-md border border-white/12 bg-slate-950/80 px-3 py-2 text-sm text-white outline-none transition-colors focus:border-cyan-300"
              onChange={(event) => {
                const nextValue = event.target.value.trim();

                onChange({
                  instantaneousPickupAmps:
                    nextValue.length === 0 ? null : Number(nextValue),
                });
              }}
            />
            <span className="text-xs text-slate-400">
              Blank disables the instantaneous element for this device.
            </span>
          </label>
          <NumberField
            label="Time tolerance (%)"
            value={device.timeTolerancePercent}
            step={1}
            min={0}
            onChange={(timeTolerancePercent) =>
              onChange({ timeTolerancePercent })
            }
          />
        </div>
      </div>
    </section>
  );
}
