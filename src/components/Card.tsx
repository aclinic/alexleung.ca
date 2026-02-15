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
  const baseStyles = "surface-static p-6";

  return <div className={`${baseStyles} ${className}`}>{children}</div>;
}
