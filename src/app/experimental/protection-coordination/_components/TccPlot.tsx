"use client";

import { CoordinationAnalysis } from "@/features/protection-coordination/model/types";

type TccPlotProps = {
  analysis: CoordinationAnalysis;
  studyCurrentsAmps: number[];
};

const VIEWBOX_WIDTH = 900;
const VIEWBOX_HEIGHT = 560;
const MARGIN = {
  top: 24,
  right: 24,
  bottom: 58,
  left: 78,
};

function formatCurrentLabel(currentAmps: number): string {
  if (currentAmps >= 1000) {
    return `${(currentAmps / 1000).toFixed(currentAmps >= 10000 ? 0 : 1)} kA`;
  }

  return `${currentAmps.toFixed(0)} A`;
}

function formatTimeLabel(timeSeconds: number): string {
  if (timeSeconds >= 60) {
    return `${(timeSeconds / 60).toFixed(1)} min`;
  }

  if (timeSeconds >= 1) {
    return `${timeSeconds.toFixed(1)} s`;
  }

  return `${timeSeconds.toFixed(2)} s`;
}

function createDecadeTicks(
  minimumValue: number,
  maximumValue: number
): number[] {
  const ticks: number[] = [];
  let currentValue = 10 ** Math.floor(Math.log10(minimumValue));

  while (currentValue <= maximumValue) {
    ticks.push(currentValue);
    currentValue *= 10;
  }

  return ticks;
}

function scaleLogValue(
  value: number,
  minimumValue: number,
  maximumValue: number,
  outputStart: number,
  outputEnd: number
): number {
  const fraction =
    (Math.log10(value) - Math.log10(minimumValue)) /
    (Math.log10(maximumValue) - Math.log10(minimumValue));

  return outputStart + fraction * (outputEnd - outputStart);
}

