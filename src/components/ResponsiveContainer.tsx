import { ElementType, ReactNode } from "react";

type ContainerVariant = "content" | "wide" | "prose";

type ResponsiveContainerProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  variant?: ContainerVariant;
};

const variantClasses: Record<ContainerVariant, string> = {
  content: "section-center",
  wide: "container mx-auto px-5",
  prose: "container mx-auto max-w-3xl px-5",
};

export function ResponsiveContainer<T extends ElementType = "div">({
  as,
  children,
  className = "",
  variant = "content",
}: ResponsiveContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component className={`${variantClasses[variant]} ${className}`.trim()}>
      {children}
    </Component>
  );
}
