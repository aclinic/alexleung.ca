import Decimal from "decimal.js";

import { EscapeResult } from "@/features/mandelbrot/types";

const ESCAPE_RADIUS_SQUARED = new Decimal(4);
const ESCAPE_RADIUS_SQUARED_NUMBER = 4;
const NUMBER_RENDER_WIDTH_THRESHOLD = new Decimal("1e-12");
const LOG_2 = Math.log(2);

function smoothEscapeValue(
  iterations: number,
  magnitudeSquared: Decimal
): number {
  const magnitudeSquaredText = magnitudeSquared.toExponential();
  const magnitudeSquaredNumber = Number.parseFloat(magnitudeSquaredText);

  if (!Number.isFinite(magnitudeSquaredNumber) || magnitudeSquaredNumber <= 1) {
    return iterations;
  }

  return (
    iterations +
    1 -
    Math.log(Math.log(Math.sqrt(magnitudeSquaredNumber))) / LOG_2
  );
}

function smoothEscapeValueNumber(
  iterations: number,
  magnitudeSquared: number
): number {
  if (!Number.isFinite(magnitudeSquared) || magnitudeSquared <= 1) {
    return iterations;
  }

  return (
    iterations + 1 - Math.log(Math.log(Math.sqrt(magnitudeSquared))) / LOG_2
  );
}

export function iterateMandelbrot(
  cx: Decimal,
  cy: Decimal,
  maxIterations: number
): EscapeResult {
  let zx = new Decimal(0);
  let zy = new Decimal(0);
  let magnitudeSquared = new Decimal(0);

  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    const zxSquared = zx.mul(zx);
    const zySquared = zy.mul(zy);
    const nextZy = zx.mul(zy).mul(2).add(cy);
    const nextZx = zxSquared.sub(zySquared).add(cx);

    zx = nextZx;
    zy = nextZy;
    magnitudeSquared = zx.mul(zx).add(zy.mul(zy));

    if (magnitudeSquared.gt(ESCAPE_RADIUS_SQUARED)) {
      return {
        escaped: true,
        iterations: iteration + 1,
        smoothIteration: smoothEscapeValue(iteration + 1, magnitudeSquared),
      };
    }
  }

  return {
    escaped: false,
    iterations: maxIterations,
    smoothIteration: maxIterations,
  };
}

export function iterateMandelbrotNumber(
  cx: number,
  cy: number,
  maxIterations: number
): EscapeResult {
  let zx = 0;
  let zy = 0;
  let magnitudeSquared = 0;

  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    const zxSquared = zx * zx;
    const zySquared = zy * zy;
    const nextZy = 2 * zx * zy + cy;
    const nextZx = zxSquared - zySquared + cx;

    zx = nextZx;
    zy = nextZy;
    magnitudeSquared = zx * zx + zy * zy;

    if (magnitudeSquared > ESCAPE_RADIUS_SQUARED_NUMBER) {
      return {
        escaped: true,
        iterations: iteration + 1,
        smoothIteration: smoothEscapeValueNumber(
          iteration + 1,
          magnitudeSquared
        ),
      };
    }
  }

  return {
    escaped: false,
    iterations: maxIterations,
    smoothIteration: maxIterations,
  };
}

export function shouldUseNumberIteration(width: Decimal): boolean {
  return width.greaterThanOrEqualTo(NUMBER_RENDER_WIDTH_THRESHOLD);
}