function buildPath(
  points: ReadonlyArray<{ currentAmps: number; timeSeconds: number }>,
  currentMinAmps: number,
  currentMaxAmps: number,
  timeMinSeconds: number,
  timeMaxSeconds: number
): string {
  return points
    .map((point, index) => {
      const x = scaleLogValue(
        point.currentAmps,
        currentMinAmps,
        currentMaxAmps,
        MARGIN.left,
        VIEWBOX_WIDTH - MARGIN.right
      );
      const y = scaleLogValue(
        point.timeSeconds,
        timeMinSeconds,
        timeMaxSeconds,
        VIEWBOX_HEIGHT - MARGIN.bottom,
        MARGIN.top
      );

      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

export function TccPlot({ analysis, studyCurrentsAmps }: TccPlotProps) {
  const { chartDomain, plotSeries } = analysis;
  const plotWidth = VIEWBOX_WIDTH - MARGIN.left - MARGIN.right;
  const plotHeight = VIEWBOX_HEIGHT - MARGIN.top - MARGIN.bottom;
  const currentTicks = createDecadeTicks(
    chartDomain.currentMinAmps,
    chartDomain.currentMaxAmps
  );
  const timeTicks = createDecadeTicks(
    chartDomain.timeMinSeconds,
    chartDomain.timeMaxSeconds
  );

  return (
    <figure className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-heading text-white">Time-current plot</h2>
          <p className="mt-1 text-sm text-slate-400">
            Log-log axes with study-current markers and one curve per enabled
            device.
          </p>
        </div>
        <p className="max-w-sm text-sm text-slate-400">
          Curves only render through the v1 supported inverse-time domain. If a
          study current lands beyond that range, the warnings panel will call it
          out explicitly.
        </p>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-white/8 bg-slate-950/80">
        <svg
          role="img"
          aria-label="Protection coordination time-current curve plot"
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          className="block aspect-[16/10] w-full"
        >
          <rect
            x={MARGIN.left}
            y={MARGIN.top}
            width={plotWidth}
            height={plotHeight}
            fill="rgba(15, 23, 42, 0.75)"
          />

          {currentTicks.map((currentAmps) => {
            const x = scaleLogValue(
              currentAmps,
              chartDomain.currentMinAmps,
              chartDomain.currentMaxAmps,
              MARGIN.left,
              VIEWBOX_WIDTH - MARGIN.right
            );

            return (
              <g key={`current-tick-${currentAmps}`}>
                <line
                  x1={x}
                  x2={x}
                  y1={MARGIN.top}
                  y2={VIEWBOX_HEIGHT - MARGIN.bottom}
                  stroke="rgba(148, 163, 184, 0.18)"
                  strokeWidth={1}
                />
                <text
                  x={x}
                  y={VIEWBOX_HEIGHT - MARGIN.bottom + 22}
                  fill="rgba(226, 232, 240, 0.78)"
                  fontSize="12"
                  textAnchor="middle"
                >
                  {formatCurrentLabel(currentAmps)}
                </text>
              </g>
            );
          })}

          {timeTicks.map((timeSeconds) => {
            const y = scaleLogValue(
              timeSeconds,
              chartDomain.timeMinSeconds,
              chartDomain.timeMaxSeconds,
              VIEWBOX_HEIGHT - MARGIN.bottom,
              MARGIN.top
            );

            return (
              <g key={`time-tick-${timeSeconds}`}>
                <line
                  x1={MARGIN.left}
                  x2={VIEWBOX_WIDTH - MARGIN.right}
                  y1={y}
                  y2={y}
                  stroke="rgba(148, 163, 184, 0.18)"
                  strokeWidth={1}
                />
                <text
                  x={MARGIN.left - 12}
                  y={y + 4}
                  fill="rgba(226, 232, 240, 0.78)"
                  fontSize="12"
                  textAnchor="end"
                >
                  {formatTimeLabel(timeSeconds)}
                </text>
              </g>
            );
          })}

          {studyCurrentsAmps.map((currentAmps) => {
            if (
              currentAmps < chartDomain.currentMinAmps ||
              currentAmps > chartDomain.currentMaxAmps
            ) {
              return null;
            }

            const x = scaleLogValue(
              currentAmps,
              chartDomain.currentMinAmps,
              chartDomain.currentMaxAmps,
              MARGIN.left,
              VIEWBOX_WIDTH - MARGIN.right
            );

            return (
              <g key={`study-current-${currentAmps}`}>
                <line
                  x1={x}
                  x2={x}
                  y1={MARGIN.top}
                  y2={VIEWBOX_HEIGHT - MARGIN.bottom}
                  stroke="rgba(250, 204, 21, 0.65)"
                  strokeWidth={1.25}
                  strokeDasharray="5 5"
                />
                <text
                  x={x}
                  y={MARGIN.top + 14}
                  fill="rgba(254, 240, 138, 0.88)"
                  fontSize="11"
                  textAnchor="middle"
                >
                  {formatCurrentLabel(currentAmps)}
                </text>
              </g>
            );
          })}

          {plotSeries.map((series) => {
            if (series.points.length < 2) {
              return null;
            }

            return (
              <path
                key={series.deviceId}
                data-testid={`tcc-curve-${series.deviceId}`}
                d={buildPath(
                  series.points,
                  chartDomain.currentMinAmps,
                  chartDomain.currentMaxAmps,
                  chartDomain.timeMinSeconds,
                  chartDomain.timeMaxSeconds
                )}
                fill="none"
                stroke={series.color}
                strokeWidth={2.6}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            );
          })}

          <line
            x1={MARGIN.left}
            x2={VIEWBOX_WIDTH - MARGIN.right}
            y1={VIEWBOX_HEIGHT - MARGIN.bottom}
            y2={VIEWBOX_HEIGHT - MARGIN.bottom}
            stroke="rgba(226, 232, 240, 0.9)"
            strokeWidth={1.5}
          />
          <line
            x1={MARGIN.left}
            x2={MARGIN.left}
            y1={MARGIN.top}
            y2={VIEWBOX_HEIGHT - MARGIN.bottom}
            stroke="rgba(226, 232, 240, 0.9)"
            strokeWidth={1.5}
          />

          <text
            x={MARGIN.left + plotWidth / 2}
            y={VIEWBOX_HEIGHT - 12}
            fill="white"
            fontSize="13"
            textAnchor="middle"
          >
            Fault current (A)
          </text>
          <text
            x={18}
            y={MARGIN.top + plotHeight / 2}
            fill="white"
            fontSize="13"
            textAnchor="middle"
            transform={`rotate(-90 18 ${MARGIN.top + plotHeight / 2})`}
          >
            Operating time (s)
          </text>
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {plotSeries.map((series) => (
          <div
            key={series.deviceId}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200"
          >
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: series.color }}
            />
            <span>{series.label}</span>
            <span className="text-slate-400">{series.familyLabel}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}
