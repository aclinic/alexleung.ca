import Decimal from "decimal.js";

export type PreciseDecimal = Decimal;

export type ComplexPoint = {
  real: PreciseDecimal;
  imaginary: PreciseDecimal;
};

export type PreciseViewport = {
  centerX: PreciseDecimal;
  centerY: PreciseDecimal;
  width: PreciseDecimal;
  height: PreciseDecimal;
};

export type PixelSize = {
  width: number;
  height: number;
};

export type CanvasPoint = {
  x: number;
  y: number;
};

export type SelectionRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PaletteId = "oceanic" | "ember" | "glacier";
export type ColoringMode = "smooth" | "bands";
export type DragMode = "pan" | "box-zoom";

export type MandelbrotSettings = {
  maxIterations: number;
  paletteId: PaletteId;
  coloringMode: ColoringMode;
  resolutionScale: number;
};

export type EscapeResult = {
  escaped: boolean;
  iterations: number;
  smoothIteration: number;
};

export type RenderChunk = {
  startRow: number;
  rowCount: number;
  pixels: Uint8ClampedArray;
};

export type RenderRequest = {
  viewport: PreciseViewport;
  size: PixelSize;
  settings: MandelbrotSettings;
  signal?: AbortSignal;
  onChunk: (chunk: RenderChunk) => void;
  onProgress?: (progress: number) => void;
};
