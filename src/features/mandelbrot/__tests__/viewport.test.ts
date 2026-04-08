import {
  boxZoomViewport,
  createDefaultViewport,
  createViewport,
  magnificationFromViewport,
  mapViewportPoint,
  panViewport,
  precisionForWidth,
  zoomViewportAtPoint,
} from "@/features/mandelbrot/viewport";

const size = { width: 800, height: 400 };

describe("mandelbrot viewport math", () => {
  it("maps pixels into the complex plane using arbitrary-precision viewport state", () => {
    const viewport = createDefaultViewport(size);
    const centerPoint = mapViewportPoint(viewport, size, { x: 400, y: 200 });
    const topLeftPoint = mapViewportPoint(viewport, size, { x: 0, y: 0 });

    expect(centerPoint.real.toString()).toBe("-0.75");
    expect(centerPoint.imaginary.toString()).toBe("0");
    expect(topLeftPoint.real.toString()).toBe("-2.5");
    expect(topLeftPoint.imaginary.toString()).toBe("0.875");
  });

  it("zooms around the selected pixel while preserving its mapped coordinate", () => {
    const viewport = createDefaultViewport(size);
    const pointer = { x: 600, y: 100 };
    const before = mapViewportPoint(viewport, size, pointer);
    const zoomed = zoomViewportAtPoint(viewport, size, pointer, 0.5);
    const after = mapViewportPoint(zoomed, size, pointer);

    expect(zoomed.width.toString()).toBe("1.75");
    expect(zoomed.height.toString()).toBe("0.875");
    expect(after.real.toString()).toBe(before.real.toString());
    expect(after.imaginary.toString()).toBe(before.imaginary.toString());
  });

  it("box zoom creates the expected centered viewport", () => {
    const viewport = createDefaultViewport(size);
    const zoomed = boxZoomViewport(
      viewport,
      size,
      { x: 200, y: 100 },
      { x: 600, y: 300 }
    );

    expect(zoomed.centerX.toString()).toBe("-0.75");
    expect(zoomed.centerY.toString()).toBe("0");
    expect(zoomed.width.toString()).toBe("1.75");
    expect(zoomed.height.toString()).toBe("0.875");
  });

  it("pans by translating the viewport center in screen space", () => {
    const viewport = createDefaultViewport(size);
    const panned = panViewport(viewport, size, { x: 80, y: 40 });

    expect(panned.centerX.toString()).toBe("-1.1");
    expect(panned.centerY.toString()).toBe("0.175");
  });

  it("reports magnification and preserves tiny scales cleanly", () => {
    const deepViewport = createViewport({
      centerX: "-0.743643887037151",
      centerY: "0.13182590420533",
      width: "1e-80",
      size,
    });
    const zoomed = zoomViewportAtPoint(
      deepViewport,
      size,
      { x: 400, y: 200 },
      0.5
    );

    expect(precisionForWidth(zoomed.width)).toBeGreaterThanOrEqual(104);
    expect(zoomed.width.toExponential()).toBe("5e-81");
    expect(magnificationFromViewport(zoomed).toExponential()).toBe("7e+80");
  });
});
