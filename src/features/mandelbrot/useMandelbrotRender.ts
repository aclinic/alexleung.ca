"use client";

import { RefObject, useEffect, useState } from "react";

import { renderMandelbrot } from "@/features/mandelbrot/renderer";
import {
  MandelbrotSettings,
  PixelSize,
  PreciseViewport,
} from "@/features/mandelbrot/types";

export type RenderPhase = "idle" | "preview" | "refining" | "ready" | "error";

export type RenderState = {
  phase: RenderPhase;
  progress: number;
  message: string;
};

type UseMandelbrotRenderInput = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  viewport: PreciseViewport;
  settings: MandelbrotSettings;
  size: PixelSize;
};

function renderSizeForScale(size: PixelSize, scale: number): PixelSize {
  return {
    width: Math.max(1, Math.round(size.width * scale)),
    height: Math.max(1, Math.round(size.height * scale)),
  };
}

export function useMandelbrotRender({
  canvasRef,
  viewport,
  settings,
  size,
}: UseMandelbrotRenderInput): RenderState {
  const [renderState, setRenderState] = useState<RenderState>({
    phase: "idle",
    progress: 0,
    message: "Waiting for canvas size.",
  });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || size.width <= 0 || size.height <= 0) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      setRenderState({
        phase: "error",
        progress: 0,
        message: "Canvas 2D rendering is unavailable in this browser.",
      });
      return;
    }

    const abortController = new AbortController();
    const previewScale = Math.min(settings.resolutionScale * 0.5, 0.4);
    const scales =
      settings.resolutionScale - previewScale >= 0.15
        ? [previewScale, settings.resolutionScale]
        : [settings.resolutionScale];
    const renderingCanvas = canvas;
    const renderingContext = context;

    let isMounted = true;

    async function runRender() {
      const previousFrame =
        renderingCanvas.width > 0 && renderingCanvas.height > 0
          ? document.createElement("canvas")
          : null;

      if (previousFrame) {
        previousFrame.width = renderingCanvas.width;
        previousFrame.height = renderingCanvas.height;
        previousFrame
          .getContext("2d")
          ?.drawImage(
            renderingCanvas,
            0,
            0,
            previousFrame.width,
            previousFrame.height
          );
      }

      renderingCanvas.width = size.width;
      renderingCanvas.height = size.height;

      if (previousFrame) {
        renderingContext.drawImage(
          previousFrame,
          0,
          0,
          size.width,
          size.height
        );
      } else {
        renderingContext.fillStyle = "#030712";
        renderingContext.fillRect(0, 0, size.width, size.height);
      }

      for (let index = 0; index < scales.length; index += 1) {
        const scale = scales[index];
        const phase = index === 0 && scales.length > 1 ? "preview" : "refining";
        const buffer = document.createElement("canvas");
        const bufferSize = renderSizeForScale(size, scale);
        const bufferContext = buffer.getContext("2d");

        if (!bufferContext) {
          throw new Error("Unable to create an offscreen render buffer.");
        }

        buffer.width = bufferSize.width;
        buffer.height = bufferSize.height;

        bufferContext.drawImage(
          renderingCanvas,
          0,
          0,
          bufferSize.width,
          bufferSize.height
        );

        setRenderState({
          phase,
          progress: 0,
          message:
            phase === "preview"
              ? "Rendering preview..."
              : `Rendering ${bufferSize.width}×${bufferSize.height} frame...`,
        });

        const completed = await renderMandelbrot({
          viewport,
          size: bufferSize,
          settings,
          signal: abortController.signal,
          onChunk: (chunk) => {
            const imageData = new ImageData(
              new Uint8ClampedArray(chunk.pixels),
              bufferSize.width,
              chunk.rowCount
            );

            bufferContext.putImageData(imageData, 0, chunk.startRow);
            renderingContext.imageSmoothingEnabled = scale >= 0.75;
            renderingContext.drawImage(buffer, 0, 0, size.width, size.height);
          },
          onProgress: (progress) => {
            if (!isMounted) {
              return;
            }

            setRenderState({
              phase,
              progress,
              message:
                phase === "preview"
                  ? "Rendering preview..."
                  : `Rendering ${bufferSize.width}×${bufferSize.height} frame...`,
            });
          },
        });

        if (!completed || abortController.signal.aborted) {
          return;
        }
      }

      if (isMounted) {
        setRenderState({
          phase: "ready",
          progress: 1,
          message: `Ready at ${Math.round(settings.resolutionScale * 100)}% render scale.`,
        });
      }
    }

    runRender().catch(() => {
      if (!isMounted || abortController.signal.aborted) {
        return;
      }

      setRenderState({
        phase: "error",
        progress: 0,
        message: "Rendering failed unexpectedly.",
      });
    });

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [canvasRef, settings, size.height, size.width, viewport]);

  return renderState;
}
