import Decimal from "decimal.js";

import {
  detectWebGpuAvailability,
  renderMandelbrotWithWebGpu,
} from "@/features/mandelbrot/gpu";
import { renderMandelbrotWithStrategy } from "@/features/mandelbrot/renderer";
import { RenderRequest } from "@/features/mandelbrot/types";

jest.mock("@/features/mandelbrot/gpu", () => ({
  detectWebGpuAvailability: jest.fn(),
  renderMandelbrotWithWebGpu: jest.fn(),
}));

const mockedDetectWebGpuAvailability = jest.mocked(detectWebGpuAvailability);
const mockedRenderMandelbrotWithWebGpu = jest.mocked(
  renderMandelbrotWithWebGpu
);

function createRenderRequest(): RenderRequest {
  return {
    viewport: {
      centerX: new Decimal(-0.75),
      centerY: new Decimal(0),
      width: new Decimal(3),
      height: new Decimal(2),
    },
    size: {
      width: 6,
      height: 4,
    },
    settings: {
      maxIterations: 32,
      paletteId: "oceanic",
      coloringMode: "smooth",
      resolutionScale: 1,
      renderBackendPreference: "webgpu",
    },
    onChunk: jest.fn(),
    onProgress: jest.fn(),
  };
}

describe("renderMandelbrotWithStrategy", () => {
  beforeEach(() => {
    mockedDetectWebGpuAvailability.mockReset();
    mockedRenderMandelbrotWithWebGpu.mockReset();
  });

  it("uses the WebGPU backend when GPU rendering completes", async () => {
    mockedDetectWebGpuAvailability.mockResolvedValue({
      isAvailable: true,
    });
    mockedRenderMandelbrotWithWebGpu.mockResolvedValue({
      completed: true,
      rendered: true,
    });

    const request = createRenderRequest();
    const result = await renderMandelbrotWithStrategy(request);

    expect(result).toEqual({
      completed: true,
      backend: "webgpu",
      gpuFallbackReason: undefined,
    });
  });

  it("falls back to the CPU renderer when WebGPU is unavailable", async () => {
    mockedDetectWebGpuAvailability.mockResolvedValue({
      isAvailable: false,
      reason: "No compatible WebGPU adapter was found.",
    });

    const request = createRenderRequest();
    const result = await renderMandelbrotWithStrategy(request);

    expect(result.backend).toBe("cpu");
    expect(result.completed).toBe(true);
    expect(result.gpuFallbackReason).toBe(
      "No compatible WebGPU adapter was found."
    );
    expect(request.onChunk).toHaveBeenCalled();
  });

  it("falls back to the CPU renderer when WebGPU setup fails mid-render", async () => {
    mockedDetectWebGpuAvailability.mockResolvedValue({
      isAvailable: true,
    });
    mockedRenderMandelbrotWithWebGpu.mockResolvedValue({
      completed: false,
      rendered: false,
      fallbackReason: "WebGPU device was lost.",
    });

    const request = createRenderRequest();
    const result = await renderMandelbrotWithStrategy(request);

    expect(result.backend).toBe("cpu");
    expect(result.completed).toBe(true);
    expect(result.gpuFallbackReason).toBe("WebGPU device was lost.");
    expect(request.onChunk).toHaveBeenCalled();
  });

  it("does not fall back to CPU after an aborted GPU render has already started", async () => {
    mockedDetectWebGpuAvailability.mockResolvedValue({
      isAvailable: true,
    });
    mockedRenderMandelbrotWithWebGpu.mockResolvedValue({
      completed: false,
      rendered: true,
    });

    const abortController = new AbortController();
    const request = createRenderRequest();

    abortController.abort();
    request.signal = abortController.signal;

    const result = await renderMandelbrotWithStrategy(request);

    expect(result).toEqual({
      completed: false,
      backend: "webgpu",
      gpuFallbackReason: undefined,
    });
    expect(request.onChunk).not.toHaveBeenCalled();
  });

  it("uses the CPU renderer directly when CPU is explicitly selected", async () => {
    const request = createRenderRequest();
    request.settings.renderBackendPreference = "cpu";

    const result = await renderMandelbrotWithStrategy(request, "cpu");

    expect(result.backend).toBe("cpu");
    expect(result.completed).toBe(true);
    expect(mockedDetectWebGpuAvailability).not.toHaveBeenCalled();
    expect(mockedRenderMandelbrotWithWebGpu).not.toHaveBeenCalled();
  });
});
