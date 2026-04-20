"use client";

import { Badge } from "@/components/Badge";
import {
  CoordinationAnalysis,
  StudyPointResult,
} from "@/features/protection-coordination/model/types";

type ResultsPanelProps = {
  analysis: CoordinationAnalysis;
  minimumCoordinationMarginSeconds: number;
};

function formatCurrent(currentAmps: number): string {
  if (currentAmps >= 1000) {
    return `${(currentAmps / 1000).toFixed(currentAmps >= 10000 ? 0 : 1)} kA`;
  }

  return `${currentAmps.toFixed(0)} A`;
}

function formatSeconds(value: number | null): string {
  if (value === null || !Number.isFinite(value)) {
    return "—";
  }

  if (Math.abs(value) >= 1) {
    return `${value.toFixed(2)} s`;
  }

  return `${value.toFixed(3)} s`;
}

function studyPointTone(
  result: StudyPointResult
): "info" | "success" | "warning" {
  switch (result.status) {
    case "ok":
      return "success";
    case "warning":
      return "warning";
    case "out-of-domain":
    case "upstream-not-active":
    case "downstream-not-active":
      return "info";
  }
}

function studyPointLabel(result: StudyPointResult): string {
  switch (result.status) {
    case "ok":
      return "OK";
    case "warning":
      return "Warning";
    case "out-of-domain":
      return "Outside v1 domain";
    case "upstream-not-active":
      return "Upstream inactive";
    case "downstream-not-active":
      return "Downstream inactive";
  }
}

export function ResultsPanel({
  analysis,
  minimumCoordinationMarginSeconds,
}: ResultsPanelProps) {
  const warningCount = analysis.findings.filter(
    (finding) => finding.severity === "warning"
  ).length;

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-heading text-white">Results and warnings</h2>
          <p className="mt-1 text-sm text-slate-400">
            Adjacent enabled devices are compared in list order, from downstream
            to upstream.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone={warningCount > 0 ? "warning" : "success"}>
            {warningCount > 0
              ? `${warningCount} active warning${warningCount === 1 ? "" : "s"}`
              : "No active warnings"}
          </Badge>
          <Badge>
            Margin target: {minimumCoordinationMarginSeconds.toFixed(2)} s
          </Badge>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {analysis.findings.length > 0 ? (
          analysis.findings.map((finding) => (
            <article
              key={finding.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  tone={finding.severity === "warning" ? "warning" : "info"}
                >
                  {finding.kind.replace(/-/g, " ")}
                </Badge>
                <h3 className="text-heading-sm text-white">{finding.title}</h3>
              </div>
              <p className="mt-2 text-sm text-slate-300">{finding.detail}</p>
            </article>
          ))
        ) : (
          <article className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-4">
            <h3 className="text-heading-sm text-emerald-100">
              No obvious conflicts surfaced in the current study window
            </h3>
            <p className="mt-2 text-sm text-emerald-50/90">
              That does not make the setup field-ready. It only means this v1
              model did not detect a likely issue inside the configured
              currents, tolerances, and curve-family assumptions.
            </p>
          </article>
        )}
      </div>

      <div className="mt-6 space-y-4">
        {analysis.pairSummaries.map((pairSummary) => (
          <article
            key={`${pairSummary.downstreamDeviceId}-${pairSummary.upstreamDeviceId}`}
            className="rounded-xl border border-white/10 bg-slate-900/70 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-heading-sm text-white">
                  {pairSummary.downstreamLabel} → {pairSummary.upstreamLabel}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Worst effective margin:{" "}
                  {formatSeconds(pairSummary.worstEffectiveMarginSeconds)}
                </p>
              </div>
              <Badge
                tone={pairSummary.windows.length > 0 ? "warning" : "success"}
              >
                {pairSummary.windows.length > 0
                  ? `${pairSummary.windows.length} conflict window${
                      pairSummary.windows.length === 1 ? "" : "s"
                    }`
                  : "No window conflict"}
              </Badge>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {pairSummary.studyPointResults.map((result) => (
                <div
                  key={`${pairSummary.downstreamDeviceId}-${pairSummary.upstreamDeviceId}-${result.currentAmps}`}
                  className="rounded-lg border border-white/8 bg-white/4 p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-white">
                      {formatCurrent(result.currentAmps)}
                    </p>
                    <Badge tone={studyPointTone(result)}>
                      {studyPointLabel(result)}
                    </Badge>
                  </div>
                  <dl className="mt-3 space-y-1 text-sm text-slate-300">
                    <div className="flex items-center justify-between gap-3">
                      <dt>Downstream time</dt>
                      <dd>{formatSeconds(result.downstreamTimeSeconds)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt>Upstream time</dt>
                      <dd>{formatSeconds(result.upstreamTimeSeconds)}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <dt>Worst-case margin</dt>
                      <dd>{formatSeconds(result.effectiveMarginSeconds)}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-xs text-slate-400">{result.note}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
