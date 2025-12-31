import { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Reusable card component with consistent styling
 * @param className - Additional custom classes to apply
 */
export function Card({ children, className = "" }: CardProps) {
  const baseStyles =
    "p-6 rounded-lg backdrop-blur-sm border bg-white/5 border-white/10";

  return <div className={`${baseStyles} ${className}`}>{children}</div>;
}
