"use client";

import { useMemo } from "react";

import {
  getHeatmapColor,
  normalizePoint,
  sampleSurface,
} from "@/features/optimizer-lab/sampling";
import {
  RunSnapshot,
  SurfaceDefinition,
  Vector2,
} from "@/features/optimizer-lab/types";

type LearningDynamicsPlotProps = {
  surface: SurfaceDefinition;
  runs: RunSnapshot[];
  startPoint: Vector2;
  onStartPointChange: (point: Vector2) => void;
};

function clamp01(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

function denormalizeFromPlot(
  surface: SurfaceDefinition,
  normalizedPoint: Vector2
): Vector2 {
  return {
    x:
      surface.domain.xMin +
      normalizedPoint.x * (surface.domain.xMax - surface.domain.xMin),
    y:
      surface.domain.yMax -
      normalizedPoint.y * (surface.domain.yMax - surface.domain.yMin),
  };
}

export function LearningDynamicsPlot({
  surface,
  runs,
  startPoint,
  onStartPointChange,
}: LearningDynamicsPlotProps) {
  const sample = useMemo(() => sampleSurface(surface), [surface]);
  const isSaddleSurface = surface.id === "saddle";
  const originX =
    surface.domain.xMin <= 0 && surface.domain.xMax >= 0
      ? normalizePoint(surface, { x: 0, y: 0 }).x
      : null;
  const originY =
    surface.domain.yMin <= 0 && surface.domain.yMax >= 0
      ? normalizePoint(surface, { x: 0, y: 0 }).y
      : null;
  const startHandle = normalizePoint(surface, startPoint);

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/70 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-heading text-white">Loss surface</h2>
          <p className="mt-1 text-sm text-slate-400">
            Click anywhere on the plot to move the shared start point.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
          {runs.map((run) => (
            <div key={run.id} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: run.color }}
              />
              <span>{run.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-cyan-300/10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.15),_rgba(2,6,23,0.92)_62%)]">
        <svg
          viewBox="0 0 1 1"
          role="img"
          aria-label={`${surface.name} loss surface`}
          className="block aspect-square h-auto w-full"
          onClick={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            const normalizedPoint = {
              x: clamp01((event.clientX - bounds.left) / bounds.width),
              y: clamp01((event.clientY - bounds.top) / bounds.height),
            };

            onStartPointChange(denormalizeFromPlot(surface, normalizedPoint));
          }}
        >
          <rect x={0} y={0} width={1} height={1} fill="#020617" />

          {sample.cells.map((cell) => (
            <rect
              key={`${cell.x}-${cell.y}`}
              x={cell.x}
              y={cell.y}
              width={cell.width + 0.0005}
              height={cell.height + 0.0005}
              fill={getHeatmapColor(
                cell.value,
                sample.minValue,
                sample.maxValue
              )}
              opacity={0.94}
            />
          ))}

          {sample.contours.map((segment, index) => (
            <line
              key={`${segment.level}-${index}`}
              x1={segment.from.x}
              y1={segment.from.y}
              x2={segment.to.x}
              y2={segment.to.y}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth={0.002}
            />
          ))}

          {originX !== null ? (
            <line
              x1={originX}
              y1={0}
              x2={originX}
              y2={1}
              stroke="rgba(255,255,255,0.15)"
              strokeDasharray="0.01 0.01"
              strokeWidth={0.002}
            />
          ) : null}
          {originY !== null ? (
            <line
              x1={0}
              y1={originY}
              x2={1}
              y2={originY}
              stroke="rgba(255,255,255,0.15)"
              strokeDasharray="0.01 0.01"
              strokeWidth={0.002}
            />
          ) : null}

          {isSaddleSurface && originY !== null ? (
            <rect
              x={0}
              y={Math.max(originY - 0.045, 0)}
              width={1}
              height={0.09}
              fill="rgba(34,211,238,0.12)"
            />
          ) : null}

          {isSaddleSurface && originY !== null ? (
            <line
              x1={0}
              y1={originY}
              x2={1}
              y2={originY}
              stroke="rgba(34,211,238,0.9)"
              strokeWidth={0.004}
            />
          ) : null}

          {isSaddleSurface && originX !== null ? (
            <line
              x1={originX}
              y1={0}
              x2={originX}
              y2={1}
              stroke="rgba(251,113,133,0.85)"
              strokeWidth={0.004}
            />
          ) : null}

          {isSaddleSurface && originY !== null ? (
            <text
              x={0.03}
              y={Math.max(originY - 0.02, 0.04)}
              fill="rgba(165,243,252,0.95)"
              fontSize={0.028}
              fontWeight={700}
            >
              stable manifold y = 0
            </text>
          ) : null}

          {isSaddleSurface && originX !== null ? (
            <text
              x={Math.min(originX + 0.02, 0.78)}
              y={0.06}
              fill="rgba(254,205,211,0.95)"
              fontSize={0.028}
              fontWeight={700}
            >
              unstable direction
            </text>
          ) : null}

          {runs.map((run) => {
            const trailPoints = run.trail
              .map((point) => {
                const normalized = normalizePoint(surface, point);
                return `${normalized.x},${normalized.y}`;
              })
              .join(" ");
            const currentPoint = normalizePoint(surface, run.position);

            return (
              <g key={run.id}>
                <polyline
                  points={trailPoints}
                  fill="none"
                  stroke={run.color}
                  strokeWidth={0.008}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx={currentPoint.x}
                  cy={currentPoint.y}
                  r={0.016}
                  fill={run.color}
                  stroke="rgba(2,6,23,0.9)"
                  strokeWidth={0.006}
                />
                <text
                  x={Math.min(currentPoint.x + 0.02, 0.94)}
                  y={Math.max(currentPoint.y - 0.02, 0.05)}
                  fill="white"
                  fontSize={0.04}
                  fontWeight={700}
                >
                  {run.label.replace("Run ", "")}
                </text>
              </g>
            );
          })}

          <circle
            cx={startHandle.x}
            cy={startHandle.y}
            r={0.012}
            fill="rgba(255,255,255,0)"
            stroke="rgba(255,255,255,0.85)"
            strokeDasharray="0.01 0.01"
            strokeWidth={0.004}
          />
        </svg>
      </div>
    </section>
  );
}
