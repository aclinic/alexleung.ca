import {
  ColoringMode,
  MandelbrotSettings,
  PaletteId,
  PixelSize,
  PreciseViewport,
  RenderBackendPreference,
} from "@/features/mandelbrot/types";
import { createViewport } from "@/features/mandelbrot/viewport";

type QueryRecord = Record<string, string | string[] | undefined>;

const VALID_PALETTES: Readonly<Record<PaletteId, true>> = {
  oceanic: true,
  ember: true,
  glacier: true,
};
const VALID_COLORING_MODES: Readonly<Record<ColoringMode, true>> = {
  smooth: true,
  bands: true,
};
const VALID_RENDER_BACKENDS: Readonly<Record<RenderBackendPreference, true>> = {
  auto: true,
  webgpu: true,
  cpu: true,
};

function isPaletteId(value: string): value is PaletteId {
  return Object.hasOwn(VALID_PALETTES, value);
}

function isColoringMode(value: string): value is ColoringMode {
  return Object.hasOwn(VALID_COLORING_MODES, value);
}

function isRenderBackendPreference(
  value: string
): value is RenderBackendPreference {
  return Object.hasOwn(VALID_RENDER_BACKENDS, value);
}

export function parseViewportFromQuery(
  searchParams: QueryRecord,
  size: PixelSize
): PreciseViewport | null {
  const centerX = searchParams.cx;
  const centerY = searchParams.cy;
  const width = searchParams.w;

  if (
    typeof centerX !== "string" ||
    typeof centerY !== "string" ||
    typeof width !== "string"
  ) {
    return null;
  }

  try {
    return createViewport({
      centerX,
      centerY,
      width,
      size,
    });
  } catch {
    return null;
  }
}

export function parseSettingsFromQuery(
  searchParams: QueryRecord,
  fallback: MandelbrotSettings
): MandelbrotSettings {
  const maxIterations = Number.parseInt(String(searchParams.iter ?? ""), 10);
  const resolutionScale = Number.parseFloat(String(searchParams.quality ?? ""));
  const paletteId = searchParams.palette;
  const coloringMode = searchParams.mode;
  const renderBackendPreference = searchParams.backend;

  return {
    maxIterations:
      Number.isFinite(maxIterations) && maxIterations >= 25
        ? Math.min(maxIterations, 4000)
        : fallback.maxIterations,
    paletteId:
      typeof paletteId === "string" && isPaletteId(paletteId)
        ? paletteId
        : fallback.paletteId,
    coloringMode:
      typeof coloringMode === "string" && isColoringMode(coloringMode)
        ? coloringMode
        : fallback.coloringMode,
    resolutionScale:
      Number.isFinite(resolutionScale) && resolutionScale >= 0.25
        ? Math.min(resolutionScale, 1)
        : fallback.resolutionScale,
    renderBackendPreference:
      typeof renderBackendPreference === "string" &&
      isRenderBackendPreference(renderBackendPreference)
        ? renderBackendPreference
        : fallback.renderBackendPreference,
  };
}

export function serializeExplorerState(
  viewport: PreciseViewport,
  settings: MandelbrotSettings
): string {
  const searchParams = new URLSearchParams();

  searchParams.set("cx", viewport.centerX.toString());
  searchParams.set("cy", viewport.centerY.toString());
  searchParams.set("w", viewport.width.toString());
  searchParams.set("iter", String(settings.maxIterations));
  searchParams.set("palette", settings.paletteId);
  searchParams.set("mode", settings.coloringMode);
  searchParams.set("quality", settings.resolutionScale.toFixed(2));
  searchParams.set("backend", settings.renderBackendPreference);

  return searchParams.toString();
}
