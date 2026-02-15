import { ComponentPropsWithoutRef, ReactNode } from "react";

type SurfaceElement = "div" | "section" | "article";

export interface SurfaceCardProps {
  children: ReactNode;
  className?: string;
  as?: SurfaceElement;
}

/**
 * Static content surface. Use for non-clickable information containers.
 */
export function SurfaceCard({
  children,
  className = "",
  as = "div",
  ...props
}: SurfaceCardProps & ComponentPropsWithoutRef<SurfaceElement>) {
  const Component = as;
  const baseStyles = "surface-card p-6";

  return (
    <Component className={`${baseStyles} ${className}`} {...props}>
      {children}
    </Component>
  );
}
