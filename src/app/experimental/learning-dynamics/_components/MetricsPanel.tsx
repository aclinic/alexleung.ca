"use client";

import { RunSnapshot } from "@/features/optimizer-lab/types";

function formatMetric(value: number, digits = 3): string {
  if (!Number.isFinite(value)) {
    return "NaN";
  }

  return value.toFixed(digits);
}

function statusLabel(status: RunSnapshot["status"]): string {
  switch (status) {
    case "optimizing":
      return "Exploring";
    case "converged":
      return "Converged";
    case "diverging":
      return "Diverging";
  }
}

function statusClasses(status: RunSnapshot["status"]): string {
  switch (status) {
    case "optimizing":
      return "border-cyan-400/40 bg-cyan-500/10 text-cyan-200";
    case "converged":
      return "border-emerald-400/40 bg-emerald-500/10 text-emerald-200";
    case "diverging":
      return "border-rose-400/40 bg-rose-500/10 text-rose-200";
  }
}

type MetricsPanelProps = {
  runs: RunSnapshot[];
};

export function MetricsPanel({ runs }: MetricsPanelProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-heading text-white">Run metrics</h2>
          <p className="mt-1 text-sm text-slate-400">
            Compare how each optimizer is moving in the current run.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        {runs.map((run) => (
          <article
            key={run.id}
            className="rounded-xl border border-white/10 bg-slate-900/70 p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: run.color }}
                />
                <div>
                  <h3 className="text-heading-sm text-white">{run.label}</h3>
                  <p className="text-sm text-slate-400">
                    {run.optimizerId.toUpperCase()}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${statusClasses(run.status)}`}
              >
                {statusLabel(run.status)}
              </span>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-200">
              <div className="rounded-lg border border-white/8 bg-white/4 p-3">
                <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Current step
                </dt>
                <dd
                  className="mt-1 text-lg font-semibold text-white"
                  data-testid={`${run.id}-step`}
                >
                  {run.step}
                </dd>
              </div>
              <div className="rounded-lg border border-white/8 bg-white/4 p-3">
                <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Loss
                </dt>
                <dd className="mt-1 text-lg font-semibold text-white">
                  {formatMetric(run.loss, 4)}
                </dd>
              </div>
              <div className="rounded-lg border border-white/8 bg-white/4 p-3">
                <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Position
                </dt>
                <dd
                  className="mt-1 text-white"
                  data-testid={`${run.id}-position`}
                >
                  ({formatMetric(run.position.x)},{" "}
                  {formatMetric(run.position.y)})
                </dd>
              </div>
              <div className="rounded-lg border border-white/8 bg-white/4 p-3">
                <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">
                  Gradient magnitude
                </dt>
                <dd className="mt-1 text-white">
                  {formatMetric(run.gradientMagnitude, 4)}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
