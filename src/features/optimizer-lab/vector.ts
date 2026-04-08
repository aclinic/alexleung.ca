import { Vector2 } from "@/features/optimizer-lab/types";

export const ZERO_VECTOR: Vector2 = { x: 0, y: 0 };

export function addVectors(a: Vector2, b: Vector2): Vector2 {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

export function scaleVector(vector: Vector2, scalar: number): Vector2 {
  return {
    x: vector.x * scalar,
    y: vector.y * scalar,
  };
}

export function mapVector(
  vector: Vector2,
  transform: (value: number) => number
): Vector2 {
  return {
    x: transform(vector.x),
    y: transform(vector.y),
  };
}

export function magnitude(vector: Vector2): number {
  return Math.hypot(vector.x, vector.y);
}

export function maxAbsComponent(vector: Vector2): number {
  return Math.max(Math.abs(vector.x), Math.abs(vector.y));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
