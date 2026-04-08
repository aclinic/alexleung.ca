import Decimal from "decimal.js";

import {
  iterateMandelbrot,
  iterateMandelbrotNumber,
  shouldUseNumberIteration,
} from "@/features/mandelbrot/mandelbrot";
import { normalizedEscapeValue } from "@/features/mandelbrot/palettes";

describe("mandelbrot escape-time logic", () => {
  it("keeps well-known interior points bounded", () => {
    const origin = iterateMandelbrot(new Decimal(0), new Decimal(0), 128);
    const interiorRealAxisPoint = iterateMandelbrot(
      new Decimal("-1.1"),
      new Decimal(0),
      128
    );

    expect(origin.escaped).toBe(false);
    expect(interiorRealAxisPoint.escaped).toBe(false);
  });

  it("escapes clearly exterior points quickly", () => {
    const point = iterateMandelbrot(new Decimal("0.5"), new Decimal("0.5"), 64);

    expect(point.escaped).toBe(true);
    expect(point.iterations).toBeLessThan(10);
  });

  it("stays stable for a boundary-adjacent inside/outside pair", () => {
    const inside = iterateMandelbrot(new Decimal("-0.75"), new Decimal(0), 300);
    const outside = iterateMandelbrot(
      new Decimal("-0.75"),
      new Decimal("0.1"),
      300
    );

    expect(inside.escaped).toBe(false);
    expect(outside.escaped).toBe(true);
    expect(outside.iterations).toBeGreaterThan(20);
  });

  it("produces smooth-color values that differ from simple banding", () => {
    const point = iterateMandelbrot(new Decimal("0.5"), new Decimal("0.5"), 64);
    const smoothValue = normalizedEscapeValue(point, 64, "smooth");
    const bandedValue = normalizedEscapeValue(point, 64, "bands");

    expect(smoothValue).toBeGreaterThan(0);
    expect(smoothValue).toBeLessThan(1);
    expect(smoothValue).not.toBe(bandedValue);
  });

  it("matches the fast number path for ordinary zoom levels", () => {
    const decimalResult = iterateMandelbrot(
      new Decimal("0.5"),
      new Decimal("0.5"),
      128
    );
    const numberResult = iterateMandelbrotNumber(0.5, 0.5, 128);

    expect(numberResult.escaped).toBe(decimalResult.escaped);
    expect(numberResult.iterations).toBe(decimalResult.iterations);
    expect(numberResult.smoothIteration).toBeCloseTo(
      decimalResult.smoothIteration,
      10
    );
  });

  it("switches to the decimal escape path only once zoom depth is small enough", () => {
    expect(shouldUseNumberIteration(new Decimal("1e-6"))).toBe(true);
    expect(shouldUseNumberIteration(new Decimal("1e-15"))).toBe(false);
  });
});
