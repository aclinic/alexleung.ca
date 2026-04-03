import { PointerEvent, useMemo, useRef, useState, WheelEvent } from "react";

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
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.2;
const LINE_HOP_RADIUS = 10;

interface BranchSegment {
  branchId: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  orientation: "HORIZONTAL" | "VERTICAL";
}

const getOrthogonalCrossingPoint = (
  firstSegment: BranchSegment,
  secondSegment: BranchSegment
) => {
  if (firstSegment.orientation === secondSegment.orientation) {
    return null;
  }

  const horizontalSegment =
    firstSegment.orientation === "HORIZONTAL" ? firstSegment : secondSegment;
  const verticalSegment =
    firstSegment.orientation === "VERTICAL" ? firstSegment : secondSegment;

  const minHorizontalX = Math.min(horizontalSegment.x1, horizontalSegment.x2);
  const maxHorizontalX = Math.max(horizontalSegment.x1, horizontalSegment.x2);
  const minVerticalY = Math.min(verticalSegment.y1, verticalSegment.y2);
  const maxVerticalY = Math.max(verticalSegment.y1, verticalSegment.y2);
  const crossingX = verticalSegment.x1;
  const crossingY = horizontalSegment.y1;
  const isCrossing =
    crossingX > minHorizontalX &&
    crossingX < maxHorizontalX &&
    crossingY > minVerticalY &&
    crossingY < maxVerticalY;

  if (!isCrossing) {
    return null;
  }

  return { x: crossingX, y: crossingY };
};

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
  const [zoom, setZoom] = useState(1);

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
  const viewBoxCenterX = viewBoxX + viewBoxWidth / 2;
  const viewBoxCenterY = viewBoxY + viewBoxHeight / 2;
  const zoomedViewBoxWidth = viewBoxWidth / zoom;
  const zoomedViewBoxHeight = viewBoxHeight / zoom;
  const zoomedViewBoxX = viewBoxCenterX - zoomedViewBoxWidth / 2;
  const zoomedViewBoxY = viewBoxCenterY - zoomedViewBoxHeight / 2;

  const clampZoom = (nextZoom: number) =>
    Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, nextZoom));

  const handleZoomIn = () => {
    setZoom((previousZoom) => clampZoom(previousZoom + ZOOM_STEP));
  };

  const handleZoomOut = () => {
    setZoom((previousZoom) => clampZoom(previousZoom - ZOOM_STEP));
  };

  const handleWheel = (event: WheelEvent<SVGSVGElement>) => {
    if (!event.ctrlKey) {
      return;
    }

    event.preventDefault();
    setZoom((previousZoom) =>
      clampZoom(previousZoom + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP))
    );
  };

  const branchSegmentsById = useMemo(() => {
    const segmentsById = new Map<string, BranchSegment[]>();

    branches.forEach((branch) => {
      const fromBus = busesById.get(branch.fromBusId);
      const toBus = busesById.get(branch.toBusId);

      if (!fromBus || !toBus) {
        return;
      }

      const from = getBusCenter(fromBus);
      const to = getBusCenter(toBus);
      const elbowX = to.x;
      const elbowY = from.y;

      segmentsById.set(branch.id, [
        {
          branchId: branch.id,
          x1: from.x,
          y1: from.y,
          x2: elbowX,
          y2: elbowY,
          orientation: "HORIZONTAL",
        },
        {
          branchId: branch.id,
          x1: elbowX,
          y1: elbowY,
          x2: to.x,
          y2: to.y,
          orientation: "VERTICAL",
        },
      ]);
    });

    return segmentsById;
  }, [branches, busesById]);

  const lineHopPointsByBranchId = useMemo(() => {
    const hopsByBranchId = new Map<string, Array<{ x: number; y: number }>>();

    branches.forEach((branch, branchIndex) => {
      const branchSegments = branchSegmentsById.get(branch.id) ?? [];
      branches.slice(0, branchIndex).forEach((previousBranch) => {
        const previousSegments =
          branchSegmentsById.get(previousBranch.id) ?? [];

        for (const currentSegment of branchSegments) {
          for (const previousSegment of previousSegments) {
            const crossingPoint = getOrthogonalCrossingPoint(
              currentSegment,
              previousSegment
            );
            if (!crossingPoint) {
              continue;
            }

            const branchHops = hopsByBranchId.get(branch.id) ?? [];
            branchHops.push(crossingPoint);
            hopsByBranchId.set(branch.id, branchHops);
          }
        }
      });
    });

    return hopsByBranchId;
  }, [branchSegmentsById, branches]);

  return (
    <div className="mt-3 overflow-x-auto rounded-md border border-slate-700 bg-slate-950/60 p-3">
      {buses.length === 0 ? (
        <p className="text-sm text-gray-300">
          Add buses from the palette to render the one-line diagram.
        </p>
      ) : (
        <>
          <div className="mb-2 flex items-center gap-2">
            <button
              type="button"
              onClick={handleZoomOut}
              className="rounded border border-slate-600 px-2 py-1 text-xs text-slate-200 hover:border-emerald-300 hover:text-white"
              aria-label="Zoom out"
            >
              −
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              className="rounded border border-slate-600 px-2 py-1 text-xs text-slate-200 hover:border-emerald-300 hover:text-white"
              aria-label="Zoom in"
            >
              +
            </button>
            <span className="text-xs text-slate-400">
              {Math.round(zoom * 100)}% (Ctrl + wheel)
            </span>
          </div>
          <svg
            ref={svgRef}
            viewBox={`${zoomedViewBoxX} ${zoomedViewBoxY} ${zoomedViewBoxWidth} ${zoomedViewBoxHeight}`}
            role="img"
            aria-label="Single line diagram"
            className="h-[360px] min-w-[980px] w-full"
            onWheel={handleWheel}
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
              const elbowX = to.x;
              const elbowY = from.y;
              const isSelected =
                selectedElementType === "BRANCH" &&
                selectedElementId === branch.id;
              const lineHops = lineHopPointsByBranchId.get(branch.id) ?? [];

              return (
                <g key={branch.id}>
                  <polyline
                    points={`${from.x},${from.y} ${elbowX},${elbowY} ${to.x},${to.y}`}
                    fill="none"
                    className={`${lineClassName(isSelected)} cursor-pointer transition`}
                    onClick={() => onBranchSelect(branch.id)}
                  />
                  <text
                    x={elbowX}
                    y={elbowY - 10}
                    textAnchor="middle"
                    className="fill-slate-300 text-[10px]"
                  >
                    {branch.id}
                  </text>
                  {lineHops.map((lineHop, index) => (
                    <g key={`${branch.id}-hop-${index}`}>
                      <rect
                        x={lineHop.x - LINE_HOP_RADIUS}
                        y={lineHop.y - LINE_HOP_RADIUS}
                        width={LINE_HOP_RADIUS * 2}
                        height={LINE_HOP_RADIUS * 2}
                        className="fill-slate-950"
                      />
                      <path
                        d={`M ${lineHop.x} ${lineHop.y - LINE_HOP_RADIUS} A ${LINE_HOP_RADIUS} ${LINE_HOP_RADIUS} 0 0 1 ${lineHop.x} ${lineHop.y + LINE_HOP_RADIUS}`}
                        fill="none"
                        className={`${lineClassName(isSelected)} stroke-[3]`}
                      />
                    </g>
                  ))}
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
                    onPointerDown={(event) =>
                      handleBusPointerDown(event, bus.id)
                    }
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
        </>
      )}
    </div>
  );
}
