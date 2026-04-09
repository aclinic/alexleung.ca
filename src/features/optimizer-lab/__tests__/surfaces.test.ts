import { getSurfaceById, SURFACES } from "@/features/optimizer-lab/surfaces";

describe("optimizer lab surfaces", () => {
  it("returns the expected isotropic quadratic value and gradient", () => {
    const surface = getSurfaceById("quadratic-isotropic");

    expect(surface.evaluate({ x: 2, y: -1 })).toBeCloseTo(2.5);
    expect(surface.gradient({ x: 2, y: -1 })).toEqual({ x: 2, y: -1 });
  });

  it("returns the expected elongated quadratic value and gradient", () => {
    const surface = getSurfaceById("quadratic-elongated");

    expect(surface.evaluate({ x: 2, y: -1 })).toBeCloseTo(3.24);
    expect(surface.gradient({ x: 2, y: -1 })).toEqual({ x: 0.24, y: -6 });
  });

  it("returns the expected saddle value and gradient", () => {
    const surface = getSurfaceById("saddle");

    expect(surface.evaluate({ x: 2, y: -1 })).toBeCloseTo(1.5);
    expect(surface.gradient({ x: 2, y: -1 })).toEqual({ x: 2, y: 1 });
  });

  it("returns the expected multimodal value and gradient at the origin", () => {
    const surface = getSurfaceById("multimodal");

    expect(surface.evaluate({ x: 0, y: 0 })).toBeCloseTo(0);
    expect(surface.gradient({ x: 0, y: 0 })).toEqual({ x: 0, y: 0 });
  });

  it("keeps a zero gradient at the isotropic minimum", () => {
    const surface = getSurfaceById("quadratic-isotropic");

    expect(surface.gradient({ x: 0, y: 0 })).toEqual({ x: 0, y: 0 });
  });

  it("exposes finite default starts for every built-in surface", () => {
    SURFACES.forEach((surface) => {
      expect(surface.defaultStart.x).toBeGreaterThanOrEqual(
        surface.domain.xMin
      );
      expect(surface.defaultStart.x).toBeLessThanOrEqual(surface.domain.xMax);
      expect(surface.defaultStart.y).toBeGreaterThanOrEqual(
        surface.domain.yMin
      );
      expect(surface.defaultStart.y).toBeLessThanOrEqual(surface.domain.yMax);
      expect(Number.isFinite(surface.evaluate(surface.defaultStart))).toBe(
        true
      );
    });
  });
});
