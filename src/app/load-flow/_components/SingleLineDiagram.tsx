import { PointerEvent, useRef } from "react";

import { BusNode, LineEdge } from "@/features/load-flow/state/loadFlowStore";

interface SingleLineDiagramProps {
  buses: BusNode[];
  branches: LineEdge[];
  selectedElementId: string | null;
  selectedElementType: "BUS" | "BRANCH" | null;
  onBusSelect: (busId: string) => void;
  onBusMove: (busId: string, x: number, y: number) => void;
  onBranchSelect: (branchId: string) => void;
}

const BUS_WIDTH = 88;
const BUS_HEIGHT = 42;
const BUS_HALF_WIDTH = BUS_WIDTH / 2;
const BUS_HALF_HEIGHT = BUS_HEIGHT / 2;
const DIAGRAM_PADDING = 48;
const MIN_VIEWBOX_WIDTH = 680;
const MIN_VIEWBOX_HEIGHT = 280;

const getBusCenter = (bus: BusNode) => ({
  x: bus.x,
  y: bus.y,
});

const lineClassName = (isSelected: boolean) =>
  isSelected
    ? "stroke-emerald-300 stroke-[4]"
    : "stroke-slate-300/85 stroke-[3] hover:stroke-emerald-200";

const busClassName = (isSelected: boolean) =>
  isSelected
    ? "fill-emerald-500/30 stroke-emerald-300"
    : "fill-slate-900 stroke-slate-200";

export function SingleLineDiagram({
  buses,
  branches,
  selectedElementId,
  selectedElementType,
  onBusSelect,
  onBusMove,
  onBranchSelect,
}: SingleLineDiagramProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const draggingBusIdRef = useRef<string | null>(null);

  const toSvgPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) {
      return null;
    }

    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    const transform = svg.getScreenCTM();
    if (!transform) {
      return null;
    }

    return point.matrixTransform(transform.inverse());
  };

  const handleBusPointerDown = (
    event: PointerEvent<SVGRectElement>,
    busId: string
  ) => {
    event.preventDefault();
    draggingBusIdRef.current = busId;
    onBusSelect(busId);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleBusPointerMove = (event: PointerEvent<SVGRectElement>) => {
    const draggingBusId = draggingBusIdRef.current;
    if (!draggingBusId) {
      return;
    }

    const point = toSvgPoint(event.clientX, event.clientY);
    if (!point) {
      return;
    }

    onBusMove(draggingBusId, point.x, point.y);
  };

  const handleBusPointerUp = (event: PointerEvent<SVGRectElement>) => {
    draggingBusIdRef.current = null;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const busesById = new Map(buses.map((bus) => [bus.id, bus]));
  const busCentersX = buses.map((bus) => bus.x);
  const busCentersY = buses.map((bus) => bus.y);

  const minBusCenterX = Math.min(...busCentersX);
  const maxBusCenterX = Math.max(...busCentersX);
  const minBusCenterY = Math.min(...busCentersY);
  const maxBusCenterY = Math.max(...busCentersY);

  const contentMinX = minBusCenterX - BUS_HALF_WIDTH;
  const contentMaxX = maxBusCenterX + BUS_HALF_WIDTH;
  const contentMinY = minBusCenterY - BUS_HALF_HEIGHT;
  const contentMaxY = maxBusCenterY + BUS_HALF_HEIGHT;

  const viewBoxX = contentMinX - DIAGRAM_PADDING;
  const viewBoxY = contentMinY - DIAGRAM_PADDING;
  const viewBoxWidth = Math.max(
    contentMaxX - contentMinX + DIAGRAM_PADDING * 2,
    MIN_VIEWBOX_WIDTH
  );
  const viewBoxHeight = Math.max(
    contentMaxY - contentMinY + DIAGRAM_PADDING * 2,
    MIN_VIEWBOX_HEIGHT
  );

  return (
    <div className="mt-3 overflow-x-auto rounded-md border border-slate-700 bg-slate-950/60 p-3">
      {buses.length === 0 ? (
        <p className="text-sm text-gray-300">
          Add buses from the palette to render the one-line diagram.
        </p>
      ) : (
        <svg
          ref={svgRef}
          viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
          role="img"
          aria-label="Single line diagram"
          className="h-[280px] min-w-[680px] w-full"
        >
          <rect
            x={viewBoxX}
            y={viewBoxY}
            width={viewBoxWidth}
            height={viewBoxHeight}
            className="fill-slate-950"
          />

          {branches.map((branch) => {
            const fromBus = busesById.get(branch.fromBusId);
            const toBus = busesById.get(branch.toBusId);

            if (!fromBus || !toBus) {
              return null;
            }

            const from = getBusCenter(fromBus);
            const to = getBusCenter(toBus);
            const isSelected =
              selectedElementType === "BRANCH" &&
              selectedElementId === branch.id;

            return (
              <g key={branch.id}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={`${lineClassName(isSelected)} cursor-pointer transition`}
                  onClick={() => onBranchSelect(branch.id)}
                />
                <text
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2 - 10}
                  textAnchor="middle"
                  className="fill-slate-300 text-[10px]"
                >
                  {branch.id}
                </text>
              </g>
            );
          })}

          {buses.map((bus) => {
            const isSelected =
              selectedElementType === "BUS" && selectedElementId === bus.id;

            return (
              <g
                key={bus.id}
                transform={`translate(${bus.x - BUS_HALF_WIDTH}, ${bus.y - BUS_HALF_HEIGHT})`}
              >
                <rect
                  x={0}
                  y={0}
                  rx={6}
                  width={BUS_WIDTH}
                  height={BUS_HEIGHT}
                  className={`${busClassName(isSelected)} cursor-pointer stroke-2 transition`}
                  onClick={() => onBusSelect(bus.id)}
                  onPointerDown={(event) => handleBusPointerDown(event, bus.id)}
                  onPointerMove={handleBusPointerMove}
                  onPointerUp={handleBusPointerUp}
                />
                <text
                  x={BUS_HALF_WIDTH}
                  y={17}
                  textAnchor="middle"
                  className="fill-white text-[11px] font-medium"
                >
                  {bus.name}
                </text>
                <text
                  x={BUS_HALF_WIDTH}
                  y={32}
                  textAnchor="middle"
                  className="fill-slate-300 text-[10px]"
                >
                  {bus.type}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
