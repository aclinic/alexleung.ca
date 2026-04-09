import {
  SurfaceDefinition,
  SurfaceId,
  Vector2,
} from "@/features/optimizer-lab/types";

const SURFACE_REGISTRY: Record<SurfaceId, SurfaceDefinition> = {
  "quadratic-isotropic": {
    id: "quadratic-isotropic",
    name: "Isotropic quadratic bowl",
    description:
      "A symmetric bowl with equal curvature in every direction. It makes step-size effects easy to read because the geometry is simple and well behaved.",
    defaultStart: { x: -3.2, y: 2.4 },
    domain: {
      xMin: -4.5,
      xMax: 4.5,
      yMin: -4.5,
      yMax: 4.5,
    },
    evaluate: ({ x, y }) => 0.5 * (x * x + y * y),
    gradient: ({ x, y }) => ({ x, y }),
  },
  "quadratic-elongated": {
    id: "quadratic-elongated",
    name: "Ill-conditioned quadratic bowl",
    description:
      "A narrow valley with very different curvature along each axis. This is a classic setup for seeing zig-zagging SGD paths and the stabilizing effect of adaptive methods.",
    defaultStart: { x: -3.4, y: 2.3 },
    domain: {
      xMin: -5,
      xMax: 5,
      yMin: -3,
      yMax: 3,
    },
    evaluate: ({ x, y }) => 0.5 * (0.12 * x * x + 6 * y * y),
    gradient: ({ x, y }) => ({ x: 0.12 * x, y: 6 * y }),
  },
  saddle: {
    id: "saddle",
    name: "Saddle point",
    description:
      "Curvature flips sign between the axes. Gradient descent contracts toward the origin along the horizontal stable manifold `y = 0`, but any vertical offset is amplified, so nearby trajectories still diverge quickly.",
    defaultStart: { x: 2.3, y: 0.6 },
    domain: {
      xMin: -4,
      xMax: 4,
      yMin: -4,
      yMax: 4,
    },
    evaluate: ({ x, y }) => 0.5 * (x * x - y * y),
    gradient: ({ x, y }) => ({ x, y: -y }),
  },
  multimodal: {
    id: "multimodal",
    name: "Multimodal synthetic surface",
    description:
      "A smooth sinusoidal landscape with several local minima layered onto a shallow quadratic trend. It is useful for comparing how quickly different methods settle and how much they oscillate near basins.",
    defaultStart: { x: -4.2, y: 3.1 },
    domain: {
      xMin: -6,
      xMax: 6,
      yMin: -6,
      yMax: 6,
    },
    evaluate: ({ x, y }) =>
      0.15 * (x * x + y * y) + 0.9 * Math.sin(x) * Math.sin(y),
    gradient: ({ x, y }) => ({
      x: 0.3 * x + 0.9 * Math.cos(x) * Math.sin(y),
      y: 0.3 * y + 0.9 * Math.sin(x) * Math.cos(y),
    }),
  },
};

export const SURFACES = Object.values(SURFACE_REGISTRY);

export function getSurfaceById(surfaceId: SurfaceId): SurfaceDefinition {
  return SURFACE_REGISTRY[surfaceId];
}

export function clampPointToSurfaceDomain(
  surface: SurfaceDefinition,
  point: Vector2
): Vector2 {
  return {
    x: Math.min(Math.max(point.x, surface.domain.xMin), surface.domain.xMax),
    y: Math.min(Math.max(point.y, surface.domain.yMin), surface.domain.yMax),
  };
}
