import {
  SurfaceDefinition,
  SurfaceSample,
  Vector2,
} from "@/features/optimizer-lab/types";

const EDGE_CASES: Record<number, Array<[number, number]>> = {
  0: [],
  1: [[3, 0]],
  2: [[0, 1]],
  3: [[3, 1]],
  4: [[1, 2]],
  5: [
    [3, 0],
    [1, 2],
  ],
  6: [[0, 2]],
  7: [[3, 2]],
  8: [[2, 3]],
  9: [[0, 2]],
  10: [
    [0, 1],
    [2, 3],
  ],
  11: [[1, 2]],
  12: [[1, 3]],
  13: [[0, 1]],
  14: [[3, 0]],
  15: [],
};

type Corner = {
  position: Vector2;
  value: number;
};

function interpolateEdge(
  threshold: number,
  start: Corner,
  end: Corner
): Vector2 {
  if (Math.abs(end.value - start.value) < 1e-12) {
    return {
      x: (start.position.x + end.position.x) / 2,
      y: (start.position.y + end.position.y) / 2,
    };
  }

  const t = (threshold - start.value) / (end.value - start.value);

  return {
    x: start.position.x + (end.position.x - start.position.x) * t,
    y: start.position.y + (end.position.y - start.position.y) * t,
  };
}

export function normalizePoint(
  surface: SurfaceDefinition,
  point: Vector2
): Vector2 {
  const xRange = surface.domain.xMax - surface.domain.xMin;
  const yRange = surface.domain.yMax - surface.domain.yMin;

  return {
    x: (point.x - surface.domain.xMin) / xRange,
    y: (surface.domain.yMax - point.y) / yRange,
  };
}

function denormalizePoint(surface: SurfaceDefinition, point: Vector2): Vector2 {
  const xRange = surface.domain.xMax - surface.domain.xMin;
  const yRange = surface.domain.yMax - surface.domain.yMin;

  return {
    x: surface.domain.xMin + point.x * xRange,
    y: surface.domain.yMax - point.y * yRange,
  };
}

export function getHeatmapColor(
  value: number,
  minValue: number,
  maxValue: number
): string {
  if (maxValue - minValue <= 1e-12) {
    return "hsl(198 58% 38%)";
  }

  const normalized =
    Math.log1p(value - minValue) / Math.log1p(maxValue - minValue);
  const hue = 212 - normalized * 162;
  const saturation = 76 - normalized * 8;
  const lightness = 18 + normalized * 47;

  return `hsl(${hue.toFixed(0)} ${saturation.toFixed(0)}% ${lightness.toFixed(0)}%)`;
}

export function sampleSurface(
  surface: SurfaceDefinition,
  resolution = 34,
  contourLevels = 7
): SurfaceSample {
  const grid = Array.from({ length: resolution + 1 }, (_, row) =>
    Array.from({ length: resolution + 1 }, (_, column) => {
      const point = denormalizePoint(surface, {
        x: column / resolution,
        y: row / resolution,
      });

      return {
        normalized: {
          x: column / resolution,
          y: row / resolution,
        },
        value: surface.evaluate(point),
      };
    })
  );
  const values = grid.flat().map((entry) => entry.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const cellSize = 1 / resolution;
  const cells = Array.from({ length: resolution }, (_, row) =>
    Array.from({ length: resolution }, (_, column) => {
      const centerPoint = denormalizePoint(surface, {
        x: (column + 0.5) / resolution,
        y: (row + 0.5) / resolution,
      });

      return {
        x: column / resolution,
        y: row / resolution,
        width: cellSize,
        height: cellSize,
        value: surface.evaluate(centerPoint),
      };
    })
  ).flat();
  const contourThresholds = Array.from(
    { length: contourLevels },
    (_, index) =>
      minValue + ((index + 1) / (contourLevels + 1)) * (maxValue - minValue)
  );
  const contours = contourThresholds.flatMap((threshold, level) => {
    return Array.from({ length: resolution }, (_, row) =>
      Array.from({ length: resolution }, (_, column) => {
        const topLeft = grid[row][column];
        const topRight = grid[row][column + 1];
        const bottomRight = grid[row + 1][column + 1];
        const bottomLeft = grid[row + 1][column];
        const caseIndex =
          (topLeft.value >= threshold ? 1 : 0) +
          (topRight.value >= threshold ? 2 : 0) +
          (bottomRight.value >= threshold ? 4 : 0) +
          (bottomLeft.value >= threshold ? 8 : 0);
        const corners: Record<number, [Corner, Corner]> = {
          0: [
            {
              position: topLeft.normalized,
              value: topLeft.value,
            },
            {
              position: topRight.normalized,
              value: topRight.value,
            },
          ],
          1: [
            {
              position: topRight.normalized,
              value: topRight.value,
            },
            {
              position: bottomRight.normalized,
              value: bottomRight.value,
            },
          ],
          2: [
            {
              position: bottomLeft.normalized,
              value: bottomLeft.value,
            },
            {
              position: bottomRight.normalized,
              value: bottomRight.value,
            },
          ],
          3: [
            {
              position: topLeft.normalized,
              value: topLeft.value,
            },
            {
              position: bottomLeft.normalized,
              value: bottomLeft.value,
            },
          ],
        };

        return EDGE_CASES[caseIndex].map(([startEdge, endEdge]) => ({
          level,
          from: interpolateEdge(
            threshold,
            corners[startEdge][0],
            corners[startEdge][1]
          ),
          to: interpolateEdge(
            threshold,
            corners[endEdge][0],
            corners[endEdge][1]
          ),
        }));
      })
    )
      .flat(2)
      .filter(Boolean);
  });

  return {
    cells,
    contours,
    minValue,
    maxValue,
  };
}
