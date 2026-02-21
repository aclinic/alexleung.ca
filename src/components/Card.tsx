import { ReactNode } from "react";

import { Surface } from "@/components/Surface";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable card component with consistent styling
 * @param className - Additional custom classes to apply
 */
export function Card({ children, className = "" }: CardProps) {
  return (
    <Surface padding="md" className={className}>
      {children}
    </Surface>
  );
}
