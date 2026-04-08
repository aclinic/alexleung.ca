import {
  ColoringMode,
  MandelbrotSettings,
  PaletteId,
  PixelSize,
  PreciseViewport,
} from "@/features/mandelbrot/types";
import { createViewport } from "@/features/mandelbrot/viewport";

type QueryRecord = Record<string, string | string[] | undefined>;

const VALID_PALETTES: ReadonlySet<PaletteId> = new Set([
  "oceanic",
  "ember",
  "glacier",
]);
const VALID_COLORING_MODES: ReadonlySet<ColoringMode> = new Set([
  "smooth",
  "bands",
]);

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

  return {
    maxIterations:
      Number.isFinite(maxIterations) && maxIterations >= 25
        ? Math.min(maxIterations, 4000)
        : fallback.maxIterations,
    paletteId:
      typeof paletteId === "string" &&
      VALID_PALETTES.has(paletteId as PaletteId)
        ? (paletteId as PaletteId)
        : fallback.paletteId,
    coloringMode:
      typeof coloringMode === "string" &&
      VALID_COLORING_MODES.has(coloringMode as ColoringMode)
        ? (coloringMode as ColoringMode)
        : fallback.coloringMode,
    resolutionScale:
      Number.isFinite(resolutionScale) && resolutionScale >= 0.25
        ? Math.min(resolutionScale, 1)
        : fallback.resolutionScale,
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

  return searchParams.toString();
}
