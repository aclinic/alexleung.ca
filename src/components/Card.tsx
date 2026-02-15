import { ReactNode } from "react";

import { SurfaceCard } from "./SurfaceCard";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Backwards-compatible alias for static surface cards.
 */
export function Card({ children, className = "" }: CardProps) {
  return <SurfaceCard className={className}>{children}</SurfaceCard>;
}
