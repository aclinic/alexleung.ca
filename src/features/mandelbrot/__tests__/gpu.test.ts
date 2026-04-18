import Decimal from "decimal.js";

import { canRenderViewportWithWebGpu } from "@/features/mandelbrot/gpu";

describe("canRenderViewportWithWebGpu", () => {
  it("keeps auto mode on WebGPU at the old relaxed boundary", () => {
    expect(
      canRenderViewportWithWebGpu(
        {
          centerX: new Decimal(-0.75),
          centerY: new Decimal(0),
          width: new Decimal("0.00005"),
          height: new Decimal("0.00003125"),
        },
        {
          width: 960,
          height: 600,
        }
      )
    ).toBe(true);
  });

  it("switches auto mode back to CPU once the pixel step drops below the float32 cushion", () => {
    expect(
      canRenderViewportWithWebGpu(
        {
          centerX: new Decimal(-0.75),
          centerY: new Decimal(0),
          width: new Decimal("0.00002"),
          height: new Decimal("0.0000125"),
        },
        {
          width: 960,
          height: 600,
        }
      )
    ).toBe(false);
  });
});
