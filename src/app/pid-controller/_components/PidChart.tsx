import { SimulationSample } from "@/features/pid-simulator/types";

type PidChartProps = {
  samples: SimulationSample[];
};

const WIDTH = 880;
const HEIGHT = 320;
const MARGIN = { top: 20, right: 20, bottom: 30, left: 48 };

const toPath = (
  samples: SimulationSample[],
  readValue: (sample: SimulationSample) => number,
  scaleX: (value: number) => number,
  scaleY: (value: number) => number
): string =>
  samples
    .map((sample, index) => {
      const prefix = index === 0 ? "M" : "L";
      return `${prefix}${scaleX(sample.timeSeconds)} ${scaleY(readValue(sample))}`;
    })
    .join(" ");

export function PidChart({ samples }: PidChartProps) {
  if (samples.length < 2) {
    return (
      <figure className="rounded-lg border border-gray-700 bg-black/40 p-3">
        <figcaption
          className="text-body-sm mb-3 text-gray-200"
          role="img"
          aria-label="PID simulator response chart"
        >
          Response over time (collecting samples...)
        </figcaption>
      </figure>
    );
  }

  const minX = samples[0].timeSeconds;
  const maxX = samples.at(-1)?.timeSeconds ?? minX + 1;

  const values = samples.flatMap((sample) => [
    sample.setpoint,
    sample.processVariable,
    sample.controllerOutput,
    sample.error,
  ]);
  const minY = Math.min(...values);
  const maxY = Math.max(...values);
  const yPadding = Math.max((maxY - minY) * 0.1, 0.2);

  const xSpan = Math.max(maxX - minX, 1);
  const ySpan = Math.max(maxY - minY, 0.1) + yPadding * 2;

  const chartWidth = WIDTH - MARGIN.left - MARGIN.right;
  const chartHeight = HEIGHT - MARGIN.top - MARGIN.bottom;

  const scaleX = (value: number): number =>
    MARGIN.left + ((value - minX) / xSpan) * chartWidth;
  const scaleY = (value: number): number =>
    MARGIN.top + ((maxY + yPadding - value) / ySpan) * chartHeight;

  const setpointPath = toPath(
    samples,
    (sample) => sample.setpoint,
    scaleX,
    scaleY
  );
  const pvPath = toPath(
    samples,
    (sample) => sample.processVariable,
    scaleX,
    scaleY
  );
  const outputPath = toPath(
    samples,
    (sample) => sample.controllerOutput,
    scaleX,
    scaleY
  );
  const errorPath = toPath(samples, (sample) => sample.error, scaleX, scaleY);

  return (
    <figure className="rounded-lg border border-gray-700 bg-black/40 p-3">
      <figcaption className="text-body-sm mb-3 text-gray-200">
        Response over time (fixed-step simulation)
      </figcaption>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label="PID simulator response chart"
      >
        <line
          x1={MARGIN.left}
          y1={MARGIN.top + chartHeight}
          x2={MARGIN.left + chartWidth}
          y2={MARGIN.top + chartHeight}
          stroke="#4b5563"
          strokeWidth={1}
        />
        <line
          x1={MARGIN.left}
          y1={MARGIN.top}
          x2={MARGIN.left}
          y2={MARGIN.top + chartHeight}
          stroke="#4b5563"
          strokeWidth={1}
        />

        <path d={setpointPath} stroke="#f59e0b" strokeWidth={2} fill="none" />
        <path d={pvPath} stroke="#22d3ee" strokeWidth={2} fill="none" />
        <path d={outputPath} stroke="#a78bfa" strokeWidth={2} fill="none" />
        <path
          d={errorPath}
          stroke="#fb7185"
          strokeWidth={1.5}
          strokeDasharray="5 3"
          fill="none"
        />
      </svg>
      <div className="text-body-sm mt-3 grid grid-cols-2 gap-2 text-gray-300 md:grid-cols-4">
        <span>Setpoint</span>
        <span>Process variable</span>
        <span>Controller output</span>
        <span>Error</span>
      </div>
    </figure>
  );
}
